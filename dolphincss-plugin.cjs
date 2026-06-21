const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ matchUtilities, theme }) {
  matchUtilities({
    'gradient': (value) => {
      // Expected format: startColor-startShade-endColor-endShade-[angle/shape]
      // Example: primary-500-secondary-900-45
      // Example: primary-500-secondary-900-circle
      
      const parts = value.split('-');
      if (parts.length >= 4) {
        let modifier = '135deg'; // default
        let isRadial = false;
        let isConic = false;
        let colorParts = parts;
        
        // Check if the last part is a modifier (number or shape)
        const lastPart = parts[parts.length - 1];
        if (!isNaN(lastPart)) {
          modifier = lastPart + 'deg';
          colorParts = parts.slice(0, -1);
        } else if (['circle', 'ellipse', 'radial'].includes(lastPart)) {
          modifier = lastPart === 'radial' ? 'circle' : lastPart;
          isRadial = true;
          colorParts = parts.slice(0, -1);
        } else if (['conic', 'square', 'triangle'].includes(lastPart)) {
          // Map square/triangle to conic since they are angular
          modifier = 'from 0deg';
          isConic = true;
          colorParts = parts.slice(0, -1);
        }

        // We should have 4 color parts now: [color1, shade1, color2, shade2]
        // or 2 color parts: [color1, color2]
        if (colorParts.length === 4) {
          const startColor = `var(--color-${colorParts[0]}-${colorParts[1]})`;
          const endColor = `var(--color-${colorParts[2]}-${colorParts[3]})`;
          
          if (isRadial) {
            return { backgroundImage: `radial-gradient(${modifier}, ${startColor}, ${endColor})` };
          } else if (isConic) {
            return { backgroundImage: `conic-gradient(${modifier}, ${startColor}, ${endColor})` };
          } else {
            return { backgroundImage: `linear-gradient(${modifier}, ${startColor}, ${endColor})` };
          }
        } else if (colorParts.length === 2) {
           const startColor = `var(--color-${colorParts[0]})`;
           const endColor = `var(--color-${colorParts[1]})`;
           
           if (isRadial) {
             return { backgroundImage: `radial-gradient(${modifier}, ${startColor}, ${endColor})` };
           } else if (isConic) {
             return { backgroundImage: `conic-gradient(${modifier}, ${startColor}, ${endColor})` };
           } else {
             return { backgroundImage: `linear-gradient(${modifier}, ${startColor}, ${endColor})` };
           }
        }
      }
      return null;
    }
  });
});
