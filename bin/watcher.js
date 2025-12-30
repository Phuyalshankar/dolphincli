#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

console.log('🐬 Dolphin Auto Watcher Started (Improved Regex)');
console.log('===============================================');

// ====== IMPORTANT: Separate package root and watch directory ======
const packageRoot = path.resolve(__dirname, '..');  // Package को root (config/templates यहाँबाट लिन्छ)
const watchDir = process.cwd();                     // User's current project directory watch गर्छ

const configPath = path.join(packageRoot, 'config', 'markers.json');
const templatesDir = path.join(packageRoot, 'templates');

if (!fs.existsSync(configPath)) {
  console.error('❌ config/markers.json not found in package!');
  process.exit(1);
}

const markersConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
console.log(`📋 Loaded ${Object.keys(markersConfig).length} markers`);

// Load templates
const templates = {};
for (const [marker, cfg] of Object.entries(markersConfig)) {
  const templatePath = path.join(templatesDir, cfg.templateFile);
  if (fs.existsSync(templatePath)) {
    templates[marker] = {
      content: fs.readFileSync(templatePath, 'utf8').trim(),
      addClasses: cfg.addClasses || ''
    };
  } else {
    console.warn(`⚠️ Template not found: ${cfg.templateFile}`);
    templates[marker] = { 
      content: `<div class="error">Template ${cfg.templateFile} missing</div>`, 
      addClasses: '' 
    };
  }
}

function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.js', '.jsx', '.ts', '.tsx', '.html'].includes(ext)) return;

  const isHTML = ext === '.html';
  const classAttrName = isHTML ? 'class' : 'className';

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let modified = false;

    // Improved regex: flexible for attribute order, quotes, spaces
    const regex = new RegExp(
      `(<div\\s+[^>]*${classAttrName}=\\s*["']([^"']*\\s*)?(d-[a-zA-Z0-9-]+)(\\s*[^"']*)?["'][^>]*>)([\\s\\S]*?)(</div>)`,
      'gi'
    );

    content = content.replace(regex, (fullMatch, openingTag, beforeClasses, marker, afterClasses, innerContent, closingTag) => {
      if (!templates[marker]) return fullMatch;

      modified = true;
      const templateData = templates[marker];

      // Collect all classes except the marker
      const classParts = (beforeClasses || '') + (afterClasses || '');
      let allClasses = classParts.trim().split(/\s+/).filter(Boolean);
      allClasses = allClasses.filter(c => c !== marker && c !== '');

      // Add configured extra classes
      if (templateData.addClasses) {
        const addCls = templateData.addClasses.trim().split(/\s+/).filter(Boolean);
        allClasses = [...new Set([...allClasses, ...addCls])];
      }

      // New class attribute
      const newClassAttr = allClasses.length > 0 
        ? ` ${classAttrName}="${allClasses.join(' ')}"` 
        : '';

      // Prepare inner template
      let newInner = templateData.content;
      if (isHTML) {
        newInner = newInner.replace(/className=/g, 'class=');
      }

      // Inject INNER content
      newInner = newInner.replace('{/* INNER */}', innerContent.trim());

      // Return new structure
      return `<div${newClassAttr}>${newInner}\n</div>`;
    });

    if (modified && content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Successfully generated in: ${path.relative(watchDir, filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Error in ${path.relative(watchDir, filePath)}: ${error.message}`);
  }
}

// Watcher
const watcher = chokidar.watch('**/*.{js,jsx,ts,tsx,html}', {
  cwd: watchDir,
  ignored: /(node_modules|\.git|bin|config|templates|dist|build)/,
  persistent: true,
  ignoreInitial: false,
  awaitWriteFinish: { stabilityThreshold: 300, pollInterval: 100 }
});

watcher
  .on('add', processFile)
  .on('change', processFile)
  .on('ready', () => console.log('👁️ Watching for changes in your project... Save file to generate!'));

process.on('SIGINT', () => {
  console.log('\n👋 Dolphin Watcher stopped.');
  process.exit(0);
});