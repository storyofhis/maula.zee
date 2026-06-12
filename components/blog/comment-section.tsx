"use client";

import Giscus from "@giscus/react";
import { useTheme } from "@/components/providers/theme-provider";
import { MessageSquare } from "lucide-react";

export function CommentSection({ slug }: { slug: string }) {
  const { theme } = useTheme();

  return (
    <section className="mt-20 border-t border-border-subtle dark:border-border-strong pt-16 max-w-3xl mx-auto min-h-[400px]">
      <div className="flex items-center gap-3 mb-10">
        <MessageSquare className="text-ink-tertiary" size={20} />
        <h3 className="font-display text-display-md leading-snug tracking-tight text-ink-primary dark:text-ink-inverse">
          Discussion
        </h3>
      </div>

      <div className="glass rounded-lg border border-border-subtle dark:border-border-strong p-4 sm:p-8">
        <Giscus
          id="comments"
          repo={
            (process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`) ||
            "username/repo"
          }
          repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ""}
          category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "General"}
          categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || ""}
          mapping="pathname"
          reactionsEnabled="0"
          emitMetadata="0"
          inputPosition="bottom"
          theme={theme === "dark" ? "transparent_dark" : "light"}
          lang="en"
          loading="lazy"
        />
      </div>

      {!process.env.NEXT_PUBLIC_GISCUS_REPO && (
        <p className="mt-4 text-center font-mono text-mono-sm text-warning">
          Configure NEXT_PUBLIC_GISCUS_* environment variables to enable comments.
        </p>
      )}
    </section>
  );
}
