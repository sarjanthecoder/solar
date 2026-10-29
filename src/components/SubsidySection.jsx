import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Zap,
  Home,
  IndianRupee,
  ShieldCheck,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  Building,
  UserCheck,
  FolderCheck,
  ClipboardCheck,
  Send,
  MessageCircle,
} from 'lucide-react';

export default function SubsidySection({ onOpenQuoteModal, onOpenExpertModal }) {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      qEn: 'What is PM Surya Ghar & Tamil Nadu Subsidy?',
      qTa: 'பிஎம் சூர்ய கர் மற்றும் தமிழ்நாடு அரசு மானியம் என்றால் என்ன?',
      aTa: 'பிஎம் சூர்ய கர் (மத்திய அரசு) மற்றும் தமிழ்நாடு அரசு இணைந்து, 3 kW வரையிலான வீட்டு சோலார் அமைப்புகளுக்கு அதிகபட்சமாக ₹98,000 முதல் ₹1,00,000 வரை நேரடி மானியம் வழங்குகிறது (மத்திய அரசு ₹78,000 + தமிழக அரசு ₹20,000–₹22,000).',
      aEn: 'PM Surya Ghar (Central Govt.) combined with Tamil Nadu State subsidy provides up to ₹98,000 to ₹1,00,000 direct financial subsidy credited straight into your bank account for 3 kW residential rooftop installations.',
    },
    {
      qEn: 'How is the subsidy paid to the customer?',
      qTa: 'மானியத் தொகை வாடிக்கையாளருக்கு எவ்வாறு வழங்கப்படும்?',
      aTa: 'சோலார் அமைத்து TANGEDCO நெட்-மீட்டர் ஆய்வு முடிந்தவுடன், மத்திய மற்றும் மாநில அரசு மானியத் தொகை உங்கள் வங்கிக் கணக்கில் DBT (Direct Benefit Transfer) முறையில் நேரடியாக வரவு வைக்கப்படும். எந்தவித இடைத்தரகர்களும் கிடையாது.',
      aEn: 'The government subsidy is credited directly to your registered bank account via Direct Benefit Transfer (DBT) upon TANGEDCO net-meter installation and grid inspection. No middlemen or deductions.',
    },
    {
      qEn: 'What are the benefits for Commercial & Industrial businesses?',
      qTa: 'வணிக மற்றும் தொழிற்சாலைகளுக்கான பலன்கள் என்ன?',
      aTa: 'மாதம் ₹1 லட்சம் முதல் ₹2 லட்சம் வரை மின் கட்டணம் செலுத்தும் வணிக நிறுவனங்கள், சோலார் அமைப்பதன் மூலம் அடுத்த மாதத்திலிருந்தே 60% முதல் 70% வரை மின்கட்டணத்தைக் குறைக்கலாம். மேலும் 100% Accelerated Depreciation (துரிதப்படுத்தப்பட்ட தேய்மானச் சலுகை) மூலம் 3 ஆண்டுகளில் முழு முதலீட்டையும் திரும்பப் பெறலாம்.',
      aEn: 'Commercial enterprises spending ₹1 Lakh to ₹2 Lakhs/month reduce power bills by 60% to 70% from next month. With 100% accelerated tax depreciation, the entire capital investment is fully recovered within 3 years.',
    },
    {
      qEn: 'Are Bank Loan and EMI options available?',
      qTa: 'வங்கிக் கடன் மற்றும் எளிய தவணை (EMI) வசதிகள் உள்ளதா?',
      aTa: 'ஆம்! சோலார் அரைஸ் (Solar Arise) நிறுவனம் முன்னணி தேசிய மற்றும் தனியார் வங்கிகள் மூலம் குறைந்த வட்டியில் எளிய EMI மற்றும் கடன் வசதிகளை, அனைத்து ஆவணப் பணிகளுடன் முழுமையாக செய்து தருகிறது.',
      aEn: 'Yes! Solar Arise provides complete end-to-end bank loan processing and low-interest EMI assistance through leading nationalized and private banks with minimal paperwork.',
    },
    {
      qEn: 'How does On-Grid net-metering reduce bills up to 100%?',
      qTa: 'நெட்-மீட்டரிங் முறையில் மின்கட்டணம் எவ்வாறு 100% குறைகிறது?',
      aTa: 'பகல் நேரத்தில் சோலார் தயாரிக்கும் மின்சாரத்தை உங்கள் பயன்பாட்டிற்குப் பிறகு மீதமுள்ளதை TANGEDCO மின்கட்டமைப்பிற்கு (Grid) அனுப்பலாம். இரவு நேரத்தில் நீங்கள் எடுக்கும் மின்சாரத்தில் இந்த யூனிட்டுகள் கழிக்கப்பட்டு மின்கட்டணம் பூஜ்ஜியமாகவோ அல்லது மிகக் குறைவாகவோ வரும்.',
      aEn: 'Solar panels power your property during the day. Any surplus electricity is automatically exported to the TANGEDCO grid via bi-directional net-meter. Night usage is offset against exported units, reducing bills up to 100%.',
    },
    {
      qEn: 'Who is eligible for the residential subsidy?',
      qTa: 'வீட்டு சோலார் மானியம் பெற யாருக்கு தகுதி உள்ளது?',
      aTa: 'சொந்த வீடு வைத்திருக்கும் இந்தியக் குடிமக்கள், தங்கள் பெயரில் பயன்பாட்டில் உள்ள வீட்டு மின் இணைப்பு (Domestic Tariff LT-1A) மற்றும் நிழல் படாத மொட்டை மாடி வைத்திருப்போர் அனைவரும் மானியம் பெற முழு தகுதியுடையவர்கள்.',
      aEn: 'Any individual homeowner with clear shadow-free rooftop space and an active domestic TANGEDCO electricity service connection (Tariff LT-1A) registered in their name is fully eligible.',
    },
  ];

  return (
    <section
      id="subsidy"
      className="relative w-full overflow-hidden bg-white text-[#071B49] scroll-mt-28"
      aria-label="Government Solar Subsidy Guide"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. SKY & NATURE BANNER: FULL SCREEN WITH REAL CSS 3D TITLE
      ───────────────────────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] flex items-center"
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

        {/* RIGHT: Blended Architectural Hero Photo */}
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
            src="/images/subsidy-hero-indian-villa.jpg"
            alt="Authentic Indian Residential Villa with Rooftop Solar Panels"
            className="w-full h-full object-cover object-[30%_center] xl:object-center transform scale-[1.01]"
            loading="eager"
          />
        </div>

        {/* Banner Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* LEFT: Heading, 3D Headline, Description & Feature Badges */}
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
                <span>GOVERNMENT SUBSIDY</span>
                <span className="text-[#239B35]/60">→</span>
              </div>

              {/* 3D Glossy Headline — Real Times New Roman CSS text */}
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
                      {/* Line 1: Government (blue) */}
                      <h2 style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#00AAEE',
                          textShadow: shadow('#0077CC'),
                        }}>Government</span>
                      </h2>

                      {/* Line 2: Solar (green) */}
                      <p style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#1DBF2E',
                          textShadow: shadow('#0E8A1C'),
                        }}>Solar</span>
                      </p>

                      {/* Line 3: Subsidy (green) */}
                      <p style={{ ...base }} className="m-0 p-0">
                        <span style={{
                          color: '#1DBF2E',
                          textShadow: shadow('#0E8A1C'),
                        }}>Subsidy</span>
                      </p>
                    </>
                  );
                })()}
              </div>

              {/* Subtitle */}
              <h3 className="text-lg sm:text-xl font-extrabold text-[#071B49] tracking-tight mb-2.5 font-display-modular leading-snug">
                Make Solar More Affordable with PM Surya Ghar
              </h3>

              {/* Paragraph */}
              <p className="text-sm text-[#071B49]/80 font-medium leading-relaxed mb-6 max-w-lg">
                Take advantage of government schemes and direct bank subsidies to install solar panels at a lower cost and start saving on your electricity bills today.
              </p>

              {/* 4 Feature Badges in horizontal row */}
              <div className="flex flex-wrap gap-2 max-w-xl">
                {[
                  { label: 'Up to ₹1,00,000 Total Subsidy', icon: IndianRupee, color: 'text-[#239B35]', bg: 'bg-[#239B35]/15' },
                  { label: 'Direct Bank Account Credit', icon: Zap, color: 'text-[#0866C6]', bg: 'bg-[#0866C6]/15' },
                  { label: 'Bank Loan & EMI Available', icon: ShieldCheck, color: 'text-[#239B35]', bg: 'bg-[#239B35]/15' },
                  { label: 'TANGEDCO Net-Metering Approved', icon: Leaf, color: 'text-[#0866C6]', bg: 'bg-[#0866C6]/15' },
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
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="/images/subsidy-hero-indian-villa.jpg"
                  alt="Authentic Indian Residential Villa with Rooftop Solar Panels"
                  className="w-full h-[260px] sm:h-[320px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B49]/30 to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Seamless Blend from Sky Banner to #F8FAFD Content Section (Zero Cut Line) */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-36 bg-gradient-to-b from-transparent via-[#F8FAFD]/70 to-[#F8FAFD] pointer-events-none z-10" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. STUNNING BILINGUAL SUBSIDY INFO SECTION (TAMIL & ENGLISH)
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#F8FAFD] py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section Header ── */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#239B35]/10 border border-[#239B35]/30 text-[#239B35] text-xs font-black uppercase tracking-widest mb-4">
              <IndianRupee className="w-3.5 h-3.5" />
              PM SURYA GHAR — GOVT. OF INDIA + TAMIL NADU
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#071B49] tracking-tight mb-2">
              Subsidy You Actually Receive
            </h2>
            <div className="text-base sm:text-lg font-bold text-[#239B35] mb-3">
              உங்களுக்குக் கிடைக்கும் அரசு மானியம் (மத்திய அரசு + தமிழ்நாடு அரசு)
            </div>
            <p className="text-sm sm:text-base text-slate-500 font-medium max-w-2xl mx-auto">
              Central Government + Tamil Nadu State combined subsidy — directly credited to your bank account via DBT. No middlemen.
            </p>
          </div>

          {/* ── TOP ROW: Subsidy Slabs + Eligibility + Documents ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

            {/* CARD A — Subsidy Slabs */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between">
              <div>
                {/* Card Header */}
                <div className="bg-gradient-to-r from-[#239B35] to-[#1a7a28] px-6 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-black text-sm">PM Surya Ghar + TN State</div>
                    <div className="text-white/80 text-xs font-semibold">Residential Rooftop Subsidy / வீட்டு சோலார் மானியம்</div>
                  </div>
                </div>

                {/* Subsidy Rows */}
                <div className="p-5 space-y-3">
                  {[
                    { kw: '1 kW', central: '₹30,000', state: '₹5,000', total: '₹35,000', tier: 'Basic / அடிப்படை' },
                    { kw: '2 kW', central: '₹60,000', state: '₹10,000', total: '₹70,000', tier: 'Standard / நடுத்தர' },
                    { kw: '3 kW+', central: '₹78,000', state: '₹22,000', total: '₹1,00,000', tier: 'Maximum / அதிகபட்சம்', highlight: true },
                  ].map(({ kw, central, state, total, tier, highlight }) => (
                    <div
                      key={kw}
                      className={`rounded-2xl p-4 flex items-center justify-between border ${
                        highlight
                          ? 'bg-[#239B35]/8 border-[#239B35]/40 shadow-sm'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xl font-black ${highlight ? 'text-[#239B35]' : 'text-[#071B49]'}`}>{total}</span>
                          {highlight && (
                            <span className="text-[10px] font-extrabold bg-[#239B35] text-white px-2 py-0.5 rounded-full uppercase">Max</span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 font-semibold mt-0.5">
                          {kw} • Central {central} + TN {state}
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${highlight ? 'bg-[#239B35]/15 text-[#239B35]' : 'bg-slate-200 text-slate-600'}`}>
                        {tier}
                      </span>
                    </div>
                  ))}

                  <div className="pt-2 text-xs text-slate-500 leading-relaxed font-medium">
                    ✓ Subsidy credited directly to bank via <strong>DBT</strong> — no deduction from Solar Arise. Bank Loan &amp; EMI available.
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="w-full py-3 rounded-2xl bg-[#239B35] hover:bg-[#1a7a28] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <IndianRupee className="w-4 h-4" />
                  <span>Claim My Solar Subsidy / மானியம் பெறுங்கள்</span>
                </button>
              </div>
            </div>

            {/* CARD B — Eligibility Criteria (Bilingual) */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-[#0866C6] to-[#064e9a] px-6 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-black text-sm">Eligibility Criteria</div>
                  <div className="text-white/80 text-xs font-semibold">தகுதி வரம்புகள் (Who can apply?)</div>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {[
                  { label: 'Indian Resident Citizen', ta: 'இந்தியக் குடியுரிமை பெற்றவர்', sub: 'Valid Aadhaar / PAN card' },
                  { label: 'Own Residential Home', ta: 'சொந்த வீடு மற்றும் மொட்டை மாடி', sub: 'Clear rooftop with no heavy shading' },
                  { label: 'Active Domestic EB Connection', ta: 'வீட்டு மின் இணைப்பு (LT-1A)', sub: 'Consumer number in your name' },
                  { label: 'Grid-Tie Feasibility Approved', ta: 'TANGEDCO நெட்-மீட்டரிங் அனுமதி', sub: 'Empanelled vendor Solar Arise handles' },
                  { label: 'First-Time Subsidy Applicant', ta: 'முதல் முறை மானியம் பெறுவோர்', sub: 'No prior solar subsidy claimed' },
                ].map(({ label, ta, sub }) => (
                  <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-[#0866C6]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0866C6]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#071B49] leading-tight">{label}</div>
                      <div className="text-xs font-semibold text-[#239B35] mt-0.5">{ta}</div>
                      <div className="text-[11px] text-slate-400 font-medium mt-0.5">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD C — Documents Required (Bilingual) */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-[#7C3AED] to-[#6025C9] px-6 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <FolderCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-black text-sm">Documents Required</div>
                  <div className="text-white/80 text-xs font-semibold">தேவையான ஆவணங்கள் (Checklist)</div>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {[
                  { label: 'Aadhaar Card', ta: 'ஆதார் அட்டை', sub: 'Original + photocopy of connection owner', icon: UserCheck },
                  { label: 'Latest EB Bill', ta: 'சமீபத்திய மின் கட்டண ரசீது', sub: 'Last 3 months electricity bill copy', icon: Zap },
                  { label: 'Property Tax Receipt', ta: 'சொத்து வரி ரசீது', sub: 'Current year paid tax receipt', icon: Home },
                  { label: 'Bank Passbook / Cheque', ta: 'வங்கி கணக்கு புத்தகம்', sub: 'For direct DBT subsidy credit to your account', icon: Building },
                  { label: 'Passport Size Photo', ta: 'பாஸ்போர்ட் அளவு புகைப்படம்', sub: '2 recent colour photographs', icon: ClipboardCheck },
                ].map(({ label, ta, sub, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#7C3AED]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#071B49] leading-tight">{label}</div>
                      <div className="text-xs font-semibold text-[#7C3AED] mt-0.5">{ta}</div>
                      <div className="text-[11px] text-slate-400 font-medium mt-0.5">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── FAQ ROW: FULLY BILINGUAL IN TAMIL & ENGLISH ── */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-lg font-black text-[#071B49]">
                  Frequently Asked Questions / அடிக்கடி கேட்கப்படும் கேள்விகள்
                </div>
                <div className="text-xs text-slate-500 font-semibold">
                  Everything you need to know about solar subsidy in Tamil &amp; English
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {faqs.map(({ qEn, qTa, aTa, aEn }, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={qEn} className="rounded-2xl border border-slate-200 overflow-hidden bg-white hover:border-[#239B35]/40 transition-colors">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full px-5 py-4 text-left flex items-start justify-between gap-3 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <span className="text-sm font-bold text-[#071B49] leading-snug block">
                          {qEn}
                        </span>
                        <span className="text-xs font-semibold text-[#239B35] block">
                          {qTa}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 mt-1 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#239B35]' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-5 pb-5 text-sm leading-relaxed border-t border-slate-100 bg-[#F9FBFC]"
                        >
                          <div className="pt-3 space-y-3">
                            {/* Tamil Answer */}
                            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#239B35] mb-1 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#239B35]" />
                                தமிழ் விளக்கம் (Tamil)
                              </div>
                              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                                {aTa}
                              </p>
                            </div>

                            {/* English Answer */}
                            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#0866C6] mb-1 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#0866C6]" />
                                English Details
                              </div>
                              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                                {aEn}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── COMMERCIAL BANNER (Clean Tamil & English) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #071B49 0%, #0a2260 50%, #071B49 100%)' }}
          >
            {/* Top accent line */}
            <div className="h-1 bg-gradient-to-r from-[#239B35] via-[#70D943] to-[#0866C6]" />

            <div className="p-8 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                {/* Left Content */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#70D943]/40 text-[#70D943] text-xs font-black uppercase tracking-wider">
                    <Building className="w-3.5 h-3.5" />
                    Commercial &amp; Industrial Solar — Up to 1 MW
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-2">
                      தொழில் நிறுவனங்களுக்கான சிறப்புச் சலுகைகள்
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-[#70D943] mb-3">
                      Exclusive Commercial &amp; Industrial Solar (Up to 1 MW)
                    </p>
                    <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-2xl mb-2">
                      மாதம் ₹1 லட்சம் முதல் ₹2 லட்சம் வரை மின்சாரக் கட்டணம் செலுத்தும் தொழில் நிறுவனங்கள் அடுத்த மாதத்திலிருந்தே{' '}
                      <strong className="text-[#70D943]">60% முதல் 70% வரை</strong> மின்கட்டணத்தை சேமிக்கலாம்.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-2xl">
                      Commercial enterprises spending ₹1L – ₹2L/month can slash power costs by 60%–70% starting next month with 100% capital recovery in 3 years via accelerated depreciation.
                    </p>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        value: '60%–70%',
                        label: 'மின்கட்டணக் குறைப்பு',
                        en: 'Power Bill Reduction',
                        sub: 'From next month / அடுத்த மாதமே',
                        color: 'text-[#70D943]',
                      },
                      {
                        value: '3 Years',
                        label: 'முழு மூலதன மீட்பு',
                        en: '100% Capital Recovery',
                        sub: 'Accelerated tax depreciation',
                        color: 'text-[#60A5FA]',
                      },
                      {
                        value: '100%',
                        label: 'நெட்-மீட்டரிங் பயன்',
                        en: 'Net-Metering Benefit',
                        sub: 'Zero EB bill possible',
                        color: 'text-amber-300',
                      },
                    ].map(({ value, label, en, sub, color }) => (
                      <div key={value} className="p-4 rounded-2xl bg-white/8 border border-white/12 backdrop-blur-sm">
                        <div className={`text-2xl sm:text-3xl font-black ${color}`}>{value}</div>
                        <div className="text-xs text-white font-bold mt-1">{label}</div>
                        <div className="text-[11px] text-[#70D943] font-semibold">{en}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{sub}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right CTA Card */}
                <div className="lg:col-span-4">
                  <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-md space-y-4 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#70D943]/20 border border-[#70D943]/40 flex items-center justify-center mx-auto">
                      <Building className="w-6 h-6 text-[#70D943]" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#70D943] uppercase tracking-wider mb-1">
                        ✓ Bank Loan &amp; EMI Available / வங்கிக் கடன் &amp; EMI
                      </div>
                      <div className="text-sm text-slate-100 font-bold">
                        Director T. Kathirvel &amp; Engineering Team
                      </div>
                      <div className="text-xs text-[#70D943] font-semibold mt-0.5">
                        இப்போதே நேரடி ஆலோசனைக்கு தொடர்பு கொள்ளுங்கள்
                      </div>
                    </div>
                    <div className="space-y-3">
                      <a
                        href="https://wa.me/919600281759?text=Hello%20Solar%20Arise!%20I%20am%20interested%20in%20Commercial%20/%20Industrial%20Solar%20Solutions."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-4 rounded-xl bg-[#239B35] hover:bg-[#1a7a28] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>WhatsApp Advisory / ஆலோசனை</span>
                      </a>
                      <a
                        href="tel:+919600281759"
                        className="w-full py-3 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Send className="w-4 h-4 text-[#70D943]" />
                        <span>+91 96002 81759</span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Seamless Transition into Why Choose Us Section (Zero Cut Line) */}
      <div className="w-full h-16 sm:h-24 bg-gradient-to-b from-[#F8FAFD] to-white pointer-events-none" />
    </section>
  );
}
