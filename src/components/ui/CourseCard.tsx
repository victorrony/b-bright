import Image from "next/image";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CourseDetail {
  label: string;
  value: string;
}

interface CourseCredential {
  label: string;
}

interface CourseCardProps {
  slug: string;
  image: string;
  title: string;
  organizer: string;
  trainer: string;
  credentials: CourseCredential[];
  description: string;
  extraText?: string;
  details: CourseDetail[];
  reverse?: boolean;
  labelOrganizer?: string;
  labelTrainer?: string;
  labelEnroll?: string;
}

export default function CourseCard({
  slug,
  image,
  title,
  organizer,
  trainer,
  credentials,
  description,
  extraText,
  details,
  reverse = false,
  labelOrganizer = 'Organizado por',
  labelTrainer = 'Formador',
  labelEnroll = 'INSCREVER',
}: CourseCardProps) {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[1080px] gap-14 mx-auto items-center">
      {/* Image */}
      {image && (
        <div className={cn(reverse ? "lg:order-2" : "", "flex justify-center w-full lg:w-auto shrink-0")}>
          <Image
            src={image}
            alt={title}
            className="object-cover rounded-sm w-full lg:w-101.75 h-150"
            width={407}
            height={600}
            sizes="(max-width: 1024px) 100vw, 407px"
          />
        </div>
      )}

      {/* Content */}
      <div className={cn(reverse ? "lg:order-1" : "", "flex-1 w-full")}>
        <h2 className="font-proxima font-[250] text-[32px] lg:text-[48px] leading-[100%] text-primary uppercase mb-4">
          {title}
        </h2>
        <p className="font-proxima font-normal text-base lg:text-[18px] leading-[160%] text-navy mb-1">
          <span className="font-semibold">{labelOrganizer}:</span> {organizer}
        </p>
        <p className="font-proxima font-normal text-base lg:text-[18px] leading-[160%] text-navy mb-3">
          <span className="font-semibold">{labelTrainer}:</span> {trainer}
        </p>
        {credentials.length > 0 && (
          <ul className="mb-4 flex flex-col gap-1">
            {credentials.map((c) => (
              <li key={c.label} className="text-gray-500 text-sm flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>{c.label}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="font-proxima font-[250] italic text-base lg:text-[18px] leading-[160%] text-navy mb-4">
          {description}
        </p>
        {extraText && (
          <p className="font-proxima font-normal text-base lg:text-[18px] leading-[160%] text-navy mb-4">{extraText}</p>
        )}
        <div className="flex flex-col gap-1 mb-6">
          {details.map((d) => (
            <p key={d.label} className="font-proxima font-normal text-base lg:text-[18px] leading-[160%] text-navy">
              <span className="font-semibold">{d.label}:</span> {d.value}
            </p>
          ))}
        </div>
        <Button variant="primary" href={`/cursos/${slug}`} arrow>
          {labelEnroll}
        </Button>
      </div>
    </div>
  );
}
