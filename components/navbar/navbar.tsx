"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useState } from "react";

const links = [
  { href: "/",         label: "Home"     },
  { href: "/projects", label: "Projects" },
  { href: "/about",    label: "About"    },
  { href: "/blog",     label: "Blog"     },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-black/[0.07] dark:border-white/[0.04]">
      <div className="max-w-[1120px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-mono-sm font-medium text-ink-primary dark:text-ink-inverse hover:text-accent dark:hover:text-accent-dark transition-colors duration-150"
        >
          zee.dev
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
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

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="p-2 rounded-md text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-black/[0.07] dark:border-white/[0.04] bg-bg-primary/90 dark:bg-bg-dark/90 backdrop-blur-xl">
          <nav className="max-w-[1120px] mx-auto px-6 py-3 flex flex-col gap-1">
            {links.map(({ href, label }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-md text-body-sm transition-colors duration-150 ${
                    isActive
                      ? "text-ink-primary dark:text-ink-inverse bg-bg-secondary dark:bg-bg-dark-muted font-medium"
                      : "text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse hover:bg-bg-secondary dark:hover:bg-bg-dark-muted"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
