import type {
  AboutContent,
  ExperienceItem,
  HeroContent,
  Project,
  Skill,
} from "@/types/content";

export const placeholderHero: HeroContent = {
  name: "Mallikarjun Rangu",
  roles: [
    "Full Stack Developer",
    "MERN Stack Engineer",
    "Cloud & DevOps Enthusiast",
    "Cybersecurity Grad Student",
  ],
  tagline:
    "Full Stack Developer with 5+ years building scalable MERN applications across payroll, HR, and retail systems — from database design to secure, polished user experiences.",
  resumeUrl: "",
  avatarUrl: "",
  social: {
    github: "https://github.com/rangumallikarjun",
    linkedin: "",
    twitter: "",
    email: "mailto:mallikrangu@gmail.com",
  },
};

export const placeholderAbout: AboutContent = {
  bio: [
    "I'm a Full Stack Developer with 5+ years of experience designing, developing, and maintaining scalable web applications using the MERN stack (MongoDB, Express.js, React.js, and Node.js).",
    "I've built enterprise solutions across payroll, HR, retail order management, and business operations — with a focus on responsive frontend development, RESTful API design, database optimization, authentication, and cloud deployment.",
    "Currently pursuing an MS in Cybersecurity at UNC Charlotte, I bring a security-first mindset to everything I build: secure coding practices, OWASP Top 10 awareness, and a strong focus on writing clean, maintainable, high-performance code.",
  ],
  highlights: [
    "5+ years building production MERN stack applications",
    "Enterprise experience: payroll, HR, and retail order management systems",
    "MS in Cybersecurity @ UNC Charlotte (GPA 3.70/4.0)",
    "CompTIA Security+ certified",
  ],
};

export const placeholderSkills: Skill[] = [
  { id: "react", name: "React.js", category: "Frontend", icon: "SiReact", proficiency: 92, order: 0 },
  { id: "javascript", name: "JavaScript (ES6+)", category: "Frontend", icon: "SiJavascript", proficiency: 90, order: 1 },
  { id: "typescript", name: "TypeScript", category: "Frontend", icon: "SiTypescript", proficiency: 82, order: 2 },
  { id: "redux", name: "Redux Toolkit", category: "Frontend", icon: "SiRedux", proficiency: 80, order: 3 },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", icon: "SiTailwindcss", proficiency: 88, order: 4 },
  { id: "mui", name: "Material UI", category: "Frontend", icon: "SiMui", proficiency: 78, order: 5 },

  { id: "node", name: "Node.js", category: "Backend", icon: "SiNodedotjs", proficiency: 88, order: 6 },
  { id: "express", name: "Express.js", category: "Backend", icon: "SiExpress", proficiency: 86, order: 7 },
  { id: "jwt", name: "JWT Authentication", category: "Backend", icon: "SiJsonwebtokens", proficiency: 85, order: 8 },

  { id: "mongodb", name: "MongoDB", category: "Databases", icon: "SiMongodb", proficiency: 85, order: 9 },
  { id: "mysql", name: "MySQL", category: "Databases", icon: "SiMysql", proficiency: 80, order: 10 },
  { id: "postgres", name: "PostgreSQL", category: "Databases", icon: "SiPostgresql", proficiency: 75, order: 11 },

  { id: "aws", name: "AWS", category: "Cloud & DevOps", icon: "SiAmazonaws", proficiency: 82, order: 12 },
  { id: "docker", name: "Docker", category: "Cloud & DevOps", icon: "SiDocker", proficiency: 75, order: 13 },
  { id: "linux", name: "Linux", category: "Cloud & DevOps", icon: "SiLinux", proficiency: 80, order: 14 },
  { id: "githubactions", name: "GitHub Actions", category: "Cloud & DevOps", icon: "SiGithubactions", proficiency: 78, order: 15 },
  { id: "git", name: "Git", category: "Cloud & DevOps", icon: "SiGit", proficiency: 90, order: 16 },

  { id: "jest", name: "Jest", category: "Tools & Testing", icon: "SiJest", proficiency: 78, order: 17 },
  { id: "postman", name: "Postman", category: "Tools & Testing", icon: "SiPostman", proficiency: 82, order: 18 },
];

export const placeholderExperience: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Paychex",
    role: "Full Stack Developer",
    startDate: "Jan 2025",
    endDate: "Present",
    description:
      "Building an enterprise-grade Payroll & HR Management System with the MERN stack — automating employee management, payroll processing, attendance tracking, and benefits administration through secure role-based dashboards. Designed optimized MongoDB aggregation pipelines (+30% reporting performance), implemented JWT auth with RBAC, cut page load time by 35%, and reduced deployment time by 40% with AWS EC2 + GitHub Actions CI/CD.",
    order: 0,
  },
  {
    id: "exp-2",
    company: "Nisum",
    role: "MERN Full Stack Developer",
    startDate: "Jan 2022",
    endDate: "May 2024",
    description:
      "Developed a scalable Retail Order Management System streamlining product catalogs, inventory tracking, order processing, and warehouse operations. Built RESTful APIs, optimized MongoDB aggregation pipelines, implemented JWT/RBAC access control, and shipped real-time dashboards for order and inventory analytics. Wrote unit/integration tests with Jest and React Testing Library, deployed on AWS EC2 with CI/CD pipelines.",
    order: 1,
  },
];

export const placeholderProjects: Project[] = [
  {
    id: "proj-1",
    title: "Hikes and Miles Tourism",
    description:
      "A fully responsive full-stack travel website with dynamic package listings, destination filtering, and booking inquiry flows, built for a real travel business. Ships with a custom admin panel (Firebase Firestore backend) that lets non-technical staff edit 8+ homepage sections in real time — banners, stats, packages, and destinations — with instant sync across users.",
    techStack: ["React", "Firebase Firestore", "Tailwind CSS", "Node.js"],
    imageUrl: "",
    liveUrl: "https://hikesandmiles1.netlify.app/",
    githubUrl: "",
    featured: true,
    order: 0,
  },
  {
    id: "proj-2",
    title: "Payroll & HR Management System",
    description:
      "Enterprise-grade Payroll & HR platform (MERN stack) automating employee management, payroll processing, attendance tracking, and benefits administration through secure role-based dashboards with JWT authentication and RBAC.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "AWS EC2"],
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    featured: true,
    order: 1,
  },
  {
    id: "proj-3",
    title: "Retail Order Management System",
    description:
      "Scalable retail platform streamlining product catalogs, inventory tracking, order processing, and warehouse operations, with real-time dashboards for order status, inventory levels, and sales trends.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "AWS EC2"],
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    order: 2,
  },
];
