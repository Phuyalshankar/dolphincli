const fs = require('fs');
const path = require('path');

const colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
const shades = [
  { name: '50', mix: '10%', with: 'white' },
  { name: '100', mix: '20%', with: 'white' },
  { name: '200', mix: '40%', with: 'white' },
  { name: '300', mix: '60%', with: 'white' },
  { name: '400', mix: '80%', with: 'white' },
  { name: '500', isBase: true },
  { name: '600', mix: '80%', with: 'black' },
  { name: '700', mix: '60%', with: 'black' },
  { name: '800', mix: '40%', with: 'black' },
  { name: '900', mix: '20%', with: 'black' },
  { name: '950', mix: '10%', with: 'black' },
];

let css = '/* ===== DYNAMIC SHADES (50-950) ===== */\n\n:root {\n';

// 1. Generate CSS Variables
colors.forEach(color => {
  shades.forEach(shade => {
    if (shade.isBase) {
      css += `  --color-${color}-${shade.name}: var(--color-${color});\n`;
    } else {
      css += `  --color-${color}-${shade.name}: color-mix(in oklch, var(--color-${color}) ${shade.mix}, ${shade.with});\n`;
    }
  });
  css += '\n';
});

css += '}\n\n/* ===== GLOBAL SHADE CLASSES ===== */\n\n';

// 2. Generate Global Classes
colors.forEach(color => {
  shades.forEach(shade => {
    css += `.${color}-${shade.name} {
  --current-bg: var(--color-${color}-${shade.name});
  --current-border: var(--color-${color}-${shade.name});
  --current-color: var(--color-${color}-${shade.name});
  --current-text: var(--color-text-light); /* Or appropriate contrast */
}\n`;
  });
});

fs.writeFileSync(path.join(__dirname, 'MainCss', 'shades.css'), css);
console.log('shades.css generated successfully.');
