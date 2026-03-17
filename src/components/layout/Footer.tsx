import Link from "next/link";
import { Phone } from "lucide-react";

const footerColumns = [
  {
    title: "LOREM",
    links: [
      "Lorem ipsum convallis magna",
      "Ipsum convallis magna urna",
      "Convallis magna urna lorem",
      "Magna urna lorem",
    ],
  },
  {
    title: "LOREM",
    links: [
      "Lorem ipsum convallis magna",
      "Ipsum convallis magna urna",
      "Convallis magna urna lorem",
      "Magna urna lorem",
    ],
  },
  {
    title: "LOREM",
    links: [
      "Lorem ipsum convallis magna",
      "Ipsum convallis magna urna",
      "Convallis magna urna lorem",
      "Magna urna lorem",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#000E17]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: "#1565C0" }}
              >
                B
              </div>
              <span className="font-bold text-base tracking-widest text-white">B-BRIGHT</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Establishing B-Bright chapters across all islands and in the diaspora.
            </p>
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(0, 196, 255, 1)" }}>
              <Phone size={14} />
              <span>+238 000 00 00</span>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col, idx) => (
            <div key={idx}>
              <h4 className="text-white font-['Proxima_Nova',sans-serif] font-semibold text-[16px] leading-[140%] uppercase mb-5">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-[#D8D4DE] font-['Proxima_Nova',sans-serif] font-normal text-[14px] leading-[160%] hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} B-Bright. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
