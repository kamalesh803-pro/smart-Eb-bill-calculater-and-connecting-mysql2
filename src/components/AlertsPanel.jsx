import { motion, AnimatePresence } from 'framer-motion';

export default function AlertsPanel({ alerts }) {
  if (alerts.length === 0) return null;

  const typeStyles = {
    danger: { bg: 'rgba(244, 63, 94, 0.08)', border: 'rgba(244, 63, 94, 0.2)', dot: '#f43f5e', text: '#fda4af' },
    warning: { bg: 'rgba(245, 158, 11, 0.08)', border: 'rgba(245, 158, 11, 0.2)', dot: '#f59e0b', text: '#fcd34d' },
    success: { bg: 'rgba(99, 102, 241, 0.08)', border: 'rgba(99, 102, 241, 0.2)', dot: '#6366f1', text: '#6ee7b7' },
    info: { bg: 'rgba(99, 102, 241, 0.08)', border: 'rgba(99, 102, 241, 0.2)', dot: '#6366f1', text: '#93c5fd' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card-static p-6"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-xl">🔔</span>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Alerts</h2>
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #f43f5e, #fb7185)' }}
        >
          {alerts.length}
        </motion.span>
      </div>

      <AnimatePresence>
        <div className="space-y-2.5">
          {alerts.map((alert, i) => {
            const style = typeStyles[alert.type] || typeStyles.info;
            return (
              <motion.div
                key={`${alert.title}-${i}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl p-4 flex items-start gap-3 border"
                style={{ background: style.bg, borderColor: style.border }}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{alert.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: style.dot }} />
                    <h4 className="text-sm font-bold" style={{ color: style.text }}>{alert.title}</h4>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{alert.message}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>
    </motion.div>
  );
}
