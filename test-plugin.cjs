const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ matchUtilities, theme }) {
  matchUtilities({
    'gradient': (value) => {
      // Example value: "primary-500-secondary-900-45"
      const parts = value.split('-');
      if (parts.length >= 4) {
        // Find angle if the last part is a number
        let angle = '135deg';
        let colorParts = parts;
        
        if (!isNaN(parts[parts.length - 1])) {
          angle = parts[parts.length - 1] + 'deg';
          colorParts = parts.slice(0, -1);
        }

        // colorParts is like ["primary", "500", "secondary", "900"]
        // We can dynamically resolve CSS variables
        if (colorParts.length === 4) {
          const startColor = `var(--color-${colorParts[0]}-${colorParts[1]})`;
          const endColor = `var(--color-${colorParts[2]}-${colorParts[3]})`;
          
          return {
            backgroundImage: `linear-gradient(${angle}, ${startColor}, ${endColor})`
          };
        } else if (colorParts.length === 2) {
          // Fallback if they just do gradient-primary-secondary
           const startColor = `var(--color-${colorParts[0]})`;
           const endColor = `var(--color-${colorParts[1]})`;
           return {
             backgroundImage: `linear-gradient(${angle}, ${startColor}, ${endColor})`
           };
        }
      }
      return null;
    }
  });
});
