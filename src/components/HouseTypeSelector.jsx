import { motion } from 'framer-motion';
import { HOUSE_TYPES } from '../data/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HouseTypeSelector({ selected, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card-static p-6"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <span className="text-xl">🏠</span>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Select House Type</h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
      >
        {HOUSE_TYPES.map((house) => (
          <motion.button
            key={house.name}
            variants={cardVariants}
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(house)}
            className={`relative group p-4 rounded-xl border transition-all duration-300 cursor-pointer text-center ${
              selected?.name === house.name
                ? 'border-electric-blue/50 bg-electric-blue/10'
                : 'border-white/[0.06] bg-white/[0.03] hover:border-electric-blue/20 hover:bg-white/[0.06]'
            }`}
            style={
              selected?.name === house.name
                ? { boxShadow: '0 0 30px rgba(99, 102, 241, 0.15), inset 0 1px 0 rgba(99, 102, 241, 0.1)' }
                : {}
            }
          >
            {selected?.name === house.name && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                  boxShadow: '0 2px 8px rgba(99, 102, 241, 0.4)',
                }}
              >
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
              {house.icon}
            </div>
            <h3 className={`text-sm font-semibold ${
              selected?.name === house.name ? 'text-electric-light' : 'text-[var(--text-primary)]'
            }`}>
              {house.name}
            </h3>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{house.description}</p>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
