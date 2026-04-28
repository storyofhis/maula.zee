import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

export type BlogPost = {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  content: string;
};

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(contentDirectory)) return [];
  
  const fileNames = fs.readdirSync(contentDirectory);
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || '',
        readTime: data.readTime || '',
        tags: data.tags || [],
      };
    });

  // Sort posts by date (basic sort, assuming matching string formats or just leaving it for now)
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

// For compatibility with the existing page list
export const DUMMY_POSTS = getAllPosts();
