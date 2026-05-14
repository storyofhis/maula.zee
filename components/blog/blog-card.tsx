import Link from 'next/link';

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export function BlogCard({ title, description, date, readTime, tags, slug }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block space-y-6 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-950/5">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
          <span>{date}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <span>{readTime}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <span>1.2k views</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 text-lg">
          {description}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-900">
        {tags.map((tag) => (
          <span key={tag} className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-md group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 transition-all duration-300">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
