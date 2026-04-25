#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Dolphin CLI Cleanup Started...');

const projectRoot = process.cwd();
const vscodeDir = path.join(projectRoot, '.vscode');

// 1. Remove VS Code Custom Data & Snippets
try {
  const tagsPath = path.join(vscodeDir, 'dolphin-tags.json');
  const snippetsPath = path.join(vscodeDir, 'dolphin.code-snippets');
  
  if (fs.existsSync(tagsPath)) {
    fs.unlinkSync(tagsPath);
    console.log('🗑️  Removed .vscode/dolphin-tags.json');
  }
  if (fs.existsSync(snippetsPath)) {
    fs.unlinkSync(snippetsPath);
    console.log('🗑️  Removed .vscode/dolphin.code-snippets');
  }

  // Remove from settings.json
  const settingsPath = path.join(vscodeDir, 'settings.json');
  if (fs.existsSync(settingsPath)) {
    let settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    if (settings['html.customData']) {
      settings['html.customData'] = settings['html.customData'].filter(p => p !== "./.vscode/dolphin-tags.json");
      if (settings['html.customData'].length === 0) {
        delete settings['html.customData'];
      }
      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
      console.log('🗑️  Cleaned up .vscode/settings.json');
    }
    
    // If settings.json is empty, delete it
    if (Object.keys(settings).length === 0) {
      fs.unlinkSync(settingsPath);
    }
  }

  // If .vscode is empty, remove it
  if (fs.existsSync(vscodeDir) && fs.readdirSync(vscodeDir).length === 0) {
    fs.rmdirSync(vscodeDir);
  }
} catch (error) {
  console.log('⚠️  Could not clean .vscode directory:', error.message);
}

// 2. Remove Config File
try {
  const configPath = path.join(projectRoot, 'dolphin.config.json');
  if (fs.existsSync(configPath)) {
    fs.unlinkSync(configPath);
    console.log('🗑️  Removed dolphin.config.json');
  }
} catch (error) {
  console.log('⚠️  Could not remove config file:', error.message);
}

// 3. Uninstall Package
console.log('📦 Attempting to uninstall dolphin-css-cli...');
try {
  // Check if it's in package.json
  const pkgPath = path.join(projectRoot, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if ((pkg.dependencies && pkg.dependencies['dolphin-css-cli']) || (pkg.devDependencies && pkg.devDependencies['dolphin-css-cli'])) {
      console.log('⏳ Uninstalling package via npm...');
      execSync('npm uninstall dolphin-css-cli', { stdio: 'inherit' });
      console.log('✅ Successfully uninstalled dolphin-css-cli');
    } else {
      console.log('ℹ️  Package not found in package.json. It might have been run via npx.');
    }
  } else {
    console.log('ℹ️  No package.json found.');
  }
} catch (error) {
  console.log('⚠️  Could not automatically uninstall the package.');
  console.log('💡 You can manually run: npm uninstall dolphin-css-cli');
}

console.log('\n🎉 Project Cleaned! Dolphin CLI has been completely removed from your project.');
console.log('Your clean code remains untouched. Have a great day! 🐬');
