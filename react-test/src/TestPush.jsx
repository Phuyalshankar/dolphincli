import React from 'react'

export default function TestPush() {
  return (
    <div 
      className="dolphin-pushed--test-card--glass" 
      data-version="1.0.3" 
      data-category="cards" 
      data-tags="test,card,glass" 
      data-description="Auto pushed glass card test component"
    >
      <div className="card glass p-6 max-w-sm mx-auto my-10 border border-white/20 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Pushed Glass Card</h2>
        <p className="text-sm text-slate-300 mb-4">This component was pushed automatically via class marker!</p>
        <button className="filled primary btn-md glow">Click Me</button>
      </div>
    </div>
  )
}
