import React, { useEffect } from 'react';

function App() {


  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="flex center min-h-screen p-4">

        <div className="card p-8 crystal-glass">


          <div className="center space-y-6 pb-8">

            <div className="circle primary filled lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>


            <div className="text-center">
              <h1 className="text-2xl font-bold color-text mb-2">Welcome back</h1>
              <p className="text-sm color-text-muted">
                Enter your credentials to access your account
              </p>
            </div>
          </div>


          <form className="space-y-6">


            <div className="space-y-3">
              <label htmlFor="email" className="text-sm font-medium color-text block">
                Email address
              </label>
              <div className="floatinglabel input-icon-left">
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  className="floatinglabel-input"
                  placeholder=" "
                  required
                />
                <label htmlFor="email" className="floatinglabel-label">you@example.com</label>
              </div>
            </div>


            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium color-text block">
                  Password
                </label>
                <a href="#" className="text-sm color-primary hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="floatinglabel input-icon-left">
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type="password"
                  id="password"
                  className="floatinglabel-input"
                  placeholder=" "
                  required
                />
                <label htmlFor="password" className="floatinglabel-label">Password</label>
              </div>
            </div>


            <div className="flex items-center">
              <input type="checkbox" id="remember" className="primary" />
              <label htmlFor="remember" className="ml-2 block text-sm color-text">
                Keep me signed in
              </label>
            </div>


            <button
              type="submit"
              className="filled primary w-full lg hover:opacity-90 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign in
            </button>


            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-border)]"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-surface text-sm color-text-muted">
                  Or continue with
                </span>
              </div>
            </div>


            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="outlined rounded-lg py-3 hover:bg-surface-alt transition-all duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="outlined rounded-lg py-3 hover:bg-surface-alt transition-all duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>

          </form>


          <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
            <p className="text-sm color-text-muted">
              Don't have an account?
              <a href="#" className="color-primary font-medium hover:underline ml-1">
                Sign up
              </a>
            </p>
            <p className="text-xs color-text-muted mt-3">
              By continuing, you agree to our
              <a href="#" className="color-primary hover:underline">Terms</a>
              and
              <a href="#" className="color-primary hover:underline">Privacy Policy</a>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
