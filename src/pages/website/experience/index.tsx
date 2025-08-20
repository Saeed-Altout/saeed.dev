import { SEO } from "@/components/common/seo-wrapper";
import { AboutExperienceSection } from "@/components/sections/about-experience-section";
import { PAGE_SEO } from "@/constants/seo";
import { useGetCVSectionsQuery } from "@/hooks/cv-builder";

export function ExperiencePage() {
  const { data: sections } = useGetCVSectionsQuery();

  const experience = sections?.data?.data?.find(
    (section) => section.name === "experience"
  );

  return (
    <>
      <SEO {...PAGE_SEO.experience} />
      {experience?.is_active ? (
        <AboutExperienceSection />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-2xl font-bold">
            Experience section is not active. Please contact the admin to
            activate it.
          </p>
        </div>
      )}
    </>
  );
}
