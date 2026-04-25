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
}: Readonly<FooterProps>) {
  return (
    <footer className="w-full lg:h-68 py-10 px-6 bg-footer-bg text-white">
      <div className="flex flex-col max-w-272.5 md:flex-row md:justify-between md:items-start m-auto">
        {/* Brand column */}
        <div className="w-72">
          <div className="flex items-center">
            {logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={siteName ?? "B-Bright"} className="h-26 w-26 object-contain" />
            )}
          </div>
          {description && (
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>
          )}
          <div className="flex flex-row w-full gap-4">
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

        {/* Link columns from Strapi */}
        {footerColumns.map((col, idx) => (
          <div key={idx} className="flex flex-col justify-start mt-10 ">
            <h4 className="text-white font-proxima font-semibold text-[16px] leading-[140%] uppercase">
              {col.title}
            </h4>
            <ul className="flex flex-col mt-3 gap-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-light font-proxima font-normal text-[14px] leading-[160%] hover:text-white transition-colors"
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
