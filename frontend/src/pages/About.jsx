import { motion } from "framer-motion";
import { FadeUp, FadeLeft, FadeRight, StaggerContainer, StaggerItem } from "../components/AnimatedSection";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <FadeUp className="text-center mb-12">
        <p className="text-accent font-semibold uppercase text-sm tracking-widest">
          Who We Are
        </p>
        <h1 className="text-4xl font-bold text-primary mt-2">About Our School</h1>
      </FadeUp>

      <FadeUp delay={0.1}>
        <motion.img
          src="/images/school-building.jpg"
          alt="School Building"
          className="w-full h-72 object-cover rounded-2xl shadow-md mb-10"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        />
      </FadeUp>

      <div className="flex flex-col md:flex-row gap-10 mb-10">
        <FadeLeft className="flex-1">
          <p className="text-gray-600 leading-relaxed">
            Late. Shri. Sadanand R. S. Kakodkar's The New Educational Institute, Curchorem-Goa, was established in
            1934 by the visionary educationist Shri. Kakodkar. For over nine
            decades, the institution has been committed to providing quality
            education while nurturing the holistic development of every student.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Located in the heart of Curchorem, our school has grown from a
            small institution to one of the most respected educational
            establishments in Goa.
          </p>
        </FadeLeft>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { icon: "📍", label: "Address",      value: "Curchorem, Goa - 403706" },
          { icon: "📞", label: "Phone",        value: "+91 98765 43210" },
          { icon: "✉️", label: "Email",        value: "reach.kakodkars@gmail.com" },
          { icon: "🕐", label: "Office Hours", value: "Mon–Sat: 8:30 AM – 5:00 PM" },
        ].map((item) => (
          <StaggerItem key={item.label}>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-start gap-4"
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">{item.label}</p>
                <p className="text-primary font-semibold mt-1">{item.value}</p>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}