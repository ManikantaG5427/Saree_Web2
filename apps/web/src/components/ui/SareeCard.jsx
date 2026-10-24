import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Award } from 'lucide-react';
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
  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images?.[1] || primaryImage;

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
        className="group relative bg-white border border-[#E8DFE5] rounded-xs overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:border-[#F0C860]/70"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with Crossfade to Angle 2 on hover */}
        <Link to={`/product/${product.slug || product.id}`} className="relative aspect-[3/4] overflow-hidden bg-[#FAF7F2] block">
          {/* Primary Image */}
          <img
            src={primaryImage}
            alt={product.name}
            className={`w-full h-full object-cover object-top transition-opacity duration-700 ${
              isHovered && secondaryImage !== primaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
            loading="lazy"
          />

          {/* Secondary Angle (Crossfade on Hover) */}
          {secondaryImage !== primaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate angle`}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ${
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

        {/* Zari Specification */}
        {product.zari && (
          <p className="text-[10px] text-[#706873] mt-1 truncate">
            <span className="text-[#F0C860] font-semibold">✦ </span>
            {product.zari}
          </p>
        )}

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
