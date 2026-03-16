import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[764px] flex items-end overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1440&q=80"
        alt="Young people"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Blue/teal gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-[#007599] to-[#00C4FF] opacity-40" />

      {/* Content — positioned bottom-left */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
        <div className="max-w-3.5xl">
          <h1 className="text-white mb-8 uppercase font-['Proxima_Nova',sans-serif] h-[200px] font-[250] text-[76px] leading-[100%] tracking-[0%]">
            B-BRIGHT, GIVE A GIFT
            <br />
            TO YOUR FUTURE.
          </h1>
          <div className="flex flex-col sm:flex-row gap-8">
            <Button variant="primary" href="/#join" arrow className="rounded-full">
              JOIN THE MOVEMENT
            </Button>
            <Button variant="ghost" href="/#impact" arrow className="text-white hover:text-white/80 text-sm font-bold tracking-wider">
              DISCOVER OUR IMPACT
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
