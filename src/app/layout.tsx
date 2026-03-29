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

export const metadata: Metadata = {
  title: {
    default: "B-Bright | Geração B-Bright",
    template: "%s | B-Bright",
  },
  description:
    "B-Bright — capacitando jovens cabo-verdianos com formação, liderança e oportunidades para iluminar o futuro de África.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    siteName: "B-Bright",
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const global = await getGlobal();

  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar
          navLinks={global.navLinks}
          ctaLabel={global.ctaLabel}
          ctaHref={global.ctaHref}
          logoUrl={global.logo ? getCourseImageUrl(global.logo) : undefined}
          siteName={global.siteName}
        />
        <main>{children}</main>
        <Footer
          description={global.footerDescription}
          phone={global.phone}
          email={global.email}
          footerColumns={global.footerColumns}
          socialLinks={global.socialLinks}
        />
      </body>
    </html>
  );
}
