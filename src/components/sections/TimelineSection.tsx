import SectionHeader from "@/components/ui/SectionHeader";

const milestones = [
  {
    year: "2015",
    title: "FOUNDATION",
    description:
      "Created by 5 visionary young people who identified gaps in expression, languages, and digital skills in Cape Verde.",
  },
  {
    year: "2016–18",
    title: "GROWTH & CONSOLIDATION",
    description:
      "First practical training sessions and civic actions. Structuring the volunteer network and growing the member base.",
  },
  {
    year: "2020–23",
    title: "EXPANSION",
    description:
      "Expanding activities and strategic partnerships with AIESEC and companies. Focus on soft skills and fighting youth unemployment.",
  },
  {
    year: "2024–25",
    title: "INTERNATIONALIZATION",
    description:
      "New leadership under Raphael Ferreira. Presence at Web Summit, DW & RTC media coverage, and ECOWAS electoral missions in West Africa.",
  },
];

export default function TimelineSection() {
  return (
    <section id="journey" className="w-full bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <SectionHeader
            label="A DECADE OF"
            title={["", "TRANSFORMATION"]}
            subtitle={`"B-Bright" comes from "Be Bright" — the potential of every Cape Verdean youth to illuminate Africa's future.`}
            centered
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal connecting line */}
          <div
            className="hidden lg:block absolute h-px bg-gray-200 z-0"
            style={{ top: "20px", left: "12.5%", right: "12.5%" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {milestones.map((m) => (
              <div key={m.year} className="flex flex-col items-start lg:items-center">
                {/* Year badge pill */}
                <div className="mb-5">
                  <span
                    className="inline-block px-4 py-1 rounded-full border-2 text-sm font-bold bg-white"
                    style={{ borderColor: "#1565C0", color: "#1565C0" }}
                  >
                    {m.year}
                  </span>
                </div>
                <div className="lg:text-center">
                  <p className="text-xs font-bold tracking-wider text-gray-700 mb-3 uppercase">
                    {m.title}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
