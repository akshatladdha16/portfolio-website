import type { Blog, Project, SocialLinks } from "@/types";

interface SiteConfig {
  name: string;
  roles: string[];
  tagline: string;
  resumeUrl: string;
  email: string;
  socials: SocialLinks;
  projects: Project[];
  blogs: Blog[];
}

export const siteConfig: SiteConfig = {
  name: "Akshat Rai Laddha",
  roles: [
    "Software Engineer",
    "AI Engineer",
    "Forward Deployed Engineer",
    "Solutions Engineer",
  ],
  tagline: "Building practical AI systems and developer-first products.",
  resumeUrl: "",
  email: "",
  socials: {
    github: "",
    linkedin: "",
    twitter: "",
    medium: "https://medium.com/@laddhaakshatrai",
    email: "",
  },
  projects: [],
  blogs: [],
};
