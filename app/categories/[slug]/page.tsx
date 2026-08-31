// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getAllCategories,
  getCategoryBySlug,
  getPostsByCategory,
  getMetafieldValue,
} from '@/lib/cosmic';
import PostGrid from '@/components/PostGrid';

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  const name = getMetafieldValue(category.metadata?.name) || category.title;

  return {
    title: name,
    description:
      getMetafieldValue(category.metadata?.description) || `Posts in ${name}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.id);
  const name = getMetafieldValue(category.metadata?.name) || category.title;
  const description = getMetafieldValue(category.metadata?.description);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-16 pb-16 border-b border-gray-200 dark:border-gray-800">
        <span className="inline-block rounded-full bg-teal-50 dark:bg-teal-950 px-3 py-1 text-xs font-medium text-teal-700 dark:text-teal-300">
          Category
        </span>
        <h1 className="mt-4 font-serif text-4xl font-bold text-gray-900 dark:text-gray-50">
          {name}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      <PostGrid posts={posts} />
    </div>
  );
}