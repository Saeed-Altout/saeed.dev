import { Outlet } from "react-router-dom";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";

export function WebsiteLayout() {
  return (
    <div className="min-h-svh">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
