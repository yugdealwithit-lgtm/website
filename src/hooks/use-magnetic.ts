import { useCallback } from "react";
import type { MouseEvent } from "react";

/** Only run on devices with a real pointer, and respect reduced-motion. */
const enabled = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Magnetic card interaction: a gold glow tracks the cursor inside the card
 * (via the `--gx`/`--gy` custom properties consumed by `.proj-card::after`),
 * and any child with class `.magnetic-btn` leans toward the cursor.
 *
 * Returns handlers to spread onto the card element. No-op on touch / reduced-motion.
 */
export function useMagnetic() {
  const onMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    if (!enabled()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);

    const btn = el.querySelector<HTMLElement>(".magnetic-btn");
    if (btn) {
      const mx = (e.clientX - r.left - r.width / 2) / r.width;
      const my = (e.clientY - r.top - r.height / 2) / r.height;
      btn.style.transform = `translate(${mx * 12}px, ${my * 8}px)`;
    }
  }, []);

  const onMouseLeave = useCallback((e: MouseEvent<HTMLElement>) => {
    const btn = e.currentTarget.querySelector<HTMLElement>(".magnetic-btn");
    if (btn) btn.style.transform = "";
  }, []);

  return { onMouseMove, onMouseLeave };
}
