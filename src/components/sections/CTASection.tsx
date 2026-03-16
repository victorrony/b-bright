import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="w-full py-20 px-6" style={{ backgroundColor: "#1565C0" }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left text */}
        <div className="lg:max-w-xl">
          <p className="text-blue-200 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            DON&apos;T JUST WATCH
          </p>
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-5">
            BECOME A PROTAGONIST
          </h2>
          <p className="text-blue-100 text-base leading-relaxed" style={{ opacity: 0.85 }}>
            Whether you want to volunteer, partner, or support — there&apos;s a place for you in
            the B-Bright movement.
          </p>
        </div>

        {/* Right buttons — white outlined pill buttons, right-aligned */}
        <div className="flex flex-col gap-4 w-full lg:w-auto min-w-[280px]">
          {[
            { label: "Become a Volunteer", href: "/#join" },
            { label: "Partner With Us", href: "/#join" },
            { label: "Support the Movement", href: "/#join" },
          ].map((btn) => (
            <Button
              key={btn.label}
              variant="outline"
              href={btn.href}
              arrow
              className="justify-between w-full"
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
