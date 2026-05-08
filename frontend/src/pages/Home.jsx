import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import FounderSection from "../components/FounderSection";
import { getTestimonials } from "../services/testimonialService";
import { getAchievements } from "../services/achievementService";
import { getActivities } from "../services/activityService";

import {
  FadeUp,
  FadeLeft,
  FadeRight,
  StaggerContainer,
  StaggerItem,
} from "../components/AnimatedSection";

export default function Home() {
  const [testimonials, setTestimonials] = useState([]);
  const [toppers, setToppers] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [tRes, aRes, acRes] = await Promise.all([
          getTestimonials(),
          getAchievements(),
          getActivities(),
        ]);

        setTestimonials((tRes.data || []).slice(0, 3));

        setToppers(
          (aRes.data || [])
            .filter((a) => a.category === "topper")
            .slice(0, 3)
        );

        setActivities((acRes.data || []).slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch home data", err);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <HeroSection />

      <WhySection />

      <FounderSection />

      {toppers.length > 0 && <ToppersPreview toppers={toppers} />}

      {activities.length > 0 && (
        <ActivitiesPreview activities={activities} />
      )}

      {testimonials.length > 0 && (
        <TestimonialsSection testimonials={testimonials} />
      )}

      <CTASection />
    </div>
  );
}

// =====================================================
// WHY SECTION
// =====================================================

function WhySection() {
  const features = [
    {
      icon: "📚",
      title: "Academic Excellence",
      desc: "Consistently producing top results in board examinations with dedicated faculty.",
    },
    {
      icon: "🏆",
      title: "Awards & Recognition",
      desc: "Multiple state and national level awards in academics, sports, and culture.",
    },
    {
      icon: "🎭",
      title: "Holistic Development",
      desc: "Beyond textbooks — sports, arts, drama, and cultural programs for every student.",
    },
    {
      icon: "👨‍🏫",
      title: "Expert Faculty",
      desc: "Experienced and passionate teachers committed to every student's growth.",
    },
    {
      icon: "🌱",
      title: "Value Education",
      desc: "Strong emphasis on ethics, discipline, and community responsibility.",
    },
    {
      icon: "🤝",
      title: "Strong Alumni Network",
      desc: "A thriving community of alumni making a difference worldwide.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeUp className="text-center mb-14">
          <p className="text-accent font-semibold uppercase text-sm tracking-widest mb-2">
            Why Choose Us
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            The NEI Difference
          </h2>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm md:text-base">
            For over 90 years, we have been building not just academic
            achievers but well-rounded individuals ready for life.
          </p>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <motion.div
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl p-6 shadow-sm h-full"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl mb-4">
                  {f.icon}
                </div>

                <h3 className="font-bold text-primary text-lg mb-2">
                  {f.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// =====================================================
// TOPPERS
// =====================================================

function ToppersPreview({ toppers }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <FadeLeft>
            <p className="text-accent font-semibold uppercase text-sm tracking-widest mb-2">
              Our Stars
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Recent Toppers
            </h2>
          </FadeLeft>

          <FadeRight>
            <Link
              to="/achievements"
              className="text-primary font-semibold text-sm hover:text-accent transition"
            >
              View All Achievements →
            </Link>
          </FadeRight>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {toppers.map((t) => {
            const topperName = t?.name || "Anonymous";

            return (
              <StaggerItem key={t.id}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="bg-gradient-to-br from-primary to-blue-800 rounded-2xl p-6 text-white text-center shadow-lg"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 mx-auto mb-4">
                    {t.image_url ? (
                      <img
                        src={t.image_url}
                        alt={topperName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                        {topperName.charAt(0)}
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-blue-200 uppercase tracking-widest mb-1">
                    {t.year}
                  </p>

                  <h3 className="font-bold text-lg">{topperName}</h3>

                  <p className="text-blue-200 text-sm">{t.class}</p>

                  {t.percentage && (
                    <p className="text-accent text-3xl font-bold mt-3">
                      {t.percentage}
                    </p>
                  )}

                  {t.description && (
                    <p className="text-blue-100 text-xs mt-2">
                      {t.description}
                    </p>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

// =====================================================
// ACTIVITIES
// =====================================================

function ActivitiesPreview({ activities }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <FadeLeft>
            <p className="text-accent font-semibold uppercase text-sm tracking-widest mb-2">
              Life at NEI
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Latest Activities
            </h2>
          </FadeLeft>
          <FadeRight>
            <Link
              to="/library"
              className="text-primary font-semibold text-sm hover:text-accent transition"
            >
              View All Activities →
            </Link>
          </FadeRight>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((a) => (
            <StaggerItem key={a.id}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                <Link
                  to={`/library/${a.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group block"
                >
                  {/* Full image — no cropping */}
                  {a.image_url ? (
                    <div className="w-full bg-gray-50 overflow-hidden flex items-center justify-center">
                      <img
                        src={a.image_url}
                        alt={a.title || "Activity"}
                        className="w-full h-auto object-contain max-h-64 group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-50 flex items-center justify-center text-5xl">
                      🏫
                    </div>
                  )}

                  <div className="p-5">
                    {a.title && (
                      <h3 className="font-bold text-primary text-base mb-2 line-clamp-1">
                        {a.title}
                      </h3>
                    )}
                    {a.description && (
                      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                        {a.description}
                      </p>
                    )}
                    <p className="text-accent text-sm font-semibold mt-3">
                      Read More →
                    </p>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// =====================================================
// TESTIMONIALS
// =====================================================

function TestimonialsSection({ testimonials }) {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <FadeUp className="text-center mb-12">
          <p className="text-accent font-semibold uppercase text-sm tracking-widest mb-2">
            Alumni Voices
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What Our Students Say
          </h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => {
            const studentName = t?.name || "Anonymous";

            return (
              <StaggerItem key={t.id}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
                >
                  <div className="text-accent text-xl mb-4">★★★★★</div>

                  <p className="text-white/90 text-sm leading-relaxed italic mb-6">
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm">
                      {studentName.charAt(0)}
                    </div>

                    <div>
                      <p className="text-white font-semibold text-sm">
                        {studentName}
                      </p>

                      <p className="text-blue-300 text-xs">
                        Batch of {t.batch}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

// =====================================================
// CTA
// =====================================================

function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <p className="text-accent font-semibold uppercase text-sm tracking-widest mb-3">
            Join Our Family
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Be Part of Our Legacy
          </h2>

          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Join thousands of alumni who have made NEI proud.
            Admissions open for the new academic year.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/reach-us"
              className="bg-primary text-white px-8 py-3.5 rounded-full font-semibold hover:bg-blue-900 transition"
            >
              Contact Us
            </Link>

            <Link
              to="/about"
              className="border-2 border-primary text-primary px-8 py-3.5 rounded-full font-semibold hover:bg-primary hover:text-white transition"
            >
              Learn More
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}