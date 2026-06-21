const fs = require('fs');
const path = require('path');

const colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const anglesAndShapes = [
  { name: '45', value: '45deg', type: 'linear' },
  { name: '90', value: '90deg', type: 'linear' },
  { name: '135', value: '135deg', type: 'linear' },
  { name: '180', value: '180deg', type: 'linear' },
  { name: 'circle', value: 'circle', type: 'radial' },
  { name: 'conic', value: 'from 0deg', type: 'conic' }
];

let css = '/* ===== DYNAMIC GRADIENTS ===== */\n\n';

const colorCombos = [];
colors.forEach(c => {
  shades.forEach(s => {
    colorCombos.push(`${c}-${s}`);
  });
});

colorCombos.forEach(start => {
  colorCombos.forEach(end => {
    anglesAndShapes.forEach(modifier => {
      const className = `gradient-${start}-${end}-${modifier.name}`;
      const startVar = `var(--color-${start})`;
      const endVar = `var(--color-${end})`;
      
      let background = '';
      if (modifier.type === 'linear') {
        background = `linear-gradient(${modifier.value}, ${startVar}, ${endVar})`;
      } else if (modifier.type === 'radial') {
        background = `radial-gradient(${modifier.value}, ${startVar}, ${endVar})`;
      } else if (modifier.type === 'conic') {
        background = `conic-gradient(${modifier.value}, ${startVar}, ${endVar})`;
      }

      // Generate as @utility so Tailwind 4 only includes it if used!
      css += `@utility ${className} { background-image: ${background}; }\n`;
    });
  });
});

fs.writeFileSync(path.join(__dirname, 'MainCss', 'dynamic-gradients.css'), css);
console.log('dynamic-gradients.css generated successfully.');
