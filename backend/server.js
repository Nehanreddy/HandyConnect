const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables BEFORE anything else
dotenv.config();

// Load routes
const authRoutes = require('./routes/authRoutes');
const workerAuthRoutes = require('./routes/workerAuthRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // 👈 new

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/worker', workerAuthRoutes);
app.use('/api/bookings', bookingRoutes); // 👈 new

// Default route (optional)
app.get('/', (req, res) => {
  res.send('HandyConnect API is running 🚀');
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
