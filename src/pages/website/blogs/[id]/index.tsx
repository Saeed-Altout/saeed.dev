import { useParams } from "react-router-dom";
import { BlogDetailSection } from "@/components/sections/blog-detail-section";

export function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <BlogDetailSection blogId={id} />
    </>
  );
}

BlogDetailPage.displayName = "BlogDetailPage";
