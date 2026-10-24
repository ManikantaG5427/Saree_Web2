import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  Award, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Video, 
  Share2, 
  Check, 
  ArrowLeft,
  Scissors
} from 'lucide-react';
import { useProducts } from '../contexts/ProductContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { useWishlist } from '../contexts/WishlistContext.jsx';
import { formatPrice } from '../lib/utils.js';
import { SareeCard } from '../components/ui/SareeCard.jsx';
import { FloralMotif, SilkMarkIndia, IndiaHandloomMark } from '../assets/Logo.jsx';

export function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getProductBySlug, products } = useProducts();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = getProductBySlug(slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [includeFallPico, setIncludeFallPico] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 0, y: 0 });
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center p-6 text-center">
        <FloralMotif className="w-12 h-12 text-[#F0C860] mb-3" />
        <h2 className="font-serif text-2xl font-bold text-[#280030]">Saree Not Found</h2>
        <p className="text-xs text-[#706873] mt-2 mb-6">
          The requested handloom drape may have been sold or archived.
        </p>
        <Link
          to="/shop"
          className="px-6 py-2.5 bg-[#280030] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);
  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'];

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomCoords({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, includeFallPico);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, includeFallPico);
    navigate('/checkout');
  };

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="bg-[#FFF8F0] min-h-screen">
      {/* Breadcrumb Nav */}
      <div className="border-b border-[#E8DFE5] bg-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-[#706873]">
          <div className="flex items-center gap-2 truncate">
            <Link to="/" className="hover:text-[#280030]">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-[#280030]">Shop</Link>
            <span>/</span>
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#280030] truncate">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[#280030] font-semibold truncate">{product.name}</span>
          </div>

          <Link to="/shop" className="hidden sm:flex items-center gap-1 text-[#280030] hover:underline font-semibold flex-shrink-0">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Collection</span>
          </Link>
        </div>
      </div>

      {/* Main Saree Display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Multi-Angle Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails list */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px] flex-shrink-0 no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 md:w-20 md:h-26 rounded-xs overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#280030] shadow-md' : 'border-[#E8DFE5] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Angle ${idx + 1}`} 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/kanjeevaram-crimson-pure.jpg';
                    }}
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image with Zoom */}
            <div className="flex-1 relative aspect-[3/4] bg-white rounded-xs border border-[#E8DFE5] overflow-hidden shadow-sm">
              <div
                className="w-full h-full relative cursor-crosshair"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={images[activeImageIndex]}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/kanjeevaram-crimson-pure.jpg';
                  }}
                  className="w-full h-full object-cover object-top select-none"
                />

                {/* Silk Mark Indicator Overlay */}
                {product.isSilkMark && (
                  <div className="absolute top-3 left-3 bg-[#280030]/90 backdrop-blur-xs text-[#F0C860] border border-[#F0C860]/40 px-3 py-1 rounded-xs text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-sm">
                    <Award className="w-3.5 h-3.5 text-[#F0C860]" />
                    <span>Silk Mark Certified Pure Silk</span>
                  </div>
                )}

                {/* High Resolution Magnifier Zoom Overlay */}
                {isZoomed && (
                  <div
                    className="absolute inset-0 pointer-events-none z-20 hidden md:block bg-no-repeat rounded-xs"
                    style={{
                      backgroundImage: `url(${images[activeImageIndex]})`,
                      backgroundPosition: `${zoomCoords.x}% ${zoomCoords.y}%`,
                      backgroundSize: '250%',
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right: Product Specifications & Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#706873] mb-1">
                <span className="font-semibold tracking-wider uppercase text-[#BD3D78]">{product.weave}</span>
                <span className="tracking-wider">SKU: {product.sku}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#280030] leading-snug">
                {product.name}
              </h1>

              {/* Price Display */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#280030]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base text-[#706873] line-through font-light">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-[#426B46] font-semibold bg-[#426B46]/10 px-2 py-0.5 rounded-xs">
                  Taxes Included
                </span>
              </div>
            </div>

            {/* Weave Attributes Box */}
            <div className="bg-white border border-[#E8DFE5] rounded-xs p-4 divide-y divide-[#E8DFE5] text-xs">
              <div className="py-2 flex justify-between">
                <span className="text-[#706873]">Fabric:</span>
                <span className="font-bold text-[#29232A]">{product.fabric}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-[#706873]">Zari Type:</span>
                <span className="font-bold text-[#29232A]">{product.zari}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-[#706873]">Loom Origin:</span>
                <span className="font-bold text-[#29232A]">{product.origin}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-[#706873]">Length & Dimensions:</span>
                <span className="font-bold text-[#29232A]">{product.length}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-[#706873]">Blouse Piece:</span>
                <span className="font-bold text-[#29232A]">{product.blouseDetail || 'Included'}</span>
              </div>
            </div>

            {/* Complimentary Fall & Pico Checkbox */}
            <div className="p-3 bg-[#FFF8F0] border border-[#F0C860]/50 rounded-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#280030]" />
                <div>
                  <p className="text-xs font-bold text-[#280030]">Complimentary Fall & Pico Hemming</p>
                  <p className="text-[10px] text-[#706873]">Precision tailored and tone-matched before dispatch.</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={includeFallPico}
                onChange={(e) => setIncludeFallPico(e.target.checked)}
                className="w-4 h-4 rounded-xs text-[#280030] focus:ring-[#280030]"
              />
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#E8DFE5] rounded-xs bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-sm text-[#706873] hover:text-[#280030] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold text-[#280030]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-sm text-[#706873] hover:text-[#280030] cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#F0C860]" />
                  <span>{addedNotice ? 'Added to Bag!' : 'Add to Shopping Bag'}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="w-11 h-11 rounded-xs border border-[#E8DFE5] bg-white flex items-center justify-center text-[#29232A] hover:text-[#BD3D78] transition-colors cursor-pointer"
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-[#BD3D78] text-[#BD3D78]' : 'text-[#706873]'}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#F0C860] hover:bg-[#D8AF44] text-[#280030] text-xs font-bold uppercase tracking-[0.16em] rounded-xs shadow-md transition-all cursor-pointer"
              >
                Instant Buy Now
              </button>
            </div>

            {/* WhatsApp Video Drape Trigger */}
            <div className="pt-2">
              <a
                href={`https://wa.me/918639140385?text=Hello%20Sri%20Lakshmi%20Saree%20House,%20I%20would%20like%20to%20request%20daylight%20photos%20or%20a%20video%20call%20for%20${encodeURIComponent(product.name)}%20(SKU:%20${product.sku})`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-white border border-[#426B46] text-[#426B46] hover:bg-[#426B46]/5 rounded-xs text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors block text-center"
              >
                <Video className="w-4 h-4" />
                <span>Request WhatsApp Daylight Video / Drape Call</span>
              </a>
            </div>

            {/* Description & Weave Story Tabs */}
            <div className="pt-4 border-t border-[#E8DFE5] space-y-4">
              <div>
                <h4 className="font-serif text-sm font-bold text-[#280030] uppercase tracking-wider">
                  Product Description
                </h4>
                <p className="text-xs text-[#706873] leading-relaxed mt-1">
                  {product.description}
                </p>
              </div>

              {product.weaveStory && (
                <div className="bg-[#FFF8F0] p-4 rounded-xs border border-[#E8DFE5]">
                  <h4 className="font-serif text-xs font-bold text-[#280030] uppercase tracking-wider flex items-center gap-1.5">
                    <FloralMotif className="w-3.5 h-3.5 text-[#F0C860]" />
                    <span>Loom Craftsmanship Note</span>
                  </h4>
                  <p className="text-xs text-[#706873] leading-relaxed mt-1 italic">
                    "{product.weaveStory}"
                  </p>
                </div>
              )}
            </div>

            {/* Assurances & Official Certification Seals */}
            <div className="space-y-3 pt-4 border-t border-[#E8DFE5]">
              <div className="bg-[#FFF8F0] border border-[#E8DFE5] rounded-xs p-3.5 flex items-center justify-between">
                <SilkMarkIndia className="w-9 h-9" />
                <div className="h-8 w-px bg-[#E8DFE5]" />
                <IndiaHandloomMark className="w-9 h-9" />
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] text-[#706873]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#280030]" />
                  <span>Insured Express Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#426B46]" />
                  <span>100% Tested Pure Zari</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-[#BD3D78]" />
                  <span>Complimentary Fall & Pico</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[#280030]" />
                  <span>7-Day Return Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Sarees */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E8DFE5]">
            <h3 className="font-serif text-2xl font-bold text-[#280030] mb-6">
              You May Also Admire
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <SareeCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Conversion Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DFE5] p-3 md:hidden shadow-xl flex items-center gap-2.5">
        <div className="min-w-0 pr-2">
          <p className="font-serif text-base font-bold text-[#280030] leading-none">
            {formatPrice(product.price)}
          </p>
          <span className="text-[9px] text-[#426B46] font-semibold uppercase">In Stock</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-2.5 px-3 bg-[#280030] hover:bg-[#3b0347] text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#F0C860]" />
          <span>{addedNotice ? 'Added to Bag!' : 'Add to Bag'}</span>
        </button>
        <a
          href={`https://wa.me/918639140385?text=Hi%20Sri%20Lakshmi%20Saree%20House,%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-[#426B46] hover:bg-[#345738] text-white rounded-xs flex items-center justify-center flex-shrink-0 shadow-sm transition-colors"
          aria-label="WhatsApp Video Drape"
        >
          <Video className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
