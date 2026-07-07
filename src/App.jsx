import React, { useState } from "react"
import "../dolphin-css.css"
import {
  ub,
  glass,
  glassVert,
  glassHoriz,
  glassRadial,
  p,
  m,
  pl,
  pr,
  ml,
  mr,
  pt,
  pb,
  mt,
  mb,
  w,
  h,
  scale,
  rounded,
  shadow,
  opacity,
  bg,
  text,
  grid,
  autoGrid,
  autoLayout,
  bgAnim,
  opacityAnim,
  scaleAnim
} from "./ub"

// Local helpers mapping to real UB parameters
const px_pad = (v) => pl(v) + " " + pr(v);
const py_pad = (v) => pt(v) + " " + pb(v);
const mx_marg = (v) => ml(v) + " " + mr(v);
const my_marg = (v) => mt(v) + " " + mb(v);

function ThemeSwitcher() {
  return (
    <div className={ub(autoLayout("row", "center", 2) + " fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full border border-white/20 shadow-2xl")}
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(20px)" }}>
      {[["🐬", "dolphin"], ["🦚", "danphe"]].map(([emoji, t]) => (
        <button key={t} title={t}
          onClick={() => { document.documentElement.setAttribute("data-theme", t); localStorage.setItem("theme", t); }}
          className="w-9 h-9 rounded-full flex items-center justify-center text-xl hover:scale-110 transition-all focus:outline-none hover:bg-white/10">
          {emoji}
        </button>
      ))}
      <div className={ub(w(0.25) + " " + h(6) + " bg-white/20 mx-1")} />
      <button title="Light"
        onClick={() => { document.documentElement.setAttribute("data-theme-mode", "light"); localStorage.setItem("theme-mode", "light"); }}
        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-yellow-400/20 hover:scale-110 transition-all focus:outline-none text-white/70 hover:text-yellow-300">
        ☀️
      </button>
      <button title="Dark"
        onClick={() => { document.documentElement.setAttribute("data-theme-mode", "dark"); localStorage.setItem("theme-mode", "dark"); }}
        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-blue-400/20 hover:scale-110 transition-all focus:outline-none text-white/70 hover:text-blue-300">
        🌙
      </button>
    </div>
  )
}

function StatCard({ glassClass, icon, label, value, change, positive, delay }) {
  return (
    <div className={ub(opacityAnim(0, 100, delay) + " " + glassClass + " " + p(5) + " " + autoLayout("col", "start", 3))}>
      <div className={ub(autoLayout("row", "between"))}>
        <span className="text-2xl">{icon}</span>
        <span className={ub("text-xs font-bold " + py_pad(1) + " " + px_pad(2) + " " + rounded(4) + " " + (positive ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"))}>
          {change}
        </span>
      </div>
      <div>
        <p className="text-white/60 text-xs font-medium uppercase tracking-wider">{label}</p>
        <p className="text-white text-2xl font-bold mt-1">{value}</p>
      </div>
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className={ub(w("100%") + " min-h-screen relative overflow-x-hidden")} style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* Background with animated orbs (using ub scaleAnim) */}
      <div className="fixed inset-0 -z-10" style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #1a1a4e 30%, #24243e 60%, #0f0c29 100%)"
      }}>
        {/* Pulsing orbs via scaleAnim */}
        <div className={ub(scaleAnim(90, 115, 8000, true) + " absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-30")}
          style={{ background: "radial-gradient(circle, oklch(0.5 0.28 260), transparent 70%)" }} />
        <div className={ub(scaleAnim(95, 110, 10000, true) + " absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-25")}
          style={{ background: "radial-gradient(circle, oklch(0.5 0.24 310), transparent 70%)" }} />
        <div className={ub(scaleAnim(85, 120, 12000, true) + " absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full opacity-20")}
          style={{ background: "radial-gradient(circle, oklch(0.55 0.22 60), transparent 70%)" }} />
        <div className={ub(scaleAnim(90, 110, 9000, true) + " absolute top-[20%] right-[20%] w-[300px] h-[300px] rounded-full opacity-20")}
          style={{ background: "radial-gradient(circle, oklch(0.52 0.24 350), transparent 70%)" }} />
      </div>

      <div className={ub(w("100%") + " max-w-6xl mx-auto " + px_pad(4) + " " + py_pad(8) + " pb-28")}>

        {/* Header Section */}
        <div className={ub(opacityAnim(0, 100, 400) + " " + autoLayout("row", "between") + " " + mb(8))}>
          <div className={ub(autoLayout("col", "start", 1))}>
            <div className={ub(autoLayout("row", "center", 3))}>
              <span className="text-3xl">🐬</span>
              <h1 className="text-2xl font-bold text-white tracking-tight">DolphinCSS</h1>
              <span className={ub("glass-blue-180-purple-100-20 text-xs " + px_pad(3) + " " + py_pad(1) + " text-white font-semibold")}>
                Glass System v2
              </span>
            </div>
            <p className="text-white/50 text-sm ml-12">World-Class Dynamic Glass Gradient Demo</p>
          </div>
          <div className={ub(autoLayout("row", "center", 2))}>
            <div className={ub(opacityAnim(40, 100, 2000, true) + " w-2 h-2 rounded-full bg-green-400")} />
            <span className="text-white/60 text-sm">Live Preview</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={ub(opacityAnim(0, 100, 500) + " " + autoLayout("row", "center", 1) + " " + p(1) + " " + rounded(4) + " " + mb(8))} 
             style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
          {["overview", "gradient", "radial", "directions"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={"flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 capitalize " +
                (activeTab === tab
                  ? "bg-white/15 text-white shadow-lg border border-white/20"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5")}>
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab Content */}
        {activeTab === "overview" && (
          <div className={ub(autoLayout("col", "start", 6))}>
            
            {/* Hero Card */}
            <div className={ub(opacityAnim(0, 100, 600) + " " + glassRadial("purple", 200, "blue", 120, 35) + " " + p(6) + " " + autoLayout("row", "center", 6))}>
              <div className="relative flex-shrink-0">
                <div className={ub("w-20 h-20 " + rounded(4) + " " + autoLayout("row", "center") + " text-4xl")}
                  style={{ background: "linear-gradient(135deg, oklch(0.55 0.28 260), oklch(0.5 0.24 310))" }}>
                  👤
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-black/50" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-white text-xl font-bold">Shankar Phunyal</h2>
                <p className="text-white/60 text-sm">DolphinCSS Creator • Full Stack Dev</p>
                <div className={ub("flex gap-3 mt-3 flex-wrap " + autoLayout("row", "center", 3))}>
                  <span className={ub(glass("blue", 148, 80) + " text-xs " + px_pad(3) + " " + py_pad(1) + " text-white rounded-full")}>React</span>
                  <span className={ub(glass("purple", 148, 80) + " text-xs " + px_pad(3) + " " + py_pad(1) + " text-white rounded-full")}>CSS</span>
                  <span className={ub(glass("green", 148, 80) + " text-xs " + px_pad(3) + " " + py_pad(1) + " text-white rounded-full")}>TypeScript</span>
                </div>
              </div>
              <div className={ub("hidden md:flex flex-col items-end gap-2 " + autoLayout("col", "end", 2))}>
                <button className={ub(glassHoriz("blue", 150, "purple", 100, 30)) + " " + px_pad(5) + " " + py_pad(2.5) + " text-white text-sm font-bold " + rounded(3)}>
                  Follow
                </button>
                <button className={ub(px_pad(5) + " " + py_pad(2.5) + " text-white/60 text-sm " + rounded(3) + " border border-white/15 hover:bg-white/5 transition-all")}>
                  Message
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className={ub(grid("2", "1", 4) + " md:grid-4x1-4 " + w("100%"))}>
              <StatCard glassClass={glass("blue", 180, 140)} icon="📦" label="Components" value="248" change="+12%" positive delay={700} />
              <StatCard glassClass={glass("purple", 180, 140)} icon="⭐" label="Stars" value="4.2K" change="+8%" positive delay={800} />
              <StatCard glassClass={glass("teal", 180, 140)} icon="📥" label="Downloads" value="18K" change="+24%" positive delay={900} />
              <StatCard glassClass={glass("pink", 180, 140)} icon="🐛" label="Issues" value="3" change="-67%" positive delay={1000} />
            </div>

            {/* Feature Cards Grid */}
            <div className={ub(grid("1", "1", 4) + " md:grid-3x1-4 " + w("100%"))}>
              <div className={ub(opacityAnim(0, 100, 700) + " " + glassVert("blue", 160, "purple", 100, 40) + " " + p(5) + " " + autoLayout("col", "start", 2))}>
                <div className="text-3xl">🌊</div>
                <h3 className="text-white font-bold">Glassmorphism Engine</h3>
                <p className="text-white/60 text-sm leading-relaxed">Dynamic OKLCH-based glass gradients. Up to 3 color stops, 4 directions, 0-255 opacity range.</p>
              </div>
              <div className={ub(opacityAnim(0, 100, 800) + " " + glassVert("purple", 160, "pink", 100, 40) + " " + p(5) + " " + autoLayout("col", "start", 2))}>
                <div className="text-3xl">⚡</div>
                <h3 className="text-white font-bold">Zero CSS Required</h3>
                <p className="text-white/60 text-sm leading-relaxed">CSS generated at runtime via CSSStyleSheet API. LRU caching, GPU-accelerated, dark mode aware.</p>
              </div>
              <div className={ub(opacityAnim(0, 100, 900) + " " + glassVert("teal", 160, "blue", 100, 40) + " " + p(5) + " " + autoLayout("col", "start", 2))}>
                <div className="text-3xl">🎨</div>
                <h3 className="text-white font-bold">Material You Design</h3>
                <p className="text-white/60 text-sm leading-relaxed">Android-inspired deep blur, tinted borders, multi-layer shadows, inner shimmer highlights.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "gradient" && (
          <div className={ub(autoLayout("col", "start", 6))}>
            <p className={ub(opacityAnim(0, 100, 400) + " text-white/50 text-sm")}>
              <code className="bg-white/10 px-2 py-0.5 rounded text-white/80">glass-color1-shade1-color2-shade2-opacity</code>
              {" "}— 135deg diagonal gradient glass
            </p>
            <div className={ub(grid("1", "1", 4) + " md:grid-2x1-4 " + w("100%"))}>
              {[
                { cls: "glass-red-180-orange-120-40", label: "glass-red-180-orange-120-40", emoji: "🔥", desc: "Fire gradient" },
                { cls: "glass-blue-180-purple-120-40", label: "glass-blue-180-purple-120-40", emoji: "🌌", desc: "Galaxy gradient" },
                { cls: "glass-teal-180-green-120-40", label: "glass-teal-180-green-120-40", emoji: "🌿", desc: "Nature gradient" },
                { cls: "glass-pink-180-purple-120-40", label: "glass-pink-180-purple-120-40", emoji: "🌸", desc: "Blossom gradient" },
                { cls: "glass-amber-180-orange-100-40", label: "glass-amber-180-orange-100-40", emoji: "✨", desc: "Gold gradient" },
                { cls: "glass-blue-160-teal-120-green-80-45", label: "glass-blue-160-teal-120-green-80-45", emoji: "🏄", desc: "Ocean triple" },
              ].map(({ cls, label, emoji, desc }, i) => (
                <div key={cls} className={ub(opacityAnim(0, 100, 500 + i * 80) + " " + cls + " " + p(5) + " " + autoLayout("row", "center", 4))}>
                  <span className="text-4xl">{emoji}</span>
                  <div>
                    <p className="text-white font-bold">{desc}</p>
                    <code className="text-white/50 text-xs break-all">{label}</code>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={ub(opacityAnim(0, 100, 1000) + " " + glass("red", 140, "purple", 100, "blue", 80, 35) + " " + p(6) + " " + autoLayout("col", "start", 3))}>
              <p className="text-white font-bold text-lg">Triple Color Glass 🎆</p>
              <code className="text-white/50 text-sm">glass-red-140-purple-100-blue-80-35</code>
              <div className={ub(autoLayout("row", "center", 3) + " mt-4 flex-wrap")}>
                <span className={ub(glass("red", 120, 30) + " text-xs " + px_pad(3) + " " + py_pad(1) + " text-white rounded-full")}>Red stop: 140</span>
                <span className={ub(glass("purple", 120, 30) + " text-xs " + px_pad(3) + " " + py_pad(1) + " text-white rounded-full")}>Purple stop: 100</span>
                <span className={ub(glass("blue", 120, 30) + " text-xs " + px_pad(3) + " " + py_pad(1) + " text-white rounded-full")}>Blue stop: 80</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "radial" && (
          <div className={ub(autoLayout("col", "start", 6))}>
            <p className={ub(opacityAnim(0, 100, 400) + " text-white/50 text-sm")}>
              <code className="bg-white/10 px-2 py-0.5 rounded text-white/80">glass-radial-color1-shade1-color2-shade2-opacity</code>
              {" "}— elliptical radial glow from top-left
            </p>
            <div className={ub(grid("1", "1", 4) + " md:grid-3x1-4 " + w("100%"))}>
              {[
                { cls: glassRadial("blue", 220, "purple", 100, 40), name: "Blue → Purple", emoji: "💙", use: "Notifications" },
                { cls: glassRadial("pink", 220, "orange", 100, 40), name: "Pink → Orange", emoji: "🌅", use: "Stories" },
                { cls: glassRadial("teal", 220, "green", 100, 40), name: "Teal → Green", emoji: "🌊", use: "Balance" },
                { cls: glassRadial("purple", 220, "pink", 100, 40), name: "Purple → Pink", emoji: "💜", use: "Premium" },
                { cls: glassRadial("amber", 220, "orange", 120, 45), name: "Amber → Orange", emoji: "🔆", use: "Energy" },
                { cls: glassRadial("red", 200, "purple", 120, 40), name: "Red → Purple", emoji: "🎯", use: "Analytics" },
              ].map(({ cls, name, emoji, use }, i) => (
                <div key={name} className={ub(opacityAnim(0, 100, 500 + i * 90) + " " + cls + " " + p(5) + " " + autoLayout("col", "center", 2) + " text-center")}>
                  <span className="text-4xl">{emoji}</span>
                  <p className="text-white font-bold">{name}</p>
                  <span className="text-white/50 text-xs">{use}</span>
                  <div className={ub(w("100%") + " mt-2 h-1 " + rounded("full") + " overflow-hidden")} style={{ background: "rgba(255,255,255,0.1)" }}>
                    <div className={ub(h("100%") + " " + rounded("full"))} style={{ width: (60 + i * 7) + "%", background: "rgba(255,255,255,0.4)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "directions" && (
          <div className={ub(autoLayout("col", "start", 6))}>
            <p className={ub(opacityAnim(0, 100, 400) + " text-white/50 text-sm")}>चार direction compare — एउटै color pair, फरक gradient direction</p>
            <div className={ub(grid("1", "1", 5) + " md:grid-2x2-5 " + w("100%"))}>
              <div className={ub(opacityAnim(0, 100, 500) + " " + glass("blue", 180, "purple", 120, 40) + " " + p(6) + " " + autoLayout("col", "start", 3))}>
                <div className={ub(autoLayout("row", "center", 3))}>
                  <div className={ub("w-8 h-8 " + rounded(2) + " " + autoLayout("row", "center") + " text-lg")} style={{ background: "rgba(255,255,255,0.15)" }}>↗</div>
                  <div>
                    <p className="text-white font-bold">Default (135deg)</p>
                    <code className="text-white/40 text-xs">glass-blue-180-purple-120-40</code>
                  </div>
                </div>
                <p className="text-white/60 text-sm">Diagonal gradient — most popular for card backgrounds.</p>
              </div>
              <div className={ub(opacityAnim(0, 100, 600) + " " + glassVert("blue", 180, "purple", 120, 40) + " " + p(6) + " " + autoLayout("col", "start", 3))}>
                <div className={ub(autoLayout("row", "center", 3))}>
                  <div className={ub("w-8 h-8 " + rounded(2) + " " + autoLayout("row", "center") + " text-lg")} style={{ background: "rgba(255,255,255,0.15)" }}>↓</div>
                  <div>
                    <p className="text-white font-bold">Vertical (top→bottom)</p>
                    <code className="text-white/40 text-xs">glass-vert-blue-180-purple-120-40</code>
                  </div>
                </div>
                <p className="text-white/60 text-sm">Perfect for sidebars, tall cards, navigation menus.</p>
              </div>
              <div className={ub(opacityAnim(0, 100, 700) + " " + glassHoriz("blue", 180, "purple", 120, 40) + " " + p(6) + " " + autoLayout("col", "start", 3))}>
                <div className={ub(autoLayout("row", "center", 3))}>
                  <div className={ub("w-8 h-8 " + rounded(2) + " " + autoLayout("row", "center") + " text-lg")} style={{ background: "rgba(255,255,255,0.15)" }}>→</div>
                  <div>
                    <p className="text-white font-bold">Horizontal (left→right)</p>
                    <code className="text-white/40 text-xs">glass-horiz-blue-180-purple-120-40</code>
                  </div>
                </div>
                <p className="text-white/60 text-sm">Great for progress bars, banners, horizontal stat strips.</p>
              </div>
              <div className={ub(opacityAnim(0, 100, 800) + " " + glassRadial("blue", 180, "purple", 100, 35) + " " + p(6) + " " + autoLayout("col", "start", 3))}>
                <div className={ub(autoLayout("row", "center", 3))}>
                  <div className={ub("w-8 h-8 " + rounded(2) + " " + autoLayout("row", "center") + " text-lg")} style={{ background: "rgba(255,255,255,0.15)" }}>◎</div>
                  <div>
                    <p className="text-white font-bold">Radial (center glow)</p>
                    <code className="text-white/40 text-xs">glass-radial-blue-180-purple-100-35</code>
                  </div>
                </div>
                <p className="text-white/60 text-sm">Spotlight effect — ideal for modals, popups, notifications.</p>
              </div>
              
              <div className={ub(opacityAnim(0, 100, 900) + " p-6 " + rounded(4) + " border border-white/10 " + autoLayout("col", "start", 4) + " md:span-2")}
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}>
                <p className="text-white font-bold">Opacity Scale (0 → 255) — glass-blue-148-[n]</p>
                <div className={ub(autoLayout("row", "center", 2) + " flex-wrap")}>
                  {[0, 30, 60, 90, 120, 150, 180, 210, 255].map(op => (
                    <div key={op} className={ub("glass-blue-148-" + op + " w-12 h-12 " + rounded(3) + " " + autoLayout("row", "center"))}>
                      <span className="text-white text-xs font-bold">{op}</span>
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-xs">0 = blur only · 255 = max tint (still glassmorphic)</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Test Dev Area illustrating user syntax */}
        <div className={ub(" glass-red-180-purple-100-2 " + p(8) + " " + mt(6))}>
          <p className="text-white font-bold">User Test Case 🎉</p>
          <code className="text-white/60 text-sm">class: glass-red-180-purple-100-20</code>
        </div>
      </div>
      <ThemeSwitcher />
    </div>
  )
}

export default App
