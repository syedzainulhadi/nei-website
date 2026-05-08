// =====================================================
// models/activityModel.js
// =====================================================

const db = require("../config/db");

const getAllActivities = async () => {
  const [rows] = await db.query(
    // Pinned items come first, then by date
    "SELECT * FROM activities ORDER BY pinned DESC, created_at DESC"
  );
  return rows;
};

const getActivityById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM activities WHERE id = ?", [id]
  );
  return rows[0];
};

const createActivity = async (title, description, image_url) => {
  const [result] = await db.query(
    "INSERT INTO activities (title, description, image_url) VALUES (?, ?, ?)",
    [title, description, image_url]
  );
  return result.insertId;
};

const updateActivity = async (id, title, description, image_url) => {
  const [result] = await db.query(
    "UPDATE activities SET title=?, description=?, image_url=? WHERE id=?",
    [title, description, image_url, id]
  );
  return result.affectedRows;
};

// Toggle pinned status
const togglePin = async (id, pinned) => {
  const [result] = await db.query(
    "UPDATE activities SET pinned=? WHERE id=?",
    [pinned, id]
  );
  return result.affectedRows;
};

const deleteActivity = async (id) => {
  const [result] = await db.query(
    "DELETE FROM activities WHERE id=?", [id]
  );
  return result.affectedRows;
};

module.exports = {
  getAllActivities, getActivityById,
  createActivity, updateActivity,
  togglePin, deleteActivity
};