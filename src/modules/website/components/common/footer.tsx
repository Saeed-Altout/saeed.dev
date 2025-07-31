import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-muted-foreground text-sm">
              Building innovative web experiences with modern technologies.
              Creating digital solutions that make a difference.
            </p>
          </div>

          {/* Portfolio Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Portfolio</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#projects"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#web-development"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#ui-ux-design"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  UI/UX Design
                </a>
              </li>
              <li>
                <a
                  href="#consulting"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Consulting
                </a>
              </li>
              <li>
                <a
                  href="#training"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Training
                </a>
              </li>
              <li>
                <a
                  href="#maintenance"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Maintenance
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-sm mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get notified about new projects, tech insights, and industry
              updates.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="you@domain.com"
                className="flex-1"
                type="email"
              />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          {/* Copyright and Social Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2025 Flexify</span>
              <span>•</span>
              <span>Powered by</span>
              <Heart className="h-3 w-3 text-red-500" />
              <span>saeed altout</span>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:contact@flexify.dev"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}

Footer.displayName = "Footer";
