import React, { useState } from 'react';
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
  const [isAdminOpen, setIsAdminOpen] = useState(false);

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
        onOpenAdmin={() => setIsAdminOpen(true)}
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

      {/* Floating Instant WhatsApp Button — Cleanly positioned above mobile CTA buttons */}
      <aside
        aria-label="Instant WhatsApp Contact"
        className="fixed bottom-20 sm:bottom-8 right-4 sm:right-7 z-40"
      >
        <a
          href="https://wa.me/919600281759?text=Hello%20Solar%20Arise!%20I%20am%20interested%20in%20solar%20rooftop%20solutions."
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp (+91 96002 81759)"
          className="group flex items-center gap-2 sm:gap-2.5 bg-white p-2.5 sm:pl-3.5 sm:pr-4 sm:py-2.5 rounded-full shadow-2xl border-2 border-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
        >
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]" />
          </span>
          <WhatsAppLogo className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
          <span className="hidden sm:inline text-xs sm:text-sm font-black text-[#071B49] group-hover:text-white transition-colors">
            WhatsApp Direct
          </span>
        </a>
      </aside>

      {/* Floating Left-Side Call Button */}
      <aside aria-label="Call Solar Arise" className="fixed bottom-20 sm:bottom-8 left-4 sm:left-7 z-40">
        <a
          href="tel:+919600281759"
          title="Call Solar Arise (+91 96002 81759)"
          className="group flex items-center gap-2 sm:gap-2.5 bg-white p-2.5 sm:pl-3.5 sm:pr-4 sm:py-2.5 rounded-full shadow-2xl border-2 border-[#00AAEE] hover:bg-[#00AAEE] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#00AAEE]/40 cursor-pointer"
        >
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00AAEE] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00AAEE]" />
          </span>
          <PhoneDialerLogo className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
          <span className="hidden sm:inline text-xs sm:text-sm font-black text-[#071B49] group-hover:text-white transition-colors">
            Call Us Now
          </span>
        </a>
      </aside>

      {/* Admin Panel Modal */}
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </main>
  );
}
