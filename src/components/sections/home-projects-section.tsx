import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Heading2 } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ProjectsSection } from "@/components/temp/projects-section";
import { content } from "@/content";

export function HomeProjectsSection() {
  const navigate = useNavigate();
  const { title, description, viewAllProjects } = content.home.projects;
  return (
    <section className="section">
      <div className="container flex flex-col gap-6">
        <Heading2 title={title} description={description} />
        <ProjectsSection featured={true} />
        <div className="flex justify-center">
          <Button onClick={() => navigate("/projects")}>
            {viewAllProjects}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
