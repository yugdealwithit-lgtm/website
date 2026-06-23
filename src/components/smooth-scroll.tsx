import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide momentum scrolling. Mounted once in SiteShell.
 *
 * - Disabled entirely under prefers-reduced-motion.
 * - Smooth wheel only; touch stays native (Lenis default) so mobile never lags.
 * - Lenis scrolls the window, so the nav scroll-progress bar and the
 *   IntersectionObserver reveals keep working unchanged.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out-expo
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
