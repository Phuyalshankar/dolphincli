# dolphincli

Dolphin CLI is a tool that watches your code files and expands special markers into full UI components using predefined templates.

## Features

- Local and remote template support
- Real-time file watching
- Automatic component expansion in JS/TS/JSX/TSX/HTML files
- Cloud sync for templates

## Installation

```bash
npm install -g dolphincli
```

## Usage

1. Navigate to your project directory
2. Run `dolphin` to start the watcher
3. In your code, use markers like `<div class="button">` which will be expanded to full button components

## Configuration

Create a `dolphin.config.json` file in your project root:

```json
{
  "remoteUrl": "https://your-server.com/markers.json"
}
```

If no remoteUrl is provided, it uses local templates.

## Available Markers

| Marker       | Description                  |
|--------------|------------------------------|
| d-login      | Login form with email/password |
| d-table      | Responsive data table        |
| d-side-nav   | Side navigation menu         |
| d-topnav     | Top navigation bar           |
| d-kpi        | KPI metric card              |
| d-chart-card | Chart container card         |
| d-input-float| Floating label input field   |
| d-input-standard | Standard input field      |
| d-button     | Styled button component      |
| d-card       | Basic card component         |</content>
<parameter name="filePath">dolphincli/README.md