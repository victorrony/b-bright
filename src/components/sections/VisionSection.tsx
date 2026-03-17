import SectionHeader from "@/components/ui/SectionHeader";
import InitiativeCard from "@/components/ui/InitiativeCard";

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
        <div className="flex flex-row flex-wrap items-center justify-center gap-4 ">
          {initiatives.map((item) => (
            <InitiativeCard
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
