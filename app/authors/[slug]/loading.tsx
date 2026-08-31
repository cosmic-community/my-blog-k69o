// app/authors/[slug]/loading.tsx
export default function AuthorLoading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 animate-pulse">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-16 border-b border-gray-200 dark:border-gray-800">
        <div className="h-28 w-28 rounded-full bg-gray-100 dark:bg-gray-900" />
        <div className="flex-1 space-y-3 w-full">
          <div className="h-8 w-48 rounded bg-gray-100 dark:bg-gray-900" />
          <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-900" />
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-56 w-full rounded-2xl bg-gray-100 dark:bg-gray-900" />
        ))}
      </div>
    </div>
  );
}