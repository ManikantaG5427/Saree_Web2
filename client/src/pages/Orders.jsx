import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle2, Clock, AlertCircle, Scissors, ArrowRight } from 'lucide-react';
import { useOrders } from '../contexts/OrderContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { formatPrice } from '../lib/utils.js';

export function Orders() {
  const { orders, requestReturn } = useOrders();
  const { user } = useAuth();

  const [returnModalItem, setReturnModalItem] = useState(null);
  const [returnReason, setReturnReason] = useState('Product differs materially from verified description');
  const [returnDetails, setReturnDetails] = useState('');
  const [returnSuccess, setReturnSuccess] = useState(false);

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    if (!returnModalItem) return;
    requestReturn(returnModalItem.orderId, returnModalItem.item, returnReason, returnDetails);
    setReturnSuccess(true);
    setTimeout(() => {
      setReturnSuccess(false);
      setReturnModalItem(null);
      setReturnDetails('');
    }, 2000);
  };

  return (
    <div className="bg-[#FFF8F0] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#280030]">My Orders & History</h1>
            <p className="text-xs text-[#706873] mt-1">Review live delivery status, inspection progress, and past purchases.</p>
          </div>
          <Link
            to="/shop"
            className="px-4 py-2 border border-[#E8DFE5] bg-white text-xs font-semibold text-[#280030] rounded-xs hover:border-[#280030]"
          >
            Explore More Sarees
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border border-[#E8DFE5] rounded-xs p-12 text-center space-y-4">
            <Package className="w-12 h-12 text-[#706873] mx-auto opacity-60" />
            <h3 className="font-serif text-xl font-bold text-[#280030]">No Orders Placed Yet</h3>
            <p className="text-xs text-[#706873]">Once you order pure handloom sarees, their timeline and tracking will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-[#E8DFE5] rounded-xs overflow-hidden shadow-xs">
                {/* Order Top Bar */}
                <div className="bg-[#FAF7F2] p-4 sm:p-5 border-b border-[#E8DFE5] flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-[#706873]">Order Ref:</span>
                    <span className="font-mono font-bold text-[#280030] ml-1.5">{order.id}</span>
                    <span className="mx-2 text-[#E8DFE5]">|</span>
                    <span className="text-[#706873]">Placed on:</span>
                    <span className="font-medium text-[#29232A] ml-1.5">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#426B46]/10 text-[#426B46] border border-[#426B46]/30">
                      {order.orderStatus}
                    </span>
                    <span className="font-serif font-bold text-sm text-[#280030]">{formatPrice(order.total)}</span>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="p-4 sm:p-6 divide-y divide-[#E8DFE5]">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image || '/images/kanjeevaram-crimson-pure.jpg'}
                          alt={item.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/kanjeevaram-crimson-pure.jpg';
                          }}
                          className="w-16 h-20 object-cover rounded-xs border border-[#E8DFE5]"
                        />
                        <div>
                          <h4 className="font-serif text-sm font-bold text-[#280030]">{item.name}</h4>
                          <p className="text-xs text-[#706873] mt-0.5">
                            Qty: {item.quantity} • Fall & Pico: Done
                          </p>
                          <p className="font-serif text-xs font-bold text-[#280030] mt-1">{formatPrice(item.price)}</p>
                        </div>
                      </div>

                      {/* Item Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setReturnModalItem({ orderId: order.id, item })}
                          className="text-[11px] font-semibold text-[#BD3D78] hover:underline"
                        >
                          Request Return
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking Progress Stepper */}
                <div className="bg-[#FFF8F0] p-4 sm:p-5 border-t border-[#E8DFE5]">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#280030] mb-3">
                    Fulfillment & Inspection Milestones
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-[#426B46]">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Order Confirmed</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#426B46]">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Weave QC & Hemming</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#280030] font-bold">
                      <Truck className="w-4 h-4 text-[#F0C860] flex-shrink-0" />
                      <span>{order.courier || 'Express Dispatch'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#706873]">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>Doorstep Delivery</span>
                    </div>
                  </div>

                  {order.trackingNumber && (
                    <div className="mt-3 text-xs text-[#706873]">
                      Airway Bill / Tracking: <span className="font-mono font-bold text-[#280030]">{order.trackingNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Return Request Modal */}
      {returnModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xs border border-[#E8DFE5] max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="font-serif text-lg font-bold text-[#280030]">Request Saree Return</h3>
            <p className="text-xs text-[#706873]">
              Returning: <span className="font-semibold text-[#29232A]">{returnModalItem.item.name}</span>
            </p>

            {returnSuccess ? (
              <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xs">
                Return request submitted. Our team will review within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleReturnSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#29232A] mb-1">Approved Reason *</label>
                  <select
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    className="w-full p-2 border border-[#E8DFE5] rounded-xs"
                  >
                    <option value="Product differs materially from verified description">Product differs materially from description</option>
                    <option value="Damaged or defective weave upon opening">Damaged or defective weave</option>
                    <option value="Incorrect saree or color sent">Incorrect saree or color sent</option>
                    <option value="Other verified policy reason">Other verified policy reason</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#29232A] mb-1">Details & Note</label>
                  <textarea
                    rows={3}
                    value={returnDetails}
                    onChange={(e) => setReturnDetails(e.target.value)}
                    placeholder="Provide specific details about the return..."
                    className="w-full p-2 border border-[#E8DFE5] rounded-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReturnModalItem(null)}
                    className="px-4 py-2 border border-[#E8DFE5] rounded-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#BD3D78] text-white font-semibold rounded-xs"
                  >
                    Submit Return Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
