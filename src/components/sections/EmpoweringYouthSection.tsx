import Image from "next/image";

const FALLBACK_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&q=80", alt: "Youth 1" },
  { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&q=80", alt: "Youth 2" },
  { url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80", alt: "Youth 3" },
];

const PHOTO_STYLES = [
  { top: "0%",  left: "5%",  width: "55%", zIndex: 2 },
  { top: "15%", right: "0%", width: "52%", zIndex: 3 },
  { bottom: "0%", left: "15%", width: "50%", zIndex: 4 },
];

interface EmpoweringYouthSectionProps {
  heading: string;
  body: string;
  mission: string;
  vision: string;
  photos: { url: string; alt: string }[];
}

export default function EmpoweringYouthSection({ heading, body, mission, vision, photos }: EmpoweringYouthSectionProps) {
  const displayPhotos = photos?.length > 0 ? photos.slice(0, 3) : FALLBACK_PHOTOS;
  const headingParts = heading.split(',').map((p) => p.trim());

  return (
    <section id="about" className="w-full bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Desktop: overlapping circles */}
        <div className="relative h-[420px] hidden lg:block">
          {displayPhotos.map((photo, i) => (
            <div
              key={i}
              className="absolute rounded-full overflow-hidden border-4 border-white shadow-xl"
              style={{ ...PHOTO_STYLES[i], aspectRatio: "1 / 1" }}
            >
              <Image src={photo.url} alt={photo.alt} className="object-cover" fill sizes="100vw" />
            </div>
          ))}
        </div>

        {/* Mobile: stacked */}
        <div className="flex gap-3 lg:hidden">
          {displayPhotos.map((photo, i) => (
            <div key={i} className="flex-1 relative h-40 rounded-2xl overflow-hidden shadow-md">
              <Image src={photo.url} alt={photo.alt} className="object-cover" fill sizes="33vw" />
            </div>
          ))}
        </div>

        {/* Text */}
        <div>
          <h2 className="text-[#0769B9] uppercase font-proxima text-[48px] leading-[100%] flex flex-col mb-6">
            <span className="font-[250]">{headingParts[0]},</span>
            <span className="font-semibold">{headingParts[1] ?? ''}</span>
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
