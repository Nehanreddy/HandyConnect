const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables BEFORE anything else
dotenv.config();

// Load routes
const authRoutes = require('./routes/authRoutes');
const workerAuthRoutes = require('./routes/workerAuthRoutes');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());

// JSON parser (for application/json)
app.use(express.json());

// Multipart/form-data parser (required for file uploads)
app.use(express.urlencoded({ extended: true })); // ✅ necessary for multer

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/worker', workerAuthRoutes);
app.use('/api/auth', require('./routes/authRoutes'));


// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
