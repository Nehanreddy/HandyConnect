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
const workerLogin = async (req, res) => {
  const { email, password } = req.body;

  const worker = await Worker.findOne({ email });
  if (worker && (await bcrypt.compare(password, worker.password))) {
    res.json({
      worker: {
        _id: worker._id,
        name: worker.name,
        email: worker.email,
      },
      token: generateToken(worker._id),
    });
  } else {
    res.status(401).json({ msg: 'Invalid email or password' });
  }
};

// @desc    Get logged-in worker profile
const getWorkerProfile = async (req, res) => {
  const worker = await Worker.findById(req.user.id).select('-password');
  res.json(worker);
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
};
