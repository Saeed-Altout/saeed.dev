import { useParams } from "react-router-dom";
import { ProjectDetailSection } from "../../../components";

/**
 * ProjectDetail - Project detail page component.
 * Shows detailed information about a specific project.
 */
export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <ProjectDetailSection projectId={id} />
    </>
  );
}

ProjectDetailPage.displayName = "ProjectDetailPage"; 