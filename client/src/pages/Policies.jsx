import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, FileText, HelpCircle, ChevronDown } from 'lucide-react';
import { FloralMotif } from '../assets/Logo.jsx';

export function Policies({ initialTab = 'shipping' }) {
  const location = useLocation();
  const getTabFromPath = () => {
    if (location.pathname.includes('returns')) return 'returns';
    if (location.pathname.includes('privacy')) return 'privacy';
    if (location.pathname.includes('terms')) return 'terms';
    if (location.pathname.includes('faq')) return 'faq';
    return 'shipping';
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath());
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'Are all pure silk sarees certified with Silk Mark India?',
      a: 'Yes. Every pure Kanjeevaram Pattu, Uppada Silk, and Banarasi Katan drape from Sri Lakshmi Saree House carries the official Silk Mark Organisation of India certification hologram verifying 100% pure natural silk fibers.',
    },
    {
      q: 'Do you provide fall and pico hemming?',
      a: 'Yes! We provide complimentary professional fall and pico hemming on every saree purchased online. Our master tailors color-match soft cotton fall so your saree arrives ready to drape.',
    },
    {
      q: 'How does WhatsApp Video Drape consultation work?',
      a: 'You can request a 1-on-1 WhatsApp video call by clicking the "WhatsApp Video Drape" link or messaging +91 86391 40385. Our showroom stylists will display the saree in natural daylight and close-up angles so you can inspect the exact zari luster before purchasing.',
    },
    {
      q: 'What is your shipping timeline within India and abroad?',
      a: 'Orders within Telangana and Andhra Pradesh typically arrive in 2 to 3 business days. Across major metros in India, delivery takes 3 to 5 business days via insured express air cargo. Tracking numbers are shared immediately upon dispatch.',
    },
    {
      q: 'What is your return policy?',
      a: 'We offer a transparent 7-day return policy from the date of delivery for items that are materially different or defective. To qualify, sarees must remain unused with intact Silk Mark tags and folds.',
    },
  ];

  return (
    <div className="bg-[#FFF8F0] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <FloralMotif className="w-8 h-8 text-[#F0C860] mx-auto" />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#280030]">
            Policies & Buyer Assurance
          </h1>
          <p className="text-xs sm:text-sm text-[#706873]">
            Verified commitments from Sri Lakshmi Saree House (SLSH Weaves, Estd. 2003, Hyderabad).
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#E8DFE5] pb-4 mb-8 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-4 py-2 rounded-xs transition-colors cursor-pointer ${
              activeTab === 'shipping' ? 'bg-[#280030] text-[#FFF8F0]' : 'bg-white text-[#706873] hover:text-[#280030] border border-[#E8DFE5]'
            }`}
          >
            Shipping Policy
          </button>

          <button
            onClick={() => setActiveTab('returns')}
            className={`px-4 py-2 rounded-xs transition-colors cursor-pointer ${
              activeTab === 'returns' ? 'bg-[#280030] text-[#FFF8F0]' : 'bg-white text-[#706873] hover:text-[#280030] border border-[#E8DFE5]'
            }`}
          >
            Returns & Refunds
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 rounded-xs transition-colors cursor-pointer ${
              activeTab === 'faq' ? 'bg-[#280030] text-[#FFF8F0]' : 'bg-white text-[#706873] hover:text-[#280030] border border-[#E8DFE5]'
            }`}
          >
            Frequently Asked Questions
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xs transition-colors cursor-pointer ${
              activeTab === 'privacy' ? 'bg-[#280030] text-[#FFF8F0]' : 'bg-white text-[#706873] hover:text-[#280030] border border-[#E8DFE5]'
            }`}
          >
            Privacy Policy
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-xs transition-colors cursor-pointer ${
              activeTab === 'terms' ? 'bg-[#280030] text-[#FFF8F0]' : 'bg-white text-[#706873] hover:text-[#280030] border border-[#E8DFE5]'
            }`}
          >
            Terms of Service
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 sm:p-10 shadow-xs">
          {activeTab === 'shipping' && (
            <div className="space-y-4 text-xs text-[#706873] leading-relaxed">
              <h2 className="font-serif text-xl font-bold text-[#280030]">Shipping & Delivery Policy</h2>
              <p>
                At Sri Lakshmi Saree House (SLSH Weaves), all consignments are dispatched from our Hyderabad showroom under insured priority cargo protocols to ensure that high-value pure silks arrive safely.
              </p>
              <h4 className="font-serif font-bold text-sm text-[#280030] pt-2">1. Processing & Hemming Timeline</h4>
              <p>
                Every pure saree undergoes our master quality control check and complimentary fall & pico hemming. Please allow 1 to 2 business days for finishing before dispatch.
              </p>
              <h4 className="font-serif font-bold text-sm text-[#280030] pt-2">2. Shipping Charges</h4>
              <p>
                We offer <strong>Free Insured Shipping</strong> on all domestic orders across India above ₹1,999. For orders below ₹1,999, a nominal flat express shipping charge of ₹150 applies.
              </p>
              <h4 className="font-serif font-bold text-sm text-[#280030] pt-2">3. Courier Partners & Tracking</h4>
              <p>
                We partner with tier-1 logistics providers including BlueDart, DTDC Priority, and Delhivery Air. Customers receive automated SMS & WhatsApp airway bill numbers to track parcels live.
              </p>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-4 text-xs text-[#706873] leading-relaxed">
              <h2 className="font-serif text-xl font-bold text-[#280030]">7-Day Returns & Refund Policy</h2>
              <p>
                We take immense pride in the pure craftsmanship of our drapes. If your saree differs materially from its verified specifications or arrives damaged, we provide a hassle-free 7-day inspection and return window.
              </p>
              <h4 className="font-serif font-bold text-sm text-[#280030] pt-2">Eligibility Guidelines</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Return requests must be initiated within 7 calendar days of delivery.</li>
                <li>The saree must remain in unwashed, unworn condition with original Silk Mark certification tags intact.</li>
                <li>The original box and fold arrangement must be preserved.</li>
              </ul>
              <h4 className="font-serif font-bold text-sm text-[#280030] pt-2">Refund Processing</h4>
              <p>
                Once the returned saree is physically received and inspected by our master weaver at our Dilsukhnagar showroom, the refund is processed through Razorpay back to your original source of payment within 3 to 5 business days.
              </p>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#280030] mb-4">Frequently Asked Questions</h2>
              <div className="divide-y divide-[#E8DFE5]">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="py-3">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left flex items-center justify-between text-xs sm:text-sm font-bold text-[#280030] cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === idx && (
                      <p className="text-xs text-[#706873] mt-2 leading-relaxed pl-1">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4 text-xs text-[#706873] leading-relaxed">
              <h2 className="font-serif text-xl font-bold text-[#280030]">Privacy Policy</h2>
              <p>
                Sri Lakshmi Saree House respects your privacy. We collect customer information (name, delivery address, contact telephone, email) solely for order fulfillment, courier communication, and verified Razorpay transaction settlement.
              </p>
              <p>
                We never sell, rent, or lease your private personal information to third-party marketing companies. All payments are securely encrypted via Razorpay PCI-DSS certified gateway servers.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4 text-xs text-[#706873] leading-relaxed">
              <h2 className="font-serif text-xl font-bold text-[#280030]">Terms & Conditions</h2>
              <p>
                By browsing slshweaves.com and purchasing handloom sarees from Sri Lakshmi Saree House, you agree to our terms of service.
              </p>
              <p>
                Handloom Characteristics: Because authentic handloom sarees are individually woven by hand, slight irregularities in weave, slubs, and zari spacing are inherent signatures of genuine handloom artistry and are not considered manufacturing defects.
              </p>
              <p>
                Jurisdiction: All commercial transactions and legal disputes are subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
