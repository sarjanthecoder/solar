import React from 'react';
import { motion } from 'framer-motion';
import {
  Leaf,
  ShieldCheck,
  Zap,
  Award,
  Headphones,
  Coins,
  Grid,
  Cpu,
  BatteryCharging,
  Layers,
  Plug,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { WhatsAppLogo } from './BrandLogos';

export default function SolarProductsSection({ onOpenQuoteModal, onOpenExpertModal }) {
  const products = [
    {
      id: 1,
      title: 'Solar Panels',
      desc: 'High-efficiency monocrystalline and bifacial solar modules delivering superior energy conversion even in low-light conditions.',
      img: '/images/prod-real-panels.jpg',
      icon: Grid,
      bullets: [
        'Monocrystalline Bifacial Tech',
        'High Efficiency (Up to 22.8%)',
        '25-Year Linear Performance Warranty',
      ],
    },
    {
      id: 2,
      title: 'Solar Inverters',
      desc: 'Advanced on-grid, off-grid and hybrid string inverters with dual MPPT tracking and 98.6% peak efficiency.',
      img: '/images/prod-real-inverters.jpg',
      icon: Cpu,
      bullets: [
        'Smart On-Grid & Hybrid Models',
        'Dual MPPT High Conversion',
        '10-Year Comprehensive Warranty',
      ],
    },
    {
      id: 3,
      title: 'Energy Storage Batteries',
      desc: 'Next-generation lithium iron phosphate (LiFePO4) battery packs for seamless power backup and night-time self-consumption.',
      img: '/images/prod-real-batteries.jpg',
      icon: BatteryCharging,
      bullets: [
        'Safe LiFePO4 Chemistry',
        '6,000+ Deep Charge Cycles',
        'Zero Maintenance Modular Design',
      ],
    },
    {
      id: 4,
      title: 'Mounting Structures',
      desc: 'Engineered hot-dip galvanized and anodized aluminum rooftop structures designed to withstand wind speeds up to 180 km/h.',
      img: '/images/prod-real-structures.jpg',
      icon: Layers,
      bullets: [
        'HDG & Anodized Aluminum',
        '180 km/h Wind Resistance',
        'Zero Rooftop Leakage Guarantee',
      ],
    },
    {
      id: 5,
      title: 'BOS & Accessories',
      desc: 'Industrial-grade DC/AC cables, IP67 MC4 connectors, SPD surge protection devices, and earthing arresters.',
      img: '/images/prod-real-accessories.png',
      icon: Plug,
      bullets: [
        'UV-Resistant DC Solar Cables',
        'Type-2 Surge Protection (SPD)',
        'Copper Chemical Earthing Rods',
      ],
    },
    {
      id: 6,
      title: 'Smart Monitoring Systems',
      desc: 'IoT dataloggers and cloud-connected mobile apps to monitor solar generation, household consumption, and savings 24/7.',
      img: '/images/prod-real-monitoring.jpg',
      icon: Smartphone,
      bullets: [
        'Live Power Generation Tracking',
        'Instant Fault Alert Notifications',
        'iOS & Android Companion App',
      ],
    },
  ];

  return (
    <section
      id="products"
      className="relative w-full overflow-hidden bg-white text-[#071B49] scroll-mt-28"
      aria-label="Solar Arise Products Section"
    >
      {/* ═══════════════════════════════════════════════
          1. SKY & NATURE BANNER: 3D TEXT & BLENDED REALISTIC PHOTO (FULL-SIZE EXPANSIVE LAYOUT)
      ═══════════════════════════════════════════════ */}
      <div
        className="relative w-full overflow-hidden min-h-[390px] lg:min-h-[440px] flex items-center"
        style={{
          background:
            'linear-gradient(135deg, #dcf0ff 0%, #c8e6fc 18%, #bde0f8 35%, #caeeca 60%, #c0e8c0 78%, #d4f5d4 100%)',
        }}
      >
        {/* Bottom-edge blend — only at the very bottom of the banner to merge into content below */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-white/80 to-transparent pointer-events-none z-20" />

        {/* Soft radial sky shimmer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 75% 55% at 50% 0%, rgba(135,206,250,0.55) 0%, transparent 70%)',
          }}
        />

        {/* RIGHT: Blended Architectural Hero Photo (Full size seamless alpha mask fade with zero middle cut line) */}
        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-[58%] xl:w-[62%] 2xl:w-[65%] overflow-hidden pointer-events-none select-none z-0"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.03) 12%, rgba(0,0,0,0.25) 28%, rgba(0,0,0,0.7) 48%, black 72%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.03) 12%, rgba(0,0,0,0.25) 28%, rgba(0,0,0,0.7) 48%, black 72%)',
          }}
        >
          <img
            src="/images/project-hero-house.jpg"
            alt="World-Class Monocrystalline Solar Installation and Smart Home"
            className="w-full h-full object-cover object-[30%_center] xl:object-center transform scale-[1.01]"
            loading="eager"
          />
        </div>

        {/* ── Banner Content (Adjusted Height & Compact Alignment) ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-9 lg:py-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* LEFT: Heading, 3D Headline Image, Description & Feature Badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 xl:col-span-6 text-left"
            >
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#239B35]/40 text-[#239B35] text-[10px] sm:text-[11px] font-black font-modular tracking-widest uppercase mb-2.5 shadow-sm backdrop-blur-md">
                <Leaf className="w-3.5 h-3.5 fill-[#239B35]" />
                <span>OUR PRODUCTS</span>
                <span className="text-[#239B35]/60">→</span>
              </div>

              {/* 3D Glossy Headline — Real CSS text, same style as Hero */}
              <div className="mb-2.5 select-none">
                {(() => {
                  const base = {
                    fontFamily: "'Times New Roman', Times, Georgia, serif",
                    fontWeight: 900,
                    fontStyle: 'italic',
                    lineHeight: 1.02,
                    display: 'block',
                    letterSpacing: '-0.01em',
                    fontSize: 'clamp(36px, 9.5vw, 100px)',
                  };
                  const shadow = (color) =>
                    `2px 2px 0 ${color}cc, 3px 3px 0 ${color}88, 4px 4px 6px rgba(0,0,0,0.25)`;
                  return (
                    <>
                      {/* Line 1: Premium (blue) */}
                      <h2 style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#00AAEE',
                          textShadow: shadow('#0077CC'),
                        }}>Premium</span>
                      </h2>

                      {/* Line 2: Solar (green) */}
                      <p style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#1DBF2E',
                          textShadow: shadow('#0E8A1C'),
                        }}>Solar</span>
                      </p>

                      {/* Line 3: Products (blue) */}
                      <p style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#00AAEE',
                          textShadow: shadow('#0077CC'),
                        }}>Products</span>
                      </p>
                    </>
                  );
                })()}
              </div>

              {/* Subtitle */}
              <h3 className="text-xl sm:text-2xl font-black text-[#071B49] tracking-tight mb-2 font-display-modular leading-snug">
                World-Class Solar Products for a Brighter Tomorrow
              </h3>

              {/* Paragraph (Compact Description) */}
              <p className="text-sm sm:text-base text-[#071B49]/90 font-semibold leading-relaxed mb-5 max-w-lg">
                High-quality, reliable and efficient solar products from trusted global brands to deliver maximum savings and long-term performance.
              </p>

              {/* 4 Feature Badges in horizontal row */}
              <div className="flex flex-wrap gap-2 max-w-xl">
                {[
                  { label: 'Trusted Global Brands', icon: ShieldCheck, color: 'text-[#239B35]', bg: 'bg-[#239B35]/15' },
                  { label: '22.8% Cell Efficiency', icon: Zap, color: 'text-[#0866C6]', bg: 'bg-[#0866C6]/15' },
                  { label: 'Long Durability', icon: Award, color: 'text-[#239B35]', bg: 'bg-[#70D943]/20' },
                  { label: 'Smart App Monitoring', icon: Smartphone, color: 'text-[#0866C6]', bg: 'bg-[#0866C6]/15' },
                ].map(({ label, icon: Icon, color, bg }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-white/80 shadow-sm"
                  >
                    <div className={`w-5 h-5 rounded-lg ${bg} ${color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-black text-[#071B49] whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* MOBILE ONLY: Hero image on mobile screens (< lg) with blended edges */}
            <div className="lg:hidden w-full mt-4">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-slate-200">
                <img
                  src="/images/project-hero-house.jpg"
                  alt="Premium Residential Rooftop Solar Panels and Modern Home"
                  className="w-full h-[260px] sm:h-[320px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B49]/30 to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Seamless Blend from Sky Banner to White Product Catalog (Zero Cut Line) */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-36 bg-gradient-to-b from-transparent via-white/70 to-white pointer-events-none z-10" />
      </div>

      {/* ═══════════════════════════════════════════════
          2. EXPANSIVE PRODUCT CATALOG GRID (WIDE 1440PX)
      ═══════════════════════════════════════════════ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="max-w-3xl text-left mb-10">
          <div className="inline-flex items-center gap-2 text-[#239B35] text-xs font-black tracking-widest uppercase font-stylish mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>CERTIFIED COMPONENT PORTFOLIO</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#071B49] tracking-tight font-stylish">
            Explore Our Comprehensive Solar Hardware Suite
          </h3>
          <p className="text-base sm:text-lg text-slate-700 font-semibold leading-relaxed mt-2">
            Every component is vetted for maximum degradation resistance, safety compliance, and peak power density.
          </p>
        </div>

        {/* 6 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {products.map((prod, index) => {
            const Icon = prod.icon;
            return (
              <motion.article
                key={prod.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col bg-white rounded-3xl border-2 border-slate-300 shadow-md hover:shadow-2xl hover:border-[#239B35] transition-all duration-300 overflow-hidden"
              >
                {/* Real High-Resolution Product Photo */}
                <div className="relative w-full h-56 bg-slate-100 overflow-hidden border-b-2 border-slate-200">
                  <img
                    src={prod.img}
                    alt={prod.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 pointer-events-none" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#071B49] text-xs font-bold flex items-center gap-1.5 shadow-md border border-slate-200">
                    <Icon className="w-3.5 h-3.5 text-[#0866C6]" />
                    <span>{prod.title}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-6 text-left">
                  <h4 className="text-xl sm:text-2xl font-black text-[#071B49] tracking-tight mb-2 group-hover:text-[#0866C6] transition-colors leading-snug font-stylish">
                    {prod.title}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed mb-4 flex-1">
                    {prod.desc}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 mb-6 pt-3 border-t-2 border-slate-100">
                    {prod.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2 text-sm font-extrabold text-[#071B49]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#239B35] shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={onOpenQuoteModal}
                    className="w-full py-3.5 px-4 rounded-xl bg-slate-50 hover:bg-[#239B35] text-[#071B49] hover:text-white font-black text-sm flex items-center justify-center gap-2 transition-all duration-300 border-2 border-slate-300 hover:border-[#239B35]"
                  >
                    <span>Inquire for Custom Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Hardware Consultation Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-slate-300 bg-gradient-to-r from-white via-sky-50/40 to-emerald-50/40 p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="text-left max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 text-[#239B35] text-xs font-black tracking-widest uppercase font-stylish">
              <ShieldCheck className="w-4 h-4" />
              <span>CUSTOM COMMERCIAL &amp; INDUSTRIAL PROCUREMENT</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#071B49] tracking-tight font-stylish">
              Need Bulk Solar Inverters, Panels or Custom Racking?
            </h3>
            <p className="text-base sm:text-lg text-slate-700 font-semibold leading-relaxed">
              Contact our supply-chain engineering desk for wholesale pricing, delivery schedules, and warranty SLA packages.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0 w-full lg:w-auto">
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="px-7 py-4 rounded-full bg-[#0866C6] hover:bg-[#0756a8] text-white font-black text-base shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Get Hardware Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/919600281759?text=Hello%20Solar%20Arise!%20I%20am%20interested%20in%20solar%20hardware%20pricing."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-full bg-white border-2 border-[#25D366]/40 text-[#071B49] hover:border-[#25D366] hover:text-[#25D366] font-black text-base transition-all flex items-center justify-center gap-2.5 shadow-sm"
            >
              <WhatsAppLogo className="w-5 h-5 shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </motion.div>

      </div>

      {/* Seamless Transition into Contact Section (Zero Cut Line) */}
      <div className="w-full h-16 sm:h-24 bg-gradient-to-b from-white to-slate-100/70 pointer-events-none" />
    </section>
  );
}
