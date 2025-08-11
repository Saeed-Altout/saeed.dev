import { Button } from "@/components/ui/button";
import { Stars } from "lucide-react";
import { Link } from "react-router-dom";

export function HomeHeroSection() {
  return (
    <section className="relative section">
      <div className="relative z-20 container text-center">
        <div className="flex justify-center mb-5">
          <div className="text-primary px-4 py-1.5 rounded-full flex items-center gap-2 border">
            <Stars className="size-4" aria-hidden="true" />
            <span className="text-base font-semibold tracking-wide">
              Fullstack Developer (Next.js & Nest.js)
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-foreground tracking-tight leading-tight">
          Hi, I'm <span className="text-primary">Saeed Al-Tout</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto font-light leading-relaxed">
          <span className="font-semibold text-foreground">
            Fullstack Developer specializing in{" "}
            <span className="text-primary font-semibold">Next.js</span> and{" "}
            <span className="text-primary font-semibold">React.js</span>
          </span>
          .<br className="hidden sm:block" />
          Building scalable, performant web applications with modern JavaScript
          frameworks.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
          <Link to="/projects">
            <Button size="lg" className="w-full sm:w-auto">
              View Projects
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Contact Me
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

HomeHeroSection.displayName = "HomeHeroSection";
