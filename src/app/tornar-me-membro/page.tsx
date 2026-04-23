import type { Metadata } from "next";
import Image from "next/image";
import { getMemberPage, getCourseImageUrl } from "@/lib/strapi";
import MemberForm from "@/components/ui/MemberForm";

export const metadata: Metadata = {
  title: "Tornar-me Membro | Geração B-Bright",
  description:
    "Regista-te como membro da Geração B-Bright e faz parte da nossa comunidade.",
};

export default async function TornarMeMembroPage() {
  const mp = await getMemberPage().catch(() => ({
    heroLabel: "Comunidade",
    heroTitle: "Torna-te Membro",
    heroImage: undefined,
  }));

  const heroImage = mp.heroImage
    ? getCourseImageUrl(Array.isArray(mp.heroImage) ? mp.heroImage[0] : mp.heroImage)
    : null;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="relative w-full overflow-hidden flex items-end"
        style={{ minHeight: "400px" }}
      >
        {heroImage && (
          <Image
            src={heroImage}
            alt="Tornar-me membro hero"
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 1440px"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-brand opacity-40" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 pt-24 w-full">
          <p className="text-white font-proxima font-normal text-[28px] leading-[100%] uppercase mb-3">
            {mp.heroLabel}
          </p>
          <h1 className="text-white font-proxima font-normal text-[40px] leading-[100%] uppercase">
            {mp.heroTitle}
          </h1>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h2
            className="text-2xl font-bold uppercase mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            Registo de Membro
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Preenche o formulário abaixo. Após recebermos o teu pedido, a nossa
            equipa irá rever e enviar-te uma confirmação por email.
          </p>
          <MemberForm />
        </div>
      </section>
    </main>
  );
}
