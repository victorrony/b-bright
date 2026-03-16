import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "outline-dark" | "ghost";

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  href?: string;
  className?: string;
  arrow?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1565C0] text-white border border-[#1565C0] hover:bg-[#0D47A1] hover:border-[#0D47A1]",
  outline:
    "bg-transparent text-white border border-white hover:bg-white hover:text-[#1565C0]",
  "outline-dark":
    "bg-transparent text-[#171717] border border-[#171717] hover:bg-[#171717] hover:text-white",
  ghost:
    "bg-transparent text-[#1565C0] border-none hover:underline p-0",
};

export default function Button({
  variant = "primary",
  children,
  href,
  className,
  arrow = false,
  type = "button",
  onClick,
}: ButtonProps) {
  const base =
    variant === "ghost"
      ? "inline-flex items-center gap-1 text-sm font-bold tracking-wider transition-colors"
      : "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-wider transition-colors";

  const classes = cn(base, variantClasses[variant], className);

  const content = (
    <>
      {children}
      {arrow && <ArrowRight size={15} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
