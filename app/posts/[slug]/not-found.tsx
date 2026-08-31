// app/posts/[slug]/not-found.tsx
import Link from 'next/link';

export default function PostNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-50">
        Post Not Found
      </h1>
      <p className="mt-4 text-gray-500 dark:text-gray-400">
        The post you&apos;re looking for doesn&apos;t exist or has been
        removed.
      </p>
      <Link
        href="/blog"
        className="mt-8 inline-block rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700 transition-colors"
      >
        Browse all posts
      </Link>
    </div>
  );
}