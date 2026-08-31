import Link from 'next/link';
import MobileMenu from './MobileMenu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
      <div className="relative mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50"
        >
          My Blog
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <MobileMenu links={navLinks} />
      </div>
    </header>
  );
}