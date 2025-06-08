const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const WorkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  aadhaar: { type: String, required: true }
}, { timestamps: true });

// Hash password before save
WorkerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
WorkerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Worker', WorkerSchema);
