import SectionHeader from "@/components/ui/SectionHeader";
import StatCard from "@/components/ui/StatCard";
import ResultCard from "@/components/ui/ResultCard";
import type { StatItem, ResultCard as ResultCardType } from "@/lib/strapi";

const FALLBACK_BG = "/images/8799984a562d2c1a6ddc4cce6078b87f79e7ece9.jpg";

interface ResultsSectionProps {
  stats: StatItem[];
  resultCards: ResultCardType[];
  backgroundImage?: string;
  title?: [string, string];
  subtitle?: string;
}

export default function ResultsSection({ stats, resultCards, backgroundImage, title, subtitle }: ResultsSectionProps) {
  return (
    <section
      id="impact"
      className="w-full py-24 px-6 relative"
      style={{
        backgroundImage: `url('${backgroundImage ?? FALLBACK_BG}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/80" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-14">
          <SectionHeader title={title ?? ["CONCRETE", "RESULTS"]} subtitle={subtitle ?? "Here are some of our most significant achievements to date:"} centered dark />
        </div>
        <div className="flex flex-row flex-wrap items-center justify-between gap-6 mb-12">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} labelHighlight={s.labelHighlight} dark />
          ))}
        </div>
        <hr className="border-gray-700 mb-1" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resultCards.map((r) => (
            <ResultCard key={r.title} title={r.title} description={r.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
