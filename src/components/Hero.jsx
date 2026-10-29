import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  PhoneCall,
  Home,
  ShieldCheck,
  Zap,
  Sparkles,
  Sun
} from 'lucide-react';
import SolarCanvas from './SolarCanvas';
import SolarBadge from './SolarBadge';
import { PhoneDialerLogo } from './BrandLogos';

export default function Hero({ onOpenQuoteModal, onOpenExpertModal }) {
  // Motion values for subtle 3D parallax on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const tiltX = useTransform(smoothMouseY, [-0.5, 0.5], [4, -4]);
  const tiltY = useTransform(smoothMouseX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e) => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const { innerWidth, innerHeight } = window;
    const x = e.clientX / innerWidth - 0.5;
    const y = e.clientY / innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const handleExploreSolar = (e) => {
    e.preventDefault();
    const nextSection = document.getElementById('3d-solar-experience') || document.getElementById('services');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTalkToExpert = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100dvh] h-[100dvh] max-h-[1080px] flex items-center overflow-hidden bg-[#EAF6FF]"
      aria-label="Solar Arise Homepage Hero"
    >
      {/* 1. Full-screen Cinematic Solar-Powered House Background Image (One Screen Fit) */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <picture>
          <source srcSet="/images/home-section.png" type="image/png" />
          <img
            src="/images/home-section.png"
            alt="Solar Arise luxury modern solar-powered smart home with rooftop photovoltaic panels, electric vehicle charging dock, and mountain sunrise"
            className="w-full h-full object-cover object-[72%_center] sm:object-[68%_center] lg:object-center transform scale-[1.01] transition-transform duration-1000 ease-out"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Soft Left-Sided Atmospheric Gradient Overlay for Typography Contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent sm:from-white/80 sm:via-white/30 sm:to-transparent lg:w-[62%] pointer-events-none"
          aria-hidden="true"
        />

        {/* Mobile Soft Bottom Vignette — subtle only, keeps hero image crisp */}
        <div
          className="sm:hidden absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 2. Interactive Three.js Particle Layer (Floating Solar Photons & Sunbeam Accents) */}
      <SolarCanvas />

      {/* 3. Hero Foreground Content Container (Centered 3D Text & Trust Badges on Left) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-24 lg:pt-20 pb-24 sm:pb-8 flex items-center h-full">
        <motion.div
          style={{ rotateX: tiltX, rotateY: tiltY }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl text-left my-auto w-full"
        >

          {/* Eyebrow Pill with Official Round Logo */}
          <motion.div variants={itemVariants} className="mb-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#239B35]/30 shadow-sm max-w-full">
            <img
              src="/images/solar-arise-logo-192.webp"
              alt="Solar Arise Official Round Logo"
              className="w-5 h-5 rounded-full object-cover ring-1 ring-[#239B35]/40 shrink-0"
              width="20"
              height="20"
            />
            <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase text-[#071B49] truncate">
              Solar Arise <span className="text-[#239B35]">•</span> A Unique Reliable Solar Product
            </span>
          </motion.div>

          {/* Main Headline — Times New Roman, bright & thick with clean word spacing */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-5 select-none">
            <div
              aria-label="Your Home. Your Energy. Your Future."
              className="leading-none space-y-1 sm:space-y-1.5"
            >
              {/* ── shared style ── */}
              {(() => {
                const base = {
                  fontFamily: "'Times New Roman', Times, Georgia, serif",
                  fontWeight: 900,
                  fontStyle: 'italic',
                  lineHeight: 1.04,
                  display: 'flex',
                  alignItems: 'baseline',
                  letterSpacing: '0.01em',
                  fontSize: 'clamp(32px, 8.5vw, 96px)',
                };
                const shadow = (color) =>
                  `2px 2px 0 ${color}cc, 3px 3px 0 ${color}88, 4px 4px 6px rgba(0,0,0,0.22)`;
                return (
                  <>
                    {/* Line 1: Your Home. */}
                    <h1 style={{ ...base }} className="m-0 p-0 flex items-baseline">
                      <span style={{
                        color: '#1040CC',
                        textShadow: shadow('#0033AA'),
                      }} className="mr-2 sm:mr-3">Your</span>
                      <span style={{
                        color: '#00AAEE',
                        textShadow: shadow('#0077CC'),
                      }}>Home</span>
                      <span style={{
                        color: '#22BB33',
                        textShadow: shadow('#159924'),
                      }}>.</span>
                    </h1>

                    {/* Line 2: Your Energy. */}
                    <p style={{ ...base }} className="m-0 p-0 flex items-baseline">
                      <span style={{
                        color: '#1040CC',
                        textShadow: shadow('#0033AA'),
                      }} className="mr-2 sm:mr-3">Your</span>
                      <span style={{
                        color: '#1DBF2E',
                        textShadow: shadow('#0E8A1C'),
                      }}>Energy</span>
                      <span style={{
                        color: '#1DBF2E',
                        textShadow: shadow('#0E8A1C'),
                      }}>.</span>
                    </p>

                    {/* Line 3: Your Future! */}
                    <p style={{ ...base }} className="m-0 p-0 flex items-baseline">
                      <span style={{
                        color: '#1040CC',
                        textShadow: shadow('#0033AA'),
                      }} className="mr-2 sm:mr-3">Your</span>
                      <span style={{
                        color: '#00DDFF',
                        textShadow: shadow('#009EC4'),
                      }}>Future</span>
                      <span style={{
                        color: '#22BB33',
                        textShadow: shadow('#159924'),
                      }}>!</span>
                    </p>
                  </>
                );
              })()}
            </div>
          </motion.div>

          {/* Trust Indicators Card — Clean alignment on mobile and desktop */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 py-2.5 px-3.5 sm:px-4 rounded-2xl glass-card text-xs sm:text-sm font-bold text-[#071B49] shadow-md border border-white/95 w-full sm:w-auto max-w-md backdrop-blur-md bg-white/85"
            aria-label="Trust Indicators"
          >
            {/* Item 1 */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#239B35]/15 text-[#239B35] shrink-0">
                <Home className="w-3.5 h-3.5" />
              </span>
              <span className="whitespace-nowrap">Residential & Commercial</span>
            </div>

            {/* Separator */}
            <span className="hidden sm:inline-block w-1 h-3 bg-slate-300 rounded-full" aria-hidden="true" />

            {/* Item 2 */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#0866C6]/15 text-[#0866C6] shrink-0">
                <Zap className="w-3.5 h-3.5" />
              </span>
              <span className="whitespace-nowrap">Expert Installation</span>
            </div>

            {/* Separator */}
            <span className="hidden sm:inline-block w-1 h-3 bg-slate-300 rounded-full" aria-hidden="true" />

            {/* Item 3 */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#70D943]/20 text-[#239B35] shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
              <span className="whitespace-nowrap">Reliable Solar Solutions</span>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* 4. CTA Buttons — centered on mobile, right-aligned on desktop */}
      <div className="absolute bottom-5 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-6 lg:right-10 xl:right-14 z-30 flex flex-row items-center justify-center sm:justify-end gap-2.5 sm:gap-4">
        {/* Primary CTA: Scrolls to Next Section */}
        <button
          type="button"
          onClick={handleExploreSolar}
          className="group relative overflow-hidden btn-3d-primary py-2.5 sm:py-3.5 px-4 sm:px-7 rounded-full text-white font-extrabold text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#70D943]/40 shadow-2xl flex-1 sm:flex-initial"
          aria-label="Explore Solar Solutions"
        >
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 animate-light-sweep pointer-events-none" />
          <span className="relative z-10 tracking-wide">Explore Solar</span>
          <ArrowRight className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </button>

        {/* Secondary CTA: Scrolls directly to Contact Section */}
        <button
          type="button"
          onClick={handleTalkToExpert}
          className="group btn-glass-secondary py-2.5 sm:py-3.5 px-4 sm:px-7 rounded-full font-bold text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2.5 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#0866C6]/25 shadow-xl bg-white/95 flex-1 sm:flex-initial"
          aria-label="Talk to an Expert"
        >
          <PhoneDialerLogo className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
          <span>Talk to Expert</span>
        </button>
      </div>
    </section>
  );
}
