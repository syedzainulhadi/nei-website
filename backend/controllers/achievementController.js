// =====================================================
// controllers/achievementController.js
// =====================================================

const {
  getAllAchievements, getAchievementById,
  createAchievement, updateAchievement, deleteAchievement
} = require("../models/achievementModel");

const getAll = async (req, res) => {
  try {
    const data = await getAllAchievements();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch achievements." });
  }
};

const getOne = async (req, res) => {
  try {
    const data = await getAchievementById(req.params.id);
    if (!data) return res.status(404).json({ message: "❌ Not found." });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch achievement." });
  }
};

const create = async (req, res) => {
  try {
    const { name, class: cls, percentage, description, year, category } = req.body;

    if (!name || !cls || !year || !category) {
      return res.status(400).json({ message: "❌ Name, class, year and category are required." });
    }

    const image_url = req.file
      ? req.file.path
      : null;

    const id = await createAchievement({
      name, class: cls, percentage, description, image_url, year, category
    });

    res.status(201).json({ message: "✅ Achievement added!", id });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to add achievement." });
  }
};

const update = async (req, res) => {
  try {
    const { name, class: cls, percentage, description, year, category } = req.body;
    const existing = await getAchievementById(req.params.id);
    if (!existing) return res.status(404).json({ message: "❌ Not found." });

    const image_url = req.file
      ? req.file.path
      : existing.image_url;

    await updateAchievement(req.params.id, {
      name, class: cls, percentage, description, image_url, year, category
    });

    res.status(200).json({ message: "✅ Achievement updated!" });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to update achievement." });
  }
};

const remove = async (req, res) => {
  try {
    const affected = await deleteAchievement(req.params.id);
    if (!affected) return res.status(404).json({ message: "❌ Not found." });
    res.status(200).json({ message: "✅ Achievement deleted!" });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to delete achievement." });
  }
};

module.exports = { getAll, getOne, create, update, remove };