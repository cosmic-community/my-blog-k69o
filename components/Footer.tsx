import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-24">
      <div className="mx-auto max-w-5xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {year} My Blog. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link
            href="/"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}