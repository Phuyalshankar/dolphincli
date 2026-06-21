import fs from 'fs';
import path from 'path';
import components from './scripts/components.js';

export default function dolphincssPlugin() {
  return {
    name: 'vite-plugin-dolphincss',
    enforce: 'pre',
    
    // transform hook runs for every file processed by Vite
    transform(code, id) {
      // Only process our target files
      const ext = path.extname(id);
      if (!['.jsx', '.tsx', '.js', '.html'].includes(ext) || id.includes('node_modules')) {
        return null;
      }

      // We read the original file directly to avoid writing Vite's injected boilerplate back to disk
      let originalCode;
      try {
        originalCode = fs.readFileSync(id, 'utf8');
      } catch (err) {
        return null;
      }

      let modified = false;
      let newOriginalCode = originalCode;

      for (const [marker, replacement] of Object.entries(components)) {
        // Regex to match <div className="marker"></div> with any spacing/newlines inside
        // Using [\"'] instead of capture groups to simplify and avoid backreference issues
        const regex = new RegExp(
          `<div\\s+class(?:Name)?=[\"']${marker}[\"']\\s*>\\s*</div>|<div\\s+class(?:Name)?=[\"']${marker}[\"']\\s*/>`,
          'g'
        );

        if (regex.test(newOriginalCode)) {
          // IMPORTANT: Use () => replacement to avoid $1, $2 substitution from things like $120.50
          newOriginalCode = newOriginalCode.replace(regex, () => replacement);
          modified = true;
          console.log(`\n✨ DolphinCSS: Injected '${marker}' into ${path.basename(id)}`);
        }
      }

      if (modified) {
        // Write the clean replaced code back to the file system so the user sees it
        setTimeout(() => {
          try {
            fs.writeFileSync(id, newOriginalCode, 'utf8');
          } catch (err) {
            console.error(`❌ DolphinCSS: Error writing to ${id}`, err);
          }
        }, 0);
        
        // Also apply the replacement to the current transform stream
        let newCode = code;
        for (const [marker, replacement] of Object.entries(components)) {
          const regex = new RegExp(
            `<div\\s+class(?:Name)?=[\"']${marker}[\"']\\s*>\\s*</div>|<div\\s+class(?:Name)?=[\"']${marker}[\"']\\s*/>`,
            'g'
          );
          if (regex.test(newCode)) {
            newCode = newCode.replace(regex, () => replacement);
          }
        }
        
        return {
          code: newCode,
          map: null
        };
      }

      return null;
    }
  };
}
