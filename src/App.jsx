import React from 'react'
import '../dolphin-css.css';
import { Mail, Lock, Eye } from 'lucide-react'
function App() {
  return (
    <div>
        <div className='w-full h-screen flex-col-center bg-laligurans'>
        <div className=" w-1/2 glass  card p-6 lg:p-8 border border-white/20 rounded-2xl" style={{ backdropFilter: 'blur(20px)' }}>
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
              <label className="flex-left gap-2 cursor-pointer">
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
      <div>
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass bg-surface/60 backdrop-blur-2xl border border-border/50 p-1.5 rounded-full shadow-2xl flex items-center gap-2 transition-all hover:bg-surface/80">
          {/* Theme Selector (Dolphin / Danphe) */}
          <div className="flex items-center bg-surface-dark/10 rounded-full p-1 border border-white/10 shadow-inner">
            <button
            onClick={() => {
            document.documentElement.setAttribute('data-theme', 'dolphin');
            localStorage.setItem('theme', 'dolphin');
          }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-xl hover:bg-primary/20 hover:scale-110 transition-all focus:outline-none"
            title="Dolphin Theme">
            🐬
          </button>
          <button
          onClick={() => {
          document.documentElement.setAttribute('data-theme', 'danphe');
          localStorage.setItem('theme', 'danphe');
        }}
          className="w-9 h-9 rounded-full flex items-center justify-center text-xl hover:bg-danphe/20 hover:scale-110 transition-all focus:outline-none"
          title="Danphe Theme">
          🦚
        </button>
        </div>
        <div className="w-px h-7 bg-border/50 mx-1">
        </div>
        {/* Mode Selector (Light / Dark) */}
        <div className="flex items-center bg-surface-dark/10 rounded-full p-1 border border-white/10 shadow-inner">
          <button
          onClick={() => {
          document.documentElement.setAttribute('data-theme-mode', 'light');
          localStorage.setItem('theme-mode', 'light');
        }}
          className="w-9 h-9 rounded-full flex items-center justify-center text-text hover:bg-warning/20 hover:text-warning-500 hover:scale-110 transition-all focus:outline-none"
          title="Light Mode">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
          </svg>
        </button>
        <button
        onClick={() => {
        document.documentElement.setAttribute('data-theme-mode', 'dark');
        localStorage.setItem('theme-mode', 'dark');
        }}
        className="w-9 h-9 rounded-full flex items-center justify-center text-text hover:bg-primary/20 hover:text-primary-400 hover:scale-110 transition-all focus:outline-none"
        title="Dark Mode">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        </button>
        </div>
        </div>
</div>
    </div>
  )
}

export default App