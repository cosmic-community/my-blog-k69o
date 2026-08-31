export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 animate-pulse">
      <div className="h-72 rounded-3xl bg-gray-100 dark:bg-gray-900" />
      <div className="mt-6 h-8 w-2/3 rounded bg-gray-100 dark:bg-gray-900" />
      <div className="mt-4 h-4 w-1/2 rounded bg-gray-100 dark:bg-gray-900" />
    </div>
  );
}