// =====================================================
// models/achievementModel.js
// =====================================================

const db = require("../config/db");

const getAllAchievements = async () => {
  const [rows] = await db.query(
    "SELECT * FROM achievements ORDER BY year DESC, category ASC"
  );
  return rows;
};

const getAchievementById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM achievements WHERE id = ?", [id]
  );
  return rows[0];
};

const getAchievementsByYear = async (year) => {
  const [rows] = await db.query(
    "SELECT * FROM achievements WHERE year = ? ORDER BY category ASC",
    [year]
  );
  return rows;
};

const createAchievement = async (data) => {
  const { name, class: cls, percentage, description, image_url, year, category } = data;
  const [result] = await db.query(
    `INSERT INTO achievements 
      (name, class, percentage, description, image_url, year, category)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, cls, percentage, description, image_url, year, category]
  );
  return result.insertId;
};

const updateAchievement = async (id, data) => {
  const { name, class: cls, percentage, description, image_url, year, category } = data;
  const [result] = await db.query(
    `UPDATE achievements 
     SET name=?, class=?, percentage=?, description=?, image_url=?, year=?, category=?
     WHERE id=?`,
    [name, cls, percentage, description, image_url, year, category, id]
  );
  return result.affectedRows;
};

const deleteAchievement = async (id) => {
  const [result] = await db.query(
    "DELETE FROM achievements WHERE id = ?", [id]
  );
  return result.affectedRows;
};

module.exports = {
  getAllAchievements,
  getAchievementById,
  getAchievementsByYear,
  createAchievement,
  updateAchievement,
  deleteAchievement
};