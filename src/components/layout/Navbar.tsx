"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "ABOUT", href: "/#about" },
    { label: "JOURNEY", href: "/#journey" },
    { label: "TRAINING", href: "/#training" },
    { label: "IMPACT GLOBAL", href: "/#impact" },
    { label: "VISION", href: "/#vision" },
    { label: "CURSOS", href: "/cursos" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: "#1565C0" }}
          >
            B
          </div>
          <span className="font-bold text-base tracking-widest" style={{ color: "#1565C0" }}>
            B-BRIGHT
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-xs font-semibold tracking-wider text-gray-700 hover:text-blue-700 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* JOIN US button */}
        <div className="hidden lg:flex">
          <Link
            href="/#join"
            className="px-5 py-2 rounded-full text-xs font-bold tracking-wider text-white transition-colors"
            style={{ backgroundColor: "#1565C0" }}
          >
            JOIN US
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold tracking-wider text-gray-700 hover:text-blue-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#join"
                className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-wider text-white mt-2"
                style={{ backgroundColor: "#1565C0" }}
                onClick={() => setMobileOpen(false)}
              >
                JOIN US
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
