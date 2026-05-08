// =====================================================
// controllers/testimonialController.js
// =====================================================

const {
  getAllTestimonials, getTestimonialById,
  createTestimonial, updateTestimonial, deleteTestimonial
} = require("../models/testimonialModel");

const getAll = async (req, res) => {
  try {
    const data = await getAllTestimonials();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch testimonials." });
  }
};

const create = async (req, res) => {
  try {
    const { name, batch, text } = req.body;
    if (!name || !batch || !text) {
      return res.status(400).json({ message: "❌ All fields are required." });
    }
    const id = await createTestimonial(name, batch, text);
    res.status(201).json({ message: "✅ Testimonial added!", id });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to add testimonial." });
  }
};

const update = async (req, res) => {
  try {
    const { name, batch, text } = req.body;
    const existing = await getTestimonialById(req.params.id);
    if (!existing) return res.status(404).json({ message: "❌ Not found." });
    await updateTestimonial(req.params.id, name, batch, text);
    res.status(200).json({ message: "✅ Testimonial updated!" });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to update testimonial." });
  }
};

const remove = async (req, res) => {
  try {
    const affected = await deleteTestimonial(req.params.id);
    if (!affected) return res.status(404).json({ message: "❌ Not found." });
    res.status(200).json({ message: "✅ Testimonial deleted!" });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to delete testimonial." });
  }
};

module.exports = { getAll, create, update, remove };