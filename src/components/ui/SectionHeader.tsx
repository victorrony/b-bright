import { cn, splitTitle } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  titleThin: string | [string, string];
  titleBold?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
}

export default function SectionHeader({
  label,
  titleThin,
  titleBold,
  centered = false,
  dark = false,
  className,
}: Readonly<SectionHeaderProps>) {
  const labelColor = dark ? "text-blue-300" : "text-gray-500";
  const alignClass = centered ? "text-center" : "text-left";

  const titleColor = dark ? "text-white" : "text-[var(--color-primary)]";

  const renderTitle = () => {
    const [line1, line2] = Array.isArray(titleThin) ? titleThin : splitTitle(titleThin);
    return (
      <h2 className={cn("flex flex-col uppercase font-proxima text-[48px] leading-[100%] tracking-[0%]", titleColor, centered && "items-center")}>
        <span className="font-[250]">{line1}</span>
        {line2 && <span className="font-bold">{line2}</span>}
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
      {titleBold && (
        <p
          className={cn(
            "mt-4 font-proxima font-normal text-[18px] leading-[160%] tracking-[0%] max-w-2.5xl",
            dark ? "text-gray-400" : "text-[#003755]",
            centered && "mx-auto text-center"
          )}
        >
          {titleBold}
        </p>
      )}
    </div>
  );
}
