import type { ReactNode } from "react";
import { GlobalStyles } from "./global-styles";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { FloatingCTA } from "./floating-cta";

/**
 * Shared chrome for every marketing route (home, projects, project detail,
 * contact, blogs). Admin and login routes deliberately do NOT use this shell.
 */
export const SiteShell = ({ children }: { children: ReactNode }) => (
  <div className="dwi-site" style={{ animation: "fadeIn .6s ease both" }}>
    <GlobalStyles />
    <Nav />
    <FloatingCTA />
    <main>{children}</main>
    <Footer />
  </div>
);
