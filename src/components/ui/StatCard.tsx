import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  labelHighlight?: string;
  dark?: boolean;
  className?: string;
}

export default function StatCard({ value, label, labelHighlight, dark = false, className }: StatCardProps) {
  return (
    <div className={cn("text-start", className)}>
      <h3
        className={cn(
          "font-['Proxima_Nova',sans-serif] font-bold text-[48px] leading-[130%] mb-2",
          dark ? "text-white" : "text-gray-800"
        )}
      >
        {value}
      </h3>
      <p
        className={cn(
          "font-['Proxima_Nova',sans-serif] font-normal text-[20.45px] leading-[130%]",
          dark ? "text-gray-400" : "text-gray-500"
        )}
      >
        {label}{labelHighlight && <> <span className="text-[#0769B9] font-bold">{labelHighlight}</span></>}
      </p>
    </div>
  );
}
