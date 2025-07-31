import { useParams } from "react-router-dom";
import { BlogDetailSection } from "../../../components";

/**
 * BlogDetail - Blog detail page component.
 * Shows detailed information about a specific blog post.
 */
export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <BlogDetailSection blogId={id} />
    </>
  );
}

BlogDetailPage.displayName = "BlogDetailPage"; 