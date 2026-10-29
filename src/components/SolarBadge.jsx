import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sun } from 'lucide-react';

export default function SolarBadge({ onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block"
    >
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label="Clean Energy Smarter Living feature badge"
        className="group relative cursor-pointer flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill border border-white/90 text-xs sm:text-sm font-semibold text-[#071B49] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
      >
        {/* Pulsing Green Solar Status Indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#70D943] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#239B35]" />
        </span>

        {/* Text */}
        <span className="tracking-wide text-[#071B49] group-hover:text-[#0866C6] transition-colors">
          Clean Energy <span className="text-[#239B35] font-bold">•</span> Smarter Living
        </span>

        {/* Subtle sparkle icon */}
        <Sparkles className="w-3.5 h-3.5 text-[#239B35] opacity-75 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
      </div>
    </motion.div>
  );
}
