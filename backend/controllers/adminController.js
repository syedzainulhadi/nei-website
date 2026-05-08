// =====================================================
// controllers/adminController.js
// Handles admin login logic
// =====================================================

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findAdminByUsername } = require("../models/adminModel");
const dotenv = require("dotenv");
dotenv.config();

// POST /api/admin/login
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if both fields are provided
    if (!username || !password) {
      return res.status(400).json({ 
        message: "❌ Username and password are required." 
      });
    }

    // Find admin in database by username
    const admin = await findAdminByUsername(username);

    if (!admin) {
      return res.status(401).json({ 
        message: "❌ Invalid username or password." 
      });
    }

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ 
        message: "❌ Invalid username or password." 
      });
    }

    // Create JWT token valid for 1 day
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send token back to frontend
    res.status(200).json({
      message: "✅ Login successful!",
      token: token,
      admin: {
        id: admin.id,
        username: admin.username
      }
    });

  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "❌ Server error. Please try again." });
  }
};

module.exports = { loginAdmin };