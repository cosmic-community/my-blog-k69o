// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Author object type
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Category object type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
  };
}

// Post object type
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    excerpt?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    tags?: string[];
    author?: Author;
    category?: Category;
    published_date?: string;
  };
}

export type { CosmicObject };