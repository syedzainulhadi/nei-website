// =====================================================
// pages/ActivityDetail.jsx
// =====================================================

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getActivityById } from "../services/activityService";

export default function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getActivityById(id);
        setActivity(res.data);
      } catch {
        navigate("/library");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return (
    <div className="text-center py-32 text-gray-400">Loading...</div>
  );

  if (!activity) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <button
        onClick={() => navigate("/library")}
        className="text-primary font-semibold mb-6 flex items-center gap-2 hover:text-accent transition"
      >
        ← Back to Activities
      </button>

      {activity.image_url && (
  <div className="w-full bg-gray-50 rounded-2xl overflow-hidden mb-8 flex items-center justify-center shadow-md">
    <img
      src={activity.image_url}
      alt={activity.title || "Activity"}
      className="w-full h-auto object-contain max-h-[500px]"
    />
  </div>
)}

      <h1 className="text-3xl font-bold text-primary mb-4">
        {activity.title}
      </h1>
      <p className="text-xs text-gray-400 mb-6">
        Posted on {new Date(activity.created_at).toLocaleDateString("en-IN")}
      </p>
      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
        {activity.description}
      </p>
    </div>
  );
}