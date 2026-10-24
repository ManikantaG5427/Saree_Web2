import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Award, Sparkles } from 'lucide-react';
import { formatPrice } from '../../lib/utils.js';
import { useWishlist } from '../../contexts/WishlistContext.jsx';
import { useCart } from '../../contexts/CartContext.jsx';
import { QuickViewModal } from './QuickViewModal.jsx';

export function SareeCard({ product }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const isLiked = isInWishlist(product.id);
  const primaryImage = product.images?.[0] || '/images/kanjeevaram-crimson-pure.jpg';
  // ONLY crossfade if product explicitly has a verified matching angle of the EXACT same saree
  const hasMatchingAngle = Boolean(product.hasMatchingAngle && product.images?.[1] && product.images[1] !== primaryImage);
  const secondaryImage = hasMatchingAngle ? product.images[1] : null;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, true, true);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div
        className="group relative bg-white border border-[#E8DFE5] rounded-xs overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-[#F0C860]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with Luxury Zoom / Matching Angle Crossfade */}
        <Link to={`/product/${product.slug || product.id}`} className="relative aspect-[3/4] overflow-hidden bg-[#FAF7F2] block">
          {/* Primary Image */}
          <img
            src={primaryImage}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/kanjeevaram-crimson-pure.jpg';
            }}
            className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${
              hasMatchingAngle && isHovered 
                ? 'opacity-0 scale-105' 
                : isHovered 
                  ? 'opacity-100 scale-108 brightness-[1.02]' 
                  : 'opacity-100 scale-100 brightness-100'
            }`}
            loading="lazy"
          />

          {/* Secondary Angle (Crossfade ONLY if verified matching angle of the same saree) */}
          {hasMatchingAngle && secondaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} matching angle`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = primaryImage;
              }}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              loading="lazy"
            />
          )}

          {/* Silk Mark Genuine Seal Badge */}
          {product.isSilkMark && (
            <div className="absolute top-2.5 left-2.5 z-10 bg-[#280030]/90 backdrop-blur-xs text-[#F0C860] border border-[#F0C860]/40 px-2 py-0.5 rounded-xs text-[9px] uppercase tracking-widest font-semibold flex items-center gap-1 shadow-xs">
              <Award className="w-3 h-3 text-[#F0C860]" />
              <span>Silk Mark</span>
            </div>
          )}

          {/* Discount Badge if Genuine original price exists */}
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="absolute top-2.5 right-2.5 z-10 bg-[#BD3D78] text-white font-bold px-2 py-0.5 rounded-xs text-[9px] uppercase tracking-wider shadow-xs">
              Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}

          {/* Top-right quick actions when hovered */}
          <div className="absolute top-10 right-2.5 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleQuickView}
              className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs shadow-md border border-[#E8DFE5] flex items-center justify-center text-[#280030] hover:text-[#BD3D78] hover:scale-110 transition-all cursor-pointer"
              title="Quick View Saree"
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Handloom Weave Design Spotlight (Revealed on Hover to highlight bespoke craftsmanship) */}
          <div className="absolute inset-x-2.5 bottom-12 z-20 pointer-events-none transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <div className="bg-[#180020]/95 backdrop-blur-md border border-[#F0C860]/70 rounded-xs px-2.5 py-2 shadow-2xl">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-[#F0C860]">
                  <Sparkles className="w-3 h-3 text-[#F0C860] animate-pulse shrink-0" />
                  <span className="text-[9px] font-bold tracking-widest uppercase">
                    Weave & Motif Design
                  </span>
                </div>
                <span className="text-[8.5px] text-[#F0C860]/90 font-mono tracking-wider font-semibold">
                  {product.weave?.split(' ')[0] || 'Handloom'}
                </span>
              </div>
              <p className="text-[11px] text-[#FFF9F2] font-medium leading-snug line-clamp-2">
                {product.designDetail || `${product.weave} with authentic ${product.zari || 'artisan motifs'}`}
              </p>
            </div>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute bottom-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs shadow-md border border-[#E8DFE5] flex items-center justify-center text-[#29232A] hover:text-[#BD3D78] hover:scale-110 transition-all cursor-pointer"
            aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#BD3D78] text-[#BD3D78]' : 'text-[#706873]'}`} />
          </button>

          {/* Quick Add Overlay on Hover */}
          <div className="absolute bottom-2.5 left-2.5 right-12 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleQuickAdd}
              className={`w-full py-1.5 px-3 rounded-xs text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all ${
                addedAnimation
                  ? 'bg-[#426B46] text-white'
                  : 'bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] border border-[#F0C860]/50'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#F0C860]" />
              <span>{addedAnimation ? 'Added!' : 'Quick Add'}</span>
            </button>
          </div>
        </Link>

      {/* Saree Information */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 bg-white">
        {/* Weave & Fabric Sub-tag */}
        <div className="flex items-center justify-between text-[11px] text-[#706873] font-medium tracking-wide mb-1">
          <span className="truncate">{product.weave || product.fabric || 'Pure Handloom'}</span>
          <span className="text-[#BD3D78] text-[10px] uppercase font-bold tracking-wider flex-shrink-0 ml-1">
            {product.origin?.split(',')[0]}
          </span>
        </div>

        {/* Title */}
        <Link to={`/product/${product.slug || product.id}`} className="block flex-1 group-hover:text-[#280030]">
          <h3 className="font-serif text-[14px] sm:text-[15px] font-bold text-[#29232A] group-hover:text-[#280030] line-clamp-2 leading-snug transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Design Motif Highlight - Attracts connoisseurs of authentic handloom */}
        {product.designDetail ? (
          <div className="mt-1.5 p-1.5 bg-[#FAF7F2] border border-[#F0C860]/40 rounded-xs flex items-start gap-1.5 group-hover:border-[#F0C860] group-hover:bg-[#FFF8F0] transition-colors">
            <Sparkles className="w-3 h-3 text-[#D4A827] shrink-0 mt-0.5" />
            <div className="text-[10px] leading-snug text-[#4A424E]">
              <span className="font-bold text-[#BD3D78] uppercase tracking-wider mr-1 text-[9px]">Design:</span>
              <span className="font-medium line-clamp-2 text-[#29232A]">{product.designDetail}</span>
            </div>
          </div>
        ) : product.zari ? (
          <p className="text-[10px] text-[#706873] mt-1 truncate">
            <span className="text-[#F0C860] font-semibold">✦ </span>
            {product.zari}
          </p>
        ) : null}

        {/* Price & Cart Footer */}
        <div className="mt-3 pt-2.5 border-t border-[#E8DFE5]/80 flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-[16px] sm:text-[17px] font-bold text-[#280030]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#706873] line-through font-light">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <span className="text-[10px] text-[#426B46] font-semibold uppercase tracking-wider">
            {product.stock > 0 ? (product.stock <= 2 ? 'Only 2 Left' : 'In Stock') : 'Sold Out'}
          </span>
        </div>
      </div>
    </div>

      {/* Interactive Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
