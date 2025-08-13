import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Heading2 } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ProjectsSection } from "@/components/temp/projects-section";

export function HomeProjectsSection() {
  const navigate = useNavigate();

  return (
    <section className="section">
      <div className="container flex flex-col gap-6">
        <Heading2
          title="Featured Projects"
          description="Explore some of the projects I've worked on, showcasing a diverse range of technologies, problem-solving approaches, and real-world applications."
        />
        <ProjectsSection featured={true} />
        <div className="flex justify-center">
          <Button onClick={() => navigate("/projects")}>
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

HomeProjectsSection.displayName = "HomeProjectsSection";
