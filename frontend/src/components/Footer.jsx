import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/images/logo.png"
              alt="NEI Logo"
              className="w-12 h-12 rounded-full border-2 border-accent"
            />
            <div>
              <p className="font-bold text-sm leading-tight">
                The New Educational Institute
              </p>
              <p className="text-xs text-yellow-300">Est. 1934</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Over 90 years of shaping young minds and building
            leaders for tomorrow in Curchorem, Goa.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-accent font-bold mb-4 text-sm uppercase tracking-widest">
            Quick Links
          </h3>
          <ul className="space-y-2.5">
            {[
              { name: "Home",         path: "/" },
              { name: "About",        path: "/about" },
              { name: "Achievements", path: "/achievements" },
              { name: "Library",      path: "/library" },
              { name: "Staff",        path: "/staff" },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-gray-400 hover:text-accent text-sm transition flex items-center gap-2"
                >
                  <span className="text-accent text-xs">›</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-accent font-bold mb-4 text-sm uppercase tracking-widest">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="mt-0.5">📍</span>
              <span>Curchorem, Goa - 403706</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:+919876543210" className="hover:text-accent transition">
                +91 98765 43210
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <a href="mailto:reach.kakodkars@gmail.com" className="hover:text-accent transition">
                reach.kakodkars@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>🕐</span>
              <span>Mon–Sat: 8:30 AM – 5:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Map / CTA */}
        <div>
          <h3 className="text-accent font-bold mb-4 text-sm uppercase tracking-widest">
            Visit Us
          </h3>
          <div className="bg-blue-800 rounded-xl p-4 text-sm text-gray-300 mb-4 leading-relaxed">
            📌 The New Educational Institute,<br />
            Curchorem, South Goa,<br />
            Goa — 403706, India
          </div>
          <Link
            to="/reach-us"
            className="block text-center bg-accent hover:bg-yellow-500 text-white font-semibold py-2.5 rounded-xl text-sm transition"
          >
            Get Directions →
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} The New Educational Institute, Curchorem-Goa. All rights reserved.</p>
          <Link to="/admin/login" className="hover:text-accent transition">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}