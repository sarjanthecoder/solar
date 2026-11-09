import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Solar3DScrollSection from './components/Solar3DScrollSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import SubsidySection from './components/SubsidySection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import SolarProductsSection from './components/SolarProductsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { WhatsAppLogo, PhoneDialerLogo } from './components/BrandLogos';
import AdminPanel from './components/AdminPanel';

export default function App() {
  // Open admin if URL path is /admin
  const [isAdminOpen, setIsAdminOpen] = useState(
    () => window.location.pathname === '/admin'
  );

  // Listen for browser back/forward navigation
  React.useEffect(() => {
    const handlePop = () => {
      setIsAdminOpen(window.location.pathname === '/admin');
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const openAdmin = () => {
    window.history.pushState(null, '', '/admin');
    setIsAdminOpen(true);
  };

  const closeAdmin = () => {
    window.history.pushState(null, '', '/');
    setIsAdminOpen(false);
  };

  // Hide floating buttons when Contact section or Footer is visible
  const [showFloating, setShowFloating] = useState(true);

  useEffect(() => {
    const contactEl = document.getElementById('contact');
    const footerEl = document.querySelector('footer');
    if (!contactEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        setShowFloating(!anyVisible);
      },
      { threshold: 0.08 }
    );

    observer.observe(contactEl);
    if (footerEl) observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  // Smooth scroll directly to Contact quote form whenever "Get Quote" is clicked
  const handleGoToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const isMobile = window.innerWidth < 1024;
      const navOffset = isMobile ? 98 : 75;
      const elementPosition = contactEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      try {
        window.history.pushState(null, '', '#contact');
      } catch (_) {}

      // Focus first input field in Contact form
      setTimeout(() => {
        const input = contactEl.querySelector('input');
        if (input) input.focus();
      }, 700);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#EAF6FF] text-[#071B49]">
      {/* Premium Floating Navigation Bar */}
      <Navbar
        onOpenQuoteModal={handleGoToContact}
        onOpenExpertModal={handleGoToContact}
        onOpenAdmin={openAdmin}
      />

      {/* Cinematic Hero Section */}
      <Hero
        onOpenQuoteModal={handleGoToContact}
        onOpenExpertModal={handleGoToContact}
      />

      {/* Interactive 3D Solar Architecture Scroll Section */}
      <Solar3DScrollSection />

      {/* Second Section: Our Solar Services */}
      <ServicesSection
        onOpenQuoteModal={handleGoToContact}
      />

      {/* Third Section: Real Projects • Real Impact */}
      <ProjectsSection
        onOpenQuoteModal={handleGoToContact}
      />

      {/* Fourth Section: Government Solar Subsidy */}
      <SubsidySection
        onOpenQuoteModal={handleGoToContact}
        onOpenExpertModal={handleGoToContact}
      />

      {/* Fifth Section: Why Choose Us */}
      <WhyChooseUsSection
        onOpenQuoteModal={handleGoToContact}
        onOpenExpertModal={handleGoToContact}
      />

      {/* Sixth Section: Premium Solar Products */}
      <SolarProductsSection
        onOpenQuoteModal={handleGoToContact}
        onOpenExpertModal={handleGoToContact}
      />

      {/* Seventh Section: Contact Solar Arise (Primary Quote Form) */}
      <ContactSection
        onOpenQuoteModal={handleGoToContact}
        onOpenExpertModal={handleGoToContact}
      />

      {/* Corporate Comprehensive Footer */}
      <Footer
        onOpenQuoteModal={handleGoToContact}
        onOpenExpertModal={handleGoToContact}
      />

      {/* Floating WhatsApp + Call buttons — hidden when Contact section visible */}
      {showFloating && (
        <>
          {/* Floating WhatsApp — right side */}
          <aside aria-label="Instant WhatsApp Contact" className="fixed bottom-6 right-4 sm:right-7 z-40 transition-all duration-300">
            <a
              href="https://wa.me/919600281759?text=Hello%20Solar%20Arise!%20I%20am%20interested%20in%20solar%20rooftop%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp (+91 96002 81759)"
              className="group flex items-center justify-center gap-2.5 bg-white shadow-2xl border-2 border-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer
                w-12 h-12 rounded-full
                sm:w-auto sm:h-auto sm:rounded-full sm:pl-3.5 sm:pr-4 sm:py-2.5"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0 sm:flex hidden">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
              </span>
              <WhatsAppLogo className="w-6 h-6 shrink-0" />
              <span className="hidden sm:inline text-sm font-black text-[#071B49] group-hover:text-white transition-colors whitespace-nowrap">
                WhatsApp Direct
              </span>
            </a>
          </aside>

          {/* Floating Call — left side */}
          <aside aria-label="Call Solar Arise" className="fixed bottom-6 left-4 sm:left-7 z-40 transition-all duration-300">
            <a
              href="tel:+919600281759"
              title="Call Solar Arise (+91 96002 81759)"
              className="group flex items-center justify-center gap-2.5 bg-white shadow-2xl border-2 border-[#00AAEE] hover:bg-[#00AAEE] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#00AAEE]/40 cursor-pointer
                w-12 h-12 rounded-full
                sm:w-auto sm:h-auto sm:rounded-full sm:pl-3.5 sm:pr-4 sm:py-2.5"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0 sm:flex hidden">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00AAEE] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00AAEE]" />
              </span>
              <PhoneDialerLogo className="w-6 h-6 shrink-0" />
              <span className="hidden sm:inline text-sm font-black text-[#071B49] group-hover:text-white transition-colors whitespace-nowrap">
                Call Us Now
              </span>
            </a>
          </aside>
        </>
      )}

      {/* Admin Panel Modal */}
      <AdminPanel isOpen={isAdminOpen} onClose={closeAdmin} />
    </main>
  );
}
