import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getVideos } from "../services/videoService";
import { FadeUp, StaggerContainer, StaggerItem } from "../components/AnimatedSection";

export default function Videos() {
  const [videos, setVideos]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getVideos();
        setVideos(res.data);
      } catch {
        console.error("Failed to fetch videos");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const pinned  = videos.filter((v) => v.pinned === 1);
  const regular = videos.filter((v) => v.pinned !== 1);

  if (loading) return (
    <div className="text-center py-32 text-gray-400 text-lg">Loading...</div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">

      {/* Header */}
      <FadeUp className="text-center mb-12">
        <p className="text-accent font-semibold uppercase text-sm tracking-widest">
          Watch & Explore
        </p>
        <h1 className="text-4xl font-bold text-primary mt-2">Videos</h1>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
          Watch moments from school events, activities, and campus life.
        </p>
      </FadeUp>

      {/* Empty */}
      {videos.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <p className="text-4xl mb-3">🎬</p>
          <p className="text-gray-500 font-medium">No videos uploaded yet.</p>
        </div>
      )}

      {/* Pinned Videos */}
      {pinned.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">📌</span>
            <h2 className="text-lg font-bold text-primary">Pinned Videos</h2>
            <div className="flex-1 border-t border-dashed border-gray-200 ml-2" />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pinned.map((video) => (
              <StaggerItem key={video.id}>
                <VideoCard
                  video={video}
                  isPinned={true}
                  onSelect={setSelected}
                  getYouTubeId={getYouTubeId}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      )}

      {/* All Videos */}
      {regular.length > 0 && (
        <>
          {pinned.length > 0 && (
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-lg font-bold text-primary">All Videos</h2>
              <div className="flex-1 border-t border-gray-200 ml-2" />
            </div>
          )}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regular.map((video) => (
              <StaggerItem key={video.id}>
                <VideoCard
                  video={video}
                  isPinned={false}
                  onSelect={setSelected}
                  getYouTubeId={getYouTubeId}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </>
      )}

      {/* Video Modal */}
      {selected && (
        <VideoModal
          video={selected}
          onClose={() => setSelected(null)}
          getYouTubeId={getYouTubeId}
        />
      )}
    </div>
  );
}

// ---- Video Card ----
function VideoCard({ video, isPinned, onSelect, getYouTubeId }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer group relative"
      onClick={() => onSelect(video)}
    >
      {/* Pin Badge */}
      {isPinned && (
        <div className="absolute top-3 left-3 z-10 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
          📌 Pinned
        </div>
      )}

      {/* Thumbnail */}
      <div className="relative h-52 bg-gray-900 overflow-hidden">
        {video.type === "youtube" ? (
          <img
            src={`https://img.youtube.com/vi/${getYouTubeId(video.video_url)}/hqdefault.jpg`}
            alt={video.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
          />
        ) : (
          <video
            src={video.video_url}
            className="w-full h-full object-cover"
            preload="metadata"
          />
        )}

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
          >
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-primary border-b-[10px] border-b-transparent ml-1" />
          </motion.div>
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            video.type === "youtube"
              ? "bg-red-500 text-white"
              : "bg-primary text-white"
          }`}>
            {video.type === "youtube" ? "YouTube" : "MP4"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-primary text-base line-clamp-1">
          {video.title}
        </h3>
        {video.subtitle && (
          <p className="text-gray-500 text-sm mt-1 line-clamp-1">{video.subtitle}</p>
        )}
        <p className="text-xs text-gray-400 mt-2">
          {new Date(video.created_at).toLocaleDateString("en-IN")}
        </p>
      </div>
    </motion.div>
  );
}

// ---- Video Modal ----
function VideoModal({ video, onClose, getYouTubeId }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl overflow-hidden w-full max-w-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-black aspect-video">
          {video.type === "youtube" ? (
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeId(video.video_url)}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <video src={video.video_url} controls autoPlay className="w-full h-full" />
          )}
        </div>
        <div className="p-5 flex justify-between items-start">
          <div>
            <h3 className="font-bold text-primary text-lg">{video.title}</h3>
            {video.subtitle && (
              <p className="text-gray-500 text-sm mt-1">{video.subtitle}</p>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition text-2xl ml-4">✕</button>
        </div>
      </motion.div>
    </motion.div>
  );
}