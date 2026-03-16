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
  const titleBaseColor = dark ? "text-white" : "text-gray-800";
  const subtitleColor = dark ? "text-gray-400" : "text-gray-500";
  const alignClass = centered ? "text-center" : "text-left";

  const renderTitle = () => {
    if (Array.isArray(title)) {
      const [normalPart, boldBluePart] = title;
      return (
        <h2 className={cn("text-4xl md:text-5xl font-bold leading-tight", titleBaseColor)}>
          {normalPart}{" "}
          <span style={{ color: "#1565C0" }}>{boldBluePart}</span>
        </h2>
      );
    }
    return (
      <h2 className={cn("text-4xl md:text-5xl font-bold leading-tight", titleBaseColor)}>
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
        <p className={cn("mt-4 text-base leading-relaxed max-w-2xl", subtitleColor, centered && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
