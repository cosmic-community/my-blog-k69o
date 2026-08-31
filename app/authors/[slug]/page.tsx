// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getAllAuthors,
  getAuthorBySlug,
  getPostsByAuthor,
  getMetafieldValue,
} from '@/lib/cosmic';
import PostGrid from '@/components/PostGrid';

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return { title: 'Author Not Found' };
  }

  const name = getMetafieldValue(author.metadata?.name) || author.title;

  return {
    title: name,
    description:
      getMetafieldValue(author.metadata?.bio) || `Posts written by ${name}`,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(author.id);
  const name = getMetafieldValue(author.metadata?.name) || author.title;
  const bio = getMetafieldValue(author.metadata?.bio);
  const avatar = author.metadata?.avatar;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-16 border-b border-gray-200 dark:border-gray-800">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
            alt={name}
            width={112}
            height={112}
            className="h-28 w-28 rounded-full object-cover"
          />
        ) : (
          <div className="h-28 w-28 rounded-full bg-gray-200 dark:bg-gray-800" />
        )}
        <div className="text-center sm:text-left">
          <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-50">
            {name}
          </h1>
          {bio && (
            <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
              {bio}
            </p>
          )}
        </div>
      </div>
      <div className="mt-16">
        <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-50 mb-10">
          Posts by {name}
        </h2>
        <PostGrid posts={posts} />
      </div>
    </div>
  );
}