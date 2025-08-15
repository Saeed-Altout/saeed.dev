import { SEO } from "@/components/common/seo-wrapper";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { FAQSection } from "@/components/sections/faq-section";
import { PAGE_SEO } from "@/constants/seo";

export function AboutPage() {
  return (
    <>
      <SEO {...PAGE_SEO.about} />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <FAQSection />
    </>
  );
}

AboutPage.displayName = "AboutPage";
