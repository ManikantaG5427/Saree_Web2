import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  ShieldCheck,
  Heart,
  Video,
  MapPin,
  Phone,
  ChevronRight,
  Package,
  Sparkles,
  MessageCircle,
  Building2,
  Layers,
  Clock,
  Users,
} from 'lucide-react';
import { useProducts } from '../contexts/ProductContext.jsx';
import { SareeCard } from '../components/ui/SareeCard.jsx';
import { FloralMotif, SilkMarkIndia, IndiaHandloomMark, FloralCornerMotif } from '../assets/Logo.jsx';
import { formatPrice } from '../lib/utils.js';
import { BRAND, waLink } from '../config/brand.js';

/* ─── Tiny helpers ─────────────────────────────────────────────────── */

function SectionLabel({ children, color = 'rose' }) {
  const colors = {
    rose: 'text-[#BD3D78]',
    gold: 'text-[#D4A827]',
    green: 'text-[#426B46]',
    plum: 'text-[#280030]',
  };
  return (
    <span className={`${colors[color]} font-semibold text-xs uppercase tracking-[0.22em]`}>
      {children}
    </span>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-2 my-3">
      <div className="h-px w-10 bg-[#F0C860]" />
      <FloralMotif className="w-4 h-4 text-[#F0C860]" />
      <div className="h-px w-10 bg-[#F0C860]" />
    </div>
  );
}

/* ─── Section A+B are in Header ─────────────────────────────────────── */

export function Home() {
  const { products, categories } = useProducts();

  /* Hero Showcase Drapes */
  const heroDrapes = [
    {
      id: 'slsh-001',
      title: 'Maharani Crimson Gold Korvai',
      weave: 'Kanjeevaram Korvai · Pure Gold Zari',
      origin: 'Kanchipuram, Tamil Nadu',
      price: 38500,
      originalPrice: 44000,
      slug: 'maharani-crimson-gold-korvai-kanjeevaram-pattu',
      image: '/images/telugu-bridal-kanjeevaram.jpg',
      palluImage: '/images/kanjeevaram-pallu-pure.jpg',
      tag: 'Telugu Muhurtham Special',
    },
    {
      id: 'slsh-002',
      title: 'Royal Peacock Jamdani Silk',
      weave: 'Uppada Jamdani · Feather-light Pure Silk',
      origin: 'Uppada, Andhra Pradesh',
      price: 24500,
      originalPrice: 28000,
      slug: 'royal-peacock-jamdani-pure-uppada-silk',
      image: '/images/uppada-jamdani-model.jpg',
      palluImage: '/images/uppada-pallu-pure.jpg',
      tag: 'Heritage Jamdani Weave',
    },
    {
      id: 'slsh-003',
      title: 'Emerald Katan Kadwa Brocade',
      weave: 'Banarasi Katan · Kadwa Floral Booti',
      origin: 'Varanasi, Uttar Pradesh',
      price: 31000,
      originalPrice: 35500,
      slug: 'emerald-katan-kadwa-banarasi-brocade',
      image: '/images/emerald-banarasi-model.jpg',
      palluImage: '/images/emerald-banarasi-pallu-pure.jpg',
      tag: 'Royal Bridal Brocade',
    },
    {
      id: 'slsh-004',
      title: 'Sunlit Mustard Kupadam Pattu',
      weave: 'Gadwal Kupadam · Interlocked Temple Border',
      origin: 'Gadwal, Telangana',
      price: 18500,
      originalPrice: 22000,
      slug: 'sunlit-mustard-kupadam-gadwal-silk',
      image: '/images/gadwal-kupadam-model.jpg',
      palluImage: '/images/gadwal-pallu-pure.jpg',
      tag: 'Telangana Temple Border',
    },
    {
      id: 'slsh-006',
      title: 'Pastel Rose Scalloped Organza',
      weave: 'Pure Katan Organza · Resham Cutwork',
      origin: 'Varanasi & Hyderabad Atelier',
      price: 16500,
      originalPrice: 19500,
      slug: 'pastel-rose-scalloped-organza-silk',
      image: '/images/rose-organza-model.jpg',
      palluImage: '/images/rose-organza-pallu-pure.jpg',
      tag: 'Contemporary Festive Wear',
    },
  ];

  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  // Auto-cycle hero every 6 seconds if not hovered
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroDrapes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroDrapes.length]);

  /* Featured Drapes Filter Tabs */
  const [featuredTab, setFeaturedTab] = useState('All');
  const featuredTabs = ['All', 'Handloom Pattu', 'Uppada Jamdani', 'Banarasi', 'Gadwal'];

  const filteredFeaturedProducts = products.filter((p) => {
    if (featuredTab === 'All') return p.isFeatured;
    if (featuredTab === 'Handloom Pattu') return p.category === 'Handloom Pattu Sarees' || p.weave?.includes('Kanjeevaram');
    if (featuredTab === 'Uppada Jamdani') return p.category === 'Uppada Jamdani Silks' || p.weave?.includes('Uppada');
    if (featuredTab === 'Banarasi') return p.category === 'Banarasi Brocades' || p.weave?.includes('Banarasi');
    if (featuredTab === 'Gadwal') return p.category === 'Gadwal Handlooms' || p.weave?.includes('Gadwal');
    return true;
  }).slice(0, 4);

  /* Section J: Saree Finder state */
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');

  const occasions = ['All', 'Weddings', 'Festivals', 'Traditional Ceremonies', 'Family Celebrations', 'Everyday Wear'];
  const budgets = ['All', 'Under ₹15,000', '₹15,000 – ₹30,000', 'Above ₹30,000'];

  const discoveryProducts = products.filter((p) => {
    if (selectedOccasion !== 'All' && p.occasion !== selectedOccasion) return false;
    if (selectedBudget === 'Under ₹15,000' && p.price >= 15000) return false;
    if (selectedBudget === '₹15,000 – ₹30,000' && (p.price < 15000 || p.price > 30000)) return false;
    if (selectedBudget === 'Above ₹30,000' && p.price <= 30000) return false;
    return true;
  });

  return (
    <div className="bg-[#FFF8F0] text-[#29232A]">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION C — EDITORIAL HERO
          Deep plum background, split layout, strong serif headline
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-[#280030] text-[#FFF8F0]"
        aria-label="Hero"
      >
        {/* Subtle decorative gold lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-[#F0C860]/30" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#F0C860]/30" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, #F0C860 0%, transparent 55%), radial-gradient(circle at 80% 20%, #BD3D78 0%, transparent 50%)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* LEFT — Copy column */}
            <div className="space-y-6 sm:space-y-7">
              {/* Heritage badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#300030] border border-[#F0C860]/40 rounded-full text-[10px] tracking-[0.18em] uppercase font-semibold text-[#F0C860]">
                <FloralMotif className="w-3 h-3 text-[#F0C860]" />
                Sri Lakshmi Saree House · Est. {BRAND.established}
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.75rem] font-bold leading-[1.12] tracking-tight text-white">
                Woven in Tradition.{' '}
                <span className="block text-[#F0C860] italic font-normal mt-1">
                  Worn with Love.
                </span>
              </h1>

              <p className="text-[#D4CBDB] text-base sm:text-lg font-light leading-relaxed max-w-lg">
                Discover timeless Pattu sarees, beautiful handloom collections, and
                elegant ethnic wear at Sri Lakshmi Saree House — Hyderabad's trusted
                saree destination since 2003.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link
                  to="/shop"
                  id="hero-explore-btn"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F0C860] hover:bg-[#D8AF44] text-[#280030] font-bold text-xs uppercase tracking-[0.16em] rounded-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  Explore Pattu Sarees <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/about"
                  id="hero-story-btn"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#F0C860]/60 hover:border-[#F0C860] hover:bg-white/5 text-[#FFF8F0] font-semibold text-xs uppercase tracking-[0.16em] rounded-sm transition-all duration-300 cursor-pointer"
                >
                  Discover Our Story
                </Link>
              </div>

              {/* Trust strip & Certified Seals */}
              <div className="pt-5 border-t border-[#3b0347] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-5 text-xs text-[#A898B0]">
                  {[
                    'Pattu Saree Specialists',
                    'Wholesale & Retail',
                    'Dilsukhnagar, Hyderabad',
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F0C860]" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>

                {/* Silk Mark & India Handloom Official Badges */}
                <div className="flex items-center gap-3 bg-white/5 border border-[#F0C860]/20 rounded-sm p-1.5 px-3">
                  <SilkMarkIndia className="w-7 h-7" showText={false} />
                  <div className="h-6 w-px bg-white/20" />
                  <IndiaHandloomMark className="w-7 h-7" showText={false} />
                  <span className="text-[10px] uppercase tracking-widest text-[#F0C860] font-semibold hidden sm:inline">
                    100% Certified Handloom
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT — Interactive Masterpiece Drape Showcase */}
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              <div className="relative">
                {/* Corner Floral Filigree contained safely inside */}
                <FloralCornerMotif position="top-right" className="absolute top-1 right-1 w-16 h-16 z-20 hidden sm:block pointer-events-none opacity-80" />
                <FloralCornerMotif position="bottom-left" className="absolute bottom-1 left-1 w-16 h-16 z-20 hidden sm:block pointer-events-none opacity-80" />

                {/* Outer metallic gold frame */}
                <div className="absolute -inset-1.5 border border-[#F0C860]/40 rounded-sm hidden sm:block shadow-xl pointer-events-none" />

                {/* Main Showcase Stage */}
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-2xl bg-[#300030] border border-[#F0C860]/40 group">
                  <img
                    key={heroDrapes[activeHeroIndex].id}
                    src={heroDrapes[activeHeroIndex].image}
                    alt={heroDrapes[activeHeroIndex].title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/kanjeevaram-crimson-pure.jpg';
                    }}
                    className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 animate-in fade-in duration-500"
                    loading="eager"
                    fetchPriority="high"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="bg-[#280030]/90 backdrop-blur-xs text-[#F0C860] border border-[#F0C860]/40 px-2.5 py-1 rounded-xs text-[9px] uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-md">
                      <Award className="w-3.5 h-3.5 text-[#F0C860]" />
                      <span>Silk Mark Certified</span>
                    </span>
                    <span className="bg-[#BD3D78] text-white text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-xs shadow-md">
                      {heroDrapes[activeHeroIndex].tag}
                    </span>
                  </div>

                  {/* Floating Product Card at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#280030] via-[#280030]/90 to-transparent pt-14 pb-5 px-5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[10px] text-[#F0C860] uppercase tracking-[0.2em] font-bold">
                          {heroDrapes[activeHeroIndex].weave}
                        </p>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5 leading-snug">
                          {heroDrapes[activeHeroIndex].title}
                        </h3>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="font-serif text-base font-bold text-[#F0C860]">
                            {formatPrice(heroDrapes[activeHeroIndex].price)}
                          </span>
                          <span className="text-xs text-stone-300 line-through">
                            {formatPrice(heroDrapes[activeHeroIndex].originalPrice)}
                          </span>
                        </div>
                      </div>

                      <Link
                        to={`/product/${heroDrapes[activeHeroIndex].slug}`}
                        className="px-4 py-2 bg-[#F0C860] hover:bg-white text-[#280030] text-[11px] font-bold uppercase tracking-wider rounded-xs transition-colors shadow-md flex-shrink-0 cursor-pointer"
                      >
                        View Drape
                      </Link>
                    </div>

                    {/* Drape Selector Tabs */}
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                      <span className="text-[9px] uppercase tracking-wider text-stone-300 font-semibold mr-1">
                        Curated:
                      </span>
                      {heroDrapes.map((drape, idx) => (
                        <button
                          key={drape.id}
                          onClick={() => setActiveHeroIndex(idx)}
                          className={`px-2.5 py-1 rounded-xs text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                            activeHeroIndex === idx
                              ? 'bg-[#F0C860] text-[#280030] shadow-sm'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          0{idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION D — TRUST INDICATORS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-[#E8DFE5]" aria-label="Brand Trust">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#E8DFE5]">
            {[
              { value: '2003', label: 'Established Heritage' },
              { value: 'Pattu', label: 'Saree Specialists' },
              { value: 'Wholesale', label: '& Retail' },
              { value: 'Hyderabad', label: 'Dilsukhnagar Store' },
            ].map((item, i) => (
              <div key={i} className="px-4 lg:px-8 text-center py-4 first:pl-0 last:pr-0">
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#280030]">
                  {item.value}
                </p>
                <p className="text-xs uppercase tracking-wider text-[#706873] font-medium mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION E — SHOP BY COLLECTION (image-led grid)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Collections">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionLabel color="rose">Curated Handlooms</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#280030] mt-2">
            Signature Collections
          </h2>
          <GoldDivider />
          <p className="text-sm text-[#706873] leading-relaxed">
            Six curated weave families — from bridal Pattu to lightweight everyday drapes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              id={`collection-${cat.slug}`}
              className={`group relative overflow-hidden rounded-sm bg-[#300030] shadow-sm hover:shadow-xl transition-all duration-500 ${i === 0 ? 'md:col-span-2 md:row-span-1' : ''}`}
              style={{ aspectRatio: i === 0 ? '16/7' : '4/5' }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/kanjeevaram-crimson-pure.jpg';
                }}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#280030]/90 via-[#280030]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                  {cat.name}
                </p>
                <p className="text-xs text-[#D4CBDB] mt-1 line-clamp-1 hidden sm:block">
                  {cat.description}
                </p>
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-[#F0C860] font-semibold uppercase tracking-wider group-hover:gap-2 transition-all">
                  Explore <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/shop"
            id="view-all-collections-btn"
            className="inline-flex items-center gap-2 px-8 py-3 border border-[#280030] text-[#280030] hover:bg-[#280030] hover:text-white font-semibold text-xs uppercase tracking-[0.16em] rounded-sm transition-all duration-300"
          >
            View All Sarees <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION F — FEATURED SAREES ("A Saree for Every Story")
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#E8DFE5]" aria-label="Featured Products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <SectionLabel color="gold">Featured Drapes</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#280030] mt-2">
              A Saree for Every Story
            </h2>
            <GoldDivider />
            <p className="text-sm text-[#706873] leading-relaxed">
              Hand-picked from our finest weaving clusters across South India.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {featuredTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFeaturedTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                    featuredTab === tab
                      ? 'bg-[#280030] text-[#F0C860] shadow-sm'
                      : 'bg-white text-[#706873] border border-[#E8DFE5] hover:border-[#280030] hover:text-[#280030]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredFeaturedProducts.map((product) => (
              <SareeCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/shop"
              id="view-all-sarees-btn"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] font-semibold text-xs uppercase tracking-[0.16em] rounded-sm transition-all duration-300 shadow-md hover:shadow-lg"
            >
              View All Sarees <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION G — THE STORY OF HANDLOOM ("Every Weave Has a Story")
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24" aria-label="Handloom Story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Visual grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 order-2 lg:order-1">
              <div className="col-span-2 aspect-[16/8] rounded-sm overflow-hidden shadow-md border border-[#E8DFE5]">
                <img
                  src="/images/handloom-artisan-loom.jpg"
                  alt="Master weaver on traditional wooden pit loom weaving silk saree"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="aspect-square rounded-sm overflow-hidden shadow-sm border border-[#E8DFE5]">
                <img
                  src="/images/zari-pallu-macro.jpg"
                  alt="Close-up macro of pure gold zari Mayil peacock motifs"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="aspect-square rounded-sm overflow-hidden shadow-sm border border-[#E8DFE5] relative group">
                <img
                  src="/images/pochampally-loom-detail.jpg"
                  alt="Real handloom artisan at traditional pit loom weaving pure silk"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 bg-[#280030]/85 backdrop-blur-xs text-[#F0C860] text-[9px] font-semibold px-2 py-0.5 rounded-xs">
                  Real Pit Loom Artisan
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="order-1 lg:order-2 space-y-6">
              <SectionLabel color="green">Heritage & Craft</SectionLabel>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#280030] leading-tight">
                Every Weave<br />
                <span className="italic font-normal text-[#D4A827]">Has a Story.</span>
              </h2>
              <p className="text-[#706873] leading-relaxed text-sm sm:text-base">
                Discover the beauty of traditional textiles — their colours, patterns,
                textures, and the skill behind every thread. Each saree carries the
                fingerprints of master weavers and generations of craft.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Layers, title: 'Yarn & Fibre', desc: 'Pure mulberry silk, fine cotton, and tested zari threads from verified sources.' },
                  { icon: Sparkles, title: 'Borders & Motifs', desc: 'Temple borders, Rudraksha, Mayil peacock, and floral zari motifs unique to each weave school.' },
                  { icon: Award, title: 'Finish & Drape', desc: 'Natural lustre, graceful fall, and authentic weave certification on eligible collections.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FFF8F0] border border-[#E8DFE5] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#280030]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#29232A] text-sm">{title}</p>
                      <p className="text-xs text-[#706873] leading-relaxed mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/handloom-guide"
                id="handloom-guide-btn"
                className="inline-flex items-center gap-2 text-[#280030] font-bold text-xs uppercase tracking-[0.16em] border-b-2 border-[#F0C860] pb-0.5 hover:text-[#BD3D78] transition-colors"
              >
                Read the Handloom Guide <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION H — BRAND STORY ("A Tradition That Began in 2003")
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#280030] text-[#FFF8F0] py-16 sm:py-24 relative overflow-hidden" aria-label="Brand Story">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 70% 50%, #F0C860 0%, transparent 60%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <SectionLabel color="gold">Our Heritage</SectionLabel>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
                A Tradition That Began<br />
                <span className="text-[#F0C860] italic font-normal">in 2003.</span>
              </h2>
              <p className="text-[#C8BDD2] text-sm sm:text-base leading-relaxed max-w-lg">
                Since 2003, Sri Lakshmi Saree House has been part of Hyderabad's saree-shopping
                tradition — bringing together Pattu sarees, traditional styles, fancy sarees,
                and dress materials for life's special moments. From Dilsukhnagar to every home
                that celebrates in a beautiful drape.
              </p>
              <p className="text-[#C8BDD2] text-sm leading-relaxed max-w-lg italic">
                — {BRAND.proprietor.name}, Proprietor, Sri Lakshmi Saree House
              </p>
              <Link
                to="/about"
                id="our-story-btn"
                className="inline-flex items-center gap-2 px-7 py-3 border border-[#F0C860]/60 hover:border-[#F0C860] hover:bg-white/5 text-[#FFF8F0] font-semibold text-xs uppercase tracking-[0.16em] rounded-sm transition-all duration-300"
              >
                Know Our Story <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="relative">
              <FloralCornerMotif position="top-right" className="absolute -top-6 -right-6 w-20 h-20 z-20" />
              <div className="absolute -inset-3 border border-[#F0C860]/30 rounded-sm rotate-1 hidden sm:block" />
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-[#F0C860]/30 bg-[#300030]">
                <img
                  src="/images/official-store-poster.jpg"
                  alt="Sri Lakshmi Saree House — Official Showroom Poster Estd 2003"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#F0C860] text-[#280030] p-4 rounded-sm shadow-xl flex items-center gap-3">
                <SilkMarkIndia className="w-8 h-8" showText={false} />
                <div>
                  <p className="font-serif text-2xl font-bold leading-none">{new Date().getFullYear() - BRAND.established}+ Years</p>
                  <p className="text-[10px] uppercase tracking-wider font-bold mt-1 text-[#280030]">Of Trusted Weaving</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION I — SHOP BY OCCASION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Shop By Occasion">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionLabel color="rose">Shop By Occasion</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#280030] mt-2">
            Find the Right Drape
          </h2>
          <GoldDivider />
          <p className="text-sm text-[#706873]">
            A saree for every milestone — weddings, festivals, celebrations, and everyday elegance.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { label: 'Weddings', slug: 'Weddings', emoji: '🕌', img: '/images/gold-tissue-bridal.jpg' },
            { label: 'Festivals', slug: 'Festivals', emoji: '🪔', img: '/images/gadwal-mustard.jpg' },
            { label: 'Traditional', slug: 'Traditional Ceremonies', emoji: '🌺', img: '/images/uppada-peacock.jpg' },
            { label: 'Celebrations', slug: 'Family Celebrations', emoji: '✨', img: '/images/rose-organza.jpg' },
            { label: 'Everyday', slug: 'Everyday Wear', emoji: '☀️', img: '/images/kanjeevaram-bridal.jpg' },
            { label: 'Party & Gifts', slug: '', emoji: '🎁', img: '/images/emerald-banarasi.jpg' },
          ].map(({ label, slug, img }) => (
            <Link
              key={label}
              to={slug ? `/shop?occasion=${encodeURIComponent(slug)}` : '/shop'}
              id={`occasion-${label.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative aspect-[3/4] rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-400 border border-[#E8DFE5]"
            >
              <img src={img} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#280030]/90 via-[#280030]/25 to-transparent" />
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <p className="font-serif text-sm font-bold text-white">{label}</p>
                <span className="text-[9px] text-[#F0C860] uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION J — SAREE FINDER ("Find Your Saree")
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#FFF8F0] border-y border-[#E8DFE5]" aria-label="Saree Finder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <SectionLabel color="plum">Smart Discovery</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#280030] mt-2">
              Find Your Saree
            </h2>
            <GoldDivider />
            <p className="text-sm text-[#706873]">
              Filter by occasion and budget to discover your perfect drape.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto mb-10">
            <div className="flex-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#706873] block mb-2">
                Occasion
              </label>
              <div className="flex flex-wrap gap-2">
                {occasions.map((o) => (
                  <button
                    key={o}
                    id={`occasion-filter-${o.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setSelectedOccasion(o)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                      selectedOccasion === o
                        ? 'bg-[#280030] text-white border-[#280030]'
                        : 'bg-white text-[#706873] border-[#E8DFE5] hover:border-[#280030] hover:text-[#280030]'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:w-56">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#706873] block mb-2">
                Budget
              </label>
              <div className="flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <button
                    key={b}
                    id={`budget-filter-${b.toLowerCase().replace(/[₹\s–,]+/g, '-')}`}
                    onClick={() => setSelectedBudget(b)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                      selectedBudget === b
                        ? 'bg-[#F0C860] text-[#280030] border-[#F0C860]'
                        : 'bg-white text-[#706873] border-[#E8DFE5] hover:border-[#F0C860]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          {discoveryProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {discoveryProducts.slice(0, 4).map((p) => (
                <SareeCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#706873]">
              <Sparkles className="w-10 h-10 mx-auto mb-3 text-[#E8DFE5]" />
              <p className="font-serif text-lg text-[#280030]">No exact match for this combination.</p>
              <p className="text-sm mt-1">
                <Link to="/shop" className="text-[#BD3D78] underline">Browse all sarees</Link> or try different filters.
              </p>
            </div>
          )}

          {discoveryProducts.length > 0 && (
            <div className="text-center mt-8">
              <Link
                to={`/shop?occasion=${encodeURIComponent(selectedOccasion === 'All' ? '' : selectedOccasion)}`}
                className="text-sm font-semibold text-[#280030] underline underline-offset-4 hover:text-[#BD3D78] transition-colors"
              >
                View all matching sarees →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION K — WHOLESALE ENQUIRIES
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Wholesale">
        <div className="bg-[#280030] rounded-sm overflow-hidden shadow-2xl relative">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, #F0C860 0%, transparent 55%)',
            }}
          />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-8 sm:p-12 space-y-5">
              <SectionLabel color="gold">For Retailers & Resellers</SectionLabel>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Looking for Sarees<br />
                <span className="text-[#F0C860] italic font-normal">in Bulk?</span>
              </h2>
              <p className="text-[#C8BDD2] text-sm leading-relaxed max-w-md">
                Connect with Sri Lakshmi Saree House for wholesale and bulk purchase enquiries.
                Specializing in Pattu, handloom, and traditional sarees at direct loom pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  to="/wholesale"
                  id="wholesale-enquire-btn"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#F0C860] hover:bg-[#D8AF44] text-[#280030] font-bold text-xs uppercase tracking-[0.16em] rounded-sm transition-all duration-300"
                >
                  Enquire About Wholesale <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={waLink(BRAND.whatsappMessages.wholesale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="wholesale-whatsapp-btn"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#F0C860]/60 hover:bg-white/5 text-white font-semibold text-xs uppercase tracking-[0.16em] rounded-sm transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4 text-[#426B46]" />
                  WhatsApp Enquiry
                </a>
              </div>
            </div>
            <div className="hidden lg:block relative overflow-hidden">
              <img
                src="/images/zari-pallu-macro.jpg"
                alt="Wholesale pure zari handloom pattu collection"
                className="w-full h-full object-cover opacity-75"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION L — STORE VISIT & LOCATION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#E8DFE5]" aria-label="Store Location">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <SectionLabel color="green">Visit Us</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#280030] mt-2">
              Come to Our Store
            </h2>
            <GoldDivider />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Store Details */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#FFF8F0] rounded-sm p-6 border border-[#E8DFE5]">
                <h3 className="font-serif font-bold text-[#280030] text-lg mb-4">
                  Sri Lakshmi Saree House
                </h3>
                <div className="space-y-3 text-sm text-[#706873]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#BD3D78] mt-0.5 flex-shrink-0" />
                    <p className="leading-relaxed">{BRAND.address.full}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#280030] flex-shrink-0" />
                    <a href={`tel:${BRAND.contact.shop.replace(/\s/g, '')}`} className="font-semibold text-[#280030] hover:text-[#BD3D78] transition-colors">
                      {BRAND.contact.shop}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#280030] flex-shrink-0" />
                    <a href={`tel:${BRAND.contact.proprietor.replace(/\s/g, '')}`} className="font-semibold text-[#280030] hover:text-[#BD3D78] transition-colors">
                      {BRAND.contact.proprietor} (Proprietor)
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 text-[#426B46] flex-shrink-0" />
                    <a
                      href={waLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#426B46] hover:text-[#280030] transition-colors"
                    >
                      {BRAND.contact.whatsapp} (WhatsApp)
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href={BRAND.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="get-directions-btn"
                    className="w-full py-2.5 px-4 bg-[#280030] hover:bg-[#3b0347] text-white font-semibold text-xs uppercase tracking-wider rounded-sm text-center transition-colors flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Get Directions
                  </a>
                  <a
                    href={waLink(BRAND.whatsappMessages.videoDrape)}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="video-drape-btn"
                    className="w-full py-2.5 px-4 bg-[#426B46] hover:bg-[#345738] text-white font-semibold text-xs uppercase tracking-wider rounded-sm text-center transition-colors flex items-center justify-center gap-2"
                  >
                    <Video className="w-3.5 h-3.5" /> WhatsApp Video Drape
                  </a>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="lg:col-span-2 rounded-sm overflow-hidden shadow-md border border-[#E8DFE5] aspect-[16/9]">
              <iframe
                title="Sri Lakshmi Saree House Location — Dilsukhnagar, Hyderabad"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15229.34!2d78.5255!3d17.3688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba5ae18c2291f%3A0x748eba3bc1e0c25b!2sDilsukhnagar%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1698000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION M — INSTAGRAM / SOCIAL CLOSER
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-[#FFF8F0] border-t border-[#E8DFE5]" aria-label="Social">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel color="rose">Follow Our Journey</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#280030] mt-3">
            @slsh_weaves
          </h2>
          <p className="text-sm text-[#706873] mt-3 max-w-md mx-auto leading-relaxed">
            Follow us on Instagram for new arrivals, festival lookbooks, draping inspiration,
            and behind-the-scenes from our saree house.
          </p>
          <a
            href={BRAND.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="instagram-follow-btn"
            className="mt-6 inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-semibold text-xs uppercase tracking-[0.16em] rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Follow on Instagram
          </a>

          {/* Non-duplicate saree image grid */}
          <div className="mt-10 grid grid-cols-3 sm:grid-cols-6 gap-2 max-w-3xl mx-auto">
            {[
              { src: '/images/kanjeevaram-bridal.jpg', alt: 'Bridal Kanjeevaram' },
              { src: '/images/uppada-peacock.jpg', alt: 'Uppada Jamdani' },
              { src: '/images/emerald-banarasi.jpg', alt: 'Emerald Banarasi' },
              { src: '/images/gadwal-mustard.jpg', alt: 'Gadwal Handloom' },
              { src: '/images/gold-tissue-bridal.jpg', alt: 'Tissue Gold Bridal' },
              { src: '/images/rose-organza.jpg', alt: 'Organza Party Saree' },
            ].map(({ src, alt }, i) => (
              <div key={i} className="aspect-square rounded-sm overflow-hidden group cursor-pointer border border-[#E8DFE5]">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
