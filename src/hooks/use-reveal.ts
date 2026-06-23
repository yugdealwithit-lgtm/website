import { useEffect } from "react";

/**
 * Scroll-reveal that ENHANCES an already-visible default rather than gating it.
 *
 * Content renders visible by default (good for SSR, crawlers, and no-JS). After
 * hydration we only hide elements that are currently below the fold, then reveal
 * them as they scroll in. Guards ensure nothing can get stuck invisible:
 *  - respects prefers-reduced-motion (no hiding at all)
 *  - bails if IntersectionObserver is unavailable
 *  - a safety timeout force-reveals anything still hidden
 */
export function useReveal(selector = ".reveal-on-scroll") {
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!els.length) return;

    const show = (el: HTMLElement) => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show(e.target as HTMLElement);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => {
      // Only hide what's below the fold — above-the-fold content stays visible (no FOUC).
      const belowFold = el.getBoundingClientRect().top > window.innerHeight * 0.9;
      if (!belowFold) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition =
        "opacity 0.45s cubic-bezier(.2,.7,.2,1), transform 0.45s cubic-bezier(.2,.7,.2,1)";
      obs.observe(el);
    });

    // Safety net: never let a section stay hidden (e.g. non-scrolling renderers).
    const failsafe = window.setTimeout(() => els.forEach(show), 2500);

    return () => {
      obs.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [selector]);
}
