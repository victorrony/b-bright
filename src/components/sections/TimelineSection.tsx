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
            label=""
            title={["A Decade of", "Transformation"]}
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
                {/* Year badge pill + vertical line */}
                <div className="flex flex-col items-center mb-0">
                  <span
                    className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-[#F0ECF5]"
                    style={{ color: "#1565C0" }}
                  >
                    {m.year}
                  </span>
                  <div className="w-px h-6 bg-gray-300" />
                </div>
                <div 
                  className="bg-[#F0ECF5] w-[262px] h-[236px] p-[30px] rounded-[4px] flex flex-col gap-[20px]"
                >
                  <p className="font-['Proxima_Nova',sans-serif] font-semibold text-[16px] leading-[160%] text-[#003755] uppercase">
                    {m.title}
                  </p>
                  <p className="font-['Proxima_Nova',sans-serif] font-normal text-[16px] leading-[160%] text-[#003755]">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
