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
    <section className="flex lg:max-w-272.5 md:h-69.5 md:mx-4.5 lg:mx-auto mb-24 mt-10 px-8 py-12 rounded-sm bg-primary">
      <div className="flex flex-col md:flex-row items-center w-full justify-between gap-8">
        <div className="text-center mt-5 lg:text-left md:max-w-lg lg:max-w-xl">
          <p className="text-white font-proxima font-[250] text-[28px] lg:text-[40px] leading-[100%] uppercase">
            {heading1}
          </p>
          <h2 className="text-white font-proxima font-bold text-[28px] lg:text-[40px] leading-[100%] uppercase mb-4">
            {heading2}
          </h2>
          <p className="text-white font-proxima font-normal text-base lg:text-[18px] leading-[160%]">
            {body}
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-col gap-6 w-full sm:w-auto md:w- lg:w-57.25">
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
