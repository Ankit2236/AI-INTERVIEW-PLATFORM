import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', interactive = false, onClick, glow = false }) => {
  const base = interactive
    ? 'glass-panel-interactive cursor-pointer'
    : 'glass-panel';

  const glowStyle = glow
    ? 'shadow-[0_0_25px_rgba(139,92,246,0.15)] border-purple-500/30'
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`rounded-2xl p-6 ${base} ${glowStyle} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
