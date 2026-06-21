const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'MainCss', 'varient.css');
let content = fs.readFileSync(filePath, 'utf8');

// Replace standard buttons
content = content.replace(
  /\.filled\s*\{\s*@apply[^;]+;\s*\}/,
  `.filled {
    @apply font-medium rounded-md inline-flex items-center justify-center select-none transition-all duration-200;
    background-color: var(--current-bg, var(--color-surface));
    color: var(--current-text, var(--color-text)) !important;
  }`
);

content = content.replace(
  /\.outlined\s*\{\s*@apply[^;]+;\s*\}/,
  `.outlined {
    @apply rounded-md bg-transparent inline-flex items-center justify-center select-none transition-all duration-200;
    border: 2px solid var(--current-border, var(--color-border));
    color: var(--current-color, var(--color-text)) !important;
  }`
);

content = content.replace(
  /\.plain\s*\{\s*@apply[^;]+;\s*\}/,
  `.plain {
    @apply bg-transparent inline-flex items-center justify-center select-none transition-all duration-200;
    color: var(--current-color, var(--color-text)) !important;
  }`
);

// Remove hardcoded .primary.filled etc.
content = content.replace(/\.(primary|secondary|success|warning|danger|info)\.(filled|outlined|plain)\s*\{[^}]+\}/g, '');

// Update .circle
content = content.replace(
  /\.circle\s*\{\s*@apply[^;]+;\s*background-color:[^;]+;\s*color:[^;]+;\s*\}/,
  `.circle {
    @apply rounded-full shadow-md hover:shadow-lg inline-flex items-center justify-center select-none transition-shadow duration-200 cursor-pointer;
    background-color: var(--current-bg, transparent);
    color: var(--current-text, var(--color-text));
  }`
);

// Remove hardcoded .circle.primary.filled etc.
content = content.replace(/\.circle\.(primary|secondary|success|warning|danger|info)\.(filled|outlined|plain)[^}]+\}/g, '');

// Update .glow
content = content.replace(/\.glow\.(primary|secondary|success|warning|danger|info):hover\s*\{[^}]+\}/g, '');
content = content.replace(
  /\.glow:hover\s*\{\s*box-shadow:[^;]+;\s*\}/,
  `.glow:hover { box-shadow: var(--current-glow, var(--glow-primary)); }`
);

// Clean up empty lines
content = content.replace(/\n\s*\n/g, '\n\n');

fs.writeFileSync(filePath, content);
console.log('varient.css updated successfully.');
