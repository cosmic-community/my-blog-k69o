// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug, getMetafieldValue } from '@/lib/cosmic';
import CategoryBadge from '@/components/CategoryBadge';
import TagList from '@/components/TagList';
import AuthorByline from '@/components/AuthorByline';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const excerpt = getMetafieldValue(post.metadata?.excerpt);
  const image = post.metadata?.featured_image?.imgix_url;
  const ogImage = image
    ? [`${image}?w=1200&h=630&fit=crop&auto=format,compress`]
    : undefined;

  return {
    title: post.title,
    description: excerpt || undefined,
    openGraph: {
      title: post.title,
      description: excerpt || undefined,
      type: 'article',
      images: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: excerpt || undefined,
      images: ogImage,
    },
    other: {
      'cosmic-context': JSON.stringify({
        object_id: post.id,
        object_type: 'posts',
      }),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const image = post.metadata?.featured_image;
  const category = post.metadata?.category;
  const author = post.metadata?.author;
  const tags = post.metadata?.tags;
  const publishedDate = post.metadata?.published_date;
  const content = post.metadata?.content || '';

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      {category && <CategoryBadge category={category} />}
      <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-gray-50">
        {post.title}
      </h1>
      {author && (
        <div className="mt-8">
          <AuthorByline author={author} publishedDate={publishedDate} />
        </div>
      )}
      {image && (
        <img
          src={`${image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={post.title}
          width={800}
          height={450}
          className="mt-10 w-full rounded-2xl object-cover"
        />
      )}
      <div
        className="prose prose-lg dark:prose-invert mt-10 max-w-none prose-headings:font-serif prose-a:text-teal-700 dark:prose-a:text-teal-400"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {tags && tags.length > 0 && (
        <div className="mt-12">
          <TagList tags={tags} />
        </div>
      )}
    </article>
  );
}