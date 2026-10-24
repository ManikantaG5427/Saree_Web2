import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Scissors } from 'lucide-react';
import { useCart } from '../contexts/CartContext.jsx';
import { formatPrice } from '../lib/utils.js';
import { FloralMotif } from '../assets/Logo.jsx';

export function Cart() {
  const { items, updateQuantity, removeFromCart, toggleFallAndPico, subtotal, shippingFee, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FFF8F0] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#280030]/10 flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8 text-[#280030]" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#280030]">Your Shopping Bag is Empty</h2>
        <p className="text-xs sm:text-sm text-[#706873] mt-2 mb-6 max-w-sm">
          Discover handloom pattu drapes, pure Uppada silks, and bridal masterpieces crafted by master artisans.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-[#280030] text-[#FFF8F0] text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#3b0347] transition-all shadow-md"
        >
          Explore Sarees
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8F0] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-bold text-[#280030] mb-8">
          Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)} Items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items Table (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-[#E8DFE5] rounded-xs divide-y divide-[#E8DFE5]">
              {items.map((item) => (
                <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                  <Link to={`/product/${item.product.slug || item.product.id}`} className="w-20 h-26 rounded-xs overflow-hidden bg-[#FAF7F2] flex-shrink-0 border border-[#E8DFE5]">
                    <img
                      src={item.product.images?.[0] || '/images/kanjeevaram-crimson-pure.jpg'}
                      alt={item.product.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/kanjeevaram-crimson-pure.jpg';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[#BD3D78] font-bold uppercase tracking-wider">
                      {item.product.weave}
                    </span>
                    <Link to={`/product/${item.product.slug || item.product.id}`} className="block">
                      <h3 className="font-serif text-base font-bold text-[#280030] hover:underline truncate">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#706873] mt-0.5">
                      {item.product.fabric} • SKU: {item.product.sku}
                    </p>

                    <label className="mt-2 inline-flex items-center gap-1.5 cursor-pointer select-none bg-[#FAF7F2] border border-[#E8DFE5] px-2.5 py-1 rounded-xs text-[11px] text-[#280030]">
                      <input
                        type="checkbox"
                        checked={item.fallAndPico !== false}
                        onChange={() => toggleFallAndPico(item.product.id)}
                        className="w-3.5 h-3.5 rounded-xs accent-[#280030]"
                      />
                      <Scissors className="w-3 h-3 text-[#280030]" />
                      <span className="font-semibold">Complimentary Fall & Pico Hemming</span>
                    </label>

                    <div className="mt-2 text-sm font-serif font-bold text-[#280030]">
                      {formatPrice(item.product.price)}
                    </div>
                  </div>

                  {/* Quantity & Delete Controls */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                    <div className="flex items-center border border-[#E8DFE5] rounded-xs bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs text-[#706873] hover:text-[#280030] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 text-xs font-bold text-[#280030]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs text-[#706873] hover:text-[#280030] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#BD3D78] hover:text-[#280030] p-1 cursor-pointer"
                      title="Remove Saree"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Buyer Trust Pill */}
            <div className="p-4 bg-white border border-[#E8DFE5] rounded-xs flex items-center gap-3 text-xs text-[#706873]">
              <ShieldCheck className="w-5 h-5 text-[#280030] flex-shrink-0" />
              <span>
                All pure silks come with certified Silk Mark holograms and insured priority courier tracking from Sri Lakshmi Saree House.
              </span>
            </div>
          </div>

          {/* Order Summary (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 space-y-5 shadow-sm sticky top-24">
              <h2 className="font-serif text-lg font-bold text-[#280030] border-b border-[#E8DFE5] pb-3">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[#706873]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#29232A]">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-[#706873]">
                  <span>Insured Express Shipping</span>
                  <span className="font-semibold text-[#426B46]">
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-[#706873]">
                  <span>Fall & Pico Finishing</span>
                  <span className="font-semibold text-[#426B46]">COMPLIMENTARY</span>
                </div>

                <div className="pt-3 border-t border-[#E8DFE5] flex justify-between text-sm font-bold text-[#280030]">
                  <span>Total Amount</span>
                  <span className="font-serif text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] font-bold text-xs uppercase tracking-[0.16em] rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#F0C860]" />
              </button>

              <div className="text-center">
                <Link to="/shop" className="text-xs text-[#BD3D78] hover:underline font-semibold">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
