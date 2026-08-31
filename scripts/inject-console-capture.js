const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function injectScript() {
  const buildDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(buildDir)) {
    console.log('No build directory found, skipping console capture injection.');
    return;
  }

  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  const htmlFiles = findHtmlFiles(buildDir);

  for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('dashboard-console-capture.js')) {
      content = content.replace('</head>', `${scriptTag}</head>`);
      fs.writeFileSync(file, content, 'utf8');
    }
  }

  console.log(`Injected console capture script into ${htmlFiles.length} file(s).`);
}

injectScript();