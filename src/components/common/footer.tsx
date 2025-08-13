import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              Building innovative web experiences with modern technologies.
              Creating digital solutions that make a difference.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">
              Portfolio
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Link to="/about">About</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Link to="/projects">Projects</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Link to="/experience">Experience</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Link to="/blogs">Blog</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Link to="/contact">Contact</Link>
                </Button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Link to="/projects">Web Development</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Link to="/projects">UI/UX Design</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Link to="/contact">Consulting</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Link to="/contact">Training</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Link to="/contact">Maintenance</Link>
                </Button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-semibold text-sm mb-4 text-foreground">
              Stay Updated
            </h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              Get notified about new projects, tech insights, and industry
              updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="you@domain.com"
                className="flex-1"
                type="email"
              />
              <Button size="sm" className="sm:w-auto">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2025 Flexify</span>
              <span>•</span>
              <span>Powered by</span>
              <Zap className="h-3 w-3" />
              <span>saeed altout</span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <Button
                variant="link"
                className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
              >
                <Link to="/terms">Terms</Link>
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
              >
                <Link to="/privacy">Privacy</Link>
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="link"
                className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <a
                  href="https://github.com/Saeed-Altout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <a href="mailto:contact@flexify.dev">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="flex-shrink-0">
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.displayName = "Footer";
