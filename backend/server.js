const express = require("express");
const cors    = require("cors");
const dotenv  = require("dotenv");
// const path    = require("path");

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://nei-website-zyye.vercel.app",
  "https://nei-website-zyye-git-main-syedzainulhadi-gmailcoms-projects.vercel.app"
  // "https://clutter-reliant-nemesis.ngrok-free.dev"
];

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---- ALL ROUTES ----
const activityRoutes    = require("./routes/activityRoutes");
const staffRoutes       = require("./routes/staffRoutes");
const adminRoutes       = require("./routes/adminRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const videoRoutes       = require("./routes/videoRoutes");       // NEW
const nccNssRoutes      = require("./routes/nccNssRoutes");      // NEW

app.use("/api/activities",    activityRoutes);
app.use("/api/staff",         staffRoutes);
app.use("/api/admin",         adminRoutes);
app.use("/api/achievements",  achievementRoutes);
app.use("/api/testimonials",  testimonialRoutes);
app.use("/api/videos",        videoRoutes);                      // NEW
app.use("/api/nccnss",        nccNssRoutes);                     // NEW

app.get("/", (req, res) => {
  res.json({ message: "NEI School Backend is running ✅" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});