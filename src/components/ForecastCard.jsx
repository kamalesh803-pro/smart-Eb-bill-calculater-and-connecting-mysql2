import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/calculations';

export default function ForecastCard({ currentUnits, currentBill, forecastUnits, forecastBill, settings }) {
  const unitDiff = forecastUnits - currentUnits;
  const billDiff = forecastBill - currentBill;
  const isIncrease = unitDiff > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card-static p-6"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <span className="text-xl">🔮</span>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Next Month Forecast</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl p-4 border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>This Month</p>
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Units</span>
              <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{currentUnits.toFixed(1)} kWh</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Bill</span>
              <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{formatCurrency(currentBill)}</span>
            </div>
          </div>
        </div>

        <div
          className="rounded-xl p-4 border"
          style={{
            background: isIncrease ? 'rgba(244, 63, 94, 0.06)' : 'rgba(99, 102, 241, 0.06)',
            borderColor: isIncrease ? 'rgba(244, 63, 94, 0.15)' : 'rgba(99, 102, 241, 0.15)',
          }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Next Month (est.)</p>
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Units</span>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{forecastUnits.toFixed(1)} kWh</span>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                  style={{
                    background: isIncrease ? 'rgba(244,63,94,0.15)' : 'rgba(99, 102, 241,0.15)',
                    color: isIncrease ? '#fb7185' : '#818cf8',
                  }}
                >
                  {isIncrease ? '↑' : '↓'}{Math.abs(unitDiff).toFixed(1)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Bill</span>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{formatCurrency(forecastBill)}</span>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                  style={{
                    background: billDiff > 0 ? 'rgba(244,63,94,0.15)' : 'rgba(99, 102, 241,0.15)',
                    color: billDiff > 0 ? '#fb7185' : '#818cf8',
                  }}
                >
                  {billDiff > 0 ? '↑' : '↓'}{formatCurrency(Math.abs(billDiff))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
          📈 Usage: {settings.usageChange > 0 ? '+' : ''}{settings.usageChange}%
        </span>
        <span className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
          🌡️ Seasonal: ×{settings.seasonalMultiplier}
        </span>
      </div>
    </motion.div>
  );
}
