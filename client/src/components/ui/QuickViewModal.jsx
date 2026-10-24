import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, Award, Scissors, ArrowRight, Video, Sparkles, Check } from 'lucide-react';
import { formatPrice } from '../../lib/utils.js';
import { useCart } from '../../contexts/CartContext.jsx';
import { useWishlist } from '../../contexts/WishlistContext.jsx';
import { FloralMotif } from '../../assets/Logo.jsx';

export function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [includeFallPico, setIncludeFallPico] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 0, y: 0 });
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    setAdded(false);
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isLiked = isInWishlist(product.id);
  const images = product.images && product.images.length > 0
    ? product.images
    : ['/images/kanjeevaram-bridal.jpg'];

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomCoords({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, includeFallPico, true);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#280030]/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="relative bg-white rounded-xs max-w-4xl w-full shadow-2xl border border-[#F0C860]/40 overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/80 hover:bg-[#280030] hover:text-white text-[#280030] transition-colors shadow-sm cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left: Gallery (6 cols) */}
            <div className="md:col-span-6 bg-[#FAF7F2] p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8DFE5]">
              {/* Main Image Stage */}
              <div 
                className="relative aspect-[3/4] rounded-xs overflow-hidden bg-white border border-[#E8DFE5] cursor-crosshair group shadow-xs"
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

                {product.isSilkMark && (
                  <div className="absolute top-2.5 left-2.5 bg-[#280030]/90 backdrop-blur-xs text-[#F0C860] border border-[#F0C860]/40 px-2 py-0.5 rounded-xs text-[9px] uppercase tracking-widest font-semibold flex items-center gap-1 shadow-xs">
                    <Award className="w-3 h-3 text-[#F0C860]" />
                    <span>Silk Mark Certified</span>
                  </div>
                )}

                {/* Magnifier lens on desktop */}
                {isZoomed && (
                  <div
                    className="absolute inset-0 pointer-events-none hidden md:block bg-no-repeat"
                    style={{
                      backgroundImage: `url(${images[activeImageIndex]})`,
                      backgroundPosition: `${zoomCoords.x}% ${zoomCoords.y}%`,
                      backgroundSize: '240%',
                    }}
                  />
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1 no-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-18 rounded-xs overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                        activeImageIndex === idx ? 'border-[#280030] shadow-sm' : 'border-[#E8DFE5] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt="" 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/kanjeevaram-crimson-pure.jpg';
                        }}
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Saree Details & Instant Actions (6 cols) */}
            <div className="md:col-span-6 p-5 sm:p-7 flex flex-col justify-between bg-white space-y-4">
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#706873] uppercase tracking-wider mb-1">
                  <span className="font-bold text-[#BD3D78]">{product.weave || product.category}</span>
                  <span>SKU: {product.sku}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#280030] leading-snug">
                  {product.name}
                </h3>

                {/* Price Display */}
                <div className="mt-2.5 flex items-baseline gap-2.5">
                  <span className="font-serif text-2xl font-bold text-[#280030]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-[#706873] line-through font-light">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-[10px] text-[#426B46] font-semibold bg-[#426B46]/10 px-2 py-0.5 rounded-xs">
                    Taxes Included
                  </span>
                </div>

                {/* Fast Specs */}
                <div className="mt-4 bg-[#FFF8F0] border border-[#E8DFE5] rounded-xs p-3 text-xs space-y-1.5 divide-y divide-[#E8DFE5]/60">
                  <div className="flex justify-between pt-1 first:pt-0">
                    <span className="text-[#706873]">Loom Origin:</span>
                    <span className="font-bold text-[#280030]">{product.origin}</span>
                  </div>
                  <div className="flex justify-between pt-1.5">
                    <span className="text-[#706873]">Zari Specification:</span>
                    <span className="font-bold text-[#280030]">{product.zari}</span>
                  </div>
                  <div className="flex justify-between pt-1.5">
                    <span className="text-[#706873]">Fabric Composition:</span>
                    <span className="font-bold text-[#280030]">{product.fabric}</span>
                  </div>
                </div>

                {/* Fall & Pico option */}
                <div className="mt-3 p-2.5 bg-[#FAF7F2] border border-[#F0C860]/40 rounded-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-3.5 h-3.5 text-[#280030]" />
                    <span className="text-xs font-semibold text-[#280030]">Complimentary Fall & Pico</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeFallPico}
                    onChange={(e) => setIncludeFallPico(e.target.checked)}
                    className="w-4 h-4 rounded-xs accent-[#280030] cursor-pointer"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center border border-[#E8DFE5] rounded-xs bg-white">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-2.5 py-2 text-xs text-[#706873] hover:text-[#280030] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-bold text-[#280030]">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-2.5 py-2 text-xs text-[#706873] hover:text-[#280030] cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#F0C860]" />
                    <span>{added ? 'Added to Bag!' : 'Add to Shopping Bag'}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className="w-10 h-10 rounded-xs border border-[#E8DFE5] flex items-center justify-center hover:bg-stone-50 transition-colors cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#BD3D78] text-[#BD3D78]' : 'text-[#706873]'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <Link
                    to={`/product/${product.slug || product.id}`}
                    onClick={onClose}
                    className="font-semibold text-[#280030] underline hover:text-[#BD3D78] flex items-center gap-1"
                  >
                    View Complete Saree Details <ArrowRight className="w-3 h-3" />
                  </Link>
                  <a
                    href={`https://wa.me/918639140385?text=Hello%20Sri%20Lakshmi%20Saree%20House,%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#426B46] font-semibold hover:underline flex items-center gap-1"
                  >
                    <Video className="w-3 h-3" /> WhatsApp Drape
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
