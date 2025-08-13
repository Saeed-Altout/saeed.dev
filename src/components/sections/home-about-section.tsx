import { ABOUT } from "@/constants/images";
import { content } from "@/content";

export function HomeAboutSection() {
  const { title, description, description2 } = content.home.about;

  return (
    <section className="section">
      <div className="container grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-6">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-2 text-foreground">
              {title}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-muted-foreground mb-4">
              {description}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              {description2}
            </p>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <img
            src={ABOUT}
            alt="About illustration"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </section>
  );
}
