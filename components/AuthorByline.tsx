import Link from 'next/link';
import type { Author } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface AuthorBylineProps {
  author: Author;
  publishedDate?: string;
}

export default function AuthorByline({ author, publishedDate }: AuthorBylineProps) {
  const name = getMetafieldValue(author.metadata?.name) || author.title;
  const avatar = author.metadata?.avatar;

  return (
    <div className="flex items-center gap-4">
      <Link href={`/authors/${author.slug}`}>
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
            alt={name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800" />
        )}
      </Link>
      <div>
        <Link
          href={`/authors/${author.slug}`}
          className="font-medium text-gray-900 dark:text-gray-50 hover:underline"
        >
          {name}
        </Link>
        {publishedDate && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={publishedDate}>
              {new Date(publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </p>
        )}
      </div>
    </div>
  );
}