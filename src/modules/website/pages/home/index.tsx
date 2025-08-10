import * as React from "react";

import {
  HomeHeroSection,
  HomeAboutSection,
  HomeProjectsSection,
  HomeWhatFlexifySection,
} from "@/modules/website";

export default function HomePage() {
  return (
    <React.Fragment>
      <HomeHeroSection />
      <HomeAboutSection />
      <HomeWhatFlexifySection />
      <HomeProjectsSection />
    </React.Fragment>
  );
}

HomePage.displayName = "HomePage";
