interface TagListProps {
  tags?: string[];
}

export default function TagList({ tags }: TagListProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-gray-200 dark:border-gray-800 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}