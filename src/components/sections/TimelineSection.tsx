import SectionHeader from "@/components/ui/SectionHeader";
import type { Milestone } from "@/lib/strapi";

interface TimelineSectionProps {
  title: string;
  subtitle: string;
  milestones: Milestone[];
}

export default function TimelineSection({ title, subtitle, milestones }: TimelineSectionProps) {
  const titleParts = title.split(' ');
  const mid = Math.ceil(titleParts.length / 2);
  const titleArr: [string, string] = [titleParts.slice(0, mid).join(' '), titleParts.slice(mid).join(' ')];

  return (
    <section id="journey" className="w-full bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <SectionHeader label="" title={titleArr} subtitle={subtitle} centered />
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute h-px bg-gray-200 z-0" style={{ top: "20px", left: "12.5%", right: "12.5%" }} />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {milestones.map((m) => (
              <div key={m.year} className="flex flex-col items-start lg:items-center">
                <div className="flex flex-col items-center mb-0">
                  <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-[#F0ECF5] text-primary-dark">
                    {m.year}
                  </span>
                  <div className="w-px h-6 bg-gray-300" />
                </div>
                <div className="bg-[#F0ECF5] w-[262px] h-[236px] p-[30px] rounded-[4px] flex flex-col gap-[20px]">
                  <p className="font-proxima font-semibold text-[16px] leading-[160%] text-navy uppercase">{m.title}</p>
                  <p className="font-proxima font-normal text-[16px] leading-[160%] text-navy">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
