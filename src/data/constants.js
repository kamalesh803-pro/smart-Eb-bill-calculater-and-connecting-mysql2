// Default wattage values for appliances with types
export const APPLIANCE_DEFAULTS = [
  {
    name: 'Fan', icon: '🌀',
    types: [
      { type: 'Ceiling Fan', watts: 75 },
      { type: 'Ceiling Fan (BLDC)', watts: 30 },
      { type: 'Table Fan', watts: 50 },
      { type: 'Exhaust Fan', watts: 40 },
    ],
  },
  {
    name: 'Light Bulb', icon: '💡',
    types: [
      { type: 'LED Bulb', watts: 12 },
      { type: 'CFL Bulb', watts: 23 },
      { type: 'Incandescent Bulb', watts: 60 },
      { type: 'Tube Light', watts: 36 },
      { type: 'LED Tube', watts: 18 },
    ],
  },
  {
    name: 'Television', icon: '📺',
    types: [
      { type: 'LED TV (32")', watts: 50 },
      { type: 'LED TV (43")', watts: 80 },
      { type: 'LED TV (55")', watts: 120 },
      { type: 'OLED TV', watts: 150 },
    ],
  },
  {
    name: 'Air Conditioner', icon: '❄️',
    types: [
      { type: 'Split AC (1 Ton)', watts: 1200 },
      { type: 'Split AC (1.5 Ton)', watts: 1500 },
      { type: 'Split AC (2 Ton)', watts: 2000 },
      { type: 'Inverter AC (1.5 Ton)', watts: 1100 },
      { type: 'Window AC', watts: 1400 },
    ],
  },
  {
    name: 'Refrigerator', icon: '🧊',
    types: [
      { type: 'Single Door (180L)', watts: 150 },
      { type: 'Double Door (250L)', watts: 200 },
      { type: 'Double Door (350L)', watts: 250 },
      { type: 'Side-by-Side', watts: 300 },
    ],
  },
  {
    name: 'Washing Machine', icon: '🫧',
    types: [
      { type: 'Semi-Automatic', watts: 400 },
      { type: 'Top Load Auto', watts: 500 },
      { type: 'Front Load', watts: 550 },
    ],
  },
  {
    name: 'Water Heater', icon: '🔥',
    types: [
      { type: 'Instant Geyser', watts: 3000 },
      { type: 'Storage Geyser (15L)', watts: 2000 },
      { type: 'Storage Geyser (25L)', watts: 2500 },
      { type: 'Solar Hybrid', watts: 1500 },
    ],
  },
  {
    name: 'Iron', icon: '👔',
    types: [
      { type: 'Dry Iron', watts: 750 },
      { type: 'Steam Iron', watts: 1000 },
      { type: 'Steam Iron (Heavy)', watts: 1400 },
    ],
  },
  {
    name: 'Mixer Grinder', icon: '🥤',
    types: [
      { type: 'Mixer Grinder (500W)', watts: 500 },
      { type: 'Mixer Grinder (750W)', watts: 750 },
      { type: 'Juicer Mixer', watts: 600 },
    ],
  },
  {
    name: 'Microwave Oven', icon: '🍕',
    types: [
      { type: 'Solo Microwave', watts: 800 },
      { type: 'Grill Microwave', watts: 1200 },
      { type: 'Convection Microwave', watts: 1400 },
    ],
  },
  {
    name: 'Computer/Laptop', icon: '💻',
    types: [
      { type: 'Laptop', watts: 65 },
      { type: 'Desktop PC', watts: 200 },
      { type: 'Gaming PC', watts: 500 },
      { type: 'Monitor', watts: 40 },
    ],
  },
  {
    name: 'Water Motor', icon: '💧',
    types: [
      { type: '0.5 HP Motor', watts: 375 },
      { type: '1 HP Motor', watts: 750 },
      { type: '1.5 HP Motor', watts: 1100 },
    ],
  },
  {
    name: 'WiFi Router', icon: '📶',
    types: [
      { type: 'Standard Router', watts: 12 },
      { type: 'Dual Band Router', watts: 15 },
      { type: 'Mesh System', watts: 20 },
    ],
  },
  {
    name: 'Phone Charger', icon: '🔌',
    types: [
      { type: 'Standard (5W)', watts: 5 },
      { type: 'Fast Charger (18W)', watts: 18 },
      { type: 'Fast Charger (65W)', watts: 65 },
    ],
  },
  {
    name: 'Air Cooler', icon: '🌬️',
    types: [
      { type: 'Personal Cooler', watts: 100 },
      { type: 'Desert Cooler', watts: 200 },
      { type: 'Tower Cooler', watts: 150 },
    ],
  },
  {
    name: 'Induction Cooktop', icon: '🍳',
    types: [
      { type: 'Induction Cooktop', watts: 1800 },
      { type: 'Induction (Low Power)', watts: 1200 },
    ],
  },
  {
    name: 'Vacuum Cleaner', icon: '🧹',
    types: [
      { type: 'Handheld Vacuum', watts: 400 },
      { type: 'Canister Vacuum', watts: 800 },
      { type: 'Robot Vacuum', watts: 60 },
    ],
  },
];

// House type presets
export const HOUSE_TYPES = [
  {
    name: '1 BHK',
    icon: '🏠',
    description: 'Compact living',
    defaultAppliances: [
      { name: 'Fan', quantity: 2, hours: 8 },
      { name: 'Light Bulb', quantity: 4, hours: 6 },
      { name: 'Television', quantity: 1, hours: 4 },
      { name: 'Refrigerator', quantity: 1, hours: 24 },
      { name: 'Phone Charger', quantity: 2, hours: 3 },
      { name: 'WiFi Router', quantity: 1, hours: 24 },
    ],
  },
  {
    name: '2 BHK',
    icon: '🏡',
    description: 'Family home',
    defaultAppliances: [
      { name: 'Fan', quantity: 3, hours: 8 },
      { name: 'Light Bulb', quantity: 8, hours: 6 },
      { name: 'Television', quantity: 1, hours: 5 },
      { name: 'Refrigerator', quantity: 1, hours: 24 },
      { name: 'Washing Machine', quantity: 1, hours: 1 },
      { name: 'Mixer Grinder', quantity: 1, hours: 0.5 },
      { name: 'Phone Charger', quantity: 3, hours: 3 },
      { name: 'WiFi Router', quantity: 1, hours: 24 },
    ],
  },
  {
    name: '3 BHK',
    icon: '🏘️',
    description: 'Spacious home',
    defaultAppliances: [
      { name: 'Fan', quantity: 5, hours: 8 },
      { name: 'Light Bulb', quantity: 12, hours: 6 },
      { name: 'Television', quantity: 2, hours: 5 },
      { name: 'Air Conditioner', quantity: 1, hours: 6 },
      { name: 'Refrigerator', quantity: 1, hours: 24 },
      { name: 'Washing Machine', quantity: 1, hours: 1 },
      { name: 'Mixer Grinder', quantity: 1, hours: 0.5 },
      { name: 'Computer/Laptop', quantity: 1, hours: 4 },
      { name: 'Phone Charger', quantity: 4, hours: 3 },
      { name: 'WiFi Router', quantity: 1, hours: 24 },
    ],
  },
  {
    name: 'Independent House',
    icon: '🏛️',
    description: 'Full house',
    defaultAppliances: [
      { name: 'Fan', quantity: 6, hours: 10 },
      { name: 'Light Bulb', quantity: 15, hours: 7 },
      { name: 'Television', quantity: 2, hours: 5 },
      { name: 'Air Conditioner', quantity: 2, hours: 6 },
      { name: 'Refrigerator', quantity: 1, hours: 24 },
      { name: 'Washing Machine', quantity: 1, hours: 1 },
      { name: 'Water Heater', quantity: 1, hours: 0.5 },
      { name: 'Mixer Grinder', quantity: 1, hours: 0.5 },
      { name: 'Water Motor', quantity: 1, hours: 1 },
      { name: 'Computer/Laptop', quantity: 2, hours: 5 },
      { name: 'Phone Charger', quantity: 4, hours: 3 },
      { name: 'WiFi Router', quantity: 1, hours: 24 },
    ],
  },
  {
    name: 'Villa',
    icon: '🏰',
    description: 'Luxury living',
    defaultAppliances: [
      { name: 'Fan', quantity: 8, hours: 10 },
      { name: 'Light Bulb', quantity: 20, hours: 8 },
      { name: 'Television', quantity: 3, hours: 6 },
      { name: 'Air Conditioner', quantity: 4, hours: 8 },
      { name: 'Refrigerator', quantity: 2, hours: 24 },
      { name: 'Washing Machine', quantity: 1, hours: 1.5 },
      { name: 'Water Heater', quantity: 2, hours: 1 },
      { name: 'Iron', quantity: 1, hours: 0.5 },
      { name: 'Mixer Grinder', quantity: 1, hours: 1 },
      { name: 'Microwave Oven', quantity: 1, hours: 0.5 },
      { name: 'Water Motor', quantity: 1, hours: 1.5 },
      { name: 'Computer/Laptop', quantity: 2, hours: 6 },
      { name: 'Phone Charger', quantity: 6, hours: 3 },
      { name: 'WiFi Router', quantity: 2, hours: 24 },
      { name: 'Vacuum Cleaner', quantity: 1, hours: 0.5 },
    ],
  },
  {
    name: 'PG / Room',
    icon: '🚪',
    description: 'Single room',
    defaultAppliances: [
      { name: 'Fan', quantity: 1, hours: 10 },
      { name: 'Light Bulb', quantity: 2, hours: 5 },
      { name: 'Phone Charger', quantity: 1, hours: 4 },
      { name: 'Computer/Laptop', quantity: 1, hours: 6 },
      { name: 'WiFi Router', quantity: 1, hours: 24 },
    ],
  },
];

// TNEB Domestic Tariff Slabs
export const TNEB_SLABS = [
  { from: 0, to: 100, rate: 0, label: '0 – 100 units', rateLabel: 'Free' },
  { from: 101, to: 200, rate: 2.25, label: '101 – 200 units', rateLabel: '₹2.25/unit' },
  { from: 201, to: 400, rate: 4.50, label: '201 – 400 units', rateLabel: '₹4.50/unit' },
  { from: 401, to: 500, rate: 6.00, label: '401 – 500 units', rateLabel: '₹6.00/unit' },
  { from: 501, to: 600, rate: 8.00, label: '501 – 600 units', rateLabel: '₹8.00/unit' },
  { from: 601, to: 800, rate: 9.00, label: '601 – 800 units', rateLabel: '₹9.00/unit' },
  { from: 801, to: 1000, rate: 10.00, label: '801 – 1000 units', rateLabel: '₹10.00/unit' },
  { from: 1001, to: Infinity, rate: 11.00, label: 'Above 1000 units', rateLabel: '₹11.00/unit' },
];

// Seasons
export const SEASONS = [
  { name: 'Winter', multiplier: 0.85, icon: '🥶', months: [11, 0, 1] },
  { name: 'Summer', multiplier: 1.3, icon: '☀️', months: [2, 3, 4, 5] },
  { name: 'Monsoon', multiplier: 0.9, icon: '🌧️', months: [6, 7, 8] },
  { name: 'Autumn', multiplier: 1.0, icon: '🍂', months: [9, 10] },
];

export const getCurrentSeason = () => {
  const month = new Date().getMonth();
  return SEASONS.find(s => s.months.includes(month)) || SEASONS[3];
};

// AI Tips
export const AI_TIPS = [
  "💡 Switch to LED bulbs – they use 75% less energy than incandescent bulbs and last 25 times longer!",
  "❄️ Set your AC to 24°C instead of 18°C – saves up to 25% electricity on cooling.",
  "🌀 Use ceiling fans with AC to circulate cool air faster and reduce AC runtime.",
  "🧊 Don't place your refrigerator near heat sources. Keep 4-inch gap behind it for airflow.",
  "🔌 Unplug devices when not in use – standby power can account for 5-10% of your bill.",
  "👔 Iron clothes in batches to reduce warm-up energy waste.",
  "🫧 Use washing machine with full load only – saves both water and electricity.",
  "📺 Enable power-saving mode on your TV and reduce brightness for energy savings.",
  "💻 Laptops use 50-80% less energy than desktop computers.",
  "🍳 Induction cooktops are 90% efficient vs 40% for gas stoves – faster and cheaper!",
  "🌡️ Clean your AC filters monthly – dirty filters make AC work 15% harder.",
  "💧 Use a timer for your water motor to prevent unnecessary runtime.",
  "☀️ During summer, use curtains and blinds to block heat and reduce AC load.",
  "🔋 Charge your phone between 20-80% – better for battery life and uses less energy over time.",
  "📶 Modern WiFi 6 routers are more energy-efficient than older models.",
  "🧹 Regular maintenance of appliances can improve efficiency by 10-15%.",
  "🌙 Use night mode/dark themes on screens – saves energy on OLED displays.",
  "⏰ Run heavy appliances like washing machines during off-peak hours if your utility offers time-of-use rates.",
  "🏠 Seal gaps around doors and windows to prevent cool air escape and reduce AC bills.",
  "🌿 Plant trees or install awnings on sun-facing walls to naturally cool your home.",
];
