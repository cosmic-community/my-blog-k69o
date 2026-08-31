// components/Markdown.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownProps = {
  /** Raw markdown string, typically from a Cosmic rich-text metafield. */
  children: string;
  /** Classes applied to the wrapper. Pass Tailwind `prose` classes here. */
  className?: string;
};

/**
 * Renders a Cosmic rich-text (markdown) value.
 *
 * Cosmic rich-text metafields store markdown, not HTML, so passing the value
 * to dangerouslySetInnerHTML outputs the syntax literally. react-markdown
 * parses it properly and, unlike dangerouslySetInnerHTML, does not inject raw
 * HTML from the CMS into the page.
 *
 * remark-gfm adds GitHub-flavored markdown: tables, task lists,
 * strikethrough, and autolinked URLs.
 */
export default function Markdown({ children, className }: MarkdownProps) {
  if (!children) return null;

  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
