import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  User,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProjects } from "../../hook/use-projects";

/**
 * ProjectDetailSection - Individual project detail section.
 */
export function ProjectDetailSection({ projectId }: { projectId?: string }) {
  const { projects } = useProjects();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Project Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link to="/projects">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/projects">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Project Image */}
            <div className="lg:w-1/2">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 lg:h-96 object-cover rounded-lg"
              />
            </div>

            {/* Project Info */}
            <div className="lg:w-1/2 space-y-6">
              <div>
                <Badge variant="secondary" className="mb-4">
                  {project.category}
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  {project.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Project Meta */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {project.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{project.date}</span>
                  </div>
                )}
                {project.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{project.author}</span>
                  </div>
                )}
              </div>

              {/* Technologies */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {project.liveUrl && (
                  <Button className="flex items-center gap-2" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    asChild
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                      View Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.features?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Challenges & Solutions */}
          <Card>
            <CardHeader>
              <CardTitle>Challenges & Solutions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.challenges?.map((challenge, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Challenge {index + 1}:
                  </h4>
                  <p className="text-sm">{challenge}</p>
                  {project.solutions?.[index] && (
                    <>
                      <h4 className="font-semibold text-sm text-primary">
                        Solution:
                      </h4>
                      <p className="text-sm">{project.solutions[index]}</p>
                    </>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

ProjectDetailSection.displayName = "ProjectDetailSection";
