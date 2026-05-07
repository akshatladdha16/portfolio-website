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
  resumeUrl: "https://drive.google.com/file/d/1ij4aUSP3eyelXvOKdZQdp36Xogxhk0jp/view?usp=sharing",
  email: "laddhaakshatrai@gmail.com",
  socials: {
    github: "https://github.com/akshatladdha16",
    linkedin: "https://www.linkedin.com/in/akshat-rai-laddha-8905a0189/",
    twitter: "https://x.com/AkshatRaiLaddh1",
    medium: "https://medium.com/@laddhaakshatrai",
    email: "laddhaakshatrai@gmail.com",
  },
  projects: [
    {
  id: "project-01",
  title: "Mediroute",
  shortDescription: "Multi-Agent Query Management system usign Ringgai for healthcare providers",
  fullDescription: "Attempt to build a multi agent system with ringg ai, with 6 agents connected by an external system with context and session continuity using custom arg values to be passed btw agents. Event subscription for webhook intergation with the system",
  youtubeUrl: "https://youtu.be/Gk-1_XiDD9I", // or watch/embed link
  tags: ["Next.js", "TypeScript", "Voice Agents", "Event Handling","Ringg AI"],
  links: {
    github: "https://github.com/akshatladdha16/Mediroute-Multi-Voice-Agent-for-Hospitals", // optional
    live: "https://youtu.be/Gk-1_XiDD9I",         // optional
  },
},
{
  id: "project-02",
  title: "Fine-tuned LLaMA 3.2 3B on Chemistry QnAs",
  shortDescription: "1–2 line summary shown on card",
  fullDescription: "Fine-tuned LLaMA-3.2 3B on NCERT 12th Chemistry question and answers dataset using PEFT-QLoRA technique (4-bit quantization) on a 4GB consumer GPU (RTX 3050), and deployed lightweight adapters to Hugging Face for plug-and-play integration with compatible base LLMs.",
  youtubeUrl: "https://youtu.be/VIDEO_ID", // or watch/embed link
  tags: ["Next.js", "TypeScript", "AI"],
  links: {
    github: "https://github.com/you/repo", // optional
    live: "https://your-demo.com",         // optional
  },
}
  ],
  blogs: [
    {
  id: "unique-blog-id",
  title: "Blog title",
  excerpt: "Short summary shown on the blog card",
  mediumUrl: "https://medium.com/@yourhandle/your-post-slug",
  tags: ["AI", "System Design", "Next.js"],
  publishedDate: "2026-05-07", // use ISO format YYYY-MM-DD
},
{
  id: "unique-blog-id2",
  title: "Blog title",
  excerpt: "Short summary shown on the blog card",
  mediumUrl: "https://medium.com/@yourhandle/your-post-slug",
  tags: ["AI", "System Design", "Next.js"],
  publishedDate: "2026-05-07", // use ISO format YYYY-MM-DD
}
  ],
};
