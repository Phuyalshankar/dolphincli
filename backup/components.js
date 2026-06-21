export default {
  "dolphin-login": `
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
      <label className="flex-left gap-2 cursor-pointer">
        <input type="checkbox" id="remember-me" className="accent-primary-500 w-4 h-4 rounded border-white/30 bg-white/10" />
        <span className="text-sm font-medium text-white/80">Remember me</span>
      </label>
      <a href="#" className="text-sm text-primary-300 hover:text-primary-200 transition-colors font-medium">Forgot password?</a>
    </div>

    <button type="button" className="filled primary-600 w-full py-3 rounded-xl text-white font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 glow">
      Sign In
    </button>

    <p className="text-center text-white/50 text-sm w-full">
      Don't have an account? <a href="#" className="text-primary-300 hover:text-primary-200 font-semibold transition-colors">Sign up</a>
    </p>
  </form>
</div>
  `.trim(),
  "dolphin-register": `
<div className="glass card p-6 lg:p-8 border border-white/20 rounded-2xl" style={{ backdropFilter: 'blur(20px)' }}>
  <h3 className="text-xl font-bold text-white mb-1">Create Account 🚀</h3>
  <p className="text-white/50 text-sm mb-6">Join thousands of users today</p>
  <form className="flex-col-left w-full gap-5">
    <div className="w-full">
      <div className="floatinglabel input-icon-left w-full">
        <Users size={20} className="icon-left text-secondary-400" style={{ left: '1rem' }} />
        <input type="text" id="reg-name" className="floatinglabel-input lg w-full bg-white/10 border-white/20 focus:border-secondary-400 transition-colors rounded-xl text-white placeholder:text-transparent" style={{ paddingLeft: '3.5rem' }} placeholder=" " />
        <label htmlFor="reg-name" className="floatinglabel-label text-white/70 font-medium" style={{ zIndex: 10 }}>Full Name</label>
      </div>
    </div>

    <div className="w-full">
      <div className="floatinglabel input-icon-left w-full">
        <Mail size={20} className="icon-left text-secondary-400" style={{ left: '1rem' }} />
        <input type="email" id="reg-email" className="floatinglabel-input lg w-full bg-white/10 border-white/20 focus:border-secondary-400 transition-colors rounded-xl text-white placeholder:text-transparent" style={{ paddingLeft: '3.5rem' }} placeholder=" " />
        <label htmlFor="reg-email" className="floatinglabel-label text-white/70 font-medium" style={{ zIndex: 10 }}>Email Address</label>
      </div>
    </div>

    <div className="w-full">
      <div className="floatinglabel input-icon-both w-full">
        <Lock size={20} className="icon-left text-secondary-400" style={{ left: '1rem' }} />
        <input type="password" id="reg-password" className="floatinglabel-input lg w-full bg-white/10 border-white/20 focus:border-secondary-400 transition-colors rounded-xl text-white placeholder:text-transparent" style={{ paddingLeft: '3.5rem', paddingRight: '3.5rem' }} placeholder=" " />
        <label htmlFor="reg-password" className="floatinglabel-label text-white/70 font-medium" style={{ zIndex: 10 }}>Password</label>
        <button type="button" className="icon-right text-white/50 hover:text-white transition-colors" style={{ zIndex: 20, right: '1rem' }}>
          <Eye size={20} />
        </button>
      </div>
    </div>

    <div className="w-full">
      <div className="floatinglabel input-icon-left w-full">
        <Lock size={20} className="icon-left text-secondary-400" style={{ left: '1rem' }} />
        <input type="password" id="reg-confirm" className="floatinglabel-input lg w-full bg-white/10 border-white/20 focus:border-secondary-400 transition-colors rounded-xl text-white placeholder:text-transparent" style={{ paddingLeft: '3.5rem' }} placeholder=" " />
        <label htmlFor="reg-confirm" className="floatinglabel-label text-white/70 font-medium" style={{ zIndex: 10 }}>Confirm Password</label>
      </div>
    </div>

    <label className="flex-left gap-2 cursor-pointer w-full">
      <input type="checkbox" id="agree-terms" className="accent-secondary-500 w-4 h-4 rounded border-white/30 bg-white/10" />
      <span className="text-sm font-medium text-white/80">I agree to the <a href="#" className="text-secondary-300 hover:text-secondary-200 transition-colors">Terms &amp; Privacy</a></span>
    </label>

    <button type="button" className="filled secondary-600 w-full py-3 rounded-xl text-white font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 glow">
      Create Account
    </button>

    <p className="text-center text-white/50 text-sm w-full">
      Already have an account? <a href="#" className="text-secondary-300 hover:text-secondary-200 font-semibold transition-colors">Sign in</a>
    </p>
  </form>
</div>
  `.trim(),
  "dolphin-form-floating": `
<div className="glass card p-6 lg:p-8 border border-white/20 rounded-2xl" style={{ backdropFilter: 'blur(20px)' }}>
  <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
  <form className="flex-col-left w-full gap-5">
    <div className="w-full">
      <div className="floatinglabel input-icon-left w-full">
        <Mail size={20} className="icon-left text-primary-500" style={{ left: '1rem' }} />
        <input type="email" id="email-float" className="floatinglabel-input lg w-full bg-white/10 border-white/20 focus:border-primary-400 transition-colors rounded-xl text-white placeholder:text-transparent" style={{ paddingLeft: '3.5rem' }} placeholder=" " />
        <label htmlFor="email-float" className="floatinglabel-label text-white/70 font-medium" style={{ zIndex: 10 }}>Email Address</label>
      </div>
    </div>
    
    <div className="w-full">
      <div className="floatinglabel input-icon-both w-full">
        <Lock size={20} className="icon-left text-primary-500" style={{ left: '1rem' }} />
        <input type="password" id="password-float" className="floatinglabel-input lg w-full bg-white/10 border-white/20 focus:border-primary-400 transition-colors rounded-xl text-white placeholder:text-transparent" style={{ paddingLeft: '3.5rem', paddingRight: '3.5rem' }} placeholder=" " />
        <label htmlFor="password-float" className="floatinglabel-label text-white/70 font-medium" style={{ zIndex: 10 }}>Password</label>
        <button type="button" className="icon-right text-white/50 hover:text-white transition-colors" style={{ zIndex: 20, right: '1rem' }}>
          <Eye size={20} />
        </button>
      </div>
    </div>

    <button type="button" className="filled primary-600 w-full py-3 rounded-xl text-white font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mt-2 glow">
      Submit Data
    </button>
  </form>
</div>
  `.trim(),
  "dolphin-form-standard": `
<div className="card p-6 lg:p-10 border border-border rounded-2xl bg-surface-alt shadow-lg">
  <h3 className="text-2xl font-bold text-text mb-2">Welcome Back</h3>
  <p className="text-text-muted text-sm mb-8">Please enter your details to sign in.</p>
  <form className="flex-col-left w-full gap-8">
    <div className="w-full mt-2">
      <div className="standardlabel w-full">
        <input type="email" id="email-std" className="standardlabel-input lg w-full text-text placeholder:text-transparent bg-transparent" placeholder=" " />
        <label htmlFor="email-std" className="standardlabel-label text-text-muted font-medium bg-transparent! left-0! px-0!">Email Address</label>
      </div>
    </div>
    
    <div className="w-full">
      <div className="standardlabel w-full">
        <input type="password" id="password-std" className="standardlabel-input lg w-full text-text placeholder:text-transparent bg-transparent" placeholder=" " />
        <label htmlFor="password-std" className="standardlabel-label text-text-muted font-medium bg-transparent! left-0! px-0!">Password</label>
      </div>
    </div>
    
    <div className="flex-between w-full">
      <label className="radio-item flex-left gap-2 cursor-pointer">
        <input type="checkbox" className="accent-primary-500 w-4 h-4 rounded border-border" />
        <span className="text-sm font-medium text-text-muted">Remember me</span>
      </label>
      <a href="#" className="text-sm font-bold text-primary-500 hover:underline">Forgot password?</a>
    </div>

    <button type="button" className="filled primary-500 w-full py-3.5 rounded-xl text-white font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all mt-2 glow">
      Sign In
    </button>
  </form>
</div>
  `.trim(),
  "dolphin-table": `
<div className="glass card p-6 border border-white/20 rounded-2xl overflow-hidden" style={{ backdropFilter: 'blur(20px)' }}>
  <div className="flex-between mb-6">
    <h3 className="text-xl font-bold text-white m-0">Recent Transactions</h3>
    <button className="text-primary-300 text-sm font-medium hover:underline bg-transparent border-none cursor-pointer flex-center">
      View All <ChevronRight size={16} />
    </button>
  </div>
  
  <div className="w-full overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-white/10 text-white/60 text-sm uppercase tracking-wider">
          <th className="pb-3 font-medium">Customer</th>
          <th className="pb-3 font-medium">Date</th>
          <th className="pb-3 font-medium">Amount</th>
          <th className="pb-3 font-medium">Status</th>
        </tr>
      </thead>
      <tbody className="text-white">
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="py-4 flex-left gap-3">
            <div className="circle sm filled primary-500 text-white font-bold text-xs flex-center">JD</div>
            <span className="font-medium">John Doe</span>
          </td>
          <td className="py-4 text-white/70">Oct 24, 2025</td>
          <td className="py-4 font-bold">$120.50</td>
          <td className="py-4"><span className="px-2 py-1 rounded-md bg-success-500/20 text-success-300 text-xs font-bold">Completed</span></td>
        </tr>
        <tr className="hover:bg-white/5 transition-colors">
          <td className="py-4 flex-left gap-3">
            <div className="circle sm filled secondary-500 text-white font-bold text-xs flex-center">SS</div>
            <span className="font-medium">Sarah Smith</span>
          </td>
          <td className="py-4 text-white/70">Oct 23, 2025</td>
          <td className="py-4 font-bold">$340.00</td>
          <td className="py-4"><span className="px-2 py-1 rounded-md bg-warning-500/20 text-warning-300 text-xs font-bold">Pending</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `.trim(),
  "dolphin-toast": `
{/* Ultra Simple Toast */}
<div className="fixed bottom-6 right-6 z-[9999]">
  <div className="toast">
    <span className="text-2xl drop-shadow-md">✅</span>
    <div className="flex-1">
      <span className="font-bold block">Success!</span>
      <span className="opacity-70 text-sm">Action completed beautifully.</span>
    </div>
    <button className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer text-lg">✕</button>
  </div>
</div>
  `.trim(),
  "dolphin-modal": `
{/* Ultra Simple Native Modal */}
<dialog className="modal" open>
  <h3 className="text-2xl font-bold mb-3">Action Required</h3>
  <p className="opacity-80 mb-6 leading-relaxed">
    This modal uses the native HTML <code>&lt;dialog&gt;</code> element. 
    No wrapper divs, no complex positioning classes. Just pure CSS magic!
  </p>
  <div className="flex-right gap-3">
    <button className="outlined plain py-2 px-4 rounded-lg">Cancel</button>
    <button className="filled primary-500 text-white py-2 px-4 rounded-lg glow">Confirm Action</button>
  </div>
</dialog>
  `.trim(),
  "dolphin-button": `
<div className="flex-left gap-4 flex-wrap p-4 glass rounded-xl border border-white/10" style={{ backdropFilter: 'blur(10px)' }}>
  <button className="filled primary-500 text-white py-2 px-6 rounded-lg font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all glow">
    Primary Action
  </button>
  <button className="filled secondary-500 text-white py-2 px-6 rounded-lg font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all glow">
    Secondary
  </button>
  <button className="outlined plain py-2 px-6 rounded-lg font-bold border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all">
    Outlined
  </button>
  <button className="ghost py-2 px-6 rounded-lg font-bold hover:bg-white/10 transition-colors">
    Ghost Button
  </button>
</div>
  `.trim(),
  "dolphin-card": `
<div className="glass card p-6 border border-white/20 rounded-2xl max-w-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden" style={{ backdropFilter: 'blur(20px)' }}>
  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl"></div>
  <div className="flex-left gap-4 mb-4 relative z-10">
    <div className="w-16 h-16 rounded-full border-2 border-primary-400 overflow-hidden shadow-lg p-0.5">
      <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full rounded-full object-cover" />
    </div>
    <div>
      <h3 className="text-xl font-bold text-white m-0">Alex Developer</h3>
      <p className="text-primary-300 text-sm font-medium">Software Engineer</p>
    </div>
  </div>
  <p className="text-white/70 text-sm leading-relaxed mb-6 relative z-10">
    Passionate about building magical user experiences and world-class design systems using DolphinCSS.
  </p>
  <div className="flex-between relative z-10">
    <div className="flex gap-2">
      <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white/90">React</span>
      <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white/90">Tailwind</span>
    </div>
    <button className="circle filled primary-500 text-white p-2 hover:shadow-lg hover:scale-110 transition-all flex-center">
      <ChevronRight size={16} />
    </button>
  </div>
</div>
  `.trim(),
  "dolphin-navbar": `
<nav className="glass w-full py-4 px-6 md:px-8 border-b border-white/10 flex-between sticky top-0 z-50 shadow-sm" style={{ backdropFilter: 'blur(24px)' }}>
  <div className="flex-left gap-2 cursor-pointer">
    <div className="circle sm filled primary-500 text-white font-bold flex-center glow">🐬</div>
    <span className="text-xl font-bold text-white tracking-tight">Dolphin</span>
  </div>
  <div className="hidden md:flex gap-6">
    <a href="#" className="text-white/80 hover:text-white font-medium transition-colors">Home</a>
    <a href="#" className="text-white/80 hover:text-white font-medium transition-colors">Features</a>
    <a href="#" className="text-white/80 hover:text-white font-medium transition-colors">Pricing</a>
    <a href="#" className="text-white/80 hover:text-white font-medium transition-colors">Docs</a>
  </div>
  <div className="flex-right gap-3">
    <button className="hidden md:block outlined plain py-2 px-4 rounded-lg font-medium text-sm">Log In</button>
    <button className="filled primary-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:shadow-lg transition-all glow">Sign Up</button>
  </div>
</nav>
  `.trim(),
  "dolphin-alert": `
<div className="flex flex-col gap-3">
  <div className="w-full p-4 rounded-xl border border-info-500/30 bg-info-500/10 flex-left gap-3 text-info-100">
    <Activity size={20} className="text-info-400 shrink-0" />
    <div>
      <h4 className="font-bold text-info-300 text-sm">System Update</h4>
      <p className="text-xs opacity-80 mt-1">A new version of DolphinCSS is available with magical features.</p>
    </div>
  </div>
  <div className="w-full p-4 rounded-xl border border-warning-500/30 bg-warning-500/10 flex-left gap-3 text-warning-100">
    <Bell size={20} className="text-warning-400 shrink-0" />
    <div>
      <h4 className="font-bold text-warning-300 text-sm">Action Needed</h4>
      <p className="text-xs opacity-80 mt-1">Please verify your email address to continue using all features.</p>
    </div>
  </div>
</div>
  `.trim(),
  "dolphin-badge": `
<div className="flex gap-3 flex-wrap">
  <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs font-bold border border-primary-500/30">Primary</span>
  <span className="px-3 py-1 rounded-full bg-success-500/20 text-success-300 text-xs font-bold border border-success-500/30 flex-left gap-1">
    <span className="w-1.5 h-1.5 rounded-full bg-success-400"></span> Active
  </span>
  <span className="px-3 py-1 rounded-full bg-warning-500/20 text-warning-300 text-xs font-bold border border-warning-500/30">Pending</span>
  <span className="px-3 py-1 rounded-full bg-danger-500/20 text-danger-300 text-xs font-bold border border-danger-500/30">Failed</span>
  <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold border border-white/20">Neutral</span>
</div>
  `.trim(),
  "dolphin-header": `
<nav className="glass w-full py-4 px-6 md:px-8 border-b border-border flex-between sticky top-0 z-50 shadow-sm" style={{ backdropFilter: 'blur(24px)' }}>
  <div className="flex-left gap-2 cursor-pointer">
    <div className="circle sm filled primary-500 text-white font-bold flex-center glow">🐬</div>
    <span className="text-xl font-bold text-text tracking-tight">Dolphin</span>
  </div>
  <div className="hidden md:flex gap-6">
    <a href="#" className="text-text-muted hover:text-primary-500 font-medium transition-colors">Home</a>
    <a href="#" className="text-text-muted hover:text-primary-500 font-medium transition-colors">Features</a>
    <a href="#" className="text-text-muted hover:text-primary-500 font-medium transition-colors">Pricing</a>
    <a href="#" className="text-text-muted hover:text-primary-500 font-medium transition-colors">Docs</a>
  </div>
  <div className="flex-right gap-3">
    <button className="hidden md:block outlined plain py-2 px-4 rounded-lg font-medium text-sm border-border text-text hover:bg-surface">Log In</button>
    <button className="filled primary-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:shadow-lg transition-all glow">Sign Up</button>
  </div>
</nav>
  `.trim(),
  "dolphin-footer": `
<footer className="w-full bg-surface-dark py-12 px-6 border-t border-border mt-auto">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    <div className="col-span-1 md:col-span-2">
      <div className="flex-left gap-2 mb-4">
        <div className="circle sm filled primary-500 text-white font-bold flex-center glow">🐬</div>
        <span className="text-2xl font-bold text-text-light tracking-tight">DolphinCSS</span>
      </div>
      <p className="text-text-muted max-w-sm mb-6 leading-relaxed">
        The next-generation UI library that combines the magic of auto-generation with breathtaking aesthetics.
      </p>
      <div className="flex-left gap-4">
        <button className="circle sm bg-white/5 hover:bg-primary-500 hover:text-white transition-all text-text-muted border border-border">𝕏</button>
        <button className="circle sm bg-white/5 hover:bg-primary-500 hover:text-white transition-all text-text-muted border border-border">in</button>
        <button className="circle sm bg-white/5 hover:bg-primary-500 hover:text-white transition-all text-text-muted border border-border">GH</button>
      </div>
    </div>
    
    <div>
      <h4 className="font-bold text-lg mb-4 text-text-light">Resources</h4>
      <ul className="flex-col-left gap-3 text-text-muted">
        <li><a href="#" className="hover:text-primary-500 transition-colors">Documentation</a></li>
        <li><a href="#" className="hover:text-primary-500 transition-colors">Components</a></li>
        <li><a href="#" className="hover:text-primary-500 transition-colors">Themes</a></li>
        <li><a href="#" className="hover:text-primary-500 transition-colors">Showcase</a></li>
      </ul>
    </div>
    
    <div>
      <h4 className="font-bold text-lg mb-4 text-text-light">Legal</h4>
      <ul className="flex-col-left gap-3 text-text-muted">
        <li><a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a></li>
        <li><a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a></li>
        <li><a href="#" className="hover:text-primary-500 transition-colors">License</a></li>
      </ul>
    </div>
  </div>
  
  <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border/20 flex-between flex-wrap gap-4 text-sm text-text-muted">
    <p>© 2026 DolphinCSS. All rights reserved.</p>
    <p className="flex-center gap-1">Made with <span className="text-danger-500 animate-pulse">❤️</span> in Nepal</p>
  </div>
</footer>
  `.trim(),
  "dolphin-grid": `
<div className="w-full">
  <div className="flex-between mb-8">
    <div>
      <h2 className="text-2xl font-bold text-text mb-1">Featured Collections</h2>
      <p className="text-text-muted text-sm">Discover our magical products and items.</p>
    </div>
    <button className="outlined plain text-sm py-2 px-4 rounded-lg flex-center gap-2 border-border text-text hover:bg-surface transition-colors cursor-pointer">
      View All <ChevronRight size={16} />
    </button>
  </div>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Product Card 1 */}
    <div className="card glass p-4 rounded-2xl group hover:-translate-y-1 transition-all duration-300">
      <div className="w-full aspect-[4/3] bg-surface-dark rounded-xl mb-4 overflow-hidden relative">
        <div className="absolute top-2 right-2 badge primary sm z-10 shadow-lg">New</div>
        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" alt="Product" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <h3 className="font-bold text-text mb-1">Premium Headphones</h3>
      <p className="text-text-muted text-sm mb-4 line-clamp-2">High fidelity audio with magical active noise cancellation.</p>
      <div className="flex-between">
        <span className="text-lg font-bold text-primary-500">$299.00</span>
        <button className="circle sm filled primary-500 text-white glow cursor-pointer hover:scale-110 transition-transform"><ShoppingCart size={16} /></button>
      </div>
    </div>
    
    {/* Product Card 2 */}
    <div className="card glass p-4 rounded-2xl group hover:-translate-y-1 transition-all duration-300">
      <div className="w-full aspect-[4/3] bg-surface-dark rounded-xl mb-4 overflow-hidden relative">
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" alt="Product" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <h3 className="font-bold text-text mb-1">Smart Watch Pro</h3>
      <p className="text-text-muted text-sm mb-4 line-clamp-2">Track your fitness with the ultimate smart companion.</p>
      <div className="flex-between">
        <span className="text-lg font-bold text-primary-500">$199.00</span>
        <button className="circle sm filled primary-500 text-white glow cursor-pointer hover:scale-110 transition-transform"><ShoppingCart size={16} /></button>
      </div>
    </div>
    
    {/* Product Card 3 */}
    <div className="card glass p-4 rounded-2xl group hover:-translate-y-1 transition-all duration-300">
      <div className="w-full aspect-[4/3] bg-surface-dark rounded-xl mb-4 overflow-hidden relative">
        <div className="absolute top-2 right-2 badge danger sm z-10 shadow-lg">-20%</div>
        <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80" alt="Product" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <h3 className="font-bold text-text mb-1">Polaroid Camera</h3>
      <p className="text-text-muted text-sm mb-4 line-clamp-2">Capture your magical moments instantly with retro style.</p>
      <div className="flex-between">
        <span className="text-lg font-bold text-primary-500">$89.00</span>
        <button className="circle sm filled primary-500 text-white glow cursor-pointer hover:scale-110 transition-transform"><ShoppingCart size={16} /></button>
      </div>
    </div>
    
    {/* Product Card 4 */}
    <div className="card glass p-4 rounded-2xl group hover:-translate-y-1 transition-all duration-300">
      <div className="w-full aspect-[4/3] bg-surface-dark rounded-xl mb-4 overflow-hidden relative">
        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" alt="Product" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <h3 className="font-bold text-text mb-1">Neon Kicks</h3>
      <p className="text-text-muted text-sm mb-4 line-clamp-2">Step into the future with glowing soles and comfort.</p>
      <div className="flex-between">
        <span className="text-lg font-bold text-primary-500">$120.00</span>
        <button className="circle sm filled primary-500 text-white glow cursor-pointer hover:scale-110 transition-transform"><ShoppingCart size={16} /></button>
      </div>
    </div>
  </div>
</div>
  `.trim(),
  "dolphin-dashboard": `
<div className="w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl" style={{ minHeight: '680px' }}>
  <div className="flex h-full" style={{ minHeight: '680px' }}>

    {/* ── Collapsible Sidenav ── */}
    <aside id="dsh-sidebar" className="glass border-r border-white/10 flex flex-col transition-all duration-300" style={{ backdropFilter: 'blur(24px)', width: '240px', minHeight: '680px', flexShrink: 0 }}>

      {/* Brand + Toggle */}
      <div className="flex-between p-4 border-b border-white/10">
        <div id="dsh-brand" className="flex-left gap-2">
          <div className="circle sm filled primary-500 text-white font-bold flex-center glow" style={{ fontSize: '14px' }}>🐬</div>
          <span className="text-white font-bold text-sm tracking-tight">DolphinApp</span>
        </div>
        <button
          onClick={() => {
            const sb   = document.getElementById('dsh-sidebar');
            const brand = document.getElementById('dsh-brand');
            const labels = document.querySelectorAll('.dsh-label');
            const user  = document.getElementById('dsh-user-info');
            const isOpen = sb.style.width === '240px';
            sb.style.width = isOpen ? '60px' : '240px';
            brand.style.display = isOpen ? 'none' : 'flex';
            user.style.display  = isOpen ? 'none' : 'block';
            labels.forEach(l => { l.style.display = isOpen ? 'none' : 'block'; });
          }}
          className="text-white/60 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
          style={{ border: 'none', background: 'transparent', flexShrink: 0 }}
        >
          <Menu size={16} />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {[
          { icon: LayoutDashboard, label: 'Dashboard', active: true },
          { icon: BarChart2,       label: 'Analytics',  active: false },
          { icon: ShoppingCart,    label: 'Orders',     active: false },
          { icon: Users,           label: 'Users',      active: false },
          { icon: Bell,            label: 'Notifications', active: false },
          { icon: Settings,        label: 'Settings',   active: false },
        ].map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            onClick={e => {
              document.querySelectorAll('.dsh-nav-btn').forEach(b => {
                b.style.background = 'transparent';
                b.style.border = 'none';
                b.style.color = 'rgba(255,255,255,0.6)';
              });
              e.currentTarget.style.background = 'rgba(var(--color-primary-rgb, 99,102,241),0.2)';
              e.currentTarget.style.border = '1px solid rgba(var(--color-primary-rgb, 99,102,241),0.3)';
              e.currentTarget.style.color = 'white';
            }}
            className="dsh-nav-btn flex-left gap-3 p-2.5 rounded-xl transition-all w-full text-left cursor-pointer"
            style={{
              background: active ? 'rgba(99,102,241,0.2)' : 'transparent',
              border: active ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
              color: active ? 'white' : 'rgba(255,255,255,0.6)',
            }}
          >
            <Icon size={18} style={{ flexShrink: 0 }} />
            <span className="dsh-label text-sm font-medium">{label}</span>
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-white/10">
        <div className="flex-left gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
          <img src="https://i.pravatar.cc/150?img=5" alt="User" className="w-8 h-8 rounded-full border border-primary-400" style={{ flexShrink: 0 }} />
          <div id="dsh-user-info" className="min-w-0">
            <p className="text-white text-xs font-bold truncate">Alex Developer</p>
            <p className="text-white/50 text-xs">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>

    {/* ── Main Content ── */}
    <main className="flex-1 flex flex-col gap-5 overflow-y-auto p-6" style={{ background: 'rgba(0,0,0,0.18)', minWidth: 0 }}>

      {/* Topbar */}
      <div className="flex-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white">Good morning, Alex 👋</h2>
          <p className="text-white/50 text-sm">Thursday, 29 May 2026 · Here's your overview</p>
        </div>
        <div className="flex-right gap-2">
          <div className="flex-left gap-2 glass px-3 py-2 rounded-xl border border-white/10" style={{ cursor: 'text' }}>
            <Search size={14} className="text-white/40" />
            <span className="text-white/30 text-sm">Search anything...</span>
          </div>
          <button className="relative p-2 glass rounded-xl border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer" style={{ background: 'transparent' }}>
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger-500 animate-pulse"></span>
          </button>
          <img src="https://i.pravatar.cc/150?img=5" alt="u" className="w-9 h-9 rounded-full border-2 border-primary-400 cursor-pointer" />
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Revenue', value: '$48,295', change: '+12.5%', up: true,  icon: TrendingUp,  color: 'primary', prog: 72 },
          { label: 'Active Users',  value: '3,842',   change: '+8.1%',  up: true,  icon: Users,       color: 'success', prog: 58 },
          { label: 'New Orders',    value: '1,274',   change: '-3.2%',  up: false, icon: ShoppingCart,color: 'warning', prog: 41 },
          { label: 'Satisfaction',  value: '94.6%',   change: '+2.1%',  up: true,  icon: Activity,    color: 'info',    prog: 94 },
        ].map(({ label, value, change, up, icon: Icon, color, prog }) => (
          <div key={label} className="glass p-4 rounded-2xl border border-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all" style={{ cursor: 'default' }}>
            <div className="flex-between mb-2">
              <span className="text-white/50 text-xs font-medium">{label}</span>
              <div className="p-1.5 rounded-lg" style={{ background: \`rgba(var(--color-\${color}-rgb,99,102,241),0.2)\` }}>
                <Icon size={13} className={\`text-\${color}-400\`} />
              </div>
            </div>
            <p className="text-white text-xl font-bold mb-1">{value}</p>
            <div className="flex-between mb-2">
              <span className={\`text-xs font-semibold \${up ? 'text-success-400' : 'text-danger-400'}\`}>{up ? '↑' : '↓'} {change}</span>
              <span className="text-white/30 text-xs">vs last mo.</span>
            </div>
            {/* Mini Progress Bar */}
            <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
              <div className={\`h-full rounded-full bg-\${color}-500\`} style={{ width: \`\${prog}%\`, transition: 'width 1s ease' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Activity Row */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 280px' }}>

        {/* Revenue Chart */}
        <div className="glass p-5 rounded-2xl border border-white/10">
          <div className="flex-between mb-4">
            <div>
              <h4 className="text-white font-bold text-sm">Revenue Overview</h4>
              <p className="text-white/40 text-xs">Jan – Dec 2026</p>
            </div>
            {/* Chart Toggle */}
            <div className="flex gap-1 glass p-1 rounded-lg border border-white/10">
              <button
                id="dsh-btn-area"
                onClick={() => {
                  document.getElementById('dsh-chart-area').style.display = 'block';
                  document.getElementById('dsh-chart-bar').style.display  = 'none';
                  document.getElementById('dsh-btn-area').style.background = 'rgba(99,102,241,0.4)';
                  document.getElementById('dsh-btn-area').style.color = 'white';
                  document.getElementById('dsh-btn-bar').style.background  = 'transparent';
                  document.getElementById('dsh-btn-bar').style.color = 'rgba(255,255,255,0.5)';
                }}
                className="text-xs px-3 py-1 rounded-md font-medium cursor-pointer transition-all"
                style={{ background: 'rgba(99,102,241,0.4)', color: 'white', border: 'none' }}
              >Area</button>
              <button
                id="dsh-btn-bar"
                onClick={() => {
                  document.getElementById('dsh-chart-area').style.display = 'none';
                  document.getElementById('dsh-chart-bar').style.display  = 'flex';
                  document.getElementById('dsh-btn-bar').style.background = 'rgba(99,102,241,0.4)';
                  document.getElementById('dsh-btn-bar').style.color = 'white';
                  document.getElementById('dsh-btn-area').style.background  = 'transparent';
                  document.getElementById('dsh-btn-area').style.color = 'rgba(255,255,255,0.5)';
                }}
                className="text-xs px-3 py-1 rounded-md font-medium cursor-pointer transition-all"
                style={{ background: 'transparent', color: 'rgba(255,255,255,0.5)', border: 'none' }}
              >Bar</button>
            </div>
          </div>

          {/* SVG Area Chart */}
          <div id="dsh-chart-area" style={{ display: 'block' }}>
            <svg viewBox="0 0 460 130" className="w-full" style={{ height: '130px', overflow: 'visible' }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="rgba(99,102,241,0.5)" />
                  <stop offset="100%" stopColor="rgba(99,102,241,0)" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[0,32,65,97,130].map(y => (
                <line key={y} x1="0" y1={y} x2="460" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}
              {/* Area fill */}
              <path d="M0,98 L38,82 L77,90 L115,60 L154,72 L192,42 L231,55 L269,28 L308,40 L346,15 L385,25 L423,8 L460,5 L460,130 L0,130 Z" fill="url(#areaGrad)" />
              {/* Line */}
              <polyline points="0,98 38,82 77,90 115,60 154,72 192,42 231,55 269,28 308,40 346,15 385,25 423,8 460,5" fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Dots */}
              {[[0,98],[38,82],[77,90],[115,60],[154,72],[192,42],[231,55],[269,28],[308,40],[346,15],[385,25],[423,8],[460,5]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="3.5" fill="#818cf8" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
              ))}
            </svg>
            {/* X-axis labels */}
            <div className="flex justify-between mt-1">
              {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                <span key={m} className="text-white/30 text-xs">{m}</span>
              ))}
            </div>
          </div>

          {/* CSS Bar Chart */}
          <div id="dsh-chart-bar" style={{ display: 'none' }} className="items-end gap-2 h-32">
            {[
              { m:'Jan', v:38 },{ m:'Feb', v:55 },{ m:'Mar', v:42 },{ m:'Apr', v:68 },
              { m:'May', v:52 },{ m:'Jun', v:80 },{ m:'Jul', v:65 },{ m:'Aug', v:90 },
              { m:'Sep', v:72 },{ m:'Oct', v:95 },{ m:'Nov', v:78 },{ m:'Dec', v:100 },
            ].map(({ m, v }, i) => (
              <div key={m} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg transition-all duration-700 hover:opacity-80 cursor-pointer"
                  style={{
                    height: \`\${v}%\`,
                    background: i === 11 ? 'linear-gradient(to top, #6366f1, #818cf8)' : 'rgba(255,255,255,0.15)',
                    boxShadow: i === 11 ? '0 0 12px rgba(99,102,241,0.6)' : 'none',
                  }}
                ></div>
                <span className="text-white/30 text-xs">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass p-5 rounded-2xl border border-white/10 flex flex-col gap-3">
          <div className="flex-between">
            <h4 className="text-white font-bold text-sm">Live Activity</h4>
            <span className="flex-left gap-1 text-xs text-success-400">
              <span className="w-1.5 h-1.5 rounded-full bg-success-400 animate-pulse inline-block"></span>
              Live
            </span>
          </div>
          {[
            { u:'JD', n:'John Doe',   a:'placed an order',   t:'2m',  c:'primary' },
            { u:'SS', n:'Sarah Smith', a:'registered',         t:'8m',  c:'success' },
            { u:'MK', n:'Mike King',   a:'cancelled order',   t:'22m', c:'danger'  },
            { u:'AL', n:'Amy Lee',     a:'upgraded to Pro',   t:'1h',  c:'info'    },
            { u:'RJ', n:'Raj Joshi',   a:'left a ⭐ review',  t:'2h',  c:'warning' },
            { u:'NK', n:'Nina K.',     a:'submitted ticket',  t:'3h',  c:'secondary'},
          ].map(({ u, n, a, t, c }) => (
            <div key={u+t} className="flex-left gap-3 py-1 border-b border-white/5 last:border-0">
              <div className={\`circle sm filled \${c}-500 text-white font-bold text-xs flex-center\`} style={{ width:30, height:30, flexShrink:0 }}>{u}</div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">{n}</p>
                <p className="text-white/40 text-xs truncate">{a}</p>
              </div>
              <span className="text-white/25 text-xs">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass p-5 rounded-2xl border border-white/10">
        <div className="flex-between mb-4">
          <h4 className="text-white font-bold text-sm">Recent Orders</h4>
          <div className="flex-right gap-2">
            <span className="px-2 py-1 rounded-lg bg-primary-500/20 text-primary-300 text-xs font-bold border border-primary-500/20">4 new</span>
            <button className="text-primary-300 text-xs font-medium hover:underline flex-center gap-1 cursor-pointer" style={{ background:'none', border:'none' }}>
              View All <ChevronRight size={12} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {[
                { i:'JD', n:'John Doe',   p:'Pro Plan',   a:'$120.00', s:'Completed', sc:'success', d:'May 29' },
                { i:'SS', n:'Sarah Smith', p:'Team Plan',  a:'$340.00', s:'Pending',   sc:'warning', d:'May 28' },
                { i:'MK', n:'Mike King',   p:'Starter',   a:'$49.00',  s:'Failed',    sc:'danger',  d:'May 27' },
                { i:'AL', n:'Amy Lee',     p:'Enterprise', a:'$999.00', s:'Completed', sc:'success', d:'May 26' },
                { i:'RJ', n:'Raj Joshi',   p:'Pro Plan',  a:'$120.00', s:'Processing',sc:'info',    d:'May 25' },
              ].map(({ i, n, p, a, s, sc, d }) => (
                <tr key={n} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3">
                    <div className="flex-left gap-2">
                      <div className="circle sm filled primary-500 text-white font-bold text-xs flex-center" style={{ width:28, height:28 }}>{i}</div>
                      <span className="text-sm font-medium">{n}</span>
                    </div>
                  </td>
                  <td className="py-3 text-white/60 text-sm">{p}</td>
                  <td className="py-3 font-bold text-sm">{a}</td>
                  <td className="py-3">
                    <span className={\`px-2 py-0.5 rounded-md bg-\${sc}-500/20 text-\${sc}-300 text-xs font-bold\`}>{s}</span>
                  </td>
                  <td className="py-3 text-white/30 text-xs">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </main>
  </div>
</div>
  `.trim()
};
