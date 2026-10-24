import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, MessageCircle, Award, Sparkles, Heart } from 'lucide-react';
import { FloralMotif } from '../assets/Logo.jsx';
import { BRAND, waLink } from '../config/brand.js';

export function About() {
  return (
    <div className="bg-[#FFF8F0] text-[#29232A]">
      {/* ─── Page Hero ─────────────────────────────────────────── */}
      <section className="bg-[#280030] text-[#FFF8F0] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 40%, #F0C860 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-px w-10 bg-[#F0C860]/60" />
            <FloralMotif className="w-5 h-5 text-[#F0C860]" />
            <div className="h-px w-10 bg-[#F0C860]/60" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
            A Tradition That Began<br />
            <span className="italic font-normal text-[#F0C860]">in 2003.</span>
          </h1>
          <p className="text-[#C8BDD2] text-base leading-relaxed max-w-xl mx-auto mt-5">
            The story of Sri Lakshmi Saree House — a saree destination woven into the
            fabric of Hyderabad's celebrations.
          </p>
        </div>
      </section>

      {/* ─── Brand Story Body ──────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <span className="text-[#BD3D78] font-semibold text-xs uppercase tracking-[0.22em]">
                Our Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#280030] leading-tight">
                Sri Lakshmi Saree House
              </h2>
              <div className="space-y-4 text-[#706873] text-sm sm:text-base leading-relaxed">
                <p>
                  Since {BRAND.established}, Sri Lakshmi Saree House has been part of Hyderabad's
                  saree-shopping tradition — bringing together Pattu sarees, traditional styles,
                  fancy sarees, and dress materials for life's special moments.
                </p>
                <p>
                  Rooted in Dilsukhnagar, our store has served generations of families celebrating
                  weddings, festivals, and everyday occasions. Every saree in our collection is
                  chosen for its quality, character, and the joy it brings when worn.
                </p>
                <p>
                  From heirloom Kanjeevaram drapes to lightweight everyday silks, we believe every
                  woman deserves a saree that fits her moment — and we are here to help her find it.
                </p>
              </div>

              <div className="bg-[#FFF8F0] border border-[#E8DFE5] rounded-sm p-5 space-y-3">
                <p className="font-serif text-base font-bold text-[#280030]">
                  {BRAND.proprietor.name}
                </p>
                <p className="text-xs text-[#706873]">
                  Proprietor, Sri Lakshmi Saree House · {BRAND.established}–Present
                </p>
                <a
                  href={`tel:${BRAND.proprietor.contact.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-xs font-semibold text-[#280030] hover:text-[#BD3D78] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> {BRAND.proprietor.contact}
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 border border-[#F0C860]/30 rounded-sm rotate-1 hidden sm:block" />
              <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-xl">
                <img
                  src="/images/handloom-artisan-loom.jpg"
                  alt="Traditional handloom master weaver — Sri Lakshmi Saree House"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/kanjeevaram-crimson-pure.jpg';
                  }}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#280030] border border-[#F0C860]/30 p-4 rounded-sm shadow-lg">
                <p className="font-serif text-3xl font-bold text-[#F0C860] leading-none">
                  {new Date().getFullYear() - BRAND.established}+
                </p>
                <p className="text-[10px] uppercase tracking-wider text-[#FFF8F0] mt-1 font-semibold">
                  Years of Trust
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── What We Offer ─────────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-[#E8DFE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[#BD3D78] font-semibold text-xs uppercase tracking-[0.22em]">
              Our Specializations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#280030] mt-2">
              What We Offer
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Award, title: 'Handloom Pattu Sarees', desc: 'Our core specialization — traditional Pattu drapes in Kanjeevaram, Uppada, Gadwal, and other celebrated weaves.' },
              { icon: Sparkles, title: 'Wedding & Bridal Sarees', desc: 'Curated muhurtham and reception drapes for Telugu weddings, bridal trousseaus, and family celebrations.' },
              { icon: Heart, title: 'Festive Collections', desc: 'Sankranti, Dussehra, and Ugadi collections in traditional silks, fancy organza, and boutique drapes.' },
              { icon: Award, title: 'Fancy Sarees', desc: 'Contemporary organza, tissue, and designer sarees for modern occasions and elegant parties.' },
              { icon: Sparkles, title: 'Dress Materials', desc: 'Pure silk and handloom fabric sets for bespoke tailoring and personalized ethnic wear.' },
              { icon: Heart, title: 'Wholesale & Bulk', desc: 'Direct loom pricing for retailers, resellers, and bulk purchasers across India.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#FFF8F0] border border-[#E8DFE5] rounded-sm p-6 space-y-3 hover:border-[#F0C860]/50 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-sm bg-[#280030] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#F0C860]" />
                </div>
                <h3 className="font-serif font-bold text-[#280030] text-base">{title}</h3>
                <p className="text-sm text-[#706873] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Visit & Contact ───────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#426B46] font-semibold text-xs uppercase tracking-[0.22em]">
            Come Visit Us
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#280030] mt-2 mb-6">
            Showroom & Contact
          </h2>
          <div className="bg-[#280030] text-[#FFF8F0] rounded-sm p-8 sm:p-10 space-y-5 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#F0C860] mt-0.5 flex-shrink-0" />
              <p className="text-[#C8BDD2] text-sm leading-relaxed">{BRAND.address.full}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href={`tel:${BRAND.contact.shop.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-sm text-[#FFF8F0] hover:text-[#F0C860] transition-colors">
                <Phone className="w-4 h-4 text-[#F0C860]" /> {BRAND.contact.shop}
              </a>
              <a href={`tel:${BRAND.contact.proprietor.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-sm text-[#FFF8F0] hover:text-[#F0C860] transition-colors">
                <Phone className="w-4 h-4 text-[#F0C860]" /> {BRAND.contact.proprietor}
              </a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#A8D5A2] hover:text-[#F0C860] transition-colors">
                <MessageCircle className="w-4 h-4" /> {BRAND.contact.whatsapp}
              </a>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={BRAND.address.mapsUrl} target="_blank" rel="noopener noreferrer"
                className="px-5 py-2 bg-[#F0C860] hover:bg-[#D8AF44] text-[#280030] font-bold text-xs uppercase tracking-wider rounded-sm transition-colors">
                Get Directions
              </a>
              <Link to="/contact"
                className="px-5 py-2 border border-[#F0C860]/50 hover:border-[#F0C860] text-[#FFF8F0] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors">
                Contact Page
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA strip ─────────────────────────────────────────── */}
      <section className="bg-[#FFF8F0] border-t border-[#E8DFE5] py-12">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <FloralMotif className="w-6 h-6 text-[#F0C860] mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-[#280030]">
            {BRAND.tagline}
          </h3>
          <p className="text-sm text-[#706873]">
            Explore our curated collection and find your perfect drape.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/shop"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all">
              Explore Sarees <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/wholesale"
              className="inline-flex items-center gap-2 px-7 py-3 border border-[#280030] text-[#280030] hover:bg-[#280030] hover:text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-all">
              Wholesale Enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
