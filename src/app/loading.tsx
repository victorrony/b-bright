export default function HomeLoading() {
  return (
    <div className="w-full animate-pulse">
      {/* Hero skeleton */}
      <div className="w-full h-[764px] bg-gray-200" />

      {/* About skeleton */}
      <div className="w-full bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="h-10 w-1/3 bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-100 rounded" />
          <div className="h-4 w-1/2 bg-gray-100 rounded" />
        </div>
      </div>

      {/* Values skeleton */}
      <div className="w-full bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto flex gap-6 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-[353px] min-h-[320px] bg-gray-200 rounded shrink-0" />
          ))}
        </div>
      </div>

      {/* CTA skeleton */}
      <div className="w-full h-48 bg-gray-200" />
    </div>
  );
}
