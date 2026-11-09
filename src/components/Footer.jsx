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

      {/* ── MAIN COLUMNS ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32 pb-20 sm:pb-28">

        {/* ── PM SURYA GHAR FEATURED BANNER ── */}
        <a
          href="https://pmsuryaghar.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Official PM Surya Ghar Muft Bijli Yojana Portal — Government of India"
          className="group flex flex-col sm:flex-row items-center gap-5 p-5 sm:p-6 rounded-2xl border border-[#FF9933]/30 bg-gradient-to-r from-[#FF9933]/10 via-white/5 to-[#138808]/10 hover:border-[#FF9933]/60 hover:from-[#FF9933]/15 hover:to-[#138808]/15 transition-all duration-300 mb-14 cursor-pointer shadow-lg"
        >
          {/* Official Govt Logos */}
          <div className="flex items-center gap-4 shrink-0">
            {/* India National Emblem — Ashoka Pillar (Official) */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center drop-shadow-xl">
                <img
                  src="/images/india-govt-emblem.svg"
                  alt="National Emblem of India — Ashoka Pillar"
                  className="h-14 sm:h-16 w-auto object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <span className="text-[8px] font-black tracking-widest text-white/60 uppercase text-center leading-tight whitespace-nowrap">Govt. of India</span>
            </div>

            {/* India flag tricolor vertical stripe */}
            <div className="hidden sm:flex flex-col gap-0.5 self-stretch py-2">
              <div className="flex-1 w-1.5 rounded-t-full bg-[#FF9933]" />
              <div className="flex-1 w-1.5 bg-white/50" />
              <div className="flex-1 w-1.5 rounded-b-full bg-[#138808]" />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#FF9933] font-stylish">Government of India — Official Scheme</span>
            </div>
            <div className="text-lg sm:text-xl font-black text-white leading-tight font-stylish">
              PM Surya Ghar: Muft Bijli Yojana
            </div>
            <div className="text-[13px] text-slate-300 font-medium mt-1 font-body">
              Get up to <span className="text-[#70D943] font-black">₹78,000 subsidy</span> on rooftop solar installation. Apply directly on the official Government of India portal.
            </div>
          </div>

          {/* CTA arrow */}
          <div className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF9933]/20 border border-[#FF9933]/40 group-hover:bg-[#FF9933] group-hover:border-[#FF9933] transition-all duration-200">
            <span className="text-sm font-black text-white whitespace-nowrap">Visit Portal</span>
            <ExternalLink className="w-4 h-4 text-white" />
          </div>
        </a>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1.2fr_1.8fr_1.6fr] gap-14 lg:gap-12 items-start">

          {/* COL 1 — Brand */}
          <div className="space-y-8">
            <div>
              <a
                href="#home"
                onClick={(e) => handleSmoothScroll(e, '#home')}
                className="inline-block group focus:outline-none focus:ring-2 focus:ring-[#70D943] rounded-2xl"
                title="Solar Arise - Return to top"
              >
                <SolarAriseLogo
                  textColor="white"
                  imgClassName="h-14 w-14 sm:h-16 sm:w-16"
                  showText={true}
                />
              </a>
            </div>

            <p className="text-[15px] font-medium text-slate-300 leading-[1.8] max-w-sm font-body">
              Clean solar electricity solutions for homes, commercial businesses, and agriculture
              across Tamil Nadu since 2014. MNRE &amp; TANGEDCO empanelled EPC contractor.
            </p>

            {/* Quick-dial pills — Official Brand Logos */}
            <div className="flex flex-wrap gap-3 pt-1">
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
                  className={`px-4 py-2.5 rounded-full border text-xs font-bold tracking-wide transition-all duration-200 shadow-sm cursor-pointer inline-flex items-center gap-2 active:scale-95 ${style}`}
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
            <h4 className="text-[11px] font-black tracking-[0.3em] uppercase text-[#70D943] mb-6 pb-4 border-b border-white/10 font-stylish">
              Navigation
            </h4>
            <ul className="space-y-4">
              {NAV.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => handleSmoothScroll(e, href)}
                    className="text-[14px] font-semibold text-slate-300 hover:text-[#70D943] hover:translate-x-1.5 transition-all inline-flex items-center gap-1.5 cursor-pointer font-body"
                  >
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — Contact Details */}
          <div>
            <h4 className="text-[11px] font-black tracking-[0.3em] uppercase text-[#70D943] mb-6 pb-4 border-b border-white/10 font-stylish">
              Contact Us
            </h4>
            <div className="space-y-5 text-[14px] text-slate-300 leading-relaxed font-body">
              
              {/* Address with Google Maps link */}
              <div className="flex items-start gap-3.5">
                <GoogleMapsLogo className="w-5 h-5 shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=81+Dheeran+Towers+SDN+Colony+2nd+Street+Gobichettipalayam+Erode+638476"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Solar Arise office on Google Maps"
                  className="text-slate-300 hover:text-[#70D943] transition-colors group inline-flex items-start gap-1 font-semibold"
                >
                  <span>81, Dheeran Towers, SDN Colony 2nd Street, Gobichettipalayam, Erode – 638476</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#70D943] shrink-0 mt-0.5" />
                </a>
              </div>

              {/* Phone Numbers with Call & WhatsApp Badges */}
              <div className="flex items-start gap-3.5">
                <PhoneDialerLogo className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-2.5">
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
              <div className="flex items-center gap-3.5">
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
              <div className="pt-4 border-t border-white/10 text-xs text-slate-400 font-semibold leading-snug space-y-1">
                <div className="font-extrabold text-white uppercase tracking-widest text-sm font-stylish">T. Kathirvel (Director)</div>
                <div className="font-mono text-slate-300">GST: 33GFXPK6789A1ZT</div>
              </div>

            </div>
          </div>

          {/* COL 4 — Hours + Direct Quote Action */}
          <div>
            <h4 className="text-[11px] font-black tracking-[0.3em] uppercase text-[#70D943] mb-6 pb-4 border-b border-white/10 font-stylish">
              Hours &amp; Support
            </h4>

            {/* Hours card */}
            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 space-y-4 mb-6 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-bold text-slate-300 font-body">Mon – Sat</span>
                <span className="text-[14px] font-black text-white">9 AM – 7:30 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-bold text-slate-300 font-body">Sunday</span>
                <span className="text-[14px] italic font-semibold text-slate-400">By Appt.</span>
              </div>
              
              {/* Clickable 24/7 Helpline */}
              <div className="pt-3 border-t border-white/10">
                <a
                  href="tel:+919600281759"
                  title="Call 24/7 Helpline (+91 96002 81759)"
                  className="text-xs font-black text-[#70D943] hover:text-white uppercase tracking-wider flex items-center gap-2 transition-colors group cursor-pointer font-stylish"
                >
                  <PhoneDialerLogo className="w-4 h-4 shrink-0" />
                  <span>24/7 Helpline: 96002 81759</span>
                </a>
              </div>
            </div>

            {/* Primary CTA button */}
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="
                w-full py-4 px-5 rounded-xl
                bg-gradient-to-r from-[#239B35] to-[#1e852d] hover:from-[#1e852d] hover:to-[#176a24]
                text-white text-sm font-black tracking-[0.14em] uppercase
                flex items-center justify-center gap-2
                shadow-lg hover:shadow-xl
                hover:scale-[1.01] active:scale-[0.98]
                transition-all duration-200 cursor-pointer font-stylish
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
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-[13px] text-slate-400 font-semibold font-body">
            <span className="text-center md:text-left leading-relaxed">
              © 2026 Solar Arise. All rights reserved. Gobichettipalayam, Erode, Tamil Nadu.
            </span>

            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 font-bold text-slate-300">
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
                className="hover:text-[#FF9933] text-[#FF9933]/80 transition-colors inline-flex items-center gap-1.5 font-extrabold"
              >
                <span>PM Surya Ghar Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* ── DESIGNED & DEVELOPED BY INNOVATION HACKS ── */}
          <div className="mt-7 pt-6 border-t border-white/[0.08] flex items-center justify-center">
            <div className="group inline-flex items-center gap-3.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-white/[0.04] via-[#0B2259]/50 to-white/[0.04] border border-white/10 hover:border-[#38BDF8]/40 shadow-lg hover:shadow-[0_0_24px_rgba(56,189,248,0.16)] transition-all duration-300">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white p-0.5 shrink-0 shadow-[0_0_16px_rgba(56,189,248,0.28)] ring-2 ring-[#38BDF8]/30 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <img
                  src="/images/innovation-hacks-logo.png"
                  alt="Innovation Hacks Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 leading-tight font-stylish">
                  Designed &amp; Developed by
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm sm:text-[15px] font-black tracking-wide bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent font-stylish">
                    Innovation Hacks
                  </span>
                  <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-500" />
                  <span className="hidden sm:inline text-[10px] font-bold tracking-[0.16em] uppercase text-slate-400/90">
                    Build • Innovate • Impact
                  </span>
                </div>
              </div>
            </div>
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
