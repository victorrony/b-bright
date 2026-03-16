import { ArrowRight } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import Link from "next/link";

const coursesData: Record<
  string,
  {
    title: string;
    organizer: string;
    trainer: string;
    credentials: string[];
    description: string;
    image: string;
    details: { label: string; value: string }[];
  }
> = {
  "gestao-de-liquidez": {
    title: "WORKSHOP: GESTÃO DE LIQUIDEZ E TESOURARIA",
    organizer: "Geração B-Bright",
    trainer: "José Carlos Teixeira",
    credentials: [
      "Doutorado em Economia pela Universidade de Évora",
      "Professor Adjunto Convidado na área de Finanças – ISCAL / Instituto Politécnico de Lisboa",
    ],
    description:
      "Este workshop visa capacitar jovens e profissionais em técnicas de gestão de liquidez e tesouraria, fundamentais para a sustentabilidade financeira de negócios e projetos.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&q=80",
    details: [
      { label: "Local", value: "Palácio do Governo (sala de conferências)" },
      { label: "Data", value: "4 de agosto de 2025" },
      { label: "Horário", value: "Das 10h às 12h" },
    ],
  },
  "comunicacao-e-oratoria": {
    title: "COMUNICAÇÃO E ORATÓRIA COM EVELISE CARVALHO",
    organizer: "Geração B-Bright",
    trainer: "Evelise Carvalho",
    credentials: [],
    description:
      "A Geração B-Bright promove a formação em Comunicação e Oratória para fortalecer as competências de comunicação, expressão pública e liderança entre jovens.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80",
    details: [
      { label: "Duração", value: "2 semanas" },
      { label: "Horário", value: "16h00 – 18h00" },
      { label: "Formadora", value: "Evelise Carvalho" },
    ],
  },
};

const otherCourses = [
  {
    slug: "gestao-de-liquidez",
    title: "WORKSHOP: GESTÃO DE LIQUIDEZ E TESOURARIA",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
    detail: "4 de agosto de 2025 · 10h – 12h",
  },
  {
    slug: "comunicacao-e-oratoria",
    title: "COMUNICAÇÃO E ORATÓRIA COM EVELISE CARVALHO",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80",
    detail: "2 semanas · 16h – 18h",
  },
];

export default async function CourseRegistrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = coursesData[slug] ?? coursesData["gestao-de-liquidez"];

  return (
    <>
      {/* Hero split — full width ~600px height */}
      <section
        className="w-full grid grid-cols-1 lg:grid-cols-2"
        style={{ minHeight: "600px" }}
      >
        {/* Left: background image with dark overlay + white text */}
        <div className="relative flex flex-col justify-end p-10" style={{ minHeight: "400px" }}>
          <img
            src={course.image}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(13,27,42,0.95) 0%, rgba(13,71,161,0.60) 100%)",
            }}
          />
          <div className="relative z-10">
            <h1 className="text-white font-bold text-xl md:text-2xl leading-snug mb-4">
              {course.title}
            </h1>
            <p className="text-blue-200 text-sm mb-1">
              <span className="font-semibold">Organizado por:</span> {course.organizer}
            </p>
            <p className="text-blue-200 text-sm mb-3">
              <span className="font-semibold">Formador:</span> {course.trainer}
            </p>
            {course.credentials.map((c) => (
              <p key={c} className="text-blue-100 text-xs mb-1 flex items-start gap-2">
                <span>•</span>
                <span>{c}</span>
              </p>
            ))}
            <div className="mt-4 flex flex-col gap-1">
              {course.details.map((d) => (
                <p key={d.label} className="text-blue-200 text-sm">
                  <span className="font-semibold">{d.label}:</span> {d.value}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right: white background with elevated form card */}
        <div className="bg-white flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#1565C0" }}>
              INSCRIÇÃO:
            </h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ "--tw-ring-color": "#1565C0" } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                  Nome completo
                </label>
                <input
                  type="text"
                  placeholder="O seu nome completo"
                  className="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2"
                />
              </div>
              {/* Three dropdowns in a row */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                    Idade
                  </label>
                  <select className="w-full border border-gray-200 rounded px-2 py-3 text-sm focus:outline-none focus:ring-2 bg-white text-gray-600">
                    <option value="">Idade</option>
                    {Array.from({ length: 43 }, (_, i) => i + 15).map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                    Sexo
                  </label>
                  <select className="w-full border border-gray-200 rounded px-2 py-3 text-sm focus:outline-none focus:ring-2 bg-white text-gray-600">
                    <option value="">Sexo</option>
                    <option value="masculino">Masc.</option>
                    <option value="feminino">Fem.</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                    Ocupação
                  </label>
                  <select className="w-full border border-gray-200 rounded px-2 py-3 text-sm focus:outline-none focus:ring-2 bg-white text-gray-600">
                    <option value="">Ocup.</option>
                    <option value="estudante">Estudante</option>
                    <option value="empregado">Empregado</option>
                    <option value="desempregado">Desempregado</option>
                    <option value="empreendedor">Empreendedor</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                  Por que deseja participar?
                </label>
                <textarea
                  rows={4}
                  placeholder="Partilhe a sua motivação..."
                  className="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none"
                />
              </div>
              <Button variant="primary" type="submit" arrow className="w-full justify-center mt-2">
                ENVIAR
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Other courses section */}
      <section className="w-full bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              ENCONTRE OUTROS{" "}
              <span style={{ color: "#1565C0" }}>CURSOS</span>
              <br />
              <span style={{ color: "#1565C0" }}>DISPONÍVEIS</span>
            </h2>
            <p className="mt-4 text-gray-500 text-sm max-w-xl mx-auto">
              Explore todas as formações disponibilizadas pela Geração B-Bright para capacitar
              jovens líderes.
            </p>
          </div>

          {/* 2 horizontal course cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherCourses
              .filter((c) => c.slug !== slug)
              .concat(otherCourses.filter((c) => c.slug === slug))
              .slice(0, 2)
              .map((c) => (
                <div
                  key={c.slug}
                  className="flex flex-col sm:flex-row gap-0 rounded-xl overflow-hidden border border-gray-100 shadow-sm"
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full sm:w-[150px] h-40 sm:h-auto object-cover flex-shrink-0"
                  />
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h3
                        className="font-bold text-sm leading-snug mb-2"
                        style={{ color: "#1565C0" }}
                      >
                        {c.title}
                      </h3>
                      <p className="text-gray-500 text-xs mb-4">{c.detail}</p>
                    </div>
                    <Link
                      href={`/cursos/${c.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold tracking-wider"
                      style={{ color: "#1565C0" }}
                    >
                      INSCREVER <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

export function generateStaticParams() {
  return [
    { slug: "gestao-de-liquidez" },
    { slug: "comunicacao-e-oratoria" },
  ];
}
