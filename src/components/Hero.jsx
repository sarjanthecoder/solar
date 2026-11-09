import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Home,
  ShieldCheck,
  Zap,
  Sparkles,
  Sun
} from 'lucide-react';
import SolarBadge from './SolarBadge';

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

      {/* 3. Hero Foreground Content Container (Centered 3D Text & Trust Badges on Left) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-24 lg:pt-20 pb-24 sm:pb-8 flex items-center h-full">
        <motion.div
          style={{ rotateX: tiltX, rotateY: tiltY }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl text-left my-auto w-full"
        >


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
        </motion.div>
      </div>

    </section>
  );
}
