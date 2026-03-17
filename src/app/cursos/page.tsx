import CTASection from "@/components/sections/CTASection";
import CourseCard from "@/components/ui/CourseCard";

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
          style={{ background: "linear-gradient(180deg, #007599 0%, #00C4FF 192.93%)", opacity: 0.4 }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-24 w-full">
          <p className="text-white font-['Proxima_Nova',sans-serif] font-normal text-[32px] leading-[100%] uppercase mb-3">
            GERAÇÃO B-BRIGHT
          </p>
          <h1
            className="text-white font-['Proxima_Nova',sans-serif] font-normal text-[36px] leading-[100%] uppercase"
          >
            COURSES
          </h1>
        </div>
      </section>

      {/* Course listings */}
      <section className="w-full bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">
          {courses.map((course, idx) => (
            <CourseCard
              key={course.slug}
              {...course}
              reverse={idx % 2 === 1}
            />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
