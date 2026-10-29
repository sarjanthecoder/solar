import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Menu, X, ArrowUpRight, PhoneCall } from 'lucide-react';
import SolarAriseLogo from './SolarAriseLogo';

const NAV_LINKS = [
  { name: 'Home',          href: '#home',          id: 'home' },
  { name: 'Services',      href: '#services',      id: 'services' },
  { name: 'Projects',      href: '#projects',      id: 'projects' },
  { name: 'Subsidy',       href: '#subsidy',       id: 'subsidy' },
  { name: 'Why Choose Us', href: '#why-choose-us', id: 'why-choose-us' },
  { name: 'Products',      href: '#products',      id: 'products' },
  { name: 'Contact',       href: '#contact',       id: 'contact' },
];

export default function Navbar({ onOpenQuoteModal, onOpenExpertModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isManualScrollingRef = useRef(false);
  const activeMobileTabRef = useRef(null);
  const mobileNavStripRef = useRef(null);

  // Background blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Spy: dynamically update activeTab as user scrolls down/up
  useEffect(() => {
    const handleScrollSpy = () => {
      if (isManualScrollingRef.current) return;

      const isMobile = window.innerWidth < 1024;
      const headerOffset = isMobile ? 105 : 85;

      // Check if user is near the bottom of the page (activate Contact)
      if (
        window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveTab('Contact');
        return;
      }

      // Check sections from bottom to top
      const sections = [
        { name: 'Contact',       id: 'contact' },
        { name: 'Products',      id: 'products' },
        { name: 'Why Choose Us', id: 'why-choose-us' },
        { name: 'Subsidy',       id: 'subsidy' },
        { name: 'Projects',      id: 'projects' },
        { name: 'Services',      id: 'services' },
        { name: 'Home',          id: 'home' },
      ];

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset + 60) {
            setActiveTab(section.name);
            return;
          }
        }
      }

      // Default to Home if at the very top
      if (window.pageYOffset < 300) {
        setActiveTab('Home');
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Auto-scroll the mobile tab bar container horizontally to keep active tab centered (zero vertical jumping)
  useEffect(() => {
    if (mobileNavStripRef.current && activeMobileTabRef.current) {
      const container = mobileNavStripRef.current;
      const tab = activeMobileTabRef.current;
      const targetScrollLeft = tab.offsetLeft - (container.clientWidth / 2) + (tab.clientWidth / 2);
      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      });
    }
  }, [activeTab]);

  // Click handler with smooth scrolling and navbar offset
  const handleNavClick = (e, href, name) => {
    if (e && e.preventDefault) e.preventDefault();
    if (name) setActiveTab(name);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);

    isManualScrollingRef.current = true;

    const id = href.replace('#', '');
    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      try {
        window.history.pushState(null, '', '#home');
      } catch (_) {}
    } else {
      const target = document.getElementById(id);
      if (target) {
        const isMobile = window.innerWidth < 1024;
        const navOffset = isMobile ? 96 : 75;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });

        try {
          window.history.pushState(null, '', href);
        } catch (_) {}
      }
    }

    // Release lock after smooth scroll completes
    setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 750);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/90'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/70 shadow-sm'
        }`}
      >
        {/* ── TOP ROW: LOGO, DESKTOP NAV, ACTION BUTTONS ── */}
        <div className="w-full px-4 sm:px-6 lg:px-10 py-2 sm:py-2.5">
          <nav
            aria-label="Main Navigation"
            className="w-full flex items-center justify-between"
          >
            {/* Left: Solar Arise Logo */}
            <a
              href="#home"
              aria-label="Solar Arise Homepage"
              className="group flex items-center focus:outline-none focus:ring-2 focus:ring-[#239B35] rounded-lg cursor-pointer py-1 shrink-0"
              onClick={(e) => handleNavClick(e, '#home', 'Home')}
            >
              <SolarAriseLogo imgClassName="h-8 w-8 sm:h-10 sm:w-10" showText={true} />
            </a>

            {/* Center: Desktop Navigation Links with Bottom Dash Highlighter */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeTab === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.name)}
                    className={`relative px-3.5 py-2 text-sm font-bold tracking-tight transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'text-[#0F1F5C]'
                        : 'text-slate-600 hover:text-[#239B35]'
                    }`}
                  >
                    <span>{link.name}</span>

                    {/* Active Bottom Dash Highlighter on Desktop */}
                    {isActive && (
                      <motion.span
                        layoutId="desktopNavBottomDash"
                        className="absolute bottom-0 left-2 right-2 h-[3px] bg-gradient-to-r from-[#239B35] to-[#70D943] rounded-full shadow-[0_2px_8px_rgba(35,155,53,0.45)]"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* WhatsApp — hidden on mobile (available in drawer) */}
              <a
                href="https://wa.me/919600281759?text=Hello%20Solar%20Arise!%20I%20am%20interested%20in%20a%20solar%20solution."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                title="Chat with Solar Specialist on WhatsApp"
                className="hidden sm:flex p-2 rounded-full bg-white text-[#239B35] border border-[#239B35]/30 hover:bg-[#239B35] hover:text-white hover:border-[#239B35] shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#239B35]"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="sr-only">WhatsApp</span>
              </a>

              {/* Get Free Quote CTA Button */}
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="group relative overflow-hidden btn-3d-primary text-white font-bold py-2 sm:py-2.5 px-3 sm:px-5 rounded-full flex items-center gap-1 sm:gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#239B35] focus:ring-offset-2"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-light-sweep pointer-events-none" />
                {/* Responsive label */}
                <span className="relative z-10 tracking-wide text-[11px] sm:text-sm leading-tight text-center">
                  <span className="sm:hidden">Get Quote</span>
                  <span className="hidden sm:inline">Get Free Quote</span>
                </span>
                <ArrowUpRight className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
                className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-[#071B49] hover:text-[#239B35] focus:outline-none focus:ring-2 focus:ring-[#239B35] cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>

        {/* ── MOBILE HORIZONTAL NAVIGATION STRIP WITH ANIMATED BOTTOM DASH ── */}
        <div
          ref={mobileNavStripRef}
          className="lg:hidden w-full overflow-x-auto border-t border-slate-200/90 bg-white/95 backdrop-blur-md px-2 py-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="flex items-center gap-1 min-w-max px-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <a
                  key={link.name}
                  ref={isActive ? activeMobileTabRef : null}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.name)}
                  className={`relative px-3.5 py-2 text-xs font-bold tracking-tight transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#0F1F5C] font-black'
                      : 'text-slate-500 hover:text-[#0F1F5C]'
                  }`}
                >
                  <span>{link.name}</span>

                  {/* Active Bottom Dash Highlighter on Mobile */}
                  {isActive && (
                    <motion.span
                      layoutId="mobileNavBottomDash"
                      className="absolute bottom-0 left-1 right-1 h-[2.5px] bg-gradient-to-r from-[#239B35] to-[#70D943] rounded-full shadow-[0_2px_8px_rgba(35,155,53,0.5)]"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE NAVIGATION DRAWER (Full View Overlay) ── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden pointer-events-auto max-w-lg mx-auto px-4 pb-4"
            >
              <div className="glass-card rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/95 bg-white/95 backdrop-blur-xl">
                <div className="flex flex-col space-y-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = activeTab === link.name;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href, link.name)}
                        className={`relative flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#EAF8EE] text-[#0F1F5C]'
                            : 'text-[#071B49] hover:bg-slate-50 hover:text-[#239B35]'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && (
                          <div className="w-2 h-2 rounded-full bg-[#239B35] shadow-[0_0_8px_#239B35]" />
                        )}
                        {/* Drawer item bottom dash */}
                        {isActive && (
                          <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#239B35] rounded-full" />
                        )}
                      </a>
                    );
                  })}
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/60 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenQuoteModal();
                    }}
                    className="w-full py-2.5 btn-3d-primary text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Get Free Quote</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://wa.me/919600281759?text=Hello%20Solar%20Arise!%20I%20am%20interested%20in%20a%20solar%20solution."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-white border border-[#239B35]/40 text-[#239B35] hover:bg-[#EAF8EE] text-sm font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Direct Chat</span>
                  </a>

                  {onOpenExpertModal && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenExpertModal();
                      }}
                      className="w-full py-2 bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#0F1F5C] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-[#0866C6]" />
                      <span>Speak with Solar Engineer</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
