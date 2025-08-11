import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Github, Globe, Lock, Share } from "lucide-react";

import { Heading, Heading2 } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetProjectByIdQuery } from "@/lib/dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate(`/projects`);
    }
  }, [id, navigate]);

  const { data: project, isLoading } = useGetProjectByIdQuery(id!);

  const handleShare = async () => {
    const shareData = {
      title: project?.data?.name || "Project",
      text: project?.data?.brief || "",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Project shared successfully!");
      } catch {
        try {
          await navigator.clipboard.writeText(window.location.href);
          toast.success("Link copied to clipboard");
        } catch {
          toast.error("Failed to copy link to clipboard");
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
      } catch {
        toast.error("Failed to copy link to clipboard");
      }
    }
  };

  return (
    <section className="section relative">
      {!project?.data.isPublic && (
        <div className="absolute top-0 left-0 h-full w-full z-30 flex justify-center items-center bg-white/60 backdrop-blur-md backdrop-saturate-150">
          <div className="flex flex-col gap-4 items-center">
            <Lock className="size-10" />
            <Heading2
              title="Project is private"
              description="This project is private. Please contact the owner to get access."
            />
            <Link to="/contact">
              <Button variant="outline">Contact Owner</Button>
            </Link>
          </div>
        </div>
      )}
      {isLoading || !project?.data ? (
        <div className="w-full">
          <div className="w-full h-[300px] md:h-[380px] lg:h-[400px] bg-muted relative flex items-center justify-center">
            <Skeleton className="absolute inset-0 w-full h-full" />
          </div>
          <div className="container flex flex-col gap-6 mt-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <Skeleton className="h-7 w-2/5 mb-2" />
                <Skeleton className="h-4 w-3/5" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="h-6 w-16 rounded-full" />
              ))}
            </div>
            <div className="space-y-3 mt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-3/6" />
            </div>
            <div className="flex items-center gap-2 justify-end mt-4">
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full h-96 relative">
            <div className="absolute inset-0 bg-black/40" />
            <Image src={project?.data.coverUrl} alt={project?.data.brief} />
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-2 justify-end">
              <Badge>{project?.data.status}</Badge>
            </div>
          </div>
          <div className="container flex flex-col gap-6">
            <Heading
              title={project?.data.name}
              description={project?.data.brief}
            >
              <Link to="/projects">
                <Button variant="outline">
                  <ArrowLeft className="size-4" />
                  Back to Projects
                </Button>
              </Link>
            </Heading>
            <div className="flex items-center gap-2">
              {project?.data.technologies &&
                project.data.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.data.technologies.map((technology: string) => (
                      <Badge variant="secondary" key={technology}>
                        {technology}
                      </Badge>
                    ))}
                  </div>
                )}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: project?.data.description }}
              className="prose"
            />
            <div className="flex items-center gap-2 justify-end">
              {project.data.githubLink && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    window.open(project?.data.githubLink, "_blank")
                  }
                >
                  <Github className="size-4" />
                  <span className="sr-only">View on Github</span>
                </Button>
              )}
              {project.data.demoLink && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(project?.data.demoLink, "_blank")}
                >
                  <Globe className="size-4" />
                  <span className="sr-only">View Demo</span>
                </Button>
              )}
              {project.data.isPublic && (
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share className="size-4" />
                  <span className="sr-only">Share</span>
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

ProjectDetailPage.displayName = "ProjectDetailPage";
