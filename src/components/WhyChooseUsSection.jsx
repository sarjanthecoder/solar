import React from 'react';
import { motion } from 'framer-motion';
import {
  Leaf,
  Users,
  Zap,
  ShieldCheck,
  Award,
  Settings,
  FileCheck2,
  Wrench,
  Headphones,
  Sprout,
  ArrowRight,
  Home,
  MessageCircle,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function WhyChooseUsSection({ onOpenQuoteModal, onOpenExpertModal }) {
  const features = [
    {
      id: 1,
      title: 'Experienced Team',
      desc: 'Certified photovoltaic engineers and skilled technicians ensuring flawless execution.',
      img: '/images/why-real-1-team.jpg',
      icon: Users,
      color: 'text-[#0866C6] bg-[#0866C6]/15',
    },
    {
      id: 2,
      title: 'High-Quality Products',
      desc: 'Top-tier monocrystalline panels, smart inverters and certified mounting hardware.',
      img: '/images/why-real-2-products.jpg',
      icon: Award,
      color: 'text-[#239B35] bg-[#239B35]/15',
    },
    {
      id: 3,
      title: 'Customized Design',
      desc: '3D shadow-mapping and optimized structural layout tailored to your roof profile.',
      img: '/images/why-real-3-design.jpg',
      icon: Settings,
      color: 'text-[#0866C6] bg-[#0866C6]/15',
    },
    {
      id: 4,
      title: 'Warranty & Reliability',
      desc: '25-year linear performance warranty backed by direct manufacturer agreements.',
      img: '/images/why-real-4-warranty.jpg',
      icon: ShieldCheck,
      color: 'text-[#239B35] bg-[#239B35]/15',
    },
    {
      id: 5,
      title: 'Transparent Quotation',
      desc: 'Detailed itemized pricing with 100% clarity and zero hidden commissioning charges.',
      img: '/images/why-real-5-quote.jpg',
      icon: FileCheck2,
      color: 'text-[#0866C6] bg-[#0866C6]/15',
    },
    {
      id: 6,
      title: 'Professional Installation',
      desc: 'Strict adherence to MNRE, IEC and DISCOM safety and cabling compliance standards.',
      img: '/images/why-real-6-install.png',
      icon: Wrench,
      color: 'text-[#239B35] bg-[#239B35]/15',
    },
    {
      id: 7,
      title: 'After-Sales Support',
      desc: 'Dedicated Tamil Nadu service center providing rapid on-site troubleshooting.',
      img: '/images/why-real-7-support.png',
      icon: Headphones,
      color: 'text-[#0866C6] bg-[#0866C6]/15',
    },
    {
      id: 8,
      title: 'Sustainable Future',
      desc: 'Eliminate monthly power bills while contributing to a cleaner, greener planet.',
      img: '/images/why-real-8-future.png',
      icon: Sprout,
      color: 'text-[#239B35] bg-[#239B35]/15',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Site Visit',
      desc: 'Free physical site assessment & shadow analysis',
      icon: Home,
    },
    {
      num: '02',
      title: 'Customized Plan',
      desc: 'System sizing and itemized commercial quote',
      icon: FileCheck2,
    },
    {
      num: '03',
      title: 'Installation',
      desc: 'Turnkey certified installation within 3 to 7 days',
      icon: Wrench,
    },
    {
      num: '04',
      title: 'Testing & Net Metering',
      desc: 'DISCOM inspection and bi-directional meter setup',
      icon: Settings,
    },
    {
      num: '05',
      title: 'Ongoing AMC Support',
      desc: 'Regular panel maintenance & app monitoring',
      icon: Headphones,
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="relative w-full overflow-hidden bg-white text-[#071B49] scroll-mt-28"
      aria-label="Why Choose Solar Arise Section"
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
            src="/images/why-choose-hero-house.jpg"
            alt="Modern Eco Villa with Rooftop Solar Panels"
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
                <span>WHY CHOOSE US</span>
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
                    fontSize: 'clamp(58px, 9.5vw, 100px)',
                  };
                  const shadow = (color) =>
                    `2px 2px 0 ${color}cc, 3px 3px 0 ${color}88, 4px 4px 6px rgba(0,0,0,0.25)`;
                  return (
                    <>
                      {/* Line 1: Why (blue) */}
                      <h2 style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#00AAEE',
                          textShadow: shadow('#0077CC'),
                        }}>Why</span>
                      </h2>

                      {/* Line 2: Choose (green) */}
                      <p style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#1DBF2E',
                          textShadow: shadow('#0E8A1C'),
                        }}>Choose</span>
                      </p>

                      {/* Line 3: Solar (green) */}
                      <p style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#1DBF2E',
                          textShadow: shadow('#0E8A1C'),
                        }}>Solar</span>
                      </p>

                      {/* Line 4: Arise (green) */}
                      <p style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#1DBF2E',
                          textShadow: shadow('#0E8A1C'),
                        }}>Arise</span>
                      </p>
                    </>
                  );
                })()}
              </div>

              {/* Subtitle */}
              <h3 className="text-xl sm:text-2xl font-black text-[#071B49] tracking-tight mb-2.5 font-display-modular leading-snug">
                Your Trusted Partner for a Cleaner, Brighter Tomorrow
              </h3>

              {/* Paragraph */}
              <p className="text-base sm:text-lg text-[#071B49]/90 font-semibold leading-relaxed mb-6 max-w-xl">
                We deliver reliable, high-efficiency solar systems with certified photovoltaic engineers, professional turnkey installation and long-term 25-year support for homes, businesses and industries.
              </p>

              {/* 4 Feature Badges in horizontal row */}
              <div className="flex flex-wrap gap-2 max-w-xl">
                {[
                  { label: 'Experienced Team', icon: Users, color: 'text-[#0866C6]', bg: 'bg-[#0866C6]/15' },
                  { label: 'High-Quality Products', icon: Award, color: 'text-[#239B35]', bg: 'bg-[#239B35]/15' },
                  { label: '25-Year Warranty', icon: ShieldCheck, color: 'text-[#239B35]', bg: 'bg-[#70D943]/20' },
                  { label: 'Dedicated Support', icon: Headphones, color: 'text-[#0866C6]', bg: 'bg-[#0866C6]/15' },
                ].map(({ label, icon: Icon, color, bg }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border border-white/80 shadow-sm"
                  >
                    <div className={`w-5 h-5 rounded-lg ${bg} ${color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-black text-[#071B49] whitespace-nowrap">
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
                  src="/images/why-choose-hero-house.jpg"
                  alt="Modern Eco Villa with Rooftop Solar Panels"
                  className="w-full h-[260px] sm:h-[320px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B49]/30 to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Seamless Blend from Sky Banner to White Features Grid (Zero Cut Line) */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-36 bg-gradient-to-b from-transparent via-white/70 to-white pointer-events-none z-10" />
      </div>

      {/* ═══════════════════════════════════════════════
          2. EXPANSIVE 8-FEATURE CARDS (WIDE 1440PX)
      ═══════════════════════════════════════════════ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="max-w-3xl text-left mb-10">
          <div className="inline-flex items-center gap-2 text-[#239B35] text-xs font-black tracking-widest uppercase font-stylish mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>WHY TAMIL NADU CHOOSES SOLAR ARISE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#071B49] tracking-tight font-stylish">
            End-to-End Excellence Across Every Single Phase
          </h3>
          <p className="text-sm text-slate-600 font-medium leading-relaxed mt-1">
            We take pride in our workmanship, engineering rigor, and customer-first support philosophy.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col bg-white rounded-3xl border-2 border-slate-300 shadow-md hover:shadow-2xl hover:border-[#239B35] transition-all duration-300 overflow-hidden"
              >
                {/* Real High-Resolution Photo */}
                <div className="relative w-full h-48 bg-slate-100 overflow-hidden border-b-2 border-slate-200">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 pointer-events-none" />

                  {/* Icon Badge */}
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md text-[#0866C6] flex items-center justify-center shadow-md border border-slate-200">
                    <Icon className="w-5 h-5 text-[#239B35]" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-5 text-left">
                  <h4 className="text-lg sm:text-xl font-black text-[#071B49] tracking-tight mb-2 group-hover:text-[#0866C6] transition-colors leading-snug font-stylish">
                    {item.title}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed flex-1">
                    {item.desc}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* 5-Step Process Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border-2 border-slate-300 shadow-md">
          <div className="max-w-2xl text-left mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-[#071B49] tracking-tight font-stylish">
              Our Streamlined 5-Step Installation Flow
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-semibold mt-1.5 leading-relaxed">
              From the initial rooftop survey to seamless grid interconnection, we take care of everything.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {steps.map(({ num, title, desc, icon: StepIcon }) => (
              <div key={num} className="p-4 rounded-2xl bg-white border-2 border-slate-300 text-left hover:border-[#239B35] shadow-sm transition-all">
                <div className="w-8 h-8 rounded-xl bg-[#239B35]/10 text-[#239B35] flex items-center justify-center mb-3">
                  <StepIcon className="w-4 h-4" />
                </div>
                <div className="text-xs font-black text-[#239B35] font-stylish mb-1">{num}</div>
                <div className="text-sm font-black text-[#071B49] mb-1.5 leading-snug">{title}</div>
                <div className="text-xs sm:text-[13px] text-slate-600 font-semibold leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Seamless Transition into Solar Products Section (Zero Cut Line) */}
      <div className="w-full h-16 sm:h-24 bg-gradient-to-b from-white to-[#dcf0ff]/40 pointer-events-none" />
    </section>
  );
}
