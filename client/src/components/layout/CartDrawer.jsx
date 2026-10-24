import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Award, Lock, Sparkles, Check } from 'lucide-react';
import { useCart } from '../../contexts/CartContext.jsx';
import { formatPrice } from '../../lib/utils.js';

export function CartDrawer() {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart, 
    toggleFallAndPico,
    subtotal, 
    shippingFee, 
    total,
    itemCount 
  } = useCart();
  
  const navigate = useNavigate();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = freeShippingThreshold - subtotal;

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleViewBag = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div 
        className="fixed inset-0 bg-[#280030]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF8F0] shadow-2xl flex flex-col border-l border-[#F0C860]/40 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#280030] text-[#FFF8F0] border-b border-[#F0C860]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F0C860]/10 border border-[#F0C860]/40 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#F0C860]" />
              </div>
              <div>
                <h2 id="slide-over-title" className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                  Your Shopping Bag
                </h2>
                <p className="text-[10px] text-[#D4CBDB] tracking-wider uppercase">
                  {itemCount} {itemCount === 1 ? 'Handloom Saree' : 'Handloom Sarees'}
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FAF4EC] px-4 py-2.5 border-b border-[#E8DFE5]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-[#280030] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A827]" />
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-[#426B46] font-bold">Free Insured Express Delivery Unlocked!</span>
                ) : (
                  <span>
                    Add <strong className="text-[#BD3D78]">{formatPrice(amountNeeded)}</strong> for Free Express Delivery
                  </span>
                )}
              </span>
              <span className="text-[10px] font-bold text-[#706873]">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#E8DFE5] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#F0C860] to-[#BD3D78] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Saree Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-[#E8DFE5]/80">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#E8DFE5]/40 flex items-center justify-center mx-auto mb-4 text-[#706873]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#280030]">Your bag is empty</h3>
                <p className="text-xs text-[#706873] mt-1.5 max-w-xs mx-auto">
                  Explore our pure handloom Kanjeevarams, Uppada Jamdanis, and bridal silks.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/shop');
                  }}
                  className="mt-6 px-6 py-2.5 bg-[#280030] text-[#FFF8F0] hover:bg-[#3b0347] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-sm cursor-pointer"
                >
                  Explore Masterpieces
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="pt-4 first:pt-0 flex gap-3.5">
                  {/* Saree Thumbnail */}
                  <Link 
                    to={`/product/${item.product.slug || item.product.id}`}
                    onClick={closeCart}
                    className="w-20 h-26 rounded-xs overflow-hidden border border-[#E8DFE5] bg-white flex-shrink-0 relative group"
                  >
                    <img 
                      src={item.product.images?.[0] || '/images/kanjeevaram-bridal.jpg'} 
                      alt={item.product.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/kanjeevaram-crimson-pure.jpg';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    {item.product.isSilkMark && (
                      <span className="absolute bottom-1 left-1 bg-[#280030]/90 text-[#F0C860] text-[8px] font-bold px-1 rounded-xs uppercase tracking-tighter">
                        Silk Mark
                      </span>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link 
                          to={`/product/${item.product.slug || item.product.id}`}
                          onClick={closeCart}
                          className="font-serif text-xs sm:text-sm font-bold text-[#280030] hover:text-[#BD3D78] transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#706873] hover:text-[#BD3D78] p-1 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#706873] mt-0.5">
                        {item.product.weave || item.product.category}
                      </p>

                      {/* Complimentary Fall & Pico Toggle */}
                      <label className="mt-2 inline-flex items-center gap-1.5 cursor-pointer select-none bg-white border border-[#E8DFE5] px-2 py-1 rounded-xs text-[10px] text-[#280030]">
                        <input
                          type="checkbox"
                          checked={item.fallAndPico !== false}
                          onChange={() => toggleFallAndPico(item.product.id)}
                          className="w-3.5 h-3.5 rounded-xs accent-[#280030]"
                        />
                        <span className="font-semibold">Complimentary Fall & Pico Hemming</span>
                      </label>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E8DFE5] bg-white rounded-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#706873] hover:text-[#280030] hover:bg-stone-50 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-[#280030] min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#706873] hover:text-[#280030] hover:bg-stone-50 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-sm font-bold text-[#280030]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                          <span className="block text-[10px] text-[#706873] line-through">
                            {formatPrice(item.product.originalPrice * item.quantity)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Totals and Action Buttons */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#E8DFE5] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#706873]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#29232A]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#706873]">
                  <span>Insured Express Shipping</span>
                  <span className="font-semibold text-[#426B46]">
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#280030] pt-2 border-t border-[#E8DFE5]">
                  <span>Total (Taxes Included)</span>
                  <span className="font-serif text-base text-[#280030]">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] font-bold text-xs uppercase tracking-[0.16em] rounded-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-[#F0C860]" />
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleViewBag}
                  className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-[#280030] font-semibold text-xs uppercase tracking-wider rounded-xs text-center transition-colors cursor-pointer"
                >
                  View Full Shopping Bag
                </button>
              </div>

              {/* Trust markers */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-[#706873] pt-2 border-t border-[#E8DFE5]/60">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#426B46]" />
                  100% Verified Silk
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#D4A827]" />
                  Estd 2003 Hyderabad
                </span>
                <span>•</span>
                <span>7-Day Return Policy</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
