// =====================================================
// models/videoModel.js
// =====================================================

const db = require("../config/db");

const getAllVideos = async () => {
  const [rows] = await db.query(
    "SELECT * FROM videos ORDER BY pinned DESC, created_at DESC"
  );
  return rows;
};

const getVideoById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM videos WHERE id=?", [id]
  );
  return rows[0];
};

const createVideo = async (title, subtitle, video_url, type) => {
  const [result] = await db.query(
    "INSERT INTO videos (title, subtitle, video_url, type) VALUES (?,?,?,?)",
    [title, subtitle, video_url, type]
  );
  return result.insertId;
};

const updateVideo = async (id, title, subtitle, video_url) => {
  const [result] = await db.query(
    "UPDATE videos SET title=?, subtitle=?, video_url=? WHERE id=?",
    [title, subtitle, video_url, id]
  );
  return result.affectedRows;
};

// Toggle pinned status
const togglePin = async (id, pinned) => {
  const [result] = await db.query(
    "UPDATE videos SET pinned=? WHERE id=?",
    [pinned, id]
  );
  return result.affectedRows;
};

const deleteVideo = async (id) => {
  const [result] = await db.query(
    "DELETE FROM videos WHERE id=?", [id]
  );
  return result.affectedRows;
};

module.exports = {
  getAllVideos, getVideoById,
  createVideo, updateVideo,
  togglePin, deleteVideo
};