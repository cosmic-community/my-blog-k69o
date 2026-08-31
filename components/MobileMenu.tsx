'use client'

import { useState } from 'react';
import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  links: NavLink[];
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
        className="p-2 text-gray-600 dark:text-gray-300"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-4 flex flex-col gap-4 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-gray-700 dark:text-gray-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}