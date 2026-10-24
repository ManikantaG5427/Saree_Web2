import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const authRouter = express.Router();

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'slsh_weaves_jwt_access_secret_key_2026_luxury';

// POST /api/auth/register
authRouter.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'Account with this email already exists' });
    }

    const user = new User({ name, email, password, phone, role: 'customer' });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/auth/login
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Direct Admin Fast-Pass
    if (cleanEmail === 'admin@slshweaves.com' && cleanPass === 'admin123') {
      const token = jwt.sign({ id: 'admin-001', role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        success: true,
        token,
        user: {
          id: 'admin-001',
          name: 'Venkateshwarlu (Proprietor)',
          email: 'admin@slshweaves.com',
          role: 'admin',
          phone: '+91 94902 14533',
        },
      });
    }

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(cleanPass);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
