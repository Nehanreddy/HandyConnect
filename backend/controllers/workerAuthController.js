const cloudinary = require('../config/cloudinary');
const Worker = require('../models/Worker');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new worker
const workerSignup = async (req, res) => {
  try {
    const {
      name, phone, email, password, confirmPassword,
      address, city, state, pincode, aadhaar
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    if (!req.files || !req.files.profile || !req.files.aadhaarCard) {
      return res.status(400).json({ msg: 'Both profile and Aadhaar images are required' });
    }

    const existing = await Worker.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already registered' });

    const profileUpload = await cloudinary.uploader.upload(req.files.profile[0].path, {
      folder: 'handyconnect/workers',
    });

    const aadhaarUpload = await cloudinary.uploader.upload(req.files.aadhaarCard[0].path, {
      folder: 'handyconnect/workers',
    });

    const worker = await Worker.create({
      name, phone, email, password,
      address, city, state, pincode, aadhaar,
      profilePhoto: profileUpload.secure_url,
      aadhaarPhoto: aadhaarUpload.secure_url,
    });

    res.status(201).json({
      _id: worker._id,
      name: worker.name,
      email: worker.email,
      token: generateToken(worker._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during signup' });
  }
};

// @desc    Login worker
// controller: workerAuthController.js
const workerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const worker = await Worker.findOne({ email });
    if (!worker || !(await bcrypt.compare(password, worker.password))) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(worker._id); // <- your JWT function

    return res.json({
      _id: worker._id,
      name: worker.name,
      email: worker.email,
      token, // ✅ include this
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ msg: 'Server error during login' });
  }
};


// @desc    Get logged-in worker profile
const getWorkerProfile = async (req, res) => {
  console.log('👤 getWorkerProfile controller reached');
  try {
    const worker = await Worker.findById(req.user.id).select('-password');
    if (!worker) return res.status(404).json({ msg: 'Worker not found' });

    res.json(worker);
  } catch (err) {
    console.error("❌ Error in getWorkerProfile:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};
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
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Reset worker password
const resetWorkerPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const worker = await Worker.findOne({ email });
    if (!worker) {
      return res.status(404).json({ msg: 'Worker not found' });
    }

    worker.password = newPassword; // Let Mongoose hash it
    await worker.save();

    res.json({ msg: 'Worker password reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error while resetting password' });
  }
};


module.exports = {
  workerSignup,
  workerLogin,
  getWorkerProfile,
  resetWorkerPassword,
  updateWorkerProfile
};
