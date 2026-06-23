import { useEffect, useRef, type ReactNode } from "react";
import { C, VIRTUAL_TOUR_URL } from "@/lib/site";

const icon = (children: ReactNode): ReactNode => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.goldL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

interface Node {
  icon: ReactNode;
  t: string;
  d: string;
}

const NODES: Node[] = [
  { icon: icon(<path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />), t: "Dholera Int'l Airport", d: "Greenfield airport on 1700 acres in Navagam Village" },
  { icon: icon(<path d="M1.5 8S3 6 6 6s6 2 9 2 6-2 9-2 4.5 2 4.5 2M1.5 16s1.5-2 4.5-2 6 2 9 2 6-2 9-2 4.5 2 4.5 2" />), t: "6-Lane Expressway", d: "109 km Ahmedabad-Dholera Expressway (NH-751)" },
  { icon: icon(<><rect x="7" y="7" width="10" height="10" rx="1" /><path d="M9 3v4M12 3v4M15 3v4M9 17v4M12 17v4M15 17v4M3 9h4M3 12h4M3 15h4M17 9h4M17 12h4M17 15h4" /></>), t: "Semicon City", d: "Tata Electronics — India's first semiconductor FAB plant" },
  { icon: icon(<><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></>), t: "5000 MW Solar Park", d: "World's largest solar tracking system by Tata Power" },
  { icon: icon(<><rect x="5" y="2" width="14" height="20" rx="5" /><path d="M12 6v4M8 18h8" /><circle cx="9" cy="14" r="1" /><circle cx="15" cy="14" r="1" /></>), t: "Metro Rail", d: "Gandhinagar to Dholera Smart City connectivity" },
  { icon: icon(<path d="M2 20V8l6 4V8l6 4V4l8 4v12H2z" />), t: "Industrial Park", d: "DMIC — global manufacturing & trading hub" },
];

/** Animated "growth corridor": the gold spine fills in proportion to how far
 *  you've scrolled through the section, and each infra station lights up as the
 *  line reaches it. Scroll-linked (not a one-shot). SSR-safe: visible by default. */
export function DholeraCorridor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.setProperty("--fill", "1");
      el.querySelectorAll(".corridor-node").forEach((n) => n.classList.add("active"));
      return;
    }

    el.classList.add("armed");
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(".corridor-node"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 as the section reaches mid-viewport, 1 once scrolled most of the way through.
      const progress = Math.max(0, Math.min(1, (vh * 0.72 - r.top) / (r.height * 0.72)));
      el.style.setProperty("--fill", progress.toFixed(3));
      nodes.forEach((n, i) => {
        const threshold = (i + 0.4) / nodes.length;
        n.classList.toggle("active", progress >= threshold);
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="corridor-track">
      <div className="corridor-spine" aria-hidden="true" />
      {NODES.map((n, i) => (
        <div key={n.t} className="corridor-node" data-side={i % 2}>
          <span className="corridor-dot" aria-hidden="true" />
          <div className="corridor-card">
            <div className="corridor-icon">{n.icon}</div>
            <div className="corridor-text">
              <div className="serif corridor-title">{n.t}</div>
              <div className="corridor-desc">{n.d}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="corridor-cta">
        <div>
          <div className="serif" style={{ fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 500, marginBottom: 6 }}>
            See it for yourself in 3D
          </div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, maxWidth: 420 }}>
            Explore the entire Dholera SIR master plan in the official Government of Gujarat virtual tour.
          </div>
        </div>
        <a href={VIRTUAL_TOUR_URL} target="_blank" rel="noreferrer" className="btn-gold" style={{ flexShrink: 0 }}>
          Official 3D Virtual Tour →
        </a>
      </div>

      <style>{`
        .corridor-track{position:relative;max-width:980px;margin:0 auto;padding:8px 0;--fill:1;}
        .corridor-spine{position:absolute;top:0;bottom:96px;left:50%;width:2px;transform:translateX(-50%);background:${C.border};overflow:hidden;}
        .corridor-spine::after{content:"";position:absolute;inset:0;background:linear-gradient(${C.gold},${C.goldL});transform:scaleY(var(--fill,1));transform-origin:top;transition:transform .12s linear;}

        .corridor-node{position:relative;width:50%;box-sizing:border-box;transition:opacity .5s ease,transform .5s cubic-bezier(.2,.7,.2,1);}
        .corridor-node[data-side="0"]{margin-left:0;padding:16px 46px 16px 0;}
        .corridor-node[data-side="1"]{margin-left:50%;padding:16px 0 16px 46px;}
        /* Once JS takes over (armed), un-reached stations sit dimmed until the line arrives. */
        .corridor-track.armed .corridor-node{opacity:.4;transform:translateY(10px);}
        .corridor-track.armed .corridor-node.active{opacity:1;transform:none;}

        .corridor-dot{position:absolute;top:26px;width:14px;height:14px;border-radius:50%;background:${C.black};border:2px solid ${C.gold};box-shadow:0 0 0 4px ${C.black};z-index:2;transition:background .3s ease,box-shadow .3s ease;}
        .corridor-node[data-side="0"] .corridor-dot{right:-7px;}
        .corridor-node[data-side="1"] .corridor-dot{left:-7px;}
        .corridor-node.active .corridor-dot{background:${C.goldL};box-shadow:0 0 0 4px ${C.black},0 0 16px 1px rgba(240,212,121,.55);}

        .corridor-card{display:flex;gap:14px;align-items:flex-start;background:${C.card};border:1px solid ${C.border};border-radius:6px;padding:18px 20px;transition:border-color .35s ease,transform .35s cubic-bezier(.2,.7,.2,1);}
        .corridor-node[data-side="0"] .corridor-card{flex-direction:row-reverse;text-align:right;}
        .corridor-node.active .corridor-card{border-color:${C.goldD};}
        .corridor-card:hover{border-color:${C.goldL};transform:translateY(-3px);}
        .corridor-icon{flex-shrink:0;width:44px;height:44px;border-radius:50%;border:1px solid rgba(201,168,76,.3);background:rgba(201,168,76,.06);display:flex;align-items:center;justify-content:center;}
        .corridor-title{font-size:19px;font-weight:500;margin-bottom:5px;color:${C.white};}
        .corridor-desc{font-size:12.5px;color:${C.muted};line-height:1.65;}

        .corridor-cta{position:relative;margin-top:40px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;background:linear-gradient(135deg,rgba(201,168,76,.08),transparent 70%);border:1px solid ${C.border};border-radius:8px;padding:28px clamp(20px,3vw,36px);}

        @media(max-width:720px){
          .corridor-spine{left:7px;bottom:120px;}
          .corridor-node,
          .corridor-node[data-side="0"],
          .corridor-node[data-side="1"]{width:100%;margin-left:0;padding:12px 0 12px 34px;}
          .corridor-node[data-side="0"] .corridor-card{flex-direction:row;text-align:left;}
          .corridor-node[data-side="0"] .corridor-dot,
          .corridor-node[data-side="1"] .corridor-dot{left:0;right:auto;}
        }
        @media (prefers-reduced-motion: reduce){
          .corridor-track.armed .corridor-node{opacity:1;transform:none;}
          .corridor-spine::after{transition:none;}
        }
      `}</style>
    </div>
  );
}
