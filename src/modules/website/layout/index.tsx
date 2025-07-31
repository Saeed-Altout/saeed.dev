import { Outlet } from "react-router-dom";

import { Footer, Navbar } from "../components";

export default function WebsiteLayout() {
  return (
    <div className="min-h-svh">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
