interface ResultCardProps {
  title: string;
  description: string;
}

export default function ResultCard({ title, description }: ResultCardProps) {
  return (
    <div className="p-6">
      <h3 className="text-white font-proxima font-bold text-[16px] leading-[130%] tracking-[0.01em] capitalize mb-3">
        {title}
      </h3>
      <p className="text-white font-proxima font-normal text-[14px] leading-[160%] tracking-[0%]">
        {description}
      </p>
    </div>
  );
}
