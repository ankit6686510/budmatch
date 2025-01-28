import http from 'http';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

import { initSocket } from './src/sockets/chat.js';
import connectDB from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js';
import listingRoutes from './src/routes/listingRoutes.js';
import { protect } from './src/middleware/auth.js';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Initialize WebSocket or Socket.IO
initSocket(server);

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

// Connect to the database and start the server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to the database: ${error.message}`);
    process.exit(1); // Exit with failure
  });
