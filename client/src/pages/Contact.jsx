import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
import { Link } from 'react-router-dom';
import { BRAND, waLink } from '../config/brand.js';
import { FloralMotif } from '../assets/Logo.jsx';

function ContactRow({ icon: Icon, label, value, href, accent }) {
  const content = (
    <div className="flex items-start gap-3.5">
      <div className={`w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 ${accent === 'gold' ? 'bg-[#280030]' : accent === 'green' ? 'bg-[#426B46]' : 'bg-[#FFF8F0] border border-[#E8DFE5]'}`}>
        <Icon className={`w-4 h-4 ${accent === 'gold' ? 'text-[#F0C860]' : accent === 'green' ? 'text-white' : 'text-[#280030]'}`} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider font-semibold text-[#706873]">{label}</p>
        <p className="text-sm font-semibold text-[#29232A] mt-0.5">{value}</p>
      </div>
    </div>
  );
  if (href) {
    return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">{content}</a>;
  }
  return <div>{content}</div>;
}

export function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, send this to the backend API
    // For now, open WhatsApp with the enquiry details
    const msg = `Hi Sri Lakshmi Saree House,\n\nName: ${form.name}\nPhone: ${form.phone}\n${form.email ? `Email: ${form.email}\n` : ''}Message: ${form.message}`;
    window.open(`https://wa.me/${BRAND.contact.whatsappRaw}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FFF8F0] text-[#29232A]">
      {/* Hero */}
      <section className="bg-[#280030] text-[#FFF8F0] py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, #F0C860 0%, transparent 55%)' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-[#F0C860]/50" />
            <FloralMotif className="w-4 h-4 text-[#F0C860]" />
            <div className="h-px w-10 bg-[#F0C860]/50" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">Contact & Showroom</h1>
          <p className="text-[#C8BDD2] mt-4 text-sm leading-relaxed max-w-md mx-auto">
            We are here to help you find the perfect saree. Visit our showroom, call us, or send a WhatsApp message.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* LEFT — Contact details */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#280030] mb-6">Get in Touch</h2>
                <div className="space-y-5">
                  <ContactRow
                    icon={MapPin}
                    label="Showroom Address"
                    value={BRAND.address.full}
                    href={BRAND.address.mapsUrl}
                    accent="gold"
                  />
                  <ContactRow
                    icon={Phone}
                    label="Shop Number"
                    value={BRAND.contact.shop}
                    href={`tel:${BRAND.contact.shop.replace(/\s/g, '')}`}
                    accent="gold"
                  />
                  <ContactRow
                    icon={Phone}
                    label={`Proprietor — ${BRAND.proprietor.name}`}
                    value={BRAND.proprietor.contact}
                    href={`tel:${BRAND.proprietor.contact.replace(/\s/g, '')}`}
                    accent="gold"
                  />
                  <ContactRow
                    icon={MessageCircle}
                    label="WhatsApp Shopping & Video Drape"
                    value={BRAND.contact.whatsapp}
                    href={waLink()}
                    accent="green"
                  />
                  <ContactRow
                    icon={InstagramIcon}
                    label="Instagram"
                    value={BRAND.contact.instagram}
                    href={BRAND.contact.instagramUrl}
                    accent=""
                  />
                </div>
              </div>

              {/* Store Hours notice */}
              <div className="bg-[#FFF8F0] border border-[#E8DFE5] rounded-sm p-4 flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#706873] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[#29232A] uppercase tracking-wide">Store Hours</p>
                  <p className="text-xs text-[#706873] mt-1 leading-relaxed">
                    Store hours will be updated here once confirmed by Sri Lakshmi Saree House.
                    Please call or WhatsApp us to confirm availability before visiting.
                  </p>
                </div>
              </div>

              {/* Quick actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={BRAND.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-[#280030] hover:bg-[#3b0347] text-white font-semibold text-xs uppercase tracking-wider text-center rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5" /> Get Directions
                </a>
                <a
                  href={waLink(BRAND.whatsappMessages.videoDrape)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-[#426B46] hover:bg-[#345738] text-white font-semibold text-xs uppercase tracking-wider text-center rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Video Drape
                </a>
              </div>
            </div>

            {/* RIGHT — Contact form + Map */}
            <div className="space-y-6">
              {/* Map */}
              <div className="rounded-sm overflow-hidden border border-[#E8DFE5] shadow-sm aspect-[16/8]">
                <iframe
                  title="Sri Lakshmi Saree House — Dilsukhnagar, Hyderabad"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15229.34!2d78.5255!3d17.3688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba5ae18c2291f%3A0x748eba3bc1e0c25b!2sDilsukhnagar%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1698000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Contact form */}
              <div className="bg-white border border-[#E8DFE5] rounded-sm p-6 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-[#280030] mb-5">Send an Enquiry</h3>
                {submitted ? (
                  <div className="text-center py-8 space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-[#426B46] mx-auto" />
                    <p className="font-serif text-lg font-bold text-[#280030]">Enquiry Sent!</p>
                    <p className="text-sm text-[#706873]">
                      Your message has been sent via WhatsApp. We will respond shortly.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', message: '' }); }}
                      className="text-xs text-[#BD3D78] underline cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider text-[#706873] block mb-1.5">
                          Your Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Full name"
                          className="w-full px-3 py-2.5 border border-[#E8DFE5] rounded-sm text-sm focus:outline-none focus:border-[#280030] bg-[#FFF8F0] text-[#29232A] placeholder-[#A898B0]"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="text-xs font-semibold uppercase tracking-wider text-[#706873] block mb-1.5">
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full px-3 py-2.5 border border-[#E8DFE5] rounded-sm text-sm focus:outline-none focus:border-[#280030] bg-[#FFF8F0] text-[#29232A] placeholder-[#A898B0]"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider text-[#706873] block mb-1.5">
                        Email (optional)
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-3 py-2.5 border border-[#E8DFE5] rounded-sm text-sm focus:outline-none focus:border-[#280030] bg-[#FFF8F0] text-[#29232A] placeholder-[#A898B0]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider text-[#706873] block mb-1.5">
                        Your Enquiry *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about the sarees you are looking for, your occasion, budget, or any questions..."
                        className="w-full px-3 py-2.5 border border-[#E8DFE5] rounded-sm text-sm focus:outline-none focus:border-[#280030] bg-[#FFF8F0] text-[#29232A] placeholder-[#A898B0] resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      className="w-full py-3 px-6 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] font-bold text-xs uppercase tracking-[0.16em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Send via WhatsApp <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-[11px] text-[#706873] text-center">
                      Submitting will open WhatsApp with your message pre-filled.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
