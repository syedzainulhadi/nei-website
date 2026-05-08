// =====================================================
// components/StaffCard.jsx
// =====================================================

export default function StaffCard({ member, large = false }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md overflow-hidden text-center hover:shadow-lg transition ${large ? "p-6" : "p-4"}`}>
      {/* Photo */}
      <div className={`mx-auto rounded-full overflow-hidden border-4 border-primary mb-3 ${large ? "w-32 h-32" : "w-20 h-20"}`}>
        {member.image_url ? (
          <img
            src={member.image_url}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary flex items-center justify-center text-white font-bold text-2xl">
            {member.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className={`font-bold text-primary ${large ? "text-lg" : "text-sm"}`}>
        {member.name}
      </h3>
      <p className={`text-accent font-medium ${large ? "text-sm" : "text-xs"} mt-1`}>
        {member.role}
      </p>
      {member.qualification && (
        <p className="text-gray-400 text-xs mt-1">{member.qualification}</p>
      )}
    </div>
  );
}