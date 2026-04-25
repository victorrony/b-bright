import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CourseStatus = "aberto" | "encerrado" | "em_breve";

const STATUS_LABELS: Record<CourseStatus, { label: string; className: string }> = {
  aberto: { label: 'Inscrições abertas', className: 'bg-green-100 text-green-700 border-green-200' },
  em_breve: { label: 'Em breve', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  encerrado: { label: 'Encerrado', className: 'bg-red-100 text-red-600 border-red-200' },
};

interface CoursePreviewCardProps {
  slug: string;
  image: string;
  title: string;
  details: { label: string; value: string }[];
  status?: CourseStatus;
  labelEnroll?: string;
}

export default function CoursePreviewCard({ slug, image, title, details, status, labelEnroll = "INSCREVER" }: Readonly<CoursePreviewCardProps>) {
  const st = status ? STATUS_LABELS[status] : null;
  return (
    <div className="flex flex-row overflow-hidden w-full h-full max-w-124">
      <Image
        src={image}
        alt={title}
        className="shrink-0 rounded-md object-cover h-72 w-48"
        width={180}
        height={240}
      />
      <div className="px-4 flex flex-col justify-between ">
        <div>
          {st && (
            <span className={`inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold tracking-wider border ${st.className}`}>
              {st.label}
            </span>
          )}
         
          <h3
            className="font-proxima font-[250] md:text-[20px] lg:text-[32px] leading-[100%] uppercase mb-3 text-primary"
          >
            {title}
          </h3>
          <div className="flex flex-col gap-1 mb-4">
            {details.map((d) => (
              <p key={d.label} className="text-gray-500 text-base font-proxima font-normal leading-[160%] flex items-start gap-2">
                <span className="font-semibold">{d.label}:</span> {d.value}
              </p>
            ))}
          </div>
        </div>
        <Link
          href={`/cursos/${slug}`}
          className="inline-flex items-center gap-1 text-sm lg:text-base font-bold tracking-wider text-primary"
        >
          {labelEnroll} <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
