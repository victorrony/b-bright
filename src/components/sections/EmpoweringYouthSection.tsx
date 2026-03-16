export default function EmpoweringYouthSection() {
  const photos = [
    {
      src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&q=80",
      alt: "Youth 1",
      style: { top: "0%", left: "5%", width: "55%", zIndex: 2 },
    },
    {
      src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&q=80",
      alt: "Youth 2",
      style: { top: "15%", right: "0%", width: "52%", zIndex: 3 },
    },
    {
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",
      alt: "Youth 3",
      style: { bottom: "0%", left: "15%", width: "50%", zIndex: 4 },
    },
  ];

  return (
    <section id="about" className="w-full bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: overlapping circular collage */}
        <div className="relative h-[420px] hidden lg:block">
          {photos.map((photo) => (
            <div
              key={photo.alt}
              className="absolute rounded-full overflow-hidden border-4 border-white shadow-xl"
              style={{
                ...photo.style,
                aspectRatio: "1 / 1",
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Mobile: simple stacked images */}
        <div className="flex gap-3 lg:hidden">
          {photos.map((photo) => (
            <div key={photo.alt} className="flex-1 rounded-2xl overflow-hidden shadow-md">
              <img src={photo.src} alt={photo.alt} className="w-full h-40 object-cover" />
            </div>
          ))}
        </div>

        {/* Right: text */}
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase mb-1">
            EMPOWERING YOUTH,
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "#1565C0" }}
          >
            SHAPING AFRICA
          </h2>
          <p className="text-gray-600 text-base leading-relaxed mb-8">
            We are a 100% volunteer platform dedicated to empowering Cape Verdean youth to lead
            the future through training, civic engagement, and global connection.
          </p>

          <div className="mb-6">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
              style={{ color: "#1565C0" }}
            >
              OUR MISSION
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              To value young people: enhance their capabilities, and improve their role as
              protagonists of sustainable development in Cape Verde and Africa.
            </p>
          </div>

          <div>
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
              style={{ color: "#1565C0" }}
            >
              OUR VISION
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              An empowered youth, acting as the creative and resilient driving force of progress
              in Cape Verde and across the African continent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
