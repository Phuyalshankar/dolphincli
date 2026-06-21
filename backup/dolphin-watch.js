import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import components from './components.js';

// Setup watcher for src folder
const targetDir = './src';
const watcher = chokidar.watch(targetDir, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

const log = console.log.bind(console);
log(`\n🐬 DolphinCSS Magic Watcher Started!`);
log(`👀 Listening for magic markers (like <div className="dolphin-form"></div>) in ${targetDir} for .js, .jsx, .tsx, .html files\n`);

watcher.on('all', (event, filePath) => {
  if (event !== 'add' && event !== 'change') return;
  const ext = path.extname(filePath);
  if (!['.jsx', '.tsx', '.js', '.html'].includes(ext)) return;
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const [marker, replacement] of Object.entries(components)) {
      
      // Much simpler: we can just use replace directly if we don't care about the regex complexity
      // Let's use simple string replacements for the most common cases:
      const cases = [
        `<div className="${marker}"></div>`,
        `<div class="${marker}"></div>`,
        `<div className="${marker}" />`,
        `<div class="${marker}" />`,
        `<div className='${marker}'></div>`,
        `<div class='${marker}'></div>`
      ];

      for (const pattern of cases) {
        if (content.includes(pattern)) {
          content = content.replace(pattern, replacement);
          modified = true;
          log(`✨ MAGIC INJECTION: Injected '${marker}' into ${path.basename(filePath)}`);
        }
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  } catch (error) {
    console.error(`❌ Error processing file ${filePath}:`, error);
  }
});
