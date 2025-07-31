import { About, Hero, Projects, WhatFlexify } from "../../components";

/**
 * ForgotPassword - Password reset page component.
 * A clean wrapper around the ForgotPasswordForm component.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <WhatFlexify />
      <Projects />
    </>
  );
}

HomePage.displayName = "HomePage";
