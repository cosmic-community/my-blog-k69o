import type { Post } from '@/types';
import PostCard from './PostCard';

interface PostGridProps {
  posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-12">
        No posts found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}