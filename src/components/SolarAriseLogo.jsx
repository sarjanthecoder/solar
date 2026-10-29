import React from 'react';

export default function SolarAriseLogo({
  className = '',
  imgClassName = 'h-10 w-10 sm:h-11 sm:w-11',
  showText = true,
  textColor = 'default', // 'default' | 'white'
}) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Pristine Round Emblem Logo */}
      <div className={`relative shrink-0 rounded-full overflow-hidden shadow-md ring-2 ring-white/90 bg-white transition-transform duration-300 group-hover:scale-105 ${imgClassName}`}>
        <img
          src="/images/solar-arise-logo-192.webp"
          srcSet="/images/solar-arise-logo-192.webp 192w, /images/solar-arise-logo-512.webp 512w"
          sizes="(max-width: 640px) 44px, 48px"
          alt="Solar Arise Official Logo"
          className="w-full h-full object-cover rounded-full"
          width="48"
          height="48"
          loading="eager"
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col tracking-tight leading-none text-left">
          <div className="flex items-center gap-1 font-black tracking-wider text-sm sm:text-base uppercase font-stylish">
            <span className={textColor === 'white' ? 'text-white' : 'text-[#0866C6]'}>SOLAR</span>
            <span className={textColor === 'white' ? 'text-[#70D943]' : 'text-[#239B35]'}>ARISE</span>
          </div>
          <span
            className={`text-[7px] sm:text-[9px] font-extrabold tracking-wider uppercase mt-0.5 ${
              textColor === 'white' ? 'text-slate-300' : 'text-[#071B49]/80'
            }`}
          >
            A UNIQUE RELIABLE SOLAR PRODUCT
          </span>
        </div>
      )}
    </div>
  );
}
