import {
  CodeIcon,
  ServerIcon,
  DatabaseIcon,
  ServerCogIcon,
  BugIcon,
  Layers,
} from "lucide-react";

export const content = {
  home: {
    hero: {
      badgeText: "Fullstack Developer",
      heading: "Hi, I'm Saeed Al-Tout",
      specialization: "Fullstack Developer specializing in ",
      tech1: "React.js",
      tech2: "Nest.js",
      description:
        "Building scalable, performant web applications with modern JavaScript frameworks.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
    },
    about: {
      title: "Saeed Al-Tout",
      description: "Fullstack Developer | React.js & Nest.js",
      description2:
        "I build scalable web applications with React.js and Nest.js. Focused on clean code, performance, and delivering business value.",
    },
    contact: {
      title: "Contact Me",
      description: "Get in touch with me to discuss your project or inquiry.",
    },
    projects: {
      title: "Featured Projects",
      description:
        "Explore some of the projects I've worked on, showcasing a diverse range of technologies, problem-solving approaches, and real-world applications.",
      viewAllProjects: "View All Projects",
    },
    whatFlexify: {
      title: "What's in Fullstack Development?",
      description: "Everything you need to build great products on the web.",
      features: [
        {
          title: "Frontend Development",
          description:
            "Build responsive, interactive user interfaces with React, Vue, Angular, and modern CSS frameworks.",
          icon: CodeIcon,
        },
        {
          title: "Backend Development",
          description:
            "Build scalable, secure, and efficient server-side applications with Node.js, Express, and Nest.js.",
          icon: ServerIcon,
        },
        {
          title: "Database Management",
          description:
            "Design and manage relational and NoSQL databases with PostgreSQL, MySQL, MongoDB, and Redis.",
          icon: DatabaseIcon,
        },
        {
          title: "API Development",
          description:
            "Design and implement RESTful and GraphQL APIs with Nest.js, Express, and Prisma.",
          icon: ServerCogIcon,
        },
        {
          title: "DevOps & Infrastructure",
          description:
            "Set up and manage cloud infrastructure with AWS, Azure, and Google Cloud Platform.",
          icon: Layers,
        },
        {
          title: "Testing & Debugging",
          description:
            "Write unit and integration tests with Jest, Mocha, and Playwright.",
          icon: BugIcon,
        },
      ],
    },
  },
};
