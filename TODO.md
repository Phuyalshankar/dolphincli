# DolphinCSS - Progress & TODO Tracker
This file tracks the current state of the DolphinCSS project, what has been completed, and what needs to be done next. This ensures any AI assistant or developer can instantly pick up from where we left off.

## ✅ Completed Tasks (Last Session)

### 1. Dolphin CLI & Architecture
- [x] Migrated all templates to a remote GitHub repository (`dolphincss-template`).
- [x] Implemented on-demand fetching via `bin/dolphin.js`.
- [x] Added regex to automatically convert HTML comments (`<!-- ... -->`) to JSX comments (`{/* ... */}`) when injecting into `.jsx` files.
- [x] Added Cache-busting (`?t=Date.now()`) to CLI fetch requests to instantly pull new GitHub updates during local development.

### 2. Core CSS 
- [x] Removed the global `::after` tick mark from `MainCss/form.css` to prevent "double ticks" on checkboxes.
- [x] Added `skeleton.css` and `progress.css` to core bundle.
- [x] Added `has-error` form validation states to `form.css`.
- [x] Rebuilt the `dolphin-css.css` bundle.

### 3. Shadcn-like Components
- [x] **Batch 1:** Created `dolphin-accordion`, `dolphin-avatar`, `dolphin-checkbox`, `dolphin-tabs`.
- [x] **Batch 2:** Created `dolphin-switch`, `dolphin-tooltip`, `dolphin-slider` (fixed appearance), `dolphin-dropdown`.
- [x] **Batch 3:** Created `dolphin-modal` (accessible), `dolphin-toast`, `dolphin-popover`, `dolphin-skeleton`, `dolphin-progress`.
- [x] Added all components to the remote `markers.json` registry.
- [x] Injected and verified all components locally in `src/App.jsx`.

### 4. AI Tooling
- [x] Created `ai.md` (AI Developer Guide).
- [x] Created `ai.ignore` (Context exclusion rules).

### 5. Vite Plugin & Template Generation Refactoring (Current Session)
- [x] **Race-Condition Protection:** Resolved asynchronous race conditions in on-demand fetching via an `activeFetches` promise Map, guaranteeing flawless concurrent template injections.
- [x] **Vite Plugin Overhaul (`vite-plugin.js`):** Redesigned the plugin to support fully independent, asynchronous, on-demand remote marker fetching.
- [x] **Startup Scanner:** Integrated a `buildStart` hook scanner inside `vite-plugin.js` to automatically scan all source files and auto-inject templates instantly on `npm run dev` startup, solving Vite's lazy-loading limitations.
- [x] **Auto-Indentation Engine:** Built a lightweight tag-nesting and auto-indentation engine (`indentHtmlOrJsx`) to format expanded templates with beautiful multi-line formatting upon injection.
- [x] **Local Fallbacks:** Added robust local fallbacks inside `bin/dolphin.js` and `vite-plugin.js` to correctly resolve `marker.json` at the root and look in both `templates` and `core-templates` directories.
- [x] **Custom Remote Templates:** Documented the complete step-by-step setup inside `README.md` on how users can host their own Shadcn-like templates on GitHub, link them via `dolphin.config.json`, and even Fork our official repository for quick start!
- [x] **npm Publishing Optimization:** Bumped version to `1.3.2`, added missing `vite-plugin.js`, `marker.json`, and `dolphincss-plugin.cjs` files to the `files` array inside `package.json`, and unignored `marker.json` in `.npmignore`.

---

## 🚧 Pending Tasks (Next Session / TODO)

### 1. Enhancements & Fixes
- [ ] **Animations:** Consider adding a lightweight animation plugin or extending Tailwind classes for entry/exit animations (like `tailwindcss-animate`).
- [ ] **Accessibility (a11y):** Ensure all new components use proper `aria-*` attributes and keyboard navigation (e.g., standardizing the dropdown and tabs).

---
*Next time you start a session, just ask the AI to "Read TODO.md and continue from the pending tasks".*
