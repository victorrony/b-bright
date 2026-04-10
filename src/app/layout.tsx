import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getGlobal, getCourseImageUrl } from "@/lib/strapi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();
  return {
    title: {
      default: `${global.siteName} | Geração ${global.siteName}`,
      template: `%s | ${global.siteName}`,
    },
    description: global.siteDescription ?? undefined,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    openGraph: {
      siteName: global.siteName,
      locale: "pt_PT",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const global = await getGlobal();

  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-360 m-auto`}>
        <Navbar
          navLinks={global.navLinks}
          ctaLabel={global.ctaLabel}
          ctaHref={global.ctaHref}
          logoUrl={global.logoNav ? getCourseImageUrl(global.logoNav) : undefined}
          siteName={global.siteName}
        />
        <main>{children}</main>
        <Footer
          description={global.footerDescription}
          phone={global.phone}
          email={global.email}
          footerColumns={global.footerColumns}
          socialLinks={global.socialLinks}
          logoUrl={global.logoFooter ? getCourseImageUrl(global.logoFooter) : undefined}
          siteName={global.siteName}
          copyrightText={global.copyrightText}
        />
      </body>
    </html>
  );
}
