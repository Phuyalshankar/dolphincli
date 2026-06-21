import React, { useState, useEffect } from 'react'
import { Eye, EyeOff, Mail, Lock, Chrome, Twitter } from 'lucide-react'

export default function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState('dolphin')
  const [mode, setMode] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dolphin'
    const savedMode = localStorage.getItem('mode') || 'light'
    setTheme(savedTheme)
    setMode(savedMode)
    document.documentElement.setAttribute('data-theme', savedTheme)
    document.documentElement.setAttribute('data-theme-mode', savedMode)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dolphin' ? 'danphe' : 'dolphin'
    console.log('Switching theme to:', newTheme)
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    console.log('Switching mode to:', newMode)
    setMode(newMode)
    document.documentElement.setAttribute('data-theme-mode', newMode)
    localStorage.setItem('mode', newMode)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    console.log('Form Data:', formData)

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert('Login successful!')
    }, 2000)
  }

  const handleInputChange = (field, value) => {
    console.log('Form data changed:', field, value)
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="bg-surface">
      <div className="container">
        <div className="fixed top-4 right-4 flex gap-2 z-50">
          <button onClick={toggleTheme} className="glass btn-sm glow" title={`Theme: ${theme === 'dolphin' ? '🌊 Dolphin' : '🇳🇵 Danphe'}`}>
            {theme === 'dolphin' ? '🌊' : '🇳🇵'}
          </button>
          <button onClick={toggleMode} className="glass btn-sm glow" title={`Mode: ${mode === 'light' ? '☀️ Light' : '🌙 Dark'}`}>
            {mode === 'light' ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="flex items-center justify-center p-4 sm:p-8 min-h-screen w-full">
          <div className="glass card glow pulse w-full max-w-md mx-auto">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col items-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="circle md glass filled primary glow text-xl">
                    {theme === 'dolphin' ? '🐬' : '🇳🇵'}
                  </div>
                  <h1 className="text-2xl font-bold m-0 text-primary">
                    DolphinCSS
                  </h1>
                </div>
                <p className="text-muted m-0 text-center">Sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="floatinglabel input-icon-left">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary z-10 cursor-pointer" />
                  <input
                    type="email"
                    id="email"
                    className="floatinglabel-input lg"
                    style={{ paddingLeft: '3rem' }}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="email" className="floatinglabel-label">Email Address</label>
                </div>
                {errors.email && <p className="bg-danger color-text-light text-sm m-1 m-0">{errors.email}</p>}

                <div className="floatinglabel input-icon-both">
                  <Lock size={18} className="icon-left text-primary cursor-pointer" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="floatinglabel-input lg"
                    style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="password" className="floatinglabel-label" style={{ zIndex: 90 }}>Password</label>
                  <button type="button" className="icon-right hover:text-primary transition-colors" style={{ zIndex: 110 }} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="bg-danger color-text-light text-sm m-1">{errors.password}</p>}

                <div className="flex-between">
                  <label className="radio-item">
                    <input type="checkbox" checked={formData.rememberMe} onChange={(e) => handleInputChange('rememberMe', e.target.checked)} />
                    <span className="radio-label">Remember me</span>
                  </label>
                  <button type="button" className="text-primary hover:underline font-medium text-sm" style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    Forgot password?
                  </button>
                </div>

                <button type="submit" disabled={isLoading} className={`filled primary btn-md glow w-full ${isLoading ? 'loading' : ''}`}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <div className="flex-center my-4">
                <div className="flex-1" style={{ height: '1px', backgroundColor: 'var(--color-border)' }}></div>
                <span className="p-3 color-text-muted text-sm">or</span>
                <div className="flex-1" style={{ height: '1px', backgroundColor: 'var(--color-border)' }}></div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="glass outlined primary btn-md w-full">
                  <Chrome size={18} className="mr-2" />
                  Continue with Google
                </button>
                <button className="glass outlined primary btn-md w-full">
                  <Twitter size={18} className="mr-2" />
                  Continue with Twitter
                </button>
              </div>

              <p className="mobile-text-center mt-4 mb-0 color-text-muted">
                Don't have an account?{' '}
                <button className="text-primary hover:underline font-bold" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed absolute-top-left absolute-bottom-right overflow-hidden pointer-events-none" style={{ zIndex: -10 }}>
        <div className="absolute absolute-top-right w-80 h-80 rounded-full blur-3xl animate-pulse bg-primary" style={{
          opacity: 0.2,
          top: '-10rem',
          right: '-10rem'
        }}></div>
        <div className="absolute absolute-bottom-left w-80 h-80 rounded-full blur-3xl animate-pulse bg-accent" style={{
          opacity: 0.2,
          bottom: '-10rem',
          left: '-10rem',
          animationDelay: '1s'
        }}></div>
      </div>
    </div>
  )
}
