import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/images/school-building.jpg",
    title: "Welcome to The New Educational Institute",
    subtitle: "Curchorem, Goa — Est. 1934",
    desc: "Nurturing minds and shaping futures for over 90 years.",
  },
  {
    image: "/images/school-building.jpg",
    title: "Excellence in Education",
    subtitle: "Where Every Student Shines",
    desc: "A legacy of academic brilliance and holistic development since 1934.",
  },
  {
    image: "/images/school-building.jpg",
    title: "Building Tomorrow's Leaders",
    subtitle: "Join Our Growing Family",
    desc: "With dedicated faculty, we prepare students for a bright future.",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background slides */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt="NEI School"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-2xl"
            >
              {/* Logo badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <img
                  src="/images/logo.png"
                  alt="NEI Logo"
                  className="w-14 h-14 rounded-full border-2 border-accent shadow-lg"
                />
                {/* 90 Years Logo */}
  <img
    src="/images/90years.png"
    alt="Celebrating 90 Years"
    className="w-14 h-14 object-contain drop-shadow-lg"
  />
                <span className="bg-accent/20 border border-accent text-accent text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                  Est. 1934 · Curchorem, Goa
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
              >
                {slides[current].title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-accent text-base md:text-lg font-semibold mb-3"
              >
                {slides[current].subtitle}
              </motion.p>

              {/* Desc */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-gray-300 text-sm md:text-base mb-8 max-w-lg leading-relaxed"
              >
                {slides[current].desc}
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/about"
                    className="bg-accent hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-full transition text-sm md:text-base shadow-lg block"
                  >
                    Discover NEI
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/reach-us"
                    className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-6 py-3 rounded-full transition text-sm md:text-base block"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            animate={{ width: i === current ? 32 : 10 }}
            transition={{ duration: 0.3 }}
            className={`h-2.5 rounded-full ${i === current ? "bg-accent" : "bg-white/50"}`}
          />
        ))}
      </div>

      {/* Stats Bar */}
<motion.div
  initial={{ y: 60, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 1, duration: 0.6 }}
  className="absolute bottom-0 left-0 right-0 bg-primary/90 backdrop-blur-sm"
>
  <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-3 divide-x divide-blue-700">
    {[
      { value: "90+",    label: "Years of Excellence" },
      { value: "10000+", label: "Alumni Worldwide" },      // ← updated
      { value: "50+",    label: "Dedicated Staff" },
    ].map((stat, i) => (
      <motion.div
        key={stat.label}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 + i * 0.1, duration: 0.4 }}
        className="text-center px-4"
      >
        <p className="text-accent font-bold text-lg md:text-2xl">{stat.value}</p>
        <p className="text-gray-300 text-xs md:text-sm">{stat.label}</p>
      </motion.div>
    ))}
  </div>
</motion.div>
    </section>
  );
}