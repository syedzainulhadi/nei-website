// =====================================================
// controllers/staffController.js
// Handles all Staff CRUD operations
// =====================================================

const {
  getAllStaff,
  getStaffByCategory,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff
} = require("../models/staffModel");

// GET /api/staff - Get all staff
const getAll = async (req, res) => {
  try {
    // Optional: filter by category using query param
    // Example: /api/staff?category=teaching
    const { category } = req.query;

    const staff = category
      ? await getStaffByCategory(category)
      : await getAllStaff();

    res.status(200).json(staff);
  } catch (err) {
    console.error("Get staff error:", err.message);
    res.status(500).json({ message: "❌ Failed to fetch staff." });
  }
};

// GET /api/staff/:id - Get one staff member
const getOne = async (req, res) => {
  try {
    const member = await getStaffById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "❌ Staff member not found." });
    }
    res.status(200).json(member);
  } catch (err) {
    console.error("Get staff error:", err.message);
    res.status(500).json({ message: "❌ Failed to fetch staff member." });
  }
};

// POST /api/staff - Add new staff (admin only)
const create = async (req, res) => {
  try {
    const { name, role, qualification, category } = req.body;

    // if (!name || !role || !category) {
    //   return res.status(400).json({ 
    //     message: "❌ Name, role, and category are required." 
    //   });
    // }

    const image_url = req.file
      ? `${process.env.BASE_URL}/uploads/${req.file.filename}`
      : null;

    const newId = await createStaff(
      name, role, qualification, image_url, category
    );

    res.status(201).json({ 
      message: "✅ Staff member added!", 
      id: newId 
    });
  } catch (err) {
    console.error("Create staff error:", err.message);
    res.status(500).json({ message: "❌ Failed to add staff member." });
  }
};

// PUT /api/staff/:id - Update staff (admin only)
const update = async (req, res) => {
  try {
    const { name, role, qualification, category } = req.body;
    const { id } = req.params;

    const existing = await getStaffById(id);
    if (!existing) {
      return res.status(404).json({ message: "❌ Staff member not found." });
    }

    const image_url = req.file
      ? `${process.env.BASE_URL}/uploads/${req.file.filename}`
      : existing.image_url;

    await updateStaff(id, name, role, qualification, image_url, category);
    res.status(200).json({ message: "✅ Staff member updated!" });
  } catch (err) {
    console.error("Update staff error:", err.message);
    res.status(500).json({ message: "❌ Failed to update staff member." });
  }
};

// DELETE /api/staff/:id - Delete staff (admin only)
const remove = async (req, res) => {
  try {
    const affected = await deleteStaff(req.params.id);
    if (!affected) {
      return res.status(404).json({ message: "❌ Staff member not found." });
    }
    res.status(200).json({ message: "✅ Staff member deleted!" });
  } catch (err) {
    console.error("Delete staff error:", err.message);
    res.status(500).json({ message: "❌ Failed to delete staff member." });
  }
};

module.exports = { getAll, getOne, create, update, remove };