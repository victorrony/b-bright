export default function CursosLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="w-full bg-gray-200 animate-pulse" style={{ minHeight: "400px" }} />

      {/* Course cards skeleton */}
      <section className="w-full bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-row lg:w-[1080px] gap-6 m-auto items-center">
              <div className="w-[407px] h-[487px] bg-gray-200 animate-pulse rounded" />
              <div className="flex-1 flex flex-col gap-4">
                <div className="h-10 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-5 bg-gray-200 animate-pulse rounded w-1/2" />
                <div className="h-5 bg-gray-200 animate-pulse rounded w-1/2" />
                <div className="h-24 bg-gray-200 animate-pulse rounded w-full" />
                <div className="h-10 bg-gray-200 animate-pulse rounded w-32" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
