const cloudinary = require('../config/cloudinary');
const Worker = require('../models/Worker');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET not set in environment variables.");
  process.exit(1); // Stop server if secret is missing
}

// Utility: Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};

// Worker Signup
const workerSignup = async (req, res) => {
  try {
    const {
      name, phone, email, password, confirmPassword,
      address, city, state, pincode, aadhaar
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    if (!req.files?.profile || !req.files?.aadhaarCard) {
      return res.status(400).json({ msg: 'Profile and Aadhaar images are required' });
    }

    const existing = await Worker.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already registered' });

    // Upload to Cloudinary
    const profileUpload = await cloudinary.uploader.upload(req.files.profile[0].path, {
      folder: 'handyconnect/workers',
    });
    const aadhaarUpload = await cloudinary.uploader.upload(req.files.aadhaarCard[0].path, {
      folder: 'handyconnect/workers',
    });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save worker
    const worker = await Worker.create({
      name, phone, email, password,
      address, city, state, pincode, aadhaar,
      profilePhoto: profileUpload.secure_url,
      aadhaarPhoto: aadhaarUpload.secure_url,
    });

    const token = generateToken(worker._id);
    res.status(201).json({
      _id: worker._id,
      name: worker.name,
      email: worker.email,
      token,
    });
  } catch (err) {
    console.error('❌ Signup Error:', err);
    res.status(500).json({ msg: 'Server error during signup' });
  }
};

// Worker Login
const workerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const worker = await Worker.findOne({ email });
    if (!worker || !(await bcrypt.compare(password, worker.password))) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    const token = generateToken(worker._id);
    res.json({
      _id: worker._id,
      name: worker.name,
      email: worker.email,
      city: worker.city,
      token,
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ msg: 'Server error during login' });
  }
};

// Get Worker Profile
const getWorkerProfile = async (req, res) => {
  try {
    const worker = await Worker.findById(req.user.id).select('-password');
    if (!worker) return res.status(404).json({ msg: 'Worker not found' });

    res.json(worker);
  } catch (err) {
    console.error('❌ Error in getWorkerProfile:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update Worker Profile
const updateWorkerProfile = async (req, res) => {
  try {
    const worker = await Worker.findById(req.user.id);
    if (!worker) return res.status(404).json({ msg: 'Worker not found' });

    worker.name = req.body.name || worker.name;
    worker.email = req.body.email || worker.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      worker.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedWorker = await worker.save();
    res.json({
      _id: updatedWorker._id,
      name: updatedWorker.name,
      email: updatedWorker.email,
    });
  } catch (err) {
    console.error('❌ Error updating profile:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Reset Password
const resetWorkerPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const worker = await Worker.findOne({ email });
    if (!worker) {
      return res.status(404).json({ msg: 'Worker not found' });
    }

    worker.password = await bcrypt.hash(newPassword, 10);
    await worker.save();

    res.json({ msg: 'Worker password reset successfully' });
  } catch (err) {
    console.error('❌ Error resetting password:', err);
    res.status(500).json({ msg: 'Server error while resetting password' });
  }
};

module.exports = {
  workerSignup,
  workerLogin,
  getWorkerProfile,
  updateWorkerProfile,
  resetWorkerPassword,
};
