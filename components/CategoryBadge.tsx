import Link from 'next/link';
import type { Category } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface CategoryBadgeProps {
  category: Category;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const name = getMetafieldValue(category.metadata?.name) || category.title;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="inline-block w-fit rounded-full bg-teal-50 dark:bg-teal-950 px-3 py-1 text-xs font-medium text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors"
    >
      {name}
    </Link>
  );
}