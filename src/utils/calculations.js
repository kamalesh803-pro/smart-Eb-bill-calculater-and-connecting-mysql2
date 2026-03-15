import { TNEB_SLABS } from '../data/constants';

/**
 * Calculate units consumed by a single appliance per day and per month
 */
export const calculateApplianceUnits = (watts, hours, quantity) => {
  const dailyUnits = (watts * hours * quantity) / 1000;
  const monthlyUnits = dailyUnits * 30;
  return { dailyUnits, monthlyUnits };
};

/**
 * Calculate total consumption from all appliances
 */
export const calculateTotalConsumption = (appliances) => {
  let totalDaily = 0;
  let totalMonthly = 0;

  appliances.forEach((appliance) => {
    const { dailyUnits, monthlyUnits } = calculateApplianceUnits(
      appliance.watts,
      appliance.hours,
      appliance.quantity
    );
    totalDaily += dailyUnits;
    totalMonthly += monthlyUnits;
  });

  return {
    daily: Math.round(totalDaily * 100) / 100,
    monthly: Math.round(totalMonthly * 100) / 100,
  };
};

/**
 * Calculate TNEB bill based on units consumed
 * TNEB uses a slab-based system where each slab applies to units in that range
 */
export const calculateTNEBBill = (totalUnits) => {
  if (totalUnits <= 100) return 0;

  let bill = 0;
  let remaining = totalUnits;

  for (const slab of TNEB_SLABS) {
    if (remaining <= 0) break;

    const slabRange = slab.to === Infinity ? remaining : slab.to - slab.from + 1;
    const unitsInSlab = Math.min(remaining, slabRange);

    if (totalUnits > 100 || slab.from > 100) {
      bill += unitsInSlab * slab.rate;
    }

    remaining -= unitsInSlab;
  }

  return Math.round(bill * 100) / 100;
};

/**
 * Calculate bill with custom rate
 */
export const calculateCustomBill = (totalUnits, ratePerUnit) => {
  return Math.round(totalUnits * ratePerUnit * 100) / 100;
};

/**
 * Calculate next month forecast
 */
export const calculateForecast = (currentUnits, usageChangePercent, seasonMultiplier = 1) => {
  const forecastUnits = currentUnits * (1 + usageChangePercent / 100) * seasonMultiplier;
  const forecastBill = calculateTNEBBill(forecastUnits);
  return {
    units: Math.round(forecastUnits * 100) / 100,
    bill: forecastBill,
  };
};

/**
 * Format currency in INR
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Generate alerts based on consumption and settings
 */
export const generateAlerts = (monthlyUnits, monthlyBill, limit, forecastUnits) => {
  const alerts = [];

  if (monthlyUnits > 500) {
    alerts.push({
      type: 'danger',
      title: 'High Consumption Alert',
      message: `Your consumption of ${monthlyUnits.toFixed(0)} kWh is very high. Consider reducing AC or water heater usage.`,
      icon: '⚡',
    });
  } else if (monthlyUnits > 300) {
    alerts.push({
      type: 'warning',
      title: 'Moderate Consumption',
      message: `Your consumption of ${monthlyUnits.toFixed(0)} kWh is above average. Review your appliance usage.`,
      icon: '⚠️',
    });
  }

  if (limit > 0 && monthlyUnits > limit) {
    alerts.push({
      type: 'danger',
      title: 'Limit Exceeded!',
      message: `You've exceeded your set limit of ${limit} kWh by ${(monthlyUnits - limit).toFixed(0)} kWh.`,
      icon: '🚫',
    });
  } else if (limit > 0 && monthlyUnits > limit * 0.85) {
    alerts.push({
      type: 'warning',
      title: 'Approaching Limit',
      message: `You're at ${((monthlyUnits / limit) * 100).toFixed(0)}% of your ${limit} kWh limit.`,
      icon: '📊',
    });
  }

  if (forecastUnits > monthlyUnits * 1.15) {
    alerts.push({
      type: 'warning',
      title: 'Bill Increase Warning',
      message: `Next month's estimated consumption is ${forecastUnits.toFixed(0)} kWh — a ${(((forecastUnits - monthlyUnits) / monthlyUnits) * 100).toFixed(0)}% increase.`,
      icon: '📈',
    });
  }

  if (monthlyBill <= 0 && monthlyUnits <= 100) {
    alerts.push({
      type: 'success',
      title: 'Free Electricity!',
      message: 'Your consumption is within 100 units — your bill is free under TNEB tariff!',
      icon: '🎉',
    });
  }

  return alerts;
};
