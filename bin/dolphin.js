#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import axios from 'axios';
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

console.log('🐬 Dolphin CLI [Full-Cloud] Started');
console.log('====================================');

const projectRoot = process.cwd();
const dolphinConfigPath = path.join(projectRoot, 'dolphin.config.json');
const templatesDir = path.join(__dirname, '../templates');

// Global variables to hold remote data
let remoteMarkerMap = {}; 
let remoteBaseUrl = '';
const fetchingMarkers = new Set(); // Fetch हुँदै गरेका मार्करहरू ट्र्याक गर्न

let templateRegistry = {};

function loadLocalMarkers() {
  let localMarkersPath = path.join(__dirname, '../config/markers.json');
  if (!fs.existsSync(localMarkersPath)) {
    localMarkersPath = path.join(__dirname, '../marker.json');
  }

  if (fs.existsSync(localMarkersPath)) {
    const localMarkers = JSON.parse(fs.readFileSync(localMarkersPath, 'utf8'));
    let loadedCount = 0;
    
    for (const [marker, data] of Object.entries(localMarkers)) {
      const templateFile = typeof data === 'string' ? data : data.templateFile;
      let fullTemplatePath = path.join(templatesDir, templateFile);
      if (!fs.existsSync(fullTemplatePath)) {
        fullTemplatePath = path.join(__dirname, '../core-templates', templateFile);
      }

      if (fs.existsSync(fullTemplatePath)) {
        templateRegistry[marker] = {
          content: fs.readFileSync(fullTemplatePath, 'utf8'),
          addClasses: data.addClasses || '',
          isJsxTemplate: templateFile.endsWith('.jsx') || templateFile.endsWith('.tsx')
        };
        loadedCount++;
      }
    }
    
    console.log(`📂 Successfully loaded ${loadedCount} local markers.`);
    return localMarkers;
  }
  return {};
}

// Helper to fetch content from URL
async function fetchRemote(url) {
  try {
    const response = await axios.get(url);
    if (response.status === 404) {
       throw new Error(`File not found (404) at: ${url}`);
    }
    return typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      throw new Error(`Server returned 404 for: ${url}. Please check if the file exists in your GitHub repo.`);
    }
    throw new Error(`Failed to fetch ${url}: ${err.message}`);
  }
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
  let remoteUrl = '';
  
  // 1. Load config
  if (fs.existsSync(dolphinConfigPath)) {
    try {
      const userConfig = JSON.parse(fs.readFileSync(dolphinConfigPath, 'utf8'));
      let rawUrl = userConfig.remoteUrl;

      // GitHub URL Normalization: ब्राउजरको लिङ्कलाई RAW लिङ्कमा बदल्ने
      if (rawUrl && rawUrl.includes('github.com') && rawUrl.includes('/blob/')) {
        rawUrl = rawUrl.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
      }

      remoteUrl = rawUrl;
    } catch (e) {
      console.error('❌ Error parsing dolphin.config.json');
    }
  }

  if (!remoteUrl) {
    remoteUrl = 'https://raw.githubusercontent.com/Phuyalshankar/dolphincss-template/main/config/markers.json';
    console.log(`📄 No remoteUrl in dolphin.config.json. Defaulting to official remote repository: ${remoteUrl}`);
  }

  // Remote Sync with Retry
  const maxRetries = 5;
  let retryCount = 0;

  async function sync() {
    try {
      const cacheBustUrl = `${remoteUrl}?t=${Date.now()}`;
      console.log(`🌐 Syncing markers from: ${cacheBustUrl}`);
      const markersData = await fetchRemote(cacheBustUrl);
      remoteMarkerMap = JSON.parse(markersData);
      
      // remoteUrl is .../config/markers.json, so we need to go up two levels to get the base URL
      const configDirUrl = remoteUrl.substring(0, remoteUrl.lastIndexOf('/')); // .../config
      remoteBaseUrl = configDirUrl.substring(0, configDirUrl.lastIndexOf('/')); // .../main

      console.log(`✅ Remote markers metadata loaded (${Object.keys(remoteMarkerMap).length} items).`);
      console.log(`🚀 On-demand fetching active. (Markers will be downloaded when used)`);

      setupVSCodeIntelliSense(remoteMarkerMap);
      processFile(path.join(projectRoot, 'src/App.jsx'));
      startWatcher();
    } catch (error) {
      console.error(`❌ Sync Error: ${error.message}`);
      
      if (retryCount >= maxRetries) {
        console.log('⚠️ Falling back to local mode after maximum retries...');
        const localMarkers = loadLocalMarkers();
        setupVSCodeIntelliSense(localMarkers);
        startWatcher();
        return;
      }

      retryCount++;
      console.log(`🔄 Retrying in 5 seconds... (Attempt ${retryCount})`);
      setTimeout(sync, 5000);
    }
  }

  sync();
}

async function processFile(filePath) {
  console.log(`🔍 processFile triggered for: ${filePath}`);
  if (filePath.includes('templates' + path.sep) || filePath.includes('bin' + path.sep) || filePath.includes('node_modules')) return;

  const ext = path.extname(filePath).toLowerCase();
  const isReact = ['.jsx', '.tsx', '.js', '.ts'].includes(ext);

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    const classAttrName = isReact ? 'className' : 'class';

    // On-demand fetching: यदि कोडमा 'd-' मार्कर भेटियो भने मात्र डाउनलोड गर्ने
    const possibleMarkers = content.match(/dolphin-[a-zA-Z0-9-]+/g);
    if (possibleMarkers) {
      for (const markerClass of possibleMarkers) {
        // सेफ्टी चेक: रिमोट लिस्ट लोड नभएको अवस्थामा
        if (!remoteMarkerMap || Object.keys(remoteMarkerMap).length === 0) {
          continue;
        }

        // Check if the marker is already in the registry or currently being fetched
        if (!templateRegistry[markerClass] && remoteMarkerMap[markerClass] && !fetchingMarkers.has(markerClass)) {
          fetchingMarkers.add(markerClass); // Mark as fetching

          try {
            const data = remoteMarkerMap[markerClass];
            const templateFile = typeof data === 'string' ? data : data.templateFile;
              const localTemplatePath = path.join(__dirname, '../core-templates', templateFile);
              let templateContent = '';
              if (fs.existsSync(localTemplatePath)) {
                console.log('🏠 Loaded core template locally: ' + markerClass);
                templateContent = fs.readFileSync(localTemplatePath, 'utf8');
              } else {
                const templateUrl = `${remoteBaseUrl}/templates/${templateFile}?t=${Date.now()}`;
                console.log('🌐 Fetching template for: ' + markerClass + ' from ' + templateUrl + '...');
                templateContent = await fetchRemote(templateUrl);
              }
            if (templateContent) {
              templateContent = templateContent.replace(/>\s*</g, '>\n<');
              templateContent = indentHtmlOrJsx(templateContent, 8);
            }
            templateRegistry[markerClass] = {
              content: templateContent,
              addClasses: data.addClasses || '',
              isJsxTemplate: templateFile.endsWith('.jsx') || templateFile.endsWith('.tsx')
            };
            console.log(`✅ Fetched and registered ${markerClass}`);
          } catch (error) {
            console.error(`   ❌ Failed to fetch template for ${markerClass}: ${error.message}`);
          } finally {
            fetchingMarkers.delete(markerClass); // Always remove from fetching set
          }
        } else {
            console.log(`Skipping fetch for ${markerClass}: InRegistry=${!!templateRegistry[markerClass]} InRemote=${!!remoteMarkerMap[markerClass]} Fetching=${fetchingMarkers.has(markerClass)}`);
        }
      }
    }

    const markerKeys = Object.keys(templateRegistry);
    if (markerKeys.length === 0) return;
    // Improved regex: flexible for attribute order, quotes, spaces, and captures opening tag
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
             console.log(`✨ Generated FULL file component: ${markerClass} in ${path.basename(filePath)}`);
             found = false;
             modified = true;
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
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.log(`⚠️ Error processing ${filePath}: ${error.message}`);
  }
}

function startWatcher() {
  const watcher = chokidar.watch(['./src/**/*.{js,jsx,ts,tsx,html}', './*.html'], {
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

