import type { Metadata } from "next";
import Image from "next/image";
import { getMemberPage, getCourseImageUrl } from "@/lib/strapi";
import MemberForm from "@/components/ui/MemberForm";

export const revalidate = 300;

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
    heroSubtitle: undefined,
  }));

  const heroImage = mp.heroImage
    ? getCourseImageUrl(Array.isArray(mp.heroImage) ? mp.heroImage[0] : mp.heroImage)
    : null;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="relative w-full py-28 overflow-hidden flex items-center justify-center"
      // style={{ minHeight: "400px" }}
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
        <div className="relative z-10 w-full  mx-auto px-6 flex flex-col md:flex-row gap-20 justify-center">
          <div className="text-center max-w-xl lg:mt-[15%]">
            <p className="text-white font-proxima font-normal text-[36px] leading-[100%] uppercase mb-4">
              {mp.heroTitle}
            </p>
            {mp.heroSubtitle && (
              <p className="text-white/80 font-proxima font-normal text-[16px] leading-[160%]">
                {mp.heroSubtitle}
              </p>
            )}
          </div>

          <div className="bg-white max-w-2xl rounded-2xl shadow-sm p-8 md:p-12">
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
        </div>
      </section>
    </main>
  );
}
