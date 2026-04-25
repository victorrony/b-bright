import type { Metadata } from "next";
import MemberProfileClient from "@/components/ui/MemberProfileClient";

export const metadata: Metadata = {
  title: "Minha Área | Geração B-Bright",
  description: "Consulta o estado do teu pedido de adesão e gere os teus dados.",
};

export default function MemberProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
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
      </section>
    </main>
  );
}
