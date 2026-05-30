import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function indentHtmlOrJsx(htmlStr, initialIndent = 8) {
  const lines = htmlStr.split('\n');
  let currentIndent = initialIndent;
  const indentStep = 2; // 2 spaces
  
  const formattedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    
    // Count tags
    const openCount = (trimmed.match(/<[a-zA-Z0-9-]+(?:\s|>)/gi) || []).length;
    const closeCount = (trimmed.match(/<\/[a-zA-Z0-9-]+>/gi) || []).length;
    const selfCloseCount = (trimmed.match(/\/>/g) || []).length;
    
    const netChange = (openCount - selfCloseCount) - closeCount;
    
    // If the line starts with a closing tag, adjust its indent before printing
    let lineIndent = currentIndent;
    if (trimmed.startsWith('</') || trimmed.startsWith('}')) {
      lineIndent = Math.max(initialIndent, currentIndent - indentStep);
    }
    
    const spaces = ' '.repeat(lineIndent);
    const result = spaces + trimmed;
    
    // Apply net depth change for the next lines
    currentIndent = Math.max(initialIndent, currentIndent + netChange * indentStep);
    
    return result;
  });
  
  return formattedLines.filter(Boolean).join('\n');
}

export default function dolphincssPlugin() {
  const components = {};
  let remoteMarkerMap = null;
  let remoteBaseUrl = '';
  let initPromise = null;
  const activeFetches = new Map();
  let isDev = false;

  async function ensureInitialized(projectRoot) {
    if (initPromise) return initPromise;

    initPromise = (async () => {
      // 1. Try to load local markers and templates
      try {
        let configPath = path.join(__dirname, 'config', 'markers.json');
        if (!fs.existsSync(configPath)) {
          configPath = path.join(__dirname, 'marker.json');
        }
        if (fs.existsSync(configPath)) {
          const localMarkers = JSON.parse(fs.readFileSync(configPath, 'utf8'));
          for (const [marker, data] of Object.entries(localMarkers)) {
            const templateFile = typeof data === 'string' ? data : data.templateFile;
            let templatePath = path.join(__dirname, 'templates', templateFile);
            if (!fs.existsSync(templatePath)) {
              templatePath = path.join(__dirname, 'core-templates', templateFile);
            }
            if (fs.existsSync(templatePath)) {
              components[marker] = {
                content: fs.readFileSync(templatePath, 'utf8'),
                addClasses: data.addClasses || '',
                isJsxTemplate: templateFile.endsWith('.jsx') || templateFile.endsWith('.tsx')
              };
            }
          }
        }
      } catch (err) {
        console.error('⚠️ DolphinCSS: Error loading local markers', err);
      }

      // 2. Load remote configuration
      let remoteUrl = '';
      const dolphinConfigPath = path.join(projectRoot, 'dolphin.config.json');
      if (fs.existsSync(dolphinConfigPath)) {
        try {
          const userConfig = JSON.parse(fs.readFileSync(dolphinConfigPath, 'utf8'));
          let rawUrl = userConfig.remoteUrl;
          if (rawUrl && rawUrl.includes('github.com') && rawUrl.includes('/blob/')) {
            rawUrl = rawUrl.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
          }
          remoteUrl = rawUrl;
        } catch (e) {}
      }

      if (!remoteUrl) {
        remoteUrl = 'https://raw.githubusercontent.com/Phuyalshankar/dolphincss-template/main/config/markers.json';
      }

      try {
        const cacheBustUrl = `${remoteUrl}?t=${Date.now()}`;
        console.log(`🌐 DolphinCSS: Syncing markers from: ${cacheBustUrl}`);
        const response = await fetch(cacheBustUrl);
        if (response.ok) {
          const text = await response.text();
          remoteMarkerMap = JSON.parse(text);
          
          const configDirUrl = remoteUrl.substring(0, remoteUrl.lastIndexOf('/'));
          remoteBaseUrl = configDirUrl.substring(0, configDirUrl.lastIndexOf('/'));
          console.log(`✅ DolphinCSS: Remote markers loaded (${Object.keys(remoteMarkerMap).length} items).`);
        }
      } catch (err) {
        console.error(`⚠️ DolphinCSS: Failed to load remote markers: ${err.message}`);
      }
    })();

    return initPromise;
  }

  async function fetchRemote(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return await response.text();
  }

  async function handleTransform(code, id) {
    const ext = path.extname(id).toLowerCase();
    if (!['.jsx', '.tsx', '.js', '.ts', '.html'].includes(ext) || id.includes('node_modules')) {
      return null;
    }

    const projectRoot = process.cwd();
    await ensureInitialized(projectRoot);

    let content = code;
    let modified = false;
    const isReact = ['.jsx', '.tsx', '.js', '.ts'].includes(ext);
    const classAttrName = isReact ? 'className' : 'class';

    // 1. Fetch missing markers on-demand (with race-condition protection)
    const possibleMarkers = content.match(/dolphin-[a-zA-Z0-9-]+/g);
    if (possibleMarkers && remoteMarkerMap) {
      for (const markerClass of possibleMarkers) {
        if (!components[markerClass]) {
          if (activeFetches.has(markerClass)) {
            // If already fetching, wait for the existing fetch to complete
            await activeFetches.get(markerClass);
          } else if (remoteMarkerMap[markerClass]) {
            const fetchPromise = (async () => {
              try {
                const data = remoteMarkerMap[markerClass];
                const templateFile = typeof data === 'string' ? data : data.templateFile;
                let localTemplatePath = path.join(__dirname, 'core-templates', templateFile);
                if (!fs.existsSync(localTemplatePath)) {
                  localTemplatePath = path.join(__dirname, 'templates', templateFile);
                }

                let templateContent = '';
                if (fs.existsSync(localTemplatePath)) {
                  templateContent = fs.readFileSync(localTemplatePath, 'utf8');
                } else if (remoteBaseUrl) {
                  const templateUrl = `${remoteBaseUrl}/templates/${templateFile}?t=${Date.now()}`;
                  console.log(`🌐 DolphinCSS: Fetching remote template for ${markerClass}...`);
                  templateContent = await fetchRemote(templateUrl);
                }

                if (templateContent) {
                  templateContent = templateContent.replace(/>\s*</g, '>\n<');
                  templateContent = indentHtmlOrJsx(templateContent, 8);
                  components[markerClass] = {
                    content: templateContent,
                    addClasses: data.addClasses || '',
                    isJsxTemplate: templateFile.endsWith('.jsx') || templateFile.endsWith('.tsx')
                  };
                  console.log(`✅ DolphinCSS: Registered on-demand marker: ${markerClass}`);
                }
              } catch (err) {
                console.error(`❌ DolphinCSS: Failed to fetch template for ${markerClass}:`, err.message);
              }
            })();

            activeFetches.set(markerClass, fetchPromise);
            await fetchPromise;
            activeFetches.delete(markerClass);
          }
        }
      }
    }

    const markerKeys = Object.keys(components);
    if (markerKeys.length === 0) return null;

    // 2. Expand markers in code
    const regex = new RegExp(
      `(<([a-z0-9-]+)\\s+[^>]*${classAttrName}=\\s*["']([^"']*?\\s)?(dolphin-[a-zA-Z0-9-]+)(\\s[^"']*?)?["'][^>]*>)`,
      'gi'
    );

    let found = true;
    while (found) {
      found = false;
      regex.lastIndex = 0;
      let match;

      while ((match = regex.exec(content)) !== null) {
        const fullOpeningTag = match[1];
        const tagName = match[2];
        const beforeClasses = match[3];
        const markerClass = match[4];
        const afterClasses = match[5];

        if (!components[markerClass]) {
          continue;
        }

        // Find matching closing tag
        let depth = 1;
        const startIndex = match.index + fullOpeningTag.length;
        const tagPattern = new RegExp(`</?${tagName}(?:\\s|>|/)`, 'gi');
        tagPattern.lastIndex = startIndex;
        
        let closingTagIndex = -1;
        let tagMatch;
        while ((tagMatch = tagPattern.exec(content)) !== null) {
          const isClosing = tagMatch[0].startsWith('</');
          if (!isClosing) {
            const tagEnd = content.indexOf('>', tagMatch.index);
            if (tagEnd !== -1 && content[tagEnd - 1] === '/') {
              continue;
            }
            depth++;
          } else {
            depth--;
          }
          if (depth === 0) {
            closingTagIndex = tagMatch.index;
            break;
          }
        }

        if (closingTagIndex !== -1) {
          const innerContent = content.substring(startIndex, closingTagIndex);
          const closingTagMatch = content.substring(closingTagIndex).match(new RegExp(`^</${tagName}\\s*>`, 'i'));
          const closingTag = closingTagMatch ? closingTagMatch[0] : `</${tagName}>`;
          
          modified = true;
          const templateData = components[markerClass];

          const classParts = (beforeClasses || '') + (afterClasses || '');
          let allClasses = classParts.trim().split(/\s+/).filter(Boolean);
          allClasses = allClasses.filter(c => c !== markerClass && c !== '');

          if (templateData.addClasses) {
            const addCls = templateData.addClasses.trim().split(/\s+/).filter(Boolean);
            allClasses = [...new Set([...allClasses, ...addCls])];
          }

          const newClassAttr = allClasses.length > 0 ? ` ${classAttrName}="${allClasses.join(' ')}"` : '';
          
          let newOpeningTag = fullOpeningTag.replace(new RegExp(`\\s*${classAttrName}=["'][^"']*["']`, 'i'), newClassAttr ? `${newClassAttr}` : '');
          newOpeningTag = newOpeningTag.replace(/\s+(?:class|className)=["']\s*["']/i, '');

          let finalTemplate = templateData.content;
          
          if (isReact) {
            if (!templateData.isJsxTemplate) {
              finalTemplate = finalTemplate
                .replace(/class=/g, 'className=')
                .replace(/for=/g, 'htmlFor=')
                .replace(/tabindex=/g, 'tabIndex=')
                .replace(/onclick=/g, 'onClick=')
                .replace(/stroke-linecap=/g, 'strokeLinecap=')
                .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
                .replace(/stroke-width=/g, 'strokeWidth=')
                .replace(/fill-rule=/g, 'fillRule=')
                .replace(/clip-rule=/g, 'clipRule=')
                .replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}')
                .replace(/stop-color=/g, 'stopColor=')
                .replace(/style="([^"]*)"/g, (_, s) => {
                  const obj = s.split(';').filter(Boolean).map(p => {
                    const [k, v] = p.split(':').map(x => x.trim());
                    if (!k) return '';
                    const camel = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
                    return `${camel}: '${v}'`;
                  }).filter(Boolean).join(', ');
                  return `style={{${obj}}}`;
                })
                .replace(/<(input|img|br|hr|meta|link)\b([^>]*?)>/gi, (m, t, a) => {
                    if (a.trim().endsWith('/')) return m;
                    return `<${t}${a} />`;
                });
            }
          } else {
            finalTemplate = finalTemplate.replace(/className=/g, 'class=');
          }

          if (finalTemplate.includes('{/* INNER */}')) {
            finalTemplate = finalTemplate.replace('{/* INNER */}', innerContent.trim());
          }

          const fullMatchString = content.substring(match.index, closingTagIndex + closingTag.length);
          if (templateData.isJsxTemplate && finalTemplate.includes('export default') && content.trim() === fullMatchString.trim()) {
             content = finalTemplate;
             found = false;
             break;
          }

          const expanded = `${newOpeningTag}\n${finalTemplate}\n${closingTag}`;
          content = content.substring(0, match.index) + expanded + content.substring(closingTagIndex + closingTag.length);
          found = true;
          break;
        }
      }
    }

    if (modified) {
      return {
        code: content,
        map: null
      };
    }

    return null;
  }

  return {
    name: 'vite-plugin-dolphincss',
    enforce: 'pre',

    configResolved(config) {
      isDev = config.command === 'serve';
    },

    async buildStart() {
      if (!isDev) return;
      const projectRoot = process.cwd();
      await ensureInitialized(projectRoot);

      const srcDir = path.join(projectRoot, 'src');
      if (!fs.existsSync(srcDir)) return;

      const scanDirectory = async (dir) => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            if (entry.name !== 'node_modules' && entry.name !== '.git') {
              await scanDirectory(fullPath);
            }
          } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.jsx', '.tsx', '.js', '.ts', '.html'].includes(ext)) {
              try {
                const code = fs.readFileSync(fullPath, 'utf8');
                const result = await handleTransform(code, fullPath);
                if (result && result.code) {
                  fs.writeFileSync(fullPath, result.code, 'utf8');
                  console.log(`\n✨ DolphinCSS: Auto-injected template on startup in: ${entry.name}`);
                }
              } catch (e) {
                // Ignore individual file errors
              }
            }
          }
        }
      };

      await scanDirectory(srcDir);
    },

    async transform(code, id) {
      const result = await handleTransform(code, id);
      if (result && result.code && isDev) {
        try {
          fs.writeFileSync(id, result.code, 'utf8');
          console.log(`\n✨ DolphinCSS: Injected and updated source file: ${path.basename(id)}`);
        } catch (err) {
          console.error(`⚠️ DolphinCSS: Failed to write back to ${id}:`, err.message);
        }
      }
      return result;
    }
  };
}
