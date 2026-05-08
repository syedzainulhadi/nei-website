import { useEffect, useState } from "react";
import { getAchievements } from "../services/achievementService";

const CATEGORIES = [
  { key: "topper",   label: "Toppers",  icon: "🎓" },
  { key: "sports",   label: "Sports",   icon: "⚽" },
  { key: "cultural", label: "Cultural", icon: "🎭" },
  { key: "academic", label: "Academic", icon: "📚" },
];

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [years, setYears]               = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [activeTab, setActiveTab]       = useState("");
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAchievements();
        const data = res.data;
        setAchievements(data);

        // Get unique years sorted latest first
        const uniqueYears = [...new Set(data.map((a) => a.year))].sort(
          (a, b) => b - a
        );
        setYears(uniqueYears);

        // Default: select latest year and first category
        if (uniqueYears.length > 0) setSelectedYear(uniqueYears[0]);
        setActiveTab("topper");
      } catch {
        console.error("Failed to fetch achievements");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Filter whenever year or category changes
  useEffect(() => {
    let data = achievements;
    if (selectedYear) data = data.filter((a) => a.year === selectedYear);
    if (activeTab)    data = data.filter((a) => a.category === activeTab);
    setFiltered(data);
  }, [selectedYear, activeTab, achievements]);

  if (loading) return (
    <div className="text-center py-32 text-gray-400 text-lg">Loading...</div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* Page Header */}
      <div className="text-center mb-12">
        <p className="text-accent font-semibold uppercase text-sm tracking-widest">
          Pride of NEI
        </p>
        <h1 className="text-4xl font-bold text-primary mt-2">Achievements</h1>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
          Celebrating the stars who have made The New Educational Institute
          proud through academics, sports, and culture.
        </p>
      </div>

      {/* Year Selector */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 uppercase font-semibold mb-3 text-center tracking-widest">
          Select Year
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              className={`px-6 py-2 rounded-full text-sm font-semibold border-2 transition ${
                selectedYear === y
                  ? "bg-primary text-white border-primary"
                  : "border-gray-300 text-gray-600 hover:border-primary hover:text-primary"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-6" />

      {/* Category Selector */}
      <div className="mb-10">
        <p className="text-xs text-gray-400 uppercase font-semibold mb-3 text-center tracking-widest">
          Select Category
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition flex items-center gap-2 ${
                activeTab === cat.key
                  ? "bg-accent text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary border-l-4 border-accent pl-3">
          {CATEGORIES.find((c) => c.key === activeTab)?.icon}{" "}
          {CATEGORIES.find((c) => c.key === activeTab)?.label} — {selectedYear}
        </h2>
        <span className="text-sm text-gray-400">
          {filtered.length} record{filtered.length !== 1 ? "s" : ""} found
        </span>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <p className="text-4xl mb-3">🏆</p>
          <p className="text-gray-500 font-medium">
            No achievements found for this selection.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Try selecting a different year or category.
          </p>
        </div>
      )}

      {/* Achievement Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((a) => (
          <AchievementCard key={a.id} achievement={a} />
        ))}
      </div>
    </div>
  );
}

// ---- Clean Achievement Card (no ranking) ----
function AchievementCard({ achievement: a }) {
  const categoryStyle = {
    topper:   { bg: "bg-blue-50",   border: "border-blue-200",   badge: "bg-blue-100 text-blue-700"   },
    sports:   { bg: "bg-green-50",  border: "border-green-200",  badge: "bg-green-100 text-green-700"  },
    cultural: { bg: "bg-purple-50", border: "border-purple-200", badge: "bg-purple-100 text-purple-700" },
    academic: { bg: "bg-yellow-50", border: "border-yellow-200", badge: "bg-yellow-100 text-yellow-700" },
  };

  const style = categoryStyle[a.category] || categoryStyle.academic;

  return (
    <div className={`rounded-2xl border-2 ${style.bg} ${style.border} p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300`}>

      {/* Photo */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
        {a.image_url ? (
          <img
            src={a.image_url}
            alt={a.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary flex items-center justify-center text-white text-3xl font-bold">
            {a.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-primary">{a.name}</h3>

      {/* Class */}
      <p className="text-sm text-gray-500 mt-0.5">{a.class}</p>

      {/* Percentage — only for toppers */}
      {a.percentage && (
        <p className="text-3xl font-bold text-primary mt-3">{a.percentage}</p>
      )}

      {/* Description */}
      {a.description && (
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
          {a.description}
        </p>
      )}

      {/* Category Badge */}
      <span className={`text-xs px-3 py-1 rounded-full font-semibold mt-4 ${style.badge}`}>
        {a.category.charAt(0).toUpperCase() + a.category.slice(1)}
      </span>
    </div>
  );
}