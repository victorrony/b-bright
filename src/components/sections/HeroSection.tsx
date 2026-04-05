import Image from "next/image";
import Button from "@/components/ui/Button";
import type { HeroButton } from "@/lib/strapi";

interface HeroSectionProps {
   title: string;
   subtitle?: string;
   backgroundImage?: string;
   backgroundIsVideo?: boolean;
   buttons: HeroButton[];
}

export default function HeroSection({ title, backgroundImage, backgroundIsVideo, buttons }: Readonly<HeroSectionProps>) {
   const lines = title
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean)
      .slice(0, 2);

   return (
      <section className="relative w-full h-191 flex items-end overflow-hidden">
         {backgroundImage &&
            (backgroundIsVideo ? (
               <video
                  src={backgroundImage}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
               />
            ) : (
               <Image
                  src={backgroundImage}
                  alt="Young people"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 1440px"
                  priority
               />
            ))}
         <div className="absolute inset-0 bg-gradient-brand opacity-40" />
         <div className="relative z-10 mx-auto ml-[15%] pb-20 pt-32 w-full">
            <div className="max-w-4xl min-h-65.25">
               <h1 className=" text-white mb-8 flex flex-col">
                  {lines.map((line, i) => (
                     <span key={i} className={i === 0 ? "text-hero" : "text-hero"}>{line}</span>
                  ))}
               </h1>
               <div className="flex flex-col sm:flex-row gap-8">
                  {buttons.map((btn) => (
                     <Button
                        key={btn.href}
                        variant={btn.variant}
                        href={btn.href}
                        arrow
                        className={
                           btn.variant === "ghost"
                              ? "text-white hover:text-white/80 text-sm font-bold tracking-wider"
                              : "rounded-full"
                        }
                     >
                        {btn.label}
                     </Button>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}
