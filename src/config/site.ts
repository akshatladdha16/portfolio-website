import type { Blog, HeroImage, Project, SocialLinks } from "@/types";

interface SiteConfig {
  name: string;
  roles: string[];
  tagline: string;
  resumeUrl: string;
  email: string;
  socials: SocialLinks;
  heroImages: HeroImage[];
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
  tagline: "Software Engineer who can work in sales, and Sales engineer who loves to build reliable software. ",
  resumeUrl: "https://drive.google.com/file/d/1ij4aUSP3eyelXvOKdZQdp36Xogxhk0jp/view?usp=sharing",
  email: "laddhaakshatrai@gmail.com",
  socials: {
    github: "https://github.com/akshatladdha16",
    linkedin: "https://www.linkedin.com/in/akshat-rai-laddha-8905a0189/",
    twitter: "https://x.com/AkshatRaiLaddh1",
    medium: "https://medium.com/@laddhaakshatrai",
    email: "laddhaakshatrai@gmail.com",
  },
  heroImages: [
    {
      src: "/assets/20250902_145439.jpg",
      alt: "Hero image 20250902_145439",
      caption: "Self hosted LLMs , built mini cluster on mac mini",
    },
    {
      src: "/assets/20251014_181648.jpg",
      alt: "Hero image 20251014_181648",
      caption: "With Ismael Faro, VP AI Foundations Engineering at IBM Research",
    },
    {
      src: "/assets/20251017_090915.jpg",
      alt: "Hero image 20251017_090915",
      caption: "with high rise in Dubai",
    },
    {
      src: "/assets/20251017_092745.jpg",
      alt: "Hero image 20251017_092745",
      caption: "At GITEX AI Festival 2025, Dubai",
    },
    {
      src: "/assets/IMG_7596.jpeg",
      alt: "Hero image IMG_7596",
      caption: "I hike, Chandrashila trek Jan 2026",
    },
    {
      src: "/assets/IMG-20231016-WA0120.jpg",
      alt: "Hero image IMG-20231016-WA0120",
      caption: "InterNIT Silver Medalist 2024 Badminton Captain",
    },
    {
      src: "/assets/IMG-20241130-WA0032.jpg",
      alt: "Hero image IMG-20241130-WA0032",
      caption: "NITW Convocation Batch of 2024",
    },
    {
      src: "/assets/IMG-20251014-WA0057.jpg",
      alt: "Hero image IMG-20251014-WA0057",
      caption: "With Ismael Faro, explaining the next edge innovation he was working on at IBM Research",
    },
    {
      src: "/assets/IMG-20251016-WA0071.jpg",
      alt: "Hero image IMG-20251016-WA0071",
      caption: "With Managing director of a Healthcare Fortune 500 company on the sidelines of GITEX AI Festival 2025, Dubai",
    },
    {
      src: "/assets/IMG-20251025-WA0042.jpg",
      alt: "Hero image IMG-20251025-WA0042",
      caption: "GITEX AI DUBAI 2025",
    },
    {
      src: "/assets/123229.jpg",
      alt: "Hero image IMG-20251025-WA0042",
      caption: "Internal Hackathon to build Query Orchestration Engine, won 1st place in latency focused category",
    },
  ],
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
  shortDescription: "Q-LoRA Fine-tuning to build a lightweight adapter layer to replicate NCERT like question answering",
  fullDescription: "Fine-tuned LLaMA-3.2 3B on NCERT 12th Chemistry question and answers dataset using PEFT-QLoRA technique (4-bit quantization) on a 4GB consumer GPU (RTX 3050), and deployed lightweight adapters to Hugging Face for plug-and-play integration with compatible base LLMs.",
  // youtubeUrl: "https://youtu.be/VIDEO_ID", // or watch/embed link
  tags: ["Q-LoRA", "LLaMA 3.2", "Fine-tuning", "Hugging Face"],
  links: {
    github: "https://github.com/akshatladdha16/Finetuning-Llama-3.2-with-QLoRA", // optional
    live: "https://huggingface.co/akshatladdha16/Llama-3.2-3B-Chemistry-Tutor-LoRA",         // optional
  },
},
{
  id: "project-03",
  title: "Personal Resource Manager",
  shortDescription: "Running a personal resource librarian that helps me manage my resources and fetch resources when required.",
  fullDescription:
    "An AI agent that captures every resource you share—links, notes, or mixed content—stores it in Supabase with structured tags/categories, and retrieves relevant items on demand. It is designed as a project-based learning exploration of LangGraph, tool-enabled LLMs, and local-first workflows (Ollama by default, OpenAI optional).\n\nWhat It Does\n\n• Save new resources into a Supabase table with consistent columns (title, URL, notes, tags, categories).\n\n• Update existing resources by re-saving them with new metadata (e.g., add a category later).\n\n• Retrieve curated resource lists filtered by keywords or tags.\n\n• Provide a simple CLI loop for experimenting with agent behaviour.",
  // youtubeUrl: "https://youtu.be/VIDEO_ID", // or watch/embed link
  tags: ["Resource Management", "Telegram Integration", "LangGraph", "Supabase", "Openai SDK", "Ollama"],
  links: {
    github: "https://github.com/akshatladdha16/resource-manager-agent", // optional
    // live: "https://your-demo.com",         // optional
  },
},
],
  blogs: [
    {
  id: "blog-01",
  title: "Self-Hosting LLaMA 70B on Apple Silicon Hardware with Exo and MLX",
  excerpt: "Running LLMs via AWS Bedrock or other managed services is convenient, but costs can spiral quickly once you scale to many queries. We faced this problem during one of our projects and decided to experiment with a self-hosted LLM system — first for R&D, then for broader internal use.",
  mediumUrl: "https://medium.com/@laddhaakshatrai/self-hosting-llama-70b-on-apple-silicon-hardware-with-exo-and-mlx-30bb6201f04e",
  tags: ["AI", "LLaMA", "Exo", "MLX", "Apple Silicon"],
  publishedDate: "2025-09-05", // use ISO format YYYY-MM-DD
},
{
  id: "blog-02",
  title: "Kafka for E-commerce: A Practical Guide",
  excerpt: "Story of Kafka started with the utmost need of real time streaming platform. Wait what’s that? Platforms like Uber, Netflix etc. process trillions of datapoints every sec and every minute, both ingesting and exporting the data to users. But ever wondered how they engineer this requirement? They use a real-time streaming platform named Apache Kafka.",
  mediumUrl: "https://medium.com/@laddhaakshatrai/understanding-kafka-with-a-simple-e-commerce-app-fff086fa0f88",
  tags: ["Kafka", "Real-time Streaming", "E-commerce", "Data Engineering","services Communication"],
  publishedDate: "2025-09-05", // use ISO format YYYY-MM-DD
},
{
  id: "blog-03",
  title: "My Linux Root Partition Was Full at 98%, Here’s How I Fixed It Without Reinstalling",
  excerpt: "The problem? My system’s disk space was booting from the wrong partition. All my new installations, downloads, and even system updates were trying to squeeze into that tiny 21GB partition. It was like trying to fit a whole library into a single bookshelf. No wonder it was always full! I needed to redirect my system to use the larger partition for its root directory, but how? After some research and trial-and-error, I found a solution that didn’t involve reinstalling my OS or losing any data.",
  mediumUrl: "https://medium.com/@laddhaakshatrai/my-linux-root-partition-was-full-at-98-heres-how-i-fixed-it-without-reinstalling-e52dca6f3ac4",
  tags: ["Linux", "System Administration", "Data Management","Memory Management"],
  publishedDate: "2026-04-09", // use ISO format YYYY-MM-DD
},
  ],
};
