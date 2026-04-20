import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getGlobal, getCourseImageUrl } from "@/lib/strapi";

const dmSans = DM_Sans({
  variable: "--font-proxima",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
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
    icons: {
      icon: "/logo.png",
      shortcut: "/logo.png",
      apple: "/logo.png",
    },
    openGraph: {
      siteName: global.siteName,
      locale: "pt_PT",
      type: "website",
      images: [
        {
          url: "/logo.png",
          width: 512,
          height: 512,
          alt: global.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/logo.png"],
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
      <body className={`${dmSans.variable} antialiased  m-auto`}>
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
