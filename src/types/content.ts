export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export interface HeroContent {
  name: string;
  roles: string[];
  tagline: string;
  resumeUrl?: string;
  avatarUrl?: string;
  social: SocialLinks;
}

export interface AboutContent {
  bio: string[];
  highlights: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string;
  proficiency: number; // 0-100
  order: number;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string; // "" or "Present"
  description: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: number;
  read: boolean;
}
