import mongoose from 'mongoose';

const returnRequestSchema = new mongoose.Schema(
  {
    returnId: { type: String, required: true, unique: true, index: true },
    orderId: { type: String, required: true, index: true },
    item: {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
    reason: { type: String, required: true },
    details: { type: String },
    status: {
      type: String,
      enum: ['REQUESTED', 'UNDER_REVIEW', 'APPROVED', 'ITEM_RETURNED', 'ITEM_RECEIVED', 'REFUND_PENDING', 'REFUNDED', 'REJECTED'],
      default: 'REQUESTED',
      index: true,
    },
    refundStatus: {
      type: String,
      enum: ['PENDING', 'REFUND_PENDING', 'REFUNDED', 'REJECTED'],
      default: 'PENDING',
    },
    refundAmount: { type: Number },
    razorpayRefundId: { type: String },
  },
  { timestamps: true }
);

export const ReturnRequest = mongoose.model('ReturnRequest', returnRequestSchema);

const wholesaleEnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    businessName: { type: String },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    category: { type: String, required: true },
    estimatedQuantity: { type: String, required: true },
    message: { type: String },
    status: { type: String, enum: ['PENDING', 'CONTACTED', 'CLOSED'], default: 'PENDING' },
  },
  { timestamps: true }
);

export const WholesaleEnquiry = mongoose.model('WholesaleEnquiry', wholesaleEnquirySchema);

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
