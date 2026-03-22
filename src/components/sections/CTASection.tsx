import Button from "@/components/ui/Button";
import type { CtaButton } from "@/lib/strapi";

interface CTASectionProps {
  heading1?: string;
  heading2?: string;
  body?: string;
  buttons?: CtaButton[];
}

const DEFAULT_BUTTONS: CtaButton[] = [
  { label: "Become a Volunteer",   href: "/#join", variant: "cta" },
  { label: "Partner With Us",      href: "/#join", variant: "cta-ghost" },
  { label: "Support the Movement", href: "/#join", variant: "cta-ghost" },
];

export default function CTASection({
  heading1 = "DON'T JUST WATCH",
  heading2 = "BECOME A PROTAGONIST",
  body = "Whether you want to volunteer, partner, or support — there's a place for you in the B-Bright movement.",
  buttons = DEFAULT_BUTTONS,
}: CTASectionProps) {
  return (
    <section className="w-full max-w-[1090px] mx-auto mb-24 px-8 py-12 lg:px-14 rounded-sm" style={{ backgroundColor: "var(--color-primary-dark)" }}>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="text-center lg:text-left lg:max-w-xl">
          <p className="text-white font-proxima font-[250] text-[28px] lg:text-[40px] leading-[100%] uppercase">
            {heading1}
          </p>
          <h2 className="text-white font-proxima font-bold text-[28px] lg:text-[40px] leading-[100%] uppercase mb-6">
            {heading2}
          </h2>
          <p className="text-white font-proxima font-normal text-base lg:text-[18px] leading-[160%]">
            {body}
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full sm:w-auto lg:w-[229px]">
          {buttons.map((btn) => (
            <Button key={btn.label} variant={btn.variant} href={btn.href} arrow className="justify-center w-full">
              {btn.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
