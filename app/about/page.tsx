import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about My Blog.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-gray-50">
        About My Blog
      </h1>
      <div className="prose prose-lg dark:prose-invert mt-8 max-w-none">
        <p>
          My Blog is a place for clear thinking and honest writing. We
          publish essays, guides, and stories across technology, design, and
          life — always with a focus on substance over noise.
        </p>
        <p>
          This site is powered by{' '}
          <a
            href="https://www.cosmicjs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cosmic
          </a>
          , a headless CMS that lets our writers focus on writing while the
          content stays fast, flexible, and easy to manage.
        </p>
        <p>
          Have a story to pitch or feedback to share? We&apos;d love to hear
          from you.
        </p>
      </div>
    </div>
  );
}