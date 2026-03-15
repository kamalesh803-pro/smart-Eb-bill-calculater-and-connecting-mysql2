import { motion } from 'framer-motion';
import { TNEB_SLABS } from '../data/constants';

export default function TariffTable({ currentUnits }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card-static p-6"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <span className="text-xl">📋</span>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>TNEB Domestic Tariff Slabs</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <th className="text-left py-3 px-4 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                Slab Range
              </th>
              <th className="text-right py-3 px-4 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                Rate
              </th>
              <th className="text-right py-3 px-4 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {TNEB_SLABS.map((slab, i) => {
              const isActive = currentUnits >= slab.from && (currentUnits <= slab.to || slab.to === Infinity);
              const isPassed = currentUnits > slab.to;
              return (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.04 }}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: isActive ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                    borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent',
                  }}
                >
                  <td className="py-3.5 px-4">
                    <span className={`font-medium text-sm ${isActive ? 'text-electric-light' : ''}`} style={!isActive ? { color: 'var(--text-primary)' } : {}}>
                      {slab.label}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {slab.rate === 0 ? (
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(99, 102, 241,0.12)', color: '#818cf8' }}
                      >
                        Free
                      </span>
                    ) : (
                      <span className="font-semibold text-sm" style={{ color: isActive ? '#818cf8' : 'var(--text-secondary)' }}>
                        {slab.rateLabel}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {isActive && (
                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#6366f1' }} />
                        Current
                      </span>
                    )}
                    {isPassed && (
                      <span className="text-xs font-medium" style={{ color: '#818cf8' }}>✓ Used</span>
                    )}
                    {!isActive && !isPassed && (
                      <span style={{ color: 'var(--text-muted)' }}>—</span>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {currentUnits > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 px-4 py-3 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Your consumption of <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{currentUnits.toFixed(1)} kWh</span> falls in the{' '}
            <span className="font-bold" style={{ color: '#818cf8' }}>
              {TNEB_SLABS.find(s => currentUnits >= s.from && (currentUnits <= s.to || s.to === Infinity))?.label}
            </span>{' '}
            slab.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
