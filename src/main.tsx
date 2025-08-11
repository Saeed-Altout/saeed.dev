import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import ReactQueryProviders from "./react-query-providers";
import { Analytics } from "@vercel/analytics/next";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProviders>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
        <Toaster />
        <Analytics />
      </ThemeProvider>
    </ReactQueryProviders>
  </StrictMode>
);
