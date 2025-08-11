import * as React from "react";

import {
  HomeHeroSection,
  HomeAboutSection,
  HomeProjectsSection,
  HomeWhatFlexifySection,
  HomeContactSection,
} from "@/modules/website";

export default function HomePage() {
  return (
    <React.Fragment>
      <HomeHeroSection />
      <HomeAboutSection />
      <HomeWhatFlexifySection />
      <HomeProjectsSection />
      <HomeContactSection />
    </React.Fragment>
  );
}

HomePage.displayName = "HomePage";
