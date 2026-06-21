const fs = require('fs');
const path = require('path');

// Determine the root directory of the project where dolphincss is installed
// In npm scripts, INIT_CWD is the directory where the npm command was run
const projectRoot = process.env.INIT_CWD || path.resolve(process.cwd(), '../..');

console.log(`[DolphinCSS] Post-install setup...`);
console.log(`[DolphinCSS] Checking project root: ${projectRoot}`);

try {
  // If we are in the dolphincss package itself (development mode), don't install snippets to its own root
  // We check this by seeing if the package.json name is dolphincss
  const rootPackagePath = path.join(projectRoot, 'package.json');
  if (fs.existsSync(rootPackagePath)) {
    const pkg = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));
    if (pkg.name === 'dolphincss') {
      console.log(`[DolphinCSS] Development mode detected. Skipping snippets auto-install.`);
      process.exit(0);
    }
  }

  const vscodeDir = path.join(projectRoot, '.vscode');
  const snippetsDest = path.join(vscodeDir, 'dolphincss.code-snippets');
  const snippetsSource = path.join(__dirname, '../snippets/dolphincss.json');

  // Create .vscode directory if it doesn't exist
  if (!fs.existsSync(vscodeDir)) {
    console.log(`[DolphinCSS] Creating .vscode directory...`);
    fs.mkdirSync(vscodeDir, { recursive: true });
  }

  // Copy snippets file
  if (fs.existsSync(snippetsSource)) {
    console.log(`[DolphinCSS] Installing VS Code snippets...`);
    fs.copyFileSync(snippetsSource, snippetsDest);
    console.log(`[DolphinCSS] Success! IntelliSense snippets added to ${snippetsDest}`);
  } else {
    console.warn(`[DolphinCSS] Warning: Snippets source file not found at ${snippetsSource}`);
  }

} catch (error) {
  console.warn(`[DolphinCSS] Warning: Could not install VS Code snippets automatically. (${error.message})`);
}
