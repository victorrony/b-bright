import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import type { FooterColumn, SocialLink } from "@/lib/strapi";

interface FooterProps {
  description: string | null;
  phone: string | null;
  email: string | null;
  footerColumns: FooterColumn[];
  socialLinks: SocialLink[];
  logoUrl?: string;
  siteName?: string;
  copyrightText?: string;
}

export default function Footer({
  description,
  phone,
  email,
  footerColumns,
  logoUrl,
  siteName,
  copyrightText = "All rights reserved.",
}: Readonly<FooterProps>) {
  return (
    <footer className="w-full lg:h-68 py-10 px-6 bg-[#000E17] text-white">
        <div className="flex flex-row justify-evenly items-center m-auto gap-10">
          {/* Brand column */}
          <div className="w-72">
            <div className="flex items-center ">
              {logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={siteName ?? "B-Bright"} className="h-26 w-26 object-contain" />
              )}
            </div>
            {description && (
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>
            )}
            <div className="flex flex-row gap-8">
              {phone && (
                <div className="flex items-center gap-2 text-sm text-accent">
                  <Phone size={14} />
                  <span>{phone}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-2 text-sm text-accent">
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
    </footer>
  );
}
