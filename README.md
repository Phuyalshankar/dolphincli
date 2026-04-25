<div align="center">
  <h1>🐬 Dolphin CSS CLI </h1>
  <p><strong>Smart CLI for DolphinCSS. Auto-injects and converts premium UI templates into HTML or React (JSX) instantly.</strong></p>
  <br>
</div>

## ✨ What's New in v2.0!

- 🧠 **Depth-Aware Tag Parsing:** Advanced parser handles complex nested JSX/HTML tags flawlessly. No more `)` expected errors or broken DOM structures!
- 🎨 **Smart VS Code IntelliSense:** Automatically generates VS Code Custom HTML Data to suggest `d-login`, `d-table`, etc., as class names without intrusive code snippets.
- ⚛️ **Automated React Conversion:** Converts native HTML templates to pure JSX instantly (`class` → `className`, `onclick` → `onClick`, inline styles to objects).
- 🧩 **Inner Content Injection:** Safely preserves your custom content using the `{/* INNER */}` placeholder inside templates.
- ☁️ **Cloud Sync & Local Mode:** Fetch templates remotely or run entirely local with zero config.

## 🚀 Installation

Install globally to use it anywhere:

```bash
npm install -g dolphin-css-cli
```

*Or use it directly with npx:*
```bash
npx dolphin-css-cli
```

## 🛠️ Usage

1. Navigate to your project directory.
2. Run `dolphin` to start the watcher:
   ```bash
   dolphin
   ```
3. In your code, type any marker class (e.g., `<div className="d-login"></div>`) and hit save!
4. The CLI will instantly inject the premium UI component right into your file.

## ⚙️ Configuration

Create a `dolphin.config.json` file in your project root to fetch templates from the cloud:

```json
{
  "remoteUrl": "https://your-server.com/markers.json"
}
```

*If no `remoteUrl` is provided, the CLI automatically runs in lightning-fast Local Mode!*

## 📚 Available Markers

| Marker       | Component Description        |
|--------------|------------------------------|
| `d-login`      | Premium Login Form           |
| `d-table`      | Responsive Data Table        |
| `d-side-nav`   | Modern Side Navigation       |
| `d-topnav`     | Interactive Top Navbar       |
| `d-kpi`        | KPI Metric Dash Card         |
| `d-chart-card` | Data Visualization Container |
| `d-button`     | Dynamic Animated Buttons     |
| `d-card`       | Glassmorphism/Flat Cards     |
| `d-theme-toggle`| Dark/Light Mode Switcher    |
| ...and more! |                              |

## 🤝 Contributing
Want to add more premium templates? Fork the repo and submit a PR! Let's build the ultimate UI generation CLI together.

---
**Author:** Shankar Phuyal (Phuyalshankar)  
**License:** MIT