// =====================================================
// components/Navbar.jsx
// =====================================================

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "Home",         path: "/" },
  { name: "About",        path: "/about" },
  { name: "Achievements", path: "/achievements" },   // ← NEW
  { name: "Library",      path: "/library" },
  { name: "Staff",        path: "/staff" },
  { name: "Reach Us",     path: "/reach-us" },
  { name: "Videos",       path: "/videos" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo + School Name */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="NEI Logo"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-bold text-sm leading-tight">
              The New Educational Institute
            </p>
            <p className="text-xs text-yellow-300">Curchorem, Goa</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`hover:text-accent transition ${
                  location.pathname === link.path
                    ? "text-accent border-b-2 border-accent pb-1"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-primary px-4 pb-4 flex flex-col gap-3 text-sm">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block hover:text-accent py-1"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}