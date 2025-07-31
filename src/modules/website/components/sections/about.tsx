import { ABOUT } from "@/constants/images";

/**
 * About section with left (text) and right (image) layout.
 * The left side contains a heading, position, and a description about you.
 * The right side displays a themed image.
 */
export function About() {
  return (
    <section className="grid min-h-svh lg:grid-cols-2 border-b border-border/40">
      {/* Left Side: About Text */}
      <div className="flex flex-col justify-center gap-6 p-6 sm:p-8 md:p-12 lg:p-16">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-foreground leading-tight">
            Hi, I'm <span className="text-primary">Saeed Al-Tout</span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-muted-foreground mb-4">
            Fullstack & AI Developer
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Passionate about building scalable web applications and intelligent
            AI solutions. With a strong background in React, Django, FastAPI,
            and modern ML/DL techniques, I love solving real-world problems and
            delivering high-quality products.
            <br />
            <br />I enjoy collaborating with teams, mentoring junior developers,
            and continuously learning new technologies. Let's create something
            amazing together!
          </p>
        </div>
      </div>
      {/* Right Side: Image */}
      <div className="bg-muted relative hidden lg:block">
        <img
          src={ABOUT}
          alt="About illustration"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </section>
  );
}

About.displayName = "About";
