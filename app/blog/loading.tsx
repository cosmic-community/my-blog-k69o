export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 animate-pulse">
      <div className="mb-12">
        <div className="h-10 w-48 rounded bg-gray-100 dark:bg-gray-900" />
        <div className="mt-3 h-4 w-64 rounded bg-gray-100 dark:bg-gray-900" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="h-56 w-full rounded-2xl bg-gray-100 dark:bg-gray-900" />
            <div className="h-4 w-1/3 rounded bg-gray-100 dark:bg-gray-900" />
            <div className="h-6 w-3/4 rounded bg-gray-100 dark:bg-gray-900" />
          </div>
        ))}
      </div>
    </div>
  );
}