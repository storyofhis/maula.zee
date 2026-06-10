"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

const links = [
  { href: "/",      label: "Home"  },
  { href: "/about", label: "About" },
  { href: "/blog",  label: "Blog"  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 glass border-b border-border-subtle dark:border-border-strong">
      <div className="max-w-[1120px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-mono-sm font-medium text-ink-primary dark:text-ink-inverse hover:text-accent dark:hover:text-accent-dark transition-colors duration-150"
        >
          zee.dev
        </Link>

        <div className="flex items-center gap-1">
          <nav className="flex items-center gap-1 mr-2">
            {links.map(({ href, label }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-1.5 rounded-md text-body-sm transition-colors duration-150 ${
                    isActive
                      ? "text-ink-primary dark:text-ink-inverse bg-bg-secondary dark:bg-bg-dark-muted"
                      : "text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse hover:bg-bg-secondary dark:hover:bg-bg-dark-muted"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse hover:bg-bg-secondary dark:hover:bg-bg-dark-muted transition-colors duration-150"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
