import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { SareeCard } from '../components/ui/SareeCard.jsx';
import { FloralMotif } from '../assets/Logo.jsx';

export function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FFF8F0] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#BD3D78]/10 text-[#BD3D78] flex items-center justify-center mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#280030]">Your Wishlist is Empty</h2>
        <p className="text-xs sm:text-sm text-[#706873] mt-2 mb-6 max-w-sm">
          Save your favourite heirloom Kanjeevarams and festive drapes to revisit or purchase anytime.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-[#280030] text-[#FFF8F0] text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#3b0347] transition-all shadow-md"
        >
          Discover Sarees
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8F0] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 border-b border-[#E8DFE5] pb-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#280030]">Saved Sarees ({wishlist.length})</h1>
            <p className="text-xs text-[#706873] mt-0.5">Your curated shortlist of traditional drapes.</p>
          </div>
          <Link to="/shop" className="text-xs text-[#280030] hover:underline font-semibold flex items-center gap-1">
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F0C860]" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <SareeCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
