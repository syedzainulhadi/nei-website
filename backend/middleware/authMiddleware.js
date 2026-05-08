// =====================================================
// middleware/authMiddleware.js
// Protects routes - only logged-in admin can access
// =====================================================

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
  // Token is sent in request headers like:
  // Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ 
      message: "❌ Access denied. No token provided." 
    });
  }

  // Split "Bearer <token>" and get just the token part
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ 
      message: "❌ Access denied. Token missing." 
    });
  }

  try {
    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach admin info to request so next function can use it
    req.admin = decoded;
    
    // Move to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(403).json({ 
      message: "❌ Invalid or expired token. Please login again." 
    });
  }
};

module.exports = verifyToken;