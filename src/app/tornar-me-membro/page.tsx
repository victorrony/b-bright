import type { Metadata } from "next";
import MemberForm from "@/components/ui/MemberForm";

export const metadata: Metadata = {
  title: "Tornar-me Membro | Geração B-Bright",
  description:
    "Regista-te como membro da Geração B-Bright e faz parte da nossa comunidade.",
};

export default function TornarMeMembroPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="py-20 px-6 text-white text-center"
        style={{ backgroundColor: "var(--color-primary-dark)" }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase opacity-75 mb-3">
            Comunidade
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Torna-te Membro
          </h1>
          <p className="text-lg opacity-80 leading-relaxed">
            Junta-te à Geração B-Bright e faz parte de uma comunidade que
            transforma vidas através da formação, fé e propósito.
          </p>
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
