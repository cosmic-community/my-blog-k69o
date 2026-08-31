import Link from 'next/link';
import type { Post } from '@/types';
import CategoryBadge from './CategoryBadge';
import { getMetafieldValue } from '@/lib/cosmic';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const image = post.metadata?.featured_image;
  const category = post.metadata?.category;
  const excerpt = getMetafieldValue(post.metadata?.excerpt);
  const publishedDate = post.metadata?.published_date;
  const author = post.metadata?.author;

  return (
    <article className="group flex flex-col">
      <Link
        href={`/posts/${post.slug}`}
        className="block overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900"
      >
        {image ? (
          <img
            src={`${image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={250}
            className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-56 w-full bg-gray-200 dark:bg-gray-800" />
        )}
      </Link>
      <div className="mt-4 flex-1 flex flex-col">
        {category && <CategoryBadge category={category} />}
        <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-gray-900 dark:text-gray-50">
          <Link href={`/posts/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {excerpt}
          </p>
        )}
        <div className="mt-4 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white"
            >
              {author.metadata?.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={author.title}
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full object-cover"
                />
              )}
              <span>{author.title}</span>
            </Link>
          )}
          {publishedDate && (
            <>
              <span>&middot;</span>
              <time dateTime={publishedDate}>
                {new Date(publishedDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </>
          )}
        </div>
      </div>
    </article>
  );
}