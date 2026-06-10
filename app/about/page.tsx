import Link from "next/link";
import { Mail, Download } from "lucide-react";
import AboutHero from "@/components/about/about-hero";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-[1120px] mx-auto px-6 pt-16 pb-32">
        <AboutHero />

        {/* Biography */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
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

        {/* Contact */}
        <section className="border-t border-border-subtle dark:border-border-strong pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
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

              <div className="flex gap-8">
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
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
