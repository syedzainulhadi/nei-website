import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getActivities } from "../services/activityService";
import { getNccNss }     from "../services/nccNssService";
import { FadeUp, StaggerContainer, StaggerItem } from "../components/AnimatedSection";

const TABS = [
  { key: "activities", label: "📚 Activities" },
  { key: "nccnss",     label: "🎖️ NCC" },
];

export default function Library() {
  const [tab, setTab]               = useState("activities");
  const [activities, setActivities] = useState([]);
  const [nccNss, setNccNss]         = useState([]);
  const [loadingAct, setLoadingAct] = useState(true);
  const [loadingNcc, setLoadingNcc] = useState(true);
  const [errorAct, setErrorAct]     = useState("");
  const [errorNcc, setErrorNcc]     = useState("");
  const navigate                    = useNavigate();

  // ✅ Fetch activities separately
  const fetchActivities = useCallback(async () => {
    setLoadingAct(true);
    setErrorAct("");
    try {
      const res = await getActivities();
      setActivities(res.data);
    } catch (err) {
      console.error("Activities fetch error:", err);
      setErrorAct("Failed to load activities.");
    } finally {
      setLoadingAct(false);
    }
  }, []);

  // ✅ Fetch NCC/NSS separately
  const fetchNccNss = useCallback(async () => {
    setLoadingNcc(true);
    setErrorNcc("");
    try {
      const res = await getNccNss();
      setNccNss(res.data);
    } catch (err) {
      console.error("NCC/NSS fetch error:", err);
      setErrorNcc("Failed to load NCC & NSS activities.");
    } finally {
      setLoadingNcc(false);
    }
  }, []);

  // ✅ Load both on mount
  useEffect(() => {
    fetchActivities();
    fetchNccNss();
  }, [fetchActivities, fetchNccNss]);

  // ✅ Refetch when tab changes to NCC/NSS
  // This fixes the reload issue
  useEffect(() => {
    if (tab === "nccnss") {
      fetchNccNss();
    }
  }, [tab]);

  const currentList = tab === "activities" ? activities : nccNss;
  const loading     = tab === "activities" ? loadingAct : loadingNcc;
  const error       = tab === "activities" ? errorAct   : errorNcc;

  const pinned  = currentList.filter((i) => i.pinned === 1);
  const regular = currentList.filter((i) => i.pinned !== 1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* Header */}
      <FadeUp className="text-center mb-10">
        <p className="text-accent font-semibold uppercase text-sm tracking-widest">
          What We Do
        </p>
        <h1 className="text-4xl font-bold text-primary mt-2">
          Activities & Library
        </h1>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
          Explore our activities, NCC & NSS programs at NEI.
        </p>
      </FadeUp>

      {/* Tabs */}
      <FadeUp delay={0.1} className="flex gap-3 flex-wrap justify-center mb-10">
        {TABS.map((t) => (
          <motion.button
            key={t.key}
            onClick={() => setTab(t.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition ${
              tab === t.key
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </motion.button>
        ))}
      </FadeUp>

      {/* NCC & NSS Info Banner */}
      {tab === "nccnss" && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-2xl p-5 mb-8 flex items-center gap-4 bg-green-50 border border-green-200"
  >
    <span className="text-4xl">🎖️</span>
    <div>
      <h3 className="font-bold text-lg text-green-800">
        NCC at NEI
      </h3>
      <p className="text-sm text-gray-600 mt-0.5">
        Building discipline, leadership and patriotism among our
        students through National Cadet Corps training and activities.
      </p>
    </div>
  </motion.div>
)}

      {/* Loading */}
      {loading && (
        <div className="text-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3"
          />
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      )}

      {/* Error with retry */}
      {!loading && error && (
        <div className="text-center py-20 bg-red-50 rounded-2xl">
          <p className="text-red-500 mb-3">{error}</p>
          <button
            onClick={() => tab === "activities" ? fetchActivities() : fetchNccNss()}
            className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-900 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && currentList.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-500 font-medium">No entries found.</p>
        </div>
      )}

      {/* Pinned Section */}
      {!loading && !error && pinned.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">📌</span>
            <h2 className="text-lg font-bold text-primary">Pinned</h2>
            <div className="flex-1 border-t border-dashed border-gray-200 ml-2" />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pinned.map((item) => (
              <StaggerItem key={item.id}>
                <ContentCard
                  item={item}
                  tab={tab}
                  navigate={navigate}
                  isPinned={true}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      )}

      {/* Regular Section */}
      {!loading && !error && regular.length > 0 && (
        <>
          {pinned.length > 0 && (
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-lg font-bold text-primary">All</h2>
              <div className="flex-1 border-t border-gray-200 ml-2" />
            </div>
          )}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regular.map((item) => (
              <StaggerItem key={item.id}>
                <ContentCard
                  item={item}
                  tab={tab}
                  navigate={navigate}
                  isPinned={false}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </>
      )}
    </div>
  );
}

// ---- Content Card ----
function ContentCard({ item, tab, navigate, isPinned }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      onClick={() => tab === "activities" && navigate(`/library/${item.id}`)}
      className={`bg-white rounded-2xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl relative flex flex-col ${
        tab === "activities" ? "cursor-pointer" : "cursor-default"
      }`}
    >
      {/* Pin Badge */}
      {isPinned && (
        <div className="absolute top-3 left-3 z-10 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
          📌 Pinned
        </div>
      )}

      {/* Image — full image visible, no cropping */}
      {item.image_url ? (
        <div className="w-full bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={item.image_url}
            alt={item.title || "Activity"}
            className="w-full h-auto object-contain max-h-64"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-50 flex items-center justify-center text-5xl">
          {tab === "nccnss" ? "🎖️" : "🏫"}
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {item.title && (
          <h3 className="font-bold text-primary text-lg line-clamp-1">
            {item.title}
          </h3>
        )}
        {item.description && (
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}
        {tab === "activities" && (
          <p className="mt-auto pt-2 text-accent font-semibold text-sm">
            Read More →
          </p>
        )}
      </div>
    </motion.div>
  );
}