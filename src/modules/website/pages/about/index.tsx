import { AboutSection, ExperienceSection, SkillsSection, FAQSection } from "../../components";

/**
 * About - About page component.
 * A comprehensive page showcasing personal information, experience, and skills.
 */
export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <FAQSection />
    </>
  );
}

AboutPage.displayName = "AboutPage"; 