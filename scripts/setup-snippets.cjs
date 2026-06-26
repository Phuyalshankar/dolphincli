// DolphinCSS — postinstall setup (lightweight)
// Heavy CSS parsing हटाइयो → GitHub बाट pre-built dolphin-tags.json fetch गर्छ

const fs = require('fs');
const path = require('path');
const https = require('https');

// INIT_CWD = npm install गर्दा set हुन्छ
// npm_config_local_prefix = npm link गर्दा set हुन्छ
const projectRoot =
  process.env.INIT_CWD ||
  process.env.npm_config_local_prefix ||
  path.resolve(process.cwd(), '../..');

console.log(`[DolphinCSS] Post-install setup...`);
console.log(`[DolphinCSS] Project root: ${projectRoot}`);

// Dev mode skip (dolphincss package आफैं install गर्दा)
const rootPackagePath = path.join(projectRoot, 'package.json');
if (fs.existsSync(rootPackagePath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));
    if (pkg.name === 'dolphincss' && !process.env.DOLPHIN_FORCE_SETUP) {
      console.log(`[DolphinCSS] Development mode — skipping auto-setup.`);
      console.log(`[DolphinCSS] Tip: DOLPHIN_FORCE_SETUP=1 node scripts/setup-snippets.cjs`);
      process.exit(0);
    }
  } catch {}
}

const TAGS_URL = 'https://raw.githubusercontent.com/Phuyalshankar/dolphincss-template/main/config/dolphin-tags.json';

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchText(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

(async () => {
  try {
    const vscodeDir = path.join(projectRoot, '.vscode');
    if (!fs.existsSync(vscodeDir)) fs.mkdirSync(vscodeDir, { recursive: true });

    // GitHub बाट pre-built tags fetch
    const tagsData = await fetchText(TAGS_URL);
    fs.writeFileSync(path.join(vscodeDir, 'dolphin-tags.json'), tagsData, 'utf8');

    // settings.json मा html.customData थप्छ
    const settingsPath = path.join(vscodeDir, 'settings.json');
    let settings = {};
    if (fs.existsSync(settingsPath)) {
      try { settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8')); } catch {}
    }
    if (!Array.isArray(settings['html.customData'])) settings['html.customData'] = [];
    if (!settings['html.customData'].includes('./.vscode/dolphin-tags.json')) {
      settings['html.customData'].push('./.vscode/dolphin-tags.json');
    }
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf8');

    // snippets copy (local बाटै — offline पनि काम गर्छ)
    const snippetsSrc = path.join(__dirname, '../snippets/dolphincss.json');
    if (fs.existsSync(snippetsSrc)) {
      fs.copyFileSync(snippetsSrc, path.join(vscodeDir, 'dolphincss.code-snippets'));
    }

    const parsed = JSON.parse(tagsData);
    const classCount = parsed?.valueSets?.[0]?.values?.length || 0;
    const tagCount = parsed?.tags?.length || 0;

    console.log(`[DolphinCSS] ✅ VSCode IntelliSense ready!`);
    console.log(`[DolphinCSS]    📦 ${classCount} CSS classes | 🏷️  ${tagCount} dolphin-* markers`);
    console.log(`[DolphinCSS]    ➡️  Reload VSCode window to activate (Ctrl+Shift+P → Reload Window)`);
    console.log(`[DolphinCSS]    🧹 To remove: npx dolphin-cleanup`);

  } catch (err) {
    // Network नभए पनि graceful fail — user लाई block गर्दैन
    console.warn(`[DolphinCSS] ⚠️  VSCode setup skipped (${err.message})`);
    console.warn(`[DolphinCSS]    Tip: class="vscode-init" add गर्नुस् — Vite dev server चल्दा auto-setup हुन्छ`);
  }
})();

