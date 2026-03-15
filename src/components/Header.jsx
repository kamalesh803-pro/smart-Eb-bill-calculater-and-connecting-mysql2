import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header({ user, onLogout }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card-static px-6 py-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #818cf8)',
              boxShadow: '0 4px 24px rgba(99, 102, 241, 0.35)',
            }}
          >
            ⚡
          </div>
          <div className="absolute -inset-1 rounded-2xl opacity-40 blur-md"
            style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)' }}
          />
        </motion.div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold gradient-text tracking-tight">
            Smart Electricity Bill Calculator
          </h1>
          <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            TNEB Domestic Tariff • Real-time Estimation
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            {time.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
            {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* User info + logout */}
        {user && (
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
              }}
              title={user.name}
            >
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>@{user.id}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all border"
              style={{
                background: 'rgba(244, 63, 94, 0.08)',
                borderColor: 'rgba(244, 63, 94, 0.2)',
                color: '#fb7185',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(244, 63, 94, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(244, 63, 94, 0.08)';
              }}
              title="Log out"
            >
              Logout
            </motion.button>
          </div>
        )}
      </div>
    </motion.header>
  );
}
