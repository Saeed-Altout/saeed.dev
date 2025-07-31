import * as React from "react";
import { Link } from "react-router-dom";

import {
  Search,
  Github,
  Mail,
  User,
  Briefcase,
  FileText,
  Layers,
  Menu,
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Logo } from "./logo";

/**
 * Navigation items for the portfolio.
 * Each item represents a main section of the portfolio.
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
    icon: <User className="w-4 h-4" />,
  },
  {
    title: "Projects",
    href: "/projects",
    description: "Explore my featured and open source projects.",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    title: "Experience",
    href: "/experience",
    description: "A timeline of my professional and academic experience.",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Read my latest articles and technical write-ups.",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Get in touch with me for collaboration or questions.",
    icon: <Mail className="w-4 h-4" />,
  },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Portfolio</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 w-[400px] lg:w-[500px] lg:grid-cols-2 p-4">
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
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/projects">Projects</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/experience">Experience</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/blog">Blog</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
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
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search portfolio..." className="pl-10 w-64" />
          </div>

          <Button size="sm">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Download CV
            </a>
          </Button>
          <Button variant="outline" size="sm">
            <Github className="w-4 h-4" />
            <span className="sr-only">GitHub</span>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col space-y-2 px-4">
                {portfolioSections.map((section) => (
                  <Link
                    key={section.title}
                    to={section.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {section.icon}
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {section.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
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
        <Link
          to={href}
          className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
        >
          {icon && <div className="mt-0.5">{icon}</div>}
          <div>
            <div className="text-sm leading-none font-medium">{title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug mt-1">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
ListItem.displayName = "ListItem";
