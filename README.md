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
import { ub, gradient, map, oklch } from 'dolphincss/ub';
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

