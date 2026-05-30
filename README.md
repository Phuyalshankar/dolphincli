<div align="center">
  <h1>=�ɼ DolphinCSS</h1>
  <p><strong>A Next-Generation UI Library for React + TailwindCSS</strong></p>
  <p><em>Where Magic Component Generation meets Beautiful Global Classes.</em></p>
</div>

---

DolphinCSS is not just another CSS framework. It fundamentally reimagines how developers build UI by combining the extreme customizability of **TailwindCSS**, the simplicity of **Bootstrap's Global Classes**, and an unprecedented **Vite-powered Magic Component Generator**.

Say goodbye to heavy vendor lock-ins (MUI, AntD) and tedious CLI commands (Shadcn UI).

## G�� The 4 Unique Superpowers

### 1. =��� Magic Component Generation (Zero CLI)
We loved the idea of Shadcn giving you ownership of the code, but hated running CLI commands for every single component. 

With DolphinCSS, **you never touch the terminal.** Just type a magic class in your editor and save:

```jsx
// 1. You type this in your App.jsx:
<div className="dolphin-card"></div>

// 2. You hit Save (Ctrl+S)

// 3. =��� MAGIC! Vite instantly replaces that line IN YOUR FILE with the full React Component code!
<div className="glass card p-6 border border-white/20 rounded-2xl max-w-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden" style={{ backdropFilter: 'blur(20px)' }}>
  {/* Full customizable code is now YOURS */}
</div>
```

### 2. =�Ŀ High-Level Global Classes
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

### 3. =��� Infinite Class Composability (Nesting)
Classes in DolphinCSS are designed to stack perfectly. Combine background colors, gradients, glows, and animations endlessly without conflicts!

```jsx
// Combine classes to create complex, animated, glowing UI instantly:
<button className="filled success gradient glow glow-pulse rounded-full">
  I am a Glowing, Pulsing, Gradient Green Button!
</button>

// Create a frosted glass overlay with a dark tint:
<div className="overlay overlay-blur-xl overlay-dark-50"></div>
```

### 4. =�ļ World-Class Built-in Animations
No need for `framer-motion` or `animate.css`. DolphinCSS ships with a complete `@layer utilities` animation engine that you can drop on any HTML element.

- **Continuous:** `float`, `spin-slow`, `pulse`, `bounce`, `shimmer`, `gradient-flow`, `neon-flicker`
- **Hover:** `hover-pulse`, `hover-jelly`, `hover-glow`, `hover-ripple`
- **Entrance:** `fade-in`, `slide-up`, `zoom-in`, `rotate-3d`
- **Controls:** `delay-200`, `duration-500`

```jsx
<img src="logo.png" className="float hover-jelly fade-in delay-200" />
```

---

## =��� Installation & Setup

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

## =�ɼ Available Magic Components

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

- <div className="dolphin-hero"></div> (Stunning Landing Page Hero)
- <div className="dolphin-pricing"></div> (Premium Pricing Tables)
- <div className="dolphin-timeline"></div> (Vertical Activity Timeline)
- <div className="dolphin-chat"></div> (Modern Messaging Interface)
- <div className="dolphin-carousel"></div> (Interactive Image Slider)
- <div className="dolphin-dropzone"></div> (Drag & Drop File Upload)
- <div className="dolphin-rating"></div> (Interactive 5-Star Rating)
- <div className="dolphin-steps"></div> (Progress Stepper)
- <div className="dolphin-pagination"></div> (Page Navigation Controls)
- <div className="dolphin-drawer"></div> (Off-canvas Glass Sidebar)
- <div className="dolphin-breadcrumbs"></div> (Navigation Trail)

## ?? The Power of Variants (x-*)

DolphinCSS ships with world-class, pre-built global variants. Instead of writing 15 Tailwind utility classes to create a glassmorphism effect, just use one class!

### ?? Premium Effects
Combine these on any div, card, or container:
- x-glass (Classic Frosted Glass)
- x-crystal (Ultra-clear Crystal Border)
- x-neon (Cyberpunk Neon Glow)
- x-holo (Holographic Matrix)
- x-flare (Solar Flare Gradient)
- x-cyber (Cyberpunk Aesthetic)
- x-nebula (Galactic Nebula Depth)
- x-metal (Liquid Mercury)
- x-aurora (Frosted Aurora)
- x-float (Quantum Float on Hover)

### ?? Advanced Glows & Animations
Bring your UI to life instantly:
- glow (Standard Hover Glow)
- glow pulse (Continuous Pulsing Glow)
- glow wave (Ocean Wave Animation)

### ?? Global Colors & Buttons
Propagate theme colors cleanly:
`jsx
<button className="filled primary px-6 py-2 glow wave">Primary Action</button>
<button className="outlined success px-6 py-2">Success Outline</button>
<button className="plain danger px-6 py-2">Danger Plain</button>

{/* Perfect Circle Icons */}
<button className="circle lg fx-aurora glow wave">
  <Icon />
</button>
`


---

## 🌐 Custom Remote Templates (Host Your Own Shadcn UI!)

One of the most revolutionary features of DolphinCSS is that **you are not limited to our built-in components.** You can easily create, host, and distribute your own custom React/JSX components remotely from your own GitHub repository for free!

### Step 1: Create Your Templates Repository
Create a public repository on GitHub (e.g., `https://github.com/YourUsername/my-dolphincss-templates`).

Create the following folder structure inside it:
```
my-dolphincss-templates/
├── config/
│   └── markers.json
└── templates/
    ├── dolphin-custom-header.html
    └── dolphin-custom-card.html
```

### Step 2: Configure Your `config/markers.json`
Define your magic class names and link them to their respective template files inside `/templates/`:
```json
{
  "dolphin-custom-header": {
    "templateFile": "dolphin-custom-header.html",
    "addClasses": ""
  },
  "dolphin-custom-card": {
    "templateFile": "dolphin-custom-card.html",
    "addClasses": "card glass glow"
  }
}
```

### Step 3: Link Your Custom Repo to DolphinCSS
In your React project's root folder, create a file named `dolphin.config.json` and point the `remoteUrl` key to the **browser link** of your `markers.json` file on GitHub:

```json
{
  "remoteUrl": "https://github.com/YourUsername/my-dolphincss-templates/blob/main/config/markers.json"
}
```

### How it works:
When you run `npm run dev`, DolphinCSS will:
1. Detect `dolphin.config.json` in your project root.
2. Read the `remoteUrl` and normalize it to fetch your custom `markers.json`.
3. Watch for your custom magic markers in your source code (e.g. `<div className="dolphin-custom-header"></div>`).
4. Instantly fetch the custom templates from your GitHub repository on-demand, format them with perfect multi-line nesting/indentation, and auto-inject them directly into your file!

---

**Built with ❤️ in Nepal.** Ready for the future of UI development.
