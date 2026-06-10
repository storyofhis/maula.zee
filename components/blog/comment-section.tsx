"use client";

import Giscus from "@giscus/react";
import { useTheme } from "@/components/providers/theme-provider";
import { MessageSquare } from "lucide-react";

export function CommentSection({ slug }: { slug: string }) {
    const { theme } = useTheme();

    return (
        <section className="mt-20 border-t border-zinc-100 dark:border-zinc-900 pt-16 max-w-3xl mx-auto min-h-[400px]">
            <div className="flex items-center gap-3 mb-10">
                <MessageSquare className="text-zinc-400 dark:text-zinc-500" size={24} />
                <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                    Discussion
                </h3>
            </div>
            
            <div className="glass p-4 rounded-2xl sm:p-8">
                <Giscus
                    id="comments"
                    repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}` || "username/repo"}
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
                <div className="text-center mt-4 text-sm text-amber-600 dark:text-amber-500 font-medium">
                    Please configure NEXT_PUBLIC_GISCUS_REPO and other Giscus IDs in your .env file to enable comments.
                </div>
            )}
        </section>
    );
}
