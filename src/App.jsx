import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import LiquidBackground from './components/LiquidBackground';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import HouseTypeSelector from './components/HouseTypeSelector';
import ApplianceManager from './components/ApplianceManager';
import SummaryDashboard from './components/SummaryDashboard';
import ForecastCard from './components/ForecastCard';
import AlertsPanel from './components/AlertsPanel';
import SettingsPanel from './components/SettingsPanel';
import TariffTable from './components/TariffTable';
import ConsumptionChart from './components/ConsumptionChart';
import AIChatWidget from './components/AIChatWidget';
import { APPLIANCE_DEFAULTS, getCurrentSeason } from './data/constants';
import {
  calculateTotalConsumption,
  calculateTNEBBill,
  calculateCustomBill,
  calculateForecast,
  generateAlerts,
  formatCurrency,
} from './utils/calculations';

// Helper to get saved data for a user
const loadUserData = (userId) => {
  try {
    const data = localStorage.getItem(`eb_calc_user_${userId}`);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
};

const saveUserData = (userId, data) => {
  try {
    localStorage.setItem(`eb_calc_user_${userId}`, JSON.stringify(data));
  } catch (e) { console.error('Save failed', e); }
};

function App() {
  // Auth state — check localStorage first ("remember me"), then sessionStorage
  const [user, setUser] = useState(() => {
    try {
      // Check persistent login (localStorage — "Remember Me" was checked)
      const persistent = localStorage.getItem('eb_calc_current_user');
      if (persistent) return JSON.parse(persistent);
      // Check session-only login (sessionStorage — "Remember Me" was NOT checked)
      const session = sessionStorage.getItem('eb_calc_current_user');
      if (session) return JSON.parse(session);
      return null;
    } catch { return null; }
  });

  const [selectedHouseType, setSelectedHouseType] = useState(null);
  const [appliances, setAppliances] = useState([]);
  const [settings, setSettings] = useState({
    ratePerUnit: 0,
    monthlyLimit: 0,
    usageChange: 10,
    seasonalMultiplier: getCurrentSeason().multiplier,
  });

  // Load saved user data on login
  useEffect(() => {
    if (user) {
      const saved = loadUserData(user.id);
      if (saved) {
        if (saved.appliances) setAppliances(saved.appliances);
        if (saved.settings) setSettings(saved.settings);
        if (saved.houseType) setSelectedHouseType(saved.houseType);
      }
    }
  }, [user]);

  // Auto-save whenever data changes (debounced)
  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => {
      saveUserData(user.id, {
        appliances,
        settings,
        houseType: selectedHouseType,
        lastSaved: new Date().toISOString(),
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [appliances, settings, selectedHouseType, user]);

  const handleLogin = (userData, rememberMe = true) => {
    setUser(userData);
    const userJSON = JSON.stringify(userData);
    if (rememberMe) {
      // Persist across browser restarts
      localStorage.setItem('eb_calc_current_user', userJSON);
      localStorage.setItem('eb_calc_remember_me', 'true');
      // Clear session storage if it had old data
      sessionStorage.removeItem('eb_calc_current_user');
    } else {
      // Only persist for this browser session (tab close = logout)
      sessionStorage.setItem('eb_calc_current_user', userJSON);
      // Remove from localStorage so next restart won't auto-login
      localStorage.removeItem('eb_calc_current_user');
      localStorage.removeItem('eb_calc_remember_me');
    }
  };

  const handleLogout = () => {
    // Save before logout
    if (user) {
      saveUserData(user.id, {
        appliances,
        settings,
        houseType: selectedHouseType,
        lastSaved: new Date().toISOString(),
      });
    }
    setUser(null);
    // Clear session from BOTH storages
    localStorage.removeItem('eb_calc_current_user');
    localStorage.removeItem('eb_calc_remember_me');
    sessionStorage.removeItem('eb_calc_current_user');
    setAppliances([]);
    setSelectedHouseType(null);
    setSettings({
      ratePerUnit: 0,
      monthlyLimit: 0,
      usageChange: 10,
      seasonalMultiplier: getCurrentSeason().multiplier,
    });
  };

  const handleHouseTypeSelect = (house) => {
    setSelectedHouseType(house);
    const defaultAppliances = house.defaultAppliances.map((da, i) => {
      const defaults = APPLIANCE_DEFAULTS.find((a) => a.name === da.name);
      // Get first type's watts as default
      const firstType = defaults?.types?.[0];
      return {
        id: Date.now() + i,
        name: da.name,
        type: firstType?.type || '',
        watts: firstType?.watts || 100,
        icon: defaults?.icon || '🔌',
        quantity: da.quantity,
        hours: da.hours,
      };
    });
    setAppliances(defaultAppliances);
  };

  const consumption = useMemo(() => calculateTotalConsumption(appliances), [appliances]);

  const bill = useMemo(() => {
    if (settings.ratePerUnit > 0) return calculateCustomBill(consumption.monthly, settings.ratePerUnit);
    return calculateTNEBBill(consumption.monthly);
  }, [consumption.monthly, settings.ratePerUnit]);

  const forecast = useMemo(
    () => calculateForecast(consumption.monthly, settings.usageChange, settings.seasonalMultiplier),
    [consumption.monthly, settings.usageChange, settings.seasonalMultiplier]
  );

  const alerts = useMemo(
    () => generateAlerts(consumption.monthly, bill, settings.monthlyLimit, forecast.units),
    [consumption.monthly, bill, settings.monthlyLimit, forecast.units]
  );

  // Show login page if not authenticated
  if (!user) {
    return (
      <div className="relative min-h-screen">
        <LiquidBackground />
        <LoginPage onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <LiquidBackground />

      <div className="relative z-10 px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Header user={user} onLogout={handleLogout} />

        {/* Hero Stats */}
        <div className="mb-8">
          <SummaryDashboard
            consumption={consumption}
            bill={bill}
            limit={settings.monthlyLimit}
          />
        </div>

        {/* House Type */}
        <div className="mb-8">
          <HouseTypeSelector
            selected={selectedHouseType}
            onSelect={handleHouseTypeSelect}
          />
        </div>

        {/* Main 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <ApplianceManager
              appliances={appliances}
              setAppliances={setAppliances}
            />
            <ConsumptionChart appliances={appliances} />
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <SettingsPanel settings={settings} setSettings={setSettings} />
            <ForecastCard
              currentUnits={consumption.monthly}
              currentBill={bill}
              forecastUnits={forecast.units}
              forecastBill={forecast.bill}
              settings={settings}
            />
            <AlertsPanel alerts={alerts} />
          </div>
        </div>

        {/* Tariff Table */}
        <div className="mb-8">
          <TariffTable currentUnits={consumption.monthly} />
        </div>

        {/* Footer */}
        <footer className="text-center py-8">
          <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            Smart Electricity Bill Calculator
          </p>
          <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
            Based on TNEB Domestic Tariff Rates • For estimation purposes only
          </p>
        </footer>
      </div>

      <AIChatWidget />
    </div>
  );
}

export default App;
