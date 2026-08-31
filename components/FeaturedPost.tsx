import Link from 'next/link';
import type { Post } from '@/types';
import CategoryBadge from './CategoryBadge';
import { getMetafieldValue } from '@/lib/cosmic';

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const image = post.metadata?.featured_image;
  const category = post.metadata?.category;
  const excerpt = getMetafieldValue(post.metadata?.excerpt);
  const author = post.metadata?.author;
  const publishedDate = post.metadata?.published_date;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <Link
        href={`/posts/${post.slug}`}
        className="block overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-900"
      >
        {image ? (
          <img
            src={`${image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
            alt={post.title}
            width={600}
            height={400}
            className="h-72 lg:h-[420px] w-full object-cover"
          />
        ) : (
          <div className="h-72 lg:h-[420px] w-full bg-gray-200 dark:bg-gray-800" />
        )}
      </Link>
      <div className="flex flex-col gap-4">
        {category && <CategoryBadge category={category} />}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-gray-50">
          <Link href={`/posts/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h1>
        {excerpt && (
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {excerpt}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          {author && (
            <span>By {getMetafieldValue(author.metadata?.name) || author.title}</span>
          )}
          {publishedDate && (
            <>
              <span>&middot;</span>
              <time dateTime={publishedDate}>
                {new Date(publishedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </>
          )}
        </div>
        <Link
          href={`/posts/${post.slug}`}
          className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold text-teal-700 dark:text-teal-400 hover:gap-3 transition-all"
        >
          Read article →
        </Link>
      </div>
    </section>
  );
}