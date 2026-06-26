const fs = require('fs');
const path = require('path');
const { setupVSCodeSupport } = require('./vscode-custom-data.cjs');

// INIT_CWD = directory where user ran npm install
// npm_config_local_prefix = directory where user ran npm link
const projectRoot =
  process.env.INIT_CWD ||
  process.env.npm_config_local_prefix ||
  path.resolve(process.cwd(), '../..');

console.log(`[DolphinCSS] Post-install setup...`);
console.log(`[DolphinCSS] Project root: ${projectRoot}`);

try {
  // Skip if we are inside the dolphincss package itself (dev mode)
  // DOLPHIN_FORCE_SETUP=1 set गरेर override गर्न सकिन्छ (npm link को लागि)
  const rootPackagePath = path.join(projectRoot, 'package.json');
  if (fs.existsSync(rootPackagePath)) {
    const pkg = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));
    if (pkg.name === 'dolphincss' && !process.env.DOLPHIN_FORCE_SETUP) {
      console.log(`[DolphinCSS] Development mode detected. Skipping auto-setup.`);
      console.log(`[DolphinCSS] Tip: npm link पछि manual setup गर्न: DOLPHIN_FORCE_SETUP=1 node scripts/setup-snippets.cjs`);
      process.exit(0);
    }
  }

  const snippetsSource = path.join(__dirname, '../snippets/dolphincss.json');
  const stats = setupVSCodeSupport({
    projectRoot,
    packageRoot: path.join(__dirname, '..'),
    snippetsSource
  });

  console.log(`[DolphinCSS] VS Code support installed in .vscode/`);
  console.log(`[DolphinCSS] IntelliSense entries generated → ${stats.classCount}`);
  console.log(`[DolphinCSS] Marker entries generated → ${stats.markerCount}`);

  console.log(`[DolphinCSS] ✅ Setup complete! Reload VS Code window to activate IntelliSense.`);
  console.log(`[DolphinCSS]    To remove DolphinCSS VS Code files later, run: npx dolphin-cleanup`);

} catch (error) {
  console.warn(`[DolphinCSS] Warning: Auto-setup failed. (${error.message})`);
}
