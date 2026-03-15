import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { calculateApplianceUnits } from '../utils/calculations';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function ConsumptionChart({ appliances }) {
  const chartData = useMemo(() => {
    if (appliances.length === 0) return null;

    const data = appliances.map((a) => {
      const { monthlyUnits } = calculateApplianceUnits(a.watts, a.hours, a.quantity);
      return { name: a.name, icon: a.icon, units: monthlyUnits };
    }).sort((a, b) => b.units - a.units);

    const colors = [
      '#6366f1', '#818cf8', '#4f46e5', '#f59e0b', '#6366f1',
      '#8b5cf6', '#f43f5e', '#6366f1', '#14b8a6', '#f97316',
      '#84cc16', '#a855f7', '#ef4444', '#22d3ee', '#e879f9',
      '#facc15', '#4ade80',
    ];

    return {
      labels: data.map((d) => d.name),
      datasets: [
        {
          data: data.map((d) => Math.round(d.units * 100) / 100),
          backgroundColor: colors.slice(0, data.length).map(c => c + '33'),
          borderColor: colors.slice(0, data.length),
          borderWidth: 2,
          hoverOffset: 8,
        },
      ],
    };
  }, [appliances]);

  const barData = useMemo(() => {
    if (appliances.length === 0) return null;

    const data = appliances.map((a) => {
      const { monthlyUnits } = calculateApplianceUnits(a.watts, a.hours, a.quantity);
      return { name: a.name, units: monthlyUnits };
    }).sort((a, b) => b.units - a.units).slice(0, 8);

    return {
      labels: data.map((d) => d.name),
      datasets: [
        {
          label: 'Monthly kWh',
          data: data.map((d) => Math.round(d.units * 100) / 100),
          backgroundColor: 'rgba(99, 102, 241, 0.15)',
          borderColor: '#6366f1',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  }, [appliances]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '68%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(10, 37, 64, 0.95)',
        titleColor: '#f0f6ff',
        bodyColor: 'rgba(200, 220, 255, 0.7)',
        padding: 14,
        cornerRadius: 12,
        borderColor: 'rgba(99, 102, 241, 0.2)',
        borderWidth: 1,
        titleFont: { weight: '700', size: 13, family: 'Inter' },
        bodyFont: { size: 12, family: 'Inter' },
        callbacks: { label: (ctx) => ` ${ctx.parsed} kWh/month` },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(10, 37, 64, 0.95)',
        titleColor: '#f0f6ff',
        bodyColor: 'rgba(200, 220, 255, 0.7)',
        padding: 14,
        cornerRadius: 12,
        borderColor: 'rgba(99, 102, 241, 0.2)',
        borderWidth: 1,
        callbacks: { label: (ctx) => ` ${ctx.parsed.x} kWh/month` },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
        ticks: { font: { size: 11, family: 'Inter' }, color: 'rgba(200, 220, 255, 0.4)' },
      },
      y: {
        grid: { display: false },
        ticks: { font: { size: 11, family: 'Inter', weight: '500' }, color: 'rgba(200, 220, 255, 0.6)' },
      },
    },
  };

  if (!chartData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card-static p-6"
    >
      <div className="flex items-center gap-2.5 mb-6">
        <span className="text-xl">📊</span>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Consumption Breakdown</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-center">
          <div className="w-52 h-52">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-full h-56">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {appliances
          .map((a) => {
            const { monthlyUnits } = calculateApplianceUnits(a.watts, a.hours, a.quantity);
            return { ...a, monthlyUnits };
          })
          .sort((a, b) => b.monthlyUnits - a.monthlyUnits)
          .slice(0, 6)
          .map((a) => (
            <span
              key={a.id}
              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}
            >
              {a.icon} {a.name}: <span className="font-semibold" style={{ color: '#4f46e5' }}>{a.monthlyUnits.toFixed(1)} kWh</span>
            </span>
          ))}
      </div>
    </motion.div>
  );
}
