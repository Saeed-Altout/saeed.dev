import {
  User,
  Layers,
  Briefcase,
  FileText,
  CodeIcon,
  DatabaseIcon,
  ServerIcon,
  type LucideIcon,
} from "lucide-react";

export const portfolioSections: {
  title: string;
  href: string;
  description: string;
  icon?: LucideIcon;
}[] = [
  {
    title: "About",
    href: "/about",
    description: "Learn more about me, my background, and my journey.",
    icon: User,
  },
  {
    title: "Projects",
    href: "/projects",
    description: "Explore my featured and open source projects.",
    icon: Layers,
  },
  {
    title: "Experience",
    href: "/experience",
    description: "A timeline of my professional and academic experience.",
    icon: Briefcase,
  },
  {
    title: "Blog",
    href: "/blogs",
    description: "Read my latest articles and technical write-ups.",
    icon: FileText,
  },
];

export const features: {
  title: string;
  description: string;
  icon?: LucideIcon;
}[] = [
  {
    title: "Frontend Development",
    description:
      "Build responsive, interactive user interfaces with React, Vue, Angular, and modern CSS frameworks.",
    icon: CodeIcon,
  },
  {
    title: "Backend Development",
    description:
      "Create robust APIs and server-side applications with Node.js, Python, Java, and database management.",
    icon: ServerIcon,
  },
  {
    title: "Database Design",
    description:
      "Design and optimize databases with SQL, NoSQL, and cloud database solutions for scalable applications.",
    icon: DatabaseIcon,
  },
  {
    title: "API Development",
    description:
      "Build RESTful and GraphQL APIs with authentication, validation, and comprehensive documentation.",
  },
  {
    title: "Performance Optimization",
    description:
      "Optimize applications for speed, scalability, and user experience across all platforms and devices.",
  },
  {
    title: "Security Implementation",
    description:
      "Implement authentication, authorization, data encryption, and security best practices throughout the stack.",
  },
  {
    title: "Testing & Quality Assurance",
    description:
      "Write unit tests, integration tests, and end-to-end tests to ensure code quality and reliability.",
  },
  {
    title: "Fullstack Portfolio",
    description:
      "Showcase complete projects demonstrating end-to-end development from concept to deployment.",
  },
  {
    title: "Modern Development Tools",
    description:
      "Master Git, VS Code, debugging tools, and modern development workflows for efficient coding.",
  },
];

export const subjects = [
  "General Inquiry",
  "Project Collaboration",
  "Job Opportunity",
  "Other",
];
