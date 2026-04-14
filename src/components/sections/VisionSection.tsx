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
    <section id="vision" className="w-full max-w-272.5 mx-auto bg-white lg:mt-24">
      <div className=" py-16">
        <div className="mb-14">
          <SplitTitle title={title} subtitle={subtitle} direction="row" centered />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 w-full">
          {initiatives.map((item) => (
            <InitiativeCard key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
