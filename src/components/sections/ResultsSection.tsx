import SectionHeader from "@/components/ui/SectionHeader";
import StatCard from "@/components/ui/StatCard";
import ResultCard from "@/components/ui/ResultCard";

const stats = [
  { value: "10+", label: "Years of", labelHighlight: "Impact" },
  { value: "500+", label: "Young Leaders", labelHighlight: "Trained" },
  { value: "5+", label: "International", labelHighlight: "Missions" },
  { value: "15+", label: "Strategic", labelHighlight: "Partners" },
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
    <section
      id="impact"
      className="w-full py-24 px-6 relative"
      style={{
        backgroundImage: "url('/images/8799984a562d2c1a6ddc4cce6078b87f79e7ece9.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-14">
          <SectionHeader
            title={["CONCRETE", "RESULTS"]}
            subtitle="Here are some of our most significant achievements to date:"
            centered
            dark
          />
        </div>

        {/* Stats */}
        <div className=" flex flex-row flex-wrap items-center justify-between gap-6 mb-12">
          {stats.map((s) => (
            <StatCard className="" key={s.label} value={s.value} label={s.label} labelHighlight={s.labelHighlight} dark />
          ))}
        </div>

        <hr className="border-gray-700 mb-1" />

        {/* Result cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((r) => (
            <ResultCard key={r.title} title={r.title} description={r.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
