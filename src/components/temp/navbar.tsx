import * as React from "react";
import { Link } from "react-router-dom";

import {
  Search,
  Github,
  User,
  Briefcase,
  FileText,
  Layers,
  Download,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Logo } from "./common/logo";
import { downloadFile } from "@/lib/utils";

/**
 * Portfolio sections for the dropdown menu.
 * These are the children of the Portfolio navigation item.
 */
const portfolioSections: {
  title: string;
  href: string;
  description: string;
  icon?: React.ReactNode;
}[] = [
  {
    title: "About",
    href: "/about",
    description: "Learn more about me, my background, and my journey.",
    icon: <User className="w-4 h-4 mr-2" />,
  },
  {
    title: "Projects",
    href: "/projects",
    description: "Explore my featured and open source projects.",
    icon: <Layers className="w-4 h-4 mr-2" />,
  },
  {
    title: "Experience",
    href: "/experience",
    description: "A timeline of my professional and academic experience.",
    icon: <Briefcase className="w-4 h-4 mr-2" />,
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Read my latest articles and technical write-ups.",
    icon: <FileText className="w-4 h-4 mr-2" />,
  },
];

export function Navbar() {
  const handleDownloadCV = () => {
    // Path to the CV file in the public directory
    const cvPath = "/cv.pdf";
    downloadFile(cvPath, "Saeed_Al-Tout_CV.pdf");
  };

  const handleGitHubClick = () => {
    window.open(
      "https://github.com/Saeed-Altout",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <NavigationMenu viewport={false}>
          {/* Logo/Home */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          <NavigationMenuList>
            {/* Portfolio Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Portfolio</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  {portfolioSections.map((section) => (
                    <ListItem
                      key={section.title}
                      title={section.title}
                      href={section.href}
                      icon={section.icon}
                    >
                      {section.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Contact */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search portfolio..." className="pl-10 w-64" />
          </div>

          <Button onClick={handleDownloadCV}>
            <Download className="w-4 h-4 mr-2" />
            Download CV
          </Button>
          <Button variant="outline" onClick={handleGitHubClick}>
            <Github className="w-4 h-4" />
            <span className="hidden md:block sr-only">GitHub</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
Navbar.displayName = "Navbar";

/**
 * ListItem component for navigation menu.
 * Accepts an optional icon for better visual context.
 */
type ListItemProps = React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  title: string;
  icon?: React.ReactNode;
};

function ListItem({ title, children, href, icon, ...props }: ListItemProps) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href} className="flex items-start gap-2">
          {icon}
          <div>
            <div className="text-sm leading-none font-medium">{title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
ListItem.displayName = "ListItem";
