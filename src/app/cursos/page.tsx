import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";

const courses = [
  {
    slug: "gestao-de-liquidez",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80",
    title: "WORKSHOP: GESTÃO DE LIQUIDEZ E TESOURARIA",
    organizer: "Geração B-Bright",
    trainer: "José Carlos Teixeira",
    credentials: [
      "Doutorado em Economia pela Universidade de Évora",
      "Professor Adjunto Convidado na área de Finanças – ISCAL / Instituto Politécnico de Lisboa",
    ],
    description:
      "Este workshop é uma iniciativa da Geração B-Bright que visa capacitar jovens e profissionais em técnicas de gestão de liquidez e tesouraria, fundamentais para a sustentabilidade financeira de negócios e projetos.",
    extraText: undefined as string | undefined,
    details: [
      { label: "Local", value: "Palácio do Governo (sala de conferências)" },
      { label: "Data", value: "4 de agosto de 2025" },
      { label: "Horário", value: "Das 10h às 12h" },
    ],
  },
  {
    slug: "comunicacao-e-oratoria",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
    title: "COMUNICAÇÃO E ORATÓRIA COM EVELISE CARVALHO",
    organizer: "Geração B-Bright",
    trainer: "Evelise Carvalho",
    credentials: [] as string[],
    description:
      "A Geração B-Bright promove a formação de Comunicação e Oratória, com o objetivo de fortalecer as competências de comunicação, expressão pública e liderança entre jovens.",
    extraText:
      "Durante 2 semanas intensivas, os participantes irão desenvolver técnicas práticas de oratória, gestão de nervosismo e comunicação persuasiva aplicadas a contextos profissionais e cívicos.",
    details: [
      { label: "Duração", value: "2 semanas" },
      { label: "Horário", value: "16h00 – 18h00" },
      { label: "Formadora", value: "Evelise Carvalho" },
    ],
  },
];

export default function CursosPage() {
  return (
    <>
      {/* Hero — ~400px height with blue/teal overlay */}
      <section
        className="relative w-full overflow-hidden flex items-end"
        style={{ minHeight: "400px" }}
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1440&q=80"
          alt="Courses hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(13,71,161,0.88) 0%, rgba(0,77,100,0.75) 100%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-24 w-full">
          <p className="text-blue-200 text-xs font-bold tracking-[0.25em] uppercase mb-3">
            GERAÇÃO B-BRIGHT
          </p>
          <h1
            className="text-white font-bold leading-none"
            style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
          >
            COURSES
          </h1>
        </div>
      </section>

      {/* Course listings */}
      <section className="w-full bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">
          {courses.map((course, idx) => (
            <div
              key={course.slug}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Image — alternates side on desktop */}
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full object-cover rounded-xl shadow-md"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>

              {/* Content */}
              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <h2
                  className="text-xl font-bold mb-4 leading-snug"
                  style={{ color: "#1565C0" }}
                >
                  {course.title}
                </h2>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-semibold">Organizado por:</span> {course.organizer}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <span className="font-semibold">Formador:</span> {course.trainer}
                </p>
                {course.credentials.length > 0 && (
                  <ul className="mb-4 flex flex-col gap-1">
                    {course.credentials.map((c) => (
                      <li key={c} className="text-gray-500 text-sm flex items-start gap-2">
                        <span className="mt-1">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-gray-600 text-sm italic leading-relaxed mb-4">
                  {course.description}
                </p>
                {course.extraText && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {course.extraText}
                  </p>
                )}
                <div className="flex flex-col gap-1 mb-6">
                  {course.details.map((d) => (
                    <p key={d.label} className="text-gray-600 text-sm">
                      <span className="font-semibold">{d.label}:</span> {d.value}
                    </p>
                  ))}
                </div>
                <Button variant="primary" href={`/cursos/${course.slug}`} arrow>
                  INSCREVER
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
