import { Loader } from "lucide-react";

import {
  useFaqsQuery,
  useMeQuery,
  AboutSection,
  ExperienceSection,
  SkillsSection,
  FAQSection,
} from "@/modules/website";

export default function AboutPage() {
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
