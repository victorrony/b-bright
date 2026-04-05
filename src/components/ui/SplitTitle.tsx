import { cn, splitTitle } from "@/lib/utils";

interface SplitTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  dark?: boolean;
  centered?: boolean;
  size?: "sm" | "md" | "lg";
  direction?: "col" | "row";
}

const sizeMap = {
  sm: "text-[32px]",
  md: "text-[48px]",
  lg: "text-[76px]",
};

export default function SplitTitle({ title, subtitle, className, dark = false, centered = false, size = "md", direction = "col" }: Readonly<SplitTitleProps>) {
  const [line1, line2] = splitTitle(title);
  const color = dark ? "text-white" : "text-(--color-primary)";

  return (
    <div className={cn(centered && "text-center", className)}>
      <h2 className={cn(
        "uppercase font-proxima leading-[100%] flex justify-center",
        direction === "row" ? "flex-row gap-3 flex-wrap" : "flex-col",
        sizeMap[size],
        color,
        centered && "items-center",
      )}>
        <span className="font-[250]">{line1}</span>
        {line2 && <span className="font-bold">{line2}</span>}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-4 font-proxima font-normal text-lg leading-[160%] max-w-2xl",
          dark ? "text-gray-400" : "text-(--color-primary-navy)",
          centered && "mx-auto"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
