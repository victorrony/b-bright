import Image from "next/image";
import Button from "@/components/ui/Button";
import type { HeroButton } from "@/lib/strapi";
import { FALLBACK_IMAGE } from "@/lib/constants";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  buttons: HeroButton[];
}

export default function HeroSection({ title, backgroundImage, buttons }: HeroSectionProps) {
  const lines = title.split(',').map((l) => l.trim()).filter(Boolean);

  return (
    <section className="relative w-full h-[764px] flex items-end overflow-hidden">
      <Image
        src={backgroundImage ?? FALLBACK_IMAGE}
        alt="Young people"
        className="object-cover"
        fill
        sizes="(max-width: 768px) 100vw, 1440px"
        priority
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #007599 0%, #00C4FF 100%)", opacity: 0.4 }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
        <div className="max-w-4xl">
          <h1 className="text-white mb-8 uppercase font-proxima min-h-[200px] font-[250] text-[76px] leading-[100%] tracking-[0%] flex flex-col gap-6">
            {lines.map((line, i) => <span key={i}>{line}</span>)}
          </h1>
          <div className="flex flex-col sm:flex-row gap-8">
            {buttons.map((btn) => (
              <Button key={btn.href} variant={btn.variant} href={btn.href} arrow className={btn.variant === 'ghost' ? 'text-white hover:text-white/80 text-sm font-bold tracking-wider' : 'rounded-full'}>
                {btn.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
