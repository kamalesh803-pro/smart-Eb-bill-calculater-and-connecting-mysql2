import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/calculations';
import { getCurrentSeason } from '../data/constants';

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function SummaryDashboard({ consumption, bill, limit }) {
  const season = getCurrentSeason();
  const limitPercent = limit > 0 ? Math.min((consumption.monthly / limit) * 100, 100) : 0;
  const isOverLimit = limit > 0 && consumption.monthly > limit;

  const cards = [
    {
      title: 'Monthly Consumption',
      value: `${consumption.monthly.toFixed(1)}`,
      unit: 'kWh',
      icon: '⚡',
      gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
      glow: 'rgba(99, 102, 241, 0.2)',
      sub: `${consumption.daily.toFixed(1)} kWh/day`,
    },
    {
      title: 'Estimated EB Bill',
      value: formatCurrency(bill),
      unit: '',
      icon: '💰',
      gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
      glow: 'rgba(245, 158, 11, 0.2)',
      sub: bill === 0 && consumption.monthly <= 100 ? 'Free tier!' : 'TNEB tariff',
    },
    {
      title: 'Season',
      value: season.name,
      unit: `×${season.multiplier}`,
      icon: season.icon,
      gradient: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
      glow: 'rgba(14, 165, 233, 0.2)',
      sub: `Multiplier: ${season.multiplier}`,
    },
    {
      title: 'Limit Status',
      value: limit > 0 ? `${limitPercent.toFixed(0)}%` : 'N/A',
      unit: limit > 0 ? `of ${limit}` : '',
      icon: isOverLimit ? '🚫' : '📊',
      gradient: isOverLimit
        ? 'linear-gradient(135deg, #f43f5e, #fb7185)'
        : 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
      glow: isOverLimit ? 'rgba(244, 63, 94, 0.2)' : 'rgba(139, 92, 246, 0.2)',
      sub: limit > 0 ? `Limit: ${limit} kWh` : 'Set in settings',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, scale: 1.02 }}
          className="glass-card p-5 group cursor-default"
          style={{ '--card-glow': card.glow }}
        >
          <div className="flex items-start justify-between mb-3">
            <motion.div
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                boxShadow: `0 0 20px ${card.glow}`,
              }}
            >
              {card.icon}
            </motion.div>
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: card.gradient }}
            />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
            {card.title}
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{card.value}</span>
            {card.unit && (
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{card.unit}</span>
            )}
          </div>
          <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>{card.sub}</p>

          {card.title === 'Limit Status' && limit > 0 && (
            <div className="mt-3">
              <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(limitPercent, 100)}%` }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{ background: card.gradient }}
                />
              </div>
            </div>
          )}

          {/* Hover glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(200px at 50% 50%, ${card.glow}, transparent 70%)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
