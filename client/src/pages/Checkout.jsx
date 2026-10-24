import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useOrders } from '../contexts/OrderContext.jsx';
import { formatPrice } from '../lib/utils.js';

export function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, shippingFee, total, clearCart } = useCart();
  const { user, addAddress } = useAuth();
  const { createOrder } = useOrders();

  const [contactName, setContactName] = useState(user?.name || '');
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [contactPhone, setContactPhone] = useState(user?.phone || '');

  const [addressLine1, setAddressLine1] = useState(user?.addresses?.[0]?.addressLine1 || '');
  const [city, setCity] = useState(user?.addresses?.[0]?.city || 'Hyderabad');
  const [state, setState] = useState(user?.addresses?.[0]?.state || 'Telangana');
  const [postalCode, setPostalCode] = useState(user?.addresses?.[0]?.postalCode || '500033');

  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FFF8F0] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#280030]">No Items in Bag to Checkout</h2>
        <Link to="/shop" className="mt-4 px-6 py-2.5 bg-[#280030] text-white text-xs font-semibold uppercase tracking-wider rounded-xs">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !addressLine1 || !postalCode) {
      setErrorMsg('Please complete all required shipping address fields.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    try {
      const shippingAddress = {
        name: contactName,
        phone: contactPhone,
        addressLine1,
        city,
        state,
        postalCode,
      };

      // Create authoritative snapshot order
      const orderPayload = {
        customerName: contactName,
        customerEmail: contactEmail,
        customerPhone: contactPhone,
        shippingAddress,
        items: items.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.images?.[0],
          fallAndPico: i.fallAndPico,
        })),
        subtotal,
        shippingFee,
        total,
        paymentStatus: 'PAID',
        paymentMethod: 'Razorpay Online (UPI / NetBanking / Cards)',
        razorpayPaymentId: 'pay_' + Math.random().toString(36).substring(2, 12),
      };

      const newOrder = createOrder(orderPayload);
      clearCart();

      // Redirect to payment result page
      navigate(`/checkout/payment-result?orderId=${newOrder.id}&status=success`);
    } catch (err) {
      setErrorMsg(err.message || 'Payment processing failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#FFF8F0] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <Lock className="w-5 h-5 text-[#280030]" />
          <h1 className="font-serif text-3xl font-bold text-[#280030]">
            Secure Checkout
          </h1>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Shipping & Contact Info (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact Details */}
            <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#280030] border-b border-[#E8DFE5] pb-2">
                1. Customer & Delivery Contact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#29232A] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E8DFE5] rounded-xs text-xs text-[#29232A] focus:outline-none focus:border-[#280030]"
                    placeholder="Recipient Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#29232A] mb-1">Mobile Phone (for Courier OTP) *</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E8DFE5] rounded-xs text-xs text-[#29232A] focus:outline-none focus:border-[#280030]"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#29232A] mb-1">Email (for Order & Receipt Invoice)</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E8DFE5] rounded-xs text-xs text-[#29232A] focus:outline-none focus:border-[#280030]"
                    placeholder="email@domain.com"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#280030] border-b border-[#E8DFE5] pb-2">
                2. Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#29232A] mb-1">House/Flat No, Street & Landmark *</label>
                  <input
                    type="text"
                    required
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E8DFE5] rounded-xs text-xs text-[#29232A] focus:outline-none focus:border-[#280030]"
                    placeholder="e.g. Plot 42, P&T Colony Main Road"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#29232A] mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E8DFE5] rounded-xs text-xs text-[#29232A] focus:outline-none focus:border-[#280030]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#29232A] mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E8DFE5] rounded-xs text-xs text-[#29232A] focus:outline-none focus:border-[#280030]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#29232A] mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E8DFE5] rounded-xs text-xs text-[#29232A] focus:outline-none focus:border-[#280030]"
                      placeholder="500060"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#280030] border-b border-[#E8DFE5] pb-2">
                3. Secure Payment Gateway
              </h2>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3.5 border-2 border-[#280030] rounded-xs bg-[#FFF8F0] cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={paymentMethod === 'razorpay'}
                    onChange={() => setPaymentMethod('razorpay')}
                    className="mt-0.5 text-[#280030]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#280030] flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#F0C860]" />
                      <span>Razorpay Online Payments (UPI, Google Pay, Cards, NetBanking)</span>
                    </p>
                    <p className="text-[11px] text-[#706873] mt-0.5">
                      100% secure 256-bit encrypted gateway. Official payment partner of Sri Lakshmi Saree House.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Authoritative Order Review (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 space-y-5 sticky top-24 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-[#280030] border-b border-[#E8DFE5] pb-3">
                Order Review ({items.length} items)
              </h2>

              <div className="max-h-60 overflow-y-auto divide-y divide-[#E8DFE5] pr-1">
                {items.map((item) => (
                  <div key={item.product.id} className="py-2.5 flex items-center gap-3">
                    <img src={item.product.images?.[0]} alt={item.product.name} className="w-12 h-14 object-cover rounded-xs" />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-[#29232A] truncate">{item.product.name}</p>
                      <p className="text-[#706873]">Qty: {item.quantity} • Fall & Pico: Free</p>
                    </div>
                    <span className="font-serif font-bold text-xs text-[#280030]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E8DFE5] space-y-2 text-xs">
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
                  <span>Fall & Pico Hemming</span>
                  <span className="font-semibold text-[#426B46]">COMPLIMENTARY</span>
                </div>
                <div className="pt-3 border-t border-[#E8DFE5] flex justify-between text-base font-bold text-[#280030]">
                  <span>Authoritative Total</span>
                  <span className="font-serif text-xl">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] font-bold text-xs uppercase tracking-[0.16em] rounded-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <span>{isProcessing ? 'Verifying with Razorpay...' : `Pay & Confirm Order (${formatPrice(total)})`}</span>
                <ArrowRight className="w-4 h-4 text-[#F0C860]" />
              </button>

              <div className="text-[11px] text-[#706873] text-center flex items-center justify-center gap-1.5 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#426B46]" />
                <span>Protected by Razorpay Test Verification & Silk Mark Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
