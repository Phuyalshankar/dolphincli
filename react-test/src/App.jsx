import React, { useState, useEffect } from 'react'
import { Eye, EyeOff, Mail, Lock, Globe, X } from 'lucide-react'

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
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    document.documentElement.setAttribute('data-theme-mode', newMode)
    localStorage.setItem('mode', newMode)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email चाहिन्छ'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'कृपया मान्य ईमेल ठेगाना राख्नुहोस्'
    if (!formData.password) newErrors.password = 'पासवर्ड चाहिन्छ'
    else if (formData.password.length < 6) newErrors.password = 'पासवर्ड कम्तीमा ६ क्यारेक्टर हुनुपर्छ'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert('सफलतापूर्वक लगइन भयो!')
    }, 2000)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen w-full bg-surface relative">
      {/* Theme Toggle Buttons */}
      <div className="fixed top-4 right-4 flex gap-2 z-[100]">
        <button
          onClick={toggleTheme}
          className="circle sm glass outlined primary glow"
          title={theme === 'dolphin' ? 'Switch to Danphe' : 'Switch to Dolphin'}
        >
          {theme === 'dolphin' ? '🐬' : '🇳🇵'}
        </button>
        <button
          onClick={toggleMode}
          className="circle sm glass outlined primary glow"
          title={mode === 'light' ? 'Dark Mode' : 'Light Mode'}
        >
          {mode === 'light' ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen w-full p-4 sm:p-6 md:p-8">
        <div className="card glass glow pulse w-full max-w-md mx-auto relative z-10">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="circle md glass filled primary glow text-2xl mb-3">
                {theme === 'dolphin' ? '🐬' : '🇳🇵'}
              </div>

              <h1
                className="text-3xl font-bold text-center mb-2"
                style={{ color: 'var(--color-primary)' }}
              >
                DolphinCSS
              </h1>

              <p
                className="text-sm text-center"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {theme === 'dolphin'
                  ? '🌊 Smooth like an ocean'
                  : '🏔️ Strong like the Himalayas'}
              </p>
              <p
                className="text-sm text-center mt-1"
                style={{ color: 'var(--color-text-muted)' }}
              >
                आफ्नो खातामा साइन इन गर्नुहोस्
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email Field */}
              <div>
                <div className="input-icon-left">
                  <Mail size={18} />
                  <input
                    type="email"
                    id="email"
                    className="w-full floatinglabel-input"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder=" "
                  />
                  <label htmlFor="email" className="floatinglabel-label" style={{ left: '3rem' }}>
                    ईमेल ठेगाना
                  </label>
                </div>
                {errors.email && <span className="text-sm color-danger mt-1 block">{errors.email}</span>}
              </div>

              {/* Password Field */}
              <div>
                <div className="input-icon-both">
                  <Lock size={18} className="icon-left" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="w-full floatinglabel-input"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder=" "
                  />
                  <label htmlFor="password" className="floatinglabel-label" style={{ left: '3rem' }}>
                    पासवर्ड
                  </label>
                  <button
                    type="button"
                    className="icon-right"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="text-sm color-danger mt-1 block">{errors.password}</span>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between items-center" style={{ marginTop: '1rem' }}>
                <label className='flex gap-2'>
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                    style={{ appearance: 'checkbox' }}
                  />
                  मलाई सम्झनुहोस्
                </label>
                <button
                  type="button"
                  className="text-sm hover:underline bg-transparent border-none cursor-pointer"
                  style={{ color: 'var(--color-primary)' }}
                >
                  पासवर्ड बिर्सनुभयो?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`filled primary btn-md w-full${isLoading ? ' loading' : ''}`}
              >
                {isLoading ? 'लगइन हुँदै...' : 'साइन इन गर्नुहोस्'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }}></div>
              <span className="px-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>वा</span>
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }}></div>
            </div>

            {/* Social Login */}
            <div className="flex flex-col gap-3">
              <button className="glass outlined primary btn-md w-full button-icon-left">
                <Globe size={18} />
                Google मार्फत जारी राख्नुहोस्
              </button>
              <button className="glass outlined primary btn-md w-full button-icon-left">
                <X size={18} />
                X मार्फत जारी राख्नुहोस्
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center mt-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              खाता छैन?{' '}
              <button
                className="font-bold bg-transparent border-none cursor-pointer hover:underline"
                style={{ color: 'var(--color-primary)' }}
              >
                साइन अप गर्नुहोस्
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -top-80 lg:-top-96 -left-80 lg:-left-96 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ backgroundColor: 'var(--color-primary)' }}
        />
        <div
          className="absolute -bottom-80 lg:-bottom-96 -right-80 lg:-right-96 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ backgroundColor: 'var(--color-secondary)', animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] rounded-full blur-3xl opacity-10 animate-pulse"
          style={{ backgroundColor: 'var(--color-accent)', animationDelay: '2s' }}
        />
      </div>
    </div>
  )
}
