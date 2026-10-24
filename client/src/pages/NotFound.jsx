import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, ShoppingBag, Phone } from 'lucide-react';
import { BRAND, waLink } from '../config/brand.js';
import { FloralMotif } from '../assets/Logo.jsx';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-6">
        {/* Decorative */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-px w-10 bg-[#F0C860]" />
          <FloralMotif className="w-5 h-5 text-[#F0C860]" />
          <div className="h-px w-10 bg-[#F0C860]" />
        </div>

        <div className="font-serif text-8xl sm:text-9xl font-bold text-[#280030]/10 leading-none select-none">
          404
        </div>

        <div className="-mt-8 space-y-3">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#280030]">
            This Page Isn't in Our Collection
          </h1>
          <p className="text-[#706873] text-sm leading-relaxed max-w-sm mx-auto">
            The saree you are looking for may have been moved, sold, or this link may be incorrect.
            Let us help you find what you need.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#E8DFE5] hover:border-[#280030] text-[#29232A] hover:text-[#280030] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Go Back
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all"
          >
            <Home className="w-3.5 h-3.5" /> Go Home
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F0C860] hover:bg-[#D8AF44] text-[#280030] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Shop Sarees
          </Link>
        </div>

        {/* Quick links */}
        <div className="pt-4 border-t border-[#E8DFE5]">
          <p className="text-xs text-[#706873] mb-3 uppercase tracking-wider font-semibold">
            Popular Destinations
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {[
              { label: 'Pattu Sarees', to: '/shop?category=Handloom Pattu Sarees' },
              { label: 'Wedding Sarees', to: '/shop?occasion=Weddings' },
              { label: 'Dress Materials', to: '/shop?category=Pure Silk Dress Materials' },
              { label: 'Our Story', to: '/about' },
              { label: 'Contact', to: '/contact' },
              { label: 'Wholesale', to: '/wholesale' },
            ].map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="px-3 py-1.5 bg-white border border-[#E8DFE5] rounded-full text-[#706873] hover:text-[#280030] hover:border-[#280030] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Need help */}
        <div className="bg-[#FFF8F0] border border-[#E8DFE5] rounded-sm p-4 text-sm text-left">
          <p className="font-semibold text-[#280030] text-xs uppercase tracking-wider mb-2">Need Help?</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${BRAND.contact.shop.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-xs text-[#706873] hover:text-[#280030] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#280030]" /> {BRAND.contact.shop}
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-[#426B46] hover:text-[#280030] transition-colors"
            >
              <Search className="w-3.5 h-3.5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
