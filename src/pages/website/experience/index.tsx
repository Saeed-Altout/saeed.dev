import { SEO } from "@/components/common/seo-wrapper";
import { ExperienceSection } from "@/components/sections/experience-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { PAGE_SEO } from "@/constants/seo";

export function ExperiencePage() {
  return (
    <>
      <SEO {...PAGE_SEO.experience} />
      <ExperienceSection />
      <TimelineSection />
    </>
  );
}

ExperiencePage.displayName = "ExperiencePage";
