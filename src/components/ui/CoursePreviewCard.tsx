import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CoursePreviewCardProps {
  slug: string;
  image: string;
  title: string;
  details: { label: string; value: string }[];
  labelEnroll?: string;
}

export default function CoursePreviewCard({ slug, image, title, details, labelEnroll = "INSCREVER" }: Readonly<CoursePreviewCardProps>) {
  return (
    <div className="flex flex-row rounded-xl overflow-hidden border border-gray-100 shadow-sm">
      <Image
        src={image}
        alt={title}
        className="shrink-0 object-cover"
        width={180}
        height={240}
      />
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3
            className="font-proxima font-[250] text-[32px] leading-[100%] uppercase mb-3 text-primary"
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
          className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-primary"
        >
          {labelEnroll} <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
