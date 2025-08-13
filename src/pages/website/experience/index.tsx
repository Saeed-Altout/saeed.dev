import { ExperienceSection } from "@/components/sections/experience-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { useMeQuery } from "@/hooks/auth";

export function ExperiencePage() {
  const { data: me } = useMeQuery();

  if (!me) return null;

  return (
    <>
      <ExperienceSection me={me} />
      <TimelineSection />
    </>
  );
}

ExperiencePage.displayName = "ExperiencePage";
