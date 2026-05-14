export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  medium: string;
  email: string;
}

export interface ProjectLinks {
  github?: string;
  live?: string;
}

export interface HeroImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  youtubeUrl?: string;
  tags: string[];
  links: ProjectLinks;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  mediumUrl: string;
  tags: string[];
  publishedDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
}
