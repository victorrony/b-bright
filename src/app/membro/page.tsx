import type { Metadata } from "next";
import Image from "next/image";
import MemberProfileClient from "@/components/ui/MemberProfileClient";
import { getMemberPage, getCourseImageUrl } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Minha Área | Geração B-Bright",
  description: "Consulta o estado do teu pedido de adesão e gere os teus dados.",
};

export const revalidate = 300;

export default async function MemberProfilePage() {
  const mp = await getMemberPage().catch(() => ({ heroImage: undefined }));

  const heroImage = mp.heroImage
    ? getCourseImageUrl(Array.isArray(mp.heroImage) ? mp.heroImage[0] : mp.heroImage)
    : null;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative w-full overflow-hidden flex items-center justify-center py-28">
        {heroImage && (
          <Image
            src={heroImage}
            alt="Minha Área hero"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-brand opacity-40" />

        <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <h1
              className="text-3xl font-bold uppercase mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              Minha Área
            </h1>
            <p className="text-gray-500 text-sm mb-10">
              Introduz o teu email para consultares o estado do teu registo e editares os teus dados.
            </p>
            <MemberProfileClient />
          </div>
        </div>
      </section>
    </main>
  );
}
