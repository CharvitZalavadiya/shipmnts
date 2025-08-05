import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Import database configuration
import connectDB from './config/database.js';
import config from './config/config.js';

// Import routes
import indexRoutes from './routes/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: config.server.env === 'development' ? err.message : {}
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found' 
  });
});

// Start server with database connection
const startServer = async () => {
  try {
      const PORT = config.server.port;
      app.listen(PORT, () => {
        console.log(`[app.js] - Server is running on port ${PORT}`);
        console.log(`[app.js] - Environment: ${config.server.env}`);
      });

    // Connect to database
    console.log('[app.js] - Connecting to database...');
    await connectDB();
    console.log('[app.js] - Database connected successfully');

  } catch (error) {
    console.error('[app.js] - Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();