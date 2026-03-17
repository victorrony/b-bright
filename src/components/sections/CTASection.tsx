import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="w-[1090px] h-[297px] m-auto mb-26 p-14 rounded-sm" style={{ backgroundColor: "#1565C0" }}>
      <div className="mx-auto flex flex-col lg:flex-row items-center justify-between gap-5 ">
        {/* Left text */}
        <div className="lg:max-w-xl">
          <p className="text-white font-['Proxima_Nova',sans-serif] font-[250] text-[40px] leading-[100%] uppercase">
            DON&apos;T JUST WATCH
          </p>
          <h2 className="text-white font-['Proxima_Nova',sans-serif] font-bold text-[40px] leading-[100%] uppercase mb-6">
            BECOME A PROTAGONIST
          </h2>
          <p className="text-white font-['Proxima_Nova',sans-serif] font-normal text-[18px] leading-[160%]">
            Whether you want to volunteer, partner, or support — there&apos;s a place for you in
            the B-Bright movement.
          </p>
        </div>

        {/* Right buttons — white outlined pill buttons, right-aligned */}
        <div className="flex flex-col gap-4 w-[213px] lg:w-auto">
          {[
            { label: "Become a Volunteer", href: "/#join", variant: "cta" as const },
            { label: "Partner With Us", href: "/#join", variant: "cta-ghost" as const },
            { label: "Support the Movement", href: "/#join", variant: "cta-ghost" as const },
          ].map((btn) => (
            <Button
              key={btn.label}
              variant={btn.variant}
              href={btn.href}
              arrow
              className="justify-center w-full"
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
