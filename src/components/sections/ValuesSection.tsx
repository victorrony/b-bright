"use client";
import React from "react";
import { Heart, Globe, Users, Lightbulb, LucideIcon } from "lucide-react";
import Card from "@/components/ui/Card";
import type { ValueItem } from "@/lib/strapi";

const ICON_MAP: Record<string, LucideIcon> = { Heart, Globe, Users, Lightbulb };

interface ValuesSectionProps {
  values: ValueItem[];
}

export default function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section className="w-full h-110 flex items-center " style={{ backgroundColor: "#F5F5F5" }}>
      <div className="ml-40 mx-auto w-full">
        <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {values.map((v) => {
            const Icon = ICON_MAP[v.icon] ?? Heart;
            return (
              <div key={v.title} className="flex-shrink-0">
                <Card icon={<Icon size={22} />} title={v.title} description={v.description} variant="default" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
