import { Button } from "@/components/ui/button";
import { Stars } from "lucide-react";

/**
 * Hero section for personal portfolio.
 */
export function Hero() {
  return (
    <section
      className="relative py-12 sm:py-16 md:py-20 px-4 bg-background overflow-hidden min-h-[calc(100vh-65px)] flex items-center justify-center border-b border-border/40"
      aria-label="Hero section"
    >
      <div className="relative z-20 container mx-auto text-center max-w-4xl px-4">
        <div className="flex justify-center mb-5">
          <div className="text-primary px-4 py-1.5 rounded-full flex items-center gap-2 border">
            <Stars className="size-4" aria-hidden="true" />
            <span className="text-base font-semibold tracking-wide">
              Full Stack & AI Solutions at Flexify
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-foreground tracking-tight leading-tight">
          Hi, I'm <span className="text-primary">Saeed Al-Tout</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto font-light leading-relaxed">
          <span className="font-semibold text-foreground">
            Full Stack & AI Developer
          </span>{" "}
          crafting robust web applications and intelligent solutions.
          <br className="hidden sm:block" />
          Passionate about{" "}
          <span className="text-primary font-semibold">
            React, Next, and NodeJS
          </span>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
          <Button
            size="lg"
            className="text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-6 font-medium"
          >
            <a href="/projects" aria-label="View my projects">
              View Projects
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-6 font-medium border-border text-foreground bg-background hover:bg-muted"
          >
            <a href="/contact" aria-label="Contact me">
              Contact Me
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

Hero.displayName = "Hero";
