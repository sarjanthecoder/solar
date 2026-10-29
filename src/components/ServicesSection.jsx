import React from 'react';
import { motion } from 'framer-motion';
import {
  Leaf,
  Zap,
  Home,
  ShieldCheck,
  Building2,
  Factory,
  Layers,
  Sun,
  Wrench,
  BatteryCharging,
  ArrowRight,
  Droplets,
  CreditCard,
  Shield,
} from 'lucide-react';

export default function ServicesSection({ onOpenQuoteModal }) {
  const services = [
    {
      id: 1,
      title: 'Residential Solar (PM Surya Ghar)',
      desc: 'Up to ₹1 Lakh government subsidy (Central + State) directly credited to your bank account.',
      img: '/images/srv-gemini-residential.jpg',
      icon: Home,
      color: 'text-[#0866C6] bg-[#0866C6]/15',
    },
    {
      id: 2,
      title: 'Commercial Solar (Up to 1 MW)',
      desc: 'Reduce electricity bills by 60%–70% from next month with 100% accelerated depreciation in 3 years.',
      img: '/images/srv-gemini-commercial.jpg',
      icon: Building2,
      color: 'text-[#239B35] bg-[#239B35]/15',
    },
    {
      id: 3,
      title: 'On-Grid Solar Power Plants',
      desc: 'TANGEDCO net-metering feeds surplus power to the grid, reducing monthly bills up to 100%.',
      img: '/images/srv-ongrid-solar.jpg',
      icon: Zap,
      color: 'text-[#0866C6] bg-[#0866C6]/15',
    },
    {
      id: 4,
      title: 'MW Ground Mounted Plants',
      desc: 'Megawatt-scale ground installations for large industries, textile mills and commercial estates.',
      img: '/images/srv-gemini-industrial.jpg',
      icon: Factory,
      color: 'text-[#239B35] bg-[#239B35]/15',
    },
    {
      id: 5,
      title: 'Solar Water Pumps',
      desc: 'High-discharge agricultural and commercial solar water pumping solutions with zero diesel cost.',
      img: '/images/srv-offgrid-solar.jpg',
      icon: Droplets,
      color: 'text-[#0866C6] bg-[#0866C6]/15',
    },
    {
      id: 6,
      title: 'Solar Fencing Systems',
      desc: 'Reliable solar-powered boundary and crop security fencing for farms, estates, and industries.',
      img: '/images/srv-maintenance.jpg',
      icon: Shield,
      color: 'text-[#239B35] bg-[#239B35]/15',
    },
    {
      id: 7,
      title: 'Solar Hybrid & Batteries',
      desc: 'Tier-1 inverters, mono panels, and LiFePO4 batteries for 24/7 uninterrupted power storage.',
      img: '/images/srv-battery-storage.jpg',
      icon: BatteryCharging,
      color: 'text-[#0866C6] bg-[#0866C6]/15',
    },
    {
      id: 8,
      title: 'Bank Loan & Easy EMI',
      desc: 'Complete bank loan processing and easy monthly installment facilities with zero paperwork hassle.',
      img: '/images/srv-hybrid-solar.jpg',
      icon: CreditCard,
      color: 'text-[#239B35] bg-[#239B35]/15',
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-white text-[#071B49]"
      aria-label="Complete Solar Solutions Section"
    >
      {/* ═══════════════════════════════════════════════
          1. TOP BANNER: SEAMLESS BLENDED HERO WITH 3D TITLE
      ═══════════════════════════════════════════════ */}
      <div
        className="relative w-full overflow-hidden min-h-[460px] lg:min-h-[520px] flex items-center"
        style={{
          background:
            'linear-gradient(135deg, #dcf0ff 0%, #c8e6fc 18%, #bde0f8 35%, #caeeca 60%, #c0e8c0 78%, #d4f5d4 100%)',
        }}
      >
        {/* Bottom-edge blend — only at the very bottom of the banner to merge into card content below */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-white/80 to-transparent pointer-events-none z-20" />

        {/* Soft radial sky shimmer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 75% 55% at 50% 0%, rgba(135,206,250,0.55) 0%, transparent 70%)',
          }}
        />

        {/* RIGHT: Blended Architectural Hero Photo (Seamless alpha mask fade with zero middle cut line) */}
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
            src="/images/services-hero-tech-campus.jpg"
            alt="Sustainable Modern Commercial Solar Tech Campus with Rooftop Solar Panels"
            className="w-full h-full object-cover object-[30%_center] xl:object-center transform scale-[1.01]"
            loading="eager"
          />
        </div>

        {/* ── Banner Content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-14 lg:py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* LEFT: Heading, Description & Feature Badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 xl:col-span-6 text-left"
            >
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#239B35]/40 text-[#239B35] text-[11px] font-black font-modular tracking-widest uppercase mb-4 shadow-sm backdrop-blur-md">
                <Leaf className="w-3.5 h-3.5 fill-[#239B35]" />
                <span>OUR SERVICES</span>
                <span className="text-[#239B35]/60">→</span>
              </div>

              {/* 3D Glossy Headline — Real CSS text, same style as Hero */}
              <div className="mb-4 select-none">
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
                      {/* Line 1: Complete */}
                      <h2 style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#00AAEE',
                          textShadow: shadow('#0077CC'),
                        }}>Complete</span>
                      </h2>

                      {/* Line 2: Solar */}
                      <p style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#1DBF2E',
                          textShadow: shadow('#0E8A1C'),
                        }}>Solar</span>
                      </p>

                      {/* Line 3: Solutions */}
                      <p style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#1DBF2E',
                          textShadow: shadow('#0E8A1C'),
                        }}>Solutions</span>
                      </p>
                    </>
                  );
                })()}
              </div>

              {/* Subtitle */}
              <h3 className="text-xl sm:text-2xl font-black text-[#071B49] tracking-tight mb-3 font-display-modular leading-snug">
                for Homes, Businesses &amp; Industries
              </h3>

              {/* Paragraph */}
              <p className="text-base sm:text-lg text-[#071B49]/90 font-semibold leading-relaxed mb-6 max-w-xl">
                From custom engineering to seamless grid installation and maintenance, we provide end-to-end solar solutions tailored to your energy needs.
              </p>

              {/* 4 Feature Badges in horizontal row */}
              <div className="flex flex-wrap gap-2.5 max-w-xl">
                {[
                  { label: 'Clean & Renewable Energy', icon: Leaf, color: 'text-[#239B35]', bg: 'bg-[#239B35]/15' },
                  { label: 'Lower Electricity Bills', icon: Zap, color: 'text-[#0866C6]', bg: 'bg-[#0866C6]/15' },
                  { label: 'Increase Property Value', icon: Home, color: 'text-[#239B35]', bg: 'bg-[#239B35]/15' },
                  { label: 'Reliable After-Sales Support', icon: ShieldCheck, color: 'text-[#239B35]', bg: 'bg-[#239B35]/15' },
                ].map(({ label, icon: Icon, color, bg }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border border-white/80 shadow-sm"
                  >
                    <div className={`w-6 h-6 rounded-lg ${bg} ${color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-3.5 h-3.5" />
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
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="/images/services-hero-tech-campus.jpg"
                  alt="Sustainable Modern Commercial Solar Tech Campus"
                  className="w-full h-[260px] sm:h-[320px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B49]/30 to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Seamless Blend from Sky Banner to White Content Cards (Zero Cut Line) */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-36 bg-gradient-to-b from-transparent via-white/70 to-white pointer-events-none z-10" />
      </div>

      {/* ═══════════════════════════════════════════════
          2. MIDDLE SECTION: 8 SERVICE CARDS (EXPANSIVE WIDE GRID)
      ═══════════════════════════════════════════════ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#239B35]/10 border border-[#239B35]/20 text-[#239B35] text-xs font-black uppercase tracking-widest font-stylish mb-3.5">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>END-TO-END SOLAR EPC SERVICES</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#071B49] font-stylish tracking-tight leading-tight">
            Comprehensive Solar Systems for Every Requirement
          </h3>
          <p className="text-sm sm:text-base text-slate-600 font-medium font-body mt-2.5 max-w-2xl mx-auto leading-relaxed">
            Engineered with high-efficiency Tier-1 solar modules, smart inverters, and full MNRE government subsidy assistance.
          </p>
        </div>

        {/* Expansive 8-Card Grid with Large High-Res Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {services.map((srv, index) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                onClick={onOpenQuoteModal}
                className="group rounded-3xl p-4 sm:p-4.5 bg-white border-2 border-slate-300 shadow-lg hover:shadow-2xl hover:border-[#239B35] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Large High-Impact Photograph */}
                <div className="h-52 sm:h-56 w-full rounded-2xl overflow-hidden relative mb-4.5 bg-slate-100 shrink-0 shadow-inner border-2 border-slate-200/90">
                  <img
                    src={srv.img}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Category Pill Floating on Image */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center gap-2 border-2 border-white">
                    <div className={`w-5 h-5 rounded-md ${srv.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-black text-[#071B49] font-stylish tracking-wider uppercase">
                      Solar EPC
                    </span>
                  </div>

                  {/* Soft bottom vignette for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content & Typography */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Stylish Bold Title */}
                    <h4 className="text-xl sm:text-[1.3rem] font-black text-[#071B49] group-hover:text-[#0866C6] transition-colors font-stylish leading-tight mb-2.5">
                      {srv.title}
                    </h4>

                    {/* Readable, Bold, Stylish Description */}
                    <p className="text-sm sm:text-base text-slate-700 font-semibold font-body leading-relaxed mb-6">
                      {srv.desc}
                    </p>
                  </div>

                  {/* Interactive Action Bar */}
                  <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between mt-auto">
                    <span className="text-sm font-black text-[#239B35] font-stylish group-hover:text-[#1e842d] transition-colors">
                      Learn More
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#239B35]/15 text-[#239B35] group-hover:bg-[#239B35] group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-1 shadow-sm">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Seamless Transition into Projects Section (Zero Cut Line) */}
      <div className="w-full h-16 sm:h-24 bg-gradient-to-b from-white to-[#dcf0ff]/40 pointer-events-none" />
    </section>
  );
}
