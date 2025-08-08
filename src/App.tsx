import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout, SignIn, SignUp, NotFound } from "@/lib/auth";
import WebsiteLayout from "./modules/website/layout";
import HomePage from "./modules/website/pages/home";
import AboutPage from "./modules/website/pages/about";
import ProjectsPage from "./modules/website/pages/projects";
import ProjectDetailPage from "./modules/website/pages/projects/[id]";
import ExperiencePage from "./modules/website/pages/experience";
import BlogsPage from "./modules/website/pages/blogs";
import BlogDetailPage from "./modules/website/pages/blogs/[id]";
import ContactPage from "./modules/website/pages/contact";
import TermsPage from "./modules/website/pages/terms";
import PrivacyPage from "./modules/website/pages/privacy";

import DashboardLayout from "./modules/dashboard/layout";
import DashboardPage from "./modules/dashboard/pages";
import DashboardProjectsPage from "./modules/dashboard/pages/projects";
import DashboardProjectDetailPage from "./modules/dashboard/pages/projects/[id]";
import DashboardTechnologiesPage from "./modules/dashboard/pages/technologies";
import DashboardTechnologyDetailPage from "./modules/dashboard/pages/technologies/[id]";
import NewTechnologyPage from "./modules/dashboard/pages/technologies/new";
import DashboardCategoriesPage from "./modules/dashboard/pages/categories";
import DashboardTrashPage from "./modules/dashboard/pages/trash";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<DashboardProjectsPage />} />
          <Route path="projects/:id" element={<DashboardProjectDetailPage />} />
          <Route path="technologies" element={<DashboardTechnologiesPage />} />
          <Route
            path="technologies/:id"
            element={<DashboardTechnologyDetailPage />}
          />
          <Route path="technologies/new" element={<NewTechnologyPage />} />
          <Route path="categories" element={<DashboardCategoriesPage />} />
          <Route path="trash" element={<DashboardTrashPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
