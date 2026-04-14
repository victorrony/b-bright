import Image from "next/image";
import Button from "@/components/ui/Button";
import type { HeroButton } from "@/lib/strapi";
import SplitTitle from "../ui/SplitTitle";

interface HeroSectionProps {
   title: string;
   subtitle?: string;
   backgroundImage?: string;
   backgroundIsVideo?: boolean;
   buttons: HeroButton[];
}

export default function HeroSection({ title, backgroundImage, backgroundIsVideo, buttons }: Readonly<HeroSectionProps>) {
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

               {/* <SplitTitle title={title} dark size="lg" titleClassName="mb-8" /> */}

               <h1 className="text-hero text-white mb-8 flex flex-col">
                     <span className=" ">B-Bright, give a <span className=" text-primary">gift</span>  to your future.</span>
               </h1>

               <div className="flex flex-col sm:flex-row w-68 md:w-full gap-12">
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
