// app/posts/[slug]/loading.tsx
export default function PostLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 animate-pulse">
      <div className="h-4 w-24 rounded-full bg-gray-100 dark:bg-gray-900" />
      <div className="mt-4 h-10 w-full rounded bg-gray-100 dark:bg-gray-900" />
      <div className="mt-2 h-10 w-2/3 rounded bg-gray-100 dark:bg-gray-900" />
      <div className="mt-8 h-12 w-48 rounded-full bg-gray-100 dark:bg-gray-900" />
      <div className="mt-10 h-96 w-full rounded-2xl bg-gray-100 dark:bg-gray-900" />
    </div>
  );
}