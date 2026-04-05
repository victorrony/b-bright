"use client";
import React from "react";
import { Languages, MessageCircle, Monitor, Star, Rocket, LucideIcon } from "lucide-react";
import Card from "@/components/ui/Card";
import SplitTitle from "@/components/ui/SplitTitle";
import { getCourseImageUrl, type TrainingModule } from "@/lib/strapi";

const ICON_MAP: Record<string, LucideIcon> = { Languages, MessageCircle, Monitor, Star, Rocket };

interface TrainingSectionProps {
  title: string;
  subtitle: string;
  modules: TrainingModule[];
}

export default function TrainingSection({ title, subtitle, modules }: TrainingSectionProps) {
  return (
    <section id="training" className="w-full my-28">
      <div className="">
        <div className="mb-14">
          <SplitTitle title={title} subtitle={subtitle} direction="row" className="col m-auto" centered />
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 ml-40 no-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {modules.map((t) => {
            const Icon = ICON_MAP[t.icon] ?? Star;
            return (
              <div key={t.title} className="flex-shrink-0">
                <Card icon={<Icon size={22} />} title={t.title} description={t.description} variant="default" backgroundImage={t.backgroundImage ? getCourseImageUrl(t.backgroundImage) : undefined} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
