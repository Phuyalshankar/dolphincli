const fs = require('fs');
const path = require('path');

// Run from user's project root (via npx dolphin-cleanup or npm run dolphin:cleanup)
const projectRoot = process.env.INIT_CWD || process.cwd();

console.log(`[DolphinCSS] Cleaning up VS Code files...`);

const vscodeDir = path.join(projectRoot, '.vscode');

if (!fs.existsSync(vscodeDir)) {
  console.log(`[DolphinCSS] No .vscode directory found. Nothing to clean.`);
  process.exit(0);
}

// ── 1. Delete dolphincss-specific files ───────────────────────────────────
const filesToDelete = [
  'dolphincss.code-snippets',
  'dolphin-tags.json',
];

for (const file of filesToDelete) {
  const filePath = path.join(vscodeDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`[DolphinCSS] Deleted: .vscode/${file}`);
  }
}

// ── 2. Remove dolphincss entry from settings.json (non-destructive) ────────
const settingsPath = path.join(vscodeDir, 'settings.json');
if (fs.existsSync(settingsPath)) {
  try {
    let settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

    const tagsEntry = './.vscode/dolphin-tags.json';
    if (Array.isArray(settings['html.customData'])) {
      const before = settings['html.customData'].length;
      settings['html.customData'] = settings['html.customData'].filter(
        (entry) => entry !== tagsEntry
      );

      // If the array is now empty, remove the key entirely
      if (settings['html.customData'].length === 0) {
        delete settings['html.customData'];
      }

      if (settings['html.customData']?.length !== before || before === 0) {
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
        console.log(`[DolphinCSS] Removed DolphinCSS entry from settings.json`);
      }

      // If settings.json is now empty {}, delete it
      if (Object.keys(settings).length === 0) {
        fs.unlinkSync(settingsPath);
        console.log(`[DolphinCSS] settings.json was empty after cleanup — deleted.`);
      }
    }
  } catch (err) {
    console.warn(`[DolphinCSS] Warning: Could not update settings.json (${err.message})`);
  }
}

// ── 3. If .vscode dir is now completely empty, remove it too ──────────────
try {
  const remaining = fs.readdirSync(vscodeDir);
  if (remaining.length === 0) {
    fs.rmdirSync(vscodeDir);
    console.log(`[DolphinCSS] .vscode directory was empty — removed.`);
  }
} catch { /* ignore */ }

console.log(`[DolphinCSS] ✅ Cleanup complete!`);
