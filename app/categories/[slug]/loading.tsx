// app/categories/[slug]/loading.tsx
export default function CategoryLoading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 animate-pulse">
      <div className="mb-16 pb-16 border-b border-gray-200 dark:border-gray-800 space-y-3">
        <div className="h-5 w-24 rounded-full bg-gray-100 dark:bg-gray-900" />
        <div className="h-10 w-64 rounded bg-gray-100 dark:bg-gray-900" />
        <div className="h-4 w-96 max-w-full rounded bg-gray-100 dark:bg-gray-900" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-56 w-full rounded-2xl bg-gray-100 dark:bg-gray-900" />
        ))}
      </div>
    </div>
  );
}