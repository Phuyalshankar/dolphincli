import React, { useEffect, useState } from "react";
import "../dolphin-css.css";

const buttonExamples = [
  {
    label: "Aurora Primary",
    className: "filled primary lg fx-aurora glow wave",
    icon: "✦",
    description: "Main user rule: semantic button + premium effect + wave glow",
  },
  {
    label: "Neon Success",
    className: "filled success lg fx-neon glow",
    icon: "✓",
    description: "Strong CTA with semantic success color and neon overlay",
  },
  {
    label: "Crystal Outline",
    className: "outlined primary lg fx-crystal glow",
    icon: "◇",
    description: "Outlined button that keeps readable border and effect layer",
  },
  {
    label: "Flare Danger",
    className: "plain danger lg fx-flare glow wave",
    icon: "!",
    description: "Plain action with stronger visual attention and animated glow",
  },
  {
    label: "Cyber Pulse",
    className: "filled primary lg fx-cyber glow wave",
    icon: "⚡",
    description: "Cyberpunk style CTA with brighter electric overlay",
  },
  {
    label: "Nebula Drive",
    className: "filled secondary lg fx-nebula glow",
    icon: "☄",
    description: "Space-like depth with softer but premium blended light",
  },
  {
    label: "Rainbow Viral",
    className: "filled success lg fx-rainbow glow wave",
    icon: "✸",
    description: "Multi-color viral look for promo or attention-heavy actions",
  },
  {
    label: "Metal Edge",
    className: "outlined secondary lg fx-metal glow",
    icon: "◈",
    description: "Shiny metallic surface for bold premium utility actions",
  },
  {
    label: "Aqua Flow",
    className: "filled info lg fx-aqua glow wave",
    icon: "⬢",
    description: "Cool aqua motion style that feels brighter on dark mode",
  },
];

const iconExamples = [
  "circle sm filled primary fx-aurora glow",
  "circle md filled success fx-neon glow wave",
  "circle lg outlined primary fx-crystal glow",
  "circle xl plain danger fx-flare glow wave",
];

function App() {
  const [theme, setTheme] = useState("dolphin");
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-theme-mode", mode);
  }, [theme, mode]);

  return (
    <div className="min-h-screen bg-surface text-text relative overflow-hidden">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          className="absolute -top-32 -left-20 w-96 h-96 rounded-full blur-3xl opacity-25"
          style={{ background: "color-mix(in oklch, var(--color-primary), transparent 55%)" }}
        />
        <div
          className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-20"
          style={{ background: "color-mix(in oklch, var(--color-info), transparent 60%)" }}
        />
        <div
          className="absolute -bottom-24 left-1/3 w-[26rem] h-[26rem] rounded-full blur-3xl opacity-20"
          style={{ background: "color-mix(in oklch, var(--color-secondary), transparent 62%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm opacity-70 mb-2">DolphinCSS Test Playground</p>
            <h1 className="text-3xl md:text-4xl font-bold">Composable FX Button Demo</h1>
            <p className="mt-3 max-w-2xl text-sm md:text-base opacity-75">
              यो page ले `filled primary lg fx-aurora glow wave` जस्तो nested class stack
              एउटै button मा compose भएर काम गरिरहेको छ कि छैन भन्ने test गर्न बनाइएको हो।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(theme === "dolphin" ? "danphe" : "dolphin")}
              className="outlined primary md fx-crystal glow"
            >
              {theme === "dolphin" ? "Theme: Dolphin" : "Theme: Danphe"}
            </button>
            <button
              type="button"
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              className="outlined secondary md fx-glass glow"
            >
              {mode === "dark" ? "Mode: Dark" : "Mode: Light"}
            </button>
          </div>
        </div>

        <div className="fx-crystal p-6 md:p-8 rounded-3xl mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Primary Rule Check</h2>
              <p className="opacity-75">
                semantic layer, size layer, effect layer, glow layer सबै एउटै `button` मा।
              </p>
            </div>
            <div className="badge filled primary lg">Build-ready</div>
          </div>

          <div className="flex flex-wrap gap-4 items-center mb-6">
            <button className="filled primary lg fx-aurora glow wave">
              <span className="mr-2">✦</span>
              Launch Aurora
            </button>
            <button className="filled primary md fx-aurora glow">
              <span className="mr-2">→</span>
              Quick Action
            </button>
            <button className="outlined primary lg fx-aurora glow">
              <span className="mr-2">◎</span>
              Outline Aurora
            </button>
          </div>

          <div className="card outlined p-4 rounded-2xl">
            <p className="font-semibold mb-2">Test Class</p>
            <code className="text-sm break-all">
              {`<button className="filled primary lg fx-aurora glow wave">...</button>`}
            </code>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-8">
          {buttonExamples.map((example) => (
            <div key={example.className} className="card glass p-5 rounded-2xl">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold">{example.label}</h3>
                  <p className="text-sm opacity-70 mt-1">{example.description}</p>
                </div>
                <div className="circle sm fx-crystal outlined primary">{example.icon}</div>
              </div>

              <button className={example.className}>
                <span className="mr-2">{example.icon}</span>
                {example.label}
              </button>

              <div className="mt-4 p-3 rounded-xl bg-surface/40 border border-border/40">
                <code className="text-xs md:text-sm break-all">{example.className}</code>
              </div>
            </div>
          ))}
        </div>

        <div className="card glass p-6 rounded-3xl mb-8">
          <h2 className="text-xl font-bold mb-4">Viral FX Row</h2>
          <p className="text-sm opacity-75 mb-5">
            यो row मा थप ५ वटा visually stronger `fx-*` variants राखिएको छ।
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <button className="filled primary lg fx-cyber glow wave">Cyber</button>
            <button className="filled secondary lg fx-nebula glow">Nebula</button>
            <button className="filled success lg fx-rainbow glow wave">Rainbow</button>
            <button className="outlined secondary lg fx-metal glow">Metal</button>
            <button className="filled info lg fx-aqua glow wave">Aqua</button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <div className="card outlined p-5 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Icon Button Stack</h2>
            <div className="flex flex-wrap gap-4 items-center mb-4">
              {iconExamples.map((className, index) => (
                <button key={className} className={className} title={className}>
                  {index === 0 ? "A" : index === 1 ? "B" : index === 2 ? "C" : "D"}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {iconExamples.map((className) => (
                <code key={className} className="block text-xs md:text-sm break-all opacity-80">
                  {className}
                </code>
              ))}
            </div>
          </div>

          <div className="card outlined p-5 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Recommended Patterns</h2>
            <div className="flex flex-col gap-3">
              <div className="fx-glass p-4 rounded-2xl">
                <p className="font-semibold mb-2">Filled + FX</p>
                <button className="filled success lg fx-neon glow">Approve Payment</button>
              </div>
              <div className="fx-glass p-4 rounded-2xl">
                <p className="font-semibold mb-2">Outlined + FX</p>
                <button className="outlined secondary lg fx-crystal glow">Preview Design</button>
              </div>
              <div className="fx-glass p-4 rounded-2xl">
                <p className="font-semibold mb-2">Plain + FX</p>
                <button className="plain danger lg fx-flare glow wave">Remove Access</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card glass p-6 rounded-3xl">
          <h2 className="text-xl font-bold mb-4">Copy Paste Block</h2>
          <pre className="text-xs md:text-sm whitespace-pre-wrap overflow-x-auto p-4 rounded-2xl bg-surface/50 border border-border/40">
{`<button className="filled primary lg fx-aurora glow wave">
  Launch Aurora
</button>

<button className="filled success lg fx-neon glow">
  Approve
</button>

<button className="outlined primary lg fx-crystal glow">
  Preview
</button>

<button className="plain danger lg fx-flare glow wave">
  Remove
</button>`}
          </pre>
        </div>
      </div>
      <div className="flex-col-center w-full p-8">
            <button className="filled primary fx-aurora lg">test1</button>
            <button className="filled success fx-nebula lg">test1</button>
      </div>
    </div>
  );
}

export default App;
