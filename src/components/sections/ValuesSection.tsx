import { Heart, Globe, Users, Lightbulb } from "lucide-react";
import Card from "@/components/ui/Card";

const values = [
  {
    icon: <Heart size={22} />,
    title: "100% VOLUNTEERING",
    description:
      "Altruistic commitment to the common good, non-profit, driven by the passion to serve.",
  },
  {
    icon: <Globe size={22} />,
    title: "IDENTITY & CONNECTION",
    description:
      "Pride in Cape Verdean identity connected to global trends — cool & smart.",
  },
  {
    icon: <Users size={22} />,
    title: "CIVIC PARTICIPATION",
    description:
      "Active involvement in democratic processes and building a more just society.",
  },
  {
    icon: <Lightbulb size={22} />,
    title: "OPPORTUNITY CREATION",
    description:
      "Focused on creating opportunities and overcoming the logistical challenges facing youth.",
  },
];

export default function ValuesSection() {
  return (
    <section className="w-full py-20 px-6" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <Card
              key={v.title}
              icon={v.icon}
              title={v.title}
              description={v.description}
              variant="default"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
