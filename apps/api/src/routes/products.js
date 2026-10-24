import express from 'express';
import { Product } from '../models/Product.js';

export const productsRouter = express.Router();

// GET /api/products
productsRouter.get('/', async (req, res) => {
  try {
    const { category, weave, occasion, search, sort } = req.query;
    let query = { isActive: true };

    if (category && category !== 'All') query.category = category;
    if (weave && weave !== 'All') query.weave = weave;
    if (occasion && occasion !== 'All') query.occasion = occasion;
    if (search) {
      query.$text = { $search: search };
    }

    let sortObj = { createdAt: -1 };
    if (sort === 'price-low') sortObj = { price: 1 };
    if (sort === 'price-high') sortObj = { price: -1 };

    const products = await Product.find(query).sort(sortObj).limit(50);
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:slug
productsRouter.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({
      $or: [{ slug: req.params.slug }, { _id: req.params.slug }],
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products (Admin)
productsRouter.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/products/:id (Admin)
productsRouter.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
