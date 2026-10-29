import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Award,
  Landmark,
  ChevronDown,
} from 'lucide-react';
import { WhatsAppLogo, PhoneDialerLogo, GmailLogo, GoogleMapsLogo } from './BrandLogos';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phone: '',
    email: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#239B35', '#70D943', '#0866C6'] });
    } catch (_) {}
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', city: '', phone: '', email: '' });
    }, 5000);
  };

  const trust = [
    { label: 'Free Consultation', Icon: User },
    { label: '2-Hour Response',   Icon: Clock },
    { label: 'MNRE Approved',     Icon: ShieldCheck },
    { label: 'TANGEDCO Partner',  Icon: Landmark },
    { label: '25-Year Warranty',  Icon: Award },
  ];

  return (
    <section
      id="contact"
      className="relative w-full scroll-mt-20"
      style={{ minHeight: '640px' }}
      aria-label="Contact Solar Arise"
    >
      {/* Seamless Blend from Products Section (Zero Cut Line) */}
      <div className="absolute top-0 left-0 right-0 h-20 sm:h-28 bg-gradient-to-b from-white via-white/50 to-transparent pointer-events-none z-20" />

      {/* ── FULL-BLEED 50/50 split ── */}
      <div className="flex flex-col lg:flex-row min-h-[640px]">

        {/* LEFT — scenic background photo */}
        <div className="relative lg:w-1/2 w-full min-h-[320px] lg:min-h-0 overflow-hidden">
          <img
            src="/images/contact-solar-villa-bg.jpg"
            alt="Solar villa with rooftop panels"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* subtle right-side fade so card sits cleanly */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/30 lg:to-white/10 pointer-events-none" />
        </div>

        {/* RIGHT — white content card */}
        <div className="lg:w-1/2 w-full bg-white flex items-center justify-center px-6 sm:px-10 lg:px-14 py-14 sm:py-16">
          <div className="w-full max-w-xl">

            {/* ── HEADER ── */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#239B35] rounded-full" />
                <span className="text-xs font-black tracking-[0.2em] uppercase text-[#239B35]">Contact Us</span>
              </div>
              <img
                src="/images/solar-arise-logo-192.webp"
                alt="Solar Arise Official Round Emblem"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-md ring-2 ring-[#239B35]/30 object-cover"
                width="48"
                height="48"
                loading="lazy"
              />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-[#0F1F5C] leading-tight mb-3">
              Get Your Solar<br className="hidden sm:block" /> Quote Today
            </h2>

            <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-8 max-w-md">
              Fill in your details and our engineer will suggest the best solar solution for you.
            </p>

            {/* ── 2-COL GRID: trust badges + form ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">

              {/* LEFT SUB-COL — trust badges */}
              <div className="flex flex-col justify-between gap-4">
                {trust.map(({ label, Icon }) => (
                  <div key={label} className="flex items-center gap-3 group">
                    <div className="
                      w-10 h-10 rounded-full flex-shrink-0
                      bg-[#EAF8EE] text-[#239B35]
                      border border-[#239B35]/20
                      flex items-center justify-center
                      group-hover:bg-[#239B35] group-hover:text-white
                      transition-all duration-200
                    ">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-[#0F1F5C]">{label}</span>
                  </div>
                ))}
              </div>

              {/* RIGHT SUB-COL — form fields */}
              <form id="contact-quote-form" onSubmit={handleSubmit} className="flex flex-col gap-3.5">

                {/* Full Name */}
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="contact-name-input"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name *"
                    className="
                      w-full pl-11 pr-4 py-3.5
                      rounded-xl border border-slate-300 bg-slate-50/80
                      text-base font-bold text-[#0F1F5C]
                      placeholder:text-slate-400 placeholder:font-medium
                      focus:outline-none focus:border-[#239B35] focus:bg-white focus:ring-2 focus:ring-[#239B35]/20
                      transition-all
                    "
                  />
                </div>

                {/* City / District */}
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <GoogleMapsLogo className="w-4 h-4" />
                  </div>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="
                      w-full pl-11 pr-8 py-3.5
                      rounded-xl border border-slate-300 bg-slate-50/80
                      text-base font-bold text-[#0F1F5C]
                      focus:outline-none focus:border-[#239B35] focus:bg-white focus:ring-2 focus:ring-[#239B35]/20
                      appearance-none cursor-pointer transition-all
                    "
                  >
                    <option value="">City / District in TN *</option>
                    <option>Gobichettipalayam</option>
                    <option>Erode</option>
                    <option>Coimbatore</option>
                    <option>Tiruppur</option>
                    <option>Salem</option>
                    <option>Namakkal</option>
                    <option>Karur</option>
                    <option>Dindigul</option>
                    <option>Madurai</option>
                    <option>Tiruchirappalli</option>
                    <option>Chennai</option>
                    <option>Other District</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Phone */}
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <PhoneDialerLogo className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone Number *"
                    className="
                      w-full pl-11 pr-4 py-3.5
                      rounded-xl border border-slate-300 bg-slate-50/80
                      text-base font-bold text-[#0F1F5C]
                      placeholder:text-slate-400 placeholder:font-medium
                      focus:outline-none focus:border-[#239B35] focus:bg-white focus:ring-2 focus:ring-[#239B35]/20
                      transition-all
                    "
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <GmailLogo className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email Address *"
                    className="
                      w-full pl-11 pr-4 py-3.5
                      rounded-xl border border-slate-300 bg-slate-50/80
                      text-base font-bold text-[#0F1F5C]
                      placeholder:text-slate-400 placeholder:font-medium
                      focus:outline-none focus:border-[#239B35] focus:bg-white focus:ring-2 focus:ring-[#239B35]/20
                      transition-all
                    "
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="
                    w-full mt-1.5 py-4 px-6 rounded-xl
                    bg-gradient-to-r from-[#239B35] to-[#1d8229] hover:from-[#1d8229] hover:to-[#176a24]
                    text-white font-black text-base tracking-wider uppercase
                    flex items-center justify-center gap-2.5
                    shadow-lg hover:shadow-xl
                    hover:scale-[1.01] active:scale-[0.99]
                    transition-all duration-200 disabled:opacity-70 cursor-pointer
                  "
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Request Sent! We'll call you soon.</span>
                    </>
                  ) : (
                    <>
                      <span>Get Free Solar Quote</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

            </div>

            {/* Quick direct contact with Official Logos */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 text-center sm:text-left">
                Or Connect Directly with Us:
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://wa.me/919600281759?text=Hello%20Solar%20Arise!%20I%20want%20to%20discuss%20a%20solar%20rooftop%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/40 hover:bg-[#25D366] text-[#071B49] hover:text-white text-xs font-black transition-all shadow-sm group"
                >
                  <WhatsAppLogo className="w-4 h-4 shrink-0" />
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href="tel:+919600281759"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#00AAEE]/10 border border-[#00AAEE]/40 hover:bg-[#00AAEE] text-[#071B49] hover:text-white text-xs font-black transition-all shadow-sm group"
                >
                  <PhoneDialerLogo className="w-4 h-4 shrink-0" />
                  <span>+91 96002 81759</span>
                </a>
                <a
                  href="mailto:solararise1@gmail.com?subject=Direct%20Inquiry%20from%20Website"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-300 hover:bg-slate-200 text-[#071B49] text-xs font-black transition-all shadow-sm group"
                >
                  <GmailLogo className="w-4 h-4 shrink-0" />
                  <span>solararise1@gmail.com</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
