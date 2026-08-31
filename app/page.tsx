import Link from 'next/link';
import { getAllPosts } from '@/lib/cosmic';
import FeaturedPost from '@/components/FeaturedPost';
import PostGrid from '@/components/PostGrid';

export default async function HomePage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;
  const recentPosts = rest.slice(0, 6);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {featured ? (
        <FeaturedPost post={featured} />
      ) : (
        <div className="py-24 text-center">
          <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-gray-50">
            Welcome to My Blog
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            No posts published yet. Check back soon.
          </p>
        </div>
      )}

      {recentPosts.length > 0 && (
        <section className="mt-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-50">
              Recent Posts
            </h2>
            <Link
              href="/blog"
              className="text-sm font-semibold text-teal-700 dark:text-teal-400 hover:underline"
            >
              View all →
            </Link>
          </div>
          <PostGrid posts={recentPosts} />
        </section>
      )}
    </div>
  );
}