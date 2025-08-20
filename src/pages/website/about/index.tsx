import { SEO } from "@/components/common/seo-wrapper";
import { AboutPersonalInfoSection } from "@/components/sections/about-personal-info-section";
import { PAGE_SEO } from "@/constants/seo";
import { useGetCVSectionsQuery } from "@/hooks/cv-builder";

export function AboutPage() {
  const { data: sections } = useGetCVSectionsQuery();

  const personal_info = sections?.data?.data?.find(
    (section) => section.name === "personal_info"
  );

  return (
    <>
      <SEO {...PAGE_SEO.about} />
      {personal_info?.is_active ? (
        <AboutPersonalInfoSection />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">
            Personal info section is not active. Please contact the admin to
            activate it.
          </p>
        </div>
      )}
    </>
  );
}
