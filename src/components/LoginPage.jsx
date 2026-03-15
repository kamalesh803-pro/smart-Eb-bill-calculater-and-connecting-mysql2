import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Backend server URL
const API_URL ="https://noble-perfection-production-e41a.up.railway.app";

export default function LoginPage({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!userId.trim() || !password.trim()) {
      setError('Please enter both User ID and Password');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userId.toLowerCase(), password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Login Successful');
        setTimeout(() => {
          onLogin({ id: data.user.id, name: data.user.name }, rememberMe);
        }, 800);
      } else {
        setError(data.error || 'Invalid Username or Password');
      }
    } catch (err) {
      setError('Failed to connect to the server. Is it running?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!userId.trim() || !password.trim() || !name.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (userId.trim().length < 3) {
      setError('User ID must be at least 3 characters');
      return;
    }

    if (password.trim().length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userId.toLowerCase(), password, name }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(data.message || 'Account created successfully! You can now log in.');
        setIsSignUp(false);
        setPassword('');
      } else {
        setError(data.error || 'Failed to create account.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Is it running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl text-4xl mb-5"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #818cf8)',
              boxShadow: '0 8px 40px rgba(99, 102, 241, 0.35)',
            }}
          >
            ⚡
          </motion.div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Smart EB Calculator
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            TNEB Domestic Tariff • Real-time Estimation
          </p>
        </div>

        {/* Card */}
        <div
          className="glass-card-static p-8"
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(99, 102, 241, 0.08)',
          }}
        >
          {/* Tab toggle */}
          <div
            className="flex rounded-xl p-1 mb-6"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <button
              onClick={() => { setIsSignUp(false); setError(''); }}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
              style={
                !isSignUp
                  ? {
                      background: 'linear-gradient(135deg, #6366f1, #4338ca)',
                      color: '#fff',
                      boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
                    }
                  : { color: 'var(--text-secondary)', background: 'transparent' }
              }
            >
              Log In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(''); setSuccess(''); }}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
              style={
                isSignUp
                  ? {
                      background: 'linear-gradient(135deg, #6366f1, #4338ca)',
                      color: '#fff',
                      boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
                    }
                  : { color: 'var(--text-secondary)', background: 'transparent' }
              }
            >
              Sign Up
            </button>
          </div>

          {/* Error / Success messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-4 p-3 rounded-xl text-sm font-medium border"
                style={{
                  background: 'rgba(244, 63, 94, 0.08)',
                  borderColor: 'rgba(244, 63, 94, 0.2)',
                  color: '#fda4af',
                }}
              >
                ⚠️ {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-4 p-3 rounded-xl text-sm font-medium border"
                style={{
                  background: 'rgba(99, 102, 241, 0.08)',
                  borderColor: 'rgba(99, 102, 241, 0.2)',
                  color: '#6ee7b7',
                }}
              >
                ✅ {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }}>👤</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="premium-input !pl-10"
                      autoComplete="name"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>
                User ID
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }}>🆔</span>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter your user ID"
                  className="premium-input !pl-10"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }}>🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="premium-input !pl-10"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                />
              </div>
            </div>

            {/* Remember Me checkbox - only show on Login */}
            {!isSignUp && (
              <div className="flex items-center gap-2.5 mt-1">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className="w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 shrink-0"
                  style={{
                    borderColor: rememberMe ? '#6366f1' : 'rgba(255,255,255,0.15)',
                    background: rememberMe
                      ? 'linear-gradient(135deg, #6366f1, #4338ca)'
                      : 'rgba(255,255,255,0.04)',
                    boxShadow: rememberMe ? '0 2px 8px rgba(99, 102, 241, 0.3)' : 'none',
                  }}
                >
                  {rememberMe && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-white text-xs"
                    >
                      ✓
                    </motion.span>
                  )}
                </button>
                <span
                  className="text-xs cursor-pointer select-none"
                  style={{ color: 'var(--text-secondary)' }}
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  Remember me — stay logged in
                </span>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isLoading}
              className="glow-btn w-full py-3.5 rounded-xl font-bold text-white text-sm mt-2 disabled:opacity-50"
            >
              {isLoading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Log In')}
            </motion.button>
          </form>

          <p className="text-center text-xs mt-5" style={{ color: 'var(--text-muted)' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccess(''); }}
              className="font-semibold transition-colors"
              style={{ color: '#4f46e5' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#818cf8'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#4f46e5'}
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Bottom note */}
        <p className="text-center text-[11px] mt-6" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
          Authentication powered by MySQL Backend
        </p>
      </motion.div>
    </div>
  );
}
