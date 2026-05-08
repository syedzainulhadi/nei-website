// =====================================================
// models/testimonialModel.js
// =====================================================

const db = require("../config/db");

const getAllTestimonials = async () => {
  const [rows] = await db.query(
    "SELECT * FROM testimonials ORDER BY created_at DESC"
  );
  return rows;
};

const getTestimonialById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM testimonials WHERE id = ?", [id]
  );
  return rows[0];
};

const createTestimonial = async (name, batch, text) => {
  const [result] = await db.query(
    "INSERT INTO testimonials (name, batch, text) VALUES (?, ?, ?)",
    [name, batch, text]
  );
  return result.insertId;
};

const updateTestimonial = async (id, name, batch, text) => {
  const [result] = await db.query(
    "UPDATE testimonials SET name=?, batch=?, text=? WHERE id=?",
    [name, batch, text, id]
  );
  return result.affectedRows;
};

const deleteTestimonial = async (id) => {
  const [result] = await db.query(
    "DELETE FROM testimonials WHERE id = ?", [id]
  );
  return result.affectedRows;
};

module.exports = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};