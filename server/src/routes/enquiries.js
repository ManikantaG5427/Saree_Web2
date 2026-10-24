import express from 'express';
import { WholesaleEnquiry, ContactMessage, ReturnRequest } from '../models/ReturnRequest.js';

export const enquiriesRouter = express.Router();

// POST /api/enquiries/wholesale
enquiriesRouter.post('/wholesale', async (req, res) => {
  try {
    const enquiry = new WholesaleEnquiry(req.body);
    await enquiry.save();
    res.status(201).json({ success: true, data: enquiry });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/enquiries/wholesale (Admin)
enquiriesRouter.get('/wholesale', async (req, res) => {
  try {
    const enquiries = await WholesaleEnquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: enquiries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/enquiries/contact
enquiriesRouter.post('/contact', async (req, res) => {
  try {
    const contact = new ContactMessage(req.body);
    await contact.save();
    res.status(201).json({ success: true, data: contact });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Returns endpoints
enquiriesRouter.post('/returns', async (req, res) => {
  try {
    const returnId = 'RET-' + Date.now();
    const ret = new ReturnRequest({ ...req.body, returnId });
    await ret.save();
    res.status(201).json({ success: true, data: ret });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

enquiriesRouter.get('/returns', async (req, res) => {
  try {
    const retList = await ReturnRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, data: retList });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

enquiriesRouter.patch('/returns/:id', async (req, res) => {
  try {
    const { status, refundStatus, refundAmount } = req.body;
    const ret = await ReturnRequest.findOneAndUpdate(
      { $or: [{ returnId: req.params.id }, { _id: req.params.id }] },
      { 
        status,
        ...(refundStatus && { refundStatus }),
        ...(refundAmount && { refundAmount }),
      },
      { new: true }
    );
    res.json({ success: true, data: ret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
