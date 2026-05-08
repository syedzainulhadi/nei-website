import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StaffCard from "../components/StaffCard";
import { getStaff } from "../services/staffService";
import { FadeUp, StaggerContainer, StaggerItem } from "../components/AnimatedSection";

const CATEGORIES = [
  { key: "executive",   label: "Executive Members" },
  { key: "teaching",    label: "Teaching Staff" },
  { key: "pta",         label: "PTA Members" },
  { key: "nonteaching", label: "Non-Teaching Staff" },
];

export default function Staff() {
  const [staff, setStaff]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await getStaff();
        setStaff(res.data);
      } catch {
        console.error("Failed to fetch staff");
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  const getByCategory = (cat) => staff.filter((s) => s.category === cat);

  if (loading) return (
    <div className="text-center py-32 text-gray-400">Loading...</div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <FadeUp className="text-center mb-12">
        <p className="text-accent font-semibold uppercase text-sm tracking-widest">Our Team</p>
        <h1 className="text-4xl font-bold text-primary mt-2">Meet Our Staff</h1>
      </FadeUp>

      {CATEGORIES.map(({ key, label }) => {
        const members = getByCategory(key);
        if (members.length === 0) return null;
        return (
          <div key={key} className="mb-14">
            <FadeUp>
              <h2 className="text-2xl font-bold text-primary mb-6 border-l-4 border-accent pl-3">
                {label}
              </h2>
            </FadeUp>
            <StaggerContainer className={`grid gap-6 ${
              key === "executive"
                ? "grid-cols-2 md:grid-cols-3"
                : "grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
            }`}>
              {members.map((member) => (
                <StaggerItem key={member.id}>
                  <motion.div
                    whileHover={{ y: -5, boxShadow: "0 15px 35px rgba(0,0,0,0.1)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <StaffCard member={member} large={key === "executive"} />
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        );
      })}
    </div>
  );
}