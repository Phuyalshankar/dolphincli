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
  let vscodeSetupDone = false; // vscode-init एकपटक मात्र run गर्न


  async function regenerateRoutes(projectRoot) {
    // stub kept for compatibility — routing engine removed
  }

  // 🐬 vscode-init: GitHub बाट dolphin-tags.json fetch गरेर .vscode/ मा setup गर्छ
  async function setupVSCodeFromMarker(projectRoot) {
    const vscodeDir = path.join(projectRoot, '.vscode');
    if (!fs.existsSync(vscodeDir)) {
      fs.mkdirSync(vscodeDir, { recursive: true });
    }

    // dolphin-tags.json — GitHub बाट fetch (dolphincss-template repo)
    const tagsUrl = 'https://raw.githubusercontent.com/Phuyalshankar/dolphincss-template/main/config/dolphin-tags.json';
    const tagsResponse = await fetch(`${tagsUrl}?t=${Date.now()}`);
    if (!tagsResponse.ok) throw new Error(`Failed to fetch dolphin-tags.json: ${tagsResponse.statusText}`);
    const tagsData = await tagsResponse.text();
    fs.writeFileSync(path.join(vscodeDir, 'dolphin-tags.json'), tagsData, 'utf8');

    // .vscode/settings.json मा html.customData entry थप्छ
    const settingsPath = path.join(vscodeDir, 'settings.json');
    let settings = {};
    if (fs.existsSync(settingsPath)) {
      try { settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8')); } catch { settings = {}; }
    }
    if (!Array.isArray(settings['html.customData'])) settings['html.customData'] = [];
    if (!settings['html.customData'].includes('./.vscode/dolphin-tags.json')) {
      settings['html.customData'].push('./.vscode/dolphin-tags.json');
    }
    // CSS class suggestions for JS/JSX files
    if (!Array.isArray(settings['css.customData'])) settings['css.customData'] = [];
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf8');

    // .vscode/extensions.json मा extension recommendation थप्छ
    const extensionsPath = path.join(vscodeDir, 'extensions.json');
    let extensions = {};
    if (fs.existsSync(extensionsPath)) {
      try { extensions = JSON.parse(fs.readFileSync(extensionsPath, 'utf8')); } catch { extensions = {}; }
    }
    if (!Array.isArray(extensions.recommendations)) extensions.recommendations = [];
    if (!extensions.recommendations.includes('Phuyalshankar.dolphincss-intellisense')) {
      extensions.recommendations.push('Phuyalshankar.dolphincss-intellisense');
    }
    fs.writeFileSync(extensionsPath, JSON.stringify(extensions, null, 2), 'utf8');

    const parsed = JSON.parse(tagsData);
    const classCount = parsed?.valueSets?.[0]?.values?.length || 0;
    const tagCount = parsed?.tags?.length || 0;
    console.log(`✅ DolphinCSS VSCode IntelliSense ready!`);
    console.log(`   📦 ${classCount} CSS classes | 🏷️  ${tagCount} dolphin-* markers`);
    console.log(`   ➡️  VSCode window reload गर्नुस् (Ctrl+Shift+P → Reload Window)`);
    console.log(`   💡 JSX/TSX मा पनि suggestions को लागि Extension install गर्नुस्:`);
    console.log(`      👉 ext install Phuyalshankar.dolphincss-intellisense`);
  }

  // Auto-Push Config Settings
  let pushUrl = 'http://localhost:3000/api/templates/push';
  let secretKey = 'dolphin-admin-2025';
  let username = 'core';
  let authorName = 'DolphinCSS Core';

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

          // Parse push settings
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
    if (!['.jsx', '.tsx', '.js', '.ts', '.html', '.vue', '.svelte', '.astro', '.php'].includes(ext) || id.includes('node_modules')) {
      return null;
    }

    // 🔒 HMR Guard: यदि input code मा React Refresh / HMR code छ भने बिल्कुल process नगर्ने
    // यो check नगरे plugin ले HMR code सहित file मा write-back गर्छ
    if (
      code.includes('$RefreshReg$') ||
      code.includes('$RefreshSig$') ||
      code.includes('RefreshRuntime') ||
      code.includes('import.meta.hot') ||
      code.includes('/@react-refresh')
    ) {
      return null;
    }

    const projectRoot = process.cwd();
    await ensureInitialized(projectRoot);

    let content = code;
    let modified = false;
    const isReact = ['.jsx', '.tsx', '.js', '.ts'].includes(ext);
    const classAttrName = isReact ? 'className' : 'class';

    // 🐬 vscode-init marker: class="vscode-init" detect गरेर .vscode/ setup गर्छ
    const vsInitAttr = isReact ? 'className' : 'class';
    const vsInitRegex = new RegExp(`${vsInitAttr}=(["'])([^"']*\\s)?vscode-init(\\s[^"']*)?\\1`);
    if (!vscodeSetupDone && vsInitRegex.test(content)) {
      vscodeSetupDone = true;
      console.log('\n🐬 DolphinCSS: vscode-init detected! Setting up VSCode IntelliSense...');
      try {
        await setupVSCodeFromMarker(projectRoot);
      } catch (err) {
        console.warn(`⚠️ DolphinCSS: VSCode setup failed: ${err.message}`);
      }
      // marker class हटाउँछ
      content = content.replace(
        new RegExp(`(${vsInitAttr}=(["'])([^"']*)\\s?)vscode-init(\\s?([^"']*?))(\\2)`, 'g'),
        (_, attrStart, quote, before, afterRaw, after, closeQuote) => {
          const cleaned = (before + after).replace(/\s+/g, ' ').trim();
          return cleaned ? `${vsInitAttr}=${quote}${cleaned}${closeQuote}` : '';
        }
      );
      modified = true;
    }

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
            console.log(`\n📤 DolphinCSS: Pushing/PUTing component '${componentName}' (${componentVariant}) to ${pushUrl}...`);
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
              console.log(`\n✅ DolphinCSS: Component '${componentName}' pushed successfully!`);
              
              // If the server returns a developer-specific token, automatically save it back to dolphin.config.json
              if (resultJson.developerToken && resultJson.developerToken !== secretKey) {
                try {
                  const configPath = path.join(projectRoot, 'dolphin.config.json');
                  if (fs.existsSync(configPath)) {
                    const currentConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                    currentConfig.secretKey = resultJson.developerToken;
                    fs.writeFileSync(configPath, JSON.stringify(currentConfig, null, 2), 'utf8');
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

              const modifiedCode = content.substring(0, markerMatch.index) + 
                                   newOpeningTag + 
                                   content.substring(startIndex, closingTagIndex) + 
                                   closingTag + 
                                   content.substring(closingTagIndex + closingTag.length);

              return { code: modifiedCode, map: null };
            } else {
              console.error(`\n❌ DolphinCSS Push/PUT Failed: ${resultJson.error || response.statusText}`);
            }
          }

          else if (action === 'patch') {
            const patchUrl = `${baseUrl}/${encodeURIComponent(componentName)}/settings?author=${encodeURIComponent(username)}&variant=${encodeURIComponent(componentVariant)}`;
            console.log(`\n📤 DolphinCSS: PATCHing component '${componentName}' (${componentVariant}) to ${patchUrl}...`);
            
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
              console.log(`\n✅ DolphinCSS: Component '${componentName}' PATCHed successfully!`);
              const pushedClass = markerClass.replace('dolphin-patch--', 'dolphin-patched--');
              const newClassAttr = `${beforeClasses}${pushedClass}${afterClasses}`.trim();
              const newOpeningTag = fullOpeningTag.replace(
                new RegExp(`${classAttrName}=\\s*["'][^"']*["']`, 'i'),
                `${classAttrName}="${newClassAttr}"`
              );

              const modifiedCode = content.substring(0, markerMatch.index) + 
                                   newOpeningTag + 
                                   content.substring(startIndex, closingTagIndex) + 
                                   closingTag + 
                                   content.substring(closingTagIndex + closingTag.length);

              return { code: modifiedCode, map: null };
            } else {
              console.error(`\n❌ DolphinCSS PATCH Failed: ${resultJson.error || response.statusText}`);
            }
          }

          else if (action === 'inject') {
            const getUrl = `${baseUrl}/${encodeURIComponent(componentName)}?author=${encodeURIComponent(username)}&variant=${encodeURIComponent(componentVariant)}&version=${encodeURIComponent(componentVersion)}`;
            console.log(`\n📥 DolphinCSS: Injecting component '${componentName}' (${componentVariant}) from ${getUrl}...`);

            const response = await fetch(getUrl, {
              headers: {
                'x-admin-secret': secretKey
              }
            });

            if (response.ok) {
              let templateContent = await response.text();
              console.log(`\n✅ DolphinCSS: Component '${componentName}' fetched successfully!`);

              templateContent = templateContent.replace(/>\s*</g, '>\n<');
              templateContent = indentHtmlOrJsx(templateContent, 8);

              const pushedClass = markerClass.replace('dolphin-inject--', 'dolphin-injected--');
              const newClassAttr = `${beforeClasses}${pushedClass}${afterClasses}`.trim();
              const newOpeningTag = fullOpeningTag.replace(
                new RegExp(`${classAttrName}=\\s*["'][^"']*["']`, 'i'),
                `${classAttrName}="${newClassAttr}"`
              );

              const modifiedCode = content.substring(0, markerMatch.index) + 
                                   newOpeningTag + 
                                   `\n${templateContent}\n` + 
                                   closingTag + 
                                   content.substring(closingTagIndex + closingTag.length);

              return { code: modifiedCode, map: null };
            } else {
              const errText = await response.text();
              console.error(`\n❌ DolphinCSS Inject Failed: ${errText || response.statusText}`);
            }
          }

          else if (action === 'delete') {
            const deleteUrl = `${baseUrl}/${encodeURIComponent(componentName)}?author=${encodeURIComponent(username)}&variant=${encodeURIComponent(componentVariant)}`;
            console.log(`\n🗑️ DolphinCSS: Deleting component '${componentName}' (${componentVariant}) from server: ${deleteUrl}...`);

            const response = await fetch(deleteUrl, {
              method: 'DELETE',
              headers: {
                'x-admin-secret': secretKey
              }
            });

            const resultJson = await response.json();
            if (response.ok && resultJson.success) {
              console.log(`\n✅ DolphinCSS: Component '${componentName}' deleted successfully!`);
              const pushedClass = markerClass.replace('dolphin-delete--', 'dolphin-deleted--');
              const newClassAttr = `${beforeClasses}${pushedClass}${afterClasses}`.trim();
              const newOpeningTag = fullOpeningTag.replace(
                new RegExp(`${classAttrName}=\\s*["'][^"']*["']`, 'i'),
                `${classAttrName}="${newClassAttr}"`
              );

              const modifiedCode = content.substring(0, markerMatch.index) + 
                                   newOpeningTag + 
                                   content.substring(startIndex, closingTagIndex) + 
                                   closingTag + 
                                   content.substring(closingTagIndex + closingTag.length);

              return { code: modifiedCode, map: null };
            } else {
              console.error(`\n❌ DolphinCSS Delete Failed: ${resultJson.error || response.statusText}`);
            }
          }

        } catch (err) {
          console.error(`\n❌ DolphinCSS Marker Action Error: ${err.message}`);
        }
      }
    }

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
      const projectRoot = process.cwd();

      // Always initialize markers (both dev + production build)
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
            if (['.jsx', '.tsx', '.js', '.ts', '.html', '.vue', '.svelte', '.astro', '.php'].includes(ext)) {
              try {
                const code = fs.readFileSync(fullPath, 'utf8');

                // Skip files that already have HMR code — never write those back
                if (
                  code.includes('$RefreshReg$') ||
                  code.includes('$RefreshSig$') ||
                  code.includes('RefreshRuntime') ||
                  code.includes('import.meta.hot') ||
                  code.includes('/@react-refresh')
                ) continue;

                const result = await handleTransform(code, fullPath);
                if (result && result.code) {
                  if (
                    result.code.includes('RefreshRuntime') ||
                    result.code.includes('$RefreshReg$') ||
                    result.code.includes('$RefreshSig$')
                  ) {
                    console.log(`\n⚠️ DolphinCSS: Prevented HMR code write-back on startup to ${entry.name}`);
                  } else {
                    fs.writeFileSync(fullPath, result.code, 'utf8');
                    console.log(`\n✨ DolphinCSS: Auto-injected template on startup in: ${entry.name}`);
                  }
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
      const ext = path.extname(id).toLowerCase();
      if (!['.jsx', '.tsx', '.js', '.ts', '.html', '.vue', '.svelte', '.astro', '.php'].includes(ext) || id.includes('node_modules')) {
        return null;
      }
      console.log(`🔍 DolphinCSS: Transform hook called for: ${path.basename(id)}`);

      // Read raw code from disk to bypass in-memory HMR additions
      let diskCode = '';
      try {
        diskCode = fs.readFileSync(id, 'utf8');
      } catch (err) {
        return null;
      }

      // If disk code already contains HMR markers, skip write-back to avoid corruption
      if (
        diskCode.includes('$RefreshReg$') ||
        diskCode.includes('$RefreshSig$') ||
        diskCode.includes('RefreshRuntime') ||
        diskCode.includes('import.meta.hot') ||
        diskCode.includes('/@react-refresh')
      ) {
        return handleTransform(code, id);
      }

      // Quick scan to see if there are any markers to inject
      const possibleMarkers = diskCode.match(/dolphin-[a-zA-Z0-9-]+/g);
      if (!possibleMarkers) {
        return null;
      }

      const result = await handleTransform(diskCode, id);
      if (result && result.code && isDev) {
        try {
          fs.writeFileSync(id, result.code, 'utf8');
          console.log(`\n✨ DolphinCSS: Injected and updated source file: ${path.basename(id)}`);
        } catch (err) {
          console.error(`⚠️ DolphinCSS: Failed to write back to ${id}:`, err.message);
        }
        return result;
      }
      return result;
    }
  };
}
