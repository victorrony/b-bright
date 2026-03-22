import { cn } from "@/lib/utils";

interface CardProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  variant?: "default" | "dark";
  backgroundImage?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Card({
  icon,
  title,
  description,
  variant = "default",
  backgroundImage,
  className,
  children,
}: CardProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "rounded-[4px] flex flex-col w-full max-w-[353px] min-h-[320px] shadow-[0px_4px_20px_0px_rgba(0,55,85,0.1)] overflow-hidden relative",
        isDark ? "border border-white/10" : "border border-gray-100",
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : isDark
          ? { backgroundColor: "#162032" }
          : { backgroundColor: "#fff" }
      }
    >
      {/* overlay when backgroundImage is set */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-navy/60" />
      )}

      <div className="relative z-10 p-8 flex flex-col h-full">
        {icon && (
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-5 shrink-0"
            style={{
              backgroundColor: backgroundImage
                ? "rgba(255,255,255,0.15)"
                : isDark
                ? "rgba(7,105,185,0.25)"
                : "#EEF4FF",
            }}
          >
            <span className={backgroundImage ? "text-white" : "text-primary"}>{icon}</span>
          </div>
        )}
        {title && (
          <h3
            className={cn(
              "font-proxima font-bold text-[18px] leading-[160%] mt-10 uppercase",
              backgroundImage || isDark ? "text-white" : "text-navy"
            )}
          >
            {title}
          </h3>
        )}
        {description && (
          <p
            className={cn(
              "font-proxima font-normal mt-3 text-[16px] leading-[160%] tracking-[0%]",
              backgroundImage || isDark ? "text-gray-200" : "text-navy"
            )}
          >
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
