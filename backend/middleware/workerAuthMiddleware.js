const jwt = require('jsonwebtoken');
const Worker = require('../models/Worker');
console.log('🔧 Worker middleware loaded');

const protectWorker = async (req, res, next) => {
  let token;
 console.log("🧪 JWT_SECRET:", process.env.JWT_SECRET);
console.log("🔐 Token received:", token);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('🔐 Extracted Token:', token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Decoded JWT:', decoded);

      req.user = await Worker.findById(decoded.id).select('-password');
      if (!req.user) {
        console.log('❌ Worker not found from token');
        return res.status(401).json({ message: 'Invalid token, user not found' });
      }

      return next(); // ✅ always return next
    } catch (error) {
      console.error('❌ Token verification error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
     

    }
  }
  


  // ⛔ Missing in your version — this handles cases where the Authorization header is absent
  console.log('⚠️ No token found in request headers');
  return res.status(401).json({ message: 'Not authorized, no token' });
};

module.exports = { protectWorker };
