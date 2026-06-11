import Link from "next/link";
import { Mail, Download, ArrowRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social-icons";
import AboutHero from "@/components/about/about-hero";
import { getAllPosts } from "@/lib/blog-data";

export default function AboutPage() {
  const retrospectivePosts = getAllPosts().filter((p) =>
    p.tags.includes("Retrospective")
  );

  return (
    <div className="min-h-screen">
      <main className="max-w-[1120px] mx-auto px-6 pt-16 pb-32">
        <AboutHero />

        {/* Biography */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-32">
          <div className="lg:col-span-4">
            <p className="font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary">
              Biography
            </p>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="text-body-lg text-ink-secondary dark:text-ink-tertiary leading-relaxed">
              I'm a software engineer with a deep-rooted passion for building scalable, high-performance systems.
              My journey began with a fascination for crafting seamless user interfaces, which eventually led me
              into robust backend architectures and payment systems.
            </p>
            <p className="text-body-lg text-ink-secondary dark:text-ink-tertiary leading-relaxed">
              I believe software is more than code — it's a medium for solving real-world problems with elegance
              and precision. Whether optimizing a database query or refining a micro-interaction, I strive for
              excellence in every detail.
            </p>
          </div>
        </section>

        {/* Notes / Retrospectives */}
        {retrospectivePosts.length > 0 && (
          <section className="border-t border-border-subtle dark:border-border-strong pt-12 md:pt-24 mb-16 md:mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary">
                  Notes
                </p>
              </div>
              <div className="lg:col-span-8 space-y-4">
                {retrospectivePosts.map((post) => {
                  const year = post.date.split(" ").at(-1) ?? post.date.slice(-4);
                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex items-start gap-6 bg-bg-secondary dark:bg-bg-dark-muted border border-border-subtle dark:border-border-strong rounded-lg px-6 py-6 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-150 ease-out"
                    >
                      <div className="hidden sm:flex flex-col justify-center min-w-[52px]">
                        <span className="font-display text-display-lg font-black tracking-tighter text-border-default dark:text-border-strong group-hover:text-accent dark:group-hover:text-accent-dark transition-colors duration-150 leading-none">
                          {year}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-mono-sm text-ink-tertiary mb-2">
                          {post.readTime}
                        </div>
                        <h3 className="font-display text-display-sm leading-snug tracking-tight text-ink-primary dark:text-ink-inverse group-hover:text-accent dark:group-hover:text-accent-dark transition-colors duration-150 mb-1.5">
                          {post.title}
                        </h3>
                        <p className="text-body-sm text-ink-secondary dark:text-ink-tertiary leading-relaxed line-clamp-2">
                          {post.description}
                        </p>
                      </div>

                      <ArrowRight
                        size={16}
                        className="mt-1 shrink-0 text-ink-tertiary group-hover:text-accent dark:group-hover:text-accent-dark group-hover:translate-x-1 transition-all duration-150"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="border-t border-border-subtle dark:border-border-strong pt-12 md:pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary">
                Contact
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-display text-display-lg leading-[1.15] tracking-tight text-ink-primary dark:text-ink-inverse mb-10 text-balance">
                Let's build something{" "}
                <span className="text-accent dark:text-accent-dark italic">worth building</span>.
              </h2>

              <div className="flex flex-wrap gap-3 mb-16">
                <a
                  href="mailto:azizi.maula@gmail.com"
                  className="inline-flex items-center gap-2 bg-accent text-ink-inverse px-5 py-2.5 rounded-md text-body-sm font-medium hover:bg-accent-hover transition-colors duration-150"
                >
                  <Mail size={15} /> Get in touch
                </a>
                <button className="inline-flex items-center gap-2 border border-border-default dark:border-border-strong text-ink-primary dark:text-ink-inverse px-5 py-2.5 rounded-md text-body-sm font-medium hover:bg-bg-secondary dark:hover:bg-bg-dark-muted transition-colors duration-150">
                  <Download size={15} /> Download CV
                </button>
              </div>

              <div className="flex items-center gap-8">
                <Link
                  href="/"
                  className="font-mono text-mono-sm text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
                >
                  Home
                </Link>
                <Link
                  href="/blog"
                  className="font-mono text-mono-sm text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
                >
                  Writing
                </Link>
                <div className="h-4 w-px bg-border-default dark:bg-border-strong" />
                <a
                  href="https://github.com/storyofhis"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
                >
                  <GitHubIcon size={16} />
                </a>
                <a
                  href="https://linkedin.com/in/mauladev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-ink-secondary dark:text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150"
                >
                  <LinkedInIcon size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
