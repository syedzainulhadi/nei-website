// =====================================================
// models/staffModel.js
// All database queries for Staff
// =====================================================

const db = require("../config/db");

// GET all staff members
const getAllStaff = async () => {
  const [rows] = await db.query(
    "SELECT * FROM staff ORDER BY category, name ASC"
  );
  return rows;
};

// GET staff by category
// category can be: executive, teaching, pta, nonteaching
const getStaffByCategory = async (category) => {
  const [rows] = await db.query(
    "SELECT * FROM staff WHERE category = ? ORDER BY name ASC",
    [category]
  );
  return rows;
};

// GET single staff by ID
const getStaffById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM staff WHERE id = ?",
    [id]
  );
  return rows[0];
};

// CREATE new staff member
const createStaff = async (name, role, qualification, image_url, category) => {
  const [result] = await db.query(
    `INSERT INTO staff 
      (name, role, qualification, image_url, category) 
     VALUES (?, ?, ?, ?, ?)`,
    [name, role, qualification, image_url, category]
  );
  return result.insertId;
};

// UPDATE staff member
const updateStaff = async (id, name, role, qualification, image_url, category) => {
  const [result] = await db.query(
    `UPDATE staff 
     SET name = ?, role = ?, qualification = ?, 
         image_url = ?, category = ?
     WHERE id = ?`,
    [name, role, qualification, image_url, category, id]
  );
  return result.affectedRows;
};

// DELETE staff member
const deleteStaff = async (id) => {
  const [result] = await db.query(
    "DELETE FROM staff WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};

module.exports = {
  getAllStaff,
  getStaffByCategory,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff
};