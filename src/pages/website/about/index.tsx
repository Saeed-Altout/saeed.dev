import { Loader } from "lucide-react";

import { useFaqsQuery } from "@/hooks/faq";
import { useMeQuery } from "@/hooks/auth";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { FAQSection } from "@/components/sections/faq-section";

export function AboutPage() {
  const { data: me, isLoading: meLoading } = useMeQuery();
  const { data: faqs, isLoading: faqsLoading } = useFaqsQuery();
  const isLoading = meLoading || faqsLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-65px)]">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <AboutSection me={me!} />
      <ExperienceSection me={me!} />
      <SkillsSection me={me!} />
      <FAQSection faqs={faqs!} />
    </>
  );
}

AboutPage.displayName = "AboutPage";
