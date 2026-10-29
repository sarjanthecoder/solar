import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Zap,
  Leaf,
  MapPin,
  Search,
  Filter,
  ArrowRight,
  Home,
  Building2,
  Factory,
  CheckCircle,
  Sparkles,
  MessageCircle,
  Layers,
  X,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

const PROJECTS_DATA = [
  {
    id: 1,
    category: 'residential',
    categoryLabel: 'Residential',
    capacity: '5 kW',
    location: 'Coimbatore, Tamil Nadu',
    title: 'Residential Rooftop Solar',
    description: 'Clean and affordable solar energy with net-metering for a modern luxury villa.',
    image: '/images/project-residential-coimbatore.jpg',
    alt: 'Residential rooftop solar installation in Coimbatore',
    icon: Home,
    annualSavings: '₹72,000 / year',
    panels: 'Mono PERC Bifacial (550W)',
    completionDate: 'March 2026',
    co2Offset: '6.2 Tons / Year',
  },
  {
    id: 2,
    category: 'commercial',
    categoryLabel: 'Commercial',
    capacity: '100 kW',
    location: 'Chennai, Tamil Nadu',
    title: 'Commercial Solar Installation',
    description: 'Drastically reduced peak commercial tariff costs with zero downtime engineering.',
    image: '/images/project-commercial-chennai.jpg',
    alt: 'Commercial solar installation on modern office in Chennai',
    icon: Building2,
    annualSavings: '₹14,50,000 / year',
    panels: 'Tier-1 High-Efficiency Arrays',
    completionDate: 'January 2026',
    co2Offset: '124 Tons / Year',
  },
  {
    id: 3,
    category: 'industrial',
    categoryLabel: 'Industrial',
    capacity: '1 MW',
    location: 'Hosur, Tamil Nadu',
    title: 'Industrial Solar Plant',
    description: 'Megawatt-scale captive power plant powering manufacturing operations round the clock.',
    image: '/images/project-industrial-hosur.jpg',
    alt: 'Industrial warehouse rooftop solar plant in Hosur',
    icon: Factory,
    annualSavings: '₹1.2 Crore / year',
    panels: 'Megawatt Grid-Tie Infrastructure',
    completionDate: 'December 2025',
    co2Offset: '1,280 Tons / Year',
  },
  {
    id: 4,
    category: 'residential',
    categoryLabel: 'Residential',
    capacity: '8 kW',
    location: 'Erode, Tamil Nadu',
    title: 'Residential Solar Project',
    description: 'Smart hybrid solar array with lithium battery backup and 100% self-reliance.',
    image: '/images/project-residential-4.jpg',
    alt: 'Luxury villa rooftop solar system in Erode',
    icon: Home,
    annualSavings: '₹1,15,000 / year',
    panels: 'Smart Micro-Inverter System',
    completionDate: 'February 2026',
    co2Offset: '9.8 Tons / Year',
  },
];

export default function ProjectsSection({ onOpenQuoteModal }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((proj) => {
      const matchesCategory = activeFilter === 'all' || proj.category === activeFilter;
      const matchesSearch =
        proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-white text-[#071B49] scroll-mt-28"
      aria-label="Solar Arise Projects Section"
    >
      {/* ═══════════════════════════════════════════════
          1. SKY & NATURE BANNER: 3D TEXT & BLENDED REALISTIC PHOTO (LIKE SERVICES)
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
            src="/images/project-hero-luxury-villa.jpg"
            alt="Modern Luxury Eco-Villa with Rooftop Solar Panels"
            className="w-full h-full object-cover object-[30%_center] xl:object-center transform scale-[1.01]"
            loading="eager"
          />
        </div>

        {/* ── Banner Content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-14 lg:py-16 w-full">
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#239B35]/40 text-[#239B35] text-[11px] font-black font-modular tracking-widest uppercase mb-4 shadow-sm backdrop-blur-md">
                <Leaf className="w-3.5 h-3.5 fill-[#239B35]" />
                <span>OUR PROJECTS</span>
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
                    fontSize: 'clamp(58px, 9.5vw, 100px)',
                  };
                  const shadow = (color) =>
                    `2px 2px 0 ${color}cc, 3px 3px 0 ${color}88, 4px 4px 6px rgba(0,0,0,0.25)`;
                  return (
                    <>
                      {/* Line 1: Real Projects (blue) */}
                      <h2 style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#00AAEE',
                          textShadow: shadow('#0077CC'),
                        }}>Real</span>
                      </h2>
                      <p style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#00AAEE',
                          textShadow: shadow('#0077CC'),
                        }}>Projects</span>
                      </p>

                      {/* Line 2: Real Impact (green) */}
                      <p style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#1DBF2E',
                          textShadow: shadow('#0E8A1C'),
                        }}>Real</span>
                      </p>
                      <p style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#1DBF2E',
                          textShadow: shadow('#0E8A1C'),
                        }}>Impact</span>
                      </p>
                    </>
                  );
                })()}
              </div>

              {/* Subtitle */}
              <h3 className="text-xl sm:text-2xl font-black text-[#071B49] tracking-tight mb-2.5 font-display-modular">
                Successful Solar Installations Across Homes, Businesses &amp; Industries
              </h3>

              {/* Paragraph */}
              <p className="text-sm sm:text-base text-[#071B49]/90 font-semibold leading-relaxed mb-6 max-w-lg">
                Explore our completed solar projects and see how we are helping customers save electricity, reduce costs and build a greener future.
              </p>

              {/* 4 Feature Badges in horizontal row */}
              <div className="flex flex-wrap gap-2.5 max-w-xl">
                {[
                  { label: '500+ Happy Customers', icon: Users, color: 'text-[#0866C6]', bg: 'bg-[#0866C6]/15' },
                  { label: '10+ MW Installed Capacity', icon: Zap, color: 'text-[#239B35]', bg: 'bg-[#239B35]/15' },
                  { label: '30-90% Bill Savings', icon: Leaf, color: 'text-[#239B35]', bg: 'bg-[#70D943]/20' },
                  { label: 'Tamil Nadu Certified', icon: CheckCircle, color: 'text-[#0866C6]', bg: 'bg-[#0866C6]/15' },
                ].map(({ label, icon: Icon, color, bg }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border border-white/80 shadow-sm"
                  >
                    <div className={`w-6 h-6 rounded-lg ${bg} ${color} flex items-center justify-center shrink-0`}>
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
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="/images/project-hero-luxury-villa.jpg"
                  alt="Modern Luxury Eco-Villa with Rooftop Solar Panels"
                  className="w-full h-[260px] sm:h-[320px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B49]/30 to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Seamless Blend from Sky Banner to White Showcase Grid (Zero Cut Line) */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-36 bg-gradient-to-b from-transparent via-white/70 to-white pointer-events-none z-10" />
      </div>

      {/* ═══════════════════════════════════════════════
          2. EXPANSIVE SHOWCASE GRID (WIDE 1440PX)
      ═══════════════════════════════════════════════ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">

        {/* Filter and Search Bar */}
        <div className="mb-10 p-3 rounded-2xl bg-slate-50 border-2 border-slate-300 shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: 'all', label: 'All Projects', Icon: Layers },
              { key: 'residential', label: 'Residential', Icon: Home },
              { key: 'commercial', label: 'Commercial', Icon: Building2 },
              { key: 'industrial', label: 'Industrial', Icon: Factory },
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveFilter(key)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  activeFilter === key
                    ? 'bg-[#239B35] text-white shadow-md'
                    : 'bg-white text-[#071B49] hover:bg-slate-100 border-2 border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, capacity, or type..."
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border-2 border-slate-300 text-xs sm:text-sm font-bold text-[#071B49] focus:outline-none focus:ring-2 focus:ring-[#239B35] focus:border-[#239B35] placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className="px-3.5 py-2.5 rounded-xl bg-[#239B35]/10 text-[#239B35] hover:bg-[#239B35] hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* 4 Expansive Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const Icon = project.icon;
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col bg-white rounded-3xl border-2 border-slate-300 shadow-md hover:shadow-2xl hover:border-[#0866C6] transition-all duration-300 overflow-hidden"
                >
                  {/* Project Image */}
                  <div className="relative w-full h-52 bg-slate-100 overflow-hidden border-b-2 border-slate-200">
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

                    {/* Category pill */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#071B49] text-xs font-bold flex items-center gap-1.5 shadow-md border border-slate-200">
                      <Icon className="w-3.5 h-3.5 text-[#0866C6]" />
                      <span>{project.categoryLabel}</span>
                    </div>

                    {/* Capacity pill */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#071B49]/90 text-white text-xs font-extrabold shadow border border-white/20">
                      {project.capacity}
                    </div>

                    {/* Location */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#70D943]" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col flex-1 p-5">
                    <h4 className="text-lg sm:text-xl font-black text-[#071B49] tracking-tight mb-2 group-hover:text-[#0866C6] transition-colors leading-snug font-stylish">
                      {project.title}
                    </h4>
                    <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Key Spec Badge */}
                    <div className="mb-4 p-3 rounded-xl bg-slate-50 border-2 border-slate-200 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-600 font-bold">Annual Savings:</span>
                      <span className="font-black text-[#239B35] text-sm sm:text-base">{project.annualSavings}</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#071B49] group-hover:text-[#239B35] transition-colors"
                      >
                        <span>View Project Specs</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#239B35]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="w-8 h-8 rounded-full bg-slate-100 text-[#0866C6] group-hover:bg-[#239B35] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                        aria-label={`View specs of ${project.title}`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Consultation Callout Banner */}
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
              <span>TURNKEY SOLAR EPC CONTRACTOR</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#071B49] tracking-tight font-stylish">
              Ready to Power Your Rooftop with Solar Arise?
            </h3>
            <p className="text-base sm:text-lg text-slate-700 font-semibold leading-relaxed">
              Book a complimentary engineering site inspection with shading analysis and an exact financial ROI simulation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0 w-full lg:w-auto">
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="px-7 py-4 rounded-full bg-[#239B35] hover:bg-[#1e842d] text-white font-black text-base shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Get Free Site Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/919600281759?text=Hello%20Solar%20Arise!%20I%20want%20to%20schedule%20a%20site%20visit."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-full bg-white border-2 border-slate-300 text-[#071B49] hover:border-[#239B35] hover:text-[#239B35] font-black text-base transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#239B35]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </motion.div>

      </div>

      {/* Seamless Transition into Subsidy Section (Zero Cut Line) */}
      <div className="w-full h-16 sm:h-24 bg-gradient-to-b from-white to-[#dcf0ff]/40 pointer-events-none" />

      {/* ═══════════════════════════════════════════════
          PROJECT DETAIL MODAL
      ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-[#071B49]/65 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border-2 border-slate-300"
            >
              <div className="relative h-64 sm:h-72 w-full bg-slate-100">
                <img src={selectedProject.image} alt={selectedProject.alt} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#0866C6] text-white text-xs font-bold">
                    {selectedProject.categoryLabel}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#239B35] text-white text-xs font-bold">
                    {selectedProject.capacity}
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#239B35]" />
                  <span>{selectedProject.location}</span>
                </div>
                <h3 className="text-2xl font-black text-[#071B49] mb-2 font-stylish">{selectedProject.title}</h3>
                <p className="text-sm text-slate-600 mb-6">{selectedProject.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500">Annual Savings</div>
                    <div className="text-sm font-extrabold text-[#239B35]">{selectedProject.annualSavings}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500">Panels</div>
                    <div className="text-sm font-extrabold text-[#071B49]">{selectedProject.panels}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500">Carbon Offset</div>
                    <div className="text-sm font-extrabold text-[#0866C6]">{selectedProject.co2Offset}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      onOpenQuoteModal();
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-[#239B35] hover:bg-[#1e842d] text-white font-bold text-sm shadow-md"
                  >
                    Request Similar Installation
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#071B49] font-semibold text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}