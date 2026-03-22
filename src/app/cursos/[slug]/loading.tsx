export default function CourseDetailLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="w-full bg-gray-200 animate-pulse" style={{ height: "816px" }} />

      {/* Other courses skeleton */}
      <section className="w-full bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="h-12 bg-gray-200 animate-pulse rounded w-96" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-64" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1].map((i) => (
              <div key={i} className="flex flex-row rounded-xl overflow-hidden border border-gray-100">
                <div className="w-[180px] h-[240px] bg-gray-200 animate-pulse shrink-0" />
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
