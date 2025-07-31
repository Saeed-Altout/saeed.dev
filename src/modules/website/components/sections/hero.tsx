import { Button } from "@/components/ui/button";

/**
 * Hero section for personal portfolio.
 */
export function Hero() {
  return (
    <section
      className="relative py-20 px-4 bg-background overflow-hidden min-h-[calc(100vh-65px)] flex items-center justify-center border-b border-border/40"
      aria-label="Hero section"
    >
      <div className="relative z-20 container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white tracking-tight">
          Hi, I'm <span className="text-primary">Saeed Al-Tout</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-light">
          <span className="font-semibold text-white">
            Full Stack & AI Developer
          </span>{" "}
          crafting robust web applications and intelligent solutions.
          <br />
          Passionate about{" "}
          <span className="text-primary font-semibold">
            React, Next, and NodeJS
          </span>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            size="lg"
            className="text-base md:text-lg px-8 py-6 font-medium"
          >
            <a href="/projects" aria-label="View my projects">
              View Projects
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base md:text-lg px-8 py-6 font-medium border-white/20 text-white bg-white/5 hover:bg-white/10"
          >
            <a href="/contact" aria-label="Contact me">
              Contact Me
            </a>
          </Button>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 inline-block mt-2">
          <code className="text-sm text-white/80">
            {/* You can put a fun tagline or a command here */}
            {"// Let's build something amazing together!"}
          </code>
        </div>
      </div>
    </section>
  );
}

Hero.displayName = "Hero";
