// =====================================================
// controllers/nccNssController.js
// NCC & NSS combined
// =====================================================

const {
  getAllActivities, getActivityById,
  createActivity, updateActivity,
  togglePin, deleteActivity
} = require("../models/nccNssModel");

const getAll = async (req, res) => {
  try {
    const data = await getAllActivities();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch activities." });
  }
};

const create = async (req, res) => {
  try {
    const { title, description } = req.body;
    // if (!title || !description) {
    //   return res.status(400).json({ message: "❌ Title and description required." });
    // }
    const image_url = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : null;
    const id = await createActivity(title, description, image_url);
    res.status(201).json({ message: "✅ Activity added!", id });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to add activity." });
  }
};

const update = async (req, res) => {
  try {
    const { title, description } = req.body;
    const existing = await getActivityById(req.params.id);
    if (!existing) return res.status(404).json({ message: "❌ Not found." });
    const image_url = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : existing.image_url;
    await updateActivity(req.params.id, title, description, image_url);
    res.status(200).json({ message: "✅ Activity updated!" });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to update." });
  }
};

// PIN / UNPIN
const pin = async (req, res) => {
  try {
    const { pinned } = req.body;
    await togglePin(req.params.id, pinned ? 1 : 0);
    res.status(200).json({
      message: pinned ? "📌 Activity pinned!" : "Activity unpinned."
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to update pin." });
  }
};

const remove = async (req, res) => {
  try {
    const affected = await deleteActivity(req.params.id);
    if (!affected) return res.status(404).json({ message: "❌ Not found." });
    res.status(200).json({ message: "✅ Activity deleted!" });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to delete." });
  }
};

module.exports = { getAll, create, update, pin, remove };