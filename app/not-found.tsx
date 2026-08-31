import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-gray-50">
        404
      </h1>
      <p className="mt-4 text-gray-500 dark:text-gray-400">
        We couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}