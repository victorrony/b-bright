import SectionHeader from "@/components/ui/SectionHeader";

const initiatives = [
  {
    title: "YOUTH PARLIAMENT",
    description:
      "Pilot project inspired by ECOWAS to simulate legislative processes and strengthen civic awareness.",
  },
  {
    title: "DIGITAL INNOVATION",
    description:
      "Expansion with Academia Sinary to intensify digital literacy and technology adoption among youth.",
  },
  {
    title: "ELECTORAL MONITORING",
    description:
      "Strengthening youth participation in electoral observation and democratic consolidation.",
  },
  {
    title: "TALENT RETENTION",
    description:
      "Programs to reduce brain drain and create local opportunity ecosystems for young professionals.",
  },
  {
    title: "REGIONAL CHAPTERS",
    description:
      "Establishing B-Bright chapters across all islands and in the diaspora.",
  },
  {
    title: "YOUTH DIPLOMACY",
    description:
      "Consolidating presence as the official voice of Cape Verdean youth worldwide.",
  },
];

export default function VisionSection() {
  return (
    <section id="vision" className="w-full bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <SectionHeader
            title={["THE FUTURE IS", "BRIGHT"]}
            subtitle="A strategic growth roadmap to amplify youth impact on Cape Verde's development."
            centered
          />
        </div>

        {/* Grid of initiative cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {initiatives.map((item, i) => (
            <div
              key={item.title}
              className="p-8 border-b border-gray-100"
              style={{
                borderRight:
                  (i + 1) % 3 !== 0 ? "1px solid #f0f0f0" : undefined,
              }}
            >
              <div
                className="text-xs font-bold tracking-[0.15em] mb-1 uppercase"
                style={{ color: "#1565C0" }}
              >
                0{i + 1}
              </div>
              <h3 className="font-bold text-gray-800 text-base mb-3 tracking-wide">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
