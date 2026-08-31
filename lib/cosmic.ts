import { getCosmic } from '@/lib/cosmic-preview';
import type { Post, Author, Category } from '@/types';

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

function sortPostsByDate(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.metadata?.published_date || a.created_at).getTime();
    const dateB = new Date(b.metadata?.published_date || b.created_at).getTime();
    return dateB - dateA;
  });
}

export async function getAllPosts(): Promise<Post[]> {
  const { cosmic, previewToken } = await getCosmic();
  try {
    const query = cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    const response = previewToken ? await query.status('any') : await query;
    return sortPostsByDate(response.objects as Post[]);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts');
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { cosmic, previewToken } = await getCosmic();
  try {
    const query = cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    const response = previewToken ? await query.status('any') : await query;
    return response.object as Post;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch post');
  }
}

export async function getAllAuthors(): Promise<Author[]> {
  const { cosmic, previewToken } = await getCosmic();
  try {
    const query = cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'slug', 'title', 'metadata']);
    const response = previewToken ? await query.status('any') : await query;
    return response.objects as Author[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch authors');
  }
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const { cosmic, previewToken } = await getCosmic();
  try {
    const query = cosmic.objects
      .findOne({ type: 'authors', slug })
      .props(['id', 'slug', 'title', 'metadata']);
    const response = previewToken ? await query.status('any') : await query;
    return response.object as Author;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch author');
  }
}

export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  const { cosmic, previewToken } = await getCosmic();
  try {
    const query = cosmic.objects
      .find({ type: 'posts', 'metadata.author': authorId })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    const response = previewToken ? await query.status('any') : await query;
    return sortPostsByDate(response.objects as Post[]);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts by author');
  }
}

export async function getAllCategories(): Promise<Category[]> {
  const { cosmic, previewToken } = await getCosmic();
  try {
    const query = cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'slug', 'title', 'metadata']);
    const response = previewToken ? await query.status('any') : await query;
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { cosmic, previewToken } = await getCosmic();
  try {
    const query = cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'slug', 'title', 'metadata']);
    const response = previewToken ? await query.status('any') : await query;
    return response.object as Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch category');
  }
}

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  const { cosmic, previewToken } = await getCosmic();
  try {
    const query = cosmic.objects
      .find({ type: 'posts', 'metadata.category': categoryId })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    const response = previewToken ? await query.status('any') : await query;
    return sortPostsByDate(response.objects as Post[]);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts by category');
  }
}