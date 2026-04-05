interface MilestoneCardProps {
  year: string;
  title: string;
  description: string;
}

export default function MilestoneCard({ year, title, description }: MilestoneCardProps) {
  return (
    <div className="flex flex-col items-center shrink-0 w-65.5">
      <div className="flex flex-col items-center mb-0">
        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-[#F0ECF5] text-primary-dark">
          {year}
        </span>
        <div className="w-px h-6 bg-gray-300" />
      </div>
      <div className="bg-[#F0ECF5] w-65.5 min-h-59 p-7.5 rounded-sm flex flex-col gap-5">
        <p className="font-proxima font-semibold text-base leading-[160%] text-navy uppercase">{title}</p>
        <p className="font-proxima font-normal text-base leading-[160%] text-navy">{description}</p>
      </div>
    </div>
  );
}
