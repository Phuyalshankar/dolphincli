#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

console.log('🐬 Dolphin CLI Started');
console.log('=====================');

// Load config
const configPath = path.join(__dirname, '../config/markers.json');
const templatesDir = path.join(__dirname, '../templates');

if (!fs.existsSync(configPath)) {
  console.error('❌ config/markers.json not found!');
  process.exit(1);
}

const markers = JSON.parse(fs.readFileSync(configPath, 'utf8'));
console.log(`📋 Loaded ${Object.keys(markers).length} markers`);

// Load all templates
const templates = {};
for (const [marker, templateFile] of Object.entries(markers)) {
  const templatePath = path.join(templatesDir, templateFile);
  if (fs.existsSync(templatePath)) {
    templates[marker] = fs.readFileSync(templatePath, 'utf8');
  } else {
    console.log(`⚠️ Template not found: ${templateFile}`);
    templates[marker] = `<div class="dolphin-error">Template ${templateFile} not found</div>`;
  }
}

// File processor
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const [marker, template] of Object.entries(templates)) {
      // Pattern for className="... d-login ..."
      const pattern = new RegExp(`(<[^>]+)className=["'][^"']*${marker}[^"']*["'][^>]*>`, 'g');

      if (pattern.test(content)) {
        modified = true;

        content = content.replace(pattern, (match, tagStart) => {
          // Remove marker from className
          let cleanMatch = match.replace(new RegExp(`\\s*${marker}\\s*`), ' ').replace(/\s+/g, ' ');
          cleanMatch = cleanMatch.replace(/className=["']\s*["']/, ''); // remove empty className
          
          // Ensure there’s a space before closing >
          cleanMatch = cleanMatch.replace(/>$/, '');

          // Get tag name
          const tagName = tagStart.split(' ')[0].replace('<', '');

          // Inject template inside tag
          return `${cleanMatch}>\n${template}\n</${tagName}>`;
        });

        console.log(`✅ ${marker} → ${path.basename(filePath)}`);
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
    }
  } catch (error) {
    console.log(`⚠️ Error: ${error.message}`);
  }
}

// Start watching
const watcher = chokidar.watch(['**/*.{js,jsx,ts,tsx}'], {
  ignored: /(node_modules|\.git)/,
  persistent: true,
  ignoreInitial: false,
  awaitWriteFinish: {
    stabilityThreshold: 200,
    pollInterval: 100,
  },
});

watcher
  .on('add', filePath => processFile(filePath))
  .on('change', filePath => processFile(filePath))
  .on('ready', () => {
    console.log('👁️  Watching for marker classes...');
    console.log('💡 Try: <div className="d-login">');
  });

// Handle exit
process.on('SIGINT', () => {
  console.log('\n👋 Dolphin CLI stopped');
  process.exit(0);
});
