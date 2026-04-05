import SplitTitle from "@/components/ui/SplitTitle";
import InitiativeCard from "@/components/ui/InitiativeCard";
import type { Initiative } from "@/lib/strapi";

interface VisionSectionProps {
  title: string;
  subtitle: string;
  initiatives: Initiative[];
}

export default function VisionSection({ title, subtitle, initiatives }: Readonly<VisionSectionProps>) {
  return (
    <section id="vision" className="w-full bg-white mt-24 px-">
      <div className="max-w-272.5 mx-auto py-16">
        <div className="mb-14">
          <SplitTitle title={title} subtitle={subtitle} direction="row" centered />
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-3">
          {initiatives.map((item) => (
            <InitiativeCard key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
