<div align="center">
  <h1>🐬 DolphinCSS</h1>
  <p><strong>A Next-Generation UI Library for React + TailwindCSS</strong></p>
  <p><em>Where Magic Component Generation meets Beautiful Global Classes.</em></p>
</div>

---

DolphinCSS is not just another CSS framework. It fundamentally reimagines how developers build UI by combining the extreme customizability of **TailwindCSS**, the simplicity of **Bootstrap's Global Classes**, and an unprecedented **Vite-powered Magic Component Generator**.

Say goodbye to heavy vendor lock-ins (MUI, AntD) and tedious CLI commands (Shadcn UI).

## ⚡ The 4 Unique Superpowers

### 1. 🪄 Magic Component Generation (Zero CLI)
We loved the idea of Shadcn giving you ownership of the code, but hated running CLI commands for every single component. 

With DolphinCSS, **you never touch the terminal.** Just type a magic class in your editor and save:

```jsx
// 1. You type this in your App.jsx:
<div className="dolphin-card"></div>

// 2. You hit Save (Ctrl+S)

// 3. 🪄 MAGIC! Vite instantly replaces that line IN YOUR FILE with the full React Component code!
<div className="glass card p-6 border border-white/20 rounded-2xl max-w-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden" style={{ backdropFilter: 'blur(20px)' }}>
  {/* Full customizable code is now YOURS */}
</div>
```

### 2. 🌐 High-Level Global Classes
Tired of writing 20 utility classes for a single button? DolphinCSS brings back the simplicity of Global Classes, but with breathtaking modern aesthetics (Glassmorphism, Neon Glows).

```jsx
/* The Tailwind Way (Messy) */
<button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/50 transition-all">
  Click
</button>

/* The DolphinCSS Way (Clean & Global) */
<button className="filled primary-500 glow btn-lg">
  Click
</button>
```

### 3. 🧩 Infinite Class Composability (Nesting)
Classes in DolphinCSS are designed to stack perfectly. Combine background colors, gradients, glows, and animations endlessly without conflicts!

```jsx
// Combine classes to create complex, animated, glowing UI instantly:
<button className="filled success gradient glow glow-pulse rounded-full">
  I am a Glowing, Pulsing, Gradient Green Button!
</button>

// Create a frosted glass overlay with a dark tint:
<div className="overlay overlay-blur-xl overlay-dark-50"></div>
```

### 4. 🎬 World-Class Built-in Animations
No need for `framer-motion` or `animate.css`. DolphinCSS ships with a complete `@layer utilities` animation engine that you can drop on any HTML element.

- **Continuous:** `float`, `spin-slow`, `pulse`, `bounce`, `shimmer`, `gradient-flow`, `neon-flicker`
- **Hover:** `hover-pulse`, `hover-jelly`, `hover-glow`, `hover-ripple`
- **Entrance:** `fade-in`, `slide-up`, `zoom-in`, `rotate-3d`
- **Controls:** `delay-200`, `duration-500`

```jsx
<img src="logo.png" className="float hover-jelly fade-in delay-200" />
```

---

## ⚙️ Installation & Setup

1. **Install via npm:**
```bash
npm install tailwindcss @tailwindcss/vite dolphincss lucide-react
```
*(Note: `lucide-react` is required because the generated magic components use these beautiful icons by default.)*

2. **Add the Plugins:** (In `vite.config.js`)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dolphincssPlugin from 'dolphincss/vite-plugin'

export default defineConfig({
  plugins: [react(), tailwindcss(), dolphincssPlugin()]
})
```

3. **Import Styles:** (In your main `main.jsx` or `index.css`)
```javascript
import 'dolphincss/dolphin-css.css';
```

### 🧠 VS Code IntelliSense — Auto Extension Install via Marker

DolphinCSS IntelliSense can be **automatically installed** into VS Code using a single magic marker — no marketplace search, no manual download needed.

#### ✨ How it works

Just add the `vscode-init` marker anywhere in your JSX/TSX component and **save the file**:

```jsx
// In any component file (e.g., App.jsx)
export default function App() {
  return (
    <div>
      {/* 🐬 Add this ONE line — remove it after first run */}
      <div className="vscode-init" style={{display:'none'}}></div>

      {/* rest of your app */}
    </div>
  )
}
```

When the Vite dev server (`npm run dev`) detects this marker, it automatically:

1. 📥 **Downloads** the DolphinCSS IntelliSense extension (`.vsix`) directly from GitHub
2. ⚡ **Installs** it into VS Code via `code --install-extension`
3. 🗂️ **Creates** `.vscode/dolphin-tags.json` with **1,269 CSS class suggestions**
4. ⚙️ **Updates** `.vscode/settings.json` with `html.customData` for HTML autocomplete
5. 📌 **Adds** extension recommendation to `.vscode/extensions.json`
6. 🗑️ **Removes** the `vscode-init` class from your file automatically

Then simply **reload your VS Code window**:
```
Ctrl + Shift + P → "Reload Window"
```

After reload, you'll get:
- ✅ **1,269 DolphinCSS class suggestions** in `className=""` / `class=""`
- ✅ **51 `dolphin-*` marker suggestions** when you type `dolphin-`
- ✅ Works in **JSX, TSX, HTML, Vue, Svelte, Astro** files

#### 🔧 Manual Install (Alternative)

If auto-install didn't work (e.g., `code` CLI not in PATH), install manually:

**Option A — VS Code Marketplace:**
Search `DolphinCSS IntelliSense` in the Extensions panel (`Ctrl+Shift+X`).

**Option B — Direct VSIX download:**
```bash
# Download and install the extension from GitHub Releases
curl -L -o dolphincss-intellisense.vsix https://github.com/Phuyalshankar/dolphincss-vscode-/releases/download/v0.1.0/dolphincss-intellisense-0.1.0.vsix
code --install-extension dolphincss-intellisense.vsix
```

#### 🧹 Cleanup

When you no longer need the VS Code helpers, remove them cleanly:
```bash
npx dolphin-cleanup
```
- Removes only DolphinCSS files from `.vscode/`
- Removes the `html.customData` entry from `.vscode/settings.json`
- Keeps your own VS Code settings and other `.vscode` files untouched

---

## 🛜 Offline & CDN Usage

For static HTML pages or offline projects, you can use the minified files directly without npm/Node.js setup.

### 1. CDN Links (jsDelivr)
Include these links directly in your HTML for zero-install setup:
* **CSS (Global Styles & Animations):**
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/dolphincss@latest/dolphin-css.css">
  ```
* **JS (Vanilla Utility Builder):**
  ```html
  <script src="https://cdn.jsdelivr.net/npm/dolphincss@latest/src/ub-vanilla.js"></script>
  ```

### 📥 Direct File Downloads (One-Click)
Click the buttons below to download the latest files directly:

<div align="center" style="margin: 20px 0; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
  <a href="https://cdn.jsdelivr.net/npm/dolphincss@latest/dolphin-css.css" download="dolphin-css.css" style="background-color: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    📥 Download dolphin-css.css
  </a>
  <a href="https://cdn.jsdelivr.net/npm/dolphincss@latest/src/ub-vanilla.js" download="ub-vanilla.js" style="background-color: #a855f7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    📥 Download ub-vanilla.js
  </a>
</div>

*(For Markdown/GitHub compatibility, you can also use these badges:)*

[![Download Dolphin CSS](https://img.shields.io/badge/Download-Dolphin_CSS-0ea5e9?style=for-the-badge&logo=css3)](https://cdn.jsdelivr.net/npm/dolphincss@latest/dolphin-css.css)
[![Download Utility Builder JS](https://img.shields.io/badge/Download-Utility_Builder_JS-a855f7?style=for-the-badge&logo=javascript)](https://cdn.jsdelivr.net/npm/dolphincss@latest/src/ub-vanilla.js)

### 2. Download Commands (For Offline Usage)
Run these commands in your project folder to download the files locally:

#### Using `curl`:
```bash
# Download CSS
curl -o dolphin-css.min.css https://cdn.jsdelivr.net/npm/dolphincss@latest/dolphin-css.css

# Download Vanilla Utility Builder JS
curl -o ub-vanilla.min.js https://cdn.jsdelivr.net/npm/dolphincss@latest/src/ub-vanilla.js
```

#### Using `wget`:
```bash
# Download CSS
wget -O dolphin-css.min.css https://cdn.jsdelivr.net/npm/dolphincss@latest/dolphin-css.css

# Download Vanilla Utility Builder JS
wget -O ub-vanilla.min.js https://cdn.jsdelivr.net/npm/dolphincss@latest/src/ub-vanilla.js
```

### 3. How to Setup & Use Locally (Offline)

#### A. Static HTML Setup
Once you have downloaded `dolphin-css.min.css` and `ub-vanilla.min.js`, link them locally in your `index.html` file:
```html
<!DOCTYPE html>
<html lang="en" data-theme-mode="dark" data-theme="dolphin">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="./dolphin-css.min.css">
</head>
<body>
  <!-- Use magic markers to be injected later -->
  <div class="dolphin-card"></div>

  <script type="module">
    import { ub, map } from './ub-vanilla.min.js';
    // Use ub engine for dynamic runtime styling
  </script>
</body>
</html>
```

#### B. Offline Component Injection
When working offline (without an internet connection), component injection still works seamlessly:
* **Using Vite Plugin (React/Vue/etc.):** The `vite-plugin-dolphincss` automatically loads templates locally from the `node_modules/dolphincss/core-templates/` directory. No internet connection is needed to parse and expand markers like `<div className="dolphin-card"></div>`.
* **Using CLI Watcher (Plain HTML/Other projects):** Start the watcher offline:
  ```bash
  npx dolphincss-template
  # OR
  node node_modules/dolphincss/bin/dolphin.js
  ```
  The watcher will attempt to sync with the remote repository. After failing to connect, it will automatically fallback to **Local Mode**. It will watch your files and expand markers (e.g. `dolphin-card` to full HTML/JSX) using the offline templates stored locally in your package.

#### C. Zero-Install / CDN Component Injection (Online)
If you are using DolphinCSS via CDN links and do not want to install `dolphincss` locally in your project, you can still use the magic component generator:
1. Include the jsDelivr CDN links in your static HTML file.
2. Put any magic marker class (e.g., `<div class="dolphin-card"></div>`) in your HTML code.
3. Start the watcher directly from npm without installing the package:
   ```bash
   npx dolphin-template
   # OR (if package is not installed)
   npx --package=dolphincss dolphin-template
   ```
4. Save your HTML file. The watcher will dynamically fetch the component templates from GitHub and inject them directly into your local file!

---

## 🧠 IoT-CSS & Dynamic OKLCH Engine (`dolphincss/ub`)

DolphinCSS includes a revolutionary runtime style engine called **`ub`** (Utility Builder). It allows you to generate mathematically computed OKLCH shades (0-255 scaling) and gradients on the fly, with native browser styling speed, O(1) LRU class caching, and automatic text contrast adjustments.

This is perfect for IoT dashboards, sensor data representations, dynamic configurations, or Tailwind CSS co-existence (allowing Tailwind users to blend their classes seamlessly).

### ⚡ Why is this a Game Changer? (The Dynamic vs Static Dilemma)
* **Zero CSS Bloat:** Pre-generating all 256 shades for 9 colors (including hover, active, and responsive variants) would require **400,000+ CSS classes**, bloating the CSS file size to over **40MB**! The `ub` engine lets you access all 256 mathematical shades on-demand while keeping the core CSS bundle size at a micro-weight **319KB**.
* **True Runtime Freedom:** Standard Tailwind is strictly build-time; you cannot feed dynamic React/JS state variables directly into class names. `ub` breaks this barrier, giving you full access to responsive layouts (`lg:`) and hover states (`hover:`) dynamically at runtime.
* **Auto-Contrast Accessibility:** No more writing extra conditional logic to switch text color (white/black) when background colors change. The engine automatically analyzes background lightness and applies contrast text color on-the-fly.
* **Native C++ Rendering Speed:** By utilizing browser-native **Constructable Stylesheets** (`adoptedStyleSheets`), style injections are resolved directly at the browser's C++ rendering engine level with minimal JS overhead.

### ⚙️ How to Import
```javascript
import {
  // Core
  ub, debugUB, clearUBCache, oklch,

  // Spacing
  p, pt, pb, pl, pr,
  m, mt, mb, ml, mr,
  w, h, scale,

  // Border / Shadow / Rounded / Opacity
  border, borderT, borderR, borderB, borderL, borderX, borderY,
  rounded, shadow, opacity,

  // Color helpers
  bg, text,

  // Gradient helpers
  gradient, gradientAngle, gradientVertical, gradientHorizontal,
  gradientRadial, gradientTriple,

  // Layout helpers
  grid, autoGrid, autoLayout, span, row,

  // Animation helpers
  animate, widthAnim, heightAnim, paddingAnim, marginAnim,
  bgAnim, opacityAnim, roundedAnim, scaleAnim,
  infiniteAnim, clickAnim, bgFill,

  // Shorthand objects
  btn, input, card,

  // IoT data mapping
  map,
} from 'dolphincss/ub';
```

### 🪄 Core Features

#### 1. Dynamic OKLCH Shading (0-255 Scale)
Generate arbitrary, dynamically computed color shades and gradients on the fly:
```jsx
// 128 starts a medium red, 255 ends a very dark blue
<div className={ub("card glass gradient-red-128-blue-255 p-6 rounded-2xl")}>
  I am a mathematically perfect gradient!
</div>

// You can feed it dynamic states or sliders:
<div className={ub(`card bg-blue-${volumeLevel} p-4 text-center`)}>
  Volume Level: {Math.round((volumeLevel/255)*100)}%
</div>
```

#### 2. Auto-Inversion Text Contrast
You never have to manually adjust text color when background colors change. The `ub` engine dynamically parses the OKLCH lightness (L) and average hue (H) of the background, and automatically applies high-contrast light or dark text color (`oklch(...) !important`) to guarantee perfect readability!

#### 3. IoT Data Mapping
Map raw numeric values (like CPU temperatures, battery percentages, or sensor values) to intuitive color spectrums automatically:
```jsx
// map.heat(val, min, max) maps 0-100% to green-to-red oklch shades automatically:
<div className={ub(`card ${map.heat(cpuTemp, 0, 100)} p-4 rounded-xl`)}>
  CPU Temperature: {cpuTemp}°C
</div>
```
Available map presets:
* `map.fuel(val, min, max)`: Red (low) ➔ Orange (mid) ➔ Green (high)
* `map.heat(val, min, max)`: Green (low) ➔ Red (high)
* `map.coolWarm(val, min, max)`: Blue (cool) ➔ Red (warm)
* `map.rainbow(val, min, max)`: Full rainbow spectrum partition mapping

#### 4. Ultra-Fast LRU Class Caching
The engine includes a double-layer LRU Cache (caches compiled color codes and class list parses). If a class (even a standard static CSS class like `transition-all` or `p-4`) is evaluated again, the engine returns it instantly in **O(1) time** with **0ms latency**, preventing redundant browser style recalculations and regex parses.

#### 5. Dynamic Transitions & Animations
Define dynamically timed transitions in JSX:
```jsx
// Fills background color from left to red-128 in 500ms
className={ub("card bg-fill-left-red-128-500ms")}
```

#### 6. Dynamic Sizing with Custom CSS Units
You are no longer limited to pixel-based sizes like `w-4` (16px). You can now supply arbitrary values with custom CSS units (like `%`, `px`, `rem`, `em`, `vh`, `vw`) directly in your utility classes:
- `w-58%` ➔ generates `width: 58% !important;`
- `w-12.5rem` ➔ generates `width: 12.5rem !important;`
- `h-50vh` ➔ generates `height: 50vh !important;`
This eliminates the need for inline style mapping like `style={{ width: `${val}%` }}`!

#### 7. Smart Fallback Background Shading
For IoT and quick data mappings, you can omit the `bg-` prefix when utilizing color shades. The engine automatically fallbacks to background shading if a raw color shade is provided:
- `ub(map.heat(load, 0, 100))` ➔ outputs `ub-xxxx` which applies `background: oklch(...) !important;`
- `ub("red-128")` ➔ defaults to background styling for `"bg-red-128"`.

#### 8. Self-Healing Connection (Vite HMR Safety)
Modern dev servers with Hot Module Replacement (HMR) can dynamically refresh components and clear `document.adoptedStyleSheets`. The `ub` engine has built-in connection checking that automatically detects stylesheet disconnection and re-attaches itself instantly to keep real-time UI values active and styled correctly.

---

## 📖 Complete `ub` Class Syntax Reference

### 🎨 Colors
```
bg-{color}-{shade}          → background color      (e.g. bg-blue-128)
bg-{color}-{shade}/{opacity} → with opacity          (e.g. bg-blue-128/50)
text-{color}-{shade}        → text color            (e.g. text-red-200)
border-{color}-{shade}      → border color          (e.g. border-green-100)
```
Colors: `red` `blue` `green` `purple` `orange` `pink` `teal` `amber` `gray`  
Shade: `0–255` (0 = lightest, 255 = darkest)

### 📐 Spacing
```
p-{n}   pt-{n}  pb-{n}  pl-{n}  pr-{n}   → padding   (n × 4px)
m-{n}   mt-{n}  mb-{n}  ml-{n}  mr-{n}   → margin    (n × 4px)
w-{n}   h-{n}                             → size      (n × 4px)
scale-{n}                                 → CSS scale transform
opacity-{n}                               → opacity 0–100
```

### 🔲 Border, Shadow, Rounded
```
border                   → 1px solid border
border-{n}               → n px border
border-t-{n}  border-b-{n}  border-l-{n}  border-r-{n}  → single side
border-x-{n}  border-y-{n}  → horizontal / vertical
rounded-{n}              → border-radius (e.g. rounded-2)
rounded-full             → border-radius: 9999px
shadow-{1–10}            → box-shadow scale
```

### 📦 Flexbox / Grid
```
flex-center   flex-between  flex-left   flex-right
flex-around   flex-evenly   flex-start  flex-end  flex-stretch
flexcol-center  flexcol-between  flexcol-left  flexcol-right

grid-{cols}x{rows}-{gap}           → explicit grid
auto-grid-{minWidth}-{gap}         → auto-fit grid
auto-layout-{row|col|wrap}-{align}-{gap}

span-{n}     → grid-column: span n
row-{n}      → grid-row: span n
full         → grid-column: 1 / -1
```

### 🌈 Gradients
```
gradient-{c1}-{s1}-{c2}-{s2}                  → 135deg gradient
gradient-{angle}deg-{c1}-{s1}-{c2}-{s2}       → custom angle
gradient-vert-{c1}-{s1}-{c2}-{s2}             → top to bottom
gradient-horiz-{c1}-{s1}-{c2}-{s2}            → left to right
gradient-radial-{c1}-{s1}-{c2}-{s2}           → radial
gradient-{c1}-{s1}-{c2}-{s2}-{c3}-{s3}        → 3-color gradient
```

### 🃏 Component Shorthands
```jsx
// Buttons
className={ub(btn.primary)}   // → "btn btn-primary"
className={ub(btn.danger)}    // → "btn btn-danger"
className={ub(btn.ghost)}     // → "btn btn-ghost"
className={ub(btn.glow)}      // → "btn btn-glow"
// Also: btn.sm  btn.md  btn.lg  btn.secondary  btn.success  btn.warning  btn.outline

// Inputs
className={ub(input.base)}    // → "input"
className={ub(input.error)}   // → "input input-error"
// Also: input.sm  input.md  input.lg  input.success

// Cards
className={ub(card.glass)}    // → "card card-glass"
className={ub(card.hover)}    // → "card card-hover"
className={ub(card.click)}    // → "card card-click card-hover"
```

### 🎬 Animations
```
// Property animation (from → to in Nms)
{prop}-{from}-{to}-{N}ms               → one-shot
{prop}-{from}-{to}-{N}ms-infinite      → loops forever
hover:{prop}-{from}-{to}-{N}ms         → triggers on hover
click:{prop}-{from}-{to}-{N}ms         → triggers on click

// Examples:
w-10-50-300ms                          → width 40px → 200px in 300ms
scale-50-110-200ms                     → scale 0.5 → 1.1 in 200ms
opacity-0-100-400ms                    → fade in
p-2-8-250ms                            → padding grow
rounded-2-full-300ms                   → pill animation

// Background fill sweep
bg-fill-left-red-128-500ms             → fills red from left in 500ms
bg-fill-right-blue-200-800ms           → fills blue from right in 800ms
bg-fill-top-green-100-600ms
bg-fill-bottom-purple-150-400ms

// Color animation (bg or text)
bg-blue-50-200-500ms                   → bg transitions shade 50→200 in 500ms
bg-red-100-255-1000ms-infinite         → loops forever
text-green-128-255-300ms               → text color animates
```

### 🎯 Variants (Prefix Modifiers)
```
hover:{class}      → applies on hover     (e.g. hover:scale-110)
active:{class}     → applies on active
focus:{class}      → applies on focus

// Responsive breakpoints
sm:{class}   → min-width: 640px
md:{class}   → min-width: 768px
lg:{class}   → min-width: 1024px
xl:{class}   → min-width: 1280px
2xl:{class}  → min-width: 1536px

// Combine prefix + class
lg:flex-center
hover:bg-blue-200
sm:p-2 lg:p-8
```

### 🔧 Helper Functions (JS API)
```jsx
import { bg, text, gradient, gradientVertical, gradientHorizontal,
         gradientRadial, gradientAngle, gradientTriple,
         widthAnim, heightAnim, bgAnim, scaleAnim,
         opacityAnim, roundedAnim, infiniteAnim } from 'dolphincss/ub';

// Color helpers
bg('blue', 128)           // → "bg-blue-128"
bg('red', 200, 50)        // → "bg-red-200/50"  (with opacity)
text('green', 100)        // → "text-green-100"

// Gradient helpers
gradient('blue', 100, 'purple', 200)            // → "gradient-blue-100-purple-200"
gradientVertical('red', 128, 'orange', 200)     // → "gradient-vert-red-128-orange-200"
gradientHorizontal('teal', 100, 'blue', 200)    // → "gradient-horiz-teal-100-blue-200"
gradientRadial('pink', 100, 'purple', 200)      // → "gradient-radial-pink-100-purple-200"
gradientAngle(45, 'blue', 100, 'green', 200)    // → "gradient-45deg-blue-100-green-200"
gradientTriple('red',100,'blue',150,'purple',200) // → 3-stop gradient

// Animation helpers
widthAnim(10, 50, 300)             // → "w-10-50-300ms"
heightAnim(20, 80, 500)            // → "h-20-80-500ms"
scaleAnim(50, 110, 200)            // → "scale-50-110-200ms"
opacityAnim(0, 100, 400)           // → "opacity-0-100-400ms"
roundedAnim(2, 16, 300)            // → "rounded-2-16-300ms"
bgAnim('blue', 50, 'blue', 200, 500)  // → "bg-blue-50-blue-200-500ms"
infiniteAnim('scale', 90, 110, 1000)  // → loops forever
```

### 🛠️ Debug & Cache
```jsx
import { debugUB, clearUBCache } from 'dolphincss/ub';

console.log(debugUB());
// → { classCache: 42, styleCount: 38, totalRequests: 150,
//     cacheHits: 108, totalSegmentRequests: 210, version: 'v19.0.3' }

clearUBCache();  // Flush all cached styles (useful after theme change)
```

---

## 🚀 Available Magic Components

Type any of these magic markers in your `.jsx` or `.tsx` file, hit save, and watch the code generate instantly:

- `<div className="dolphin-form-floating"></div>` (Beautiful Floating Label Form)
- `<div className="dolphin-form-standard"></div>` (Minimalist Standard Label Form)
- `<div className="dolphin-table"></div>` (Responsive Data Table)
- `<div className="dolphin-toast"></div>` (Notification Toast)
- `<div className="dolphin-modal"></div>` (Native HTML Dialog Modal)
- `<div className="dolphin-button"></div>` (Button Variants Showcase)
- `<div className="dolphin-card"></div>` (Glassmorphic Profile Card)
- `<div className="dolphin-grid"></div>` (Responsive Product/Car Grid)
- `<div className="dolphin-navbar"></div>` (Sleek Navigation Bar)
- `<div className="dolphin-header"></div>` (Modern Header/Navbar)
- `<div className="dolphin-footer"></div>` (Premium Footer Section)
- `<div className="dolphin-alert"></div>` (Modern Alert Box)
- `<div className="dolphin-badge"></div>` (Status Badges)

- `<div className="dolphin-hero"></div>` (Stunning Landing Page Hero)
- `<div className="dolphin-pricing"></div>` (Premium Pricing Tables)
- `<div className="dolphin-timeline"></div>` (Vertical Activity Timeline)
- `<div className="dolphin-chat"></div>` (Modern Messaging Interface)
- `<div className="dolphin-carousel"></div>` (Interactive Image Slider)
- `<div className="dolphin-dropzone"></div>` (Drag & Drop File Upload)
- `<div className="dolphin-rating"></div>` (Interactive 5-Star Rating)
- `<div className="dolphin-steps"></div>` (Progress Stepper)
- `<div className="dolphin-pagination"></div>` (Page Navigation Controls)
- `<div className="dolphin-drawer"></div>` (Off-canvas Glass Sidebar)
- `<div className="dolphin-breadcrumbs"></div>` (Navigation Trail)


## 🎭 The Power of Variants (fx-*)

DolphinCSS ships with world-class, pre-built global variants. Instead of writing 15 Tailwind utility classes to create a glassmorphism effect, just use one class!

### 🌟 Premium Effects
Combine these on any div, card, or container:
- fx-glass (Classic Frosted Glass)
- fx-crystal (Ultra-clear Crystal Border)
- fx-neon (Cyberpunk Neon Glow)
- fx-holo (Holographic Matrix)
- fx-flare (Solar Flare Gradient)
- fx-cyber (Cyberpunk Aesthetic)
- fx-nebula (Galactic Nebula Depth)
- fx-metal (Liquid Mercury)
- fx-aurora (Frosted Aurora)
- fx-float (Quantum Float on Hover)

### 🔥 Advanced Glows & Animations
Bring your UI to life instantly:
- glow (Standard Hover Glow)
- glow pulse (Continuous Pulsing Glow)
- glow wave (Ocean Wave Animation)

### 🎨 Global Colors & Buttons
Propagate theme colors cleanly:
```jsx
<button className="filled primary px-6 py-2 glow wave">Primary Action</button>
<button className="outlined success px-6 py-2">Success Outline</button>
<button className="plain danger px-6 py-2">Danger Plain</button>

{/* Perfect Circle Icons */}
<button className="circle lg fx-aurora glow wave">
  <Icon />
</button>
```

---

## 🌐 Auto-Push Marker & Sync Engine (Cloud UI Bank)

DolphinCSS includes a revolutionary **Bi-directional Cloud Sync Engine** that lets you register, update, inject, and delete custom components directly from your code workspace, with absolute framework portability (React, Svelte, Vue, PHP, HTML, Django).

### ⚙️ Setup configuration (`dolphin.config.json`)
Create a `dolphin.config.json` file in your project root to authenticate with the Cloud UI Bank:

```json
{
  "pushUrl": "http://localhost:3000/api/templates/push",
  "secretKey": "dolphin-admin-2025",
  "username": "john_dev",
  "author": "John Shrestha"
}
```
* **First-time setup**: Use the global secret key (`dolphin-admin-2025`). The server will automatically register your username profile, generate a unique developer-specific API token, and the plugin/watcher will **auto-save** it back into your `dolphin.config.json` under `"secretKey"`!

---

### 🛠️ Advanced Code Markers (State Actions)

Simply write these CSS classes on your container tags and press **Save (Ctrl + S)**. The dev server / watcher handles the synchronization instantly:

#### 1. 📤 Publish / Create (`dolphin-push--[name]--[variant]`)
Uploads the local component code and metadata to the Cloud UI Bank.
```html
<div class="dolphin-push--my-card--glass" data-version="1.0.0" data-category="cards" data-tags="auth,glass">
  <h3>Card Title</h3>
  <p>Content...</p>
</div>
```
* *On Save:* Pushes component markup and renames class to `dolphin-pushed--my-card--glass`.

#### 2. 🔄 Update / Replace (`dolphin-put--` or `dolphin-patch--`)
Performs updates to component settings and code on the server.
```html
<div class="dolphin-patch--my-card--glass" data-version="1.1.0" data-tags="auth,glass,v2">
  <h3>Card Title (Updated)</h3>
  <p>Content...</p>
</div>
```
* *On Save:* Syncs modifications to the DB and renames class to `dolphin-patched--my-card--glass`.

#### 3. 📥 Pull / Inject (`dolphin-inject--[name]--[variant]`)
Downloads the template markup from the server database and embeds it directly inside your local tag.
```html
<div class="dolphin-inject--my-card--glass"></div>
```
* *On Save:* Inserts the formatted markup and renames class to `dolphin-injected--my-card--glass`.

#### 4. 🗑️ Delete (`dolphin-delete--[name]--[variant]`)
Deletes the component from the cloud database.
```html
<div class="dolphin-delete--my-card--glass">...</div>
```
* *On Save:* Removes the remote component and renames class to `dolphin-deleted--my-card--glass`.

---

### 👨‍💻 Developer Dashboard (`/dashboard`)
Log in to the Web Portal Dashboard using your username and credentials to manage your creations visually:
* **Live Iframe Preview**: Inspect how your templates render in an isolated, dark-themed ocean HSL glassmorphism environment.
* **PrismJS Code Viewer**: Read and copy raw component code with a single click.
* **Component CRUD**: Edit metadata, category, version, privacy toggle (`isPublic`), and premium tier (`isPremium`).
* **Developer API Token**: Copy your personal API token from the sidebar to authorize other local workspaces.

---

**Built with ❤️ in Nepal.** Ready for the future of UI development.
