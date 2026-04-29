const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const targetDir = path.resolve('src/app/(dashboard)/dashboard');
let count = 0;

walk(targetDir, (filePath) => {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/<TextInput([^>]*?)>/g, (match, attrs) => {
      // Find all w={250} occurrences
      let wCount = (attrs.match(/w=\{250\}/g) || []).length;
      if (wCount > 1) {
        // Keep the first one, remove the rest
        let newAttrs = attrs.replace(/w=\{250\}/, '%%TEMP_W_250%%');
        newAttrs = newAttrs.replace(/\s*w=\{250\}/g, '');
        newAttrs = newAttrs.replace('%%TEMP_W_250%%', 'w={250}');
        return `<TextInput${newAttrs}>`;
      }
      return match;
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      count++;
      console.log('Fixed duplicate w={250} in:', filePath.replace(targetDir, ''));
    }
  }
});
console.log('Total files fixed for w={250}:', count);