import { useMeQuery } from "@/lib";
import { ExperienceSection, TimelineSection } from "../../components";

/**
 * Experience - Experience page component.
 * A comprehensive page showcasing work experience and timeline.
 */
export default function ExperiencePage() {
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
