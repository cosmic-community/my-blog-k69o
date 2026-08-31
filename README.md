# My Blog
![App Preview](https://imgix.cosmicjs.com/83073c20-a567-11f1-9837-31196f0fcdbb-autopilot-photo-1499750310107-5fef28a66643-1788199942305.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A clean, modern, typography-focused blog built with Next.js and [Cosmic](https://www.cosmicjs.com).

## Features

- 🏠 Homepage with featured/latest post hero and a grid of recent posts
- 📚 Full blog listing page with pagination
- 📝 Individual post pages with rich-text content, featured image, author byline, category, and tags
- 👤 Author pages listing every post by that author
- 🏷️ Category pages listing every post in that category
- ℹ️ About page
- 📱 Responsive navigation and footer
- 🔍 SEO metadata and Open Graph tags per post
- ⚡ Fast static rendering with `generateStaticParams`
- 🌗 Light/dark friendly palette

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a95c3cd3d494ca06b9bedb5&clone_repository=6a95c7393d494ca06b9bee6c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
>
> User instructions: A blog with posts, authors, and categories. Include preview capability.

### Code Generation Prompt

> Build a Next.js application for a content management system called "My Blog". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A clean, modern blog website called "My Blog". Pages: a homepage with a featured/latest post hero and a grid of recent posts, a full blog listing page with pagination, individual post pages rendering the rich-text content with featured image, author byline and avatar, category and tags, author pages listing that author's posts, and category pages listing posts in that category. Include an about page, responsive navigation and footer, SEO metadata and Open Graph tags per post, and fast static rendering. Content comes from existing Cosmic object types: posts (excerpt, content rich-text, featured_image, tags multi-select, author object, category object, published_date), authors (name, bio, avatar), categories (name, description). Typography-focused, readable design with generous whitespace, light/dark friendly palette.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with `@tailwindcss/typography`
- [Cosmic](https://www.cosmicjs.com/docs) as the headless CMS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Cosmic account and bucket with `posts`, `authors`, and `categories` object types

### Installation

```bash
bun install
```

Set up your environment variables (see the environment variable setup buttons provided in this app for `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY`).

```bash
bun run dev
```

Visit `http://localhost:3000` to see your blog.

## Cosmic SDK Examples

```typescript
// Fetch all posts with author and category resolved
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1);

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-first-post' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1);

// Fetch posts by author (query by id, not slug)
const { objects: authorPosts } = await cosmic.objects
  .find({ type: 'posts', 'metadata.author': authorId })
  .depth(1);
```

## Cosmic CMS Integration

This app reads from three object types in your Cosmic bucket:

- **posts** — `excerpt`, `content` (rich text), `featured_image`, `tags` (multi-select), `author` (object), `category` (object), `published_date`
- **authors** — `name`, `bio`, `avatar`
- **categories** — `name`, `description`

Object relationships are resolved using the `depth` parameter so author and category data is available directly on each post without extra requests. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add the `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` environment variables
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Import the project into [Netlify](https://netlify.com)
3. Set the build command to `bun run build` and publish directory to `.next`
4. Add the same environment variables
5. Deploy

<!-- README_END -->