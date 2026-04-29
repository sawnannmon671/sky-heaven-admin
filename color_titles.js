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

    // We only want to target main page titles, usually <Title order={1}> or <Title order={2}> 
    // that don't already have `c=` or `color=` attribute.
    // Also, we only want to do this if it's the main header of the page, but since most list pages use <Title order={2}>, we can just replace `<Title order={2}>` or `<Title order={1}>`.

    content = content.replace(/<Title([^>]*?)order=\{[12]\}([^>]*?)>/g, (match, p1, p2) => {
       // if it already has color or c attribute, skip
       if (match.includes(' c=') || match.includes(' color=')) return match;
       return `<Title${p1}order={2} c="#014F86"${p2}>`;
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      count++;
      console.log('Updated Title color in:', filePath.replace(targetDir, ''));
    }
  }
});
console.log('Total files updated for Title color:', count);
