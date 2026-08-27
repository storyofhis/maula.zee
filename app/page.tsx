import { Mail } from "lucide-react";
import HomeHero from "@/components/home/home-hero";
import AboutExperience from "@/components/about/about-experience";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-[1120px] mx-auto px-6 w-full flex-1">
        <HomeHero />
      </div>

      <footer className="border-t border-border-subtle dark:border-border-strong py-16">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="font-mono text-mono-sm font-medium text-ink-primary dark:text-ink-inverse mb-1">
                zee.dev
              </p>
              <p className="text-body-sm text-ink-secondary dark:text-ink-tertiary">
                &copy; 2026 — Crafted with precision.
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href="mailto:azizi.maula@gmail.com"
                aria-label="Email"
                className="p-2 text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
