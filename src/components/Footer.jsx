import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  X,
  FileText,
  CheckCircle2,
  PhoneCall,
  Landmark,
} from 'lucide-react';
import SolarAriseLogo from './SolarAriseLogo';
import { WhatsAppLogo, GmailLogo, PhoneDialerLogo, GoogleMapsLogo } from './BrandLogos';

const NAV = [
  { label: 'Home',                href: '#home' },
  { label: '3D Solar Experience', href: '#3d-solar-experience' },
  { label: 'Solar Services',      href: '#services' },
  { label: 'Completed Projects',  href: '#projects' },
  { label: 'Government Subsidy',  href: '#subsidy' },
  { label: 'Why Choose Us',       href: '#why-choose-us' },
  { label: 'Solar Products',      href: '#products' },
  { label: 'Contact Us',          href: '#contact' },
];

const SOLUTIONS = [
  { label: 'PM Surya Ghar Subsidy',         href: '#subsidy',         tag: '₹1L Max' },
  { label: 'On-Grid Net-Metering',          href: '#services',        tag: 'TANGEDCO' },
  { label: 'Commercial Solar (Up to 1 MW)', href: '#services',        tag: '1 MW' },
  { label: '3-Year Capital Recovery',       href: '#why-choose-us',   tag: 'ROI' },
  { label: 'Solar Water Pumps',             href: '#services',        tag: 'Agri' },
  { label: 'Solar Fencing Systems',         href: '#services',        tag: 'Farms' },
  { label: 'Bank Loan & Easy EMI',          href: '#subsidy',         tag: '0 Paper' },
];

export default function Footer({ onOpenQuoteModal, onOpenExpertModal }) {
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | 'guidelines' | null

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLegalModal(null);
    };
    if (legalModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [legalModal]);

  // Smooth scroll handler with fixed navbar offset
  const handleSmoothScroll = (e, href) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const isMobile = window.innerWidth < 1024;
        const headerOffset = isMobile ? 98 : 75;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        try {
          window.history.pushState(null, '', href);
        } catch (_) {}
      }
    }
  };

  return (
    <footer className="relative w-full bg-[#071B49] text-white overflow-hidden" aria-label="Solar Arise Footer">

      {/* Soft Ambient Blend Overlay (Zero Cut Line) */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#239B35]/30 to-transparent pointer-events-none" />

      {/* Subtle Ambient Radial Glow for High-Tech Depth */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[300px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(35, 155, 53, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* ── MAIN COLUMNS (Increased Spacing & Harmonized Colors) ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1.1fr_1.6fr_1.7fr_1.5fr] gap-12 lg:gap-10 items-start">

          {/* COL 1 — Brand */}
          <div className="space-y-6">
            <div>
              <a
                href="#home"
                onClick={(e) => handleSmoothScroll(e, '#home')}
                className="inline-block group focus:outline-none focus:ring-2 focus:ring-[#70D943] rounded-2xl"
                title="Solar Arise - Return to top"
              >
                <SolarAriseLogo
                  textColor="white"
                  imgClassName="h-12 w-12 sm:h-14 sm:w-14"
                  showText={true}
                />
              </a>
            </div>

            <p className="text-sm font-medium text-slate-300 leading-relaxed max-w-sm">
              Clean solar electricity solutions for homes, commercial businesses, and agriculture
              across Tamil Nadu since 2014. MNRE &amp; TANGEDCO empanelled EPC contractor.
            </p>

            {/* Quick-dial pills — Official Brand Logos */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {[
                {
                  label: 'WhatsApp',
                  href: 'https://wa.me/919600281759?text=Hello%20Solar%20Arise!%20I%20am%20interested%20in%20solar%20rooftop%20solutions%20and%20government%20subsidy.',
                  title: 'Chat with Solar Specialist on WhatsApp',
                  Logo: WhatsAppLogo,
                  style: 'bg-[#25D366]/20 border-[#25D366]/50 hover:bg-[#25D366] text-white',
                },
                {
                  label: 'Call Us',
                  href: 'tel:+919600281759',
                  title: 'Call Director T. Kathirvel (+91 96002 81759)',
                  Logo: PhoneDialerLogo,
                  style: 'bg-[#00AAEE]/20 border-[#00AAEE]/50 hover:bg-[#00AAEE] text-white',
                },
                {
                  label: 'Gmail',
                  href: 'mailto:solararise1@gmail.com?subject=Solar%20Inquiry%20from%20Website',
                  title: 'Email solararise1@gmail.com',
                  Logo: GmailLogo,
                  style: 'bg-white/10 border-white/25 hover:bg-white/20 text-white',
                },
                {
                  label: 'Maps',
                  href: 'https://www.google.com/maps/dir/?api=1&destination=81+Dheeran+Towers+SDN+Colony+2nd+Street+Gobichettipalayam+Erode+638476',
                  title: 'Get Turn-by-Turn GPS Directions on Google Maps',
                  Logo: GoogleMapsLogo,
                  style: 'bg-white/10 border-white/25 hover:bg-white/20 text-white',
                },
              ].map(({ label, href, title, Logo, style }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  title={title}
                  className={`px-3.5 py-2 rounded-full border text-xs font-bold transition-all duration-200 shadow-sm cursor-pointer inline-flex items-center gap-2 active:scale-95 ${style}`}
                >
                  <Logo className="w-4 h-4 shrink-0" />
                  <span>{label}</span>
                </a>
              ))}
            </div>

            {/* Empanelled badge */}
            <a
              href="#subsidy"
              onClick={(e) => handleSmoothScroll(e, '#subsidy')}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-[#70D943] transition-colors pt-1 group cursor-pointer"
              title="Click to view PM Surya Ghar subsidy details"
            >
              <ShieldCheck className="w-4 h-4 text-[#70D943] group-hover:scale-110 transition-transform" />
              <span>MNRE &amp; TANGEDCO Empanelled EPC</span>
              <span className="text-slate-400 group-hover:text-[#70D943] transition-colors">→</span>
            </a>
          </div>

          {/* COL 2 — Navigation */}
          <div>
            <h4 className="text-xs font-black tracking-[0.25em] uppercase text-[#70D943] mb-5 pb-3 border-b border-white/10">
              Navigation
            </h4>
            <ul className="space-y-3.5">
              {NAV.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => handleSmoothScroll(e, href)}
                    className="text-sm font-semibold text-slate-300 hover:text-white hover:text-[#70D943] hover:translate-x-1.5 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — Information / Solutions */}
          <div>
            <h4 className="text-xs font-black tracking-[0.25em] uppercase text-[#70D943] mb-5 pb-3 border-b border-white/10">
              Information
            </h4>
            <ul className="space-y-3.5">
              {SOLUTIONS.map(({ label, href, tag }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => handleSmoothScroll(e, href)}
                    className="text-sm font-semibold text-slate-300 hover:text-white hover:text-[#70D943] hover:translate-x-1.5 transition-all inline-flex items-center justify-between w-full max-w-[220px] cursor-pointer group"
                  >
                    <span className="group-hover:text-[#70D943] transition-colors">{label}</span>
                    {tag && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/10 text-[#70D943] border border-[#70D943]/30 shrink-0">
                        {tag}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4 — Contact Details */}
          <div>
            <h4 className="text-xs font-black tracking-[0.25em] uppercase text-[#70D943] mb-5 pb-3 border-b border-white/10">
              Contact Us
            </h4>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-medium">
              
              {/* Address with Google Maps link */}
              <div className="flex items-start gap-3">
                <GoogleMapsLogo className="w-5 h-5 shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=81+Dheeran+Towers+SDN+Colony+2nd+Street+Gobichettipalayam+Erode+638476"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Solar Arise office on Google Maps"
                  className="text-slate-300 hover:text-[#70D943] transition-colors group inline-flex items-start gap-1"
                >
                  <span>81, Dheeran Towers, SDN Colony 2nd Street, Gobichettipalayam, Erode – 638476</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#70D943] shrink-0 mt-0.5" />
                </a>
              </div>

              {/* Phone Numbers with Call & WhatsApp Badges */}
              <div className="flex items-start gap-3">
                <PhoneDialerLogo className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center flex-wrap gap-2">
                    <a
                      href="tel:+919600281759"
                      title="Call Primary Contact"
                      className="font-extrabold text-white hover:text-[#70D943] transition-colors text-base"
                    >
                      +91 96002 81759
                    </a>
                    <a
                      href="https://wa.me/919600281759?text=Hello%20Solar%20Arise!%20I%20am%20interested%20in%20solar%20rooftop%20solutions."
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Chat on WhatsApp"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white text-[10px] font-black transition-colors"
                    >
                      <WhatsAppLogo className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#239B35]/25 border border-[#239B35]/50 text-[#70D943] font-black uppercase">Primary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="tel:+919789281759"
                      title="Call Alternate Contact"
                      className="font-bold text-slate-200 hover:text-[#70D943] transition-colors"
                    >
                      +91 97892 81759
                    </a>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-bold uppercase">Alternate</span>
                  </div>
                </div>
              </div>

              {/* Email with Gmail Logo */}
              <div className="flex items-center gap-3">
                <GmailLogo className="w-5 h-5 shrink-0" />
                <a
                  href="mailto:solararise1@gmail.com?subject=Inquiry%20from%20Solar%20Arise%20Website"
                  title="Send email to solararise1@gmail.com"
                  className="hover:text-[#00AAEE] font-semibold text-slate-200 hover:underline transition-colors break-all"
                >
                  solararise1@gmail.com
                </a>
              </div>

              {/* Director & GST Info */}
              <div className="pt-3 border-t border-white/10 text-xs text-slate-400 font-semibold leading-snug">
                <div className="font-extrabold text-white uppercase tracking-wider">T. Kathirvel (Director)</div>
                <div className="font-mono text-slate-300 mt-1">GST: 33GFXPK6789A1ZT</div>
              </div>

            </div>
          </div>

          {/* COL 5 — Hours + Direct Quote Action */}
          <div>
            <h4 className="text-xs font-black tracking-[0.25em] uppercase text-[#70D943] mb-5 pb-3 border-b border-white/10">
              Hours &amp; Support
            </h4>

            {/* Hours card */}
            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-5 space-y-3.5 mb-5 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-300">Mon – Sat</span>
                <span className="text-sm font-black text-white">9 AM – 7:30 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-300">Sunday</span>
                <span className="text-sm italic font-semibold text-slate-400">By Appt.</span>
              </div>
              
              {/* Clickable 24/7 Helpline */}
              <div className="pt-3 border-t border-white/10">
                <a
                  href="tel:+919600281759"
                  title="Call 24/7 Helpline (+91 96002 81759)"
                  className="text-xs font-black text-[#70D943] hover:text-white uppercase tracking-wider flex items-center gap-2 transition-colors group cursor-pointer"
                >
                  <PhoneDialerLogo className="w-4 h-4 shrink-0" />
                  <span>24/7 Helpline: 96002 81759</span>
                </a>
              </div>
            </div>

            {/* Primary CTA button — Smooth scrolls straight to Contact section */}
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="
                w-full py-3.5 px-5 rounded-xl
                bg-gradient-to-r from-[#239B35] to-[#1e852d] hover:from-[#1e852d] hover:to-[#176a24]
                text-white text-xs font-black tracking-[0.14em] uppercase
                flex items-center justify-center gap-2
                shadow-lg hover:shadow-xl
                hover:scale-[1.01] active:scale-[0.98]
                transition-all duration-200 cursor-pointer
              "
            >
              <span>Get Your Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR (Deep Midnight Blue) ── */}
      <div className="border-t border-white/10 bg-[#040E29]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-semibold">
          <span>
            © 2026 Solar Arise. All rights reserved. Gobichettipalayam, Erode, Tamil Nadu.
          </span>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 font-bold text-slate-300">
            {/* Privacy Policy Trigger */}
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-[#70D943] hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-white/20 select-none">•</span>

            {/* Terms of Use Trigger */}
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-[#70D943] hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <span className="text-white/20 select-none">•</span>

            {/* Subsidy Guidelines Trigger */}
            <button
              type="button"
              onClick={() => setLegalModal('guidelines')}
              className="hover:text-[#70D943] hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              Subsidy Guidelines
            </button>
            <span className="text-white/20 select-none">•</span>

            {/* Official PM Surya Ghar National Portal Link */}
            <a
              href="https://pmsuryaghar.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit official Govt. of India PM Surya Ghar portal"
              className="hover:text-[#70D943] text-white transition-colors inline-flex items-center gap-1.5 font-extrabold"
            >
              <span>PM Surya Ghar Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#70D943]" />
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          WORKABLE LEGAL & SUBSIDY MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#071B49] to-[#0866C6] text-white">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#70D943]" />
                <h3 className="font-extrabold text-base sm:text-lg">
                  {legalModal === 'privacy' && 'Solar Arise — Privacy Policy'}
                  {legalModal === 'terms' && 'Solar Arise — Terms of Service'}
                  {legalModal === 'guidelines' && 'PM Surya Ghar — Official Subsidy Guidelines'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs for fast switching */}
            <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
              <button
                type="button"
                onClick={() => setLegalModal('privacy')}
                className={`flex-1 py-3 px-4 text-center border-b-2 cursor-pointer transition-colors ${
                  legalModal === 'privacy'
                    ? 'border-[#239B35] text-[#239B35] bg-white font-extrabold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setLegalModal('terms')}
                className={`flex-1 py-3 px-4 text-center border-b-2 cursor-pointer transition-colors ${
                  legalModal === 'terms'
                    ? 'border-[#239B35] text-[#239B35] bg-white font-extrabold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Terms of Use
              </button>
              <button
                type="button"
                onClick={() => setLegalModal('guidelines')}
                className={`flex-1 py-3 px-4 text-center border-b-2 cursor-pointer transition-colors ${
                  legalModal === 'guidelines'
                    ? 'border-[#239B35] text-[#239B35] bg-white font-extrabold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Subsidy Guidelines
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto text-slate-700 text-sm leading-relaxed space-y-4">

              {/* ── PRIVACY POLICY ── */}
              {legalModal === 'privacy' && (
                <>
                  <div className="p-3 bg-[#EAF8EE] rounded-xl border border-[#239B35]/20 text-[#239B35] font-bold text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Your privacy and personal documents are 100% safe with Solar Arise.</span>
                  </div>

                  <h4 className="font-extrabold text-[#071B49] text-base">1. Information We Collect</h4>
                  <p className="font-medium text-slate-600">
                    When you request a quote or government subsidy consultation on this website, we collect your name, phone number, city, email, and optionally your electricity consumer number.
                  </p>

                  <h4 className="font-extrabold text-[#071B49] text-base">2. Purpose of Collection</h4>
                  <p className="font-medium text-slate-600">
                    All customer information is used solely for:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600 font-medium">
                    <li>Evaluating your rooftop solar feasibility and energy savings.</li>
                    <li>Filing official PM Surya Ghar: Muft Bijli Yojana subsidy applications on the MNRE national portal (<a href="https://pmsuryaghar.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#0866C6] font-bold underline">pmsuryaghar.gov.in</a>).</li>
                    <li>Applying for TANGEDCO bi-directional net-metering approvals.</li>
                  </ul>

                  <h4 className="font-extrabold text-[#071B49] text-base">3. Zero Third-Party Spam</h4>
                  <p className="font-medium text-slate-600">
                    Solar Arise never sells, leases, or trades your personal information to third-party telemarketers or advertisers. All consultations are handled directly by our engineering office in Gobichettipalayam.
                  </p>

                  <h4 className="font-extrabold text-[#071B49] text-base">4. Contact Our Privacy Officer</h4>
                  <p className="font-medium text-slate-600">
                    For queries regarding data handling, reach Director T. Kathirvel at <a href="mailto:solararise1@gmail.com" className="text-[#0866C6] font-bold underline">solararise1@gmail.com</a> or <a href="tel:+919600281759" className="text-[#239B35] font-bold underline">+91 96002 81759</a>.
                  </p>
                </>
              )}

              {/* ── TERMS OF USE ── */}
              {legalModal === 'terms' && (
                <>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-[#0866C6] font-bold text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>MNRE &amp; TANGEDCO Empanelled EPC Standards Guaranteed.</span>
                  </div>

                  <h4 className="font-extrabold text-[#071B49] text-base">1. EPC Service Scope</h4>
                  <p className="font-medium text-slate-600">
                    Solar Arise delivers comprehensive solar engineering, procurement, installation, and TANGEDCO grid liaison for on-grid, off-grid, and hybrid solar rooftop systems across Tamil Nadu.
                  </p>

                  <h4 className="font-extrabold text-[#071B49] text-base">2. Government Subsidy Disbursement</h4>
                  <p className="font-medium text-slate-600">
                    Central (MNRE) and Tamil Nadu State subsidies are credited directly to the beneficiary's registered bank account via Direct Benefit Transfer (DBT) by MNRE upon successful TANGEDCO net-meter installation and inspection.
                  </p>

                  <h4 className="font-extrabold text-[#071B49] text-base">3. Product Warranties</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600 font-medium">
                    <li><strong>Solar Panels:</strong> 25-Year linear performance warranty from Tier-1 manufacturers.</li>
                    <li><strong>Solar Inverters:</strong> 5 to 10-Year manufacturer warranty.</li>
                    <li><strong>Mounting Structures:</strong> Hot-dip galvanized structure engineered for 180 km/h wind resistance.</li>
                  </ul>

                  <h4 className="font-extrabold text-[#071B49] text-base">4. Jurisdiction</h4>
                  <p className="font-medium text-slate-600">
                    All contracts, quotations, and service agreements are governed by the laws of India, subject to the jurisdiction of the courts of Gobichettipalayam / Erode District, Tamil Nadu.
                  </p>
                </>
              )}

              {/* ── SUBSIDY GUIDELINES ── */}
              {legalModal === 'guidelines' && (
                <>
                  <div className="p-3 bg-[#EAF8EE] rounded-xl border border-[#239B35]/20 text-[#239B35] font-bold text-xs flex items-center gap-2">
                    <Landmark className="w-4 h-4 shrink-0" />
                    <span>PM Surya Ghar: Muft Bijli Yojana + Tamil Nadu State Subsidy</span>
                  </div>

                  <h4 className="font-extrabold text-[#071B49] text-base">1. Subsidy Slabs Breakdown</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-center text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-500 uppercase">1 kW System</div>
                      <div className="text-xl font-black text-[#239B35] mt-1">₹35,000</div>
                      <div className="text-[11px] text-slate-500 font-semibold">₹30K Central + ₹5K TN</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-500 uppercase">2 kW System</div>
                      <div className="text-xl font-black text-[#239B35] mt-1">₹70,000</div>
                      <div className="text-[11px] text-slate-500 font-semibold">₹60K Central + ₹10K TN</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#EAF8EE] border border-[#239B35]/40">
                      <div className="font-bold text-[#239B35] uppercase">3 kW &amp; Above</div>
                      <div className="text-xl font-black text-[#239B35] mt-1">₹98,000 – ₹1,00,000</div>
                      <div className="text-[11px] text-slate-600 font-bold">Max Central + TN State</div>
                    </div>
                  </div>

                  <h4 className="font-extrabold text-[#071B49] text-base">2. Required Documents</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600 font-medium text-xs sm:text-sm">
                    <li>Latest TANGEDCO Electricity Consumer Bill (Domestic Tariff LT-1A).</li>
                    <li>Aadhaar Card copy of the electricity service connection owner.</li>
                    <li>Bank Passbook copy or cancelled cheque (with clear IFSC and name match).</li>
                    <li>Clear roof photograph showing shadow-free installation area.</li>
                  </ul>

                  <h4 className="font-extrabold text-[#071B49] text-base">3. Direct Registration Link</h4>
                  <p className="text-xs font-medium text-slate-600">
                    You can register directly on the national portal or have Solar Arise handle your entire application process free of charge:
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href="https://pmsuryaghar.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-[#239B35] text-white text-xs font-bold hover:bg-[#1a7a28] inline-flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <span>Open PM Surya Ghar Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setLegalModal(null);
                        const el = document.getElementById('subsidy');
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.pageYOffset - 75;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#071B49] text-white text-xs font-bold hover:bg-[#0a2260] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>View Full Subsidy Section</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 font-semibold">
              <span>Gobichettipalayam, Erode, Tamil Nadu</span>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-[#071B49] hover:bg-[#0a2260] text-white font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}
