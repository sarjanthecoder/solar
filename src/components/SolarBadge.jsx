import React from 'react';

// SolarBadge — decorative badge component (placeholder)
export default function SolarBadge({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#239B35]/15 border border-[#239B35]/30 text-[#239B35] text-xs font-black ${className}`}>
      ☀ Solar Arise
    </span>
  );
}
