// =====================================================
// controllers/videoController.js
// =====================================================

const {
  getAllVideos, getVideoById,
  createVideo, updateVideo,
  togglePin, deleteVideo
} = require("../models/videoModel");

const getAll = async (req, res) => {
  try {
    const data = await getAllVideos();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch videos." });
  }
};

const create = async (req, res) => {
  try {
    const { title, subtitle, type } = req.body;
    // if (!title) {
    //   return res.status(400).json({ message: "❌ Title is required." });
    // }
    let video_url = "";
    if (type === "youtube") {
      video_url = req.body.video_url;
      if (!video_url) {
        return res.status(400).json({ message: "❌ YouTube URL required." });
      }
    } else {
      if (!req.file) {
        return res.status(400).json({ message: "❌ Video file required." });
      }
      video_url = `http://localhost:5000/uploads/${req.file.filename}`;
    }
    const id = await createVideo(title, subtitle, video_url, type || "mp4");
    res.status(201).json({ message: "✅ Video added!", id });
  } catch (err) {
    console.error("Create video error:", err.message);
    res.status(500).json({ message: "❌ Failed to add video." });
  }
};

const update = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const existing = await getVideoById(req.params.id);
    if (!existing) return res.status(404).json({ message: "❌ Not found." });
    await updateVideo(req.params.id, title, subtitle, existing.video_url);
    res.status(200).json({ message: "✅ Video updated!" });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to update video." });
  }
};

// PIN / UNPIN
const pin = async (req, res) => {
  try {
    const { pinned } = req.body;
    await togglePin(req.params.id, pinned ? 1 : 0);
    res.status(200).json({
      message: pinned ? "📌 Video pinned!" : "Video unpinned."
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to update pin." });
  }
};

const remove = async (req, res) => {
  try {
    const affected = await deleteVideo(req.params.id);
    if (!affected) return res.status(404).json({ message: "❌ Not found." });
    res.status(200).json({ message: "✅ Video deleted!" });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to delete video." });
  }
};

module.exports = { getAll, create, update, pin, remove };