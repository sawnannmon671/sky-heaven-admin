const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const dashboardDir = path.join(__dirname, 'src', 'app', '(dashboard)', 'dashboard');

let modified = 0;

walkDir(dashboardDir, (filePath) => {
  if (filePath.endsWith('page.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Fix typescript any type indexing error
    if (content.includes('a[key] < b[key]')) {
      content = content.replace(/a\[key\] < b\[key\]/g, 'a[key as keyof typeof a] < b[key as keyof typeof b]');
      content = content.replace(/a\[key\] > b\[key\]/g, 'a[key as keyof typeof a] > b[key as keyof typeof b]');
      changed = true;
    }

    // 2. Fix block-scoped variable used before declaration
    // Find the sortedData block
    const sortedDataRegex = /const sortedData = \[\.\.\.(\w+)\]\.sort\(\(a, b\) => \{[\s\S]*?return 0;\s*\}\);/;
    const match = content.match(sortedDataRegex);
    
    if (match) {
      const arrayName = match[1];
      const sortedDataBlock = match[0];
      
      // Check if array is declared AFTER sortedData
      const arrayDeclRegex = new RegExp(`const ${arrayName} = \\[[\\s\\S]*?\\];`);
      const arrayMatch = content.match(arrayDeclRegex);
      
      if (arrayMatch) {
        const sortedDataIndex = content.indexOf(sortedDataBlock);
        const arrayDeclIndex = content.indexOf(arrayMatch[0]);
        
        if (arrayDeclIndex > sortedDataIndex) {
          // Remove sortedData from its current position
          content = content.replace(sortedDataBlock, '');
          
          // Insert sortedData AFTER the array declaration
          const insertPos = content.indexOf(arrayMatch[0]) + arrayMatch[0].length;
          content = content.slice(0, insertPos) + '\n\n  ' + sortedDataBlock + content.slice(insertPos);
          changed = true;
        }
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content);
      modified++;
    }
  }
});

console.log(`Fixed TS errors in ${modified} files.`);
