import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  dark?: boolean;
  className?: string;
}

export default function StatCard({ value, label, dark = false, className }: StatCardProps) {
  return (
    <div className={cn("text-center", className)}>
      <p
        className={cn(
          "text-4xl md:text-5xl font-bold mb-2",
          dark ? "text-white" : "text-gray-800"
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "text-sm tracking-wide uppercase",
          dark ? "text-gray-400" : "text-gray-500"
        )}
      >
        {label}
      </p>
    </div>
  );
}
