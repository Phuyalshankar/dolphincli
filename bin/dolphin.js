#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const https = require('https');

console.log('🐬 Dolphin CLI [Full-Cloud] Started');
console.log('====================================');

const projectRoot = process.cwd();
const dolphinConfigPath = path.join(projectRoot, 'dolphin.config.json');
const templatesDir = path.join(__dirname, '../templates');

let templateRegistry = {};

// Helper to fetch content from URL
function fetchRemote(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) return reject(new Error(`Server error: ${res.statusCode}`));
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', (err) => reject(err));
  });
}

function setupVSCodeIntelliSense(markers) {
  try {
    const vscodeDir = path.join(projectRoot, '.vscode');
    if (!fs.existsSync(vscodeDir)) {
      fs.mkdirSync(vscodeDir);
    }

    // 1. Clean up old Snippets if they exist (user no longer wants code snippets)
    const snippetsPath = path.join(vscodeDir, 'dolphin.code-snippets');
    if (fs.existsSync(snippetsPath)) {
      fs.unlinkSync(snippetsPath);
    }

    // 2. Generate Custom HTML Data (This provides the CSS class name suggestions)
    const customData = {
      version: 1.1,
      tags: Object.keys(markers).map(marker => ({
        name: marker,
        description: `Dolphin CLI Component`
      })),
      globalAttributes: [
        { name: "class", valueSet: "dolphin-classes" },
        { name: "className", valueSet: "dolphin-classes" }
      ],
      valueSets: [
        {
          name: "dolphin-classes",
          values: Object.keys(markers).map(marker => {
            const data = markers[marker];
            const templateFile = typeof data === 'string' ? data : data.templateFile;
            return {
              name: marker,
              description: `Dolphin CLI Component (${templateFile})`
            };
          })
        }
      ]
    };
    fs.writeFileSync(path.join(vscodeDir, 'dolphin-tags.json'), JSON.stringify(customData, null, 2));

    // 3. Update settings.json
    const settingsPath = path.join(vscodeDir, 'settings.json');
    let settings = {};
    if (fs.existsSync(settingsPath)) {
      try {
        settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
      } catch (e) {}
    }
    
    if (!settings['html.customData']) {
      settings['html.customData'] = [];
    }
    
    if (!settings['html.customData'].includes("./.vscode/dolphin-tags.json")) {
      settings['html.customData'].push("./.vscode/dolphin-tags.json");
      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    }
    
    console.log('✨ VS Code IntelliSense (Auto-Suggest) configured!');
  } catch (error) {
    console.log(`⚠️ Could not setup VS Code IntelliSense: ${error.message}`);
  }
}

async function init() {
  try {
    let remoteUrl = '';
    
    // 1. Load config
    if (fs.existsSync(dolphinConfigPath)) {
      const userConfig = JSON.parse(fs.readFileSync(dolphinConfigPath, 'utf8'));
      remoteUrl = userConfig.remoteUrl;
    }

    let allMarkers = {};

    if (!remoteUrl) {
      console.log('📄 Using local mode (No remoteUrl in dolphin.config.json)');
      // Fallback to local markers if remote is missing
      const localMarkers = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/markers.json'), 'utf8'));
      allMarkers = localMarkers;
      console.log(`📂 Loading ${Object.keys(localMarkers).length} local markers...`);
      for (const [marker, data] of Object.entries(localMarkers)) {
        const templateFile = typeof data === 'string' ? data : data.templateFile;
        const fullTemplatePath = path.join(templatesDir, templateFile);
        if (fs.existsSync(fullTemplatePath)) {
          templateRegistry[marker] = {
            content: fs.readFileSync(fullTemplatePath, 'utf8'),
            addClasses: data.addClasses || ''
          };
          console.log(`   ✅ Marker registered: ${marker} (${templateFile})`);
        } else {
          console.log(`   ❌ Template NOT FOUND for ${marker}: ${templateFile}`);
        }
      }
    } else {
      console.log(`🌐 Syncing with Dolphin UI Server: ${remoteUrl}`);
      // Fetch the main markers list from server
      const markersJson = await fetchRemote(remoteUrl);
      const markers = JSON.parse(markersJson);
      allMarkers = markers;

      // Get base URL for templates (assuming they are in the same server)
      const baseUrl = remoteUrl.substring(0, remoteUrl.lastIndexOf('/'));

      console.log(`📥 Downloading ${Object.keys(markers).length} remote templates...`);
      
      for (const [marker, data] of Object.entries(markers)) {
        console.log(`   - Fetching ${marker}...`);
        const templateContent = await fetchRemote(`${baseUrl}/templates/${data.templateFile}`);
        templateRegistry[marker] = {
          content: templateContent,
          addClasses: data.addClasses || ''
        };
      }
      console.log('✅ All remote templates synced and cached in memory.');
    }

    setupVSCodeIntelliSense(allMarkers);
    startWatcher();
  } catch (error) {
    console.error(`❌ Sync Error: ${error.message}`);
    console.log('💡 Running in fallback local mode...');
    // Add local fallback logic here if needed
  }
}

function processFile(filePath) {
  if (filePath.includes('templates' + path.sep) || filePath.includes('bin' + path.sep) || filePath.includes('node_modules')) return;

  const ext = path.extname(filePath).toLowerCase();
  const isReact = ['.jsx', '.tsx', '.js', '.ts'].includes(ext);

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    const classAttrName = isReact ? 'className' : 'class';

    // We use a dynamic regex approach to capture opening tag, content, and closing tag
    // This prevents duplicate closing tags and allows '{/* INNER */}' replacement
    const markerKeys = Object.keys(templateRegistry);
    if (markerKeys.length === 0) return;

    // Improved regex: flexible for attribute order, quotes, spaces, and captures opening tag
    const regex = new RegExp(
      `(<([a-z0-9-]+)\\s+[^>]*${classAttrName}=\\s*["']([^"']*?\\s)?(d-[a-zA-Z0-9-]+)(\\s[^"']*?)?["'][^>]*>)`,
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

        if (!templateRegistry[markerClass]) {
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
          console.log(`✨ Expanding component: ${markerClass} in ${path.basename(filePath)}`);
          const templateData = templateRegistry[markerClass];

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
          } else {
              finalTemplate = finalTemplate.replace(/className=/g, 'class=');
          }

          if (finalTemplate.includes('{/* INNER */}')) {
            finalTemplate = finalTemplate.replace('{/* INNER */}', innerContent.trim());
          }

          const expanded = `${newOpeningTag}\n${finalTemplate}\n${closingTag}`;
          content = content.substring(0, match.index) + expanded + content.substring(closingTagIndex + closingTag.length);
          found = true;
          break;
        }
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.log(`⚠️ Error processing ${filePath}: ${error.message}`);
  }
}

function startWatcher() {
  const watcher = chokidar.watch(['**/*.{js,jsx,ts,tsx,html}'], {
    ignored: /(node_modules|\.git|templates|bin)/,
    persistent: true,
    ignoreInitial: false,
    awaitWriteFinish: { stabilityThreshold: 400, pollInterval: 100 },
  });

  watcher.on('add', filePath => processFile(filePath)).on('change', filePath => processFile(filePath));
  console.log('👁️  Watching for markers...');
}

init();

process.on('SIGINT', () => {
  console.log('\n👋 Dolphin CLI stopped');
  process.exit(0);
});
