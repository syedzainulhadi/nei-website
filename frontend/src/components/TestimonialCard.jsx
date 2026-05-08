// =====================================================
// components/TestimonialCard.jsx
// =====================================================

export default function TestimonialCard({ name, batch, text, avatar }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4 hover:shadow-lg transition">
      {/* Stars */}
      <div className="text-accent text-lg">★★★★★</div>

      {/* Quote */}
      <p className="text-gray-600 text-sm leading-relaxed italic">
        "{text}"
      </p>

      {/* Student Info */}
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-primary text-sm">{name}</p>
          <p className="text-xs text-gray-400">Batch of {batch}</p>
        </div>
      </div>
    </div>
  );
}