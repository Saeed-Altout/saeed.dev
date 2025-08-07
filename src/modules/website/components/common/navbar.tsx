import * as React from "react";
import { Link } from "react-router-dom";

import {
  Github,
  Mail,
  User,
  Briefcase,
  FileText,
  Layers,
  Menu,
  LogIn,
  Download,
  Home,
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

import { Logo } from "./logo";
import { AuthDialog } from "../auth-dialog";
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
    href: "/blogs",
    description: "Read my latest articles and technical write-ups.",
    icon: <FileText className="w-4 h-4" />,
  },
];

export function Navbar() {
  const [authDialogOpen, setAuthDialogOpen] = React.useState(false);

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
    <>
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo/Home */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {/* Portfolio Dropdown */}
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
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button size="sm" onClick={handleDownloadCV}>
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
            <Button variant="outline" size="sm" onClick={handleGitHubClick}>
              <Github className="w-4 h-4" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAuthDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Sign In
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
                  {/* Home */}
                  <Link
                    to="/"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Home</div>
                      <div className="text-xs text-muted-foreground">
                        Back to homepage
                      </div>
                    </div>
                  </Link>

                  {/* Portfolio Sections */}
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

                  {/* Contact */}
                  <Link
                    to="/contact"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Contact</div>
                      <div className="text-xs text-muted-foreground">
                        Get in touch with me
                      </div>
                    </div>
                  </Link>

                  {/* Mobile CV Download Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadCV}
                    className="flex items-center gap-2 mt-4"
                  >
                    <Download className="w-4 h-4" />
                    Download CV
                  </Button>

                  {/* Mobile GitHub Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGitHubClick}
                    className="flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </Button>

                  {/* Mobile Auth Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAuthDialogOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Auth Dialog */}
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
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
