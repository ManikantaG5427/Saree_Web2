import mongoose from 'mongoose';

const orderItemSnapshotSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String },
  fallAndPico: { type: Boolean, default: true },
});

const timelineSchema = new mongoose.Schema({
  status: { type: String, required: true },
  timestamp: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String },
    customerPhone: { type: String, required: true, index: true },
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    items: [orderItemSnapshotSchema],
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED'],
      default: 'PENDING',
      index: true,
    },
    paymentMethod: { type: String, default: 'Razorpay Online' },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    orderStatus: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
      default: 'PENDING',
      index: true,
    },
    timeline: [timelineSchema],
    trackingNumber: { type: String },
    courier: { type: String, default: 'Insured Priority Air Cargo' },
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);
