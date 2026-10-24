import express from 'express';
import { Order } from '../models/Order.js';

export const ordersRouter = express.Router();

// GET /api/orders
ordersRouter.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/:id
ordersRouter.get('/:id', async (req, res) => {
  try {
    const order = await Order.findOne({
      $or: [{ orderId: req.params.id }, { _id: req.params.id }],
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders
ordersRouter.post('/', async (req, res) => {
  try {
    const orderId = `SLSH-ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = new Order({
      ...req.body,
      orderId,
      timeline: [
        { status: 'Order Placed', timestamp: new Date().toLocaleString(), completed: true },
        { status: 'Payment Verified', timestamp: new Date().toLocaleString(), completed: true },
        { status: 'Weave QC & Fall/Pico Hemming', timestamp: 'In Progress', completed: false },
        { status: 'Dispatched with Courier', timestamp: 'Pending', completed: false },
        { status: 'Delivered', timestamp: 'Pending', completed: false },
      ],
    });
    await newOrder.save();
    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/orders/:id/status
ordersRouter.patch('/:id/status', async (req, res) => {
  try {
    const { status, trackingNumber, courier } = req.body;
    const order = await Order.findOneAndUpdate(
      { $or: [{ orderId: req.params.id }, { _id: req.params.id }] },
      { 
        orderStatus: status,
        ...(trackingNumber && { trackingNumber }),
        ...(courier && { courier }),
      },
      { new: true }
    );
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
