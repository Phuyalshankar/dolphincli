import React, { useState, useEffect } from 'react';
import '../dolphin-css.css';
import { Mail, Eye, Lock, Cpu, RefreshCw, Zap, Layers, Database, HardDrive, Thermometer, BatteryCharging, Code, LayoutGrid } from 'lucide-react';
import { ub, debugUB, oklch, clearUBCache, autoLayout, map } from './ub.js';

// Interactive Mixed Use Showcase component combining static classes, tailwind classes, and dynamic oklch
function MixedUseShowcase({ mode }) {
  const [cpuTemp, setCpuTemp] = useState(45);
  const [battery, setBattery] = useState(80);
  const [btnHoverText, setBtnHoverText] = useState('Hover over buttons to trigger dynamic fill transitions!');

  // Sliders for dynamic oklch bg color inversion test
  const [bgColor, setBgColor] = useState('purple');
  const [bgShade, setBgShade] = useState(150);

  const [diagnostics, setDiagnostics] = useState({
    cacheHitRate: '100%',
    styleCount: 0,
    classCache: 0,
    totalRequests: 0
  });

  // Calculate live stats periodically
  useEffect(() => {
    const timer = setInterval(() => {
      const stats = debugUB();
      let hitRate = '100%';
      if (stats.totalSegmentRequests > 0) {
        hitRate = `${((stats.cacheHits / stats.totalSegmentRequests) * 100).toFixed(1)}%`;
      }
      setDiagnostics({
        cacheHitRate: hitRate,
        styleCount: stats.styleCount,
        classCache: stats.classCache,
        totalRequests: stats.totalRequests
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={ub('auto-layout-col-6 w-full text-left bg-danphe')}>
      {/* Introduction Card (Static class + Dynamic Auto-Layout) */}
      <div className={ub('card glass p-6 border border-white/20 rounded-2xl auto-layout-col-3')}>
        <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
          <LayoutGrid className="text-primary-400" size={24} />
          🐬 DolphinCSS + ub.js Mixed-Use Showcase
        </h2>
        <p className="text-white/80 text-sm leading-relaxed">
          यो Showcase ले <strong>DolphinCSS का पुराना Static Classes</strong>, <strong>Tailwind Utilities</strong>, 
          र <strong>ub.js का dynamic OKLCH gradient / auto-layout classes</strong> लाई कसरी एकैसाथ 
          मिसाएर (mixed-use) प्रयोग गरिन्छ भनी देखाउँछ।
        </p>
      </div>

      <div className="grid gap-6 w-full md:grid-col-2">
        {/* Section 1: Dynamic OKLCH Shading & Auto-Contrast */}
        <div className={ub('card glass p-6 border border-white/20 rounded-2xl auto-layout-col-4')}>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="text-warning-400" size={18} />
            1. Dynamic OKLCH & Auto-Contrast
          </h3>
          <p className="text-xs text-white/70">
            Slider चलाएर Background Shade परिवर्तन गर्नुहोस्। Shade अनुसार Text को Color (Light/Dark) स्वतः अनुकूल (Invert) हुन्छ।
          </p>

          <div className="flex gap-4 w-full">
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-xs text-white/60">Color Base:</label>
              <select 
                value={bgColor} 
                onChange={(e) => setBgColor(e.target.value)}
                className="p-2 bg-white/10 border border-white/10 rounded-xl text-sm outline-none text-white cursor-pointer"
              >
                {['red', 'blue', 'green', 'purple', 'orange', 'pink', 'teal', 'amber', 'gray'].map(c => (
                  <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-xs text-white/60">Shade: <span className="font-mono font-bold">{bgShade}</span></label>
              <input 
                type="range" min="0" max="255" value={bgShade} 
                onChange={(e) => setBgShade(parseInt(e.target.value))} 
                className="w-full accent-primary cursor-pointer mt-2" 
              />
            </div>
          </div>

          {/* Mixed Class Card */}
          <div className={ub(`card p-6 rounded-2xl bg-${bgColor}-${bgShade} auto-layout-col-center-2 border border-white/15 transition-all duration-300`)}>
            <span className="text-lg font-bold">Auto-Contrast Text</span>
            <span className="text-xs opacity-80 font-mono text-center">bg-{bgColor}-{bgShade}</span>
          </div>

          <div className="bg-black/35 p-3 rounded-xl border border-white/10 font-mono text-[11px] text-white/90">
            <div className="text-primary-300 font-bold mb-1">// Mixed Classes Used:</div>
            <code className="break-all">{`className={ub("card p-6 rounded-2xl bg-${bgColor}-${bgShade} auto-layout-col-center-2")}`}</code>
          </div>
        </div>

        {/* Section 2: IoT Sensor Live Mapping (map.heat / map.fuel) */}
        <div className={ub('card glass p-6 border border-white/20 rounded-2xl auto-layout-col-4')}>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Thermometer className="text-danger-400" size={18} />
            2. IoT Live Sensor Mapping
          </h3>
          <p className="text-xs text-white/70">
            Numeric values लाई automatic visual indicator मा map preset (`map.heat` वा `map.fuel`) मार्फत direct color shade मा परिवर्तन गरिन्छ।
          </p>

          <div className="flex flex-col gap-4 w-full">
            {/* CPU Temp Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-white/70">
                <span>CPU Temperature:</span>
                <span className="font-bold font-mono">{cpuTemp}°C</span>
              </div>
              <input 
                type="range" min="0" max="100" value={cpuTemp} 
                onChange={(e) => setCpuTemp(parseInt(e.target.value))} 
                className="w-full accent-danger cursor-pointer" 
              />
              <div className={ub(`p-3 rounded-xl border border-white/10 bg-${map.heat(cpuTemp, 0, 100)} auto-layout-row-between-2 transition-all`)}>
                <span className="font-bold text-sm">CPU Sensor</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/20">{map.heat(cpuTemp, 0, 100)}</span>
              </div>
            </div>

            {/* Battery Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-white/70">
                <span>Battery Level:</span>
                <span className="font-bold font-mono">{battery}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={battery} 
                onChange={(e) => setBattery(parseInt(e.target.value))} 
                className="w-full accent-success cursor-pointer" 
              />
              <div className={ub(`p-3 rounded-xl border border-white/10 bg-${map.fuel(battery, 0, 100)} auto-layout-row-between-2 transition-all`)}>
                <span className="font-bold text-sm flex items-center gap-1">
                  <BatteryCharging size={16} />
                  Battery Status
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/20">{map.fuel(battery, 0, 100)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Dynamic Buttons & Animations */}
      <div className={ub('card glass p-6 border border-white/20 rounded-2xl auto-layout-col-3')}>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Code className="text-info-400" size={18} />
          3. Dynamic Buttons & Animations
        </h3>
        <p className="text-xs text-white/70">
          DolphinCSS का static buttons सँग dynamic scale-hover र dynamic transitions (`bg-fill-*`) लाई एकैसाथ मिसाउनुहोस्।
        </p>

        <div className={ub('auto-layout-wrap-center-3 py-2')}>
          {/* Button 1: static filled primary + dynamic scale */}
          <button 
            onMouseEnter={() => setBtnHoverText("Used: className={ub('filled primary btn-lg hover:scale-105 transition-all')}")}
            className={ub('filled primary btn-lg hover:scale-105 transition-all')}
          >
            Scale Hover Button
          </button>

          {/* Button 2: static outlined + dynamic background fill */}
          <button 
            onMouseEnter={() => setBtnHoverText("Used: className={ub('btn btn-outline border-blue-150 bg-fill-left-blue-150-500ms')}")}
            className={ub('btn btn-outline border-blue-150 bg-fill-left-blue-150-500ms')}
          >
            Background Fill Transition
          </button>

          {/* Button 3: static glow-pulse + oklch dynamic border */}
          <button 
            onMouseEnter={() => setBtnHoverText("Used: className={ub('filled success glow glow-pulse border-2 border-green-250')}")}
            className={ub('filled success glow glow-pulse border-2 border-green-250')}
          >
            Glowing Pulsing Button
          </button>
        </div>

        <div className="bg-black/35 p-3 rounded-xl border border-white/10 font-mono text-[11px] text-white/90 w-full min-h-[50px] flex items-center">
          <span className="text-info-300 font-semibold">{btnHoverText}</span>
        </div>
      </div>

      {/* Section 4: Engine Analysis & How it works */}
      <div className={ub('card glass p-6 border border-white/20 rounded-2xl auto-layout-col-3')}>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Database className="text-success-400" size={18} />
          4. How does the Engine process Mixed Classes?
        </h3>
        
        <div className="grid gap-4 w-full md:grid-col-2 text-xs">
          <div className="bg-black/25 p-4 rounded-xl border border-white/10">
            <span className="font-bold text-primary-300 block mb-2">// Input mixed string passed to ub():</span>
            <code className="text-white/80 select-all block break-all">
              ub("card glass glow hover:scale-105 gradient-blue-120-purple-240 auto-layout-col-center-3")
            </code>
          </div>
          
          <div className="bg-black/25 p-4 rounded-xl border border-white/10 auto-layout-col-2">
            <span className="font-bold text-success-300 block mb-2">// Engine Resolution Process:</span>
            <ul className="list-disc pl-4 space-y-1.5 text-white/80 text-left">
              <li><strong>card, glass, glow:</strong> Bypass evaluation. Returned as-is.</li>
              <li><strong>hover:scale-105:</strong> Evaluates scale(1.05) on hover state. Injects dynamic CSS rules.</li>
              <li><strong>gradient-blue-120-purple-240:</strong> Generates dynamic oklch gradient. Injects style rules.</li>
              <li><strong>auto-layout-col-center-3:</strong> Generates dynamic vertical flex layout, center alignment, and 12px gap. Injects rules.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Live Engine Diagnostics */}
      <div className="grid gap-4 w-full md:grid-col-4 text-xs mt-2">
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex flex-col">
          <span className="text-white/60">Cache Hit Rate</span>
          <span className="text-lg font-bold text-success mt-0.5">{diagnostics.cacheHitRate}</span>
        </div>
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex flex-col">
          <span className="text-white/60">CSS Rules Injected</span>
          <span className="text-lg font-bold text-primary mt-0.5">{diagnostics.styleCount} rules</span>
        </div>
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex flex-col">
          <span className="text-white/60">LRU Class Cache</span>
          <span className="text-lg font-bold text-warning mt-0.5">{diagnostics.classCache} classes</span>
        </div>
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex flex-col">
          <span className="text-white/60">Total Class Evaluations</span>
          <span className="text-lg font-bold text-info mt-0.5">{diagnostics.totalRequests}</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('cards');
  const [mode, setMode] = useState('light');
  
  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    document.documentElement.setAttribute('data-theme-mode', newMode);
  };

  return (
    <div className="bg-surface min-h-screen pb-16">
      {/* Tab Switcher Navigation (showcasing auto-layout-row-center-4) */}
      <div className={ub('auto-layout-row-center-4 py-4 border-b border-border bg-surface/80 backdrop-blur sticky top-0 z-[90] w-full')}>
        <button
          onClick={() => setActiveTab('login')}
          className={`px-5 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'login'
              ? 'filled primary text-white shadow-lg'
              : 'glass outlined primary hover:bg-surface-alt'
          }`}
        >
          Login Form Showcase
        </button>
        <button
          onClick={() => setActiveTab('cards')}
          className={`px-5 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'cards'
              ? 'filled primary text-white shadow-lg'
              : 'glass outlined primary hover:bg-surface-alt'
          }`}
        >
          Mixed-Use Showcase (ub.js)
        </button>
        <button
          onClick={toggleMode}
          className="glass outlined primary px-4 py-2 rounded-xl font-bold"
        >
          {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      <div className="p-8">
        {activeTab === 'login' ? (
          <div className="max-w-md mx-auto">
            <div className="glass card p-6 lg:p-8 border border-white/20 rounded-2xl" style={{ backdropFilter: 'blur(20px)' }}>
              <h3 className="text-xl font-bold text-white mb-1">Welcome Back 👋</h3>
              <p className="text-white/50 text-sm mb-6">Sign in to your account</p>
              <form className="flex-col-left w-full gap-5">
                <div className="w-full">
                  <div className="floatinglabel input-icon-left w-full">
                    <Mail size={20} className="icon-left text-primary-500" style={{ left: '1rem' }} />
                    <input type="email" id="login-email" className="floatinglabel-input lg w-full bg-white/10 border-white/20 focus:border-primary-400 transition-colors rounded-xl text-white placeholder:text-transparent" style={{ paddingLeft: '3.5rem' }} placeholder=" " />
                    <label htmlFor="login-email" className="floatinglabel-label text-white/70 font-medium" style={{ zIndex: 10 }}>Email Address</label>
                  </div>
                </div>
                <div className="w-full">
                  <div className="floatinglabel input-icon-both w-full">
                    <Lock size={20} className="icon-left text-primary-500" style={{ left: '1rem' }} />
                    <input type="password" id="login-password" className="floatinglabel-input lg w-full bg-white/10 border-white/20 focus:border-primary-400 transition-colors rounded-xl text-white placeholder:text-transparent" style={{ paddingLeft: '3.5rem', paddingRight: '3.5rem' }} placeholder=" " />
                    <label htmlFor="login-password" className="floatinglabel-label text-white/70 font-medium" style={{ zIndex: 10 }}>Password</label>
                    <button type="button" className="icon-right text-white/50 hover:text-white transition-colors" style={{ zIndex: 20, right: '1rem' }}>
                      <Eye size={20} />
                    </button>
                  </div>
                </div>
                <div className="flex-between w-full">
                  <label className={ub('auto-layout-row-left-2 cursor-pointer')}>
                    <input type="checkbox" id="remember-me" className="accent-primary-500 w-4 h-4 rounded border-white/30 bg-white/10" />
                    <span className="text-sm font-medium text-white/80">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-primary-300 hover:text-primary-200 transition-colors font-medium">Forgot password?</a>
                </div>
                <button type="button" className="filled primary-600 w-full py-3 rounded-xl text-white font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 glow"> Sign In </button>
                <p className="text-center text-white/50 text-sm w-full"> Don't have an account? <a href="#" className="text-primary-300 hover:text-primary-200 font-semibold transition-colors">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-7xl mx-auto">
            <MixedUseShowcase mode={mode} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
