import { useNavigate } from "react-router-dom";

export default function ActivityCard({ activity }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/library/${activity.id}`)}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Image — shows full image without cropping */}
      {activity.image_url && (
        <div className="w-full bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={activity.image_url}
            alt={activity.title || "Activity"}
            className="w-full h-auto object-contain max-h-64"
          />
        </div>
      )}

      {/* No image placeholder */}
      {!activity.image_url && (
        <div className="w-full h-48 bg-gray-50 flex items-center justify-center text-5xl">
          🏫
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {activity.title && (
          <h3 className="font-bold text-primary text-lg mb-2 line-clamp-1">
            {activity.title}
          </h3>
        )}
        {activity.description && (
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
            {activity.description}
          </p>
        )}
        <p className="mt-auto pt-3 text-accent font-semibold text-sm">
          Read More →
        </p>
      </div>
    </div>
  );
}