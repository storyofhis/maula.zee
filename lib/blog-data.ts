import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    readTime: string;
    content: string;
}

export function getAllPosts(): BlogPost[] {
    const files = fs.readdirSync(postsDirectory);

    return files.map((fileName) => {
        const slug = fileName.replace(".md", "");

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const { data, content } = matter(fileContents);

        return {
            slug,
            content,
            title: data.title,
            description: data.description,
            date: data.date,
            tags: data.tags || [],
            readTime: data.readTime,
        };
    });
}

export function getPostBySlug(slug: string): BlogPost | null {
    const posts = getAllPosts();

    const post = posts.find((post) => post.slug === slug);

    return post || null;
}