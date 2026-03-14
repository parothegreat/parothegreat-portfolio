import { 
  useState, useEffect, useRef, createContext, useContext, 
  lazy, Suspense, memo, useCallback, useMemo 
} from "react";

// ── Lazy Load Heavy Components ─────────────────────────────────
const Lanyard = lazy(() => import('./Lanyard'));

// ── Theme Context ──────────────────────────────────────────────
const ThemeCtx = createContext({ isDark: true, toggle: () => {}, isMobile: false });
const useTheme = () => useContext(ThemeCtx);

// ── Mobile Detection Hook ──────────────────────────────────────
function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
      const isSmallScreen = window.innerWidth < 900;
      
      setIsMobile(isMobileDevice || isTouchDevice || isSmallScreen);
      setIsTouch(isTouchDevice || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile, isTouch };
}

// ── Brand Tokens ───────────────────────────────────────────────
const ACCENT = {
  mint500: "#00E5A0", mint400: "#33EBB3", mint600: "#00C488",
  lime: "#C8F135", coral: "#FF6B6B", amber: "#FFB830", 
  violet: "#A788FA", blue: "#00A3FF",
};

const makeTokens = (isDark) => isDark ? {
  bgBase: "#0A000F", bgCard: "#131619", bgCard2: "#1A1E22", 
  border: "#252A2F", textPri: "#F0F4F8", textSec: "#8A95A0", 
  textMuted: "#5E6873", navBg: "rgba(10,0,15,0.35)", 
  navBgScr: "#0A000Fe0", overlayBg: "rgba(10,0,15,0.55)",
  heroOverlay: "linear-gradient(to top,#0A000Ff5 0%,#0A000F99 40%,#0A000F55 70%,transparent 100%)",
  mobileMenuBg: "#0A000F", ...ACCENT,
} : {
  // ── Light mode backgrounds — warm off-white, not flat grey ──
  bgBase:  "#F7F5F0",   // warm parchment
  bgCard:  "#FFFFFF",
  bgCard2: "#EEF0EC",   // subtle sage tint
  border:  "#D6DAD2",

  // ── Light mode text — ink tones, not pure black ──
  textPri:  "#1A1F1C",  // deep forest ink
  textSec:  "#4A5550",  // muted sage
  textMuted:"#8A9690",  // soft grey-green

  // ── Nav / overlay ──
  navBg:       "rgba(247,245,240,0.80)",
  navBgScr:    "#F7F5F0f0",
  overlayBg:   "rgba(247,245,240,0.75)",
  heroOverlay: "linear-gradient(to top,#F7F5F0fa 0%,#F7F5F0cc 40%,#F7F5F066 70%,transparent 100%)",
  mobileMenuBg:"#F7F5F0",

  // ── Accents — darker, more saturated for readability on light bg ──
  mint500: "#007A54",   // deep emerald  (was #00E5A0 — too neon)
  mint400: "#009966",   // mid emerald
  mint600: "#005C3F",   // darker emerald
  lime:    "#6B8A00",   // olive (was #C8F135 — invisible on white)
  coral:   "#C0392B",   // deep red-coral (was #FF6B6B — washed out)
  amber:   "#B8620A",   // burnt amber (was #FFB830 — too bright)
  violet:  "#5B3FA8",   // rich indigo (was #A788FA — too pale)
  blue:    "#0066CC",   // strong blue  (was #00A3FF — too light)
};

// ── Data Constants ─────────────────────────────────────────────
const PROJECTS = [
  { id:"01", title:"SentinelNet", category:"Network Security & Monitoring", 
    desc:"Enterprise-grade IDS/IPS deployment across 3 data centers. Reduced threat detection time from 4h to 8min using Suricata rules + custom SIEM correlation logic.",
    tags:["Suricata","Splunk","pfSense"], year:"2024", accent: ACCENT.coral },
  { id:"02", title:"VaultOps", category:"Infrastructure Hardening", 
    desc:"Zero-trust architecture rollout for 200-node corporate network. Implemented microsegmentation, PAM, and automated compliance scanning aligned to CIS Benchmarks.",
    tags:["HashiCorp Vault","Ansible","CIS"], year:"2024", accent: ACCENT.mint500 },
  { id:"03", title:"PhantomNet Lab", category:"Penetration Testing", 
    desc:"Full red team engagement simulating APT lateral movement. Identified 14 critical CVEs across Windows AD environment. Delivered remediation roadmap adopted by client.",
    tags:["Metasploit","BloodHound","Cobalt Strike"], year:"2023", accent: ACCENT.violet },
  { id:"04", title:"CoreFabric", category:"Network Engineering", 
    desc:"Designed and deployed BGP/OSPF multi-site WAN for ISP with 40Gbps backbone. Automated provisioning via Netmiko/NAPALM, cutting config time by 70%.",
    tags:["Cisco IOS-XE","BGP","NAPALM"], year:"2023", accent: ACCENT.blue },
  { id:"05", title:"Linux Server Ops Lab", category:"System Administration",
    desc:"Maintained and deployed Linux server environments for testing infrastructure, services, and network configurations. Covers service management, reverse proxy, database deployment, and server hardening practices.",
    tags:["Linux","Nginx","Bash","MySQL"], year:"2024", accent: ACCENT.amber },
  { id:"06", title:"InfraOps Platform", category:"Infrastructure & DevOps Engineering",
    desc:"Designed and deployed a production-ready IT Work Order & Helpdesk platform with containerized services and reverse proxy architecture. Features a Go/Gin backend API, Rust/Axum time-tracking microservice, and host-based MySQL.",
    tags:["Go","Rust","Docker","Nginx","MySQL","Linux"], year:"2025", accent: ACCENT.lime },
];

const SKILLS = [
  { category:"Network Eng.", items:["Cisco","BGP / OSPF / EIGRP","VLAN & VxLAN","SD-WAN","Wireshark"], accent: ACCENT.blue },
  { category:"Cybersecurity", items:["Penetration Testing","SIEM / SOC","Threat Hunting","CVE Analysis","Zero Trust"], accent: ACCENT.coral },
  { category:"Sysadmin", items:["Linux (RHEL/Debian)","Ubuntu Server","Active Directory","Ansible","Bash / Python"], accent: ACCENT.mint500 },
  { category:"Cloud & Infra", items:["AWS / Azure","Terraform","Docker / K8s","Proxmox","Zabbix / Nagios"], accent: ACCENT.violet },
];

const SOCIAL_LINKS = {
  GitHub: "https://github.com/parothegreat/",
  LinkedIn: "https://www.linkedin.com/in/moehammad-alvaro-pirata-prayogo-842a8834a/",
};

const CERTS = [
  {
    name:      "Network Defense",
    full:      "Cisco — Network Defense",
    issuer:    "Cisco Networking Academy",
    color:     ACCENT.blue,
    credlyUrl: "https://www.credly.com/badges/26767ad4-478f-47d2-bd76-c30903affef0/linked_in_profile",
    pdfUrl:    "/certs/network-defense.pdf",
  },
  {
    name:      "Ethical Hacker",
    full:      "Cisco — Ethical Hacker",
    issuer:    "Cisco Networking Academy",
    color:     ACCENT.coral,
    credlyUrl: "https://www.credly.com/badges/27912f5c-4b4f-4190-9684-9a3822bb6723/linked_in_profile",
    pdfUrl:    "/certs/ethical-hacker.pdf",
  },
];

// ── Optimized Global Styles ────────────────────────────────────
const GlobalStyles = memo(({ C, isMobile }) => {
  useEffect(() => {
    // Optimized font loading with display=swap
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=JetBrains+Mono:wght@400;500&display=swap";
    link.media = "print";
    link.onload = () => { link.media = "all"; };
    if (!document.querySelector(`link[href="${link.href}"]`)) {
      document.head.appendChild(link);
    }

    // Viewport meta optimization
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = "viewport";
      document.head.appendChild(viewport);
    }
    viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes";

    // Theme color
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.name = "theme-color";
      document.head.appendChild(themeColor);
    }
    themeColor.content = C.bgBase;
  }, [C.bgBase]);

  useEffect(() => {
    const styleId = "__portfolio-styles";
    let el = document.getElementById(styleId);
    if (!el) { 
      el = document.createElement("style"); 
      el.id = styleId; 
      document.head.appendChild(el); 
    }
    
    el.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
      body {
        background: ${C.bgBase}; color: ${C.textPri};
        font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        transition: background 0.3s ease, color 0.3s ease;
        -webkit-tap-highlight-color: transparent;
        overflow-x: hidden;
        touch-action: pan-y;
      }
      ::selection { background: ${C.mint500}22; color: ${C.mint400}; }
      input, textarea { font-family: inherit; -webkit-appearance: none; border-radius: 0; }
      input::placeholder, textarea::placeholder { color: ${C.textMuted}; }
      button { cursor: pointer; font-family: inherit; touch-action: manipulation; }
      a { touch-action: manipulation; }

      @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      @keyframes bootExit { 0%{opacity:1} 100%{opacity:0} }
      @keyframes crtFlicker {
        0%{opacity:1} 3%{opacity:0.93} 5%{opacity:1}
        22%{opacity:1} 23%{opacity:0.95} 24%{opacity:1}
        60%{opacity:1} 61%{opacity:0.91} 62%{opacity:1} 100%{opacity:1}
      }
      @keyframes bootTextIn {
        0%{opacity:0;letter-spacing:0.6em;filter:blur(6px)}
        60%{opacity:1;letter-spacing:0.22em;filter:blur(0)}
        100%{opacity:1;letter-spacing:0.22em;filter:blur(0)}
      }
      @keyframes bootLineIn {
        0%{opacity:0;transform:translateY(6px)}
        100%{opacity:1;transform:translateY(0)}
      }
      @keyframes bootExit1 {
        0%{opacity:1;transform:scale(1) translateY(0);filter:blur(0)}
        40%{opacity:1;transform:scale(1.06) translateY(-8px);filter:blur(0)}
        100%{opacity:0;transform:scale(1.18) translateY(-24px);filter:blur(8px)}
      }
      @keyframes pageReveal {
        0%{opacity:0;transform:translateY(18px)}
        100%{opacity:1;transform:translateY(0)}
      }
      @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
      @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      @keyframes pulse-dot {
        0%,100%{opacity:1;box-shadow:0 0 0 0 ${C.mint500}55}
        50%{opacity:.6;box-shadow:0 0 0 6px ${C.mint500}00}
      }
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

      .reveal { opacity:0; transform:translateY(24px); transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1); will-change:transform,opacity; }
      .reveal-left { opacity:0; transform:translateX(-20px); transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1); will-change:transform,opacity; }
      .reveal-right { opacity:0; transform:translateX(20px); transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1); will-change:transform,opacity; }
      .reveal-scale { opacity:0; transform:scale(.95); transition:opacity .5s cubic-bezier(.16,1,.3,1),transform .5s cubic-bezier(.16,1,.3,1); will-change:transform,opacity; }
      .reveal.vis, .reveal-left.vis, .reveal-right.vis { opacity:1; transform:translate(0,0); }
      .reveal-scale.vis { opacity:1; transform:scale(1); }
      .d1{transition-delay:.05s}.d2{transition-delay:.1s}.d3{transition-delay:.15s}.d4{transition-delay:.2s}.d5{transition-delay:.25s}

      .mono { font-family: 'JetBrains Mono', 'Courier New', monospace; }

      .nav-link {
        font-family:'JetBrains Mono',monospace; font-size:0.72rem; font-weight:400;
        letter-spacing:0.06em; text-transform:uppercase; color:${C.textMuted};
        background:none; border:none; transition:color 0.2s; padding:0.5rem;
        -webkit-tap-highlight-color:transparent; touch-action: manipulation;
      }
      .nav-link:hover, .nav-link:active { color: ${C.textPri}; }
      .nav-link.active { color: ${C.mint400}; }

      .project-row {
        display:grid; grid-template-columns:52px 1fr 1fr auto;
        gap:2rem; align-items:start; padding:2rem 1.5rem;
        border-top:1px solid ${C.border}; transition:background 0.2s;
      }
      .project-row:last-child { border-bottom:1px solid ${C.border}; }
      .project-row:active { background:${C.bgCard}; }

      .skill-item {
        font-size:0.82rem; font-weight:300; color:${C.textSec};
        padding:0.6rem 0; border-bottom:1px solid ${C.border};
        transition:color 0.2s,padding-left 0.2s; font-family:'JetBrains Mono',monospace;
      }
      .skill-item:active { color:${C.textPri}; padding-left:0.4rem; }

      .btn-primary {
        display:inline-flex; align-items:center; gap:0.5rem;
        padding:0.75rem 1.5rem; background:${C.mint500}; color:${C.bgBase};
        font-family:'JetBrains Mono',monospace; font-size:0.75rem; font-weight:500;
        letter-spacing:0.06em; text-transform:uppercase; border:none; border-radius:4px;
        transition:all 0.2s ease; white-space:nowrap; touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      .btn-primary:active { transform:scale(0.98); background:${C.mint400}; }
      .btn-primary:hover:not(:active) { transform:translateY(-2px); box-shadow:0 8px 32px ${C.mint500}40; }

      .btn-ghost {
        display:inline-flex; align-items:center; gap:0.5rem; padding:0.75rem 1.5rem;
        background:transparent; color:${C.textSec}; font-family:'JetBrains Mono',monospace;
        font-size:0.75rem; font-weight:400; letter-spacing:0.06em; text-transform:uppercase;
        border:1px solid ${C.border}; border-radius:4px; transition:all 0.2s ease;
        white-space:nowrap; touch-action: manipulation;
      }
      .btn-ghost:active { background:${C.bgCard}; }
      .btn-ghost:hover { border-color:${C.mint500}66; color:${C.mint400}; }

      .form-input {
        width:100%; padding:0.85rem 1rem; background:${C.bgCard2};
        border:1px solid ${C.border}; border-radius:4px; color:${C.textPri};
        font-size:1rem; font-weight:300; outline:none;
        transition:border-color 0.2s,box-shadow 0.2s; touch-action: manipulation;
      }
      .form-input:focus { border-color:${C.mint500}88; box-shadow:0 0 0 3px ${C.mint500}18; }
      .form-input:focus-visible { outline:2px solid ${C.mint500}; outline-offset:2px; }

      .cert-card {
        padding:1rem 1.25rem; background:${C.bgCard}; border:1px solid ${C.border};
        border-radius:6px; transition:all 0.2s; cursor:pointer; touch-action: manipulation;
      }
      .cert-card:active { transform:scale(0.98); }
      .cert-card:hover { border-color:var(--cert-color); box-shadow:0 0 20px color-mix(in srgb,var(--cert-color) 15%,transparent); transform:translateY(-2px); }

      .tag-pill {
        display:inline-block; padding:0.25rem 0.6rem;
        background:${C.bgCard2}; border:1px solid ${C.border};
        border-radius:3px; font-size:0.65rem; color:${C.textMuted};
        font-family:'JetBrains Mono',monospace; letter-spacing:0.02em;
      }

      /* Mobile-first responsive */
      @media (max-width: 900px) {
        .project-row { grid-template-columns:40px 1fr; gap:0.75rem; padding:1.25rem 1rem; }
        .proj-desc, .proj-meta { display:none; }
        .lanyard-wrap { display:none !important; }
        .hero-bottom { flex-direction:column !important; align-items:flex-start !important; gap:1.5rem !important; }
        .hero-bottom-right { border-left:none !important; padding-left:0 !important; flex-direction:column !important; align-items:flex-start !important; gap:1rem !important; }
        .skills-inner { flex-direction:column !important; gap:2rem !important; }
        .skills-left { flex:none !important; width:100% !important; }
        .skills-grid { grid-template-columns:1fr 1fr !important; gap:1.5rem !important; }
        .contact-grid { grid-template-columns:1fr !important; gap:2.5rem !important; }
        .certs-grid { grid-template-columns:1fr !important; }
        .stat-row { gap:1.5rem !important; flex-wrap:wrap !important; }
        .hero-section { padding:0 1rem 3rem !important; min-height: auto !important; }
        .work-section { padding:4rem 1rem !important; max-width:100% !important; }
        .skills-section { padding:4rem 1rem !important; }
        .contact-section { padding:4rem 1rem !important; }
        .footer-inner { padding:1rem !important; flex-direction:column !important; align-items:flex-start !important; gap:0.75rem !important; }
        .hero-top-rule { left:1rem !important; right:1rem !important; }
        nav { grid-template-columns: 1fr auto !important; padding: 0 1rem !important; height: 60px !important; }
        .hero-h1 { font-size: clamp(2.5rem, 12vw, 4rem) !important; margin-bottom: 2rem !important; }
        .hero-terminal { padding: 0.75rem 1rem !important; margin-bottom: 1.5rem !important; }
        .hero-terminal .mono { font-size: 0.7rem !important; line-height: 1.6 !important; }
        .btn-row { width: 100%; }
        .btn-row button { flex: 1; justify-content: center; }
      }
      
      @media (max-width: 560px) {
        .skills-grid { grid-template-columns:1fr !important; }

        .stat-row > div { text-align: left !important; }
        .hero-bottom-right p { max-width: 100% !important; border-left: none !important; padding-left: 0 !important; }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        html { scroll-behavior: auto; }
        .reveal, .reveal-left, .reveal-right, .reveal-scale {
          opacity: 1 !important; transform: none !important;
        }
      }

      /* Hardware acceleration */
      .gpu-accelerated { transform: translateZ(0); backface-visibility: hidden; }
    `;
  }, [C]);

  return null;
});

// ── Overlays (Optimized) ───────────────────────────────────────
const Overlays = memo(({ C }) => (
  <>
    <div style={{ 
      position:"fixed", inset:0, pointerEvents:"none", zIndex:9999, opacity:0.015,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` 
    }} />
    <div style={{ 
      position:"fixed", inset:0, pointerEvents:"none", zIndex:0, opacity:0.02,
      backgroundImage: `linear-gradient(${C.mint500} 1px,transparent 1px),linear-gradient(90deg,${C.mint500} 1px,transparent 1px)`,
      backgroundSize: "80px 80px" 
    }} />
  </>
));

// ── Optimized Terminal Typewriter ──────────────────────────────
const TerminalLine = memo(({ text, delay = 0, color, C }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const frameRef = useRef();

  useEffect(() => {
    // Skip animation on mobile for better performance
    if (window.matchMedia('(pointer: coarse)').matches) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    let i = 0;
    const startTimeout = setTimeout(() => {
      const type = () => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i < text.length) {
          frameRef.current = requestAnimationFrame(type);
        } else {
          setDone(true);
        }
      };
      frameRef.current = requestAnimationFrame(type);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay]);

  return (
    <div className="mono" style={{ fontSize:"0.78rem", color: color || C.textMuted, lineHeight: 1.8 }}>
      <span style={{ color: C.mint500, marginRight: "0.5rem" }}>$</span>
      {displayed}
      {!done && <span style={{ animation: "blink 1s step-end infinite", color: C.mint400 }}>|</span>}
    </div>
  );
});

// ── Theme Toggle (Optimized) ───────────────────────────────────
const ThemeToggle = memo(({ C }) => {
  const { isDark, toggle } = useTheme();
  
  const handleClick = useCallback((e) => {
    e.preventDefault();
    toggle();
  }, [toggle]);

  return (
    <button
      onClick={handleClick}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        background: "none", border: `1px solid ${C.border}`,
        borderRadius: "6px", padding: "0.4rem 0.6rem",
        color: C.textMuted, fontSize: "1.1rem", lineHeight: 1,
        transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", touchAction: "manipulation", minWidth: "44px", minHeight: "44px",
      }}
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
});


// ── Boot Screen ────────────────────────────────────────────────
const BootScreen = memo(({ onDone }) => {
  const [phase, setPhase] = useState(0); // 0=title, 1+=lines
  const [exiting, setExiting] = useState(false);

  const LINES = [
    { t:"Checking hardware integrity.......... OK" },
    { t:"Loading network modules.............. OK" },
    { t:"Mounting encrypted volumes........... OK" },
    { t:"Starting security daemon............. OK" },
    { t:"[ paro@thegreat ] — system ready",  accent: true },
  ];

  const skip = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(onDone, 900);
  }, [exiting, onDone]);

  useEffect(() => {
    const delays = [800, 1080, 1340, 1580, 1820];
    const titleTimer = setTimeout(() => setPhase(1), 300);
    const lineTimers = delays.map((d, i) =>
      setTimeout(() => setPhase(p => Math.max(p, i + 2)), d)
    );
    const autoExit = setTimeout(skip, 2700);
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    return () => {
      clearTimeout(titleTimer);
      lineTimers.forEach(clearTimeout);
      clearTimeout(autoExit);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [skip]);

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:99999,
      background:"#000",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      overflow:"hidden",
      animation:"crtFlicker 6s infinite",
      pointerEvents: exiting ? "none" : "auto",
    }}>

      {/* CRT scanlines */}
      <div style={{
        position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
        backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)",
      }} />

      {/* Moving scan beam */}
      <div style={{
        position:"absolute", left:0, right:0, height:"120px", zIndex:3,
        pointerEvents:"none",
        background:"linear-gradient(to bottom,transparent,rgba(0,229,160,0.03),transparent)",
        animation:"scanline 5s linear infinite",
      }} />

      {/* CRT vignette */}
      <div style={{
        position:"absolute", inset:0, zIndex:4, pointerEvents:"none",
        background:"radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,0.82) 100%)",
      }} />

      {/* Content — exits with scale+blur+fade */}
      <div style={{
        position:"relative", zIndex:5,
        display:"flex", flexDirection:"column", alignItems:"center",
        width:"100%", padding:"0 2rem",
        animation: exiting
          ? "bootExit1 0.85s cubic-bezier(.4,0,.2,1) both"
          : "none",
      }}>

        {/* PAROTHEGREAT text */}
        <div style={{
          fontFamily:"'JetBrains Mono',monospace",
          fontSize:"clamp(1.2rem, 5vw, 4rem)",
          fontWeight:500,
          color:"#00E5A0",
          letterSpacing:"0.22em",
          textAlign:"center",
          textShadow:"0 0 30px #00E5A055, 0 0 60px #00E5A022",
          userSelect:"none",
          opacity: phase >= 1 ? 1 : 0,
          animation: phase >= 1 ? "bootTextIn 1s cubic-bezier(.16,1,.3,1) both" : "none",
          marginBottom:"1.2rem",
        }}>
          PAROTHEGREAT
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily:"'JetBrains Mono',monospace",
          fontSize:"clamp(0.55rem,1.2vw,0.7rem)",
          color:"#3a3a3a",
          letterSpacing:"0.2em",
          textTransform:"uppercase",
          marginBottom:"3rem",
          textAlign:"center",
          opacity: phase >= 1 ? 1 : 0,
          transition:"opacity 0.4s ease 0.6s",
        }}>
          Network Engineer · Security Analyst · Sysadmin
        </div>

        {/* Boot lines */}
        <div style={{
          display:"flex", flexDirection:"column", gap:"0.28rem",
          alignItems:"flex-start",
          width:"min(440px, 88vw)",
        }}>
          {LINES.map((l, i) => (
            <div key={i} style={{
              fontFamily:"'JetBrains Mono',monospace",
              fontSize:"clamp(0.52rem,1.1vw,0.64rem)",
              letterSpacing:"0.04em",
              color: l.accent ? "#00E5A0" : "#3a3a3a",
              textShadow: l.accent ? "0 0 10px #00E5A050" : "none",
              fontWeight: l.accent ? 500 : 400,
              opacity: phase >= i + 2 ? 1 : 0,
              animation: phase >= i + 2
                ? `bootLineIn 0.25s ease both`
                : "none",
            }}>
              {l.accent
                ? l.t
                : <><span style={{color:"#222"}}>$ </span>{l.t}</>
              }
            </div>
          ))}
        </div>
      </div>

      {/* Skip hint */}
      <div style={{
        position:"absolute", bottom:"1.75rem",
        fontFamily:"'JetBrains Mono',monospace",
        fontSize:"0.5rem", color:"#1c1c1c",
        letterSpacing:"0.15em", zIndex:5,
      }}>
        PRESS ANY KEY TO SKIP
      </div>
    </div>
  );
});

// ── Theme Flash Overlay ─────────────────────────────────────────
const ThemeFlash = memo(({ isDark }) => {
  const [flash, setFlash] = useState(false);
  const prev = useRef(null);

  useEffect(() => {
    if (prev.current === null) { prev.current = isDark; return; }
    if (prev.current !== isDark) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 380);
      prev.current = isDark;
      return () => clearTimeout(t);
    }
  }, [isDark]);

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:9997, pointerEvents:"none",
      background: isDark ? "#000" : "#fff",
      opacity: flash ? 0.12 : 0,
      transition: flash ? "opacity 0.06s ease" : "opacity 0.32s ease",
    }} />
  );
});

// ── Optimized Navbar with Touch Support ────────────────────────
const Navbar = memo(({ active, C }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isMobile } = useTheme();
  const links = useMemo(() => ["Home","Work","Skills","Contact"], []);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const fn = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = useCallback((l) => {
    setMobileOpen(false);
    // Re-enable scroll
    document.body.style.overflow = '';
    const id = l === "Work" ? "work" : l.toLowerCase();
    document.getElementById(id)?.scrollIntoView({ behavior: isMobile ? "auto" : "smooth" });
  }, [isMobile]);

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && mobileOpen) {
        setMobileOpen(false);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileOpen]);

  const navH = scrolled ? "54px" : "68px";

  return (
    <>
      {/* ── Nav bar ── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0,
        zIndex:1003,
        display:"flex", alignItems:"center",
        justifyContent:"space-between",
        padding: isMobile ? "0 1rem" : "0 2rem",
        height: isMobile ? "60px" : navH,
        background: scrolled ? C.navBgScr : C.navBg,
        backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
        borderBottom:`1px solid ${scrolled ? C.border : C.mint500+"1a"}`,
        transition:"height 0.35s cubic-bezier(.16,1,.3,1), background 0.3s, border-color 0.3s",
      }}>
        {/* Logo */}
        <div className="mono" style={{
          fontSize:"0.82rem", display:"flex", alignItems:"center",
          gap:"0.25rem", letterSpacing:"0.01em",
        }}>
          <span style={{color:C.mint500, fontWeight:500}}>[</span>
          <span style={{color:C.textSec}}>paro</span>
          <span style={{color:C.coral}}>@</span>
          <span style={{color:C.textPri, fontWeight:500}}>thegreat</span>
          <span style={{color:C.mint500, fontWeight:500}}>]</span>
          <span style={{
            color:C.mint500, fontSize:"0.75rem", marginLeft:"3px",
            animation:"blink 1.2s step-end infinite",
          }}>█</span>
        </div>

        {/* Desktop centre links */}
        {!isMobile && (
          <div style={{display:"flex", gap:"0"}}>
            {links.map(l => (
              <button key={l} onClick={() => go(l)} style={{
                fontFamily:"'JetBrains Mono',monospace", fontSize:"0.68rem",
                letterSpacing:"0.07em", textTransform:"uppercase",
                background:"none", border:"none",
                padding:"0.5rem 1.1rem", position:"relative",
                color: active===l ? C.mint400 : C.textMuted,
                transition:"color 0.2s", cursor:"pointer",
              }}>
                {l}
                <span style={{
                  position:"absolute", bottom:"-1px", left:"50%",
                  transform: active===l ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
                  transformOrigin:"center",
                  width:"28px", height:"2px",
                  background:C.mint500, borderRadius:"1px",
                  boxShadow: active===l ? `0 0 8px ${C.mint500}90` : "none",
                  transition:"transform 0.25s cubic-bezier(.16,1,.3,1), box-shadow 0.25s",
                  display:"block",
                }} />
              </button>
            ))}
          </div>
        )}

        {/* Desktop right: status pill + theme toggle */}
        {!isMobile && (
          <div style={{display:"flex", alignItems:"center", gap:"0.75rem"}}>
            <div style={{
              display:"flex", alignItems:"center", gap:"0.5rem",
              padding:"0.28rem 0.7rem",
              border:`1px solid ${C.mint500}28`,
              borderRadius:"20px", background:`${C.mint500}0a`,
            }}>
              <span style={{
                width:"5px", height:"5px", borderRadius:"50%",
                background:C.mint500, display:"inline-block",
                animation:"pulse-dot 2.5s ease-in-out infinite",
              }} />
              <span className="mono" style={{
                fontSize:"0.6rem", color:C.mint500, opacity:0.85, letterSpacing:"0.05em"
              }}>available_for_hire</span>
            </div>
            <ThemeToggle C={C} />
          </div>
        )}

        {/* Mobile right: theme toggle + hamburger */}
        {isMobile && (
          <div style={{display:"flex", alignItems:"center", gap:"0.25rem"}}>
            <ThemeToggle C={C} />
            <button
              onClick={toggleMobile}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              style={{
                background:"none", border:"none",
                display:"flex", flexDirection:"column",
                gap:"5px", padding:"8px",
                touchAction:"manipulation",
                minWidth:"44px", minHeight:"44px",
                alignItems:"center", justifyContent:"center",
                cursor:"pointer",
              }}
            >
              <span style={{
                display:"block", width:"20px", height:"1.5px",
                background:C.mint400, borderRadius:"2px",
                transition:"transform 0.3s",
                transform: mobileOpen ? "rotate(45deg) translate(4.5px,4.5px)" : "none",
              }} />
              <span style={{
                display:"block", width:"20px", height:"1.5px",
                background:C.mint400, borderRadius:"2px",
                transition:"transform 0.3s",
                transform: mobileOpen ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none",
              }} />
            </button>
          </div>
        )}
      </nav>

      {/* ── Mobile full-screen overlay (below navbar) ── */}
      {isMobile && (
        <div style={{
          position:"fixed",
          top:"60px", left:0, right:0, bottom:0,
          zIndex:1002,
          background:C.mobileMenuBg,
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center",
          gap:"1.25rem",
          opacity: mobileOpen ? 1 : 0,
          visibility: mobileOpen ? "visible" : "hidden",
          pointerEvents: mobileOpen ? "auto" : "none",
          transition:"opacity 0.28s ease, visibility 0.28s ease",
        }}>
          <p className="mono" style={{
            fontSize:"0.6rem", color:C.mint500, opacity:0.5,
            letterSpacing:"0.15em", marginBottom:"0.25rem",
          }}>// navigate</p>

          {links.map((l, i) => (
            <button key={l} onClick={() => go(l)} style={{
              background:"none", border:"none", cursor:"pointer",
              fontFamily:"'DM Serif Display',serif",
              fontSize:"2.4rem", fontWeight:400,
              color: active===l ? C.mint400 : C.textPri,
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
              transition:`opacity 0.28s ease ${i*0.05+0.05}s, transform 0.28s ease ${i*0.05+0.05}s, color 0.2s`,
              padding:"0.25rem 1.5rem",
              lineHeight:1.2,
            }}>
              {l}
            </button>
          ))}

          <div style={{marginTop:"1rem", display:"flex", gap:"2rem"}}>
            {Object.entries(SOCIAL_LINKS).map(([label, url]) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                className="mono" style={{
                  fontSize:"0.65rem", color:C.textMuted,
                  textDecoration:"none", padding:"0.35rem 0",
                }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
});

// ── Optimized Uptime Counter ───────────────────────────────────
const START_DATE = new Date("2024-09-16T00:00:00");


const UptimeCounter = memo(({ C }) => {
  const [uptime, setUptime] = useState({ years:0, months:0, days:0, hours:0, minutes:0, seconds:0 });
  const intervalRef = useRef();

  useEffect(() => {
    const calculate = () => {
      const diff = Date.now() - START_DATE.getTime();
      const ts = Math.floor(diff/1000), tm = Math.floor(ts/60), th = Math.floor(tm/60), td = Math.floor(th/24);
      setUptime({
        years: Math.floor(td/365),
        months: Math.floor((td%365)/30),
        days: td%30,
        hours: th%24,
        minutes: tm%60,
        seconds: ts%60
      });
    };
    
    calculate();
    // Update every second, but use less frequent updates if tab is hidden
    intervalRef.current = setInterval(calculate, 1000);
    
    const handleVisibility = () => {
      if (document.hidden) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(calculate, 5000); // Slow down when hidden
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(calculate, 1000);
        calculate();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const pad = useCallback(n => String(n).padStart(2,"0"), []);
  const display = uptime.years > 0 
    ? `${uptime.years}y ${uptime.months}m` 
    : uptime.months > 0 
      ? `${uptime.months}m ${uptime.days}d` 
      : `${uptime.days}d`;

  return (
    <div style={{ textAlign: window.innerWidth < 560 ? "left" : "right" }}>
      <div style={{ 
        fontFamily:"'DM Serif Display',serif", fontSize:"1.75rem", 
        color:C.mint500, lineHeight:1 
      }}>
        {display}
      </div>
      <div className="mono" style={{ 
        fontSize:"0.55rem", letterSpacing:"0.1em", 
        textTransform:"uppercase", color:C.textMuted, marginTop:"0.25rem" 
      }}>
        Uptime
      </div>
      <div className="mono" style={{ 
        fontSize:"0.6rem", color:C.mint500, opacity:0.5, 
        marginTop:"0.2rem", letterSpacing:"0.05em" 
      }}>
        {pad(uptime.hours)}:{pad(uptime.minutes)}:{pad(uptime.seconds)}
      </div>
    </div>
  );
});

// ── Optimized Dither Background (Mobile-aware) ─────────────────
const Dither = memo(({ waveColor=[0.0,0.898,0.627], isMobile=false }) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({ mouse:[0.5,0.5], time:0, raf:null, gl:null, prog:null, locs:{}, frameCount:0 });

  useEffect(() => {
    if (isMobile) return; // Skip WebGL on mobile entirely
    
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { antialias:false, alpha:true, powerPreference: "low-power" });
    if (!gl) return;
    
    const s = stateRef.current; 
    s.gl = gl;
    
    // Simplified shader for better performance
    const vert = `attribute vec2 a_pos; void main(){gl_Position=vec4(a_pos,0.0,1.0);}`;
    const frag = `
      precision lowp float;
      uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse;
      uniform vec3 u_waveColor; uniform float u_pixelSize;
      
      float bayer(vec2 p){
        int x=int(mod(p.x,4.0)),y=int(mod(p.y,4.0));
        float v = float(x*3 + y*5) / 16.0;
        return v;
      }
      
      void main(){
        vec2 pxUV=floor(gl_FragCoord.xy/u_pixelSize)*u_pixelSize; 
        vec2 uv=pxUV/u_res;
        
        float wave = sin(uv.x*10.0+u_time)*0.3 + sin(uv.y*8.0+u_time*0.7)*0.2;
        float brightness = 0.5 + wave;
        
        float dist=length(uv-u_mouse); 
        float ripple=smoothstep(0.3,0.0,dist);
        brightness=mix(brightness,1.0,ripple*0.2);
        
        float threshold=bayer(gl_FragCoord.xy/u_pixelSize);
        float quantized=floor(brightness*3.0+threshold)/3.0;
        
        vec3 dark=vec3(0.039,0.0,0.059);
        vec3 color=mix(dark,u_waveColor,quantized);
        gl_FragColor=vec4(color,1.0);
      }
    `;
    
    const compile = (type,src) => {
      const sh=gl.createShader(type);
      gl.shaderSource(sh,src);
      gl.compileShader(sh);
      return sh;
    };
    
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog); 
    gl.useProgram(prog); 
    s.prog = prog;
    
    const buf = gl.createBuffer(); 
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    
    const loc = gl.getAttribLocation(prog, "a_pos"); 
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    
    s.locs = {
      res: gl.getUniformLocation(prog, "u_res"),
      time: gl.getUniformLocation(prog, "u_time"),
      mouse: gl.getUniformLocation(prog, "u_mouse"),
      waveColor: gl.getUniformLocation(prog, "u_waveColor"),
      pixelSize: gl.getUniformLocation(prog, "u_pixelSize"),
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.floor(canvas.offsetWidth * dpr);
      canvas.height = Math.floor(canvas.offsetHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    
    resize(); 
    const ro = new ResizeObserver(resize); 
    ro.observe(canvas);
    
    const onMouse = (e) => {
      const r = canvas.getBoundingClientRect();
      s.mouse = [(e.clientX-r.left)/r.width, 1.0-(e.clientY-r.top)/r.height];
    };
    
    canvas.addEventListener("mousemove", onMouse, { passive: true });
    
    let lastTime = 0;
    const render = (timestamp) => {
      // Throttle to 30fps for performance
      if (timestamp - lastTime < 33) {
        s.raf = requestAnimationFrame(render);
        return;
      }
      lastTime = timestamp;
      
      s.time += 0.03;
      const { locs } = s;
      
      gl.uniform2f(locs.res, canvas.width, canvas.height); 
      gl.uniform1f(locs.time, s.time);
      gl.uniform2f(locs.mouse, s.mouse[0], s.mouse[1]); 
      gl.uniform3f(locs.waveColor, waveColor[0], waveColor[1], waveColor[2]); 
      gl.uniform1f(locs.pixelSize, 4.0);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); 
      s.raf = requestAnimationFrame(render);
    };
    
    render(0);
    
    return () => {
      cancelAnimationFrame(s.raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouse);
      gl.deleteProgram(prog);
    };
  }, [waveColor, isMobile]);

  if (isMobile) {
    // Return CSS gradient fallback for mobile
    return (
      <div style={{ 
        position:"absolute", inset:0, 
        background: `radial-gradient(ellipse at 30% 20%, ${ACCENT.mint500}15 0%, transparent 50%),
                     radial-gradient(ellipse at 70% 80%, ${ACCENT.violet}10 0%, transparent 50%)`,
        zIndex:0 
      }} />
    );
  }

  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", display:"block", zIndex:0 }} />;
});

// ── Linux Terminal Animation ───────────────────────────────────
const LinuxTerminal = memo(({ C, isMobile, start }) => {
  const SEQUENCE = useMemo(() => [
    {
      cmd: "whoami",
      output: "Sysadmin · Network Engineer · Security Analyst — Bekasi, ID",
      outputColor: C.coral,
    },
    {
      cmd: "cat role.txt",
      output: isMobile
        ? "securing networks · hardening systems · hunting threats"
        : "parothegreat -- securing networks, hardening systems, hunting threats",
      outputColor: C.mint600,
    },
    {
      cmd: "uptime --since 2024-09-16",
      output: isMobile
        ? "status: operational-student"
        : "online since Sep 16 2024 | load avg: high | status: operational-student",
      outputColor: C.mint400,
    },
  ], [C, isMobile]);

  // phase: which command is currently being typed (-1 = not started yet)
  const [phase, setPhase]           = useState(-1);
  const [typed, setTyped]           = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [done, setDone]             = useState(false);
  const timerRef                    = useRef();

  const skipAnim = useMemo(() =>
    typeof window !== "undefined" && window.matchMedia("(pointer:coarse)").matches
  , []);

  useEffect(() => {
    if (!start) return; // wait for boot to finish
    if (skipAnim) { setDone(true); return; }
    timerRef.current = setTimeout(() => setPhase(0), 350);
    return () => clearTimeout(timerRef.current);
  }, [start]); // eslint-disable-line

  useEffect(() => {
    if (skipAnim || phase < 0 || phase >= SEQUENCE.length) return;
    setTyped(0);
    setShowOutput(false);
    const cmd = SEQUENCE[phase].cmd;
    let i = 0;
    const tick = () => {
      i++;
      setTyped(i);
      if (i < cmd.length) {
        timerRef.current = setTimeout(tick, 36 + Math.random() * 24);
      } else {
        timerRef.current = setTimeout(() => {
          setShowOutput(true);
          timerRef.current = setTimeout(() => {
            if (phase + 1 < SEQUENCE.length) setPhase(p => p + 1);
            else setDone(true);
          }, 480);
        }, 170);
      }
    };
    timerRef.current = setTimeout(tick, 36);
    return () => clearTimeout(timerRef.current);
  }, [phase]); // eslint-disable-line

  const fz = isMobile ? "0.65rem" : "0.74rem";

  const Prompt = () => (
    <span style={{userSelect:"none", whiteSpace:"nowrap"}}>
      <span style={{color:"#27C93F"}}>paro@thegreat</span>
      <span style={{color:"rgba(255,255,255,0.2)", margin:"0 0.3rem"}}>~</span>
      <span style={{color:"rgba(255,255,255,0.45)"}}>$</span>
    </span>
  );

  return (
    <div className="hero-terminal" style={{
      marginBottom: isMobile ? "1.5rem" : "2.5rem",
      display: isMobile ? "block" : "inline-block",
      width: isMobile ? "100%" : "auto",
      minWidth: isMobile ? "auto" : "520px",
      background:"rgba(0,0,0,0.55)",
      backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)",
      border:"1px solid rgba(255,255,255,0.07)",
      borderRadius:"8px",
      boxShadow:"0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
      overflow:"hidden", boxSizing:"border-box",
    }}>

      {/* Title bar */}
      <div style={{
        display:"flex", alignItems:"center", gap:"0.5rem",
        padding: isMobile ? "0.5rem 0.75rem" : "0.55rem 1rem",
        background:"rgba(255,255,255,0.04)",
        borderBottom:"1px solid rgba(255,255,255,0.06)",
        flexShrink:0,
      }}>
        <span style={{width:"10px",height:"10px",borderRadius:"50%",background:"#FF5F56",display:"inline-block",flexShrink:0}} />
        <span style={{width:"10px",height:"10px",borderRadius:"50%",background:"#FFBD2E",display:"inline-block",flexShrink:0}} />
        <span style={{width:"10px",height:"10px",borderRadius:"50%",background:"#27C93F",display:"inline-block",flexShrink:0}} />
        <span className="mono" style={{
          fontSize:"0.6rem", color:"rgba(255,255,255,0.25)",
          letterSpacing:"0.08em", marginLeft:"0.5rem", userSelect:"none",
        }}>paro@thegreat: ~</span>
      </div>

      {/* Body — all rows always in DOM so height is fixed from the start */}
      <div style={{padding: isMobile ? "0.85rem 0.9rem" : "1rem 1.25rem"}}>
        {SEQUENCE.map((entry, idx) => {
          const isPast   = skipAnim || phase > idx || done;
          const isActive = !skipAnim && phase === idx;
          // Text to show for the command (full if past/skip, partial if active, invisible placeholder if not yet)
          const cmdText  = isPast    ? entry.cmd
                         : isActive  ? entry.cmd.slice(0, typed)
                         : " "; // non-breaking space — keeps row height
          const showOut  = skipAnim || isPast || (isActive && showOutput);
          // Colour: dim if not yet reached, normal otherwise
          const cmdColor = (isPast || isActive) ? "rgba(255,255,255,0.75)" : "transparent";
          const outColor = showOut ? entry.outputColor : "transparent";
          const promptOpacity = (isPast || isActive || skipAnim) ? 1 : 0.12;

          return (
            <div key={idx}>
              {/* Prompt + command — always takes up space */}
              <div className="mono" style={{fontSize:fz, lineHeight:1.85, color:"rgba(255,255,255,0.35)"}}>
                <span style={{opacity: promptOpacity, transition:"opacity 0.2s"}}>
                  <Prompt />
                </span>
                <span style={{
                  marginLeft:"0.5rem",
                  color: cmdColor,
                  transition:"color 0.15s",
                }}>{cmdText}</span>
                {isActive && !showOutput && (
                  <span style={{animation:"blink 0.9s step-end infinite", color:C.mint400, marginLeft:"1px"}}>▋</span>
                )}
              </div>
              {/* Output — always takes up space via minHeight, colour fades in */}
              <div className="mono" style={{
                fontSize:fz, lineHeight:1.6,
                color: outColor,
                paddingLeft:"0.5rem",
                marginBottom:"0.35rem",
                wordBreak:"break-word",
                minHeight: `calc(${fz} * 1.6)`, // reserve space even when invisible
                transition:"color 0.2s ease",
              }}>
                {entry.output}
              </div>
            </div>
          );
        })}

        {/* Final idle prompt — always in DOM */}
        <div className="mono" style={{fontSize:fz, lineHeight:1.85, color:"rgba(255,255,255,0.35)"}}>
          <span style={{opacity: done || skipAnim ? 1 : 0.12, transition:"opacity 0.3s"}}>
            <Prompt />
          </span>
          {(done || skipAnim) && (
            <span style={{animation:"blink 1.1s step-end infinite", color:C.mint400, marginLeft:"0.5rem", fontSize:"0.9em"}}>▋</span>
          )}
        </div>
      </div>
    </div>
  );
});

// ── Optimized Hero Section ─────────────────────────────────────
const Hero = memo(({ C, booted }) => {
  const [ready, setReady] = useState(false);
  const { isMobile } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToWork = useCallback(() => {
    document.getElementById("work")?.scrollIntoView({ behavior: isMobile ? "auto" : "smooth" });
  }, [isMobile]);

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: isMobile ? "auto" : "smooth" });
  }, [isMobile]);

  return (
    <section id="home" className="hero-section gpu-accelerated" style={{
      minHeight: isMobile ? "auto" : "100vh", 
      display:"flex", flexDirection:"column",
      justifyContent: isMobile ? "flex-start" : "flex-end",
      padding: isMobile ? "0 1rem 3rem" : "0 3rem 5rem", 
      position:"relative", overflow:"hidden",
    }}>
      {/* Dither BG - disabled on mobile */}
      <Dither waveColor={[0.0,0.898,0.627]} isMobile={isMobile} />
      
      {/* Overlay */}
      <div style={{ 
        position:"absolute", inset:0, zIndex:1, 
        background: C.heroOverlay, pointerEvents:"none",
        transition:"background 0.3s ease" 
      }} />

      {/* Top rule — desktop only absolute, mobile hidden */}
      {!isMobile && (
        <div className="hero-top-rule" style={{ 
          position:"absolute", top:"66px",
          left:"3rem", right:"3rem",
          height:"1px", background:C.border, zIndex:2 
        }} />
      )}

      {/* Lanyard - lazy loaded, hidden on mobile */}
      {!isMobile && (
        <div className="lanyard-wrap" style={{
          position:"absolute", top:"35%", right:"12rem", 
          transform:"translateY(-50%)",
          width:"400px", height:"600px", zIndex:3, pointerEvents:"all",
        }}>
          <Suspense fallback={<div style={{ width: "100%", height: "100%", background: C.bgCard, borderRadius: "8px" }} />}>
            <Lanyard position={[0,0,20]} gravity={[0,-40,0]} />
          </Suspense>
        </div>
      )}

      {/* Main content */}
      <div style={{
        opacity: ready ? 1 : 0, 
        transform: ready ? "translateY(0)" : "translateY(20px)",
        transition:"opacity 0.7s ease 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
        position:"relative", zIndex:2,
        paddingTop: isMobile ? "80px" : "0",
      }}>

        {/* ── Animated Linux terminal ── */}
        <LinuxTerminal C={C} isMobile={isMobile} start={booted} />

        {/* Name */}
        <div>
          <h1 className="hero-h1" style={{
            fontFamily:"'DM Serif Display',serif",
            fontSize: isMobile ? "clamp(2rem, 10vw, 3rem)" : "clamp(3rem, 8vw, 7rem)",
            lineHeight: isMobile ? 1.1 : 0.9,
            fontWeight:400, color:C.textPri,
            letterSpacing:"-0.02em",
            marginBottom: isMobile ? "2rem" : "3rem",
          }}>
            Hi, I'm<br />
            <span style={{ fontStyle:"italic", color:C.mint500 }}>Alvaro Prayogo</span>
          </h1>

          <div className="hero-bottom" style={{
            display:"flex", alignItems:"flex-end", justifyContent:"space-between",
            borderTop:`1px solid ${C.border}`, paddingTop: isMobile ? "1.5rem" : "2rem",
            gap: isMobile ? "1.5rem" : "3rem",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
          }}>
            <div className="btn-row" style={{ 
              display:"flex", gap:"0.75rem", flexWrap:"wrap",
              width: isMobile ? "100%" : "auto"
            }}>
              <button className="btn-primary" onClick={scrollToWork} style={{ flex: isMobile ? 1 : "none" }}>
                View Work ↓
              </button>
              <button className="btn-ghost" onClick={scrollToContact} style={{ flex: isMobile ? 1 : "none" }}>
                Get in Touch
              </button>
            </div>

            <div className="hero-bottom-right" style={{
              display:"flex", gap: isMobile ? "1rem" : "1.5rem", 
              alignItems: isMobile ? "flex-start" : "flex-end",
              flexDirection: isMobile ? "column" : "row",
              borderLeft: isMobile ? "none" : `1px solid ${C.border}`,
              paddingLeft: isMobile ? 0 : "1.5rem",
            }}>
              <p style={{
                fontSize:"0.85rem", lineHeight:1.7, fontWeight:300, 
                color:C.textSec, maxWidth:"270px",
              }}>
                "Defending infrastructure, engineering resilient networks, and breaking things before the bad actors do."
              </p>
              <div className="stat-row" style={{ 
                display:"flex", gap: isMobile ? "1.5rem" : "2rem",
                flexWrap:"wrap"
              }}>
                <UptimeCounter C={C} />
                {[["6","Projects"],["2","Certs"]].map(([n,l]) => (
                  <div key={l} style={{ textAlign: isMobile ? "left" : "right" }}>
                    <div style={{ 
                      fontFamily:"'DM Serif Display',serif", 
                      fontSize: isMobile ? "1.5rem" : "1.75rem", 
                      color:C.mint500, lineHeight:1 
                    }}>
                      {n}
                    </div>
                    <div className="mono" style={{ 
                      fontSize:"0.55rem", letterSpacing:"0.1em", 
                      textTransform:"uppercase", color:C.textMuted, marginTop:"0.2rem" 
                    }}>
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// ── Work Section ──────────────────────────────────────────────
const Work = memo(({ C }) => {
  const { isMobile } = useTheme();
  const [hovered, setHovered] = useState(null);

  return (
    <section id="work" className="work-section" style={{
      padding: isMobile ? "4rem 1rem" : "6rem 3rem",
      maxWidth:"1200px", margin:"0 auto"
    }}>
      {/* Header */}
      <div className="reveal" style={{
        display:"flex", justifyContent:"space-between",
        alignItems:"flex-end", marginBottom: isMobile ? "2rem" : "3rem",
        flexWrap:"wrap", gap:"1rem"
      }}>
        <div>
          <p className="mono" style={{fontSize:"0.62rem", color:C.mint500, marginBottom:"0.5rem", letterSpacing:"0.12em"}}>
            // selected_engagements
          </p>
          <h2 style={{
            fontFamily:"'DM Serif Display',serif",
            fontSize: isMobile ? "1.75rem" : "clamp(1.8rem, 3vw, 2.5rem)",
            color:C.textPri, fontWeight:400
          }}>
            Ops that <em>matter</em>
          </h2>
        </div>
        <div style={{display:"flex", alignItems:"center", gap:"0.75rem"}}>
          <span className="mono" style={{
            fontSize:"0.6rem", color:C.textMuted, padding:"0.22rem 0.6rem",
            border:`1px solid ${C.border}`, borderRadius:"3px", letterSpacing:"0.06em",
          }}>
            {PROJECTS.length} projects
          </span>
          <span className="mono" style={{fontSize:"0.68rem", color:C.textMuted}}>2023 — 2025</span>
        </div>
      </div>

      {/* Column header row — desktop only */}
      {!isMobile && (
        <div style={{
          display:"grid", gridTemplateColumns:"52px 1fr 1fr auto",
          gap:"2rem", padding:"0 1.5rem 0.6rem",
          marginBottom:0,
          borderBottom:`1px solid ${C.border}`,
        }}>
          {["#", "Project", "Description", "Stack"].map(h => (
            <span key={h} className="mono" style={{
              fontSize:"0.56rem", color:C.textMuted,
              textTransform:"uppercase", letterSpacing:"0.14em", opacity:0.5,
            }}>
              {h}
            </span>
          ))}
        </div>
      )}

      {/* Project rows */}
      <div>
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className={`project-row reveal d${Math.min(i+1,5)}`}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              cursor:"default",
              background: hovered===p.id ? `${p.accent}08` : "transparent",
              transition:"background 0.2s",
              position:"relative",
            }}
          >
            {/* Accent left bar on hover */}
            <div style={{
              position:"absolute", left:0, top:"0.5rem", bottom:"0.5rem",
              width:"2px", borderRadius:"2px",
              background: hovered===p.id ? p.accent : "transparent",
              transition:"background 0.2s",
            }} />

            {/* ID */}
            <div className="mono" style={{
              fontSize:"0.72rem", color:p.accent,
              fontWeight:500, paddingTop:"0.2rem", paddingLeft:"0.75rem",
            }}>
              {p.id}
            </div>

            {/* Title + category */}
            <div>
              <h3 style={{
                fontFamily:"'DM Serif Display',serif",
                fontSize: isMobile ? "1.05rem" : "clamp(1.1rem, 2vw, 1.35rem)",
                fontWeight:400, color:C.textPri, marginBottom:"0.3rem", lineHeight:1.2,
              }}>
                {p.title}
              </h3>
              <div style={{display:"flex", alignItems:"center", gap:"0.45rem"}}>
                <span style={{
                  display:"inline-block", width:"5px", height:"5px",
                  borderRadius:"1px", background:p.accent, flexShrink:0,
                }} />
                <p className="mono" style={{
                  fontSize:"0.6rem", color:p.accent, opacity:0.85,
                }}>
                  {p.category}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="proj-desc" style={{
              fontSize:"0.82rem", lineHeight:1.75, fontWeight:300,
              color:C.textSec, maxWidth:"380px",
            }}>
              {p.desc}
            </p>

            {/* Year + tags */}
            <div className="proj-meta" style={{textAlign:"right"}}>
              <div className="mono" style={{
                fontSize:"0.62rem", color:C.textMuted,
                marginBottom:"0.5rem", opacity:0.6,
              }}>
                {p.year}
              </div>
              <div style={{display:"flex", flexDirection:"column", gap:"0.28rem", alignItems:"flex-end"}}>
                {p.tags.map(t => (
                  <span key={t} className="tag-pill" style={{
                    borderColor: hovered===p.id ? `${p.accent}55` : C.border,
                    color: hovered===p.id ? p.accent : C.textMuted,
                    transition:"color 0.2s, border-color 0.2s",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

// ── Skills Section ────────────────────────────────────────────
const Skills = memo(({ C }) => {
  const { isMobile } = useTheme();
  const [activeFilter, setActiveFilter] = useState(null);

  return (
    <section id="skills" className="skills-section" style={{
      padding: isMobile ? "4rem 1rem" : "6rem 3rem",
      borderTop:`1px solid ${C.border}`
    }}>
      <div style={{maxWidth:"1200px", margin:"0 auto"}}>

        {/* Section header */}
        <div className="reveal" style={{
          display:"flex", justifyContent:"space-between",
          alignItems:"flex-end", flexWrap:"wrap", gap:"1rem",
          marginBottom: isMobile ? "2.5rem" : "3rem",
        }}>
          <div>
            <p className="mono" style={{fontSize:"0.62rem", color:C.mint500, marginBottom:"0.5rem", letterSpacing:"0.12em"}}>
              // capabilities
            </p>
            <h2 style={{
              fontFamily:"'DM Serif Display',serif",
              fontSize: isMobile ? "1.75rem" : "clamp(1.8rem, 2.5vw, 2.4rem)",
              color:C.textPri, fontWeight:400, lineHeight:1.15,
            }}>
              Tools & <em>Expertise</em>
            </h2>
          </div>
          <p style={{
            fontSize:"0.82rem", lineHeight:1.65, fontWeight:300,
            color:C.textSec, maxWidth:"300px",
          }}>
            From Cisco ASA configs to Metasploit modules — operating across the full security and networking stack.
          </p>
        </div>

        {/* Filter pills */}
        <div style={{
          display:"flex", gap:"0.5rem", flexWrap:"wrap",
          marginBottom: isMobile ? "2rem" : "2.5rem",
        }}>
          {SKILLS.map(s => {
            const on = activeFilter === s.category;
            return (
              <button key={s.category}
                onClick={() => setActiveFilter(on ? null : s.category)}
                className="mono"
                style={{
                  fontSize:"0.6rem", letterSpacing:"0.08em", textTransform:"uppercase",
                  padding:"0.32rem 0.8rem", borderRadius:"4px", cursor:"pointer",
                  border:`1px solid ${on ? s.accent : C.border}`,
                  background: on ? `${s.accent}14` : "transparent",
                  color: on ? s.accent : C.textMuted,
                  transition:"all 0.2s", display:"flex", alignItems:"center", gap:"0.4rem",
                }}>
                <span style={{
                  width:"5px", height:"5px", borderRadius:"1px",
                  background: on ? s.accent : C.textMuted,
                  flexShrink:0, transition:"background 0.2s",
                }} />
                {s.category}
              </button>
            );
          })}
          {activeFilter && (
            <button onClick={() => setActiveFilter(null)}
              className="mono"
              style={{
                fontSize:"0.6rem", letterSpacing:"0.08em",
                padding:"0.32rem 0.8rem", borderRadius:"4px", cursor:"pointer",
                border:`1px solid ${C.border}`,
                background:"transparent", color:C.textMuted,
                transition:"all 0.2s",
              }}>
              ✕ clear
            </button>
          )}
        </div>

        {/* Skill columns */}
        <div className="skills-grid" style={{
          display:"grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)",
          gap: isMobile ? "1.5rem" : "0",
        }}>
          {SKILLS.map((group, i) => {
            const dimmed = activeFilter && activeFilter !== group.category;
            return (
              <div key={group.category} className={`reveal d${i+1}`} style={{
                borderLeft: !isMobile && i > 0 ? `1px solid ${C.border}` : "none",
                paddingLeft: !isMobile && i > 0 ? "2rem" : 0,
                paddingRight: !isMobile && i < SKILLS.length-1 ? "2rem" : 0,
                opacity: dimmed ? 0.28 : 1,
                transition:"opacity 0.25s",
              }}>
                {/* Category heading */}
                <div style={{
                  display:"flex", alignItems:"center", gap:"0.5rem",
                  borderBottom:`2px solid ${group.accent}`,
                  paddingBottom:"0.75rem", marginBottom:"0.85rem",
                }}>
                  <span style={{
                    width:"7px", height:"7px", borderRadius:"2px",
                    background:group.accent, flexShrink:0,
                  }} />
                  <p className="mono" style={{
                    fontSize:"0.62rem", textTransform:"uppercase",
                    letterSpacing:"0.1em", color:group.accent, fontWeight:500,
                  }}>
                    {group.category}
                  </p>
                </div>

                {/* Items */}
                <div style={{display:"flex", flexDirection:"column"}}>
                  {group.items.map((item) => (
                    <div key={item} style={{
                      display:"flex", alignItems:"center", gap:"0.55rem",
                      padding:"0.5rem 0",
                      borderBottom:`1px solid ${C.border}`,
                    }}>
                      <span style={{
                        width:"3px", height:"3px", borderRadius:"50%",
                        background:group.accent, opacity:0.55, flexShrink:0,
                      }} />
                      <span className="mono" style={{
                        fontSize:"0.78rem", fontWeight:300, color:C.textSec,
                      }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

        {/* Certifications */}
        <div className="reveal" style={{ marginTop: isMobile ? "3rem" : "5rem" }}>
          <p className="mono" style={{ fontSize:"0.65rem", color:C.mint500, marginBottom:"0.5rem" }}>
            // certifications
          </p>
          <h3 style={{ 
            fontFamily:"'DM Serif Display',serif", 
            fontSize: isMobile ? "1.5rem" : "clamp(1.4rem, 2vw, 1.8rem)",
            color:C.textPri, fontWeight:500, marginBottom:"1.5rem" 
          }}>
            Credentials & <em>Certs</em> (more upcoming)
          </h3>
          <div className="certs-grid" style={{ 
            display:"grid", 
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", 
            gap:"1rem" 
          }}>
            {CERTS.map((cert, i) => (
              <div
                key={cert.name}
                className={`cert-card reveal-scale d${i+1}`}
                style={{ "--cert-color": cert.color }}
              >
                <div className="mono" style={{ 
                  fontSize:"0.55rem", color:cert.color, opacity:0.7, 
                  marginBottom:"0.4rem", letterSpacing:"0.12em", textTransform:"uppercase" 
                }}>
                  {cert.issuer}
                </div>
                <div className="mono" style={{ 
                  fontSize: isMobile ? "1rem" : "1.1rem", 
                  fontWeight:500, color:cert.color, marginBottom:"0.25rem" 
                }}>
                  {cert.name}
                </div>
                <div style={{ 
                  fontSize:"0.75rem", color:C.textMuted, fontWeight:300, marginBottom:"1rem" 
                }}>
                  {cert.full}
                </div>
                {/* Action buttons */}
                <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
                  <a
                    href={cert.credlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono"
                    style={{
                      fontSize:"0.6rem", color:cert.color, opacity:0.7,
                      letterSpacing:"0.08em", textDecoration:"none",
                      border:`1px solid ${cert.color}40`,
                      padding:"0.3rem 0.65rem", borderRadius:"3px",
                      transition:"opacity 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "0.7"}
                    onClick={e => e.stopPropagation()}
                  >
                    Verify on Credly ↗
                  </a>
                  {cert.pdfUrl && (
                    <a
                      href={cert.pdfUrl}
                      download
                      className="mono"
                      style={{
                        fontSize:"0.6rem", color:C.textMuted, opacity:0.6,
                        letterSpacing:"0.08em", textDecoration:"none",
                        border:`1px solid ${C.border}`,
                        padding:"0.3rem 0.65rem", borderRadius:"3px",
                        transition:"opacity 0.2s, color 0.2s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.color=cert.color; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity="0.6"; e.currentTarget.style.color=C.textMuted; }}
                      onClick={e => e.stopPropagation()}
                    >
                      ./download.sh ↓
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
});

// ── Optimized Contact Section ──────────────────────────────────
const Contact = memo(({ C }) => {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const { isMobile } = useTheme();

  const handleSubmit = useCallback(() => {
    if (form.name && form.email && form.message) {
      setSent(true);
    }
  }, [form]);

  const handleChange = useCallback((key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  return (
    <section id="contact" className="contact-section" style={{ 
      padding: isMobile ? "4rem 1rem" : "6rem 3rem", 
      borderTop:`1px solid ${C.border}` 
    }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <div className="contact-grid" style={{ 
          display:"grid", 
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", 
          gap: isMobile ? "2.5rem" : "6rem" 
        }}>
          {/* Left */}
          <div className="reveal-left">
            <p className="mono" style={{ fontSize:"0.65rem", color:C.mint500, marginBottom:"0.5rem" }}>
              // initiate_contact
            </p>
            <h2 style={{ 
              fontFamily:"'DM Serif Display',serif", 
              fontSize: isMobile ? "1.75rem" : "clamp(1.8rem, 3vw, 2.8rem)",
              color:C.textPri, fontWeight:400, lineHeight:1.1, marginBottom:"1.5rem" 
            }}>
              Let's secure<br /><em>something</em>
            </h2>
            <p style={{ 
              fontSize:"0.85rem", lineHeight:1.7, fontWeight:300, 
              color:C.textSec, maxWidth:"320px", marginBottom:"2rem" 
            }}>
              Open to infrastructure projects, security audits, network design engagements, or long-term ops roles.
            </p>
            
            {[
              ["Email","alvaroprayogo38@gmail.com",C.mint500],
              ["Based in","Bekasi, Indonesia",null],
              ["PGP Key","0xSH3L·L0WN·3D42·CAF",C.textMuted],
              ["Response","Within 24h",null],
            ].map(([label,value,accent]) => (
              <div key={label} style={{ 
                display:"flex", justifyContent:"space-between", 
                alignItems:"center", padding:"0.75rem 0",
                borderBottom:`1px solid ${C.border}` 
              }}>
                <span className="mono" style={{ fontSize:"0.65rem", color:C.textMuted }}>
                  {label}
                </span>
                <span className="mono" style={{ 
                  fontSize:"0.75rem", color:accent||C.textSec, fontWeight:400 
                }}>
                  {value}
                </span>
              </div>
            ))}
            
            <div style={{ display:"flex", gap:"1.5rem", marginTop:"2rem", flexWrap:"wrap" }}>
              {Object.entries(SOCIAL_LINKS).map(([label,url]) => (
                <a 
                  key={label} 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{
                    fontFamily:"'JetBrains Mono',monospace", 
                    fontSize:"0.65rem", color:C.textMuted, 
                    textDecoration:"none", transition:"color 0.2s",
                    padding: "0.5rem 0",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal-right">
            {sent ? (
              <div style={{ 
                height:"100%", display:"flex", flexDirection:"column", 
                justifyContent:"center", alignItems:"center", 
                textAlign:"center", gap:"1.25rem",
                padding: isMobile ? "2rem 0" : 0
              }}>
                <div style={{ 
                  width:"48px", height:"48px", borderRadius:"50%", 
                  background:`${C.mint500}18`, border:`1px solid ${C.mint500}55`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"1.25rem", color:C.mint500 
                }}>
                  ✓
                </div>
                <h3 style={{ 
                  fontFamily:"'DM Serif Display',serif", 
                  fontSize:"1.4rem", color:C.textPri 
                }}>
                  Transmission received
                </h3>
                <p className="mono" style={{ fontSize:"0.7rem", color:C.textSec }}>
                  I'll respond within 24 hours.
                </p>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
                {[
                  {key:"name", label:"full_name", type:"text"},
                  {key:"email", label:"email_address", type:"email"}
                ].map(f => (
                  <div key={f.key} style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
                    <label className="mono" style={{ 
                      fontSize:"0.6rem", color:C.textMuted, letterSpacing:"0.06em" 
                    }}>
                      {f.label}
                    </label>
                    <input 
                      className="form-input" 
                      type={f.type} 
                      value={form[f.key]} 
                      onChange={e => handleChange(f.key, e.target.value)}
                      autoComplete={f.key === "email" ? "email" : "name"}
                    />
                  </div>
                ))}
                <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
                  <label className="mono" style={{ 
                    fontSize:"0.6rem", color:C.textMuted, letterSpacing:"0.06em" 
                  }}>
                    message
                  </label>
                  <textarea 
                    className="form-input" 
                    rows={isMobile ? 4 : 5} 
                    style={{ resize:"none" }} 
                    value={form.message} 
                    onChange={e => handleChange("message", e.target.value)}
                  />
                </div>
                <button 
                  className="btn-primary" 
                  onClick={handleSubmit} 
                  style={{ alignSelf:"flex-start" }}
                >
                  ./send_message.sh →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

// ── Optimized Footer ───────────────────────────────────────────
const Footer = memo(({ C }) => {
  const { isMobile } = useTheme();
  
  return (
    <footer className="footer-inner" style={{
      padding: isMobile ? "1.25rem" : "1.5rem 3rem",
      borderTop:`1px solid ${C.border}`,
      display:"flex", justifyContent:"space-between", 
      alignItems:"center", flexWrap:"wrap", gap:"1rem",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "flex-start" : "center",
    }}>
      <span className="mono" style={{ fontSize:"0.75rem", color:C.textMuted }}>
        <span style={{ color:C.mint500 }}>[</span>
        paro@thegreat
        <span style={{ color:C.coral }}>:~</span>
        <span style={{ color:C.mint500 }}>]</span>
        <span style={{ color:C.textMuted }}>$</span>
      </span>
      
      <div style={{ display:"flex", gap:"1.5rem" }}>
        {Object.entries(SOCIAL_LINKS).map(([label,url]) => (
          <a 
            key={label} 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              fontFamily:"'JetBrains Mono',monospace", 
              fontSize:"0.65rem", color:C.textMuted, 
              textDecoration:"none",
              padding: "0.25rem 0",
            }}
          >
            {label}
          </a>
        ))}
      </div>
      
      <span className="mono" style={{ fontSize:"0.65rem", color:C.textMuted }}>
        © {new Date().getFullYear()}
      </span>
    </footer>
  );
});

// ── Optimized Scroll Reveal Hook ───────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("vis");
          obs.unobserve(e.target); // Only animate once
        }
      });
    }, { 
      threshold: 0.1, 
      rootMargin: "0px 0px -50px 0px" 
    });
    
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale").forEach(el => {
      obs.observe(el);
    });
    
    return () => obs.disconnect();
  }, []);
}

// ── Optimized Scroll Spy Hook ──────────────────────────────────
function useScrollSpy() {
  const [active, setActive] = useState("Home");
  
  useEffect(() => {
    const sections = [
      {id:"home", label:"Home"},
      {id:"work", label:"Work"},
      {id:"skills", label:"Skills"},
      {id:"contact", label:"Contact"}
    ];
    
    let rafId;
    const fn = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY + 100;
        for (let i = sections.length-1; i >= 0; i--) {
          const el = document.getElementById(sections[i].id);
          if (el && el.offsetTop <= y) {
            setActive(sections[i].label);
            break;
          }
        }
      });
    };
    
    window.addEventListener("scroll", fn, { passive: true });
    return () => {
      window.removeEventListener("scroll", fn);
      cancelAnimationFrame(rafId);
    };
  }, []);
  
  return active;
}

// ── Main App Component ─────────────────────────────────────────
export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [booted, setBooted] = useState(false);
  const { isMobile, isTouch } = useMobileDetect();
  const C = useMemo(() => makeTokens(isDark), [isDark]);
  const toggle = useCallback(() => setIsDark(d => !d), []);
  const active = useScrollSpy();

  useScrollReveal();

  const themeValue = useMemo(() => ({
    isDark,
    toggle,
    isMobile
  }), [isDark, toggle, isMobile]);

  return (
    <ThemeCtx.Provider value={themeValue}>
      <GlobalStyles C={C} isMobile={isMobile} />
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      <ThemeFlash isDark={isDark} />

      {/* Navbar always outside transform wrapper — fixed positioning must not have transform ancestors */}
      <Navbar active={active} C={C} />

      {/* Page content fades in after boot — opacity only, NO transform (would break position:fixed children) */}
      <div style={{
        opacity: booted ? 1 : 0,
        transition: booted ? "opacity 0.8s cubic-bezier(.16,1,.3,1) 0.1s" : "none",
      }}>
        <Overlays C={C} />
        <Hero C={C} booted={booted} />
        <Work C={C} />
        <Skills C={C} />
        <Contact C={C} />
        <Footer C={C} />
      </div>
    </ThemeCtx.Provider>
  );
}