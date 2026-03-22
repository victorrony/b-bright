import SectionHeader from "@/components/ui/SectionHeader";
import InitiativeCard from "@/components/ui/InitiativeCard";
import type { Initiative } from "@/lib/strapi";

interface VisionSectionProps {
  title: string;
  subtitle: string;
  initiatives: Initiative[];
}

export default function VisionSection({ title, subtitle, initiatives }: VisionSectionProps) {
  const titleParts = title.split(' ');
  const mid = Math.ceil(titleParts.length / 2);
  const titleArr: [string, string] = [titleParts.slice(0, mid).join(' '), titleParts.slice(mid).join(' ')];

  return (
    <section id="vision" className="w-full bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <SectionHeader title={titleArr} subtitle={subtitle} centered />
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-4">
          {initiatives.map((item) => (
            <InitiativeCard key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
