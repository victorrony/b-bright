import { Languages, MessageCircle, Monitor, Star, Rocket } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";

const trainings = [
  {
    icon: <Languages size={22} />,
    title: "ENGLISH & FOREIGN LANGUAGES",
    description:
      "Strengthening multilingual communication skills for global participation and professional growth.",
  },
  {
    icon: <MessageCircle size={22} />,
    title: "INTERPERSONAL COMMUNICATION",
    description:
      "Building confidence, public speaking, and effective dialogue for leadership and collaboration.",
  },
  {
    icon: <Monitor size={22} />,
    title: "DIGITAL & ICT SKILLS",
    description:
      "Equipping youth with essential digital literacy and technology competencies for the modern economy.",
  },
  {
    icon: <Star size={22} />,
    title: "SOFT SKILLS & LEADERSHIP",
    description:
      "Developing emotional intelligence, team dynamics, and leadership capacities for civic roles.",
  },
  {
    icon: <Rocket size={22} />,
    title: "ENTREPRENEURSHIP INNOVATION",
    description:
      "Inspiring entrepreneurial thinking and innovation to create economic opportunities locally.",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {trainings.map((t) => (
            <Card
              key={t.title}
              icon={t.icon}
              title={t.title}
              description={t.description}
              variant="default"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
