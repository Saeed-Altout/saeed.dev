import { Heading2 } from "@/components/ui/heading";
import { ProjectsSection } from "@/components/sections/projects-section";

export default function ProjectsPage() {
  return (
    <section className="section">
      <div className="container flex flex-col gap-6">
        <Heading2
          title="Projects"
          description="Explore some of the projects I've worked on, showcasing a diverse range of technologies, problem-solving approaches, and real-world applications."
        />
        <ProjectsSection searchable={true} />
      </div>
    </section>
  );
}
