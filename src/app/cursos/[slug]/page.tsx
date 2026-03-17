import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import RegistrationForm from "@/components/ui/RegistrationForm";
import CoursePreviewCard from "@/components/ui/CoursePreviewCard";

const coursesData: Record<
  string,
  {
    title: string;
    organizer: string;
    trainer: string;
    credentials: string[];
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
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    details: [
      { label: "Local", value: "Praia, Cabo Verde" },
      { label: "Duração", value: "2 semanas" },
      { label: "Horário", value: "16h00 – 18h00" },
    ],
  },
};

const otherCourses = [
  {
    slug: "gestao-de-liquidez",
    title: "WORKSHOP: GESTÃO DE LIQUIDEZ E TESOURARIA",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
    details: [
      { label: "Local", value: "Palácio do Governo (sala de conferências)" },
      { label: "Data", value: "4 de agosto de 2025" },
      { label: "Horário", value: "Das 10h às 12h" },
    ],
  },
  {
    slug: "comunicacao-e-oratoria",
    title: "COMUNICAÇÃO E ORATÓRIA COM EVELISE CARVALHO",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80",
    details: [
      { label: "Local", value: "Praia, Cabo Verde" },
      { label: "Duração", value: "2 semanas" },
      { label: "Horário", value: "16h00 – 18h00" },
    ],
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
        className="w-full "
        style={{ height: "816px" }}
      >
        {/* Left: background image with blue/teal overlay + white text */}
        <div className="relative flex flex-col justify-end p-10" style={{ minHeight: "400px" }}>
          <img
            src={course.image}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Blue/teal gradient overlay at 40% opacity */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #007599 0%, #00C4FF 100%)",
              opacity: 0.4,
            }}
          />
          {/* Dark bottom fade for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.10) 60%, transparent 100%)",
            }}
          />
          <div className="flex flex-row flex-wrap justify-center items-center gap-10">
          <div className="relative z-10 max-w-xl">
            <h1 className="text-white font-['Proxima_Nova',sans-serif] font-[250] text-[36px] leading-[150%] uppercase mb-4">
              {course.title}
            </h1>
            <p className="text-white font-['Proxima_Nova',sans-serif] font-normal text-[18px] leading-[160%] mb-2">
              <span className="font-semibold">Organizado por:</span> {course.organizer}
            </p>
            <p className="text-white font-['Proxima_Nova',sans-serif] font-normal text-[18px] leading-[160%] mb-4">
              <span className="font-semibold">Formador:</span> {course.trainer}
            </p>
            {course.credentials.map((c) => (
              <p key={c} className="text-white/90 font-['Proxima_Nova',sans-serif] font-normal text-[16px] leading-[160%] mb-1 flex items-start gap-2">
                <span>•</span>
                <span>{c}</span>
              </p>
            ))}
          </div>

          {/* Right: registration form */}
          <div className="relative w-[526px]">
            <RegistrationForm />
          </div>


          </div>
          
        </div>        
      </section>

      {/* Other courses section */}
      <section className="w-full bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Proxima_Nova'] font-[250] text-[48px] leading-[100%] text-[#0769B9] uppercase text-center mb-6">
              ENCONTRE OUTROS{" "}
              <span className="font-bold">CURSOS</span>
              <br />
              <span className="font-bold">DISPONÍVEIS</span>
            </h2>
            <p className="mt-4 text-gray-500 text-sm max-w-xl mx-auto">
              &ldquo;B-Bright&rdquo; comes from &ldquo;Be Bright&rdquo; — the potential of every Cape Verdean youth to illuminate Africa&apos;s future.
            </p>
          </div>

          {/* 2 horizontal course cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherCourses
              .filter((c) => c.slug !== slug)
              .concat(otherCourses.filter((c) => c.slug === slug))
              .slice(0, 2)
              .map((c) => (
                <CoursePreviewCard
                  key={c.slug}
                  slug={c.slug}
                  image={c.image}
                  title={c.title}
                  details={c.details}
                />
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
