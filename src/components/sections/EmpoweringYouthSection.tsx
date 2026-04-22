import Image from "next/image";
import SplitTitle from "@/components/ui/SplitTitle";

interface EmpoweringYouthSectionProps {
   readonly heading: string;
   readonly body: string;
   readonly mission: string;
   readonly vision: string;
   readonly photos: { readonly url: string; readonly alt: string }[];
   readonly missionLabel?: string;
   readonly visionLabel?: string;
}

export default function EmpoweringYouthSection({
   heading,
   body,
   mission,
   vision,
   photos,
   missionLabel = "OUR MISSION",
   visionLabel = "OUR VISION",
}: EmpoweringYouthSectionProps) {
   const photo = photos?.[0];

   return (
      <section id="about" className="w-full bg-white m-auto py-20">
         <div className="max-w-7xl flex flex-row mx-4 md:mx-10 lg:mx-auto flex-wrap md:flex-nowrap lg:gap-6 items-center justify-center">
            {/* Image with B-shape clip path */}
            <div className="flex justify-center w-full md:w-1/2 mb-12 md:mb-0">
               <div className="relative w-57 h-85 md:w-101.75 md:h-131.25">
                  <svg width="0" height="0" style={{ position: "absolute" }}>
                     <defs>
                        {/* Desktop clip path — coordenadas originais */}
                        <clipPath id="b-shape" clipPathUnits="userSpaceOnUse">
                           <rect x="0" y="80" width="117" height="370" rx="58" />
                           <rect x="122" y="0" width="117" height="249" rx="58" />
                           <rect x="122" y="255" width="117" height="255" rx="58" />
                           <rect x="245" y="40" width="117" height="369" rx="58" />
                        </clipPath>
                        {/* Mobile clip path — escala ~0.63x */}
                        <clipPath id="b-shape-mobile" clipPathUnits="userSpaceOnUse">
                           <rect x="0" y="50" width="74" height="233" rx="37" />
                           <rect x="77" y="0" width="74" height="157" rx="37" />
                           <rect x="77" y="161" width="74" height="161" rx="37" />
                           <rect x="154" y="25" width="74" height="233" rx="37" />
                        </clipPath>
                     </defs>
                  </svg>
                  {photo && (
                     <div
                        className="absolute flex justify-center items-center mx-auto inset-0 md:[clip-path:url(#b-shape)] [clip-path:url(#b-shape-mobile)]"
                        style={{ transform: "rotate(-16deg)", transformOrigin: "center" }}
                     >
                        <Image
                           src={photo.url}
                           alt={photo.alt}
                           className="object-cover object-[75%_center]"
                           fill
                           sizes="207px"
                        />
                        <div
                           className="absolute inset-0 m-auto"
                           style={{
                              background: "linear-gradient(180deg, rgba(0,196,255,0.3) 0%, rgba(0,117,153,0.3) 100%)",
                           }}
                        />
                     </div>
                  )}
               </div>
            </div>

            {/* Text */}
            <div className="mx-4 md:mx-0 w-full md:w-1/2">
               <SplitTitle title={heading} className="mb-6" />
               <p className="text-[#616161] font-proxima font-normal text-[18px] leading-[160%] mb-8">{body}</p>
               <div className="mb-6">
                  <p className="text-[#0769B9] font-proxima text-[24px] leading-[110%] uppercase mb-2 font-[250]">
                     {(missionLabel ?? "OUR MISSION").split(" ").map((word, i, arr) =>
                       i === arr.length - 1 ? <span key={i} className="font-semibold">{word}</span> : `${word} `
                     )}
                  </p>
                  <p className="text-[#616161] font-proxima font-normal text-[16px] leading-[160%]">{mission}</p>
               </div>
               <div>
                  <p className="text-[#0769B9] font-proxima text-[24px] leading-[110%] uppercase mb-2 font-[250]">
                     {(visionLabel ?? "OUR VISION").split(" ").map((word, i, arr) =>
                       i === arr.length - 1 ? <span key={i} className="font-semibold">{word}</span> : `${word} `
                     )}
                  </p>
                  <p className="text-[#616161] font-proxima font-normal text-[16px] leading-[160%]">{vision}</p>
               </div>
            </div>
         </div>
      </section>
   );
}
