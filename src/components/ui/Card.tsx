import { cn } from "@/lib/utils";

interface CardProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  variant?: "default" | "dark";
  className?: string;
  children?: React.ReactNode;
}

export default function Card({
  icon,
  title,
  description,
  variant = "default",
  className,
  children,
}: CardProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "rounded-xl p-8 flex flex-col",
        isDark
          ? "border border-white/10"
          : "bg-white border border-gray-100 shadow-sm",
        className
      )}
      style={isDark ? { backgroundColor: "#162032" } : undefined}
    >
      {icon && (
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-5 flex-shrink-0"
          style={{ backgroundColor: isDark ? "rgba(21,101,192,0.25)" : "#EEF4FF" }}
        >
          <span style={{ color: "#1565C0" }}>{icon}</span>
        </div>
      )}
      {title && (
        <h3
          className={cn(
            "text-sm font-bold tracking-wider mb-3 uppercase",
            isDark ? "text-white" : ""
          )}
          style={!isDark ? { color: "#1565C0" } : undefined}
        >
          {title}
        </h3>
      )}
      {description && (
        <p className={cn("text-sm leading-relaxed", isDark ? "text-gray-400" : "text-gray-500")}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
