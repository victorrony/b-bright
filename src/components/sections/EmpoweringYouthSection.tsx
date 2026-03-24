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
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Single image with gradient overlay */}
            <div className="flex justify-center">
               <div className="relative w-[407px] h-[525px] overflow-hidden shadow-xl rounded-[4px]">
                  {photo && <Image src={photo.url} alt={photo.alt} className="object-cover" fill sizes="407px" />}
                  <div
                     className="absolute inset-0"
                     style={{
                        background: "linear-gradient(180deg, rgba(0,196,255,0.3) 0%, rgba(0,117,153,0.3) 100%)",
                     }}
                  />
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
