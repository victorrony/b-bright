import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import type { FooterColumn, SocialLink } from "@/lib/strapi";

interface FooterProps {
  description: string | null;
  phone: string | null;
  email: string | null;
  footerColumns: FooterColumn[];
  socialLinks: SocialLink[];
}

export default function Footer({
  description,
  phone,
  email,
  footerColumns,
}: FooterProps) {
  return (
    <footer className="w-full bg-[#000E17]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: "var(--color-primary-dark)" }}
              >
                B
              </div>
              <span className="font-bold text-base tracking-widest text-white">B-BRIGHT</span>
            </div>
            {description && (
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>
            )}
            <div className="flex flex-col gap-2">
              {phone && (
                <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(0, 196, 255, 1)" }}>
                  <Phone size={14} />
                  <span>{phone}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(0, 196, 255, 1)" }}>
                  <Mail size={14} />
                  <span>{email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col, idx) => (
            <div key={idx}>
              <h4 className="text-white font-proxima font-semibold text-[16px] leading-[140%] uppercase mb-5">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#D8D4DE] font-proxima font-normal text-[14px] leading-[160%] hover:text-white transition-colors"
                    >
                      {link.label}
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
