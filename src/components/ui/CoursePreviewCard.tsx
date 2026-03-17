import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CoursePreviewCardProps {
  slug: string;
  image: string;
  title: string;
  details: { label: string; value: string }[];
}

export default function CoursePreviewCard({ slug, image, title, details }: CoursePreviewCardProps) {
  return (
    <div className="flex flex-row rounded-xl overflow-hidden border border-gray-100 shadow-sm">
      <img
        src={image}
        alt={title}
        className="flex-shrink-0 object-cover"
        style={{ width: "180px", height: "100%" }}
      />
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3
            className="font-['Proxima_Nova',sans-serif] font-[250] text-[32px] leading-[100%] uppercase mb-3"
            style={{ color: "#0769B9" }}
          >
            {title}
          </h3>
          <div className="flex flex-col gap-1 mb-4">
            {details.map((d) => (
              <p key={d.label} className="text-gray-500 text-xs">
                <span className="font-semibold">{d.label}:</span> {d.value}
              </p>
            ))}
          </div>
        </div>
        <Link
          href={`/cursos/${slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold tracking-wider"
          style={{ color: "#0769B9" }}
        >
          INSCREVER <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
