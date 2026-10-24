import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    sku: { type: String, required: true, unique: true, index: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    category: { type: String, required: true, index: true },
    categorySlug: { type: String, index: true },
    weave: { type: String, index: true },
    fabric: { type: String, index: true },
    zari: { type: String },
    color: { type: String, index: true },
    occasion: { type: String, index: true },
    origin: { type: String },
    stock: { type: Number, default: 1, min: 0 },
    isSilkMark: { type: Boolean, default: false },
    hasBlouse: { type: Boolean, default: true },
    blouseDetail: { type: String },
    length: { type: String, default: '6.3 Meters' },
    description: { type: String, required: true },
    weaveStory: { type: String },
    images: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isNewItem: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Full text search index
productSchema.index({
  name: 'text',
  category: 'text',
  weave: 'text',
  fabric: 'text',
  description: 'text',
});

export const Product = mongoose.model('Product', productSchema);
