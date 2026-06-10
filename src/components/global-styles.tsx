import { C } from "@/lib/site";

/** Global CSS: fonts, resets, keyframes and reusable utility classes for the marketing site. */
export const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap');

    :root{
      --c-black:${C.black};--c-dark:${C.dark};--c-card:${C.card};
      --c-gold:${C.gold};--c-goldL:${C.goldL};--c-goldB:${C.goldB};
      --c-white:${C.white};--c-muted:${C.muted};--c-border:${C.border};
    }

    .dwi-site *,.dwi-site *::before,.dwi-site *::after{box-sizing:border-box;margin:0;padding:0;}
    .dwi-site{background:${C.black};color:${C.white};font-family:'Inter',system-ui,sans-serif;font-weight:300;overflow-x:hidden;min-height:100vh;}
    html{scroll-behavior:smooth;}
    .dwi-site ::-webkit-scrollbar{width:4px;}
    .dwi-site ::-webkit-scrollbar-track{background:${C.black};}
    .dwi-site ::-webkit-scrollbar-thumb{background:${C.gold};}
    .dwi-site a{color:inherit;text-decoration:none;}
    .dwi-site img{max-width:100%;}

    .serif{font-family:'Cormorant Garamond',Georgia,serif;}

    /* ── Keyframes ── */
    @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
    @keyframes waPulse{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.5)}70%{box-shadow:0 0 0 12px rgba(37,211,102,0)}}
    @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

    /* ── Text effects ── */
    .gold-shimmer{background:linear-gradient(110deg,${C.gold} 0%,${C.goldB} 45%,#fff7e0 55%,${C.gold} 100%);background-size:220% auto;animation:shimmer 4.5s linear infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;}
    .gold-text{background:linear-gradient(135deg,${C.gold},${C.goldL});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;}

    /* ── Buttons ── */
    .btn-gold{background:linear-gradient(135deg,${C.gold},${C.goldL});color:${C.black};border:none;padding:14px 30px;font-family:'Inter',sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:transform .3s,box-shadow .3s;display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:2px;}
    .btn-gold:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(154,123,46,.45);}
    .btn-out{background:transparent;color:${C.goldL};border:1px solid ${C.gold};padding:13px 29px;font-family:'Inter',sans-serif;font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s;display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:2px;}
    .btn-out:hover{background:${C.gold};color:${C.black};}
    .btn-wa{background:#25D366;color:#fff;border:none;padding:14px 26px;font-family:'Inter',sans-serif;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:transform .3s,background .3s;display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:2px;}
    .btn-wa:hover{background:#128C7E;transform:translateY(-2px);}

    /* ── Nav links with animated gold underline ── */
    .nav-link{position:relative;color:${C.muted};font-size:10px;letter-spacing:1.8px;text-transform:uppercase;cursor:pointer;transition:color .3s;background:none;border:none;font-family:'Inter',sans-serif;font-weight:500;white-space:nowrap;padding:4px 0;}
    .nav-link::after{content:"";position:absolute;left:0;bottom:-2px;height:1px;width:0;background:linear-gradient(90deg,${C.gold},${C.goldB});transition:width .3s ease;}
    .nav-link:hover,.nav-link.active{color:${C.goldL};}
    .nav-link:hover::after,.nav-link.active::after{width:100%;}

    /* ── Section labels / dividers ── */
    .sl{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:${C.gold};font-weight:600;}
    .divl{width:54px;height:1px;background:linear-gradient(90deg,${C.gold},transparent);margin:12px 0 22px;}
    .divc{margin:12px auto 22px;background:linear-gradient(90deg,transparent,${C.gold},transparent);}

    /* ── Forms ── */
    .dwi-site input,.dwi-site textarea,.dwi-site select{background:${C.card};border:1px solid ${C.border};color:${C.white};padding:13px 14px;font-family:'Inter',sans-serif;font-size:13px;font-weight:300;width:100%;outline:none;transition:border-color .3s,box-shadow .3s;border-radius:2px;-webkit-appearance:none;}
    .dwi-site input:focus,.dwi-site textarea:focus,.dwi-site select:focus{border-color:${C.gold};box-shadow:0 0 0 3px rgba(154,123,46,.15);}
    .dwi-site input::placeholder,.dwi-site textarea::placeholder{color:${C.muted};}
    .dwi-site select option{background:${C.card};}

    /* ── Tabs ── */
    .tab-btn{padding:10px 20px;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:all .3s;font-family:'Inter',sans-serif;font-weight:500;border:none;white-space:nowrap;border-radius:2px;}
    .tab-btn.active{background:linear-gradient(135deg,${C.gold},${C.goldL});color:${C.black};font-weight:600;}
    .tab-btn:not(.active){background:transparent;color:${C.muted};border:1px solid ${C.border};}
    .tab-btn:not(.active):hover{color:${C.goldL};border-color:${C.gold};}

    /* ── Floating CTA ── */
    .float-cta{position:fixed;right:14px;bottom:20px;z-index:9000;display:flex;flex-direction:column;gap:10px;align-items:flex-end;}
    .float-btn{width:50px;height:50px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;transition:transform .3s;box-shadow:0 4px 16px rgba(0,0,0,.5);color:#fff;}
    .float-btn:hover{transform:scale(1.12);}
    .float-wa{background:#25D366;animation:waPulse 2.4s infinite;}
    .float-insta{background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);}
    .float-call{background:linear-gradient(135deg,${C.gold},${C.goldL});color:${C.black};}
    .float-label{background:${C.card};border:1px solid ${C.border};padding:5px 10px;font-size:9px;letter-spacing:1.5px;color:${C.muted};opacity:0;transition:opacity .3s;pointer-events:none;white-space:nowrap;border-radius:2px;}
    .float-row{display:flex;align-items:center;gap:8px;}
    .float-row:hover .float-label{opacity:1;}

    /* ── Ticker marquee ── */
    .ticker-track{display:flex;width:max-content;animation:marquee 28s linear infinite;}
    .ticker-track:hover{animation-play-state:paused;}
    .ticker-item{display:flex;align-items:center;gap:9px;padding:0 26px;flex-shrink:0;}
    .ticker-dot{width:5px;height:5px;background:${C.gold};transform:rotate(45deg);flex-shrink:0;}

    /* ── Map / zoom ── */
    .map-frame{width:100%;height:340px;border:none;}
    .img-zoom-wrap{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:16px;}
    .legend-dot{width:13px;height:13px;border-radius:2px;display:inline-block;}

    /* ── Mobile fullscreen overlay menu ── */
    .mob-menu{position:fixed;inset:0;background:${C.black};z-index:2000;display:flex;flex-direction:column;padding:28px 24px 36px;opacity:0;pointer-events:none;transform:translateY(-12px);transition:opacity .35s ease,transform .35s ease;}
    .mob-menu.open{opacity:1;pointer-events:all;transform:translateY(0);}
    .mob-link{background:none;border:none;color:${C.muted};font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:400;letter-spacing:.5px;cursor:pointer;padding:13px 0;border-bottom:1px solid ${C.border};text-align:left;width:100%;transition:color .25s,padding-left .25s;}
    .mob-link:hover,.mob-link.active{color:${C.goldL};padding-left:8px;}

    /* ── Card / image hover ── */
    .proj-card{animation:fadeUp .8s cubic-bezier(.2,.7,.2,1) both;transition:transform .5s cubic-bezier(.2,.7,.2,1),box-shadow .5s ease,border-color .4s ease;will-change:transform;}
    .proj-card:hover{transform:translateY(-6px);box-shadow:0 28px 60px -22px rgba(0,0,0,.55);}
    .proj-card-img{overflow:hidden;}
    .proj-card-img img{transition:transform 1.1s cubic-bezier(.2,.7,.2,1),filter .6s ease;}
    .proj-card:hover .proj-card-img img{transform:scale(1.08);filter:saturate(1.1) contrast(1.03);}

    .reveal{animation:fadeUp 1s cubic-bezier(.2,.7,.2,1) both;}
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
      .btn-gold,.btn-out,.btn-wa{padding:12px 18px!important;font-size:10px!important;}
    }
    @media(min-width:768px){
      .show-mob{display:none!important;}
    }

    @media (prefers-reduced-motion: reduce){
      .dwi-site *,.dwi-site *::before,.dwi-site *::after{animation:none!important;transition:none!important;}
    }
  `}</style>
);
