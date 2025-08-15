import { SEO } from "@/components/common/seo-wrapper";
import { Heading2 } from "@/components/ui/heading";
import { ProjectsSection } from "@/components/temp/projects-section";
import { PAGE_SEO } from "@/constants/seo";

export function ProjectsPage() {
  return (
    <>
      <SEO {...PAGE_SEO.projects} />
      <section className="section">
        <div className="container flex flex-col gap-6">
          <Heading2
            title="Projects"
            description="Explore some of the projects I've worked on, showcasing a diverse range of technologies, problem-solving approaches, and real-world applications."
          />
          <ProjectsSection searchable={true} />
        </div>
      </section>
    </>
  );
}
