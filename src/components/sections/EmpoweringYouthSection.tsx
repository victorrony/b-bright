import Image from "next/image";

interface EmpoweringYouthSectionProps {
   heading: string;
   body: string;
   mission: string;
   vision: string;
   photos: { url: string; alt: string }[];
}

export default function EmpoweringYouthSection({
   heading,
   body,
   mission,
   vision,
   photos,
}: EmpoweringYouthSectionProps) {
   const photo = photos?.[0];
   const headingParts = heading.split(",").map((p) => p.trim());

   return (
      <section id="about" className="w-full bg-white py-24 px-6">
         <div className="max-w-6xl mx-auto flex flex-row gap-6 items-center">
            {/* Image with B-shape clip path */}
            <div className="flex justify-center w-111.75">
               <div className="relative w-111.75 h-131.25">
                  <svg width="0" height="0" style={{ position: "absolute" }}>
                     <defs>
                        <clipPath id="b-shape" clipPathUnits="userSpaceOnUse">
                           {/* Left large pill */}
                           <rect x="0" y="40" width="117" height="425" rx="58" />
                           {/* Top right pill */}
                           <rect x="127" y="0" width="117" height="245" rx="58" />
                           {/* Bottom right pill */}
                           <rect x="127" y="255" width="117" height="245" rx="58" />
                           {/* Right large pill */}
                           <rect x="255" y="40" width="117" height="425" rx="58" />
                        </clipPath>
                     </defs>
                  </svg>
                  {photo && (
                     <div
                        className="absolute inset-0"
                        style={{ clipPath: "url(#b-shape)", transform: "rotate(-16deg)", transformOrigin: "center" }}
                     >
                        <Image
                           src={photo.url}
                           alt={photo.alt}
                           className="object-cover object-center "
                           fill
                           sizes="207px"
                        />
                        <div
                           className="absolute inset-0"
                           style={{
                              background: "linear-gradient(180deg, rgba(0,196,255,0.3) 0%, rgba(0,117,153,0.3) 100%)",
                           }}
                        />
                     </div>
                  )}
               </div>
            </div>

            {/* Text */}
            <div>
               <h2 className="text-[#0769B9] uppercase font-proxima text-[48px] leading-[100%] flex flex-col mb-6">
                  <span className="font-[250]">{headingParts[0]},</span>
                  <span className="font-semibold">{headingParts[1] ?? ""}</span>
               </h2>
               <p className="text-[#616161] font-proxima font-normal text-[18px] leading-[160%] mb-8">{body}</p>
               <div className="mb-6">
                  <p className="text-[#0769B9] font-proxima text-[24px] leading-[110%] uppercase mb-2 font-[250]">
                     OUR <span className="font-semibold">MISSION</span>
                  </p>
                  <p className="text-[#616161] font-proxima font-normal text-[16px] leading-[160%]">{mission}</p>
               </div>
               <div>
                  <p className="text-[#0769B9] font-proxima text-[24px] leading-[110%] uppercase mb-2 font-[250]">
                     OUR <span className="font-semibold">VISION</span>
                  </p>
                  <p className="text-[#616161] font-proxima font-normal text-[16px] leading-[160%]">{vision}</p>
               </div>
            </div>
         </div>
      </section>
   );
}
