"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

export function ViewCounter({ slug }: { slug: string }) {
    const [views, setViews] = useState<number>(0);

    useEffect(() => {
        async function updateViews() {
            // increment
            await fetch(`/api/views/${slug}`, {
                method: "POST",
            });

            // get latest count
            const res = await fetch(`/api/views/${slug}`);
            const data = await res.json();

            setViews(data.views);
        }

        updateViews();
    }, [slug]);

    return (
        <span className="flex items-center gap-2">
            <Eye size={14} />
            {views.toLocaleString()} views
        </span>
    );
}