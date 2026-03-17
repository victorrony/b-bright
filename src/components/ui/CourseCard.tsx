import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CourseDetail {
  label: string;
  value: string;
}

interface CourseCardProps {
  slug: string;
  image: string;
  title: string;
  organizer: string;
  trainer: string;
  credentials: string[];
  description: string;
  extraText?: string;
  details: CourseDetail[];
  reverse?: boolean;
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
}: CourseCardProps) {
  return (
    <div className="flex flex-row lg:w-[1080px] gap-6 m-auto items-center">
      {/* Image */}
      <div className={cn(reverse ? "lg:order-2" : "", "flex justify-center w-full")}>
        <img
          src={image}
          alt={title}
          className="w-[407px] h-[487px] object-cover rounded-[4px] shadow-lg"
        />
      </div>

      {/* Content */}
      <div className={reverse ? "lg:order-1 " : ""}>
        <h2
          className="font-['Proxima_Nova',sans-serif] font-[250] text-[44px] leading-[100%] text-[#0769B9] uppercase mb-4"
        >
          {title}
        </h2>
        <p className="font-['Proxima_Nova',sans-serif] font-normal text-[18px] leading-[160%] text-[#003755] mb-1">
          <span className="font-semibold">Organizado por:</span> {organizer}
        </p>
        <p className="font-['Proxima_Nova',sans-serif] font-normal text-[18px] leading-[160%] text-[#003755] mb-3">
          <span className="font-semibold">Formador:</span> {trainer}
        </p>
        {credentials.length > 0 && (
          <ul className="mb-4 flex flex-col gap-1">
            {credentials.map((c) => (
              <li key={c} className="text-gray-500 text-sm flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="font-['Proxima_Nova',sans-serif] font-[250] italic text-[18px] leading-[160%] text-[#003755] mb-4">
          {description}
        </p>
        {extraText && (
          <p className="font-['Proxima_Nova',sans-serif] font-normal text-[18px] leading-[160%] text-[#003755] mb-4">{extraText}</p>
        )}
        <div className="flex flex-col gap-1 mb-6">
          {details.map((d) => (
            <p key={d.label} className="font-['Proxima_Nova',sans-serif] font-normal text-[18px] leading-[160%] text-[#003755]">
              <span className="font-semibold">{d.label}:</span> {d.value}
            </p>
          ))}
        </div>
        <Button variant="primary" href={`/cursos/${slug}`} arrow>
          INSCREVER
        </Button>
      </div>
    </div>
  );
}
