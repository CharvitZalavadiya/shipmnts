import mongoose from 'mongoose';
import config from './config.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shipmnts');

    console.log(`[database.js] - MongoDB Connected: ${conn.connection.host}`);
    console.log(`[database.js] - Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[database.js] - MongoDB connection error:`, error.message);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('[database.js] - MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('[database.js] - MongoDB connection error:', err);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('[database.js] - MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('[database.js] - Error during graceful shutdown:', error);
    process.exit(1);
  }
});

export default connectDB;
