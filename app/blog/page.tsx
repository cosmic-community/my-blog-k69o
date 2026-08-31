import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/cosmic';
import PostGrid from '@/components/PostGrid';
import Pagination from '@/components/Pagination';

const POSTS_PER_PAGE = 9;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Browse all posts on My Blog.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1);
  const posts = await getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-gray-50">
          The Blog
        </h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          All posts, freshest first.
        </p>
      </div>
      <PostGrid posts={paginatedPosts} />
      <Pagination currentPage={safePage} totalPages={totalPages} basePath="/blog" />
    </div>
  );
}