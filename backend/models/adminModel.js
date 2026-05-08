// =====================================================
// models/adminModel.js
// Database queries for Admin authentication
// =====================================================

const db = require("../config/db");
const bcrypt = require("bcryptjs");

// FIND admin by username (used during login)
const findAdminByUsername = async (username) => {
  const [rows] = await db.query(
    "SELECT * FROM admin WHERE username = ?",
    [username]
  );
  return rows[0]; // returns admin object or undefined
};

// CREATE admin (used once for setup)
// Automatically hashes the password before saving
const createAdmin = async (username, plainPassword) => {
  // Hash the password with salt rounds = 10
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const [result] = await db.query(
    "INSERT INTO admin (username, password) VALUES (?, ?)",
    [username, hashedPassword]
  );
  return result.insertId;
};

module.exports = {
  findAdminByUsername,
  createAdmin
};