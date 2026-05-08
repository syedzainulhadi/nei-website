import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getActivities, createActivity,
  updateActivity, deleteActivity,
  pinActivity
} from "../services/activityService";
import {
  getStaff, createStaff,
  updateStaff, deleteStaff
} from "../services/staffService";
import {
  getAchievements, createAchievement,
  updateAchievement, deleteAchievement
} from "../services/achievementService";
import {
  getTestimonials, createTestimonial,
  updateTestimonial, deleteTestimonial
} from "../services/testimonialService";
import {
  getVideos, createVideo,
  updateVideo, deleteVideo,
  pinVideo
} from "../services/videoService";
import {
  getNccNss, createNccNss,
  updateNccNss, deleteNccNss,
  pinNccNss
} from "../services/nccNssService";

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary";
const btnPrimary = "bg-primary text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-900 transition";

// ---- Reusable Pin Button ----
function PinButton({ isPinned, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`text-xs px-3 py-1 rounded-lg border font-medium transition ${
        isPinned
          ? "bg-accent/10 text-accent border-accent"
          : "bg-gray-50 text-gray-500 border-gray-300 hover:border-accent hover:text-accent"
      }`}
    >
      {isPinned ? "📌 Pinned" : "📌 Pin"}
    </button>
  );
}

export default function AdminDashboard() {
  const { token, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("activities");
  const [message, setMessage] = useState("");

  // ---- States ----
  const [activities, setActivities]     = useState([]);
  const [actForm, setActForm]           = useState({ title: "", description: "", image: null });
  const [editActId, setEditActId]       = useState(null);

  const [staffList, setStaffList]       = useState([]);
  const [staffForm, setStaffForm]       = useState({ name: "", role: "", qualification: "", category: "teaching", image: null });
  const [editStaffId, setEditStaffId]   = useState(null);

  const [achievements, setAchievements] = useState([]);
  const [achForm, setAchForm]           = useState({ name: "", class: "", percentage: "", description: "", year: new Date().getFullYear().toString(), category: "topper", image: null });
  const [editAchId, setEditAchId]       = useState(null);

  const [testimonials, setTestimonials] = useState([]);
  const [testForm, setTestForm]         = useState({ name: "", batch: "", text: "" });
  const [editTestId, setEditTestId]     = useState(null);

  const [videos, setVideos]             = useState([]);
  const [videoForm, setVideoForm]       = useState({ title: "", subtitle: "", type: "mp4", video_url: "", file: null });
  const [editVideoId, setEditVideoId]   = useState(null);

  const [nccNssList, setNccNssList]     = useState([]);
  const [nccNssForm, setNccNssForm]     = useState({ title: "", description: "", image: null });
  const [editNccNssId, setEditNccNssId] = useState(null);

  // ---- Auth Guard ----
  useEffect(() => {
    if (!isLoggedIn) navigate("/admin/login");
  }, [isLoggedIn]);

  // ---- Load All on Mount ----
  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = () => {
    loadActivities();
    loadStaff();
    loadAchievements();
    loadTestimonials();
    loadVideos();
    loadNccNss();
  };

  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  // ---- Loaders ----
  const loadActivities   = async () => { try { const r = await getActivities();   setActivities(r.data);   } catch {} };
  const loadStaff        = async () => { try { const r = await getStaff();        setStaffList(r.data);    } catch {} };
  const loadAchievements = async () => { try { const r = await getAchievements(); setAchievements(r.data); } catch {} };
  const loadTestimonials = async () => { try { const r = await getTestimonials(); setTestimonials(r.data); } catch {} };
  const loadVideos       = async () => { try { const r = await getVideos();       setVideos(r.data);       } catch {} };
  const loadNccNss       = async () => { try { const r = await getNccNss();       setNccNssList(r.data);   } catch {} };

  // ---- ACTIVITY HANDLERS ----
  const handleActSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", actForm.title);
    fd.append("description", actForm.description);
    if (actForm.image) fd.append("image", actForm.image);
    try {
      if (editActId) {
        await updateActivity(editActId, fd, token);
        showMsg("✅ Activity updated!");
        setEditActId(null);
      } else {
        await createActivity(fd, token);
        showMsg("✅ Activity added!");
      }
      setActForm({ title: "", description: "", image: null });
      loadActivities();
    } catch { showMsg("❌ Failed. Try again."); }
  };

  const handleActDelete = async (id) => {
    if (!window.confirm("Delete this activity?")) return;
    try { await deleteActivity(id, token); showMsg("✅ Deleted!"); loadActivities(); }
    catch { showMsg("❌ Failed to delete."); }
  };

  const handleActPin = async (a) => {
    try {
      await pinActivity(a.id, !a.pinned, token);
      showMsg(a.pinned ? "Activity unpinned." : "📌 Activity pinned!");
      loadActivities();
    } catch { showMsg("❌ Failed to update pin."); }
  };

  // ---- STAFF HANDLERS ----
  const handleStaffSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(staffForm).forEach(([k, v]) => { if (k !== "image" && v) fd.append(k, v); });
    if (staffForm.image) fd.append("image", staffForm.image);
    try {
      if (editStaffId) {
        await updateStaff(editStaffId, fd, token);
        showMsg("✅ Staff updated!");
        setEditStaffId(null);
      } else {
        await createStaff(fd, token);
        showMsg("✅ Staff added!");
      }
      setStaffForm({ name: "", role: "", qualification: "", category: "teaching", image: null });
      loadStaff();
    } catch { showMsg("❌ Failed. Try again."); }
  };

  const handleStaffDelete = async (id) => {
    if (!window.confirm("Delete this staff member?")) return;
    try { await deleteStaff(id, token); showMsg("✅ Deleted!"); loadStaff(); }
    catch { showMsg("❌ Failed to delete."); }
  };

  // ---- ACHIEVEMENT HANDLERS ----
  const handleAchSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(achForm).forEach(([k, v]) => { if (k !== "image" && v) fd.append(k, v); });
    if (achForm.image) fd.append("image", achForm.image);
    try {
      if (editAchId) {
        await updateAchievement(editAchId, fd, token);
        showMsg("✅ Achievement updated!");
        setEditAchId(null);
      } else {
        await createAchievement(fd, token);
        showMsg("✅ Achievement added!");
      }
      setAchForm({ name: "", class: "", percentage: "", description: "", year: new Date().getFullYear().toString(), category: "topper", image: null });
      loadAchievements();
    } catch { showMsg("❌ Failed. Try again."); }
  };

  const handleAchEdit = (a) => {
    setEditAchId(a.id);
    setAchForm({ name: a.name, class: a.class, percentage: a.percentage || "", description: a.description || "", year: a.year, category: a.category, image: null });
    setTab("achievements");
    window.scrollTo(0, 0);
  };

  const handleAchDelete = async (id) => {
    if (!window.confirm("Delete this achievement?")) return;
    try { await deleteAchievement(id, token); showMsg("✅ Deleted!"); loadAchievements(); }
    catch { showMsg("❌ Failed to delete."); }
  };

  // ---- TESTIMONIAL HANDLERS ----
  const handleTestSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTestId) {
        await updateTestimonial(editTestId, testForm, token);
        showMsg("✅ Testimonial updated!");
        setEditTestId(null);
      } else {
        await createTestimonial(testForm, token);
        showMsg("✅ Testimonial added!");
      }
      setTestForm({ name: "", batch: "", text: "" });
      loadTestimonials();
    } catch { showMsg("❌ Failed. Try again."); }
  };

  const handleTestEdit = (t) => {
    setEditTestId(t.id);
    setTestForm({ name: t.name, batch: t.batch, text: t.text });
    setTab("testimonials");
    window.scrollTo(0, 0);
  };

  const handleTestDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try { await deleteTestimonial(id, token); showMsg("✅ Deleted!"); loadTestimonials(); }
    catch { showMsg("❌ Failed to delete."); }
  };

  // ---- VIDEO HANDLERS ----
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editVideoId) {
        await updateVideo(editVideoId, {
          title: videoForm.title,
          subtitle: videoForm.subtitle
        }, token);
        showMsg("✅ Video updated!");
        setEditVideoId(null);
      } else {
        const fd = new FormData();
        fd.append("title", videoForm.title);
        fd.append("subtitle", videoForm.subtitle);
        fd.append("type", videoForm.type);
        if (videoForm.type === "youtube") {
          fd.append("video_url", videoForm.video_url);
        } else {
          if (videoForm.file) fd.append("video", videoForm.file);
        }
        await createVideo(fd, token);
        showMsg("✅ Video added!");
      }
      setVideoForm({ title: "", subtitle: "", type: "mp4", video_url: "", file: null });
      loadVideos();
    } catch { showMsg("❌ Failed. Try again."); }
  };

  const handleVideoDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;
    try { await deleteVideo(id, token); showMsg("✅ Deleted!"); loadVideos(); }
    catch { showMsg("❌ Failed to delete."); }
  };

  const handleVideoPin = async (v) => {
    try {
      await pinVideo(v.id, !v.pinned, token);
      showMsg(v.pinned ? "Video unpinned." : "📌 Video pinned!");
      loadVideos();
    } catch { showMsg("❌ Failed to update pin."); }
  };

  // ---- NCC/NSS HANDLERS ----
  const handleNccNssSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title",       nccNssForm.title);
    fd.append("description", nccNssForm.description);
    fd.append("category",    "nccnss");
    if (nccNssForm.image) fd.append("image", nccNssForm.image);
    try {
      if (editNccNssId) {
        await updateNccNss(editNccNssId, fd, token);
        showMsg("✅ Activity updated!");
        setEditNccNssId(null);
      } else {
        await createNccNss(fd, token);
        showMsg("✅ Activity added!");
      }
      setNccNssForm({ title: "", description: "", image: null });
      loadNccNss();
    } catch { showMsg("❌ Failed. Try again."); }
  };

  const handleNccNssDelete = async (id) => {
    if (!window.confirm("Delete this activity?")) return;
    try { await deleteNccNss(id, token); showMsg("✅ Deleted!"); loadNccNss(); }
    catch { showMsg("❌ Failed to delete."); }
  };

  const handleNccNssPin = async (item) => {
    try {
      await pinNccNss(item.id, !item.pinned, token);
      showMsg(item.pinned ? "Activity unpinned." : "📌 Activity pinned!");
      loadNccNss();
    } catch { showMsg("❌ Failed to update pin."); }
  };

  // ---- TABS CONFIG ----
  const TABS = [
    { key: "activities",   label: "Activities" },
    { key: "staff",        label: "Staff" },
    { key: "achievements", label: "Achievements" },
    { key: "testimonials", label: "Testimonials" },
    { key: "videos",       label: "Videos" },
    { key: "nccnss", label: "NCC" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`border rounded-xl px-4 py-3 mb-6 text-sm ${
          message.startsWith("✅") || message.includes("📌")
            ? "bg-green-50 text-green-700 border-green-200"
            : message.includes("unpinned")
            ? "bg-gray-50 text-gray-600 border-gray-200"
            : "bg-red-50 text-red-600 border-red-200"
        }`}>
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition ${
              tab === t.key
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ======== ACTIVITIES TAB ======== */}
      {tab === "activities" && (
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-primary mb-4">
              {editActId ? "Edit Activity" : "Add Activity"}
            </h2>
            <form onSubmit={handleActSubmit} className="space-y-3">
  <input type="text" placeholder="Title (optional)" value={actForm.title}
    onChange={(e) => setActForm({ ...actForm, title: e.target.value })}
    className={inputClass} />
  <textarea placeholder="Description (optional)" value={actForm.description}
    onChange={(e) => setActForm({ ...actForm, description: e.target.value })}
    rows={4} className={`${inputClass} resize-none`} />
  <input type="file" accept="image/*"
    onChange={(e) => setActForm({ ...actForm, image: e.target.files[0] })}
    className="text-sm text-gray-500" />
  <div className="flex gap-3">
    <button type="submit" className={btnPrimary}>
      {editActId ? "Update" : "Add Activity"}
    </button>
    {editActId && (
      <button type="button"
        onClick={() => { setEditActId(null); setActForm({ title: "", description: "", image: null }); }}
        className="px-5 py-2 rounded-xl text-sm border border-gray-300 hover:bg-gray-50">
        Cancel
      </button>
    )}
  </div>
</form>
          </div>

          <div className="space-y-3">
            {activities.length === 0 && (
              <p className="text-center text-gray-400 py-10">No activities added yet.</p>
            )}
            {activities.map((a) => (
              <div key={a.id} className={`bg-white border rounded-2xl p-4 flex justify-between items-start gap-4 shadow-sm ${
                a.pinned ? "border-accent/40 bg-accent/5" : "border-gray-100"
              }`}>
                <div className="flex gap-4 items-start">
                  {a.image_url && (
                    <img src={a.image_url} alt={a.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-primary text-sm">{a.title}</p>
                      {a.pinned === 1 && (
                        <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
                          📌 Pinned
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1">{a.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0 flex-wrap justify-end">
                  <PinButton isPinned={a.pinned === 1} onToggle={() => handleActPin(a)} />
                  <button
                    onClick={() => { setEditActId(a.id); setActForm({ title: a.title, description: a.description, image: null }); window.scrollTo(0, 0); }}
                    className="text-xs bg-yellow-50 text-accent border border-accent px-3 py-1 rounded-lg">
                    Edit
                  </button>
                  <button onClick={() => handleActDelete(a.id)}
                    className="text-xs bg-red-50 text-red-500 border border-red-200 px-3 py-1 rounded-lg">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======== STAFF TAB ======== */}
      {tab === "staff" && (
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-primary mb-4">
              {editStaffId ? "Edit Staff" : "Add Staff"}
            </h2>
            <form onSubmit={handleStaffSubmit} className="space-y-3">
  <input type="text" placeholder="Full Name (optional)" value={staffForm.name}
    onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
    className={inputClass} />
  <input type="text" placeholder="Role / Designation (optional)" value={staffForm.role}
    onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
    className={inputClass} />
  <input type="text" placeholder="Qualification (optional)" value={staffForm.qualification}
    onChange={(e) => setStaffForm({ ...staffForm, qualification: e.target.value })}
    className={inputClass} />
  <select value={staffForm.category}
    onChange={(e) => setStaffForm({ ...staffForm, category: e.target.value })}
    className={inputClass}>
    <option value="executive">Executive Member</option>
    <option value="teaching">Teaching Staff</option>
    <option value="pta">PTA Member</option>
    <option value="nonteaching">Non-Teaching Staff</option>
  </select>
  <input type="file" accept="image/*"
    onChange={(e) => setStaffForm({ ...staffForm, image: e.target.files[0] })}
    className="text-sm text-gray-500" />
  <div className="flex gap-3">
    <button type="submit" className={btnPrimary}>
      {editStaffId ? "Update" : "Add Staff"}
    </button>
    {editStaffId && (
      <button type="button"
        onClick={() => { setEditStaffId(null); setStaffForm({ name: "", role: "", qualification: "", category: "teaching", image: null }); }}
        className="px-5 py-2 rounded-xl text-sm border border-gray-300">
        Cancel
      </button>
    )}
  </div>
</form>
          </div>
          <div className="space-y-3">
            {staffList.length === 0 && (
              <p className="text-center text-gray-400 py-10">No staff added yet.</p>
            )}
            {staffList.map((m) => (
              <div key={m.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex justify-between items-center shadow-sm">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-primary flex-shrink-0">
                    {m.image_url
                      ? <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">{m.name.charAt(0)}</div>
                    }
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">{m.name}</p>
                    <p className="text-xs text-accent">{m.role}</p>
                    <p className="text-xs text-gray-400 capitalize">{m.category}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditStaffId(m.id); setStaffForm({ name: m.name, role: m.role, qualification: m.qualification || "", category: m.category, image: null }); window.scrollTo(0, 0); }}
                    className="text-xs bg-yellow-50 text-accent border border-accent px-3 py-1 rounded-lg">
                    Edit
                  </button>
                  <button onClick={() => handleStaffDelete(m.id)}
                    className="text-xs bg-red-50 text-red-500 border border-red-200 px-3 py-1 rounded-lg">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======== ACHIEVEMENTS TAB ======== */}
      {tab === "achievements" && (
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-primary mb-4">
              {editAchId ? "Edit Achievement" : "Add Achievement"}
            </h2>
            <form onSubmit={handleAchSubmit} className="space-y-3">
  <input type="text" placeholder="Student Name (optional)" value={achForm.name}
    onChange={(e) => setAchForm({ ...achForm, name: e.target.value })}
    className={inputClass} />
  <input type="text" placeholder="Class e.g. Class X (optional)" value={achForm.class}
    onChange={(e) => setAchForm({ ...achForm, class: e.target.value })}
    className={inputClass} />
  <input type="text" placeholder="Percentage e.g. 98.6% (optional)" value={achForm.percentage}
    onChange={(e) => setAchForm({ ...achForm, percentage: e.target.value })}
    className={inputClass} />
  <input type="text" placeholder="Short description (optional)" value={achForm.description}
    onChange={(e) => setAchForm({ ...achForm, description: e.target.value })}
    className={inputClass} />
  <input type="text" placeholder="Year e.g. 2024 (optional)" value={achForm.year}
    onChange={(e) => setAchForm({ ...achForm, year: e.target.value })}
    className={inputClass} />
  <select value={achForm.category}
    onChange={(e) => setAchForm({ ...achForm, category: e.target.value })}
    className={inputClass}>
    <option value="topper">🎓 Topper</option>
    <option value="sports">⚽ Sports</option>
    <option value="cultural">🎭 Cultural</option>
    <option value="academic">📚 Academic</option>
  </select>
  <input type="file" accept="image/*"
    onChange={(e) => setAchForm({ ...achForm, image: e.target.files[0] })}
    className="text-sm text-gray-500" />
  <div className="flex gap-3">
    <button type="submit" className={btnPrimary}>
      {editAchId ? "Update" : "Add Achievement"}
    </button>
    {editAchId && (
      <button type="button"
        onClick={() => { setEditAchId(null); setAchForm({ name: "", class: "", percentage: "", description: "", year: new Date().getFullYear().toString(), category: "topper", image: null }); }}
        className="px-5 py-2 rounded-xl text-sm border border-gray-300">
        Cancel
      </button>
    )}
  </div>
</form>
          </div>
          <div className="space-y-3">
            {achievements.length === 0 && (
              <p className="text-center text-gray-400 py-10">No achievements added yet.</p>
            )}
            {achievements.map((a) => (
              <div key={a.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex justify-between items-center shadow-sm">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-accent flex-shrink-0">
                    {a.image_url
                      ? <img src={a.image_url} alt={a.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">{a.name.charAt(0)}</div>
                    }
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">{a.name}</p>
                    <p className="text-xs text-gray-500">{a.class} · {a.year}</p>
                    <p className="text-xs text-accent font-medium capitalize">
                      {a.category} {a.percentage ? `· ${a.percentage}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleAchEdit(a)}
                    className="text-xs bg-yellow-50 text-accent border border-accent px-3 py-1 rounded-lg">
                    Edit
                  </button>
                  <button onClick={() => handleAchDelete(a.id)}
                    className="text-xs bg-red-50 text-red-500 border border-red-200 px-3 py-1 rounded-lg">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======== TESTIMONIALS TAB ======== */}
      {tab === "testimonials" && (
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-primary mb-4">
              {editTestId ? "Edit Testimonial" : "Add Testimonial"}
            </h2>
            <form onSubmit={handleTestSubmit} className="space-y-3">
  <input type="text" placeholder="Student Name (optional)" value={testForm.name}
    onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
    className={inputClass} />
  <input type="text" placeholder="Batch Year e.g. 2018 (optional)" value={testForm.batch}
    onChange={(e) => setTestForm({ ...testForm, batch: e.target.value })}
    className={inputClass} />
  <textarea placeholder="Testimonial message (optional)" value={testForm.text}
    onChange={(e) => setTestForm({ ...testForm, text: e.target.value })}
    rows={4} className={`${inputClass} resize-none`} />
  <div className="flex gap-3">
    <button type="submit" className={btnPrimary}>
      {editTestId ? "Update" : "Add Testimonial"}
    </button>
    {editTestId && (
      <button type="button"
        onClick={() => { setEditTestId(null); setTestForm({ name: "", batch: "", text: "" }); }}
        className="px-5 py-2 rounded-xl text-sm border border-gray-300">
        Cancel
      </button>
    )}
  </div>
</form>
          </div>
          <div className="space-y-3">
            {testimonials.length === 0 && (
              <p className="text-center text-gray-400 py-10">No testimonials added yet.</p>
            )}
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-primary text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">Batch of {t.batch}</p>
                    <p className="text-xs text-gray-600 mt-2 italic line-clamp-2">"{t.text}"</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 ml-4">
                    <button onClick={() => handleTestEdit(t)}
                      className="text-xs bg-yellow-50 text-accent border border-accent px-3 py-1 rounded-lg">
                      Edit
                    </button>
                    <button onClick={() => handleTestDelete(t.id)}
                      className="text-xs bg-red-50 text-red-500 border border-red-200 px-3 py-1 rounded-lg">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======== VIDEOS TAB ======== */}
      {tab === "videos" && (
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-primary mb-4">
              {editVideoId ? "Edit Video (Title & Subtitle only)" : "Add New Video"}
            </h2>
            <form onSubmit={handleVideoSubmit} className="space-y-3">
  <input type="text" placeholder="Video Title (optional)" value={videoForm.title}
    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
    className={inputClass} />
  <input type="text" placeholder="Subtitle (optional)" value={videoForm.subtitle}
    onChange={(e) => setVideoForm({ ...videoForm, subtitle: e.target.value })}
    className={inputClass} />

  {!editVideoId && (
    <>
      <select value={videoForm.type}
        onChange={(e) => setVideoForm({ ...videoForm, type: e.target.value, file: null, video_url: "" })}
        className={inputClass}>
        <option value="mp4">📁 Upload MP4 Video</option>
        <option value="youtube">🎥 YouTube Link</option>
      </select>

      {videoForm.type === "mp4" ? (
        <div>
          <p className="text-xs text-gray-400 mb-1">Upload MP4 file (max 100MB)</p>
          <input type="file" accept="video/mp4,video/webm"
            onChange={(e) => setVideoForm({ ...videoForm, file: e.target.files[0] })}
            className="text-sm text-gray-500" />
        </div>
      ) : (
        <input type="text"
          placeholder="YouTube URL (optional)"
          value={videoForm.video_url}
          onChange={(e) => setVideoForm({ ...videoForm, video_url: e.target.value })}
          className={inputClass} />
      )}
    </>
  )}

  <div className="flex gap-3">
    <button type="submit" className={btnPrimary}>
      {editVideoId ? "Update Video" : "Add Video"}
    </button>
    {editVideoId && (
      <button type="button"
        onClick={() => { setEditVideoId(null); setVideoForm({ title: "", subtitle: "", type: "mp4", video_url: "", file: null }); }}
        className="px-5 py-2 rounded-xl text-sm border border-gray-300">
        Cancel
      </button>
    )}
  </div>
</form>
          </div>

          <div className="space-y-3">
            {videos.length === 0 && (
              <p className="text-center text-gray-400 py-10">No videos added yet.</p>
            )}
            {videos.map((v) => (
              <div key={v.id} className={`bg-white border rounded-2xl p-4 flex justify-between items-center shadow-sm ${
                v.pinned ? "border-accent/40 bg-accent/5" : "border-gray-100"
              }`}>
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl">
                    {v.type === "youtube" ? "🎥" : "🎬"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-primary text-sm">{v.title}</p>
                      {v.pinned === 1 && (
                        <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
                          📌 Pinned
                        </span>
                      )}
                    </div>
                    {v.subtitle && (
                      <p className="text-xs text-gray-400 mt-0.5">{v.subtitle}</p>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${
                      v.type === "youtube"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}>
                      {v.type === "youtube" ? "YouTube" : "MP4"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0 flex-wrap justify-end">
                  <PinButton isPinned={v.pinned === 1} onToggle={() => handleVideoPin(v)} />
                  <button
                    onClick={() => { setEditVideoId(v.id); setVideoForm({ title: v.title, subtitle: v.subtitle || "", type: v.type, video_url: "", file: null }); window.scrollTo(0, 0); }}
                    className="text-xs bg-yellow-50 text-accent border border-accent px-3 py-1 rounded-lg">
                    Edit
                  </button>
                  <button onClick={() => handleVideoDelete(v.id)}
                    className="text-xs bg-red-50 text-red-500 border border-red-200 px-3 py-1 rounded-lg">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======== NCC & NSS TAB ======== */}
      {tab === "nccnss" && (
        <div>
          {/* Info Banner */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
  <span className="text-2xl">🎖️</span>
  <p className="text-sm text-green-800 font-medium">
    Add and manage NCC (National Cadet Corps) activities here.
  </p>
</div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-primary mb-4">
              {editNccNssId ? "Edit NCC & NSS Activity" : "Add NCC & NSS Activity"}
            </h2>
            <form onSubmit={handleNccNssSubmit} className="space-y-3">
  <input type="text" placeholder="Title (optional)" value={nccNssForm.title}
    onChange={(e) => setNccNssForm({ ...nccNssForm, title: e.target.value })}
    className={inputClass} />
  <textarea placeholder="Description (optional)" value={nccNssForm.description}
    onChange={(e) => setNccNssForm({ ...nccNssForm, description: e.target.value })}
    rows={3} className={`${inputClass} resize-none`} />
  <input type="file" accept="image/*"
    onChange={(e) => setNccNssForm({ ...nccNssForm, image: e.target.files[0] })}
    className="text-sm text-gray-500" />
  <div className="flex gap-3">
    <button type="submit" className={btnPrimary}>
      {editNccNssId ? "Update Activity" : "Add Activity"}
    </button>
    {editNccNssId && (
      <button type="button"
        onClick={() => { setEditNccNssId(null); setNccNssForm({ title: "", description: "", image: null }); }}
        className="px-5 py-2 rounded-xl text-sm border border-gray-300">
        Cancel
      </button>
    )}
  </div>
</form>
          </div>

          <div className="space-y-3">
            {nccNssList.length === 0 && (
              <p className="text-center text-gray-400 py-10">No NCC & NSS activities added yet.</p>
            )}
            {nccNssList.map((item) => (
              <div key={item.id} className={`bg-white border rounded-2xl p-4 flex justify-between items-start shadow-sm ${
                item.pinned ? "border-accent/40 bg-accent/5" : "border-gray-100"
              }`}>
                <div className="flex gap-3 items-start">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center text-xl">
                    {item.image_url
                      ? <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                      : <span>🎖️</span>
                    }
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-primary text-sm">{item.title}</p>
                      {item.pinned === 1 && (
                        <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
                          📌 Pinned
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{item.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0 flex-wrap justify-end">
                  <PinButton isPinned={item.pinned === 1} onToggle={() => handleNccNssPin(item)} />
                  <button
                    onClick={() => { setEditNccNssId(item.id); setNccNssForm({ title: item.title, description: item.description, image: null }); window.scrollTo(0, 0); }}
                    className="text-xs bg-yellow-50 text-accent border border-accent px-3 py-1 rounded-lg">
                    Edit
                  </button>
                  <button onClick={() => handleNccNssDelete(item.id)}
                    className="text-xs bg-red-50 text-red-500 border border-red-200 px-3 py-1 rounded-lg">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}