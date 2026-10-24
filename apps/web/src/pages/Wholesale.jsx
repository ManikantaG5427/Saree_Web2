import React, { useState } from 'react';
import { Building2, CheckCircle2, Phone, Mail, Send, Award } from 'lucide-react';
import { useOrders } from '../contexts/OrderContext.jsx';
import { FloralMotif } from '../assets/Logo.jsx';

export function Wholesale() {
  const { submitWholesale } = useOrders();
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    city: '',
    category: 'Handloom Pattu Sarees',
    estimatedQuantity: '25-50 Sarees',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitWholesale(formData);
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FFF8F0] min-h-screen">
      {/* Banner */}
      <div className="bg-[#280030] text-[#FFF8F0] py-14 border-b border-[#F0C860]/40 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#F0C860]">
            B2B & Volume Purchases
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Looking for Sarees in Bulk?
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto font-light leading-relaxed">
            Connect with Sri Lakshmi Saree House for wholesale and bulk-purchase enquiries directly from Hyderabad's established handloom source.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Wholesale Info (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <span className="text-xs text-[#BD3D78] font-bold uppercase tracking-wider">Direct Loom Supply</span>
              <h3 className="font-serif text-2xl font-bold text-[#280030] mt-1">
                Wholesale Partnerships
              </h3>
              <p className="text-xs text-[#706873] leading-relaxed mt-2">
                Since 2003, we have supplied retail boutiques, bridal ateliers, and resellers across India and abroad with consistent, uncompromised handloom quality.
              </p>
            </div>

            <div className="space-y-3 text-xs text-[#29232A]">
              <div className="p-3 bg-white border border-[#E8DFE5] rounded-xs">
                <p className="font-bold text-[#280030]">Bulk Collections Available:</p>
                <p className="text-[#706873] mt-0.5">
                  Pure Kanjeevaram Korvai, Uppada Jamdani, Banarasi Katan, Gadwal Sico, and pure silk dress materials.
                </p>
              </div>

              <div className="p-3 bg-white border border-[#E8DFE5] rounded-xs">
                <p className="font-bold text-[#280030]">Direct Commercial Contact:</p>
                <p className="text-[#706873] mt-0.5">Proprietor Venkateshwarlu: +91 94902 14533</p>
                <p className="text-[#706873]">Shop Counter: +91 98482 02134</p>
              </div>
            </div>
          </div>

          {/* Form Area (7 cols) */}
          <div className="md:col-span-7 bg-white border border-[#E8DFE5] rounded-xs p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-[#426B46]/10 text-[#426B46] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#280030]">Enquiry Submitted Successfully</h3>
                <p className="text-xs text-[#706873] max-w-sm mx-auto leading-relaxed">
                  Thank you for your interest in Sri Lakshmi Saree House. Our wholesale desk will review your details and contact you via WhatsApp or phone within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-[#280030] text-white text-xs font-semibold rounded-xs uppercase tracking-wider"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-serif text-lg font-bold text-[#280030] border-b border-[#E8DFE5] pb-2">
                  Wholesale Enquiry Form
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full Name"
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Boutique / Business Name</label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="Store or Brand Name"
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">City & State *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Vijayawada, AP"
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Primary Collection Interest</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    >
                      <option value="Handloom Pattu Sarees">Handloom Pattu Sarees</option>
                      <option value="Uppada Jamdani Silks">Uppada Jamdani Silks</option>
                      <option value="Banarasi Brocades">Banarasi Brocades</option>
                      <option value="Gadwal Handlooms">Gadwal Handlooms</option>
                      <option value="Dress Materials">Pure Silk Dress Materials</option>
                      <option value="Mixed Assorted Bulk">Mixed Assorted Bulk</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Estimated Quantity</label>
                    <select
                      value={formData.estimatedQuantity}
                      onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    >
                      <option value="10-25 Sarees">10-25 Sarees</option>
                      <option value="25-50 Sarees">25-50 Sarees</option>
                      <option value="50-100 Sarees">50-100 Sarees</option>
                      <option value="100+ Sarees">100+ Sarees (Institutional/Bridal)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#29232A] mb-1">Enquiry Note or Requirements</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specific weaves, budget preferences, or delivery timeline..."
                    className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4 text-[#F0C860]" />
                  <span>Submit Wholesale Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
