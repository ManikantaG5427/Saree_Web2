import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MapPin,
  MessageCircle,
  Package,
  Award,
  Video,
  ShieldCheck,
} from 'lucide-react';
import { Logo, FloralMotif } from '../../assets/Logo.jsx';
import { BRAND, waLink } from '../../config/brand.js';

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const trustPillars = [
  {
    icon: Award,
    title: 'Pattu Saree Specialists',
    desc: 'Handloom Pattu, silk, and traditional weaves curated since 2003.',
  },
  {
    icon: Video,
    title: '1-on-1 Video Drape',
    desc: 'Live WhatsApp video consultations to see true daylight luster and zari.',
  },
  {
    icon: Package,
    title: 'Wholesale & Retail',
    desc: 'Direct pricing for bulk and retail customers across India.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    desc: 'Razorpay-protected transactions with cards, UPI, and net banking.',
  },
];

const shopLinks = [
  { label: 'All Sarees', to: '/shop' },
  { label: 'Handloom & Pattu Silks', to: '/shop?category=Handloom Pattu Sarees' },
  { label: 'Uppada Jamdani', to: '/shop?category=Uppada Silk Sarees' },
  { label: 'Banarasi Brocades', to: '/shop?category=Banarasi Brocades' },
  { label: 'Gadwal Handlooms', to: '/shop?category=Gadwal Handlooms' },
  { label: 'Wedding & Bridal', to: '/shop?category=Wedding & Bridal' },
  { label: 'Fancy & Boutique', to: '/shop?category=Fancy & Boutique Sarees' },
  { label: 'Dress Materials', to: '/shop?category=Pure Silk Dress Materials' },
];

const companyLinks = [
  { label: 'Home', to: '/' },
  { label: 'Our Story', to: '/about' },
  { label: 'Handloom Guide', to: '/handloom-guide' },
  { label: 'Wholesale Enquiries', to: '/wholesale' },
  { label: 'Contact & Showroom', to: '/contact' },
];

const supportLinks = [
  { label: 'Track Your Order', to: '/track-order' },
  { label: 'Frequently Asked Questions', to: '/faq' },
  { label: 'Shipping Policy', to: '/shipping-policy' },
  { label: 'Returns & Cancellations', to: '/returns-policy' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
];

export function Footer() {
  return (
    <footer className="bg-[#280030] text-[#FFF8F0] border-t border-[#F0C860]/30">

      {/* ── Trust Pillars Bar ─────────────────────────────────────── */}
      <div className="bg-[#200026] border-b border-[#3b0347]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPillars.map((item) => (
              <div key={item.title} className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-sm bg-[#300030] border border-[#F0C860]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <item.icon className="w-4.5 h-4.5 text-[#F0C860]" />
                </div>
                <div>
                  <p className="font-semibold text-xs text-[#FFF8F0] uppercase tracking-wide">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-[#A898B0] leading-relaxed mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column (2 cols wide) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-block hover:opacity-95 transition-opacity" aria-label="Sri Lakshmi Saree House Home">
              <Logo variant="full" isDark />
            </Link>
            <p className="text-[#A898B0] text-sm leading-relaxed max-w-sm">
              {BRAND.tagline} Discover timeless Pattu sarees, traditional handloom
              collections, and elegant ethnic wear from Hyderabad's trusted saree house —
              established {BRAND.established}.
            </p>

            {/* Contact Details */}
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#F0C860] mt-0.5 flex-shrink-0" />
                <p className="text-[#A898B0] text-xs leading-relaxed">
                  {BRAND.address.full}
                </p>
              </div>
              <a
                href={`tel:${BRAND.contact.shop.replace(/\s/g, '')}`}
                className="flex items-center gap-2.5 text-xs text-[#C8BDD2] hover:text-[#F0C860] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#F0C860] flex-shrink-0" />
                {BRAND.contact.shop} — Shop
              </a>
              <a
                href={`tel:${BRAND.contact.proprietor.replace(/\s/g, '')}`}
                className="flex items-center gap-2.5 text-xs text-[#C8BDD2] hover:text-[#F0C860] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#F0C860] flex-shrink-0" />
                {BRAND.contact.proprietor} — {BRAND.proprietor.name}
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-[#A8D5A2] hover:text-[#F0C860] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {BRAND.contact.whatsapp} — WhatsApp
              </a>
            </div>

            {/* Social */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#706873] mb-3 font-semibold">
                Follow Us
              </p>
              <a
                href={BRAND.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#C8BDD2] hover:text-[#F0C860] transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
                {BRAND.contact.instagram}
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-[0.18em] text-[#F0C860] mb-4">
              Shop Sarees
            </h4>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs text-[#A898B0] hover:text-[#FFF8F0] transition-colors leading-relaxed"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-[0.18em] text-[#F0C860] mb-4">
              SLSH Weaves
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs text-[#A898B0] hover:text-[#FFF8F0] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-[0.18em] text-[#F0C860] mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs text-[#A898B0] hover:text-[#FFF8F0] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <div className="mt-6 p-3 bg-[#300030] border border-[#F0C860]/20 rounded-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#F0C860] mb-1">
                WhatsApp Shopping
              </p>
              <p className="text-[11px] text-[#A898B0] mb-2">
                Video drapes · Enquiries · Orders
              </p>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full py-2 px-3 bg-[#426B46] hover:bg-[#345738] text-white text-[11px] font-semibold text-center rounded-sm transition-colors"
              >
                Chat with Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Decorative Divider ────────────────────────────────────── */}
      <div className="border-t border-[#3b0347]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#706873]">
            <div className="flex items-center gap-2">
              <FloralMotif className="w-3 h-3 text-[#F0C860]/40" />
              <p>
                © {new Date().getFullYear()} Sri Lakshmi Saree House · SLSH Weaves.
                All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy" className="hover:text-[#FFF8F0] transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-[#FFF8F0] transition-colors">
                Terms
              </Link>
              <Link to="/shipping-policy" className="hover:text-[#FFF8F0] transition-colors">
                Shipping
              </Link>
              <Link to="/returns-policy" className="hover:text-[#FFF8F0] transition-colors">
                Returns
              </Link>
              <span className="text-[#3b0347]">|</span>
              <span>
                Proprietor: {BRAND.proprietor.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
