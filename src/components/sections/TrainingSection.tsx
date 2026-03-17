import React from "react";
import { Languages, MessageCircle, Monitor, Star, Rocket } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";

const trainings = [
  {
    icon: <Languages size={22} />,
    title: "ENGLISH & FOREIGN LANGUAGES",
    description:
      "Strengthening multilingual communication skills for global participation and professional growth.",
    backgroundImage: "https://picsum.photos/seed/languages/400/320",
  },
  {
    icon: <MessageCircle size={22} />,
    title: "INTERPERSONAL COMMUNICATION",
    description:
      "Building confidence, public speaking, and effective dialogue for leadership and collaboration.",
    backgroundImage: "https://picsum.photos/seed/communication/400/320",
  },
  {
    icon: <Monitor size={22} />,
    title: "DIGITAL & ICT SKILLS",
    description:
      "Equipping youth with essential digital literacy and technology competencies for the modern economy.",
    backgroundImage: "https://picsum.photos/seed/digital/400/320",
  },
  {
    icon: <Star size={22} />,
    title: "SOFT SKILLS & LEADERSHIP",
    description:
      "Developing emotional intelligence, team dynamics, and leadership capacities for civic roles.",
    backgroundImage: "https://picsum.photos/seed/leadership/400/320",
  },
  {
    icon: <Rocket size={22} />,
    title: "ENTREPRENEURSHIP INNOVATION",
    description:
      "Inspiring entrepreneurial thinking and innovation to create economic opportunities locally.",
    backgroundImage: "https://picsum.photos/seed/innovation/400/320",
  },
];

export default function TrainingSection() {
  return (
    <section id="training" className="w-full py-24 px-6" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <SectionHeader
            title={["TRAINING & CAPACITY", "BUILDING"]}
            subtitle="Practical programs designed to equip Cape Verdean youth with the skills needed to lead and thrive in today's world."
            centered
          />
        </div>

        {/* Cards */}
        <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {trainings.map((t) => (
            <div key={t.title} className="flex-shrink-0">
              <Card
                icon={t.icon}
                title={t.title}
                description={t.description}
                variant="default"
                backgroundImage={t.backgroundImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
