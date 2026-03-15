import { motion } from 'framer-motion';
import { getCurrentSeason } from '../data/constants';

export default function SettingsPanel({ settings, setSettings }) {
  const season = getCurrentSeason();

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card-static p-6"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <span className="text-xl">⚙️</span>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Settings</h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
            Custom Rate (₹/unit)
          </label>
          <input
            type="number"
            min="0"
            step="0.25"
            value={settings.ratePerUnit}
            onChange={(e) => updateSetting('ratePerUnit', e.target.value)}
            placeholder="Use TNEB slabs (default)"
            className="premium-input"
          />
          <p className="text-[11px] mt-1.5" style={{ color: 'var(--text-muted)' }}>Set 0 to use TNEB slab rates</p>
        </div>

        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
            Monthly Limit (kWh)
          </label>
          <input
            type="number"
            min="0"
            step="50"
            value={settings.monthlyLimit}
            onChange={(e) => updateSetting('monthlyLimit', e.target.value)}
            placeholder="No limit set"
            className="premium-input"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
            Expected Usage Change (%)
          </label>
          <input
            type="number"
            min="-100"
            max="100"
            step="5"
            value={settings.usageChange}
            onChange={(e) => updateSetting('usageChange', e.target.value)}
            className="premium-input"
          />
          <p className="text-[11px] mt-1.5" style={{ color: 'var(--text-muted)' }}>
            {settings.usageChange > 0 ? `+${settings.usageChange}% increase` : settings.usageChange < 0 ? `${settings.usageChange}% decrease` : 'No change'} expected
          </p>
        </div>

        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
            Seasonal Multiplier
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="0.5"
              max="2"
              step="0.05"
              value={settings.seasonalMultiplier}
              onChange={(e) => updateSetting('seasonalMultiplier', e.target.value)}
              className="premium-input flex-1"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => updateSetting('seasonalMultiplier', season.multiplier)}
              className="px-4 py-3 rounded-xl text-xs font-semibold transition-all border"
              style={{
                background: 'rgba(245, 158, 11, 0.1)',
                borderColor: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
              }}
            >
              {season.icon} Auto
            </motion.button>
          </div>
          <p className="text-[11px] mt-1.5" style={{ color: 'var(--text-muted)' }}>
            Current: {season.icon} {season.name} (×{season.multiplier})
          </p>
        </div>
      </div>
    </motion.div>
  );
}
