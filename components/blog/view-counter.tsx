"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

// Track incremented slugs during the session to prevent double-counting in React Strict Mode (dev mode)
const incrementedSlugs = new Set<string>();

interface ViewCounterProps {
    slug: string;
    noIncrement?: boolean;
}

export function ViewCounter({ slug, noIncrement = false }: ViewCounterProps) {
    const [views, setViews] = useState<number>(0);

    useEffect(() => {
        let isCancelled = false;

        async function updateViews() {
            try {
                if (noIncrement) {
                    // Just fetch the current count (GET), never increment
                    const res = await fetch(`/api/views/${slug}`);
                    if (!res.ok) return;
                    const data = await res.json();
                    if (!isCancelled) {
                        setViews(data.views);
                    }
                } else if (incrementedSlugs.has(slug)) {
                    // Already counted in this session - just fetch the current count (GET)
                    const res = await fetch(`/api/views/${slug}`);
                    if (!res.ok) return;
                    const data = await res.json();
                    if (!isCancelled) {
                        setViews(data.views);
                    }
                } else {
                    // Mark as counted for this session
                    incrementedSlugs.add(slug);

                    // Increment and get the updated count in a single request (POST)
                    const res = await fetch(`/api/views/${slug}`, {
                        method: "POST",
                    });
                    if (!res.ok) return;
                    const data = await res.json();
                    if (!isCancelled) {
                        setViews(data.views);
                    }
                }
            } catch (err) {
                console.error("Failed to update or fetch views:", err);
            }
        }

        updateViews();

        return () => {
            isCancelled = true;
        };
    }, [slug]);

    return (
        <span className="flex items-center gap-2">
            <Eye size={14} />
            {views.toLocaleString()} views
        </span>
    );
}