import * as React from "react";

import { SEO } from "@/components/common/seo-wrapper";
import { HomeHeroSection } from "@/components/sections/home-hero-section";
import { HomeAboutSection } from "@/components/sections/home-about-section";
import { HomeWhatFlexifySection } from "@/components/sections/home-what-flexify-section";
import { HomeProjectsSection } from "@/components/sections/home-projects-section";
import { HomeContactSection } from "@/components/sections/home-contact-section";
import { PAGE_SEO } from "@/constants/seo";

export function HomePage() {
  return (
    <React.Fragment>
      <SEO {...PAGE_SEO.home} />
      <HomeHeroSection />
      <HomeAboutSection />
      <HomeWhatFlexifySection />
      <HomeProjectsSection />
      <HomeContactSection />
    </React.Fragment>
  );
}

HomePage.displayName = "HomePage";
