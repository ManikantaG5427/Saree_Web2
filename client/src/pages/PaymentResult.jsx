import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, PackageCheck, ArrowRight, Truck, FileText } from 'lucide-react';
import { useOrders } from '../contexts/OrderContext.jsx';
import { formatPrice } from '../lib/utils.js';
import { FloralMotif } from '../assets/Logo.jsx';

export function PaymentResult() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { orders } = useOrders();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <div className="bg-[#FFF8F0] min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white border border-[#E8DFE5] rounded-xs p-8 text-center space-y-6 shadow-sm">
          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-[#426B46]/10 text-[#426B46] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#426B46] font-bold">
              Payment Verified via Razorpay
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#280030] mt-1">
              Thank You! Your Order is Confirmed
            </h1>
            <p className="text-xs text-[#706873] mt-2">
              We have received your order and initiated master weave inspection & fall/pico hemming.
            </p>
          </div>

          {/* Order Details Receipt Box */}
          {order && (
            <div className="bg-[#FFF8F0] border border-[#E8DFE5] rounded-xs p-5 text-left text-xs space-y-3">
              <div className="flex justify-between items-center border-b border-[#E8DFE5] pb-2 font-semibold">
                <span className="text-[#706873]">Order Reference:</span>
                <span className="text-[#280030] font-mono font-bold">{order.id}</span>
              </div>

              <div className="flex justify-between items-center border-b border-[#E8DFE5] pb-2 font-semibold">
                <span className="text-[#706873]">Amount Paid:</span>
                <span className="text-[#280030] font-bold font-serif text-sm">{formatPrice(order.total)}</span>
              </div>

              <div className="flex justify-between items-center border-b border-[#E8DFE5] pb-2">
                <span className="text-[#706873]">Payment Gateway:</span>
                <span className="text-[#29232A] font-medium">{order.paymentMethod}</span>
              </div>

              <div className="flex justify-between items-center border-b border-[#E8DFE5] pb-2">
                <span className="text-[#706873]">Courier Service:</span>
                <span className="text-[#426B46] font-semibold">{order.courier || 'Insured Priority Air Cargo'}</span>
              </div>

              <div className="pt-1">
                <span className="text-[#706873] block mb-1">Delivering to:</span>
                <p className="font-semibold text-[#29232A]">
                  {order.shippingAddress?.name} ({order.shippingAddress?.phone})
                </p>
                <p className="text-[#706873]">
                  {order.shippingAddress?.addressLine1}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}
                </p>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to={`/track-order?id=${order?.id || ''}`}
              className="w-full sm:w-auto px-6 py-3 bg-[#280030] text-[#FFF8F0] hover:bg-[#3b0347] text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Truck className="w-4 h-4 text-[#F0C860]" />
              <span>Track Consignment</span>
            </Link>

            <Link
              to="/shop"
              className="w-full sm:w-auto px-6 py-3 border border-[#E8DFE5] text-[#280030] hover:bg-stone-50 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
            >
              Browse More Sarees
            </Link>
          </div>

          <p className="text-[11px] text-[#706873]">
            A confirmation WhatsApp & SMS message has been initiated. Questions? Call our shop counter at{' '}
            <a href="tel:+919848202134" className="text-[#280030] font-bold hover:underline">
              +91 98482 02134
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
