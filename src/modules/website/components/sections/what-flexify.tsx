import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CodeIcon, DatabaseIcon, ServerIcon } from "lucide-react";

/**
 * WhatFlexify section - Inspired by the "What's in Next.js?" grid.
 * Uses shadcn/ui Card components and Tailwind for layout and styling.
 * Displays a grid of fullstack developer skills and capabilities.
 */
export function WhatFlexify() {
  // Data for each feature card
  const features: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  }[] = [
    {
      title: "Frontend Development",
      description:
        "Build responsive, interactive user interfaces with React, Vue, Angular, and modern CSS frameworks.",
      icon: <CodeIcon className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />,
    },
    {
      title: "Backend Development",
      description:
        "Create robust APIs and server-side applications with Node.js, Python, Java, and database management.",
      icon: (
        <ServerIcon className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
      ),
    },
    {
      title: "Database Design",
      description:
        "Design and optimize databases with SQL, NoSQL, and cloud database solutions for scalable applications.",
      icon: (
        <DatabaseIcon className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
      ),
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

  return (
    <section className="w-full py-12 sm:py-16 border-b border-border/40">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-2">
          What's in Fullstack Development?
        </h2>
        <p className="text-base sm:text-lg text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto">
          Everything you need to build great products on the web.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-background hover:border-foreground/20 transition-colors"
            >
              <CardHeader className="pb-3">
                {feature.icon && <div className="mb-3">{feature.icon}</div>}
                <CardTitle className="text-foreground text-base sm:text-lg font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

WhatFlexify.displayName = "WhatFlexify";
