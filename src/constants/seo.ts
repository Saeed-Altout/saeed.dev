export const DEFAULT_SEO = {
  title: "Saeed Al-Tout - Full Stack Developer",
  description:
    "Passionate Full Stack Developer with expertise in React, Node.js, and modern web technologies. Building scalable, performant web applications.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Portfolio",
    "Saeed Al-Tout",
  ],
  author: "Saeed Al-Tout",
  image: "/og-image.jpg",
  url: "https://saeedaltout.com",
  type: "website" as const,
  twitterCard: "summary_large_image" as const,
};

export const PAGE_SEO = {
  home: {
    title: "Saeed Al-Tout - Full Stack Developer",
    description:
      "Welcome to my portfolio! I'm a passionate Full Stack Developer specializing in React, Node.js, and modern web technologies. Explore my projects and experience.",
    keywords: [
      "Portfolio",
      "Home",
      "Welcome",
      "Full Stack Developer",
      "React",
      "Node.js",
    ],
    type: "website" as const,
  },

  about: {
    title: "About Me - Saeed Al-Tout",
    description:
      "Learn more about my background, experience, and journey as a Full Stack Developer. Discover my skills, values, and what drives me in technology.",
    keywords: [
      "About",
      "Background",
      "Experience",
      "Skills",
      "Journey",
      "Full Stack Developer",
    ],
    type: "profile" as const,
  },

  projects: {
    title: "Projects - Saeed Al-Tout",
    description:
      "Explore my featured projects showcasing expertise in React, Node.js, and modern web development. See real-world applications and problem-solving approaches.",
    keywords: [
      "Projects",
      "Portfolio",
      "React",
      "Node.js",
      "Web Applications",
      "Case Studies",
    ],
    type: "website" as const,
  },

  experience: {
    title: "Experience - Saeed Al-Tout",
    description:
      "My professional journey and work experience in software development. Timeline of achievements, technologies used, and career progression.",
    keywords: [
      "Experience",
      "Work History",
      "Career",
      "Professional Journey",
      "Achievements",
    ],
    type: "profile" as const,
  },

  contact: {
    title: "Contact - Saeed Al-Tout",
    description:
      "Get in touch with me for collaboration opportunities, project discussions, or any inquiries. Let's work together on your next project!",
    keywords: [
      "Contact",
      "Get In Touch",
      "Collaboration",
      "Project Discussion",
      "Inquiry",
    ],
    type: "website" as const,
  },

  blog: {
    title: "Blog - Saeed Al-Tout",
    description:
      "Technical articles, insights, and thoughts on web development, React, Node.js, and modern software development practices.",
    keywords: [
      "Blog",
      "Articles",
      "Technical Writing",
      "Web Development",
      "React",
      "Node.js",
    ],
    type: "website" as const,
  },

  privacy: {
    title: "Privacy Policy - Saeed Al-Tout",
    description:
      "Privacy policy and data protection information for my portfolio website. Learn how your data is collected, used, and protected.",
    keywords: ["Privacy Policy", "Data Protection", "Legal", "Terms"],
    type: "website" as const,
    noIndex: true,
  },

  terms: {
    title: "Terms of Service - Saeed Al-Tout",
    description:
      "Terms of service and usage conditions for my portfolio website. Important information about using this site and its content.",
    keywords: ["Terms of Service", "Legal", "Usage Conditions", "Terms"],
    type: "website" as const,
    noIndex: true,
  },
};

export const PROJECT_SEO = {
  title: (projectName: string) => `${projectName} - Project | Saeed Al-Tout`,
  description: (projectName: string, brief: string) =>
    `${projectName}: ${brief}. Explore this project built with modern web technologies. View live demo, source code, and technical details.`,
  keywords: (technologies: string[]) => [
    "Project",
    "Case Study",
    "Web Application",
    "Portfolio",
    ...technologies,
  ],
  type: "article" as const,
};

export const BLOG_SEO = {
  title: (postTitle: string) => `${postTitle} - Blog | Saeed Al-Tout`,
  description: (excerpt: string) =>
    `${excerpt}. Read this technical article about web development, React, Node.js, and modern software development practices.`,
  keywords: (tags: string[]) => [
    "Blog Post",
    "Technical Article",
    "Web Development",
    "React",
    "Node.js",
    ...tags,
  ],
  type: "article" as const,
};
