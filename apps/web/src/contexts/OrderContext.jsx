import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext(null);
const ORDERS_STORAGE_KEY = 'slsh_weaves_orders';
const RETURNS_STORAGE_KEY = 'slsh_weaves_returns';
const WHOLESALE_STORAGE_KEY = 'slsh_weaves_wholesale';
const CONTACT_STORAGE_KEY = 'slsh_weaves_contacts';

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [
        {
          id: 'SLSH-ORD-2026-8942',
          customerName: 'Pooja Reddy',
          customerEmail: 'pooja.reddy@gmail.com',
          customerPhone: '+91 98765 43210',
          shippingAddress: {
            name: 'Pooja Reddy',
            phone: '+91 98765 43210',
            addressLine1: 'Plot 42, Jubilee Hills Road No 10',
            city: 'Hyderabad',
            state: 'Telangana',
            postalCode: '500033',
          },
          items: [
            {
              productId: 'slsh-001',
              name: 'Maharani Crimson Gold Korvai Kanjeevaram Pattu',
              price: 38500,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
            },
          ],
          subtotal: 38500,
          shippingFee: 0,
          total: 38500,
          paymentStatus: 'PAID',
          paymentMethod: 'Razorpay Online (UPI / NetBanking)',
          razorpayPaymentId: 'pay_OzE8L0QeF1Test',
          orderStatus: 'CONFIRMED',
          timeline: [
            { status: 'Order Placed', timestamp: '2026-10-21 14:30', completed: true },
            { status: 'Payment Verified', timestamp: '2026-10-21 14:31', completed: true },
            { status: 'Weave Inspection & Quality Check', timestamp: '2026-10-21 16:00', completed: true },
            { status: 'Fall & Pico Hemming Completed', timestamp: '2026-10-21 18:30', completed: true },
            { status: 'Handed to Insured Express Courier', timestamp: 'Pending', completed: false },
            { status: 'Out for Delivery', timestamp: 'Pending', completed: false },
          ],
          trackingNumber: 'DTDC-HYD-998822',
          courier: 'DTDC Priority Air Cargo',
          createdAt: '2026-10-21T14:30:00Z',
        },
      ];
    } catch {
      return [];
    }
  });

  const [returns, setReturns] = useState(() => {
    try {
      const saved = localStorage.getItem(RETURNS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wholesales, setWholesales] = useState(() => {
    try {
      const saved = localStorage.getItem(WHOLESALE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [
        {
          id: 'wh-001',
          name: 'Radhika Silks & Boutique',
          city: 'Vijayawada, AP',
          phone: '+91 94401 23456',
          category: 'Kanjeevaram & Uppada Silks',
          estimatedQuantity: '25-50 Sarees',
          message: 'Looking for wholesale supply for upcoming wedding season.',
          status: 'PENDING',
          createdAt: '2026-10-21T11:00:00Z',
        },
      ];
    } catch {
      return [];
    }
  });

  const [contacts, setContacts] = useState(() => {
    try {
      const saved = localStorage.getItem(CONTACT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(RETURNS_STORAGE_KEY, JSON.stringify(returns));
  }, [returns]);

  useEffect(() => {
    localStorage.setItem(WHOLESALE_STORAGE_KEY, JSON.stringify(wholesales));
  }, [wholesales]);

  useEffect(() => {
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const createOrder = (orderData) => {
    const orderId = `SLSH-ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      ...orderData,
      id: orderId,
      createdAt: new Date().toISOString(),
      orderStatus: orderData.paymentStatus === 'PAID' ? 'CONFIRMED' : 'PENDING',
      timeline: [
        { status: 'Order Placed', timestamp: new Date().toLocaleString(), completed: true },
        { status: 'Payment Verified', timestamp: orderData.paymentStatus === 'PAID' ? new Date().toLocaleString() : 'Pending', completed: orderData.paymentStatus === 'PAID' },
        { status: 'Weave Inspection & Hemming', timestamp: 'In Progress', completed: false },
        { status: 'Handed to Courier', timestamp: 'Pending', completed: false },
        { status: 'Delivered', timestamp: 'Pending', completed: false },
      ],
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status, trackingNumber = '', courier = '') => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          orderStatus: status,
          trackingNumber: trackingNumber || ord.trackingNumber,
          courier: courier || ord.courier,
        };
      })
    );
  };

  const requestReturn = (orderId, item, reason, details) => {
    const returnReq = {
      id: 'RET-' + Date.now(),
      orderId,
      item,
      reason,
      details,
      status: 'REQUESTED',
      createdAt: new Date().toISOString(),
      refundStatus: 'PENDING',
    };
    setReturns((prev) => [returnReq, ...prev]);
    return returnReq;
  };

  const updateReturnStatus = (returnId, status, refundAmount = null) => {
    setReturns((prev) =>
      prev.map((ret) =>
        ret.id === returnId
          ? {
              ...ret,
              status,
              refundStatus: status === 'REFUNDED' ? 'REFUNDED' : status === 'APPROVED' ? 'REFUND_PENDING' : ret.refundStatus,
              refundAmount: refundAmount !== null ? refundAmount : ret.refundAmount,
            }
          : ret
      )
    );
  };

  const submitWholesale = (enquiry) => {
    const newEnquiry = {
      ...enquiry,
      id: 'wh-' + Date.now(),
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    setWholesales((prev) => [newEnquiry, ...prev]);
    return newEnquiry;
  };

  const submitContact = (contactMsg) => {
    const newMsg = {
      ...contactMsg,
      id: 'msg-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setContacts((prev) => [newMsg, ...prev]);
    return newMsg;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        returns,
        wholesales,
        contacts,
        createOrder,
        updateOrderStatus,
        requestReturn,
        updateReturnStatus,
        submitWholesale,
        submitContact,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
}
