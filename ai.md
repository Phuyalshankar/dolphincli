# DolphinCSS - AI Developer Guide

Welcome AI Assistant! This guide outlines the structure and workflows of the DolphinCSS project so you can navigate and build efficiently without unnecessary file searching.

## Project Structure

The main working directory is `c:\Users\USER\Desktop\dolphincss\dolphincss`.

- `/MainCss/`: Core CSS files defining DolphinCSS variables, components (forms, buttons, layout, etc.), and utilities. 
  *If you are modifying core CSS styles or theming, look here!*
- `/bin/`: Contains `dolphin.js`, the Node.js CLI script. 
  *If you are fixing component injection logic, marker regex, or GitHub fetching, look here!*
- `/src/`: Contains the local Vite development and testing environment (`App.jsx`, `main.jsx`, etc.).
  *Use `src/App.jsx` to test and preview injected components.*
- `/dist/`: Compiled production CSS builds.
- `/react-test/`: Secondary react test environment (if needed).
- `package.json`: Main entry point for scripts. (e.g. `npm run dev`, `npm run build:css`). Note that the project uses ES Modules (`"type": "module"`).

## Remote Architecture (Templates)
DolphinCSS acts as a **zero-install, CLI-driven component library** (similar to Shadcn UI).
- Templates are hosted **remotely** on GitHub: `https://github.com/Phuyalshankar/dolphincss-template`
- The `bin/dolphin.js` watcher scans `.jsx` or `.html` files for markers like `<div className="dolphin-switch"></div>`.
- When a marker is found, the CLI dynamically fetches the corresponding template from the remote repository's `/templates` folder and injects it in place, converting standard HTML into React/JSX compatible code (e.g., `class` to `className`, HTML comments to JSX comments).

## AI Workflows & Context Management

To save time, tokens, and API cost, please restrict your scope based on the active task:

1. **CLI / Injection Task (Node.js)**
   - Focus strictly on `bin/dolphin.js`.
   - **Ignore**: `/MainCss/`, `/src/` (unless testing the CLI output).

2. **Core CSS Task (Tailwind/CSS)**
   - Focus strictly on `/MainCss/*.css`.
   - Run `npm run build:css` after making changes to update the main bundle.
   - **Ignore**: `/bin/`, `/snippets/`.

3. **Template / Component Building Task (HTML/JSX)**
   - Focus on the `dolphincss-template` remote repository (or local backups if requested by the user).
   - Update remote `config/markers.json` when adding new components.
   - Test locally in `src/App.jsx` via `npm run dev` (which runs Vite + the `dolphin.js` watcher).
   - **Ignore**: `/MainCss/`, `/bin/`.

Please reference `ai.ignore` to understand which folders should be omitted from context depending on your current task.
