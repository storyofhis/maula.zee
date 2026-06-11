import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  tags: string[];
  year: string;
  role: string;
  timeline: string;
  metric?: string;
  status: "Live" | "WIP" | "Archived";
  github?: string;
  url?: string;
  content: string;
}

export function getAllCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(projectsDirectory)) return [];
  const files = fs.readdirSync(projectsDirectory).filter((f) => f.endsWith(".md"));
  return files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      content,
      title: data.title,
      tagline: data.tagline,
      tags: data.tags || [],
      year: data.year,
      role: data.role,
      timeline: data.timeline,
      metric: data.metric,
      status: data.status,
      github: data.github,
      url: data.url,
    };
  });
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  return getAllCaseStudies().find((s) => s.slug === slug) ?? null;
}
