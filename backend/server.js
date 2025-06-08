const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const workerAuthRoutes = require('./routes/workerAuthRoutes'); // ✅ New line

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/worker', workerAuthRoutes); // ✅ Add worker routes

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
