import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FadeUp, FadeLeft, FadeRight } from "../components/AnimatedSection";

// =====================================================
// ⚠️  REPLACE THESE 3 VALUES WITH YOUR EMAILJS DETAILS
// =====================================================
const EMAILJS_SERVICE_ID  = "service_1hdlvlk";   // e.g. service_abc1234
const EMAILJS_TEMPLATE_ID = "template_6j3le5m";  // e.g. template_xyz9876
const EMAILJS_PUBLIC_KEY  = "zL7UwOBrJUTGx5BBA";   // e.g. AbCdEfGhIj1234567
// =====================================================

export default function ReachUs() {
  const formRef           = useRef();
  const [status, setStatus]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,       // sends the actual HTML form
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      formRef.current.reset(); // clear the form
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <FadeUp className="text-center mb-12">
        <p className="text-accent font-semibold uppercase text-sm tracking-widest">
          Get In Touch
        </p>
        <h1 className="text-4xl font-bold text-primary mt-2">Reach Us</h1>
        <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm">
          Have a question or want to know more about admissions?
          We'd love to hear from you.
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ---- Contact Info ---- */}
        <FadeLeft className="space-y-6">
          {[
            { icon: "📍", label: "Address", value: "Curchorem, Goa - 403706" },
            { icon: "📞", label: "Phone",   value: "+91 98765 43210" },
            { icon: "✉️", label: "Email",   value: "reach.kakodkars@gmail.com" },
            { icon: "🕐", label: "Hours",   value: "Mon–Sat: 8:30 AM – 5:00 PM" },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">
                  {item.label}
                </p>
                <p className="text-primary font-medium mt-0.5">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </FadeLeft>

        {/* ---- Contact Form ---- */}
        <FadeRight>
          {/* IMPORTANT: use ref={formRef} on the form tag */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">

            {/* 
              IMPORTANT: The 'name' attribute on each input 
              must match the variable names in your EmailJS template.
              e.g. {{from_name}}, {{from_email}}, {{message}}
            */}
            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase mb-1 block">
                Your Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="from_name"
                placeholder="e.g. Rahul Naik"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase mb-1 block">
                Your Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                name="from_email"
                placeholder="e.g. rahul@gmail.com"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase mb-1 block">
                Your Message
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                name="message"
                placeholder="Type your message here..."
                required
                rows={5}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none transition"
              />
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm"
              >
                ✅ Message sent successfully! We will get back to you soon.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm"
              >
                ❌ Failed to send message. Please check your EmailJS credentials
                or try again later.
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-blue-900 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message ✉️"
              )}
            </motion.button>
          </form>
        </FadeRight>
      </div>
    </div>
  );
}