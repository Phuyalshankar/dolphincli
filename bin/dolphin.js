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

async function init() {
  try {
    let remoteUrl = '';
    
    // 1. Load config
    if (fs.existsSync(dolphinConfigPath)) {
      const userConfig = JSON.parse(fs.readFileSync(dolphinConfigPath, 'utf8'));
      remoteUrl = userConfig.remoteUrl;
    }

    if (!remoteUrl) {
      console.log('📄 Using local mode (No remoteUrl in dolphin.config.json)');
      // Fallback to local markers if remote is missing
      const localMarkers = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/markers.json'), 'utf8'));
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

    for (const [marker, templateData] of Object.entries(templateRegistry)) {
      const pattern = new RegExp(`(<([a-z0-9-]+)[^>]+(?:class|className)=["'][^"']*)${marker}([^"']*["']\\s*>)(?:\\s*</\\2>)?`, 'gi');

      if (pattern.test(content)) {
        modified = true;
        console.log(`✨ Expanding component: ${marker} in ${path.basename(filePath)}`);

        content = content.replace(pattern, (match, before, tagName, after) => {
          const classMatch = match.match(/(?:class|className)=["']([^"']*)["']/);
          let currentClasses = classMatch ? classMatch[1] : '';

          let cleanClasses = currentClasses.replace(new RegExp(`\\s*${marker}\\s*`, 'gi'), ' ').trim();
          if (templateData.addClasses) {
            cleanClasses = (templateData.addClasses + ' ' + cleanClasses).trim();
          }

          const attrName = isReact ? 'className' : 'class';
          const classAttr = cleanClasses ? `${attrName}="${cleanClasses}"` : '';
          
          let newHeader = (before + after).replace(new RegExp(`\\s*${marker}\\s*`, 'gi'), ' ');
          newHeader = newHeader.replace(/(?:class|className)=["'][^"']*["']/, classAttr).replace(/\s+/g, ' ').replace(' >', '>');
          newHeader = newHeader.replace(/\s+>/, '>');

          let finalTemplate = templateData.content;
          if (isReact) {
            finalTemplate = finalTemplate
              .replace(/class=/g, 'className=')
              .replace(/for=/g, 'htmlFor=')
              .replace(/tabindex=/g, 'tabIndex=')
              .replace(/onclick=/g, 'onClick=')
              // SVG camelCase attributes
              .replace(/stroke-linecap=/g, 'strokeLinecap=')
              .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
              .replace(/stroke-width=/g, 'strokeWidth=')
              .replace(/fill-rule=/g, 'fillRule=')
              .replace(/clip-rule=/g, 'clipRule=')
              .replace(/stop-color=/g, 'stopColor=')
              // style string to object: style="width: 40px;" => style={{width: '40px'}}
              .replace(/style="([^"]*)"/g, (_, s) => {
                const obj = s.split(';').filter(Boolean).map(p => {
                  const [k, v] = p.split(':').map(x => x.trim());
                  const camel = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
                  return `${camel}: '${v}'`;
                }).join(', ');
                return `style={{${obj}}}`;
              })
              // Self-closing void tags
              // Self-closing void tags - safe single-line match only
              // First normalize multi-line void tag attributes to single line, then self-close
              .replace(/<(input|img|br|hr)(\s[^>]*)?\n([^>]*?)>/gi, '<$1$2 $3>')
              .replace(/<(input|img|br|hr)(\s[^>]*)?\n([^>]*?)>/gi, '<$1$2 $3>')
              .replace(/<(input|img|br|hr)(\s[^>]*)?\n([^>]*?)>/gi, '<$1$2 $3>')
              .replace(/<(input|img|br|hr)([^>]*)(?<!\/)>/gi, '<$1$2 />');
          }

          return `${newHeader}\n${finalTemplate}\n</${tagName}>`;
        });
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
