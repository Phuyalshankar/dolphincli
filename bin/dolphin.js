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

// Push settings defaults
let pushUrl = 'http://localhost:3000/api/templates/push';
let secretKey = 'dolphin-admin-2025';
let username = 'core';
let authorName = 'DolphinCSS Core';

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
  // Always load local markers first so core/offline templates are available
  loadLocalMarkers();

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

      // Load push configuration
      if (userConfig.pushUrl) pushUrl = userConfig.pushUrl;
      else if (remoteUrl) {
        try {
          const urlObj = new URL(remoteUrl);
          if (urlObj.hostname !== 'github.com' && urlObj.hostname !== 'raw.githubusercontent.com') {
            pushUrl = `${urlObj.origin}/api/templates/push`;
          }
        } catch (e) {}
      }
      if (userConfig.secretKey) secretKey = userConfig.secretKey;
      if (userConfig.username) username = userConfig.username;
      if (userConfig.author) authorName = userConfig.author;
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
      const startupAppPath = path.join(projectRoot, 'src/App.jsx');
      if (fs.existsSync(startupAppPath)) {
        processFile(startupAppPath);
      }
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
  if (filePath.includes('templates' + path.sep) || filePath.includes('bin' + path.sep) || filePath.includes('node_modules')) return;

  const ext = path.extname(filePath).toLowerCase();
  const allowedExtensions = ['.jsx', '.tsx', '.js', '.ts', '.html', '.vue', '.svelte', '.astro', '.php', '.py'];
  if (!allowedExtensions.includes(ext)) return;

  const isReact = ['.jsx', '.tsx', '.js', '.ts'].includes(ext);

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    const classAttrName = isReact ? 'className' : 'class';

    // 0. Scan and handle Component Actions via Markers (push, put, patch, inject, delete)
    const markerRegex = new RegExp(
      `(<([a-z0-9-]+)\\s+[^>]*${classAttrName}=\\s*["']([^"']*?\\s)?(dolphin-(push|put|patch|inject|delete)--([a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)(?:--([a-zA-Z0-9-_]+))?)(\\s[^"']*?)?["'][^>]*>)`,
      'gi'
    );

    let markerMatch;
    markerRegex.lastIndex = 0;
    if ((markerMatch = markerRegex.exec(content)) !== null) {
      const fullOpeningTag = markerMatch[1];
      const tagName = markerMatch[2];
      const beforeClasses = markerMatch[3] || '';
      const markerClass = markerMatch[4];
      const action = markerMatch[5].toLowerCase();
      const componentName = markerMatch[6];
      const componentVariant = markerMatch[7] || 'default';
      const afterClasses = markerMatch[8] || '';

      // Find matching closing tag
      let depth = 1;
      const startIndex = markerMatch.index + fullOpeningTag.length;
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
        const innerContent = content.substring(startIndex, closingTagIndex).trim();
        const closingTagMatch = content.substring(closingTagIndex).match(new RegExp(`^</${tagName}\\s*>`, 'i'));
        const closingTag = closingTagMatch ? closingTagMatch[0] : `</${tagName}>`;

        // Extract metadata from data attributes
        const versionMatch = fullOpeningTag.match(/data-version=["']([^"']+)["']/i);
        const categoryMatch = fullOpeningTag.match(/data-category=["']([^"']+)["']/i);
        const tagsMatch = fullOpeningTag.match(/data-tags=["']([^"']+)["']/i);
        const descMatch = fullOpeningTag.match(/data-description=["']([^"']+)["']/i);
        const publicMatch = fullOpeningTag.match(/data-ispublic=["']([^"']+)["']/i);
        const premiumMatch = fullOpeningTag.match(/data-ispremium=["']([^"']+)["']/i);

        const componentVersion = versionMatch ? versionMatch[1] : '1.0.0';
        const componentCategory = categoryMatch ? categoryMatch[1] : 'general';
        const componentTags = tagsMatch ? tagsMatch[1] : '';
        const componentDesc = descMatch ? descMatch[1] : '';
        const componentIsPublic = publicMatch ? publicMatch[1] === 'true' : true;
        const componentIsPremium = premiumMatch ? premiumMatch[1] === 'true' : false;

        const baseUrl = pushUrl.substring(0, pushUrl.lastIndexOf('/'));

        try {
          if (action === 'push' || action === 'put') {
            console.log(`\n📤 DolphinCSS CLI: Pushing/PUTing component '${componentName}' (${componentVariant}) to ${pushUrl}...`);
            const response = await fetch(pushUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-admin-secret': secretKey
              },
              body: JSON.stringify({
                name: componentName,
                variant: componentVariant,
                code: innerContent,
                version: componentVersion,
                category: componentCategory,
                tags: componentTags,
                description: componentDesc,
                username: username,
                author: authorName,
                isPublic: componentIsPublic,
                isPremium: componentIsPremium
              })
            });

            const resultJson = await response.json();
            if (response.ok && resultJson.success) {
              console.log(`\n✅ DolphinCSS CLI: Component '${componentName}' pushed successfully!`);
              
              // If the server returns a developer-specific token, automatically save it back to dolphin.config.json
              if (resultJson.developerToken && resultJson.developerToken !== secretKey) {
                try {
                  if (fs.existsSync(dolphinConfigPath)) {
                    const currentConfig = JSON.parse(fs.readFileSync(dolphinConfigPath, 'utf8'));
                    currentConfig.secretKey = resultJson.developerToken;
                    fs.writeFileSync(dolphinConfigPath, JSON.stringify(currentConfig, null, 2), 'utf8');
                    console.log(`\n🔑 DolphinCSS: Auto-registered developer! Your personal API token has been saved in dolphin.config.json.`);
                    secretKey = resultJson.developerToken; // update local key reference
                  }
                } catch (e) {
                  console.error(`⚠️ DolphinCSS: Failed to auto-save developerToken: ${e.message}`);
                }
              }

              const pushedClass = markerClass.replace(`dolphin-${action}--`, `dolphin-${action === 'push' ? 'pushed' : 'puted'}--`);
              const newClassAttr = `${beforeClasses}${pushedClass}${afterClasses}`.trim();
              const newOpeningTag = fullOpeningTag.replace(
                new RegExp(`${classAttrName}=\\s*["'][^"']*["']`, 'i'),
                `${classAttrName}="${newClassAttr}"`
              );

              content = content.substring(0, markerMatch.index) + 
                        newOpeningTag + 
                        content.substring(startIndex, closingTagIndex) + 
                        closingTag + 
                        content.substring(closingTagIndex + closingTag.length);
              modified = true;
            } else {
              console.error(`\n❌ DolphinCSS CLI Push/PUT Failed: ${resultJson.error || response.statusText}`);
            }
          }

          else if (action === 'patch') {
            const patchUrl = `${baseUrl}/${encodeURIComponent(componentName)}/settings?author=${encodeURIComponent(username)}&variant=${encodeURIComponent(componentVariant)}`;
            console.log(`\n📤 DolphinCSS CLI: PATCHing component '${componentName}' (${componentVariant}) to ${patchUrl}...`);
            
            const payload = {
              code: innerContent,
              version: componentVersion,
              category: componentCategory,
              tags: componentTags,
              description: componentDesc,
              isPublic: componentIsPublic,
              isPremium: componentIsPremium
            };

            const response = await fetch(patchUrl, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'x-admin-secret': secretKey
              },
              body: JSON.stringify(payload)
            });

            const resultJson = await response.json();
            if (response.ok && resultJson.success) {
              console.log(`\n✅ DolphinCSS CLI: Component '${componentName}' PATCHed successfully!`);
              const pushedClass = markerClass.replace('dolphin-patch--', 'dolphin-patched--');
              const newClassAttr = `${beforeClasses}${pushedClass}${afterClasses}`.trim();
              const newOpeningTag = fullOpeningTag.replace(
                new RegExp(`${classAttrName}=\\s*["'][^"']*["']`, 'i'),
                `${classAttrName}="${newClassAttr}"`
              );

              content = content.substring(0, markerMatch.index) + 
                        newOpeningTag + 
                        content.substring(startIndex, closingTagIndex) + 
                        closingTag + 
                        content.substring(closingTagIndex + closingTag.length);
              modified = true;
            } else {
              console.error(`\n❌ DolphinCSS CLI PATCH Failed: ${resultJson.error || response.statusText}`);
            }
          }

          else if (action === 'inject') {
            const getUrl = `${baseUrl}/${encodeURIComponent(componentName)}?author=${encodeURIComponent(username)}&variant=${encodeURIComponent(componentVariant)}&version=${encodeURIComponent(componentVersion)}`;
            console.log(`\n📥 DolphinCSS CLI: Injecting component '${componentName}' (${componentVariant}) from ${getUrl}...`);

            const response = await fetch(getUrl, {
              headers: {
                'x-admin-secret': secretKey
              }
            });

            if (response.ok) {
              let templateContent = await response.text();
              console.log(`\n✅ DolphinCSS CLI: Component '${componentName}' fetched successfully!`);

              templateContent = templateContent.replace(/>\s*</g, '>\n<');
              templateContent = indentHtmlOrJsx(templateContent, 8);

              const pushedClass = markerClass.replace('dolphin-inject--', 'dolphin-injected--');
              const newClassAttr = `${beforeClasses}${pushedClass}${afterClasses}`.trim();
              const newOpeningTag = fullOpeningTag.replace(
                new RegExp(`${classAttrName}=\\s*["'][^"']*["']`, 'i'),
                `${classAttrName}="${newClassAttr}"`
              );

              content = content.substring(0, markerMatch.index) + 
                        newOpeningTag + 
                        `\n${templateContent}\n` + 
                        closingTag + 
                        content.substring(closingTagIndex + closingTag.length);
              modified = true;
            } else {
              const errText = await response.text();
              console.error(`\n❌ DolphinCSS CLI Inject Failed: ${errText || response.statusText}`);
            }
          }

          else if (action === 'delete') {
            const deleteUrl = `${baseUrl}/${encodeURIComponent(componentName)}?author=${encodeURIComponent(username)}&variant=${encodeURIComponent(componentVariant)}`;
            console.log(`\n🗑️ DolphinCSS CLI: Deleting component '${componentName}' (${componentVariant}) from server: ${deleteUrl}...`);

            const response = await fetch(deleteUrl, {
              method: 'DELETE',
              headers: {
                'x-admin-secret': secretKey
              }
            });

            const resultJson = await response.json();
            if (response.ok && resultJson.success) {
              console.log(`\n✅ DolphinCSS CLI: Component '${componentName}' deleted successfully!`);
              const pushedClass = markerClass.replace('dolphin-delete--', 'dolphin-deleted--');
              const newClassAttr = `${beforeClasses}${pushedClass}${afterClasses}`.trim();
              const newOpeningTag = fullOpeningTag.replace(
                new RegExp(`${classAttrName}=\\s*["'][^"']*["']`, 'i'),
                `${classAttrName}="${newClassAttr}"`
              );

              content = content.substring(0, markerMatch.index) + 
                        newOpeningTag + 
                        content.substring(startIndex, closingTagIndex) + 
                        closingTag + 
                        content.substring(closingTagIndex + closingTag.length);
              modified = true;
            } else {
              console.error(`\n❌ DolphinCSS CLI Delete Failed: ${resultJson.error || response.statusText}`);
            }
          }

        } catch (err) {
          console.error(`\n❌ DolphinCSS CLI Marker Action Error: ${err.message}`);
        }
      }
    }

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
            // Silent skip - already fetched or fetching
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
                .replace(/\bclass=/g, 'className=')
                .replace(/\bfor=/g, 'htmlFor=')
                .replace(/\btabindex=/g, 'tabIndex=')
                .replace(/\bonclick=/g, 'onClick=')
                .replace(/\bstroke-linecap=/g, 'strokeLinecap=')
                .replace(/\bstroke-linejoin=/g, 'strokeLinejoin=')
                .replace(/\bstroke-width=/g, 'strokeWidth=')
                .replace(/\bfill-rule=/g, 'fillRule=')
                .replace(/\bclip-rule=/g, 'clipRule=')
                .replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}')
                .replace(/\bstop-color=/g, 'stopColor=')
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
              finalTemplate = finalTemplate.replace(/\bclassName=/g, 'class=');
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
      if (content.includes('RefreshRuntime') || content.includes('$RefreshReg$') || content.includes('$RefreshSig$')) {
        console.log(`⚠️ DolphinCSS CLI: Prevented writing HMR code to ${path.basename(filePath)}`);
      } else {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Updated ${path.basename(filePath)}`);
      }
    }
  } catch (error) {
    console.log(`⚠️ Error processing ${filePath}: ${error.message}`);
  }
}

function startWatcher() {
  const watcher = chokidar.watch('.', {
    cwd: projectRoot,
    ignored: (file) => {
      const normalised = file.replace(/\\/g, '/');
      const parts = normalised.split('/');
      return parts.some(part => 
        ['node_modules', '.git', 'templates', 'bin', 'dist'].includes(part)
      );
    },
    persistent: true,
    ignoreInitial: false,
    awaitWriteFinish: { stabilityThreshold: 400, pollInterval: 100 },
  });

  watcher.on('add', filePath => processFile(path.join(projectRoot, filePath)))
         .on('change', filePath => processFile(path.join(projectRoot, filePath)));
  console.log('👁️  Watching for markers...');
}

async function runPushCommand() {
  const filePath = process.argv[3];
  if (!filePath) {
    console.error('❌ Error: Please specify the file path to push. Example: npx dolphin-template push templates/my-card.html');
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: File not found at: ${filePath}`);
    process.exit(1);
  }

  const args = process.argv.slice(4);
  let name = '';
  let category = 'general';
  let tags = '';
  let author = 'anonymous';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--name' && args[i+1]) {
      name = args[i+1];
      i++;
    } else if (args[i] === '--category' && args[i+1]) {
      category = args[i+1];
      i++;
    } else if (args[i] === '--tags' && args[i+1]) {
      tags = args[i+1];
      i++;
    } else if (args[i] === '--author' && args[i+1]) {
      author = args[i+1];
      i++;
    }
  }

  if (!name) {
    const basename = path.basename(filePath, path.extname(filePath));
    name = basename;
  }

  if (!name.startsWith('dolphin-')) {
    name = `dolphin-${name}`;
  }

  try {
    const code = fs.readFileSync(filePath, 'utf8');
    let backendUrl = 'http://localhost:3000';
    if (fs.existsSync(dolphinConfigPath)) {
      try {
        const userConfig = JSON.parse(fs.readFileSync(dolphinConfigPath, 'utf8'));
        if (userConfig.backendUrl) {
          backendUrl = userConfig.backendUrl;
        }
      } catch (e) {}
    }

    console.log(`🚀 Pushing component ${name} to Bank: ${backendUrl}...`);

    const response = await axios.post(`${backendUrl}/api/templates/push`, {
      name,
      code,
      category,
      tags,
      author
    });

    if (response.data && response.data.success) {
      console.log(`✅ Success: ${response.data.message}`);
    } else {
      console.log(`❌ Failed: ${response.data.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.error(`❌ Connection Error: ${error.message}`);
    if (error.response && error.response.data) {
      console.error(`   Details: ${error.response.data.error || JSON.stringify(error.response.data)}`);
    }
  }
  process.exit(0);
}

const isPush = process.argv[2] === 'push';
if (isPush) {
  runPushCommand();
} else {
  init();
}

process.on('SIGINT', () => {
  console.log('\n👋 Dolphin CLI stopped');
  process.exit(0);
});

