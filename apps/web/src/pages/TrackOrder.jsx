import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Truck, CheckCircle2, PackageCheck, Clock, MapPin, Phone } from 'lucide-react';
import { useOrders } from '../contexts/OrderContext.jsx';
import { formatPrice } from '../lib/utils.js';
import { FloralMotif } from '../assets/Logo.jsx';

export function TrackOrder() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const { orders } = useOrders();

  const [orderQuery, setOrderQuery] = useState(initialId);
  const [foundOrder, setFoundOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId]);

  const handleSearch = (query) => {
    const q = (query || orderQuery).trim().toLowerCase();
    setSearched(true);
    if (!q) {
      setFoundOrder(null);
      return;
    }

    const match = orders.find(
      (o) => o.id.toLowerCase().includes(q) || (o.customerPhone && o.customerPhone.includes(q))
    );
    setFoundOrder(match || null);
  };

  return (
    <div className="bg-[#FFF8F0] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-8">
          <FloralMotif className="w-8 h-8 text-[#F0C860] mx-auto" />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#280030]">
            Track Your Handloom Consignment
          </h1>
          <p className="text-xs sm:text-sm text-[#706873]">
            Enter your unique Order Reference (e.g. <span className="font-mono text-[#280030] font-bold">SLSH-ORD-2026-8942</span>) or mobile number.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 shadow-xs mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              required
              placeholder="Enter Order ID or 10-digit Phone..."
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              className="flex-1 px-4 py-3 border border-[#E8DFE5] rounded-xs text-xs sm:text-sm text-[#29232A] focus:outline-none focus:border-[#280030]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] font-bold text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#F0C860]" />
              <span>Track Status</span>
            </button>
          </form>
        </div>

        {/* Tracking Details Result */}
        {foundOrder ? (
          <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8DFE5] pb-4">
              <div>
                <span className="text-[10px] text-[#706873] uppercase tracking-wider font-semibold">Active Consignment</span>
                <p className="font-mono text-base font-bold text-[#280030]">{foundOrder.id}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#426B46]/10 text-[#426B46] border border-[#426B46]/30 rounded-full text-xs font-bold uppercase tracking-wider">
                  {foundOrder.orderStatus}
                </span>
                <span className="font-serif font-bold text-base text-[#280030]">{formatPrice(foundOrder.total)}</span>
              </div>
            </div>

            {/* Courier Dispatch Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#FFF8F0] p-4 rounded-xs border border-[#E8DFE5]">
              <div>
                <p className="text-[#706873]">Express Courier Partner:</p>
                <p className="font-bold text-[#280030] mt-0.5">{foundOrder.courier || 'Insured Priority Air Cargo'}</p>
              </div>
              <div>
                <p className="text-[#706873]">Airway Bill / Consignment No:</p>
                <p className="font-mono font-bold text-[#280030] mt-0.5">{foundOrder.trackingNumber || 'Assigned Post-QC'}</p>
              </div>
            </div>

            {/* Timeline Milestones */}
            <div>
              <h3 className="font-serif text-sm font-bold text-[#280030] uppercase tracking-wider mb-4">
                Inspection & Dispatch Journey
              </h3>
              <div className="space-y-4">
                {(foundOrder.timeline || [
                  { status: 'Order Placed', timestamp: 'Verified', completed: true },
                  { status: 'Weave QC & Fall/Pico Hemming', timestamp: 'Completed', completed: true },
                  { status: 'Handed to Priority Air Cargo', timestamp: 'In Transit', completed: true },
                  { status: 'Out for Doorstep Delivery', timestamp: 'Pending', completed: false },
                ]).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      step.completed ? 'bg-[#426B46] text-white' : 'bg-stone-200 text-stone-500'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${step.completed ? 'text-[#280030]' : 'text-[#706873]'}`}>
                        {step.status}
                      </p>
                      <p className="text-[11px] text-[#706873]">{step.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Destination */}
            <div className="border-t border-[#E8DFE5] pt-4 text-xs text-[#706873]">
              <span className="font-semibold text-[#280030]">Delivery Destination:</span>
              <p className="text-[#29232A] mt-0.5">
                {foundOrder.shippingAddress?.addressLine1}, {foundOrder.shippingAddress?.city}, {foundOrder.shippingAddress?.state} - {foundOrder.shippingAddress?.postalCode}
              </p>
            </div>
          </div>
        ) : searched ? (
          <div className="bg-white border border-[#E8DFE5] rounded-xs p-10 text-center space-y-3">
            <Clock className="w-10 h-10 text-[#BD3D78] mx-auto opacity-70" />
            <h3 className="font-serif text-lg font-bold text-[#280030]">No Order Found</h3>
            <p className="text-xs text-[#706873] max-w-sm mx-auto">
              Please double check the reference number. If you ordered directly via WhatsApp or need help, contact our shop directly.
            </p>
            <div className="pt-2">
              <a
                href="tel:+919848202134"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#280030] hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-[#F0C860]" />
                <span>Shop Helpline: +91 98482 02134</span>
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
