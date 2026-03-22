import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string | [string, string];
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
  dark = false,
  className,
}: SectionHeaderProps) {
  const labelColor = dark ? "text-blue-300" : "text-gray-500";
  const titleBaseColor = dark ? "text-white" : "text-[#0769B9]";
  const alignClass = centered ? "text-center" : "text-left";

  const renderTitle = () => {
    if (Array.isArray(title)) {
      const [normalPart, boldBluePart] = title;
      return (
        <div className="flex items-center justify-center gap-3 flex-wrap uppercase font-proxima text-[48px] leading-[100%] tracking-[0%]">
          <p className={cn(titleBaseColor, "")}>
            {normalPart}
          </p>
          <p className="text-[#0769B9] font-bold">
            {boldBluePart}
          </p>
        </div>
      );
    }
    return (
      <h2 className={cn("uppercase font-proxima text-[48px] leading-[100%] tracking-[0%] font-bold", titleBaseColor)}>
        {title}
      </h2>
    );
  };

  return (
    <div className={cn(alignClass, className)}>
      {label && (
        <p
          className={cn(
            "text-xs font-semibold tracking-[0.25em] uppercase mb-2",
            labelColor
          )}
        >
          {label}
        </p>
      )}
      {renderTitle()}
      {subtitle && (
        <p
          className={cn(
            "mt-4 font-proxima font-normal text-[18px] leading-[160%] tracking-[0%] max-w-2.5xl",
            dark ? "text-gray-400" : "text-[#003755]",
            centered && "mx-auto text-center"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
