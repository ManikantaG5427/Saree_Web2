import mongoose from 'mongoose';

export async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/slsh_weaves';
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[SLSH Weaves] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[SLSH Weaves] MongoDB Connection Notice: ${error.message}`);
    console.log('[SLSH Weaves] API running with resilient fallback data mode.');
    return null;
  }
}
