import { motion } from "framer-motion";
import { FadeLeft, FadeRight, StaggerContainer, StaggerItem } from "./AnimatedSection";

export default function FounderSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-accent font-semibold uppercase text-sm tracking-widest mb-2">
            The Visionary Behind NEI
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Founder
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ---- Image Side ---- */}
          <FadeLeft className="relative flex-shrink-0 flex flex-col items-center">

            {/* Decorative background circle */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 w-64 h-64 md:w-80 md:h-80 rounded-full bg-accent/10 z-0"
            />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-primary/10 z-0" />

            {/* Founder Photo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-56 h-64 md:w-64 md:h-80 rounded-2xl overflow-hidden border-8 border-white shadow-2xl"
            >
              <img
                src="/images/founder.jpg"
                alt="Late. Shri. Sadanand R. S. Kakodkar"
                className="w-full h-full object-cover object-top"
              />
            </motion.div>

            {/* Dada Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="relative z-10 mt-4 bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg text-center"
            >
              🌟 Dada — The source of perennial Inspiration
            </motion.div>
          </FadeLeft>

          {/* ---- Text Side ---- */}
          <FadeRight className="flex-1 text-center lg:text-left">

            {/* Tag */}
            <p className="text-accent font-semibold uppercase text-xs tracking-widest mb-2">
              The Founder
            </p>

            {/* Full Name */}
            <h3 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-1">
              Late. Shri. Sadanand R. S. Kakodkar
            </h3>

            {/* Dates */}
            <p className="text-gray-400 text-sm font-medium mb-6">
              10 March 1910 — 30 December 1993
            </p>

            {/* Quote from the image */}
            <div className="bg-gradient-to-r from-accent/10 to-transparent border-l-4 border-accent pl-5 pr-3 py-4 rounded-r-2xl mb-6 text-left">
              <p className="text-gray-600 italic text-sm md:text-base leading-relaxed">
                "Those we love don't go away, they walk beside us everyday.
                Unseen, Unheard, but always near, still loved, still missed
                &amp; very dear."
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">
              Late. Shri. Sadanand R. S. Kakodkar, fondly remembered as
              <span className="font-semibold text-primary"> "Dada"</span>,
              was a visionary educationist who founded The New Educational
              Institute in Curchorem, Goa in <span className="font-semibold text-primary">1934</span>.
              His unwavering belief in the transformative power of education
              drove him to build an institution that would serve the
              community for generations.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-8">
              Though he is no longer with us, his spirit lives on through
              every student who walks through the doors of NEI. His legacy
              of dedication, discipline, and compassion continues to inspire
              the institution he built with love.
            </p>

            {/* Stats */}
            <StaggerContainer className="flex flex-wrap justify-center lg:justify-start gap-8">
              {[
                { value: "1934",  label: "Year Founded" },
                { value: "83",    label: "Years of a Life Well Lived" },
                { value: "90+",   label: "Years of NEI's Legacy" },
              ].map((s) => (
                <StaggerItem key={s.label}>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="text-center cursor-default"
                  >
                    <p className="text-2xl md:text-3xl font-bold text-primary">
                      {s.value}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 max-w-[100px] leading-tight">
                      {s.label}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeRight>
        </div>

        {/* Bottom tribute strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-primary via-blue-800 to-primary rounded-2xl px-8 py-6 text-center text-white shadow-xl"
        >
          <p className="text-accent font-bold text-lg mb-1">
            🕊️ A Legacy That Lives Forever
          </p>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto">
            Late. Shri. Sadanand R. S. Kakodkar's dream of a better-educated
            Curchorem lives on through thousands of alumni who carry his
            values of knowledge, integrity, and service to the world.
          </p>
        </motion.div>

      </div>
    </section>
  );
}