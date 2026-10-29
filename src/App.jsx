import React from 'react';
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

export default function App() {
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
    </main>
  );
}
