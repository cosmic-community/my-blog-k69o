import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-16 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <Link
        href={currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : '#'}
        aria-disabled={currentPage <= 1}
        className={`rounded-lg px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-800 ${
          currentPage <= 1
            ? 'pointer-events-none opacity-40 text-gray-400'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
        }`}
      >
        Previous
      </Link>
      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`rounded-lg px-4 py-2 text-sm font-medium border ${
            page === currentPage
              ? 'border-teal-600 bg-teal-600 text-white'
              : 'border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
          }`}
        >
          {page}
        </Link>
      ))}
      <Link
        href={currentPage < totalPages ? `${basePath}?page=${currentPage + 1}` : '#'}
        aria-disabled={currentPage >= totalPages}
        className={`rounded-lg px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-800 ${
          currentPage >= totalPages
            ? 'pointer-events-none opacity-40 text-gray-400'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
        }`}
      >
        Next
      </Link>
    </nav>
  );
}