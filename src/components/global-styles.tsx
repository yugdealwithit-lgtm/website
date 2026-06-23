import { C } from "@/lib/site";

/** Global CSS: fonts, resets, keyframes and reusable utility classes for the marketing site. */
export const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap');

    :root{
      --c-black:${C.black};--c-dark:${C.dark};--c-card:${C.card};--c-cardHi:${C.cardHi};
      --c-gold:${C.gold};--c-goldL:${C.goldL};--c-goldB:${C.goldB};--c-goldD:${C.goldD};
      --c-white:${C.white};--c-muted:${C.muted};--c-mutedD:${C.mutedD};--c-border:${C.border};
    }

    .dwi-site *,.dwi-site *::before,.dwi-site *::after{box-sizing:border-box;margin:0;padding:0;}
    .dwi-site{background:${C.black};color:${C.white};font-family:'Hanken Grotesk',system-ui,sans-serif;font-weight:300;overflow-x:hidden;min-height:100vh;-webkit-font-smoothing:antialiased;}
    html{scroll-behavior:smooth;}

    /* Lenis smooth-scroll (see SmoothScroll component) */
    html.lenis,html.lenis body{height:auto;}
    .lenis.lenis-smooth{scroll-behavior:auto!important;}
    .lenis.lenis-smooth [data-lenis-prevent]{overscroll-behavior:contain;}
    .lenis.lenis-stopped{overflow:hidden;}
    .lenis.lenis-smooth iframe{pointer-events:none;}
    .dwi-site ::-webkit-scrollbar{width:5px;}
    .dwi-site ::-webkit-scrollbar-track{background:${C.black};}
    .dwi-site ::-webkit-scrollbar-thumb{background:${C.goldD};}
    .dwi-site a{color:inherit;text-decoration:none;}
    .dwi-site img{max-width:100%;}

    .serif{font-family:'Cormorant Garamond',Georgia,serif;}

    /* ── Keyframes ── */
    @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes shimmerOnce{0%{background-position:120% center}100%{background-position:0% center}}
    @keyframes waPulse{0%{box-shadow:0 0 0 0 rgba(37,211,102,.32)}70%,100%{box-shadow:0 0 0 10px rgba(37,211,102,0)}}
    @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

    /* ── Text effects (signature gold — used sparingly on display 'em' only) ── */
    /* One elegant sweep on load, then rests as a static gold gradient (no perpetual shimmer). */
    .gold-shimmer{background:linear-gradient(110deg,${C.gold} 0%,${C.goldB} 45%,#fff7e0 55%,${C.gold} 100%);background-size:220% auto;background-position:0% center;animation:shimmerOnce 2.4s cubic-bezier(.2,.7,.2,1) .35s both;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;}
    .gold-text{background:linear-gradient(135deg,${C.gold},${C.goldL});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;}
    /* Solid gold for non-hero emphasis (replaces gradient-text overuse) */
    .gold-solid{color:${C.goldL};}

    /* ── Buttons ── */
    .btn-gold{background:linear-gradient(135deg,${C.gold},${C.goldL});color:${C.black};border:none;padding:15px 30px;font-family:'Hanken Grotesk',sans-serif;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .3s ease;display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:3px;}
    .btn-gold:hover{transform:translateY(-2px);box-shadow:0 14px 34px -12px rgba(201,168,76,.5);}
    .btn-out{background:transparent;color:${C.goldL};border:1px solid ${C.goldD};padding:14px 29px;font-family:'Hanken Grotesk',sans-serif;font-size:12px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:all .3s;display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:3px;}
    .btn-out:hover{background:${C.gold};color:${C.black};border-color:${C.gold};}
    .btn-wa{background:#25D366;color:#fff;border:none;padding:15px 26px;font-family:'Hanken Grotesk',sans-serif;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:transform .3s cubic-bezier(.2,.7,.2,1),background .3s ease;display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:3px;}
    .btn-wa:hover{background:#128C7E;transform:translateY(-2px);}

    /* ── Nav links with animated gold underline ── */
    .nav-link{position:relative;color:${C.muted};font-size:12px;letter-spacing:1.4px;text-transform:uppercase;cursor:pointer;transition:color .3s;background:none;border:none;font-family:'Hanken Grotesk',sans-serif;font-weight:500;white-space:nowrap;padding:4px 0;}
    .nav-link::after{content:"";position:absolute;left:0;bottom:-2px;height:1px;width:100%;transform:scaleX(0);transform-origin:left;background:linear-gradient(90deg,${C.gold},${C.goldB});transition:transform .3s cubic-bezier(.2,.7,.2,1);}
    .nav-link:hover,.nav-link.active{color:${C.goldL};}
    .nav-link:hover::after,.nav-link.active::after{transform:scaleX(1);}

    /* ── Section labels / dividers ── */
    .sl{font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${C.goldL};font-weight:600;}
    .divl{width:54px;height:1px;background:linear-gradient(90deg,${C.gold},transparent);margin:12px 0 22px;}
    .divc{margin:12px auto 22px;background:linear-gradient(90deg,transparent,${C.gold},transparent);}

    /* ── Forms ── */
    .dwi-site input,.dwi-site textarea,.dwi-site select{background:${C.card};border:1px solid ${C.border};color:${C.white};padding:13px 14px;font-family:'Hanken Grotesk',sans-serif;font-size:14px;font-weight:300;width:100%;outline:none;transition:border-color .3s,box-shadow .3s;border-radius:3px;-webkit-appearance:none;}
    .dwi-site input:focus,.dwi-site textarea:focus,.dwi-site select:focus{border-color:${C.gold};box-shadow:0 0 0 3px rgba(201,168,76,.18);}
    .dwi-site input::placeholder,.dwi-site textarea::placeholder{color:${C.muted};}
    .dwi-site select option{background:${C.card};}

    /* ── Tabs ── */
    .tab-btn{padding:10px 20px;font-size:12px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .3s;font-family:'Hanken Grotesk',sans-serif;font-weight:500;border:none;white-space:nowrap;border-radius:3px;}
    .tab-btn.active{background:linear-gradient(135deg,${C.gold},${C.goldL});color:${C.black};font-weight:600;}
    .tab-btn:not(.active){background:transparent;color:${C.muted};border:1px solid ${C.border};}
    .tab-btn:not(.active):hover{color:${C.goldL};border-color:${C.gold};}

    /* ── Floating CTA ── */
    .float-cta{position:fixed;right:14px;bottom:20px;z-index:60;display:flex;flex-direction:column;gap:10px;align-items:flex-end;}
    .float-btn{width:50px;height:50px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;transition:transform .3s;box-shadow:0 4px 16px rgba(0,0,0,.5);color:#fff;}
    .float-btn:hover{transform:scale(1.12);}
    .float-wa{background:#25D366;animation:waPulse 3.4s ease-out infinite;}
    .float-insta{background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);}
    .float-call{background:linear-gradient(135deg,${C.gold},${C.goldL});color:${C.black};}
    .float-label{background:${C.card};border:1px solid ${C.border};padding:5px 10px;font-size:11px;letter-spacing:1px;color:${C.muted};opacity:0;transition:opacity .3s;pointer-events:none;white-space:nowrap;border-radius:3px;}
    .float-row{display:flex;align-items:center;gap:8px;}
    .float-row:hover .float-label{opacity:1;}

    /* ── Ticker marquee ── */
    .ticker-track{display:flex;width:max-content;animation:marquee 28s linear infinite;}
    .ticker-track:hover{animation-play-state:paused;}
    .ticker-item{display:flex;align-items:center;gap:9px;padding:0 26px;flex-shrink:0;}
    .ticker-dot{width:5px;height:5px;background:${C.gold};transform:rotate(45deg);flex-shrink:0;}

    /* ── Map / zoom ── */
    .map-frame{width:100%;height:340px;border:none;}
    .img-zoom-wrap{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:70;display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:16px;}
    .legend-dot{width:13px;height:13px;border-radius:2px;display:inline-block;}

    /* ── Mobile fullscreen overlay menu ── */
    .mob-menu{position:fixed;inset:0;background:${C.black};z-index:55;display:flex;flex-direction:column;padding:28px 24px 36px;opacity:0;pointer-events:none;transform:translateY(-12px);transition:opacity .35s ease,transform .35s ease;}
    .mob-menu.open{opacity:1;pointer-events:all;transform:translateY(0);}
    .mob-link{background:none;border:none;color:${C.muted};font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:400;letter-spacing:.5px;cursor:pointer;padding:13px 0;border-bottom:1px solid ${C.border};text-align:left;width:100%;transition:color .25s,transform .25s;transform-origin:left;}
    .mob-link:hover,.mob-link.active{color:${C.goldL};transform:translateX(8px);}

    /* ── Card / image hover ── */
    .proj-card{position:relative;animation:fadeUp .8s cubic-bezier(.2,.7,.2,1) both;transition:transform .5s cubic-bezier(.2,.7,.2,1),box-shadow .5s ease,border-color .4s ease;will-change:transform;}
    .proj-card:hover{transform:translateY(-6px);box-shadow:0 28px 56px -26px rgba(201,168,76,.4);}
    /* Cursor-tracking gold glow (positions driven by useMagnetic) */
    .proj-card::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:3;opacity:0;transition:opacity .4s ease;background:radial-gradient(220px circle at var(--gx,50%) var(--gy,50%),rgba(240,212,121,.16),transparent 60%);}
    @media (hover:hover) and (pointer:fine){.proj-card:hover::after{opacity:1;}}
    /* Magnetic CTA — eases back to rest when the cursor leaves */
    .magnetic-btn{transition:transform .35s cubic-bezier(.2,.7,.2,1);will-change:transform;}
    .proj-card-img{overflow:hidden;}
    .proj-card-img img{transition:transform 1.1s cubic-bezier(.2,.7,.2,1),filter .6s ease;}
    .proj-card:hover .proj-card-img img{transform:scale(1.08);filter:saturate(1.1) contrast(1.03);}

    .reveal{animation:fadeUp .65s cubic-bezier(.2,.7,.2,1) both;}

    /* Subtle hover-lift for the hero mini project cards (replaces the 3D mouse-tilt). */
    .mini-card{transition:transform .45s cubic-bezier(.2,.7,.2,1),border-color .45s ease;}
    .mini-card:hover{transform:translateY(-4px);border-color:${C.goldD};}
    .stat-anim{animation:countUp .8s ease both;}

    /* ── Responsive grids ── */
    .grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;}
    .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;}
    .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}

    @media(max-width:767px){
      .grid-2{grid-template-columns:1fr!important;}
      .grid-3{grid-template-columns:repeat(2,1fr)!important;}
      .grid-4{grid-template-columns:repeat(2,1fr)!important;}
      .hide-mob{display:none!important;}
      .show-mob{display:flex!important;}
      .map-frame{height:260px!important;}
      .btn-gold,.btn-out,.btn-wa{padding:13px 20px!important;font-size:11px!important;}
    }
    @media(min-width:768px){
      .show-mob{display:none!important;}
    }

    /* ── SVG icon circle ── */
    .icon-circle{width:48px;height:48px;border-radius:50%;border:1px solid rgba(201,168,76,.3);background:rgba(201,168,76,.06);display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:border-color .3s,background .3s,transform .3s;}
    .why-card:hover .icon-circle{border-color:rgba(240,212,121,.65);background:rgba(201,168,76,.14);transform:scale(1.08);}
    .why-card{transition:background .3s,border-color .35s,transform .35s,box-shadow .35s;}

    /* ── Scroll progress ── */
    .scroll-progress{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,${C.gold},${C.goldB},${C.gold});z-index:80;transition:width .1s linear;pointer-events:none;}

    /* ── Route view transitions (gentle cross-fade + lift) ── */
    @keyframes vt-fade-out{to{opacity:0;}}
    @keyframes vt-fade-in{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
    ::view-transition-old(root){animation:vt-fade-out .26s cubic-bezier(.2,.7,.2,1) both;}
    ::view-transition-new(root){animation:vt-fade-in .42s cubic-bezier(.2,.7,.2,1) both;}
    @media (prefers-reduced-motion: reduce){
      ::view-transition-old(root),::view-transition-new(root){animation:none!important;}
    }

    @media (prefers-reduced-motion: reduce){
      .dwi-site *,.dwi-site *::before,.dwi-site *::after{animation:none!important;transition:none!important;}
    }
  `}</style>
);
