"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SplitTitle from "@/components/ui/SplitTitle";
import MilestoneCard from "@/components/ui/MilestoneCard";
import type { Milestone } from "@/lib/strapi";

interface TimelineSectionProps {
  readonly title: string;
  readonly subtitle: string;
  readonly milestones: Milestone[];
}

export default function TimelineSection({ title, subtitle, milestones }: Readonly<TimelineSectionProps>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const total = milestones.length;
  const [activeIndex, setActiveIndex] = useState(total - 1);

  

  // Scroll to last item on mount
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const last = track.children[total - 1] as HTMLElement;
    if (last) track.scrollLeft = last.offsetLeft - track.offsetLeft;
  }, [total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth ?? 0;
      const index = Math.round(track.scrollLeft / (cardWidth + 16));
      setActiveIndex(Math.max(0, Math.min(index, total - 1)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [total]);

  return (
    <section id="journey" className="w-full bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <SplitTitle title={title} subtitle={subtitle} direction="row" centered />
        </div>

        {/* Timeline line + cards */}
        <div className="relative">
          <div className="hidden lg:block absolute h-px bg-gray-200 z-0" style={{ top: "20px", left: "0%", right: "0%" }} />

          {/* Carousel track */}
          <div
            ref={trackRef}
            className="flex flex-row gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-4 relative z-10 px-6"
          >
            {milestones.map((m) => (
              <MilestoneCard key={m.year} year={m.year} title={m.title} description={m.description} />
            ))}
          </div>
        </div>

        {/* Controls */}
        {/* <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {milestones.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`rounded-full transition-all ${
                  i === activeIndex
                    ? "w-6 h-2 bg-(--color-primary)"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === total - 1}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div> */}
      </div>
    </section>
  );
}
