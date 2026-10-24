import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  ChevronDown, 
  Phone, 
  Sparkles, 
  Video,
  ShieldCheck,
  Award,
  ArrowRight
} from 'lucide-react';
import { Logo } from '../../assets/Logo.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useCart } from '../../contexts/CartContext.jsx';
import { useWishlist } from '../../contexts/WishlistContext.jsx';
import { useProducts } from '../../contexts/ProductContext.jsx';
import { formatPrice } from '../../lib/utils.js';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { products } = useProducts();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Smooth autoscroll to the main hero section
  const handleHomeClick = (e) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname === '/') {
      const heroEl = document.getElementById('hero') || document.getElementById('main-hero');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollToHero: true } });
      setTimeout(() => {
        const heroEl = document.getElementById('hero') || document.getElementById('main-hero');
        if (heroEl) {
          heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Close menus on route navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsMegaMenuOpen(false);
  }, [location.pathname, location.search]);

  // Real-time live search matching
  const liveResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.weave && p.weave.toLowerCase().includes(q)) ||
        (p.fabric && p.fabric.toLowerCase().includes(q)) ||
        (p.color && p.color.toLowerCase().includes(q))
      )
      .slice(0, 5);
  }, [searchQuery, products]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* ================= FIXED TOP NAVIGATION (ALWAYS PINNED ON SCROLL) ================= */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-b border-[#F0C860]/40 shadow-sm transition-all">
        {/* ================= SECTION A: ANNOUNCEMENT STRIP ================= */}
        <div className="bg-[#280030] text-[#FFF8F0] border-b border-[#F0C860]/30 py-1.5 px-4 text-xs font-medium">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left: Concise Verified Brand Heritage */}
            <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
              <span className="bg-[#F0C860] text-[#280030] font-bold px-2 py-0.5 rounded-xs text-[9px] uppercase tracking-widest flex items-center gap-1 shadow-xs">
                <Award className="w-3 h-3" />
                Established 2003
              </span>
              <span className="text-stone-300 text-[11px] tracking-wide truncate">
                Pattu Sarees • Wholesale & Retail • Hyderabad • Complimentary Fall & Pico
              </span>
            </div>

            {/* Right: Verified WhatsApp & Video Drape */}
            <div className="flex items-center gap-4 text-[11px] flex-shrink-0">
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 text-[#F0C860] hover:text-white transition-colors cursor-pointer"
              >
                <Video className="w-3.5 h-3.5" />
                <span>WhatsApp Video Drape</span>
              </button>

              <span className="hidden sm:inline text-stone-600">|</span>

              <a
                href="https://wa.me/918639140385?text=Hello%20Sri%20Lakshmi%20Saree%20House,%20I%20would%20like%20to%20inquire%20about%20your%20Pattu%20sarees"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white hover:text-[#F0C860] transition-colors"
              >
                <span className="text-[#426B46] font-bold">●</span>
                <span>WhatsApp: +91 86391 40385</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================= SECTION B: MAIN NAVIGATION ================= */}
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-[84px] gap-2 lg:gap-6">
            {/* Left: Mobile Toggle & Brand Logo */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#280030] hover:bg-[#FFF8F0] rounded-xs cursor-pointer transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link 
                to="/" 
                onClick={handleHomeClick}
                className="flex items-center gap-2 group py-1 cursor-pointer" 
                aria-label="Sri Lakshmi Saree House Home"
              >
                <Logo variant="full" />
              </Link>
            </div>

            {/* Center: Desktop Navigation Bar */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5 2xl:gap-5 flex-shrink-0">
              {/* Dedicated Home Button */}
              <button
                type="button"
                onClick={handleHomeClick}
                className={`text-[11px] xl:text-[11.5px] 2xl:text-[12px] font-semibold tracking-[0.08em] xl:tracking-[0.12em] uppercase transition-colors py-2 whitespace-nowrap flex-shrink-0 relative group cursor-pointer ${
                  location.pathname === '/' ? 'text-[#280030] font-bold' : 'text-[#29232A] hover:text-[#280030]'
                }`}
                aria-label="Home page hero"
              >
                <span>Home</span>
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#F0C860] transition-transform duration-300 origin-left ${
                  location.pathname === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>

              {/* Collections Dropdown */}
              <div
                className="relative py-2 group/menu flex-shrink-0"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-[11px] xl:text-[11.5px] 2xl:text-[12px] font-semibold tracking-[0.08em] xl:tracking-[0.14em] uppercase text-[#29232A] group-hover/menu:text-[#280030] cursor-pointer whitespace-nowrap py-1"
                >
                  <span>Shop Sarees</span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover/menu:rotate-180 transition-transform duration-200" />
                </button>

                {/* Mega Menu Popup */}
                {isMegaMenuOpen && (
                  <div className="absolute top-full -left-12 pt-3 z-50 w-[780px]">
                    <div className="bg-white rounded-xs shadow-2xl border border-[#E8DFE5] p-6 grid grid-cols-3 gap-6">
                      {/* Column 1: Traditional Weaves */}
                      <div>
                        <h4 className="font-serif text-[14px] font-bold text-[#280030] uppercase tracking-wider pb-2 border-b border-[#E8DFE5]">
                          Heritage Weaves
                        </h4>
                        <ul className="mt-3 space-y-2 text-xs font-medium text-[#706873]">
                          <li>
                            <Link to="/shop?category=Handloom Pattu Sarees" className="hover:text-[#280030] hover:translate-x-1 transition-all block">
                              Pure Kanjeevaram Korvai Pattu
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?category=Uppada Silk Sarees" className="hover:text-[#280030] hover:translate-x-1 transition-all block">
                              Uppada Jamdani Light Silks
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?category=Banarasi Brocades" className="hover:text-[#280030] hover:translate-x-1 transition-all block">
                              Banarasi Kadwa Katan Silks
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?category=Gadwal Handlooms" className="hover:text-[#280030] hover:translate-x-1 transition-all block">
                              Gadwal Sico & Silk Borders
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Column 2: Occasions */}
                      <div>
                        <h4 className="font-serif text-[14px] font-bold text-[#280030] uppercase tracking-wider pb-2 border-b border-[#E8DFE5]">
                          Shop By Occasion
                        </h4>
                        <ul className="mt-3 space-y-2 text-xs font-medium text-[#706873]">
                          <li>
                            <Link to="/shop?occasion=Weddings" className="hover:text-[#280030] hover:translate-x-1 transition-all block">
                              Muhurtham & Bridal Trousseau
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?occasion=Festivals" className="hover:text-[#280030] hover:translate-x-1 transition-all block">
                              Dussehra & Sankranti Festive
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?occasion=Family Celebrations" className="hover:text-[#280030] hover:translate-x-1 transition-all block">
                              Reception & Sangeet Wear
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?occasion=Traditional Ceremonies" className="hover:text-[#280030] hover:translate-x-1 transition-all block">
                              Pooja & Housewarming Drapes
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Column 3: Atelier & Modern */}
                      <div>
                        <h4 className="font-serif text-[14px] font-bold text-[#280030] uppercase tracking-wider pb-2 border-b border-[#E8DFE5]">
                          Atelier & Dress
                        </h4>
                        <ul className="mt-3 space-y-2 text-xs font-medium text-[#706873]">
                          <li>
                            <Link to="/shop?category=Dress Materials" className="hover:text-[#280030] hover:translate-x-1 transition-all block">
                              Pure Silk Dress Materials
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?category=Fancy & Boutique Sarees" className="hover:text-[#280030] hover:translate-x-1 transition-all block">
                              Organza & Tissue Boutique
                            </Link>
                          </li>
                          <li>
                            <Link to="/handloom-guide" className="hover:text-[#280030] hover:translate-x-1 transition-all block text-[#BD3D78] font-semibold">
                              ✦ Read Handloom Textile Guide
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Bottom Banner in Mega Menu */}
                      <div className="col-span-3 pt-3 mt-2 border-t border-[#E8DFE5] flex items-center justify-between text-xs text-[#706873] bg-[#FFF8F0] p-3 rounded-xs">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-[#280030]" />
                          <span>Direct loom weaving with verified Silk Mark authenticity on pure silks.</span>
                        </div>
                        <Link to="/shop" className="text-[#280030] font-bold uppercase tracking-wider hover:underline flex items-center gap-1">
                          <span>View Full Catalogue</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#F0C860]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/shop?category=Handloom Pattu Sarees"
                className="text-[11px] xl:text-[11.5px] 2xl:text-[12px] font-semibold tracking-[0.08em] xl:tracking-[0.12em] uppercase text-[#29232A] hover:text-[#280030] transition-colors py-2 whitespace-nowrap flex-shrink-0 relative group"
              >
                <span>Handloom Pattu</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F0C860] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>

              <Link
                to="/shop?occasion=Weddings"
                className="text-[11px] xl:text-[11.5px] 2xl:text-[12px] font-semibold tracking-[0.08em] xl:tracking-[0.12em] uppercase text-[#29232A] hover:text-[#280030] transition-colors py-2 whitespace-nowrap flex-shrink-0 relative group"
              >
                <span>Bridal<span className="hidden xl:inline"> Trousseau</span></span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F0C860] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>

              <Link
                to="/handloom-guide"
                className="text-[11px] xl:text-[11.5px] 2xl:text-[12px] font-semibold tracking-[0.08em] xl:tracking-[0.12em] uppercase text-[#29232A] hover:text-[#280030] transition-colors py-2 whitespace-nowrap flex-shrink-0 relative group"
              >
                <span>Weave Guide</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F0C860] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>

              <Link
                to="/wholesale"
                className="text-[11px] xl:text-[11.5px] 2xl:text-[12px] font-semibold tracking-[0.08em] xl:tracking-[0.12em] uppercase text-[#BD3D78] hover:text-[#280030] transition-colors py-2 whitespace-nowrap flex-shrink-0 relative group"
              >
                <span>Wholesale</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F0C860] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>

              <Link
                to="/about"
                className="text-[11px] xl:text-[11.5px] 2xl:text-[12px] font-semibold tracking-[0.08em] xl:tracking-[0.12em] uppercase text-[#29232A] hover:text-[#280030] transition-colors py-2 whitespace-nowrap flex-shrink-0 relative group"
              >
                <span>Our Story</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F0C860] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>

              <Link
                to="/contact"
                className="text-[11px] xl:text-[11.5px] 2xl:text-[12px] font-semibold tracking-[0.08em] xl:tracking-[0.12em] uppercase text-[#29232A] hover:text-[#280030] transition-colors py-2 whitespace-nowrap flex-shrink-0 relative group"
              >
                <span>Contact</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F0C860] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </nav>

            {/* Right: Search, Wishlist, Bag, Account / Admin */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0 pr-1 sm:pr-2">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-full text-[#29232A] hover:text-[#280030] hover:bg-[#FFF8F0] transition-colors cursor-pointer"
                aria-label="Search sarees"
              >
                <Search className="w-4.5 h-4.5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative w-9 h-9 flex items-center justify-center rounded-full text-[#29232A] hover:text-[#BD3D78] hover:bg-[#FFF8F0] transition-colors"
                aria-label={`Wishlist, ${wishlistCount} items`}
              >
                <Heart className="w-4.5 h-4.5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#BD3D78] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Button (Slide-over Drawer Trigger) */}
              <button
                type="button"
                onClick={openCart}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] rounded-full transition-all shadow-xs cursor-pointer hover:shadow-md"
                aria-label={`Shopping Bag, ${itemCount} items`}
              >
                <ShoppingBag className="w-4 h-4 text-[#F0C860]" />
                <span className="text-[11px] font-semibold uppercase tracking-wider hidden sm:inline">Bag</span>
                <span className="w-4 h-4 bg-[#F0C860] text-[#280030] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              </button>

              {/* Account / Admin Link */}
              {user ? (
                <div className="relative group/user py-2 pl-1">
                  <Link
                    to={user.role === 'admin' ? '/admin' : '/account'}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#280030] bg-[#FFF8F0] hover:bg-[#F5EBE1] border border-[#E8DFE5] hover:border-[#280030]/40 px-2 sm:px-2.5 py-1 rounded-full transition-all shadow-2xs"
                    aria-label="User Account"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#280030] text-[#F0C860] flex items-center justify-center font-bold text-xs ring-1 ring-[#F0C860]/70 flex-shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden xl:inline max-w-[80px] truncate text-[11px] font-semibold text-[#280030]">{user.name}</span>
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full pt-2 opacity-0 pointer-events-none group-hover/user:opacity-100 group-hover/user:pointer-events-auto transition-opacity z-50">
                    <div className="w-48 bg-white border border-[#E8DFE5] shadow-xl rounded-xs py-2 text-xs">
                      {user.role === 'admin' ? (
                        <>
                          <Link to="/admin" className="block px-4 py-2 hover:bg-[#FFF8F0] font-bold text-[#280030]">
                            ✦ Admin Studio
                          </Link>
                          <div className="border-t border-[#E8DFE5] my-1" />
                        </>
                      ) : (
                        <>
                          <Link to="/account" className="block px-4 py-2 hover:bg-[#FFF8F0] text-[#29232A]">
                            Profile & Addresses
                          </Link>
                          <Link to="/account/orders" className="block px-4 py-2 hover:bg-[#FFF8F0] text-[#29232A]">
                            My Orders & Tracking
                          </Link>
                          <Link to="/account/returns" className="block px-4 py-2 hover:bg-[#FFF8F0] text-[#29232A]">
                            Returns & Refunds
                          </Link>
                          <div className="border-t border-[#E8DFE5] my-1" />
                        </>
                      )}
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-[#BD3D78] hover:bg-[#FFF8F0] font-medium cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#280030] bg-[#FFF8F0] hover:bg-[#280030] hover:text-[#F0C860] border border-[#280030]/25 hover:border-[#280030] rounded-full transition-all shadow-2xs whitespace-nowrap ml-0.5"
                  aria-label="Account Login"
                >
                  <User className="w-3.5 h-3.5 text-[#BD3D78]" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Live Search Drawer */}
        {isSearchOpen && (
          <div className="border-t border-[#E8DFE5] bg-[#FFF8F0] p-4 shadow-inner">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search by weave (Kanjeevaram, Uppada), color, fabric, occasion..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-11 pr-24 py-3 bg-white border border-[#E8DFE5] rounded-xs text-sm text-[#29232A] placeholder-[#706873] focus:outline-none focus:border-[#280030] shadow-xs"
                />
                <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-[#706873]" />
                <button
                  type="submit"
                  className="absolute right-2 top-2 px-4 py-1.5 bg-[#280030] text-[#FFF8F0] rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-[#3b0347] cursor-pointer"
                >
                  Search
                </button>
              </form>

              {/* Live Search Matches Preview */}
              {liveResults.length > 0 && (
                <div className="mt-2 bg-white border border-[#E8DFE5] rounded-xs shadow-lg divide-y divide-[#E8DFE5]">
                  {liveResults.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug || p.id}`}
                      className="p-3 flex items-center gap-3 hover:bg-[#FFF8F0] transition-colors"
                    >
                      <img 
                        src={p.images?.[0] || '/images/kanjeevaram-crimson-pure.jpg'} 
                        alt={p.name} 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/kanjeevaram-crimson-pure.jpg';
                        }}
                        className="w-10 h-12 object-cover rounded-xs" 
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-sm font-bold text-[#29232A] truncate">{p.name}</p>
                        <p className="text-xs text-[#706873]">{p.weave} • {p.color}</p>
                      </div>
                      <span className="font-serif font-bold text-[#280030] text-sm">{formatPrice(p.price)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Fixed Header Spacer: Prevents page content from getting hidden under fixed navbar */}
      <div className="h-[112px] sm:h-[120px] w-full shrink-0" aria-hidden="true" />

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Mobile Header */}
            <div className="p-4 bg-[#280030] text-white flex items-center justify-between border-b border-[#F0C860]/40">
              <span className="font-serif text-base font-bold tracking-wider uppercase text-[#F0C860]">
                SLSH Weaves
              </span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="p-4 space-y-3 flex-1 text-sm font-semibold uppercase tracking-wider text-[#29232A]">
              <button
                type="button"
                onClick={handleHomeClick}
                className="block w-full text-left py-2 border-b border-stone-100 hover:text-[#280030] cursor-pointer"
              >
                Home
              </button>
              <Link to="/shop" className="block py-2 border-b border-stone-100 hover:text-[#280030]">
                Shop All Sarees
              </Link>
              <Link to="/shop?category=Handloom Pattu Sarees" className="block py-2 border-b border-stone-100 hover:text-[#280030]">
                Handloom & Pattu Silks
              </Link>
              <Link to="/shop?category=Uppada Silk Sarees" className="block py-2 border-b border-stone-100 hover:text-[#280030]">
                Uppada Jamdani
              </Link>
              <Link to="/shop?category=Banarasi Brocades" className="block py-2 border-b border-stone-100 hover:text-[#280030]">
                Banarasi Brocade
              </Link>
              <Link to="/shop?category=Dress Materials" className="block py-2 border-b border-stone-100 hover:text-[#280030]">
                Dress Materials
              </Link>
              <Link to="/about" className="block py-2 border-b border-stone-100 hover:text-[#280030]">
                Our Story (Est. 2003)
              </Link>
              <Link to="/wholesale" className="block py-2 border-b border-stone-100 text-[#BD3D78]">
                Wholesale Enquiries
              </Link>
              <Link to="/contact" className="block py-2 border-b border-stone-100 hover:text-[#280030]">
                Contact & Store Location
              </Link>
              <Link to="/handloom-guide" className="block py-2 border-b border-stone-100 hover:text-[#280030]">
                Handloom Guide
              </Link>
              <Link to="/track-order" className="block py-2 border-b border-stone-100 hover:text-[#280030]">
                Track Order
              </Link>
            </div>

            {/* Mobile Footer */}
            <div className="p-4 bg-[#FFF8F0] border-t border-[#E8DFE5] text-xs text-[#706873] space-y-2">
              <p className="font-semibold text-[#280030]">Sri Lakshmi Saree House</p>
              <p>P&T Colony Main Road, Dilsukhnagar, Hyderabad</p>
              <a href="tel:+919848202134" className="block font-bold text-[#280030]">
                Shop: +91 98482 02134
              </a>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Video Drape Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xs border border-[#E8DFE5] max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 text-[#706873] hover:text-[#280030] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#280030] text-[#F0C860] flex items-center justify-center">
                <Video className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#280030]">1-on-1 Video Drape Call</h3>
            </div>

            <p className="text-xs text-[#706873] leading-relaxed mb-4">
              Schedule a personalized WhatsApp video consultation directly with Sri Lakshmi Saree House to inspect the drape, true sunlight luster, and zari texture before ordering.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#FFF8F0] border border-[#F0C860]/40 rounded-xs">
                <p className="font-semibold text-[#280030]">Verified WhatsApp Shopping:</p>
                <p className="text-sm font-bold text-[#426B46] mt-0.5">+91 86391 40385</p>
                <p className="text-[11px] text-[#706873] mt-1">Available Monday to Saturday, 10:30 AM to 8:00 PM IST.</p>
              </div>

              <a
                href="https://wa.me/918639140385?text=Hi%20Sri%20Lakshmi%20Saree%20House,%20I%20would%20like%20to%20book%20a%20Video%20Drape%20call%20for%20Pattu%20Sarees"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#426B46] hover:bg-[#345738] text-white font-semibold rounded-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm block text-center"
              >
                <span>Launch WhatsApp Consultation</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
