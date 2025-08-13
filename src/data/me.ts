import { Building2, CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import type { Me } from "@/types";

const skills: Me["skills"] = [
  {
    name: "React",
    category: "Frontend",
    description: "React is a JavaScript library for building user interfaces.",
    percentage: 90,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    category: "Frontend",
    description:
      "Next.js is a React framework for building server-side rendered applications.",
    percentage: 80,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Node.js",
    category: "Backend",
    description:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    percentage: 70,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "MongoDB",
    category: "Database",
    description:
      "MongoDB is a NoSQL database that uses JSON-like documents with schemas.",
    percentage: 60,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Express",
    category: "Backend",
    description: "Express is a web application framework for Node.js.",
    percentage: 50,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    description:
      "Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.",
    percentage: 40,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    description:
      "TypeScript is a superset of JavaScript that adds static typing.",
    percentage: 30,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Python",
    category: "Backend",
    description:
      "Python is a versatile programming language that is used for web development, data analysis, and artificial intelligence.",
    percentage: 20,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
];

const bio =
  "I'm a passionate Full Stack Developer with over 5 years of experience crafting innovative web applications and intelligent solutions. My journey in technology began with a curiosity for building things that make a difference. /// At Flexify, I lead development teams in creating robust, scalable applications that combine cutting-edge technologies with exceptional user experiences. I specialize in React, Next.js, Node.js, and AI/ML integration. /// When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in continuous learning and pushing the boundaries of what's possible.";

const projects: Me["projects"] = [
  {
    name: "Flexify",
    description:
      "Flexify is a platform for creating and managing your projects.",
    logo: "https://flexify-eta.vercel.app/logo.png",
    cover: "https://flexify-eta.vercel.app/logo.png",
    github: "https://github.com/Saeed-Altout/flexify",
    demo: "https://flexify-eta.vercel.app/",
    technologies: ["React", "Prisma", "Tailwind CSS", "TypeScript", "Node.js"],
    features: ["Create and manage your projects"],
    isActive: true,
    isFeatured: true,
  },
];

const values: Me["values"] = [
  {
    name: "Clean Code",
    description: "Writing maintainable, readable, and efficient code",
  },
  {
    name: "User Experience",
    description: "Creating intuitive and delightful user interfaces",
  },
  {
    name: "Innovation",
    description: "Embracing new technologies and creative solutions",
  },
  {
    name: "Teamwork",
    description: "Working together to achieve common goals",
  },
  {
    name: "Communication",
    description: "Effective communication with clients and team members",
  },
];

const details: Me["details"] = [
  {
    name: "Location",
    value: "Syria, Rif-Damascus, Douma",
    icon: MapPin,
  },
  {
    name: "Email",
    value: "saeedaltoutpro@gmail.com",
    icon: Mail,
  },
  {
    name: "Phone",
    value: "+96340043810",
    icon: Phone,
  },
  {
    name: "Address",
    value: "Al-Arab Street, Douma",
    icon: Building2,
  },
  {
    name: "Experience Year",
    value: "+4 Years",
    icon: CalendarDays,
  },
];

const experiences: Me["experiences"] = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    company: "Flexify",
    location: "Dubai, UAE",
    period: "2022 - Present",
    description:
      "Leading development teams in creating innovative web applications and AI-powered solutions.",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Python",
      "AI/ML",
    ],
    achievements: [
      "Led development of 10+ client projects with 99.9% client satisfaction",
      "Implemented AI/ML features that improved user engagement by 40%",
      "Mentored 5 junior developers and established best practices",
    ],
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "TechCorp",
    location: "Dubai, UAE",
    period: "2020 - 2022",
    description:
      "Developed scalable web applications and microservices for enterprise clients.",
    technologies: ["React", "Node.js", "MongoDB", "Docker", "AWS"],
    achievements: [
      "Built 15+ production applications serving 100K+ users",
      "Reduced deployment time by 60% through CI/CD optimization",
      "Improved application performance by 50% through optimization",
    ],
  },
  {
    id: "3",
    title: "Frontend Developer",
    company: "WebSolutions",
    location: "Dubai, UAE",
    period: "2019 - 2020",
    description:
      "Created responsive and interactive user interfaces for various web applications.",
    technologies: ["React", "Vue.js", "JavaScript", "CSS3", "HTML5"],
    achievements: [
      "Developed 20+ responsive websites and web applications",
      "Improved user experience scores by 35%",
      "Collaborated with design team to implement pixel-perfect designs",
    ],
  },
];

export const me: Me = {
  name: "Saeed Noman Al-Tout",
  firstName: "Saeed",
  lastName: "Al-Tout",
  website: "https://flexify-eta.vercel.app/",
  linkedin:
    "https://www.linkedin.com/in/saeed-altout-16118b343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  github: "https://github.com/Saeed-Altout",
  facebook: "https://www.facebook.com/saeed.altout.587",
  bio: bio,
  skills: skills,
  projects: projects,
  position: "Full Stack Developer",
  expertise: ["React", "Next.js", "Node.js"],
  values: values,
  details: details,
  experiences: experiences,
};
