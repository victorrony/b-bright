"use client";
import React from "react";
import { Languages, MessageCircle, Monitor, Star, Rocket, LucideIcon } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import type { TrainingModule } from "@/lib/strapi";

const ICON_MAP: Record<string, LucideIcon> = { Languages, MessageCircle, Monitor, Star, Rocket };

interface TrainingSectionProps {
  title: string;
  subtitle: string;
  modules: TrainingModule[];
}

export default function TrainingSection({ title, subtitle, modules }: TrainingSectionProps) {
  const titleParts = title.split('&').map((p) => p.trim());
  const titleArr: [string, string] = titleParts.length > 1
    ? [titleParts[0], '& ' + titleParts[1]]
    : [title, ''];

  return (
    <section id="training" className="w-full py-24 px-6" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <SectionHeader title={titleArr} subtitle={subtitle} centered />
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {modules.map((t) => {
            const Icon = ICON_MAP[t.icon] ?? Star;
            return (
              <div key={t.title} className="flex-shrink-0">
                <Card icon={<Icon size={22} />} title={t.title} description={t.description} variant="default" backgroundImage={t.backgroundImage} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
