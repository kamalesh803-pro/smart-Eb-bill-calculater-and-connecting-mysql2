import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APPLIANCE_DEFAULTS } from '../data/constants';
import { calculateApplianceUnits, calculateTNEBBill, formatCurrency } from '../utils/calculations';

export default function ApplianceManager({ appliances, setAppliances }) {
  const [selectedAppliance, setSelectedAppliance] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [qty, setQty] = useState(1);
  const [hours, setHours] = useState(8);

  // Get available types for selected appliance
  const applianceData = APPLIANCE_DEFAULTS.find((a) => a.name === selectedAppliance);
  const availableTypes = applianceData?.types || [];

  // When appliance changes, auto-select first type
  const handleApplianceChange = (name) => {
    setSelectedAppliance(name);
    const data = APPLIANCE_DEFAULTS.find((a) => a.name === name);
    if (data && data.types.length > 0) {
      setSelectedType(data.types[0].type);
    } else {
      setSelectedType('');
    }
  };

  const addAppliance = () => {
    if (!selectedAppliance || !selectedType) return;
    const data = APPLIANCE_DEFAULTS.find((a) => a.name === selectedAppliance);
    const typeData = data?.types.find((t) => t.type === selectedType);
    if (!data || !typeData) return;

    const newAppliance = {
      id: Date.now(),
      name: data.name,
      type: typeData.type,
      watts: typeData.watts,
      icon: data.icon,
      quantity: qty,
      hours: hours,
    };

    setAppliances([...appliances, newAppliance]);
    setSelectedAppliance('');
    setSelectedType('');
    setQty(1);
    setHours(8);
  };

  const removeAppliance = (id) => {
    setAppliances(appliances.filter((a) => a.id !== id));
  };

  const updateAppliance = (id, field, value) => {
    setAppliances(
      appliances.map((a) =>
        a.id === id ? { ...a, [field]: parseFloat(value) || 0 } : a
      )
    );
  };

  // Totals
  const totals = useMemo(() => {
    let daily = 0, monthly = 0;
    appliances.forEach((a) => {
      const { dailyUnits, monthlyUnits } = calculateApplianceUnits(a.watts, a.hours, a.quantity);
      daily += dailyUnits;
      monthly += monthlyUnits;
    });
    return {
      daily: Math.round(daily * 100) / 100,
      monthly: Math.round(monthly * 100) / 100,
      bill: calculateTNEBBill(Math.round(monthly * 100) / 100),
    };
  }, [appliances]);

  return (
    <div className="space-y-6">
      {/* ── Add New Appliance Form ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card-static p-6"
      >
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #818cf8)',
              boxShadow: '0 4px 16px rgba(99, 102, 241, 0.25)',
              color: '#fff',
            }}
          >
            +
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Add New Appliance</h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Select appliances, their efficiency ratings, and usage patterns</p>
          </div>
        </div>

        {/* Form row */}
        <div className="mt-5 grid grid-cols-12 gap-3 items-end">
          {/* Appliance dropdown */}
          <div className="col-span-12 sm:col-span-4">
            <label className="block text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Appliance
            </label>
            <div className="relative">
              <select
                id="appliance-selector"
                value={selectedAppliance}
                onChange={(e) => handleApplianceChange(e.target.value)}
                className="premium-select pr-8"
              >
                <option value="">Select appliance</option>
                {APPLIANCE_DEFAULTS.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.icon} {a.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Type dropdown */}
          <div className="col-span-12 sm:col-span-3">
            <label className="block text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Type
            </label>
            <div className="relative">
              <select
                id="type-selector"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="premium-select pr-8"
                disabled={!selectedAppliance}
              >
                <option value="">Select type</option>
                {availableTypes.map((t) => (
                  <option key={t.type} value={t.type}>
                    {t.type} ({t.watts}W)
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Qty */}
          <div className="col-span-4 sm:col-span-2">
            <label className="block text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Qty
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value) || 1)}
              className="premium-input text-center"
            />
          </div>

          {/* Hours */}
          <div className="col-span-4 sm:col-span-2">
            <label className="block text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Hrs/Day
            </label>
            <input
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={hours}
              onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
              className="premium-input text-center"
            />
          </div>

          {/* Add button */}
          <div className="col-span-4 sm:col-span-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              onClick={addAppliance}
              disabled={!selectedAppliance || !selectedType}
              className="glow-btn w-full py-3 rounded-xl font-bold text-sm text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ── Your Appliances List ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card-static p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Your Appliances</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {appliances.length} appliance{appliances.length !== 1 ? 's' : ''} — Total: {totals.daily.toFixed(2)} kWh/day
            </p>
          </div>
          {appliances.length > 0 && (
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#4f46e5' }}
            >
              {appliances.length} Items
            </span>
          )}
        </div>

        {appliances.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-3 opacity-20">🔌</div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>No appliances added yet</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Select a house type above or add appliances manually
            </p>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div
              className="hidden sm:grid grid-cols-12 gap-2 px-4 py-2 rounded-lg mb-2 text-[10px] font-semibold uppercase tracking-widest"
              style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}
            >
              <div className="col-span-4">Appliance</div>
              <div className="col-span-2 text-center">Watts</div>
              <div className="col-span-1 text-center">Qty</div>
              <div className="col-span-2 text-center">Hrs/Day</div>
              <div className="col-span-2 text-center">kWh/Mo</div>
              <div className="col-span-1"></div>
            </div>

            {/* Appliance rows */}
            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
              <AnimatePresence>
                {appliances.map((appliance) => {
                  const { monthlyUnits } = calculateApplianceUnits(appliance.watts, appliance.hours, appliance.quantity);
                  return (
                    <motion.div
                      key={appliance.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="group grid grid-cols-12 gap-2 items-center px-4 py-3 rounded-xl border transition-all duration-300"
                      style={{
                        background: 'rgba(255, 255, 255, 0.025)',
                        borderColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.15)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.025)';
                      }}
                    >
                      {/* Appliance info */}
                      <div className="col-span-8 sm:col-span-4 flex items-center gap-3 min-w-0">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                          style={{ background: 'rgba(255,255,255,0.06)' }}
                        >
                          {appliance.icon}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                            {appliance.name}
                          </h4>
                          <p className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>
                            {appliance.type || '—'}
                          </p>
                        </div>
                      </div>

                      {/* Watts - EDITABLE */}
                      <div className="col-span-4 sm:col-span-2 flex justify-center">
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="1"
                            max="10000"
                            value={appliance.watts}
                            onChange={(e) => updateAppliance(appliance.id, 'watts', e.target.value)}
                            className="premium-input !w-16 !px-1.5 !py-1 text-center text-xs font-semibold"
                            title="Edit wattage"
                          />
                          <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>W</span>
                        </div>
                      </div>

                      {/* Qty - EDITABLE */}
                      <div className="hidden sm:flex col-span-1 justify-center">
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={appliance.quantity}
                          onChange={(e) => updateAppliance(appliance.id, 'quantity', e.target.value)}
                          className="premium-input !w-12 !px-1 !py-1 text-center text-xs font-semibold"
                        />
                      </div>

                      {/* Hours - EDITABLE */}
                      <div className="hidden sm:flex col-span-2 justify-center">
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            step="0.5"
                            value={appliance.hours}
                            onChange={(e) => updateAppliance(appliance.id, 'hours', e.target.value)}
                            className="premium-input !w-14 !px-1 !py-1 text-center text-xs font-semibold"
                          />
                          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>h</span>
                        </div>
                      </div>

                      {/* Monthly kWh */}
                      <div className="hidden sm:flex col-span-2 justify-center">
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-lg"
                          style={{ background: 'rgba(129, 140, 248, 0.08)', color: '#818cf8' }}
                        >
                          {monthlyUnits.toFixed(1)}
                        </span>
                      </div>

                      {/* Delete */}
                      <div className="col-span-4 sm:col-span-1 flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.85 }}
                          onClick={() => removeAppliance(appliance.id)}
                          className="p-1.5 rounded-lg transition-all"
                          style={{ color: 'var(--text-muted)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#f43f5e';
                            e.currentTarget.style.background = 'rgba(244,63,94,0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-muted)';
                            e.currentTarget.style.background = 'transparent';
                          }}
                          title="Remove appliance"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* ── Bottom Summary Cards ── */}
        {appliances.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-3 gap-3 mt-5 pt-5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div
              className="rounded-xl p-4 border"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.03))',
                borderColor: 'rgba(99, 102, 241, 0.15)',
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#4f46e5' }}>
                Daily Usage
              </p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {totals.daily.toFixed(2)} <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>kWh</span>
              </p>
            </div>

            <div
              className="rounded-xl p-4 border"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.03))',
                borderColor: 'rgba(139, 92, 246, 0.15)',
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#a78bfa' }}>
                Monthly Est.
              </p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {totals.monthly.toFixed(1)} <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>kWh</span>
              </p>
            </div>

            <div
              className="rounded-xl p-4 border"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.03))',
                borderColor: 'rgba(99, 102, 241, 0.15)',
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#818cf8' }}>
                TNEB Bill Est.
              </p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {formatCurrency(totals.bill)}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
