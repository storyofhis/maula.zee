import Link from "next/link";
import { ArrowRight, Globe, X, ExternalLink } from "lucide-react";
import HomeHero from "@/components/home/home-hero";
import HomeExperience from "@/components/home/home-experience";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-zinc-100 dark:selection:bg-zinc-800">
      <HomeHero />
      <HomeExperience />

      {/* Blog Teaser Section */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tight">
            DEEP <span className="text-zinc-400">THOUGHTS</span>.
          </h2>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-4 text-2xl font-bold group"
          >
            View all articles 
            <div className="w-12 h-12 rounded-full border border-zinc-900 dark:border-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 transition-all">
              <ArrowRight size={24} />
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-zinc-100 dark:border-zinc-900 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <p className="text-2xl font-bold tracking-tighter mb-2">ZEE.</p>
              <p className="text-zinc-500 dark:text-zinc-400">&copy; 2026 Crafted with precision.</p>
            </div>

            <div className="flex gap-8">
              <a href="#" className="text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"><X size={24} /></a>
              <a href="#" className="text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"><Globe size={24} /></a>
              <a href="#" className="text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"><ExternalLink size={24} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
