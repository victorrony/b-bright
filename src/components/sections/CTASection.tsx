import Button from "@/components/ui/Button";
import type { CtaButton } from "@/lib/strapi";

interface CTASectionProps {
  heading1?: string;
  heading2?: string;
  body?: string;
  buttons?: CtaButton[];
}

export default function CTASection({ heading1, heading2, body, buttons = [] }: Readonly<CTASectionProps>) {
  if (!heading1 && !heading2 && !body && buttons.length === 0) return null;
  return (
    <section className="w-full max-w-[1090px] mx-auto mb-24 mt-10 px-8 py-12 lg:px-14 rounded-sm bg-primary-dark">
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
