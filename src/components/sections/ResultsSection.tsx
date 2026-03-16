import SectionHeader from "@/components/ui/SectionHeader";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";

const stats = [
  { value: "10+", label: "Years of Impact" },
  { value: "500+", label: "Young Leaders Trained" },
  { value: "5+", label: "International Missions" },
  { value: "15+", label: "Strategic Partners" },
];

const results = [
  {
    title: "Web Summit 2025",
    description:
      "The only Cape Verdean youth association present at Europe's largest tech event in Lisbon.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    title: "ECOWAS Missions",
    description:
      "Electoral observation pilot project monitoring 25 young leaders strengthening democracy in West Africa.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    title: "Media Coverage",
    description:
      "Featured by DW & RTC media outlets, amplifying the voice of Cape Verdean youth on the international stage.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
  },
];

export default function ResultsSection() {
  return (
    <section id="impact" className="w-full py-24 px-6" style={{ backgroundColor: "#0D1B2A" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <SectionHeader
            title={["CONCRETE", "RESULTS"]}
            centered
            dark
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} dark />
          ))}
        </div>

        {/* Result cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((r) => (
            <Card key={r.title} variant="dark" className="p-0 overflow-hidden">
              <img
                src={r.image}
                alt={r.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-6">
                <h3 className="text-white font-bold text-base mb-3">{r.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{r.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
