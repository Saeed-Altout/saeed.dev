import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WebsiteLayout } from "./layouts/website";
import { HomePage as WebsiteHomePage } from "./pages/website/home";
import { AboutPage as WebsiteAboutPage } from "./pages/website/about";
import { ProjectsPage as WebsiteProjectsPage } from "./pages/website/projects";
import { ProjectDetailPage as WebsiteProjectDetailPage } from "./pages/website/projects/[id]";
import { ExperiencePage as WebsiteExperiencePage } from "./pages/website/experience";
import { BlogsPage as WebsiteBlogsPage } from "./pages/website/blogs";
import { BlogDetailPage as WebsiteBlogDetailPage } from "./pages/website/blogs/[id]";
import { ContactPage as WebsiteContactPage } from "./pages/website/contact";
import { TermsPage as WebsiteTermsPage } from "./pages/website/terms";
import { PrivacyPage as WebsitePrivacyPage } from "./pages/website/privacy";

// Auth Pages
import { AuthLayout } from "@/layouts/auth";
import { SignInPage } from "@/pages/auth/sign-in";
import { SignUpPage } from "@/pages/auth/sign-up";
import { NotFoundPage } from "@/pages/auth/not-found";

// Dashboard Pages
import { DashboardLayout } from "@/layouts/dashboard";
import { OverviewPage as DashboardOverviewPage } from "@/pages/dashboard/overview";
import { ProjectsPage as DashboardProjectsPage } from "@/pages/dashboard/projects";
import { ProjectPage as DashboardProjectPage } from "@/pages/dashboard/projects/[id]";
import { TechnologiesPage as DashboardTechnologiesPage } from "@/pages/dashboard/technologies";

// CV Builder Pages
import { CVBuilderPage } from "@/pages/dashboard/cv-builder";
import { SkillsPage } from "@/pages/dashboard/cv-builder/skills";
import { ExperiencePage } from "@/pages/dashboard/cv-builder/experience";
import { EducationPage } from "@/pages/dashboard/cv-builder/education";
import { CertificationsPage } from "@/pages/dashboard/cv-builder/certifications";
import { AwardsPage } from "@/pages/dashboard/cv-builder/awards";
import { PersonalInfoPage } from "@/pages/dashboard/cv-builder/personal-info";
import { InterestsPage } from "@/pages/dashboard/cv-builder/interests";
import { ReferencesPage } from "@/pages/dashboard/cv-builder/references";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverviewPage />} />
          <Route path="projects" element={<DashboardProjectsPage />} />
          <Route path="projects/:id" element={<DashboardProjectPage />} />
          <Route path="technologies" element={<DashboardTechnologiesPage />} />
          <Route path="cv-builder" element={<CVBuilderPage />} />
          <Route path="cv-builder/skills" element={<SkillsPage />} />
          <Route path="cv-builder/experience" element={<ExperiencePage />} />
          <Route path="cv-builder/education" element={<EducationPage />} />
          <Route
            path="cv-builder/personal-info"
            element={<PersonalInfoPage />}
          />
          <Route
            path="cv-builder/certifications"
            element={<CertificationsPage />}
          />
          <Route path="cv-builder/awards" element={<AwardsPage />} />
          <Route path="cv-builder/interests" element={<InterestsPage />} />
          <Route path="cv-builder/references" element={<ReferencesPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<WebsiteHomePage />} />
          <Route path="/about" element={<WebsiteAboutPage />} />
          <Route path="/projects" element={<WebsiteProjectsPage />} />
          <Route path="/projects/:id" element={<WebsiteProjectDetailPage />} />
          <Route path="/experience" element={<WebsiteExperiencePage />} />
          <Route path="/blogs" element={<WebsiteBlogsPage />} />
          <Route path="/blogs/:id" element={<WebsiteBlogDetailPage />} />
          <Route path="/contact" element={<WebsiteContactPage />} />
          <Route path="/terms" element={<WebsiteTermsPage />} />
          <Route path="/privacy" element={<WebsitePrivacyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
