import React, {
  useState, useEffect, useLayoutEffect, useRef,
  createContext, useContext, memo, useCallback, useMemo,
} from "react";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";
import ProfileCard from "./ProfileCard";
import DecryptedText from "./DecryptedText";

// ─────────────────────────────────────────────────────────────────
// THEME CONTEXT
// ─────────────────────────────────────────────────────────────────
const ThemeCtx = createContext({ isDark: true, toggle: () => {}, isMobile: false });
const useTheme = () => useContext(ThemeCtx);

// ─────────────────────────────────────────────────────────────────
// MOBILE DETECTION
// ─────────────────────────────────────────────────────────────────
function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch]   = useState(false);
  useEffect(() => {
    const check = () => {
      const ua = navigator.userAgent.toLowerCase();
      const mob = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(ua);
      const touch = window.matchMedia("(pointer: coarse)").matches;
      const small = window.innerWidth < 900;
      setIsMobile(mob || touch || small);
      setIsTouch(touch || "ontouchstart" in window);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return { isMobile, isTouch };
}

// ─────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────
const makeTokens = (isDark) =>
  isDark
    ? {
        // Dark: deep obsidian + refined slate borders + indigo/emerald accents
        bgBase:       "#0D0D12",
        bgCard:       "#13131A",
        bgCard2:      "#1A1A24",
        bgCard3:      "#1F1F2E",
        border:       "#252535",
        borderFaint:  "#1C1C2A",
        textPri:      "#EEF0F6",
        textSec:      "#8892A4",
        textMuted:    "#4E566A",
        navBg:        "rgba(13,13,18,0.40)",
        navBgScr:     "rgba(13,13,18,0.92)",
        overlayBg:    "rgba(13,13,18,0.60)",
        heroOverlay:  "linear-gradient(to top,#0D0D12f8 0%,#0D0D12b0 38%,#0D0D1260 65%,transparent 100%)",
        mobileMenuBg: "#0D0D12",
        // Accent palette — indigo primary, emerald secondary
        accent:       "#6366F1",   // indigo 500
        accentLight:  "#818CF8",   // indigo 400
        accentDark:   "#4F52D9",   // indigo 600
        emerald:      "#10B981",   // emerald 500
        emeraldLight: "#34D399",   // emerald 400
        emeraldDark:  "#059669",   // emerald 600
        amber:        "#F59E0B",   // amber
        rose:         "#F43F5E",   // rose
        sky:          "#38BDF8",   // sky
      }
    : {
        // Light: warm parchment + ink text + sage/indigo accents
        bgBase:       "#F8F7F3",
        bgCard:       "#FFFFFF",
        bgCard2:      "#F0EFE9",
        bgCard3:      "#E8E6DF",
        border:       "#D8D6CE",
        borderFaint:  "#E8E6DF",
        textPri:      "#18181F",
        textSec:      "#4A4E5C",
        textMuted:    "#8C909C",
        navBg:        "rgba(248,247,243,0.82)",
        navBgScr:     "rgba(248,247,243,0.96)",
        overlayBg:    "rgba(248,247,243,0.78)",
        heroOverlay:  "linear-gradient(to top,#F8F7F3f8 0%,#F8F7F3c0 40%,#F8F7F360 65%,transparent 100%)",
        mobileMenuBg: "#F8F7F3",
        accent:       "#4F52D9",
        accentLight:  "#6366F1",
        accentDark:   "#3730A3",
        emerald:      "#059669",
        emeraldLight: "#10B981",
        emeraldDark:  "#047857",
        amber:        "#D97706",
        rose:         "#E11D48",
        sky:          "#0284C7",
      };

// ─────────────────────────────────────────────────────────────────
// DATA — SYNCED FROM README
// ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "01",
    title: "go-bot",
    category: "Autonomous Reconnaissance Tool",
    repo: "https://github.com/parothegreat/go-bot",
    stack: ["Go", "goroutines", "HTTP client", "CLI"],
    year: "2025",
    status: "active",
    featured: true,
    accent: "emerald",
    desc: "An autonomous bot written in Go for penetration testing recon workflows. Concurrent goroutine-based request handling for fast target enumeration across systems.",
    impact: [
      "Reduces manual reconnaissance time by eliminating repetitive enumeration steps",
      "Modular plugin architecture allows new recon modules without touching core logic",
      "Structured output for downstream analysis and reporting",
    ],
    challenges: [
      "Designing a goroutine pool that avoids race conditions under high concurrency",
      "Keeping the binary portable and dependency-free across Linux environments",
      "Structuring extensibility without sacrificing simplicity of the core task runner",
    ],
  },
  {
    id: "02",
    title: "rfid-access-control-system",
    category: "Institutional Physical Access Platform",
    repo: "https://github.com/teamitmivhs/rfid-access-control-system",
    stack: ["Go", "RFID hardware", "REST API", "PostgreSQL"],
    year: "2024",
    status: "completed",
    featured: true,
    accent: "accent",
    desc: "Full RFID-based physical access control system for SMK Mitra Industri MM2100. Sub-200ms card read-to-response latency with role-based area permissions and full audit trail.",
    impact: [
      "Replaced manual attendance and access tracking with an automated, auditable system",
      "Institutional deployment across multiple campus access points used daily by students and staff",
      "Full audit trail per card read with timestamp and location logging",
    ],
    challenges: [
      "Bridging physical RFID hardware reads with a Go backend in real time under sub-200ms SLA",
      "Designing role-based permission mappings that stay manageable as access points scale",
      "Ensuring the system degrades gracefully during network or DB interruptions",
    ],
  },
  {
    id: "03",
    title: "go_http_checker",
    category: "Infrastructure HTTP Monitor",
    repo: "https://github.com/parothegreat/go_http_checker",
    stack: ["Go", "net/http", "concurrent workers", "TLS"],
    year: "2024",
    status: "completed",
    featured: false,
    accent: "sky",
    desc: "Lightweight production-ready HTTP health checking utility. Monitors endpoint availability, response times, and status codes — single binary, no runtime dependencies.",
    impact: [
      "Operational visibility for self-hosted infrastructure without heavy observability overhead",
      "Ships as a single binary deployable on any Linux server — zero install friction",
      "Ideal for post-deploy smoke tests and lightweight uptime monitoring",
    ],
    challenges: [
      "Implementing concurrent checks across many endpoints without goroutine leaks",
      "Handling TLS edge cases and configurable retry/timeout policies correctly",
      "Keeping memory footprint minimal even under continuous monitoring load",
    ],
  },
  {
    id: "04",
    title: "Mitra-Coffeeshop",
    category: "Institutional Web Application",
    repo: "https://github.com/teamitmivhs/Mitra-Coffeeshop",
    stack: ["TypeScript", "React", "Next.js", "Node.js"],
    year: "2024",
    status: "completed",
    featured: false,
    accent: "amber",
    desc: "Full-stack web platform for the Mitra Industri Vocational High School coffee shop. Handles product display, ordering workflow, and operational management.",
    impact: [
      "Digitalised the school coffee shop's full ordering and inventory workflow",
      "Actively deployed and used daily by students and staff on campus",
      "Role-based admin access for product, order, and session management",
    ],
    challenges: [
      "Enforcing TypeScript type safety across a full-stack Next.js + Node.js codebase",
      "Designing a UX that works reliably on low-spec school devices and slow networks",
      "Coordinating a collaborative team build within the teamitmivhs org",
    ],
  },
  {
    id: "05",
    title: "work-order",
    category: "Digital Workflow Management System",
    repo: "https://github.com/teamitmivhs/work-order",
    stack: ["HTML", "CSS", "JavaScript", "backend API"],
    year: "2023",
    status: "completed",
    featured: false,
    accent: "rose",
    desc: "Digital work order management for SMK Mitra Industri MM2100. Streamlines creation, assignment, tracking, and resolution of maintenance and technical tasks.",
    impact: [
      "Eliminated paper-based work orders — full digital audit trail per completed task",
      "School-wide deployment across maintenance and technical departments",
      "Real-time supervisor view of open tasks with searchable history",
    ],
    challenges: [
      "Designing a simple enough workflow that non-technical staff could adopt without training",
      "Building role-based approval stages (submit → assign → approve) that map to real ops",
      "Ensuring reliability on the school's existing network infrastructure",
    ],
  },
];

const SKILLS = [
  {
    category: "Linux & Sysadmin",
    accent: "emerald",
    items: [
      { name: "Linux (Fedora/Ubuntu/CentOS)", level: 95 },
      { name: "systemd / cgroups / hardening",  level: 88 },
      { name: "Bash / Shell Scripting",          level: 92 },
      { name: "Nginx / reverse proxy",           level: 82 },
      { name: "User & permission management",    level: 90 },
    ],
  },
  {
    category: "Penetration Testing",
    accent: "rose",
    items: [
      { name: "Recon & enumeration",    level: 72 },
      { name: "Go offensive tooling",   level: 68 },
      { name: "CTF (web/linux/network)",level: 65 },
      { name: "OWASP Top 10",           level: 60 },
      { name: "CVE analysis",           level: 62 },
    ],
  },
  {
    category: "Networking & Infra",
    accent: "sky",
    items: [
      { name: "TCP/IP / DNS / DHCP",   level: 80 },
      { name: "VPN / firewall rules",  level: 75 },
      { name: "VLANs / routing basics",level: 72 },
      { name: "Wireshark / traffic analysis", level: 70 },
      { name: "Network hardening",     level: 68 },
    ],
  },
  {
    category: "Backend & Dev",
    accent: "accent",
    items: [
      { name: "Go (REST / CLI / concurrent)", level: 78 },
      { name: "TypeScript / React / Next.js", level: 75 },
      { name: "Docker / containerisation",    level: 65 },
      { name: "Git / GitHub Actions / CI-CD", level: 80 },
      { name: "PostgreSQL / MySQL / Redis",   level: 62 },
    ],
  },
];

const SOCIAL_LINKS = {
  GitHub:   "https://github.com/parothegreat",
  LinkedIn: "https://linkedin.com/in/moehammad-alvaro-pirata-prayogo-842a8834a",
  TryHackMe:"https://tryhackme.com/p/parothegreat",
  LeetCode: "https://leetcode.com/parothegreat",
};

const CERTS = [
  { name: "Networking Essentials",      issuer: "Cisco Networking Academy", group: "cisco",  accent: "sky" },
  { name: "Linux Essentials",           issuer: "Cisco Networking Academy", group: "cisco",  accent: "sky" },
  { name: "Cybersecurity Essentials",   issuer: "Cisco Networking Academy", group: "cisco",  accent: "sky" },
  { name: "Ethical Hacking Essentials", issuer: "EC-Council / Cisco",       group: "sec",    accent: "rose" },
  { name: "Network Defence Essentials", issuer: "EC-Council",               group: "sec",    accent: "rose" },
  { name: "Introduction to Cybersecurity", issuer: "Cisco / NDG",           group: "sec",    accent: "accent" },
  { name: "Google for Developers",      issuer: "Google",                   group: "google", accent: "emerald" },
  { name: "Google Cloud Fundamentals",  issuer: "Google Cloud",             group: "google", accent: "emerald" },
  { name: "NDG Linux Essentials",       issuer: "NDG / Cisco",              group: "linux",  accent: "amber" },
  { name: "Linux Unhatched",            issuer: "NDG / Cisco",              group: "linux",  accent: "amber" },
];

// ─────────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────────────────────────
const GlobalStyles = memo(({ C, isMobile }) => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=JetBrains+Mono:wght@400;500;600&display=swap";
    link.media = "print";
    link.onload = () => { link.media = "all"; };
    if (!document.querySelector(`link[href="${link.href}"]`)) document.head.appendChild(link);

    let vp = document.querySelector('meta[name="viewport"]');
    if (!vp) { vp = document.createElement("meta"); vp.name = "viewport"; document.head.appendChild(vp); }
    vp.content = "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes";

    let tc = document.querySelector('meta[name="theme-color"]');
    if (!tc) { tc = document.createElement("meta"); tc.name = "theme-color"; document.head.appendChild(tc); }
    tc.content = C.bgBase;
  }, [C.bgBase]);

  useEffect(() => {
    const id = "__paro-styles";
    let el = document.getElementById(id);
    if (!el) { el = document.createElement("style"); el.id = id; document.head.appendChild(el); }
    el.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
      body {
        background: ${C.bgBase}; color: ${C.textPri};
        font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        transition: background 0.3s ease, color 0.3s ease;
        -webkit-tap-highlight-color: transparent;
        overflow-x: hidden; touch-action: pan-y;
      }
      ::selection { background: ${C.accent}28; color: ${C.accentLight}; }
      input, textarea { font-family: inherit; -webkit-appearance: none; border-radius: 0; }
      input::placeholder, textarea::placeholder { color: ${C.textMuted}; }
      button { cursor: pointer; font-family: inherit; touch-action: manipulation; }
      a { touch-action: manipulation; }

      @keyframes fadeUp    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
      @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes scanline  { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
      @keyframes crtFlicker { 0%{opacity:1} 3%{opacity:0.94} 5%{opacity:1} 22%{opacity:1} 23%{opacity:0.96} 24%{opacity:1} 100%{opacity:1} }
      @keyframes bootTextIn { 0%{opacity:0;letter-spacing:.6em;filter:blur(6px)} 60%{opacity:1;letter-spacing:.22em;filter:blur(0)} 100%{opacity:1;letter-spacing:.22em;filter:blur(0)} }
      @keyframes bootExit1  { 0%{opacity:1;transform:scale(1) translateY(0);filter:blur(0)} 40%{opacity:1;transform:scale(1.05) translateY(-6px);filter:blur(0)} 100%{opacity:0;transform:scale(1.14) translateY(-20px);filter:blur(8px)} }
      @keyframes pulse-dot  { 0%,100%{opacity:1;box-shadow:0 0 0 0 ${C.emerald}55} 50%{opacity:.6;box-shadow:0 0 0 5px ${C.emerald}00} }
      @keyframes shimmer    { 0%{background-position:200% 50%} 100%{background-position:-200% 50%} }

      .reveal        { opacity:0; transform:translateY(20px); transition:opacity .5s cubic-bezier(.16,1,.3,1),transform .5s cubic-bezier(.16,1,.3,1); will-change:transform,opacity; }
      .reveal-left   { opacity:0; transform:translateX(-18px); transition:opacity .5s cubic-bezier(.16,1,.3,1),transform .5s cubic-bezier(.16,1,.3,1); }
      .reveal-right  { opacity:0; transform:translateX(18px);  transition:opacity .5s cubic-bezier(.16,1,.3,1),transform .5s cubic-bezier(.16,1,.3,1); }
      .reveal-scale  { opacity:0; transform:scale(.96);  transition:opacity .45s cubic-bezier(.16,1,.3,1),transform .45s cubic-bezier(.16,1,.3,1); }
      .reveal.vis, .reveal-left.vis, .reveal-right.vis { opacity:1; transform:translate(0,0); }
      .reveal-scale.vis { opacity:1; transform:scale(1); }
      .d1{transition-delay:.06s}.d2{transition-delay:.12s}.d3{transition-delay:.18s}.d4{transition-delay:.24s}.d5{transition-delay:.30s}

      .mono { font-family: 'JetBrains Mono', 'Courier New', monospace; }

      .nav-link {
        font-family:'JetBrains Mono',monospace; font-size:.7rem; font-weight:400;
        letter-spacing:.07em; text-transform:uppercase; color:${C.textMuted};
        background:none; border:none; transition:color .2s; padding:.5rem;
        -webkit-tap-highlight-color:transparent; touch-action:manipulation;
        min-height:44px; display:inline-flex; align-items:center;
      }
      .nav-link:hover,.nav-link:active { color:${C.textPri}; }
      .nav-link.active { color:${C.accentLight}; }

      .btn-primary {
        display:inline-flex; align-items:center; gap:.5rem;
        padding:.75rem 1.75rem; background:${C.accent}; color:#fff;
        font-family:'JetBrains Mono',monospace; font-size:.72rem; font-weight:500;
        letter-spacing:.06em; text-transform:uppercase; border:none; border-radius:6px;
        transition:all .2s cubic-bezier(.16,1,.3,1); white-space:nowrap;
        touch-action:manipulation; min-height:44px;
      }
      .btn-primary:hover:not(:active) { transform:translateY(-1px); box-shadow:0 6px 24px ${C.accent}45; filter:brightness(1.08); }
      .btn-primary:active { transform:scale(.97); }

      .btn-ghost {
        display:inline-flex; align-items:center; gap:.5rem;
        padding:.75rem 1.5rem; background:transparent; color:${C.textSec};
        font-family:'JetBrains Mono',monospace; font-size:.72rem; font-weight:400;
        letter-spacing:.06em; text-transform:uppercase;
        border:1px solid ${C.border}; border-radius:6px;
        transition:all .2s ease; white-space:nowrap; min-height:44px;
      }
      .btn-ghost:hover { border-color:${C.accent}60; color:${C.accentLight}; background:${C.accent}08; }
      .btn-ghost:active { background:${C.bgCard}; }

      .form-input {
        width:100%; padding:.85rem 1rem; background:${C.bgCard2};
        border:1px solid ${C.border}; border-radius:6px; color:${C.textPri};
        font-size:1rem; font-weight:300; outline:none;
        transition:border-color .2s,box-shadow .2s;
      }
      .form-input:focus { border-color:${C.accent}70; box-shadow:0 0 0 3px ${C.accent}14; }
      .form-input:focus-visible { outline:2px solid ${C.accent}; outline-offset:2px; }

      .tag-pill {
        display:inline-block; padding:.22rem .65rem;
        background:${C.bgCard2}; border:1px solid ${C.border};
        border-radius:4px; font-size:.6rem; color:${C.textMuted};
        font-family:'JetBrains Mono',monospace; letter-spacing:.03em;
        transition:background .15s, color .15s, border-color .15s;
      }

      .cert-card {
        padding:1rem 1.25rem; background:${C.bgCard}; border:1px solid ${C.border};
        border-radius:8px; transition:all .22s cubic-bezier(.16,1,.3,1); cursor:pointer;
      }
      .cert-card:hover { border-color:var(--cert-color); box-shadow:0 4px 28px color-mix(in srgb,var(--cert-color) 15%,transparent); transform:translateY(-2px); }
      .cert-card:active { transform:scale(.98); }

      .project-row {
        display:grid; grid-template-columns:48px 1fr 1fr auto;
        gap:1.75rem; align-items:start; padding:1.75rem 1.25rem;
        border-top:1px solid ${C.border}; transition:background .2s;
        position:relative;
      }
      .project-row:last-child { border-bottom:1px solid ${C.border}; }
      .project-row:active { background:${C.bgCard}44; }

      .skill-bar { transition:width .42s cubic-bezier(.16,1,.3,1); }

      /* Bottom sheet for mobile project details */
      .bottom-sheet-overlay {
        position:fixed; inset:0; z-index:9990;
        background:rgba(0,0,0,0.55); backdrop-filter:blur(4px);
        animation:fadeIn .2s ease;
      }
      .bottom-sheet {
        position:fixed; left:0; right:0; bottom:0; z-index:9991;
        background:${C.bgCard}; border-radius:16px 16px 0 0;
        border-top:1px solid ${C.border};
        max-height:82vh; overflow-y:auto;
        animation:fadeUp .28s cubic-bezier(.16,1,.3,1);
        padding-bottom:env(safe-area-inset-bottom,0px);
      }
      .bottom-sheet-handle {
        width:36px; height:4px; border-radius:2px;
        background:${C.border}; margin:0.75rem auto 0;
      }

      /* Responsive */
      @media (max-width: 900px) {
        .project-row { grid-template-columns:36px 1fr; gap:.5rem; padding:.9rem .75rem; }
        .proj-desc,.proj-meta { display:none; }
        .lanyard-wrap { display:none !important; }
        .hero-bottom { flex-direction:column !important; align-items:flex-start !important; gap:1.25rem !important; }
        .hero-bottom-right { border-left:none !important; padding-left:0 !important; flex-direction:column !important; align-items:flex-start !important; gap:.75rem !important; }
        .skills-inner { flex-direction:column !important; gap:2rem !important; }
        .skills-left { flex:none !important; width:100% !important; }
        .skills-grid { grid-template-columns:1fr 1fr !important; gap:1.25rem !important; }
        .contact-grid { grid-template-columns:1fr !important; gap:2rem !important; }
        .certs-grid { grid-template-columns:1fr 1fr !important; }
        .hero-section { padding:0 1rem 3rem !important; min-height:auto !important; }
        .work-section { padding:3.5rem 1rem !important; max-width:100% !important; }
        .skills-section { padding:3.5rem 1rem !important; }
        .contact-section { padding:3.5rem 1rem !important; }
        .footer-inner { padding:1rem !important; flex-direction:column !important; align-items:flex-start !important; gap:.75rem !important; }
        nav { padding:0 1rem !important; height:58px !important; }
        .hero-h1 { font-size:clamp(2.4rem,10vw,3.6rem) !important; margin-bottom:1.75rem !important; }
      }
      @media (max-width: 560px) {
        .skills-grid { grid-template-columns:1fr !important; }
        .certs-grid { grid-template-columns:1fr !important; }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important; }
        html { scroll-behavior:auto; }
        .reveal,.reveal-left,.reveal-right,.reveal-scale { opacity:1 !important; transform:none !important; }
      }
    `;
  }, [C]);
  return null;
});

// ─────────────────────────────────────────────────────────────────
// ACCENT RESOLVER (maps string key → token color)
// ─────────────────────────────────────────────────────────────────
function useAccent(key, C) {
  return C[key] || C.accent;
}

// ─────────────────────────────────────────────────────────────────
// BOOT SCREEN
// ─────────────────────────────────────────────────────────────────
const BOOT_LINES = [
  { t: "Initialising system environment...",        accent: false },
  { t: "Loading kernel modules... [OK]",            accent: false },
  { t: "Mounting /proc /sys /dev... [OK]",          accent: false },
  { t: "Starting network interfaces... [OK]",       accent: false },
  { t: ">> PAROTHEGREAT OS v2.6 — READY",           accent: true  },
];

const BootScreen = memo(({ onDone }) => {
  const [typedLines, setTypedLines]   = useState(Array(BOOT_LINES.length).fill(""));
  const [linePhase,  setLinePhase]    = useState(0);
  const [titleVis,   setTitleVis]     = useState(false);
  const [subtitleVis,setSubtitleVis]  = useState(false);
  const [loadPct,    setLoadPct]      = useState(0);
  const [exiting,    setExiting]      = useState(false);
  const timers    = useRef([]);
  const intervals = useRef([]);

  const skip = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    timers.current.push(setTimeout(onDone, 820));
  }, [exiting, onDone]);

  const typeLine = useCallback((idx, text, done) => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTypedLines(p => { const n = [...p]; n[idx] = text.slice(0, i); return n; });
      if (i >= text.length) { clearInterval(iv); done?.(); }
    }, 28);
    return iv;
  }, []);

  useEffect(() => {
    timers.current = []; intervals.current = [];
    timers.current.push(setTimeout(() => setTitleVis(true), 150));
    timers.current.push(setTimeout(() => setSubtitleVis(true), 500));

    let pStart = null;
    const piv = setInterval(() => {
      if (!pStart) pStart = Date.now();
      setLoadPct(Math.min(100, Math.round(((Date.now() - pStart) / 3200) * 100)));
    }, 16);
    intervals.current.push(piv);

    const typeNext = (idx) => {
      if (idx >= BOOT_LINES.length) { setLoadPct(100); timers.current.push(setTimeout(skip, 500)); return; }
      setLinePhase(p => Math.max(p, idx + 1));
      const iv = typeLine(idx, BOOT_LINES[idx].t, () => {
        timers.current.push(setTimeout(() => typeNext(idx + 1), idx === BOOT_LINES.length - 1 ? 200 : 80));
      });
      intervals.current.push(iv);
    };
    timers.current.push(setTimeout(() => typeNext(0), 900));
    timers.current.push(setTimeout(skip, 7000));
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    return () => {
      timers.current.forEach(clearTimeout); intervals.current.forEach(clearInterval);
      window.removeEventListener("keydown", skip); window.removeEventListener("pointerdown", skip);
    };
  }, []);  // eslint-disable-line

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999, background: "#000",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden", animation: "crtFlicker 6s infinite",
      pointerEvents: exiting ? "none" : "auto",
    }}>
      {/* CRT scanlines */}
      <div style={{ position:"absolute",inset:0,zIndex:2,pointerEvents:"none",
        backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.12) 2px,rgba(0,0,0,0.12) 4px)" }} />
      {/* Moving beam */}
      <div style={{ position:"absolute",left:0,right:0,height:"100px",zIndex:3,pointerEvents:"none",
        background:"linear-gradient(to bottom,transparent,rgba(99,102,241,0.04),transparent)",
        animation:"scanline 5s linear infinite" }} />
      {/* Vignette */}
      <div style={{ position:"absolute",inset:0,zIndex:4,pointerEvents:"none",
        background:"radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,0.85) 100%)" }} />

      <div style={{
        position:"relative",zIndex:5,display:"flex",flexDirection:"column",alignItems:"center",
        width:"100%",padding:"0 2rem",
        animation: exiting ? "bootExit1 0.82s cubic-bezier(.4,0,.2,1) both" : "none",
      }}>
        {/* Title */}
        <div style={{
          fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(1.1rem,5vw,3.6rem)",
          fontWeight:600, color:"#6366F1", letterSpacing:".22em", textAlign:"center",
          textShadow:"0 0 28px #6366F140,0 0 60px #6366F120", userSelect:"none",
          opacity: titleVis ? 1 : 0,
          animation: titleVis ? "bootTextIn 1s cubic-bezier(.16,1,.3,1) both" : "none",
          marginBottom:".75rem",
        }}>PAROTHEGREAT</div>

        <div style={{
          fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(.52rem,1.1vw,.66rem)",
          color:"#555",letterSpacing:".2em",textTransform:"uppercase",marginBottom:"2.25rem",
          textAlign:"center",opacity: subtitleVis ? 1 : 0,transition:"opacity .3s ease",
        }}>SysAdmin · Penetration Tester · Infrastructure Engineer</div>

        {/* Boot lines */}
        <div style={{ display:"flex",flexDirection:"column",gap:".28rem",alignItems:"flex-start",
          width:"min(480px,90vw)",marginBottom:"1.5rem",minHeight:`${BOOT_LINES.length*1.55}rem` }}>
          {BOOT_LINES.map((l, i) => {
            const isVis    = linePhase >= i + 1;
            const isActive = linePhase === i + 1 && (typedLines[i]?.length ?? 0) < l.t.length;
            return (
              <div key={i} style={{
                fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(.56rem,1vw,.65rem)",
                letterSpacing:".04em",
                color: l.accent ? "#6366F1" : "#999",
                textShadow: l.accent ? "0 0 10px #6366F150" : "none",
                fontWeight: l.accent ? 500 : 400,
                opacity: isVis ? 1 : 0, minHeight:"1.15em",
                display:"flex",alignItems:"center",
              }}>
                {isVis && (<>
                  {!l.accent && <span style={{color:"#444",marginRight:".4em"}}>$</span>}
                  <span>{typedLines[i] ?? ""}</span>
                  {isActive && <span style={{ display:"inline-block",width:".48em",height:"1em",
                    background: l.accent ? "#6366F1" : "#888",marginLeft:"1px",verticalAlign:"middle",
                    animation:"blink .7s step-end infinite" }} />}
                </>)}
              </div>
            );
          })}
        </div>

        {/* Loading bar */}
        <div style={{ width:"min(480px,90vw)",opacity:linePhase>0?1:0,transition:"opacity .3s ease" }}>
          <div style={{ display:"flex",justifyContent:"space-between",marginBottom:".3rem" }}>
            <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:".48rem",color:"#444",letterSpacing:".1em" }}>LOADING SYSTEM</span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:".48rem",color:"#6366F1",letterSpacing:".08em" }}>{loadPct}%</span>
          </div>
          <div style={{ width:"100%",height:"2px",background:"#111",borderRadius:"1px",overflow:"hidden" }}>
            <div style={{ height:"100%",width:`${loadPct}%`,
              background:"linear-gradient(90deg,#4F52D9,#6366F1,#818CF8)",
              borderRadius:"1px",transition:"width .2s ease",boxShadow:"0 0 6px #6366F155" }} />
          </div>
        </div>
      </div>

      <div style={{ position:"absolute",bottom:"1.5rem",fontFamily:"'JetBrains Mono',monospace",
        fontSize:".48rem",color:"#2a2a2a",letterSpacing:".15em",zIndex:5 }}>
        PRESS ANY KEY TO SKIP
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────
// THEME FLASH
// ─────────────────────────────────────────────────────────────────
const ThemeFlash = memo(({ isDark }) => {
  const [flash, setFlash] = useState(false);
  const prev = useRef(null);
  useEffect(() => {
    if (prev.current === null) { prev.current = isDark; return; }
    if (prev.current !== isDark) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 350);
      prev.current = isDark;
      return () => clearTimeout(t);
    }
  }, [isDark]);
  return (
    <div style={{
      position:"fixed",inset:0,zIndex:9997,pointerEvents:"none",
      background: isDark ? "#000" : "#fff",
      opacity: flash ? 0.10 : 0,
      transition: flash ? "opacity .05s ease" : "opacity .3s ease",
    }} />
  );
});

// ─────────────────────────────────────────────────────────────────
// THEME TOGGLE
// ─────────────────────────────────────────────────────────────────
const ThemeToggle = memo(({ C }) => {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        background: "transparent", border:`1px solid ${C.border}`,
        borderRadius:"6px", padding:".4rem .6rem", color:C.textMuted,
        fontSize:".8rem", transition:"all .2s ease", cursor:"pointer",
        minWidth:"44px", minHeight:"44px", display:"inline-flex",
        alignItems:"center", justifyContent:"center",
      }}
    >
      {isDark ? "☀" : "◑"}
    </button>
  );
});

// ─────────────────────────────────────────────────────────────────
// STAGGERED MENU (GSAP mobile overlay)
// ─────────────────────────────────────────────────────────────────
const StaggeredMenu = memo(({ C, items, socialItems, accentColor, onMenuOpen, onMenuClose, onItemClick }) => {
  const [open, setOpen] = useState(false);
  const openRef  = useRef(false);
  const panelRef = useRef(null);
  const preRef   = useRef(null);
  const plusH    = useRef(null);
  const plusV    = useRef(null);
  const iconRef  = useRef(null);
  const btnRef   = useRef(null);
  const openTl   = useRef(null);
  const closeTw  = useRef(null);
  const busyRef  = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const prelayers = preRef.current ? Array.from(preRef.current.querySelectorAll(".sm-pre")) : [];
      if (!panel) return;
      gsap.set([panel, ...prelayers], { xPercent: 100 });
      gsap.set(plusH.current,  { transformOrigin:"50% 50%", rotate:0 });
      gsap.set(plusV.current,  { transformOrigin:"50% 50%", rotate:90 });
      gsap.set(iconRef.current,{ rotate:0, transformOrigin:"50% 50%" });
      if (btnRef.current) gsap.set(btnRef.current, { color: accentColor });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (panelRef.current) panelRef.current.style.background = C.mobileMenuBg;
  }, [C]);

  const doOpen = useCallback(() => {
    if (busyRef.current || openRef.current) return;
    busyRef.current = true; openRef.current = true; setOpen(true);
    onMenuOpen?.();
    const panel = panelRef.current;
    const prelayers = preRef.current ? Array.from(preRef.current.querySelectorAll(".sm-pre")) : [];
    const items_ = Array.from(panel.querySelectorAll(".sm-item-label"));
    if (items_.length) gsap.set(items_, { yPercent:140, rotate:8 });
    const tl = gsap.timeline({ onComplete: () => { busyRef.current = false; } });
    prelayers.forEach((el, i) => tl.fromTo(el, { xPercent:100 }, { xPercent:0, duration:.45, ease:"power4.out" }, i*.06));
    tl.fromTo(panel, { xPercent:100 }, { xPercent:0, duration:.55, ease:"power4.out" }, prelayers.length*.06+.05);
    if (items_.length) tl.to(items_, { yPercent:0, rotate:0, duration:.7, ease:"power4.out", stagger:{ each:.08, from:"start" } }, "-=.3");
    gsap.to(iconRef.current, { rotate:45, duration:.35, ease:"power2.out" });
    openTl.current = tl;
  }, [onMenuOpen]);

  const doClose = useCallback(() => {
    if (busyRef.current || !openRef.current) return;
    busyRef.current = true; openRef.current = false; setOpen(false);
    onMenuClose?.();
    const panel = panelRef.current;
    const prelayers = preRef.current ? Array.from(preRef.current.querySelectorAll(".sm-pre")) : [];
    const tl = gsap.timeline({ onComplete: () => { busyRef.current = false; } });
    tl.to([panel, ...prelayers], { xPercent:100, duration:.4, ease:"power3.in", stagger:{ each:.04, from:"end" } });
    gsap.to(iconRef.current, { rotate:0, duration:.3, ease:"power2.out" });
    closeTw.current = tl;
  }, [onMenuClose]);

  const toggle = useCallback(() => {
    if (openRef.current) doClose(); else doOpen();
  }, [doOpen, doClose]);

  const handleItemClick = useCallback((item) => {
    doClose();
    setTimeout(() => onItemClick?.(item), 200);
  }, [doClose, onItemClick]);

  return (
    <>
      {/* Toggle button */}
      <button
        ref={btnRef}
        onClick={toggle}
        aria-label="Menu"
        style={{
          position:"fixed", top:"9px", right:"1rem", zIndex:1006,
          background:"transparent", border:"none", cursor:"pointer",
          padding:".5rem", display:"flex", alignItems:"center", gap:".45rem",
          minWidth:"44px", minHeight:"44px",
        }}
      >
        <svg ref={iconRef} width="20" height="20" viewBox="0 0 20 20" style={{ overflow:"visible" }}>
          <rect ref={plusH} x="3" y="9.5" width="14" height="1.5" rx=".75" fill={accentColor} />
          <rect ref={plusV} x="9.25" y="3" width="1.5" height="14" rx=".75" fill={accentColor} />
        </svg>
      </button>

      {/* Pre-layers */}
      <div ref={preRef} style={{ position:"fixed",inset:0,zIndex:1007,pointerEvents:"none" }}>
        {[C.bgCard2, C.bgCard].map((bg, i) => (
          <div key={i} className="sm-pre" style={{ position:"absolute",inset:0,background:bg }} />
        ))}
      </div>

      {/* Panel */}
      <div ref={panelRef} style={{
        position:"fixed",inset:0,zIndex:1008,background:C.mobileMenuBg,
        display:"flex",flexDirection:"column",justifyContent:"center",
        padding:"2rem 2.5rem",pointerEvents:open?"auto":"none",
      }}>
        <nav style={{ display:"flex",flexDirection:"column",gap:"1rem",marginBottom:"3rem" }}>
          {items.map((item, i) => (
            <div key={item.label} style={{ overflow:"hidden",paddingBottom:".1em" }}>
              <button
                className="sm-item-label"
                onClick={() => handleItemClick(item)}
                style={{
                  fontFamily:"'DM Serif Display',serif", fontSize:"clamp(2rem,8vw,3.5rem)",
                  color:C.textPri, background:"transparent", border:"none",
                  cursor:"pointer", display:"flex", alignItems:"center", gap:"1rem",
                  letterSpacing:"-.01em",
                }}
              >
                <span className="mono" style={{ fontSize:".6rem",color:accentColor,opacity:.5,marginTop:".3em" }}>
                  0{i+1}
                </span>
                {item.label}
              </button>
            </div>
          ))}
        </nav>
        <div style={{ display:"flex",gap:"1.5rem",flexWrap:"wrap" }}>
          {socialItems.map(s => (
            <a key={s.label} href={s.link} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:".65rem",
                color:C.textMuted,textDecoration:"none",padding:".5rem 0",
                transition:"color .2s",minHeight:"44px",display:"inline-flex",alignItems:"center" }}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
});

// ─────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home","Work","Skills","Contact"];

const Navbar = memo(({ active, C }) => {
  const { isMobile } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = useCallback((label) => {
    document.body.style.overflow = "";
    const id = label === "Work" ? "work" : label.toLowerCase();
    document.getElementById(id)?.scrollIntoView({ behavior: isMobile ? "auto" : "smooth" });
  }, [isMobile]);

  return (
    <>
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:1003,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding: isMobile ? "0 1rem" : "0 2rem",
        height: isMobile ? "58px" : (scrolled ? "52px" : "64px"),
        background: scrolled ? C.navBgScr : C.navBg,
        backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
        borderBottom:`1px solid ${scrolled ? C.border : C.accent+"18"}`,
        transition:"height .3s cubic-bezier(.16,1,.3,1),background .3s,border-color .3s",
      }}>
        {/* Logo */}
        <div style={{ display:"flex",alignItems:"center",gap:".6rem" }}>
          {isMobile && <ThemeToggle C={C} />}
          <div className="mono" style={{ fontSize:".78rem",display:"flex",alignItems:"center",gap:".2rem",letterSpacing:".01em" }}>
            <span style={{ color:C.accent,fontWeight:600 }}>[</span>
            <span style={{ color:C.textSec }}>paro</span>
            <span style={{ color:C.rose }}>@</span>
            <span style={{ color:C.textPri,fontWeight:600 }}>thegreat</span>
            <span style={{ color:C.accent,fontWeight:600 }}>]</span>
            <span style={{ color:C.accent,fontSize:".7rem",marginLeft:"2px",animation:"blink 1.4s step-end infinite" }}>█</span>
          </div>
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display:"flex",gap:0 }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => go(l)} style={{
                fontFamily:"'JetBrains Mono',monospace",fontSize:".65rem",letterSpacing:".07em",
                textTransform:"uppercase",background:"none",border:"none",padding:".5rem 1rem",
                position:"relative",color: active===l ? C.accentLight : C.textMuted,
                transition:"color .2s",cursor:"pointer",minHeight:"44px",
              }}>
                {l}
                <span style={{
                  position:"absolute",bottom:"-1px",left:"50%",
                  transform: active===l ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
                  transformOrigin:"center",width:"24px",height:"2px",
                  background:C.accent,borderRadius:"1px",
                  boxShadow: active===l ? `0 0 6px ${C.accent}80` : "none",
                  transition:"transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s",display:"block",
                }} />
              </button>
            ))}
          </div>
        )}

        {/* Desktop right */}
        {!isMobile && (
          <div style={{ display:"flex",alignItems:"center",gap:".75rem" }}>
            <div style={{
              display:"flex",alignItems:"center",gap:".45rem",padding:".25rem .65rem",
              border:`1px solid ${C.emerald}28`,borderRadius:"20px",background:`${C.emerald}0a`,
            }}>
              <span style={{ width:"5px",height:"5px",borderRadius:"50%",background:C.emerald,
                display:"inline-block",animation:"pulse-dot 2.5s ease-in-out infinite" }} />
              <span className="mono" style={{ fontSize:".58rem",color:C.emerald,opacity:.85,letterSpacing:".05em" }}>
                available_for_hire
              </span>
            </div>
            <ThemeToggle C={C} />
          </div>
        )}
      </nav>

      {/* Mobile menu */}
      {isMobile && (
        <div style={{ position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:1004,pointerEvents:"none" }}>
          <StaggeredMenu
            C={C}
            items={NAV_LINKS.map(l => ({ label:l }))}
            socialItems={Object.entries(SOCIAL_LINKS).map(([label,link]) => ({ label,link }))}
            accentColor={C.accent}
            onMenuOpen={() => { document.body.style.overflow = "hidden"; }}
            onMenuClose={() => { document.body.style.overflow = ""; }}
            onItemClick={(it) => go(it.label)}
          />
        </div>
      )}
    </>
  );
});

// ─────────────────────────────────────────────────────────────────
// UPTIME COUNTER
// ─────────────────────────────────────────────────────────────────
const START_DATE = new Date("2024-09-16T00:00:00");
const UptimeCounter = memo(({ C }) => {
  const [u, setU] = useState({ years:0,months:0,days:0,hours:0,minutes:0,seconds:0 });
  const ref = useRef();
  useEffect(() => {
    const calc = () => {
      const diff = Date.now() - START_DATE.getTime();
      const ts = Math.floor(diff/1000), tm = Math.floor(ts/60), th = Math.floor(tm/60), td = Math.floor(th/24);
      setU({ years:Math.floor(td/365),months:Math.floor((td%365)/30),days:td%30,hours:th%24,minutes:tm%60,seconds:ts%60 });
    };
    calc(); ref.current = setInterval(calc, 1000);
    const vis = () => { clearInterval(ref.current); ref.current = setInterval(calc, document.hidden ? 5000 : 1000); if (!document.hidden) calc(); };
    document.addEventListener("visibilitychange", vis);
    return () => { clearInterval(ref.current); document.removeEventListener("visibilitychange", vis); };
  }, []);
  const pad = n => String(n).padStart(2,"0");
  const display = u.years>0 ? `${u.years}y ${u.months}m` : u.months>0 ? `${u.months}m ${u.days}d` : `${u.days}d`;
  return (
    <div>
      <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1.6rem",color:C.emerald,lineHeight:1 }}>{display}</div>
      <div className="mono" style={{ fontSize:".52rem",letterSpacing:".1em",textTransform:"uppercase",color:C.textMuted,marginTop:".2rem" }}>Uptime</div>
      <div className="mono" style={{ fontSize:".58rem",color:C.emerald,opacity:.45,marginTop:".15rem" }}>{pad(u.hours)}:{pad(u.minutes)}:{pad(u.seconds)}</div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────
// DITHER BACKGROUND (WebGL)
// ─────────────────────────────────────────────────────────────────
const Dither = memo(({ waveColor=[0.388,0.4,0.945], isMobile=false }) => {
  const canvasRef = useRef(null);
  const state = useRef({ mouse:[.5,.5],time:0,raf:null,gl:null,prog:null,locs:{} });

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl",{ antialias:false,alpha:true,powerPreference:"low-power" });
    if (!gl) return;
    const s = state.current; s.gl = gl;
    const vert = `attribute vec2 a_pos; void main(){gl_Position=vec4(a_pos,0.,1.);}`;
    const frag = `
      precision lowp float;
      uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse;
      uniform vec3 u_waveColor; uniform float u_pixelSize;
      float bayer(vec2 p){int x=int(mod(p.x,4.)),y=int(mod(p.y,4.));return float(x*3+y*5)/16.;}
      void main(){
        vec2 pxUV=floor(gl_FragCoord.xy/u_pixelSize)*u_pixelSize;
        vec2 uv=pxUV/u_res;
        float wave=sin(uv.x*10.+u_time)*.28+sin(uv.y*7.5+u_time*.7)*.18;
        float brightness=.5+wave;
        float dist=length(uv-u_mouse);
        brightness=mix(brightness,1.,smoothstep(.3,.0,dist)*.15);
        float t=bayer(gl_FragCoord.xy/u_pixelSize);
        float q=floor(brightness*3.+t)/3.;
        vec3 dark=vec3(0.051,0.051,0.071);
        gl_FragColor=vec4(mix(dark,u_waveColor,q),1.);
      }`;
    const compile=(type,src)=>{ const sh=gl.createShader(type); gl.shaderSource(sh,src); gl.compileShader(sh); return sh; };
    const prog=gl.createProgram();
    gl.attachShader(prog,compile(gl.VERTEX_SHADER,vert));
    gl.attachShader(prog,compile(gl.FRAGMENT_SHADER,frag));
    gl.linkProgram(prog); gl.useProgram(prog); s.prog=prog;
    const buf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buf);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    const loc=gl.getAttribLocation(prog,"a_pos"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    s.locs={ res:gl.getUniformLocation(prog,"u_res"),time:gl.getUniformLocation(prog,"u_time"),mouse:gl.getUniformLocation(prog,"u_mouse"),waveColor:gl.getUniformLocation(prog,"u_waveColor"),pixelSize:gl.getUniformLocation(prog,"u_pixelSize") };
    const resize=()=>{ const dpr=Math.min(devicePixelRatio,1.5); canvas.width=Math.floor(canvas.offsetWidth*dpr); canvas.height=Math.floor(canvas.offsetHeight*dpr); gl.viewport(0,0,canvas.width,canvas.height); };
    resize(); const ro=new ResizeObserver(resize); ro.observe(canvas);
    canvas.addEventListener("mousemove",e=>{ const r=canvas.getBoundingClientRect(); s.mouse=[(e.clientX-r.left)/r.width,1.-(e.clientY-r.top)/r.height]; },{passive:true});
    let last=0;
    const render=(ts)=>{
      if (ts-last<34){ s.raf=requestAnimationFrame(render); return; } last=ts;
      s.time+=.025; const{locs}=s;
      gl.uniform2f(locs.res,canvas.width,canvas.height); gl.uniform1f(locs.time,s.time);
      gl.uniform2f(locs.mouse,s.mouse[0],s.mouse[1]); gl.uniform3f(locs.waveColor,...waveColor);
      gl.uniform1f(locs.pixelSize,4.); gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
      s.raf=requestAnimationFrame(render);
    };
    render(0);
    return ()=>{ cancelAnimationFrame(s.raf); ro.disconnect(); gl.deleteProgram(prog); };
  },[waveColor,isMobile]);

  if (isMobile) {
    return <div style={{ position:"absolute",inset:0,
      background:`radial-gradient(ellipse at 25% 18%,#6366F115 0%,transparent 50%),radial-gradient(ellipse at 75% 82%,#10B98110 0%,transparent 50%)`,zIndex:0 }} />;
  }
  return <canvas ref={canvasRef} style={{ position:"absolute",inset:0,width:"100%",height:"100%",display:"block",zIndex:0 }} />;
});

// ─────────────────────────────────────────────────────────────────
// LINUX TERMINAL ANIMATION
// ─────────────────────────────────────────────────────────────────
const LinuxTerminal = memo(({ C, isMobile, start }) => {
  const SEQUENCE = useMemo(() => [
    { cmd:"whoami", output:"parothegreat — SysAdmin · Penetration Tester · Infrastructure Engineer", outColor:C.rose },
    { cmd:"cat role.txt", output:"securing networks · hardening Linux · building Go recon tools", outColor:C.emeraldDark },
    { cmd:"uptime --since 2024-09-16", output:"status: operational-student | org: teamitmivhs | loc: Cikarang, ID", outColor:C.accentLight },
  ], [C, isMobile]);

  const [phase, setPhase]       = useState(-1);
  const [typed, setTyped]       = useState(0);
  const [showOut, setShowOut]   = useState(false);
  const [done, setDone]         = useState(false);
  const timerRef                = useRef();
  const skipAnim = useMemo(() => typeof window !== "undefined" && window.matchMedia("(pointer:coarse)").matches, []);

  useEffect(() => {
    if (!start) return;
    if (skipAnim) { setDone(true); return; }
    timerRef.current = setTimeout(() => setPhase(0), 300);
    return () => clearTimeout(timerRef.current);
  }, [start]); // eslint-disable-line

  useEffect(() => {
    if (skipAnim || phase < 0 || phase >= SEQUENCE.length) return;
    setTyped(0); setShowOut(false);
    const cmd = SEQUENCE[phase].cmd; let i = 0;
    const tick = () => {
      i++; setTyped(i);
      if (i < cmd.length) { timerRef.current = setTimeout(tick, 32+Math.random()*20); }
      else { timerRef.current = setTimeout(() => {
        setShowOut(true);
        timerRef.current = setTimeout(() => {
          if (phase+1 < SEQUENCE.length) setPhase(p=>p+1); else setDone(true);
        }, 440);
      }, 150); }
    };
    timerRef.current = setTimeout(tick, 30);
    return () => clearTimeout(timerRef.current);
  }, [phase]); // eslint-disable-line

  const fz = isMobile ? ".62rem" : ".7rem";
  const Prompt = () => (
    <span style={{ userSelect:"none",whiteSpace:"nowrap" }}>
      <span style={{ color:"#22C55E" }}>paro@thegreat</span>
      <span style={{ color:C.textMuted }}>:</span>
      <span style={{ color:C.accent }}>~</span>
      <span style={{ color:C.textMuted }}> $ </span>
    </span>
  );

  const allDone = done || skipAnim;

  return (
    <div className="hero-terminal" style={{
      background:`${C.bgCard}cc`, border:`1px solid ${C.border}`,
      borderRadius:"8px", padding:isMobile?".7rem .85rem":".9rem 1.1rem",
      marginBottom:isMobile?"1.25rem":"1.5rem",
      backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)",
    }}>
      {/* Window chrome */}
      <div style={{ display:"flex",gap:".4rem",marginBottom:".6rem" }}>
        {["#FF5F57","#FFBD2E","#28C840"].map((c,i) => <div key={i} style={{ width:"9px",height:"9px",borderRadius:"50%",background:c,opacity:.7 }} />)}
      </div>

      {allDone ? (
        SEQUENCE.map((s, i) => (
          <div key={i} style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:fz,lineHeight:1.7 }}>
            <div><Prompt /><span style={{ color:C.textPri }}>{s.cmd}</span></div>
            <div style={{ color:s.outColor,opacity:.8,paddingLeft:isMobile?0:".5rem" }}>{s.output}</div>
          </div>
        ))
      ) : (
        <>
          {SEQUENCE.slice(0, phase).map((s, i) => (
            <div key={i} style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:fz,lineHeight:1.7 }}>
              <div><Prompt /><span style={{ color:C.textPri }}>{s.cmd}</span></div>
              <div style={{ color:s.outColor,opacity:.8 }}>{s.output}</div>
            </div>
          ))}
          {phase >= 0 && phase < SEQUENCE.length && (
            <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:fz,lineHeight:1.7 }}>
              <div>
                <Prompt />
                <span style={{ color:C.textPri }}>{SEQUENCE[phase].cmd.slice(0, typed)}</span>
                <span style={{ display:"inline-block",width:".45em",height:"1em",background:C.accent,marginLeft:"1px",verticalAlign:"middle",animation:"blink .7s step-end infinite" }} />
              </div>
              {showOut && <div style={{ color:SEQUENCE[phase].outColor,opacity:.8 }}>{SEQUENCE[phase].output}</div>}
            </div>
          )}
        </>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────
const Hero = memo(({ C, booted, startAlvaro, startPrayogo }) => {
  const { isMobile } = useTheme();
  const navH = isMobile ? 58 : 64;

  return (
    <section id="home" className="hero-section" style={{
      position:"relative", minHeight:`calc(100dvh - ${navH}px)`,
      padding: isMobile ? `${navH+40}px 1rem 3.5rem` : `${navH+80}px 3rem 4rem`,
      display:"flex", flexDirection:"column", justifyContent:"flex-end",
      overflow:"hidden",
    }}>
      <Dither waveColor={[0.388,0.4,0.945]} isMobile={isMobile} />
      <div style={{ position:"absolute",inset:0,background:C.heroOverlay,zIndex:1,pointerEvents:"none" }} />

      {/* ProfileCard / Lanyard placeholder — top right on desktop */}
      {!isMobile && (
        <div className="lanyard-wrap" style={{
          position:"absolute", top:navH+20, right:"3rem", zIndex:2,
          width:"300px", height:"420px",
        }}>
          <ProfileCard
            name="Alvaro Prayogo"
            title="SysAdmin & Penetration Tester"
            handle="parothegreat"
            avatarUrl={null}
            C={C}
          />
        </div>
      )}

      {/* Content */}
      <div style={{ position:"relative",zIndex:2,maxWidth:"900px" }}>

        {/* Eyebrow */}
        <div className="mono" style={{
          fontSize: isMobile ? ".62rem" : ".68rem",
          color:C.textMuted, letterSpacing:".12em", marginBottom:"1.1rem",
          display:"flex", alignItems:"center", gap:".6rem",
        }}>
          <span style={{ display:"inline-block",width:"18px",height:"1px",background:C.border }} />
          <span>parothegreat.site — systems &amp; security</span>
        </div>

        {/* H1 with DecryptedText */}
        <h1 className="hero-h1" style={{
          fontFamily:"'DM Serif Display',serif",
          fontSize:"clamp(2.8rem,7.5vw,5.5rem)",
          fontWeight:400,lineHeight:1.0,letterSpacing:"-.02em",
          color:C.textPri,marginBottom:"2rem",
        }}>
          <span style={{ display:"block" }}>
            <DecryptedText text="Moehammad" start={startAlvaro} animateOn="mount" speed={90} revealDirection="start" className="" style={{ color:C.textPri }} />
          </span>
          <span style={{ display:"block",color:C.accent }}>
            <DecryptedText text="Alvaro" start={startAlvaro} animateOn="mount" speed={90} revealDirection="start" style={{ color:C.accent }} />
          </span>
          <span style={{ display:"block",color:C.textSec,fontStyle:"italic" }}>
            <DecryptedText text="Pirata Prayogo" start={startPrayogo} animateOn="mount" speed={80} revealDirection="start" style={{ color:C.textSec }} />
          </span>
        </h1>

        {/* Terminal */}
        <LinuxTerminal C={C} isMobile={isMobile} start={booted} />

        {/* Bottom row */}
        <div className="hero-bottom" style={{
          display:"flex", alignItems:"flex-start", gap:"3rem",
        }}>
          {/* CTA buttons */}
          <div className="btn-row" style={{ display:"flex",gap:".75rem",flexWrap:"wrap" }}>
            <button className="btn-primary" onClick={() => document.getElementById("work")?.scrollIntoView({behavior:"smooth"})}>
              ./view_projects.sh →
            </button>
            <button className="btn-ghost" onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}>
              ./contact.sh
            </button>
          </div>

          {/* Right info strip */}
          <div className="hero-bottom-right" style={{
            display:"flex", alignItems:"center", gap:"2rem",
            borderLeft:`1px solid ${C.border}`, paddingLeft:"2rem",
            flexShrink:0,
          }}>
            <UptimeCounter C={C} />
            <div>
              <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1.6rem",color:C.accent,lineHeight:1 }}>5+</div>
              <div className="mono" style={{ fontSize:".52rem",letterSpacing:".1em",textTransform:"uppercase",color:C.textMuted,marginTop:".2rem" }}>Projects</div>
              <div className="mono" style={{ fontSize:".58rem",color:C.accent,opacity:.45,marginTop:".15rem" }}>shipped</div>
            </div>
            <div>
              <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1.6rem",color:C.amber,lineHeight:1 }}>10+</div>
              <div className="mono" style={{ fontSize:".52rem",letterSpacing:".1em",textTransform:"uppercase",color:C.textMuted,marginTop:".2rem" }}>Certs</div>
              <div className="mono" style={{ fontSize:".58rem",color:C.amber,opacity:.45,marginTop:".15rem" }}>earned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position:"absolute",bottom:"1.75rem",left:"50%",transform:"translateX(-50%)",
        zIndex:2,display:"flex",flexDirection:"column",alignItems:"center",gap:".35rem",
        opacity:.35,
      }}>
        <div style={{ width:"1px",height:"28px",background:`linear-gradient(to bottom,transparent,${C.border})` }} />
        <span className="mono" style={{ fontSize:".48rem",color:C.textMuted,letterSpacing:".12em" }}>SCROLL</span>
      </div>
    </section>
  );
});

// ─────────────────────────────────────────────────────────────────
// PROJECT BOTTOM SHEET (mobile)
// ─────────────────────────────────────────────────────────────────
const ProjectBottomSheet = memo(({ project, C, onClose }) => {
  const accent = C[project.accent] || C.accent;
  const startY = useRef(null);
  const sheetRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleTouchStart = (e) => { startY.current = e.touches[0].clientY; };
  const handleTouchEnd   = (e) => { if (e.changedTouches[0].clientY - startY.current > 60) onClose(); };

  return (
    <>
      <div className="bottom-sheet-overlay" onClick={onClose} />
      <div className="bottom-sheet" ref={sheetRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="bottom-sheet-handle" />
        <div style={{ padding:"1.25rem 1.5rem 2rem" }}>
          <div style={{ display:"flex",alignItems:"center",gap:".6rem",marginBottom:"1rem" }}>
            <div style={{ width:"4px",height:"36px",borderRadius:"2px",background:accent,flexShrink:0 }} />
            <div>
              <h3 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1.35rem",fontWeight:400,color:C.textPri }}>{project.title}</h3>
              <p className="mono" style={{ fontSize:".58rem",color:accent,opacity:.8,marginTop:".15rem" }}>{project.category}</p>
            </div>
          </div>

          <p style={{ fontSize:".82rem",lineHeight:1.75,color:C.textSec,fontWeight:300,marginBottom:"1.25rem" }}>{project.desc}</p>

          {/* Impact */}
          <div style={{ marginBottom:"1.25rem" }}>
            <p className="mono" style={{ fontSize:".55rem",color:accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".5rem",opacity:.7 }}>Impact</p>
            <ul style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:".4rem" }}>
              {project.impact.map((b,i) => (
                <li key={i} style={{ display:"flex",gap:".6rem",alignItems:"flex-start" }}>
                  <span style={{ color:accent,flexShrink:0,marginTop:".3em",fontSize:".7rem" }}>→</span>
                  <span style={{ fontSize:".78rem",lineHeight:1.65,color:C.textSec,fontWeight:300 }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical challenge */}
          <div style={{ marginBottom:"1.5rem" }}>
            <p className="mono" style={{ fontSize:".55rem",color:C.textMuted,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".5rem",opacity:.7 }}>Technical Challenges</p>
            <ul style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:".4rem" }}>
              {project.challenges.map((b,i) => (
                <li key={i} style={{ display:"flex",gap:".6rem",alignItems:"flex-start" }}>
                  <span style={{ color:C.textMuted,flexShrink:0,marginTop:".3em",fontSize:".7rem" }}>⚡</span>
                  <span style={{ fontSize:".78rem",lineHeight:1.65,color:C.textMuted,fontWeight:300 }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div style={{ display:"flex",flexWrap:"wrap",gap:".4rem",marginBottom:"1.5rem" }}>
            {project.stack.map(t => (
              <span key={t} className="tag-pill" style={{ borderColor:`${accent}55`,color:accent }}>{t}</span>
            ))}
          </div>

          <a href={project.repo} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
            <button className="btn-primary" style={{ width:"100%",justifyContent:"center",background:accent }}>
              View on GitHub →
            </button>
          </a>
        </div>
      </div>
    </>
  );
});

// ─────────────────────────────────────────────────────────────────
// PROJECT EXPANDED PANEL (desktop)
// ─────────────────────────────────────────────────────────────────
const ProjectExpandedPanel = memo(({ project, C }) => {
  const accent = C[project.accent] || C.accent;
  return (
    <div style={{
      gridColumn:"1 / -1", background:`${accent}08`,
      borderBottom:`1px solid ${C.border}`,
      padding:"1.5rem 1.5rem 1.75rem 4rem",
      display:"flex", flexDirection:"column", gap:"1.5rem",
      animation:"fadeUp .22s ease both", width:"100%", boxSizing:"border-box",
    }}>
      {/* Top row: overview + stack */}
      <div style={{ display:"flex",gap:"3rem",flexWrap:"wrap" }}>
        <div style={{ flex:1,minWidth:"220px" }}>
          <p className="mono" style={{ fontSize:".55rem",color:accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".5rem",opacity:.7 }}>Overview</p>
          <p style={{ fontSize:".82rem",lineHeight:1.75,color:C.textSec,fontWeight:300 }}>{project.desc}</p>
        </div>
        <div style={{ flexShrink:0,minWidth:"170px" }}>
          <p className="mono" style={{ fontSize:".55rem",color:accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".5rem",opacity:.7 }}>Stack</p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:".35rem",marginBottom:".75rem" }}>
            {project.stack.map(t => <span key={t} className="tag-pill" style={{ borderColor:`${accent}44`,color:accent }}>{t}</span>)}
          </div>
          <p className="mono" style={{ fontSize:".52rem",color:C.textMuted,opacity:.5 }}>{project.year}</p>
        </div>
      </div>

      {/* Impact + challenges */}
      <div style={{ display:"flex",gap:"3rem",flexWrap:"wrap" }}>
        <div style={{ flex:1,minWidth:"220px" }}>
          <p className="mono" style={{ fontSize:".55rem",color:accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".6rem",opacity:.7 }}>Impact</p>
          <ul style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:".4rem" }}>
            {project.impact.map((b,i) => (
              <li key={i} style={{ display:"flex",gap:".6rem",alignItems:"flex-start" }}>
                <span style={{ color:accent,flexShrink:0,marginTop:".3em",fontSize:".7rem" }}>→</span>
                <span style={{ fontSize:".78rem",lineHeight:1.65,color:C.textSec,fontWeight:300 }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex:1,minWidth:"220px" }}>
          <p className="mono" style={{ fontSize:".55rem",color:C.textMuted,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".6rem",opacity:.7 }}>Technical Challenges</p>
          <ul style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:".4rem" }}>
            {project.challenges.map((b,i) => (
              <li key={i} style={{ display:"flex",gap:".6rem",alignItems:"flex-start" }}>
                <span style={{ color:C.textMuted,flexShrink:0,marginTop:".3em",fontSize:".7rem" }}>⚡</span>
                <span style={{ fontSize:".78rem",lineHeight:1.65,color:C.textMuted,fontWeight:300 }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Screenshot placeholder grid */}
      <div>
        <p className="mono" style={{ fontSize:".55rem",color:C.textMuted,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".6rem",opacity:.7 }}>Documentation</p>
        <div style={{ display:"flex",gap:".6rem",flexWrap:"wrap" }}>
          {[1,2,3].map(n => (
            <div key={n} style={{
              width:"130px",height:"80px",borderRadius:"6px",
              background:C.bgCard2,border:`1px dashed ${C.border}`,
              display:"flex",alignItems:"center",justifyContent:"center",
              flexShrink:0,
            }}>
              <span className="mono" style={{ fontSize:".52rem",color:C.textMuted,opacity:.4 }}>screenshot_{n}.png</span>
            </div>
          ))}
        </div>
      </div>

      <a href={project.repo} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none",alignSelf:"flex-start" }}>
        <button className="btn-ghost" style={{ borderColor:`${accent}50`,color:accent }}>
          View on GitHub →
        </button>
      </a>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────
// WORK SECTION
// ─────────────────────────────────────────────────────────────────
const Work = memo(({ C }) => {
  const { isMobile } = useTheme();
  const [hovered, setHovered]   = useState(null);
  const [expanded, setExpanded] = useState(null);  // desktop
  const [sheet, setSheet]       = useState(null);  // mobile

  const toggleExpand = useCallback((id) => {
    if (isMobile) { setSheet(id); return; }
    setExpanded(p => p === id ? null : id);
  }, [isMobile]);

  return (
    <section id="work" className="work-section" style={{
      padding: isMobile ? "3.5rem 1rem" : "6rem 3rem",
      borderTop:`1px solid ${C.border}`,
    }}>
      <div style={{ maxWidth:"1200px",margin:"0 auto" }}>
        {/* Header */}
        <div className="reveal" style={{ marginBottom: isMobile?"2rem":"2.75rem" }}>
          <p className="mono" style={{ fontSize:".62rem",color:C.accent,marginBottom:".45rem",letterSpacing:".12em",display:"flex",alignItems:"center",gap:".45rem" }}>
            <span style={{ opacity:.4 }}>02 /</span>
            <span>featured projects</span>
          </p>
          <h2 style={{
            fontFamily:"'DM Serif Display',serif",
            fontSize: isMobile ? "1.8rem" : "clamp(2rem,4vw,3rem)",
            fontWeight:400,color:C.textPri,lineHeight:1.05,
          }}>
            Things I've <em>Built</em>
          </h2>
        </div>

        {/* Project list */}
        <div>
          {PROJECTS.map((p, i) => {
            const accent = C[p.accent] || C.accent;
            return (
              <div key={p.id}>
                <div
                  className={`project-row reveal d${Math.min(i+1,5)}`}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => toggleExpand(p.id)}
                  style={{
                    cursor:"pointer",
                    background: expanded===p.id ? `${accent}10` : hovered===p.id ? `${accent}09` : "transparent",
                    transition:"background .2s",
                  }}
                >
                  {/* Accent left bar */}
                  <div style={{
                    position:"absolute",left:0,top:".5rem",bottom:".5rem",width:"2px",borderRadius:"2px",
                    background: p.featured||hovered===p.id||expanded===p.id ? accent : "transparent",
                    transition:"background .2s",
                    opacity: p.featured && hovered!==p.id && expanded!==p.id ? .35 : 1,
                  }} />

                  {/* ID */}
                  <div className="mono" style={{
                    fontSize:".68rem",color: hovered===p.id||expanded===p.id ? accent : C.textMuted,
                    fontWeight:500,paddingTop:".15rem",paddingLeft:".75rem",
                    transition:"color .2s",opacity: hovered===p.id||expanded===p.id ? 1 : .45,
                  }}>{p.id}</div>

                  {/* Title */}
                  <div style={{ minWidth:0,overflow:"hidden" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:".55rem",marginBottom:".25rem",flexWrap:"wrap" }}>
                      <h3 style={{ fontFamily:"'DM Serif Display',serif",fontSize:isMobile?"1rem":"clamp(1.1rem,1.8vw,1.3rem)",fontWeight:400,color:C.textPri,lineHeight:1.2,margin:0 }}>
                        {p.title}
                      </h3>
                      {p.status === "active" && (
                        <span className="mono" style={{
                          fontSize:".46rem",padding:".16rem .48rem",borderRadius:"20px",letterSpacing:".1em",textTransform:"uppercase",
                          background:`${C.emerald}18`,color:C.emerald,border:`1px solid ${C.emerald}40`,
                          display:"inline-flex",alignItems:"center",gap:".28rem",flexShrink:0,
                        }}>
                          <span style={{ width:"4px",height:"4px",borderRadius:"50%",background:C.emerald,display:"inline-block",animation:"pulse-dot 2s ease-in-out infinite" }} />
                          active
                        </span>
                      )}
                      {p.featured && (
                        <span className="mono" style={{
                          fontSize:".46rem",padding:".16rem .48rem",borderRadius:"20px",letterSpacing:".1em",textTransform:"uppercase",
                          background:`${accent}18`,color:accent,border:`1px solid ${accent}40`,flexShrink:0,
                        }}>featured</span>
                      )}
                    </div>
                    <div style={{ display:"flex",alignItems:"center",gap:".4rem" }}>
                      <span style={{ display:"inline-block",width:"5px",height:"5px",borderRadius:"1px",background:accent,flexShrink:0 }} />
                      <p className="mono" style={{ fontSize:".58rem",color:accent,opacity:.8 }}>{p.category}</p>
                    </div>
                  </div>

                  {/* Description (desktop) */}
                  <p className="proj-desc" style={{
                    fontSize:".8rem",lineHeight:1.75,fontWeight:300,
                    color: hovered===p.id ? C.textSec : C.textMuted,maxWidth:"360px",transition:"color .2s",
                  }}>{p.desc}</p>

                  {/* Year + tags (desktop) */}
                  <div className="proj-meta" style={{ textAlign:"right" }}>
                    <div className="mono" style={{ fontSize:".6rem",color:C.textMuted,marginBottom:".45rem",opacity:.4 }}>{p.year}</div>
                    <div style={{ display:"flex",flexDirection:"column",gap:".25rem",alignItems:"flex-end" }}>
                      {p.stack.slice(0,3).map(t => (
                        <span key={t} className="tag-pill" style={{
                          borderColor: hovered===p.id ? `${accent}50` : C.border,
                          color: hovered===p.id ? accent : C.textMuted,transition:"color .2s,border-color .2s",
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Chevron */}
                  <div style={{
                    position:"absolute",right:"1rem",top:"50%",transform:"translateY(-50%)",
                    color:C.textMuted,fontSize:".52rem",
                    opacity: hovered===p.id ? .55 : .18,transition:"opacity .2s",pointerEvents:"none",
                    rotate: expanded===p.id ? "90deg" : "0deg",
                  }}>▶</div>
                </div>

                {/* Expanded panel (desktop only) */}
                {!isMobile && expanded===p.id && <ProjectExpandedPanel project={p} C={C} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom sheet (mobile) */}
      {isMobile && sheet && (
        <ProjectBottomSheet project={PROJECTS.find(p=>p.id===sheet)} C={C} onClose={() => setSheet(null)} />
      )}
    </section>
  );
});

// ─────────────────────────────────────────────────────────────────
// SKILLS DONUT
// ─────────────────────────────────────────────────────────────────
const SkillsDonut = memo(({ C, isMobile }) => {
  const canvasRef  = useRef(null);
  const [hov, setHov] = useState(null);
  const animRef    = useRef(null);
  const progRef    = useRef(0);
  const hovRef     = useRef(null);
  const ctxRef     = useRef(null);
  const sizeRef    = useRef(0);
  const angRef     = useRef([]);

  const segments = useMemo(() => SKILLS.map(g => ({
    label: g.category,
    color: C[g.accent] || C.accent,
    value: Math.round(g.items.reduce((s,it) => s+it.level, 0) / g.items.length),
  })), [C]);

  useEffect(() => { hovRef.current = hov; }, [hov]);

  const draw = useCallback((prog) => {
    const ctx=ctxRef.current, size=sizeRef.current, angs=angRef.current;
    if (!ctx||!size||!angs.length) return;
    const cx=size/2, cy=size/2, outerR=size*.42, innerR=size*.26;
    ctx.clearRect(0,0,size,size);
    ctx.beginPath(); ctx.arc(cx,cy,(outerR+innerR)/2,0,Math.PI*2);
    ctx.strokeStyle="rgba(128,128,128,.08)"; ctx.lineWidth=outerR-innerR; ctx.stroke();
    angs.forEach((seg,i) => {
      const end=seg.start+(seg.end-seg.start)*prog;
      const isH=hovRef.current===i;
      const ro=isH?outerR+5:outerR, ri=isH?innerR-2:innerR;
      ctx.beginPath(); ctx.arc(cx,cy,ro,seg.start,end); ctx.arc(cx,cy,ri,end,seg.start,true); ctx.closePath();
      ctx.fillStyle=isH?seg.color:seg.color+"cc"; ctx.shadowBlur=0; ctx.fill();
      if (isH){ ctx.shadowColor=seg.color; ctx.shadowBlur=12; ctx.fill(); ctx.shadowBlur=0; }
    });
    ctx.textAlign="center";
    const hh=hovRef.current;
    if (hh!==null && prog>=1) {
      const seg=angs[hh];
      ctx.fillStyle=seg.color; ctx.font=`600 ${isMobile?20:24}px 'JetBrains Mono',monospace`;
      ctx.fillText(seg.value+"%",cx,cy+(isMobile?7:9));
      ctx.fillStyle="rgba(128,128,128,.55)"; ctx.font=`400 ${isMobile?7:8}px 'JetBrains Mono',monospace`;
      ctx.fillText(seg.label.toUpperCase(),cx,cy+(isMobile?20:23));
    } else if (hh===null && prog>=1) {
      ctx.fillStyle="rgba(128,128,128,.3)"; ctx.font=`400 ${isMobile?7:8}px 'JetBrains Mono',monospace`;
      ctx.fillText("HOVER TO INSPECT",cx,cy+4);
    }
  }, [isMobile]);

  useEffect(() => {
    const canvas=canvasRef.current; if (!canvas) return;
    const dpr=devicePixelRatio||1, size=isMobile?210:270;
    sizeRef.current=size; canvas.width=size*dpr; canvas.height=size*dpr;
    canvas.style.width=size+"px"; canvas.style.height=size+"px";
    const ctx=canvas.getContext("2d"); ctx.scale(dpr,dpr); ctxRef.current=ctx;
    const total=segments.reduce((s,seg)=>s+seg.value,0);
    const gap=.025; let cur=-Math.PI/2;
    angRef.current=segments.map(seg=>{ const sl=(seg.value/total)*(Math.PI*2-gap*segments.length); const a={start:cur,end:cur+sl,...seg}; cur+=sl+gap; return a; });
    progRef.current=0;
    const start=performance.now(), dur=1000, ease=t=>1-Math.pow(1-t,3);
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const animate=(now)=>{ const t=Math.min((now-start)/dur,1); progRef.current=ease(t); draw(progRef.current); if (t<1) animRef.current=requestAnimationFrame(animate); };
    animRef.current=requestAnimationFrame(animate);
    return ()=>{ if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [segments, isMobile, draw]);

  useEffect(() => { if (progRef.current>=1) draw(1); }, [hov, draw]);

  const handleMouseMove = useCallback((e) => {
    const canvas=canvasRef.current; if (!canvas||progRef.current<1) return;
    const rect=canvas.getBoundingClientRect();
    const mx=e.clientX-rect.left, my=e.clientY-rect.top;
    const size=isMobile?210:270, cx=size/2, cy=size/2;
    const dx=mx-cx, dy=my-cy, dist=Math.sqrt(dx*dx+dy*dy);
    const outerR=size*.42+7, innerR=size*.26-4;
    if (dist<innerR||dist>outerR){ setHov(null); return; }
    let ang=Math.atan2(dy,dx); if(ang<-Math.PI/2) ang+=Math.PI*2;
    const total=segments.reduce((s,seg)=>s+seg.value,0);
    const gap=.025; let cur=-Math.PI/2;
    for(let i=0;i<segments.length;i++){
      const sl=(segments[i].value/total)*(Math.PI*2-gap*segments.length);
      if(ang>=cur&&ang<=cur+sl){ setHov(i); return; }
      cur+=sl+gap;
    }
    setHov(null);
  }, [segments,isMobile]);

  return (
    <div style={{ display:"flex",flexDirection:isMobile?"column":"row",alignItems:"center",justifyContent:"center",gap:isMobile?"1.25rem":"2.5rem",padding:isMobile?"1rem 0":"1.5rem 0" }}>
      <canvas ref={canvasRef} onMouseMove={handleMouseMove} onMouseLeave={()=>setHov(null)} style={{ cursor:"crosshair",flexShrink:0 }} />
      <div style={{ display:"flex",flexDirection:"column",gap:".65rem",minWidth:"185px" }}>
        {segments.map((seg,i) => (
          <div key={seg.label} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{ display:"flex",alignItems:"center",gap:".65rem",cursor:"pointer",opacity:hov!==null&&hov!==i?.32:1,transition:"opacity .2s" }}>
            <div style={{ width:"9px",height:"9px",borderRadius:"2px",flexShrink:0,background:seg.color,boxShadow:hov===i?`0 0 7px ${seg.color}`:"none",transition:"box-shadow .2s" }} />
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline" }}>
                <span className="mono" style={{ fontSize:".65rem",color:hov===i?seg.color:C.textSec,transition:"color .2s" }}>{seg.label}</span>
                <span className="mono" style={{ fontSize:".6rem",color:seg.color,fontWeight:500 }}>{seg.value}%</span>
              </div>
              <div style={{ height:"1px",background:C.border,marginTop:".2rem" }}>
                <div style={{ height:"100%",width:hov===i?`${seg.value}%`:"0%",background:seg.color,transition:"width .32s cubic-bezier(.16,1,.3,1)" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────
// SKILLS SECTION
// ─────────────────────────────────────────────────────────────────
const Skills = memo(({ C }) => {
  const { isMobile } = useTheme();
  const [viewMode, setViewMode] = useState("bar");
  const [activeFilter, setActiveFilter] = useState(null);

  const filtered = activeFilter ? SKILLS.filter(s=>s.category===activeFilter) : SKILLS;

  return (
    <section id="skills" className="skills-section" style={{
      padding: isMobile ? "3.5rem 1rem" : "6rem 3rem",
      borderTop:`1px solid ${C.border}`,
    }}>
      <div style={{ maxWidth:"1200px",margin:"0 auto" }}>
        {/* Header */}
        <div className="reveal" style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"1rem",marginBottom:isMobile?"1.75rem":"2.5rem" }}>
          <div>
            <p className="mono" style={{ fontSize:".62rem",color:C.accent,marginBottom:".45rem",letterSpacing:".12em",display:"flex",alignItems:"center",gap:".45rem" }}>
              <span style={{ opacity:.4 }}>03 /</span>
              <span>tools &amp; expertise</span>
            </p>
            <h2 style={{ fontFamily:"'DM Serif Display',serif",fontSize:isMobile?"1.8rem":"clamp(2rem,4vw,3rem)",fontWeight:400,color:C.textPri,lineHeight:1.05 }}>
              What I <em>Work With</em>
            </h2>
          </div>
          {/* View mode toggle */}
          <div style={{ display:"flex",gap:".4rem" }}>
            {["bar","chart"].map(m => (
              <button key={m} onClick={()=>setViewMode(m)} className="mono" style={{
                fontSize:".6rem",padding:".4rem .8rem",borderRadius:"5px",border:`1px solid ${viewMode===m?C.accent:C.border}`,
                background:viewMode===m?`${C.accent}18`:"transparent",color:viewMode===m?C.accentLight:C.textMuted,
                cursor:"pointer",transition:"all .2s",minHeight:"36px",
              }}>{m==="bar"?"≡ bar":"◯ chart"}</button>
            ))}
          </div>
        </div>

        {viewMode === "chart" ? (
          <div className="reveal">
            <SkillsDonut C={C} isMobile={isMobile} />
          </div>
        ) : (
          <div>
            {/* Category filters */}
            <div className="reveal" style={{ display:"flex",gap:".4rem",flexWrap:"wrap",marginBottom:"1.75rem" }}>
              <button onClick={()=>setActiveFilter(null)} className="mono" style={{
                fontSize:".58rem",padding:".32rem .75rem",borderRadius:"4px",border:`1px solid ${!activeFilter?C.accent:C.border}`,
                background:!activeFilter?`${C.accent}18`:"transparent",color:!activeFilter?C.accentLight:C.textMuted,
                cursor:"pointer",transition:"all .2s",minHeight:"36px",
              }}>all</button>
              {SKILLS.map(s => {
                const ac = C[s.accent]||C.accent;
                const isA = activeFilter===s.category;
                return (
                  <button key={s.category} onClick={()=>setActiveFilter(s.category===activeFilter?null:s.category)} className="mono" style={{
                    fontSize:".58rem",padding:".32rem .75rem",borderRadius:"4px",
                    border:`1px solid ${isA?ac:C.border}`,
                    background:isA?`${ac}18`:"transparent",color:isA?ac:C.textMuted,
                    cursor:"pointer",transition:"all .2s",minHeight:"36px",
                  }}>{s.category.toLowerCase()}</button>
                );
              })}
            </div>

            {/* Bar grids */}
            <div className="skills-grid reveal" style={{
              display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)",gap:"1.5rem",
            }}>
              {filtered.map((group, gi) => {
                const ac = C[group.accent]||C.accent;
                return (
                  <div key={group.category} className={`reveal d${gi+1}`} style={{ background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"8px",padding:"1.1rem",overflow:"hidden" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:".4rem",marginBottom:".9rem" }}>
                      <div style={{ width:"6px",height:"6px",borderRadius:"1px",background:ac,flexShrink:0 }} />
                      <p className="mono" style={{ fontSize:".6rem",color:ac,letterSpacing:".06em",fontWeight:500 }}>{group.category}</p>
                    </div>
                    <div style={{ display:"flex",flexDirection:"column",gap:"0" }}>
                      {group.items.map((it, idx) => (
                        <div key={it.name} className="skill-item" style={{
                          fontSize:".75rem",fontWeight:300,color:C.textSec,
                          padding:".5rem 0",borderBottom:`1px solid ${C.borderFaint}`,
                          fontFamily:"'JetBrains Mono',monospace",
                        }}>
                          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:".3rem" }}>
                            <span>{it.name}</span>
                            <span style={{ fontSize:".55rem",color:ac,opacity:.7 }}>{it.level}%</span>
                          </div>
                          <div style={{ height:"2px",background:C.bgCard2,borderRadius:"1px",overflow:"hidden" }}>
                            <div className="skill-bar" style={{
                              height:"100%",background:`linear-gradient(90deg,${ac}aa,${ac})`,
                              borderRadius:"1px",width:`${it.level}%`,
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Certs */}
        <div style={{ marginTop: isMobile?"2.5rem":"3.5rem" }}>
          <p className="mono reveal" style={{ fontSize:".62rem",color:C.textMuted,letterSpacing:".1em",textTransform:"uppercase",marginBottom:"1.1rem",opacity:.6 }}>
            Certifications
          </p>
          <div className="certs-grid reveal" style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2,1fr)",gap:".5rem" }}>
            {CERTS.map((cert, i) => {
              const ac = C[cert.accent]||C.accent;
              return (
                <div key={i} className="cert-card" style={{ "--cert-color":ac } as React.CSSProperties}>
                  <div style={{ display:"flex",alignItems:"flex-start",gap:".75rem" }}>
                    <div style={{ width:"3px",height:"28px",borderRadius:"2px",background:ac,flexShrink:0,marginTop:".1rem" }} />
                    <div>
                      <p style={{ fontSize:".8rem",color:C.textPri,fontWeight:400,marginBottom:".15rem" }}>{cert.name}</p>
                      <p className="mono" style={{ fontSize:".55rem",color:C.textMuted,letterSpacing:".04em" }}>{cert.issuer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

// ─────────────────────────────────────────────────────────────────
// CONTACT SECTION
// ─────────────────────────────────────────────────────────────────
const Contact = memo(({ C }) => {
  const { isMobile } = useTheme();
  const [form, setForm]     = useState({ name:"",email:"",message:"" });
  const [sent, setSent]     = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]   = useState(null);
  const [copied, setCopied] = useState(null);

  const copy = useCallback((val, key) => {
    navigator.clipboard.writeText(val).then(() => { setCopied(key); setTimeout(()=>setCopied(null), 2000); });
  }, []);

  const handleSubmit = useCallback(() => {
    if (!form.name||!form.email||!form.message) return;
    setSending(true); setError(null);
    emailjs.send("service_vmsghvn","template_hsc6m9u",
      { from_name:form.name,from_email:form.email,message:form.message },
      "sruNPf6oBWFdmDHtA"
    ).then(()=>{ setSent(true); setSending(false); })
     .catch(()=>{ setError("Failed to send. Please email directly."); setSending(false); });
  }, [form]);

  const handleChange = useCallback((key, val) => setForm(p=>({...p,[key]:val})), []);

  const contactInfo = [
    ["Email",    "alvaroprayogo38@gmail.com",     C.emerald, true ],
    ["Location", "Cikarang Selatan, West Java, ID", null,    false],
    ["Org",      "teamitmivhs · @SpacedCode",     C.accent,  false],
    ["Response", "Within 24h",                    null,      false],
  ];

  return (
    <section id="contact" className="contact-section" style={{ padding: isMobile?"3.5rem 1rem":"6rem 3rem",borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:"1200px",margin:"0 auto" }}>
        <div className="contact-grid" style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:isMobile?"2rem":"5rem" }}>

          {/* Left */}
          <div className="reveal-left">
            <p className="mono" style={{ fontSize:".62rem",color:C.accent,marginBottom:".45rem",letterSpacing:".12em",display:"flex",alignItems:"center",gap:".45rem" }}>
              <span style={{ opacity:.4 }}>04 /</span>
              <span>get in touch</span>
            </p>
            <h2 style={{ fontFamily:"'DM Serif Display',serif",fontSize:isMobile?"1.75rem":"clamp(1.8rem,3vw,2.7rem)",color:C.textPri,fontWeight:400,lineHeight:1.1,marginBottom:"1.25rem" }}>
              Drop me<br />a <em>message</em>
            </h2>
            <p style={{ fontSize:".83rem",lineHeight:1.7,fontWeight:300,color:C.textSec,maxWidth:"310px",marginBottom:"2rem" }}>
              Open to SysAdmin, Junior Penetration Tester, Infrastructure Engineer, and SOC Analyst roles — remote or hybrid. Also happy to collaborate on open source Go and security tooling.
            </p>

            {contactInfo.map(([label,value,accent,copyable]) => (
              <div key={label} onClick={()=>copyable&&copy(value,label)} style={{
                display:"flex",justifyContent:"space-between",alignItems:"center",
                padding:".8rem 0",borderBottom:`1px solid ${C.border}`,gap:"1rem",
                cursor:copyable?"pointer":"default",
              }} title={copyable?"Click to copy":undefined}>
                <span className="mono" style={{ fontSize:".58rem",color:C.textMuted,letterSpacing:".07em",flexShrink:0 }}>{label}</span>
                <span className="mono" style={{
                  fontSize:".7rem",color:copied===label?C.emerald:(accent||C.textSec),fontWeight:400,
                  textAlign:"right",wordBreak:"break-all",transition:"color .2s",
                  display:"flex",alignItems:"center",gap:".35rem",
                }}>
                  {copied===label ? "copied!" : value}
                  {copyable&&copied!==label&&<span style={{ fontSize:".48rem",opacity:.35 }}>⎘</span>}
                </span>
              </div>
            ))}

            <div style={{ display:"flex",gap:"1.25rem",marginTop:"1.75rem",flexWrap:"wrap" }}>
              {Object.entries(SOCIAL_LINKS).map(([label,url]) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily:"'JetBrains Mono',monospace",fontSize:".62rem",color:C.textMuted,
                  textDecoration:"none",transition:"color .2s",padding:".4rem 0",
                  minHeight:"44px",display:"inline-flex",alignItems:"center",
                }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal-right">
            {sent ? (
              <div style={{ height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",gap:"1.1rem",padding:isMobile?"2rem 0":0 }}>
                <div style={{ width:"48px",height:"48px",borderRadius:"50%",background:`${C.emerald}18`,border:`1px solid ${C.emerald}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",color:C.emerald }}>✓</div>
                <h3 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1.4rem",color:C.textPri }}>Transmission received</h3>
                <p className="mono" style={{ fontSize:".68rem",color:C.textSec }}>I'll respond within 24 hours.</p>
              </div>
            ) : (
              <div style={{ display:"flex",flexDirection:"column",gap:"1.1rem" }}>
                {[{key:"name",label:"full_name",type:"text"},{key:"email",label:"email_address",type:"email"}].map(f => (
                  <div key={f.key} style={{ display:"flex",flexDirection:"column",gap:".35rem" }}>
                    <label className="mono" style={{ fontSize:".58rem",color:C.textMuted,letterSpacing:".06em" }}>{f.label}</label>
                    <input className="form-input" type={f.type} value={form[f.key]} onChange={e=>handleChange(f.key,e.target.value)} autoComplete={f.key==="email"?"email":"name"} />
                  </div>
                ))}
                <div style={{ display:"flex",flexDirection:"column",gap:".35rem" }}>
                  <label className="mono" style={{ fontSize:".58rem",color:C.textMuted,letterSpacing:".06em" }}>message</label>
                  <textarea className="form-input" rows={isMobile?4:5} style={{ resize:"none" }} value={form.message} onChange={e=>handleChange("message",e.target.value)} />
                </div>
                <button className="btn-primary" onClick={handleSubmit} disabled={sending} style={{ alignSelf:"flex-start",opacity:sending?.6:1,cursor:sending?"not-allowed":"pointer" }}>
                  {sending?"Sending...":"./send_message.sh →"}
                </button>
                {error && <p className="mono" style={{ fontSize:".62rem",color:C.rose,marginTop:".35rem" }}>{error}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

// ─────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────
const Footer = memo(({ C }) => {
  const { isMobile } = useTheme();
  const [atTop, setAtTop] = useState(true);
  useEffect(() => {
    const fn = () => setAtTop(window.scrollY < 80);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <footer className="footer-inner" style={{
      padding: isMobile?"1rem":"1.25rem 3rem",
      borderTop:`1px solid ${C.border}`,
      display:"flex",justifyContent:"space-between",
      flexWrap:"wrap",gap:".75rem",
      flexDirection:isMobile?"column":"row",
      alignItems:isMobile?"flex-start":"center",
    }}>
      <span className="mono" style={{ fontSize:".7rem",color:C.textMuted }}>
        <span style={{ color:C.accent }}>[</span>
        paro@thegreat
        <span style={{ color:C.rose }}>:~</span>
        <span style={{ color:C.accent }}>]</span>
        <span style={{ color:C.textMuted }}>$</span>
      </span>

      <div style={{ display:"flex",gap:"1.25rem" }}>
        {Object.entries(SOCIAL_LINKS).map(([label,url]) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{
            fontFamily:"'JetBrains Mono',monospace",fontSize:".6rem",color:C.textMuted,
            textDecoration:"none",padding:".35rem 0",minHeight:"44px",display:"inline-flex",alignItems:"center",
          }}>{label}</a>
        ))}
      </div>

      <div style={{ display:"flex",alignItems:"center",gap:"1.25rem" }}>
        <span className="mono" style={{ fontSize:".6rem",color:C.textMuted }}>©{new Date().getFullYear()} Alvaro Prayogo</span>
        <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className="mono" style={{
          fontSize:".58rem",color:atTop?C.textMuted:C.accent,
          background:"transparent",border:`1px solid ${atTop?C.border:C.accent+"44"}`,
          borderRadius:"4px",padding:".25rem .65rem",cursor:"pointer",transition:"all .22s",letterSpacing:".06em",
          opacity:atTop?.35:1,minHeight:"36px",
        }}>↑ top</button>
      </div>
    </footer>
  );
});

// ─────────────────────────────────────────────────────────────────
// DECORATIVE OVERLAYS
// ─────────────────────────────────────────────────────────────────
const Overlays = memo(({ C }) => (
  <>
    {/* Subtle top-left corner accent */}
    <div style={{
      position:"fixed",top:0,left:0,width:"320px",height:"320px",
      background:`radial-gradient(ellipse at top left,${C.accent}0a 0%,transparent 70%)`,
      pointerEvents:"none",zIndex:0,
    }} />
    {/* Bottom-right */}
    <div style={{
      position:"fixed",bottom:0,right:0,width:"280px",height:"280px",
      background:`radial-gradient(ellipse at bottom right,${C.emerald}08 0%,transparent 70%)`,
      pointerEvents:"none",zIndex:0,
    }} />
  </>
));

// ─────────────────────────────────────────────────────────────────
// SCROLL HOOKS
// ─────────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vis"); obs.unobserve(e.target); } });
    }, { threshold:.08, rootMargin:"0px 0px -40px 0px" });
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useScrollSpy() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const sections = [{id:"home",label:"Home"},{id:"work",label:"Work"},{id:"skills",label:"Skills"},{id:"contact",label:"Contact"}];
    let rafId;
    const fn = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY + 100;
        for (let i=sections.length-1; i>=0; i--) {
          const el = document.getElementById(sections[i].id);
          if (el&&el.offsetTop<=y) { setActive(sections[i].label); break; }
        }
      });
    };
    window.addEventListener("scroll",fn,{passive:true});
    return ()=>{ window.removeEventListener("scroll",fn); cancelAnimationFrame(rafId); };
  }, []);
  return active;
}

// ─────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [isDark, setIsDark]           = useState(true);
  const [booted, setBooted]           = useState(false);
  const [startAlvaro, setStartAlvaro] = useState(false);
  const [startPrayogo, setStartPrayogo] = useState(false);
  const seqStarted                    = useRef(false);
  const { isMobile, isTouch }         = useMobileDetect();
  const C                             = useMemo(() => makeTokens(isDark), [isDark]);
  const toggle                        = useCallback(() => setIsDark(d=>!d), []);
  const active                        = useScrollSpy();
  useScrollReveal();

  useEffect(() => {
    if (booted && !seqStarted.current) {
      seqStarted.current = true;
      setStartAlvaro(true);
      const t = setTimeout(() => setStartPrayogo(true), 900);
      return () => clearTimeout(t);
    }
  }, [booted]);

  const themeVal = useMemo(() => ({ isDark, toggle, isMobile }), [isDark, toggle, isMobile]);

  return (
    <ThemeCtx.Provider value={themeVal}>
      <GlobalStyles C={C} isMobile={isMobile} />
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      <ThemeFlash isDark={isDark} />
      <Navbar active={active} C={C} />
      <div style={{ opacity:booted?1:0, transition:booted?"opacity .7s cubic-bezier(.16,1,.3,1) .1s":"none" }}>
        <Overlays C={C} />
        <Hero C={C} booted={booted} startAlvaro={startAlvaro} startPrayogo={startPrayogo} />
        <Work C={C} />
        <Skills C={C} />
        <Contact C={C} />
        <Footer C={C} />
      </div>
    </ThemeCtx.Provider>
  );
}
