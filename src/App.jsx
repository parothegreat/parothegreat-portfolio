import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

const SOCIAL_LINKS = {
  GitHub: "https://github.com/parothegreat",
  LinkedIn:
    "https://www.linkedin.com/in/moehammad-alvaro-pirata-prayogo-842a8834a",
  TryHackMe: "https://tryhackme.com/p/parothegreat",
  LeetCode: "https://leetcode.com/parothegreat",
};

const PROFILE_IMAGE = "/images/profile/pfp.jpeg";

const ROLE_CARDS = [
  {
    title: "SysAdmin",
    kicker: "Linux-first operations",
    accent: "teal",
    description:
      "Hardening services, managing access, and keeping systems observable.",
  },
  {
    title: "Industrial Electronics Student",
    kicker: "Engineering foundation",
    accent: "amber",
    description:
      "Learning electronics, control systems, sensors, and practical hardware.",
  },
  {
    title: "DevOps Engineer",
    kicker: "Automation mindset",
    accent: "blue",
    description:
      "CI/CD, containers, reverse proxies, and repeatable deployment flows.",
  },
  {
    title: "Penetration Tester",
    kicker: "Security validation",
    accent: "rose",
    description:
      "Recon, enumeration, Linux/web testing, and clear remediation notes.",
  },
];

const TERMINAL_SESSIONS = [
  {
    command: "whoami",
    outputs: ["parothegreat — sysadmin, devops learner, pentest operator"],
  },
  {
    command: "cat education.txt",
    outputs: [
      "Student of Industrial Electronics Engineering",
      "Focus: control systems + secure infrastructure",
    ],
  },
  {
    command: "cat organization.md",
    outputs: [
      "IT Mitra Industri VHS — SysAdmin, Network Engineer, Backend, NetSec, DevOps",
    ],
  },
  {
    command: "systemctl status portfolio.service",
    outputs: ["active (running) — Linux labs, Go tooling, CI/CD notes"],
  },
  {
    command: "nmap --top-ports 1000 lab.local",
    outputs: ["22/tcp ssh · 80/tcp http · report.md generated"],
  },
];

const PROJECTS = [
  {
    id: "01",
    title: "RFID Access Control System",
    category: "Physical Access Platform",
    repo: "https://github.com/teamitmivhs/rfid-access-control-system",
    stack: ["Go", "RFID Hardware", "REST API", "PostgreSQL"],
    year: "2024",
    status: "Deployed",
    featured: true,
    accent: "teal",
    summary:
      "Institutional RFID-based physical access control system for SMK Mitra Industri MM2100 with sub-200ms card read-to-response flow, role-based permissions, and auditable access logs.",
    impact: [
      "Replaced manual attendance and access tracking with an automated system.",
      "Designed for daily use across multiple campus access points.",
      "Integrated hardware reads with a Go backend and persistent audit trails.",
    ],
  },
  {
    id: "02",
    title: "go-bot",
    category: "Autonomous Reconnaissance Tool",
    repo: "https://github.com/parothegreat/go-bot",
    stack: ["Go", "Goroutines", "HTTP Client", "CLI"],
    year: "2025",
    status: "Active",
    featured: true,
    accent: "blue",
    summary:
      "Concurrent reconnaissance bot written in Go for penetration testing workflows, built around modular task execution and structured output for downstream analysis.",
    impact: [
      "Automates repetitive recon steps for faster target enumeration.",
      "Uses goroutine-based request handling for high-throughput checks.",
      "Keeps the tool portable as a simple Linux-friendly binary.",
    ],
  },
  {
    id: "03",
    title: "go_http_checker",
    category: "Infrastructure Monitor",
    repo: "https://github.com/parothegreat/go_http_checker",
    stack: ["Go", "net/http", "TLS", "Workers"],
    year: "2024",
    status: "Completed",
    featured: false,
    accent: "indigo",
    summary:
      "Lightweight HTTP health checking utility for monitoring endpoint availability, response times, and status codes without heavy observability overhead.",
    impact: [
      "Useful for self-hosted infrastructure smoke tests.",
      "Single-binary deployment with configurable timeouts and retries.",
    ],
  },
  {
    id: "04",
    title: "Mitra-Coffeeshop",
    category: "Full-stack Web App",
    repo: "https://github.com/teamitmivhs/Mitra-Coffeeshop",
    stack: ["TypeScript", "React", "Next.js", "Node.js"],
    year: "2024",
    status: "Completed",
    featured: false,
    accent: "amber",
    summary:
      "Web platform for the Mitra Industri Vocational High School coffee shop, covering product display, ordering workflows, and operational management.",
    impact: [
      "Digitalised ordering and inventory workflows used in a school environment.",
      "Built with a collaborative team under the teamitmivhs organization.",
    ],
  },
  {
    id: "05",
    title: "work-order",
    category: "Workflow Management",
    repo: "https://github.com/teamitmivhs/work-order",
    stack: ["HTML", "CSS", "JavaScript", "Backend API"],
    year: "2023",
    status: "Completed",
    featured: false,
    accent: "rose",
    summary:
      "Digital work order management system for creating, assigning, tracking, and resolving maintenance or technical tasks inside a school environment.",
    impact: [
      "Moved paper-based work orders into a searchable digital workflow.",
      "Mapped submit, assign, and approve stages to real operational needs.",
    ],
  },
];

const SKILLS = [
  {
    category: "SysAdmin",
    accent: "teal",
    items: [
      ["Linux hardening", 95],
      ["systemd services", 88],
      ["Bash automation", 92],
      ["Nginx / reverse proxy", 82],
      ["Users, groups & permissions", 90],
    ],
  },
  {
    category: "DevOps Engineering",
    accent: "blue",
    items: [
      ["Git / CI-CD workflows", 80],
      ["Docker fundamentals", 68],
      ["Deployment runbooks", 75],
      ["Monitoring mindset", 70],
      ["Infrastructure documentation", 86],
    ],
  },
  {
    category: "Penetration Testing",
    accent: "rose",
    items: [
      ["Recon & enumeration", 72],
      ["Go offensive tooling", 68],
      ["CTF web/linux/network", 65],
      ["OWASP Top 10", 60],
      ["Reporting & remediation", 70],
    ],
  },
  {
    category: "Industrial Electronics",
    accent: "amber",
    items: [
      ["Sensor & actuator basics", 76],
      ["RFID hardware integration", 82],
      ["Control systems mindset", 68],
      ["Electrical troubleshooting", 70],
      ["Hardware-software bridge", 78],
    ],
  },
];

const CERTS = [
  ["Networking Essentials", "Cisco Networking Academy", "blue"],
  ["Linux Essentials", "Cisco Networking Academy", "teal"],
  ["Cybersecurity Essentials", "Cisco Networking Academy", "indigo"],
  ["Ethical Hacking Essentials", "EC-Council / Cisco", "rose"],
  ["Network Defence Essentials", "EC-Council", "rose"],
  ["Introduction to Cybersecurity", "Cisco / NDG", "blue"],
  ["Google for Developers", "Google", "teal"],
  ["Google Cloud Fundamentals", "Google Cloud", "indigo"],
  ["NDG Linux Essentials", "NDG / Cisco", "amber"],
  ["Linux Unhatched", "NDG / Cisco", "amber"],
];

const EXPERIENCES = [
  {
    organization: "IT Mitra Industri Vocational Highschool",
    role: "System Administrator · Network Engineer · Backend Developer · Network Security Engineer · DevOps",
    period: "Ongoing",
    location: "Cikarang, Indonesia",
    accent: "blue",
    summary:
      "Part of the school IT organization handling infrastructure operations, internal tooling, backend services, network administration, and security-focused improvements.",
    responsibilities: [
      "Maintain Linux-based services, users, permissions, and operational documentation.",
      "Support network planning, troubleshooting, segmentation basics, and connectivity reliability.",
      "Build backend utilities and school-oriented systems with practical deployment flows.",
      "Improve security posture through hardening, recon practice, and incident-aware documentation.",
      "Support DevOps workflows around version control, deployment notes, and repeatable maintenance.",
    ],
    tags: ["SysAdmin", "Network", "Backend", "NetSec", "DevOps"],
  },
  {
    organization: "Denso Manufacturing",
    role: "System Development & IT Support Intern / PKL",
    period: "Internship",
    location: "Manufacturing environment",
    accent: "teal",
    summary:
      "Supported daily IT operations in a large-scale manufacturing environment across system development support, user support, network troubleshooting, and IT asset documentation.",
    responsibilities: [
      "Provided daily technical support for hardware (PCs, printers, peripherals) and software issues across manufacturing departments.",
      "Installed, configured, and maintained operating systems and standard company applications on workstations.",
      "Assisted in monitoring the internal network, troubleshooting connectivity issues, and enforcing basic security baselines.",
      "Maintained IT asset documentation including device inventory records and software license tracking.",
      "Supported implementation of IT policies including scheduled data backups and system update procedures.",
    ],
    achievements: [
      "Gained hands-on understanding of IT infrastructure operations at large-scale manufacturing scale.",
      "Developed problem-solving and cross-department communication skills in a professional environment.",
      "Directly involved in system maintenance workflows that supported daily production continuity.",
    ],
    tags: ["IT Support", "System Development", "Networking", "Asset Docs"],
  },
];

const NAV_ITEMS = [
  ["Home", "home"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Work", "work"],
  ["Skills", "skills"],
  ["Contact", "contact"],
];

const ACCENTS = {
  blue: "#2563EB",
  indigo: "#4F46E5",
  teal: "#0F766E",
  amber: "#D97706",
  rose: "#E11D48",
};

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const offset = window.scrollY + 130;
      const current = [...NAV_ITEMS].reverse().find(([, id]) => {
        const el = document.getElementById(id);
        return el && el.offsetTop <= offset;
      });
      if (current) setActive(current[1]);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return active;
}

function scrollToSection(id) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    if (!elements.length) return undefined;

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -72px 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

function GlobalStyles() {
  return (
    <style>{`
      :root {
        --bg: #F7F3EA;
        --bg-soft: #EFE8DA;
        --surface: rgba(255,255,255,.78);
        --surface-solid: #FFFFFF;
        --ink: #111827;
        --ink-soft: #334155;
        --muted: #64748B;
        --line: rgba(15, 23, 42, .12);
        --line-strong: rgba(15, 23, 42, .2);
        --navy: #0F172A;
        --navy-2: #1E293B;
        --accent: #2563EB;
        --accent-soft: rgba(37, 99, 235, .1);
        --teal: #0F766E;
        --amber: #D97706;
        --rose: #E11D48;
        --radius: 28px;
        --shadow: 0 24px 80px rgba(15, 23, 42, .12);
        --container: 1160px;
      }

      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; scroll-padding-top: 92px; }
      body {
        margin: 0;
        background: var(--bg);
        color: var(--ink);
        font-family: 'Geist Variable', Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        -webkit-font-smoothing: antialiased;
        text-rendering: geometricPrecision;
      }
      body::selection { background: var(--accent-soft); color: var(--accent); }
      a { color: inherit; }
      button, input, textarea { font: inherit; }
      button { cursor: pointer; }
      button:disabled { cursor: not-allowed; }

      .opening-screen { position: fixed; inset: 0; z-index: 999; display: grid; place-items: center; pointer-events: none; background:
          radial-gradient(circle at 16% 12%, rgba(37,99,235,.18), transparent 28rem),
          radial-gradient(circle at 82% 18%, rgba(15,118,110,.16), transparent 28rem),
          linear-gradient(180deg, #F9F6EF 0%, #F7F3EA 100%); animation: openingExit .65s ease 1.85s forwards; }
      .opening-card { width: min(520px, calc(100% - 40px)); padding: 1.2rem; border: 1px solid rgba(255,255,255,.78); border-radius: 32px; background: rgba(255,255,255,.72); box-shadow: var(--shadow); backdrop-filter: blur(22px); animation: openingCardIn .72s cubic-bezier(.16,1,.3,1) both; }
      .opening-mark { width: 56px; height: 56px; display: grid; place-items: center; border-radius: 20px; background: linear-gradient(135deg, var(--navy), var(--accent)); color: #fff; font-weight: 950; font-size: 1.2rem; box-shadow: 0 20px 50px rgba(37,99,235,.24); }
      .opening-card h2 { margin: 1rem 0 .45rem; color: var(--ink); font-size: clamp(1.65rem, 5vw, 2.45rem); line-height: .98; letter-spacing: -.06em; }
      .opening-card p { margin: 0; color: var(--muted); line-height: 1.65; }
      .opening-progress { position: relative; overflow: hidden; height: 8px; margin-top: 1.2rem; border-radius: 999px; background: rgba(15,23,42,.08); }
      .opening-progress::before { content: ''; position: absolute; inset: 0; width: 42%; border-radius: inherit; background: linear-gradient(90deg, var(--accent), var(--teal)); animation: openingProgress 1.55s ease-in-out .18s forwards; }
      @keyframes openingCardIn { from { opacity: 0; transform: translateY(18px) scale(.97); filter: blur(8px); } to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
      @keyframes openingProgress { to { width: 100%; } }
      @keyframes openingExit { to { opacity: 0; visibility: hidden; transform: scale(1.02); } }
      @keyframes riseIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes softScaleIn { from { opacity: 0; transform: translateY(22px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }

      .portfolio-app {
        position: relative;
        min-height: 100dvh;
        overflow: hidden;
        background:
          radial-gradient(circle at 10% 0%, rgba(37, 99, 235, .13), transparent 30rem),
          radial-gradient(circle at 90% 12%, rgba(15, 118, 110, .13), transparent 34rem),
          linear-gradient(180deg, #F9F6EF 0%, #F6F1E7 44%, #F8FAFC 100%);
      }
      .container { width: min(var(--container), calc(100% - 40px)); margin: 0 auto; }
      .section { padding: clamp(4.5rem, 8vw, 7.5rem) 0; scroll-margin-top: 92px; }
      .section-header { display: grid; grid-template-columns: minmax(0, 1fr) minmax(220px, 360px); gap: 2rem; align-items: end; margin-bottom: 2rem; animation: riseIn .7s ease both; }
      .eyebrow { display: inline-flex; align-items: center; gap: .65rem; margin: 0 0 .85rem; color: var(--accent); font-size: .76rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
      .eyebrow::before { content: ''; width: 34px; height: 1px; background: currentColor; opacity: .45; }
      .section-title { margin: 0; font-size: clamp(2rem, 4.7vw, 4rem); line-height: .98; letter-spacing: -.055em; color: var(--ink); }
      .section-copy { margin: 0; color: var(--muted); line-height: 1.75; font-size: 1rem; }
      [data-reveal] { opacity: 0; transform: translateY(20px); transition: opacity .65s ease, transform .65s cubic-bezier(.16,1,.3,1); transition-delay: var(--reveal-delay, 0s); }
      [data-reveal].is-visible { opacity: 1; transform: translateY(0); }

      .role-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; margin-top: 1.45rem; max-width: 760px; }
      .role-card { position: relative; overflow: hidden; min-height: 132px; padding: 1rem; border: 1px solid var(--line); border-radius: 24px; background: rgba(255,255,255,.58); box-shadow: 0 16px 46px rgba(15, 23, 42, .06); transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease, background .28s ease; }
      .role-card::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 4px; background: var(--role-accent, var(--accent)); }
      .role-card::after { content: ''; position: absolute; inset: -45% -35% auto auto; width: 150px; height: 150px; border-radius: 999px; background: color-mix(in srgb, var(--role-accent, var(--accent)) 22%, transparent); opacity: 0; transform: translate(18px, -18px); transition: opacity .28s ease, transform .28s ease; pointer-events: none; }
      .role-card span { display: block; color: var(--muted); font-size: .72rem; font-weight: 850; letter-spacing: .1em; text-transform: uppercase; }
      .role-card strong { display: block; margin-top: .55rem; color: var(--ink); font-size: 1.02rem; letter-spacing: -.035em; }
      .role-card p { margin: .45rem 0 0; color: var(--ink-soft); font-size: .88rem; line-height: 1.55; }

      .site-nav { position: sticky; top: 0; z-index: 50; border-bottom: 1px solid var(--line); backdrop-filter: blur(22px); background: rgba(247, 243, 234, .78); animation: riseIn .65s ease .1s both; }
      .nav-inner { height: 74px; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; }
      .brand { display: inline-flex; align-items: center; gap: .75rem; border: 0; background: transparent; padding: 0; color: inherit; text-decoration: none; font-weight: 800; letter-spacing: -.03em; }
      .brand-mark { width: 38px; height: 38px; border-radius: 14px; display: grid; place-items: center; color: #fff; background: linear-gradient(135deg, var(--navy), var(--accent)); box-shadow: 0 16px 35px rgba(37, 99, 235, .25); }
      .brand span:last-child { display: grid; line-height: 1.05; }
      .brand small { color: var(--muted); font-size: .72rem; font-weight: 600; letter-spacing: .02em; }
      .nav-links { display: flex; align-items: center; gap: .35rem; padding: .32rem; border: 1px solid var(--line); border-radius: 999px; background: rgba(255,255,255,.55); }
      .nav-link { display: inline-flex; align-items: center; justify-content: center; border: 0; background: transparent; border-radius: 999px; padding: .62rem .95rem; color: var(--muted); font-size: .86rem; font-weight: 700; transition: .2s ease; }
      .nav-link:hover, .nav-link.active { color: var(--ink); background: #fff; box-shadow: 0 8px 24px rgba(15, 23, 42, .08); }
      .nav-cta { display: inline-flex; align-items: center; gap: .5rem; padding: .78rem 1rem; border-radius: 999px; border: 1px solid var(--navy); background: var(--navy); color: #fff; text-decoration: none; font-weight: 800; font-size: .9rem; }
      .menu-toggle { display: none; border: 1px solid var(--line); background: #fff; border-radius: 14px; width: 44px; height: 44px; color: var(--ink); }
      .mobile-menu { display: none; }

      .hero { padding: clamp(4.75rem, 9vw, 7.5rem) 0 clamp(3.5rem, 7vw, 5.5rem); }
      .hero-grid { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(340px, .9fr); gap: clamp(2rem, 5vw, 5rem); align-items: center; }
      .hero-grid > * { min-width: 0; }
      .availability { display: inline-flex; align-items: center; flex-wrap: wrap; gap: .65rem; padding: .48rem .82rem; border: 1px solid rgba(15,118,110,.18); border-radius: 999px; background: rgba(15,118,110,.08); color: var(--teal); font-size: .82rem; font-weight: 800; animation: riseIn .65s ease .18s both; }
      .availability::before { content: ''; width: .55rem; height: .55rem; border-radius: 999px; background: var(--teal); box-shadow: 0 0 0 6px rgba(15,118,110,.12); }
      .hero-title { max-width: 780px; margin: 1.25rem 0 1.25rem; font-size: clamp(3.1rem, 8vw, 7.25rem); line-height: .88; letter-spacing: -.082em; color: var(--ink); animation: riseIn .72s ease .28s both; }
      .hero-title .accent { color: var(--accent); }
      .hero-lede { max-width: 700px; margin: 0; color: var(--ink-soft); font-size: clamp(1.05rem, 2.2vw, 1.32rem); line-height: 1.72; animation: riseIn .72s ease .38s both; }
      .hero-actions { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 2rem; animation: riseIn .72s ease .5s both; }
      .btn { display: inline-flex; align-items: center; justify-content: center; gap: .6rem; min-height: 48px; padding: .86rem 1.15rem; border-radius: 16px; text-decoration: none; border: 1px solid var(--line); font-weight: 850; transition: transform .2s ease, box-shadow .2s ease, background .2s ease; }
      .btn:not(:disabled):hover { transform: translateY(-2px); }
      .btn:disabled { opacity: .68; box-shadow: none; }
      .btn-primary { background: var(--navy); color: #fff; border-color: var(--navy); box-shadow: 0 18px 35px rgba(15, 23, 42, .22); }
      .btn-primary:hover { box-shadow: 0 24px 50px rgba(15, 23, 42, .28); }
      .btn-secondary { background: rgba(255,255,255,.7); color: var(--ink); }
      .hero-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .75rem; margin-top: 2rem; max-width: 620px; }
      .stat-card { padding: 1rem; border: 1px solid var(--line); border-radius: 22px; background: rgba(255,255,255,.62); transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease; }
      .stat-card strong { display: block; font-size: 1.6rem; letter-spacing: -.06em; color: var(--ink); }
      .stat-card span { display: block; margin-top: .25rem; color: var(--muted); font-size: .82rem; font-weight: 700; }

      .profile-panel { position: relative; display: grid; gap: 1rem; border-radius: 34px; padding: 1rem; background: linear-gradient(145deg, rgba(255,255,255,.85), rgba(255,255,255,.42)); border: 1px solid rgba(255,255,255,.76); box-shadow: var(--shadow); animation: softScaleIn .82s cubic-bezier(.16,1,.3,1) .35s both; }
      .profile-card { overflow: hidden; border-radius: 28px; background: var(--navy); color: #fff; }
      .profile-top { padding: 1.05rem; min-height: 360px; display: flex; flex-direction: column; justify-content: space-between; gap: 1rem; background:
          radial-gradient(circle at 0% 0%, rgba(37,99,235,.55), transparent 17rem),
          radial-gradient(circle at 100% 25%, rgba(15,118,110,.45), transparent 15rem),
          linear-gradient(160deg, #0F172A, #111827 70%); }
      .profile-photo-wrap { position: relative; min-height: 218px; overflow: hidden; border-radius: 24px; border: 1px solid rgba(255,255,255,.18); background: rgba(255,255,255,.08); }
      .profile-photo { width: 100%; height: 100%; min-height: 218px; object-fit: cover; object-position: center; filter: saturate(1.02) contrast(1.02); }
      .profile-badge-row { position: absolute; left: .8rem; right: .8rem; bottom: .8rem; display: flex; flex-wrap: wrap; gap: .42rem; }
      .profile-badge { padding: .34rem .55rem; border: 1px solid rgba(255,255,255,.18); border-radius: 999px; background: rgba(15,23,42,.5); backdrop-filter: blur(12px); color: rgba(255,255,255,.86); font-size: .68rem; font-weight: 850; letter-spacing: .05em; text-transform: uppercase; }
      .profile-role { margin: 0; color: rgba(255,255,255,.64); font-size: .82rem; font-weight: 800; letter-spacing: .09em; text-transform: uppercase; }
      .profile-card h2 { margin: .45rem 0 0; font-size: 2.35rem; line-height: .96; letter-spacing: -.06em; }
      .profile-bottom { display: grid; gap: .85rem; padding: 1.35rem; background: rgba(255,255,255,.04); border-top: 1px solid rgba(255,255,255,.1); }
      .focus-item { display: flex; justify-content: space-between; gap: 1rem; color: rgba(255,255,255,.72); font-size: .92rem; }
      .focus-item strong { color: #fff; text-align: right; }

      .terminal-shell { overflow: hidden; border: 1px solid rgba(148,163,184,.2); border-radius: 24px; background: linear-gradient(180deg, #0B1120, #0F172A); box-shadow: 0 28px 70px rgba(15,23,42,.24); color: #D1D5DB; }
      .terminal-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .78rem .95rem; border-bottom: 1px solid rgba(148,163,184,.16); background: rgba(255,255,255,.04); }
      .terminal-controls { display: inline-flex; gap: .42rem; }
      .terminal-dot { width: .7rem; height: .7rem; border-radius: 999px; background: #EF4444; }
      .terminal-dot:nth-child(2) { background: #F59E0B; }
      .terminal-dot:nth-child(3) { background: #22C55E; }
      .terminal-titlebar { color: rgba(226,232,240,.7); font-size: .74rem; font-weight: 800; letter-spacing: .02em; }
      .terminal-body { min-height: 260px; padding: 1rem; font-family: 'JetBrains Mono', 'SFMono-Regular', Consolas, ui-monospace, monospace; font-size: .78rem; line-height: 1.7; }
      .terminal-group + .terminal-group { margin-top: .74rem; }
      .terminal-line { display: flex; min-width: 0; align-items: baseline; gap: .45rem; white-space: nowrap; overflow: hidden; }
      .terminal-prompt { flex: 0 0 auto; color: #7DD3FC; font-weight: 800; }
      .terminal-command { display: inline-block; overflow: hidden; width: 0; max-width: 100%; border-right: 2px solid rgba(125,211,252,.9); color: #F8FAFC; vertical-align: bottom; animation: terminalTyping .95s steps(var(--characters), end) forwards, terminalCaret .85s step-end infinite; animation-delay: var(--delay), var(--delay); }
      .terminal-output { margin-left: 1.2rem; color: rgba(203,213,225,.78); opacity: 0; transform: translateY(4px); animation: terminalReveal .35s ease forwards; animation-delay: var(--output-delay); }
      .terminal-output::before { content: '↳'; margin-right: .5rem; color: #34D399; }
      @keyframes terminalTyping { from { width: 0; } to { width: var(--command-width); } }
      @keyframes terminalReveal { to { opacity: 1; transform: translateY(0); } }
      @keyframes terminalCaret { 50% { border-color: transparent; } }

      .about-grid { display: grid; grid-template-columns: .9fr 1.1fr; gap: 1rem; }
      .about-card, .info-card, .project-card, .skill-card, .cert-card, .experience-card, .contact-panel { border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); box-shadow: 0 18px 60px rgba(15, 23, 42, .06); }
      .about-card, .info-card, .project-card, .skill-card, .cert-card, .experience-card { position: relative; overflow: hidden; transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease, background .28s ease; }
      .about-card { padding: clamp(1.4rem, 3vw, 2rem); }
      .about-card h3 { margin: 0 0 1rem; font-size: clamp(1.4rem, 3vw, 2.05rem); line-height: 1.08; letter-spacing: -.045em; }
      .about-card p { margin: 0 0 1rem; color: var(--ink-soft); line-height: 1.78; }
      .org-highlight { margin-top: 1.25rem; padding: 1rem; border: 1px solid rgba(37,99,235,.18); border-radius: 22px; background: rgba(37,99,235,.07); }
      .org-highlight span { display: block; color: var(--accent); font-size: .76rem; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
      .org-highlight strong { display: block; margin-top: .55rem; color: var(--ink); font-size: 1.03rem; line-height: 1.45; }
      .info-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
      .info-card { padding: 1.25rem; }
      .info-card span { color: var(--muted); font-weight: 800; font-size: .78rem; text-transform: uppercase; letter-spacing: .08em; }
      .info-card strong { display: block; margin-top: .65rem; color: var(--ink); font-size: 1.08rem; line-height: 1.35; }

      .experience-grid { display: grid; grid-template-columns: minmax(0, .86fr) minmax(0, 1.14fr); gap: 1rem; align-items: start; }
      .experience-card { padding: clamp(1.25rem, 2.4vw, 1.65rem); }
      .experience-card::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 4px; background: var(--experience-accent, var(--accent)); }
      .experience-top { display: flex; justify-content: space-between; gap: 1rem; align-items: flex-start; margin-bottom: 1rem; }
      .experience-meta { display: grid; gap: .25rem; color: var(--muted); font-size: .78rem; font-weight: 850; letter-spacing: .08em; text-transform: uppercase; }
      .experience-period { flex: 0 0 auto; padding: .42rem .65rem; border-radius: 999px; background: rgba(15,23,42,.06); color: var(--ink-soft); font-size: .76rem; font-weight: 900; }
      .experience-card h3 { margin: 0 0 .45rem; color: var(--ink); font-size: clamp(1.35rem, 2.8vw, 2rem); line-height: 1.06; letter-spacing: -.05em; }
      .experience-role { margin: 0 0 1rem; color: var(--ink-soft); font-weight: 850; line-height: 1.55; }
      .experience-summary { margin: 0 0 1.1rem; color: var(--muted); line-height: 1.72; }
      .experience-list { display: grid; gap: .7rem; padding: 0; margin: 0; list-style: none; }
      .experience-list li { display: flex; gap: .65rem; color: var(--ink-soft); line-height: 1.58; font-size: .94rem; }
      .experience-list li::before { content: '•'; color: var(--experience-accent, var(--accent)); font-weight: 950; }
      .achievement-block { margin-top: 1.15rem; padding-top: 1rem; border-top: 1px solid var(--line); }
      .achievement-block h4 { margin: 0 0 .75rem; color: var(--ink); font-size: .88rem; letter-spacing: .08em; text-transform: uppercase; }
      .experience-tags { display: flex; flex-wrap: wrap; gap: .45rem; margin-top: 1.15rem; }
      .experience-tags span { padding: .38rem .58rem; border-radius: 999px; background: color-mix(in srgb, var(--experience-accent, var(--accent)) 10%, white); color: var(--ink-soft); font-size: .76rem; font-weight: 850; }

      .project-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
      .project-card { position: relative; display: flex; flex-direction: column; min-height: 100%; padding: clamp(1.2rem, 2.5vw, 1.6rem); overflow: hidden; }
      .project-card.featured { grid-column: span 1; min-height: 440px; background: linear-gradient(160deg, #0F172A, #172033); color: #fff; border-color: rgba(255,255,255,.12); }
      .project-card::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 4px; background: var(--card-accent, var(--accent)); opacity: .88; }
      .project-meta { display: flex; justify-content: space-between; gap: 1rem; align-items: center; color: var(--muted); font-size: .8rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
      .featured .project-meta { color: rgba(255,255,255,.6); }
      .project-card h3 { margin: 1.2rem 0 .7rem; font-size: clamp(1.35rem, 3vw, 2.15rem); line-height: 1.05; letter-spacing: -.05em; }
      .project-card p { margin: 0; color: var(--ink-soft); line-height: 1.72; }
      .featured p { color: rgba(255,255,255,.72); }
      .tag-row { display: flex; flex-wrap: wrap; gap: .45rem; margin: 1.15rem 0; }
      .tag { padding: .42rem .62rem; border-radius: 999px; background: rgba(15,23,42,.05); color: var(--ink-soft); font-size: .78rem; font-weight: 800; }
      .featured .tag { background: rgba(255,255,255,.09); color: rgba(255,255,255,.78); }
      .impact-list { display: grid; gap: .65rem; padding: 0; margin: 0 0 1.4rem; list-style: none; }
      .impact-list li { display: flex; gap: .65rem; color: var(--ink-soft); line-height: 1.55; font-size: .92rem; }
      .featured .impact-list li { color: rgba(255,255,255,.72); }
      .impact-list li::before { content: '→'; color: var(--card-accent, var(--accent)); font-weight: 900; }
      .project-link { margin-top: auto; display: inline-flex; align-items: center; width: fit-content; gap: .4rem; color: var(--card-accent, var(--accent)); font-weight: 900; text-decoration: none; transition: transform .22s ease; }

      .skills-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; }
      .skill-card { padding: 1.25rem; }
      .skill-card h3 { margin: 0 0 1rem; font-size: 1rem; letter-spacing: -.02em; }
      .skill-list { display: grid; gap: .85rem; }
      .skill-head { display: flex; justify-content: space-between; gap: 1rem; margin-bottom: .36rem; color: var(--ink-soft); font-size: .82rem; font-weight: 800; }
      .skill-bar { height: 7px; overflow: hidden; border-radius: 999px; background: rgba(15,23,42,.08); }
      .skill-bar span { display: block; height: 100%; border-radius: inherit; background: var(--skill-accent, var(--accent)); }
      .cert-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: .75rem; }
      .cert-card { padding: 1rem; min-height: 118px; display: flex; flex-direction: column; justify-content: space-between; }
      .cert-card::before { content: ''; width: 32px; height: 4px; border-radius: 99px; background: var(--cert-accent, var(--accent)); }
      .cert-card strong { display: block; margin-top: 1rem; font-size: .95rem; line-height: 1.3; }
      .cert-card span { color: var(--muted); font-size: .78rem; font-weight: 700; }

      @media (hover: hover) and (pointer: fine) {
        .role-card:hover, .stat-card:hover, .about-card:hover, .info-card:hover, .project-card:hover, .skill-card:hover, .cert-card:hover, .experience-card:hover { transform: translateY(-6px); border-color: rgba(37,99,235,.22); box-shadow: 0 28px 75px rgba(15, 23, 42, .12); }
        .role-card:hover::after { opacity: 1; transform: translate(0, 0); }
        .project-card:hover .project-link { transform: translateX(4px); }
      }

      .contact-grid { display: grid; grid-template-columns: .9fr 1.1fr; gap: 1rem; align-items: start; }
      .contact-panel { padding: clamp(1.25rem, 3vw, 1.8rem); }
      .contact-list { display: grid; gap: .75rem; margin-top: 1.4rem; }
      .contact-row { display: flex; justify-content: space-between; gap: 1rem; padding: .95rem 0; border-bottom: 1px solid var(--line); color: var(--ink-soft); }
      .contact-row span:first-child { color: var(--muted); font-weight: 800; }
      .contact-row a { font-weight: 850; text-decoration: none; color: var(--ink); word-break: break-word; text-align: right; }
      .contact-form { display: grid; gap: .95rem; }
      .field { display: grid; gap: .45rem; }
      .field label { color: var(--muted); font-size: .78rem; font-weight: 850; text-transform: uppercase; letter-spacing: .08em; }
      .field input, .field textarea { width: 100%; border: 1px solid var(--line); border-radius: 18px; background: rgba(255,255,255,.82); color: var(--ink); outline: none; padding: .96rem 1rem; resize: vertical; transition: border-color .2s ease, box-shadow .2s ease; }
      .field input:focus, .field textarea:focus { border-color: rgba(37,99,235,.45); box-shadow: 0 0 0 4px rgba(37,99,235,.1); }
      .form-note { min-height: 1.2rem; color: var(--rose); font-size: .88rem; font-weight: 750; }
      .success-box { border: 1px solid rgba(15,118,110,.18); border-radius: 20px; padding: 1rem; background: rgba(15,118,110,.08); color: var(--teal); font-weight: 850; }
      /* ── Terminal Band ── */
      .terminal-band {
        background: linear-gradient(180deg, #080E1C 0%, #0B1425 50%, #0A1020 100%);
        padding: clamp(3.5rem, 6vw, 5.5rem) 0;
        border-top: 1px solid rgba(255,255,255,.05);
        border-bottom: 1px solid rgba(255,255,255,.05);
        position: relative; overflow: hidden;
      }
      .terminal-band::before {
        content: '';
        position: absolute; inset: 0;
        background: radial-gradient(ellipse at 20% 50%, rgba(37,99,235,.12), transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(15,118,110,.10), transparent 55%);
        pointer-events: none;
      }
      .terminal-band-inner { position: relative; display: grid; grid-template-columns: 220px 1fr; gap: clamp(2rem, 4vw, 4rem); align-items: start; }
      .terminal-band-meta { padding-top: .5rem; }
      .terminal-band-label { display: inline-block; font-family: 'JetBrains Mono','SFMono-Regular',Consolas,monospace; font-size: .72rem; font-weight: 700; color: #34D399; letter-spacing: .1em; margin-bottom: 1rem; }
      .terminal-band-desc { margin: 0 0 1.5rem; color: rgba(203,213,225,.6); font-size: .88rem; line-height: 1.72; }
      .terminal-band-tags { display: flex; flex-wrap: wrap; gap: .42rem; }
      .terminal-band-tags span { padding: .28rem .62rem; border-radius: 999px; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.05); color: rgba(203,213,225,.75); font-size: .72rem; font-weight: 700; font-family: 'JetBrains Mono',monospace; letter-spacing: .04em; }

      /* ── Profile Socials ── */
      .profile-socials { display: grid; gap: .3rem; padding: .75rem; background: rgba(255,255,255,.06); border-radius: 20px; border: 1px solid rgba(255,255,255,.1); }
      .profile-social-link { display: flex; justify-content: space-between; align-items: center; padding: .55rem .8rem; border-radius: 12px; text-decoration: none; color: rgba(255,255,255,.7); font-size: .82rem; font-weight: 700; transition: background .18s ease, color .18s ease; }
      .profile-social-link:hover { background: rgba(255,255,255,.08); color: #fff; }
      .profile-social-arrow { color: rgba(255,255,255,.3); font-size: .76rem; transition: transform .18s ease, color .18s ease; }
      .profile-social-link:hover .profile-social-arrow { transform: translate(2px,-2px); color: rgba(255,255,255,.65); }

      .footer { padding: 2rem 0; color: var(--muted); border-top: 1px solid var(--line); }
      .footer-inner { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
      .footer a { text-decoration: none; font-weight: 850; color: var(--ink); }

      @media (max-width: 1020px) {
        .hero-grid, .about-grid, .experience-grid, .contact-grid { grid-template-columns: 1fr; }
        .profile-panel { width: 100%; max-width: 640px; margin: 0 auto; }
        .skills-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .cert-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      @media (max-width: 960px) {
        .container { width: min(100% - 28px, var(--container)); }
        .nav-links, .nav-cta { display: none; }
        .menu-toggle { display: inline-grid; place-items: center; }
        .mobile-menu { display: grid; gap: .45rem; padding: 0 0 1rem; }
        .mobile-menu .nav-link { width: 100%; justify-content: flex-start; border: 1px solid var(--line); background: rgba(255,255,255,.68); }
        .section-header { grid-template-columns: 1fr; }
        .project-grid { grid-template-columns: 1fr; }
        .project-card.featured { min-height: auto; }
        .hero-stats { grid-template-columns: 1fr; }
        .role-grid { grid-template-columns: 1fr; }
        .info-grid { grid-template-columns: 1fr; }
      }
      @media (max-width: 560px) {
        .container { width: min(100% - 24px, var(--container)); }
        .section { padding: 3.5rem 0; }
        .section-header { gap: 1rem; margin-bottom: 1.35rem; }
        .section-title { font-size: clamp(2rem, 13vw, 3rem); letter-spacing: -.06em; }
        .hero { padding-top: 3.45rem; }
        .availability { border-radius: 18px; font-size: .75rem; line-height: 1.45; }
        .hero-title { font-size: clamp(2.75rem, 16vw, 4.45rem); letter-spacing: -.075em; }
        .hero-lede { font-size: 1rem; line-height: 1.68; }
        .role-card { min-height: auto; border-radius: 20px; }
        .hero-actions { flex-direction: column; }
        .btn { width: 100%; }
        .profile-panel { padding: .72rem; border-radius: 28px; }
        .profile-card { border-radius: 22px; }
        .profile-top { min-height: auto; padding: .85rem; }
        .profile-photo-wrap { min-height: 220px; border-radius: 18px; }
        .profile-card h2 { font-size: 2rem; }
        .skills-grid, .cert-grid { grid-template-columns: 1fr; }
        .experience-top, .project-meta, .contact-row { flex-direction: column; align-items: flex-start; }
        .experience-period { width: fit-content; }
        .experience-card, .about-card, .info-card, .project-card, .skill-card, .cert-card, .contact-panel { border-radius: 22px; }
        .experience-list li, .impact-list li { font-size: .9rem; }
        .contact-row a { text-align: left; }
        .terminal-body { min-height: auto; font-size: .7rem; padding: .85rem; }
        .terminal-line { display: block; white-space: normal; }
        .terminal-command { margin-left: .35rem; }
        .terminal-output { margin-left: 0; }
        .focus-item { flex-direction: column; }
        .focus-item strong { text-align: left; }
      }
      @media (prefers-reduced-motion: reduce) {
        .opening-screen { display: none; }
        [data-reveal] { opacity: 1; transform: none; transition: none; }
        .site-nav, .section-header, .availability, .hero-title, .hero-lede, .hero-actions, .role-card, .stat-card, .profile-panel, .about-card, .info-card, .experience-card { animation: none; }
        .role-card, .stat-card, .about-card, .info-card, .project-card, .skill-card, .cert-card, .experience-card, .btn { transition: none; }
        .terminal-command { width: auto; border-right: 0; animation: none; }
        .terminal-output { opacity: 1; transform: none; animation: none; }
      }
    `}</style>
  );
}

function OpeningSequence() {
  return (
    <div className="opening-screen" aria-hidden="true">
      <div className="opening-card">
        <div className="opening-mark">AP</div>
        <h2>Initializing secure portfolio.</h2>
        <p>
          Loading SysAdmin, DevOps, Network Security, and Industrial Electronics
          experience.
        </p>
        <div className="opening-progress" />
      </div>
    </div>
  );
}

function Navbar({ active }) {
  const [open, setOpen] = useState(false);

  const handleNav = (id) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="site-nav">
      <div className="container nav-inner">
        <button
          className="brand"
          onClick={() => handleNav("home")}
          aria-label="Go to home"
        >
          <span className="brand-mark">P</span>
          <span>
            parothegreat
            <small>systems · security · infra</small>
          </span>
        </button>

        <nav className="nav-links" aria-label="Primary navigation">
          {NAV_ITEMS.map(([label, id]) => (
            <button
              key={id}
              className={`nav-link ${active === id ? "active" : ""}`}
              onClick={() => handleNav(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <a className="nav-cta" href="mailto:alvaroprayogo38@gmail.com">
          Let&apos;s talk
        </a>

        <button
          className="menu-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-label="Menu"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div className="container mobile-menu">
          {NAV_ITEMS.map(([label, id]) => (
            <button key={id} className="nav-link" onClick={() => handleNav(id)}>
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function AceternityTerminal({
  username = "alvaro",
  commands = TERMINAL_SESSIONS,
}) {
  return (
    <div className="terminal-shell" aria-label="Terminal preview">
      <div className="terminal-header">
        <span className="terminal-controls" aria-hidden="true">
          <span className="terminal-dot" />
          <span className="terminal-dot" />
          <span className="terminal-dot" />
        </span>
        <span className="terminal-titlebar">{username}@portfolio — bash</span>
      </div>

      <div className="terminal-body">
        {commands.map((item, index) => {
          const commandDelay = index * 2.2;
          const outputDelay = commandDelay + 1.05;

          return (
            <div className="terminal-group" key={item.command}>
              <div className="terminal-line">
                <span className="terminal-prompt">{username}@portfolio:~$</span>
                <span
                  className="terminal-command"
                  style={{
                    "--characters": item.command.length,
                    "--command-width": `${item.command.length}ch`,
                    "--delay": `${commandDelay}s`,
                  }}
                >
                  {item.command}
                </span>
              </div>

              {item.outputs.map((output, outputIndex) => (
                <div
                  className="terminal-output"
                  key={output}
                  style={{
                    "--output-delay": `${outputDelay + outputIndex * 0.22}s`,
                  }}
                >
                  {output}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TerminalBand() {
  return (
    <div className="terminal-band" data-reveal>
      <div className="container">
        <div className="terminal-band-inner">
          <div className="terminal-band-meta">
            <span className="terminal-band-label">// live session</span>
            <p className="terminal-band-desc">
              A snapshot of the stack I work with — operations, recon, and
              infrastructure.
            </p>
            <div className="terminal-band-tags">
              {["Linux", "Go", "Docker", "Nmap", "Git"].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <AceternityTerminal />
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero section">
      <div className="container hero-grid">
        <div>
          <div className="availability">
            SysAdmin · DevOps · PenTest · Industrial Electronics
          </div>
          <h1 className="hero-title">
            Operating secure systems from{" "}
            <span className="accent">hardware</span> to cloud.
          </h1>
          <p className="hero-lede">
            Hi, I&apos;m Moehammad Alvaro Pirata Prayogo — an Industrial
            Electronics Engineering student, Linux-focused SysAdmin, DevOps
            learner, and penetration testing enthusiast from Bekasi, Indonesia.
            I like building practical systems that are reliable, documented, and
            defensible.
          </p>

          <div className="role-grid" aria-label="Core role focus">
            {ROLE_CARDS.map((role, index) => (
              <article
                className="role-card"
                data-reveal
                key={role.title}
                style={{
                  "--role-accent": ACCENTS[role.accent],
                  "--reveal-delay": `${index * 0.05}s`,
                }}
              >
                <span>{role.kicker}</span>
                <strong>{role.title}</strong>
                <p>{role.description}</p>
              </article>
            ))}
          </div>

          <div className="hero-actions">
            <button
              className="btn btn-primary"
              onClick={() => scrollToSection("experience")}
            >
              View experience →
            </button>
            <a
              className="btn btn-secondary"
              href={SOCIAL_LINKS.LinkedIn}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn profile
            </a>
          </div>

          <div className="hero-stats" aria-label="Portfolio highlights">
            <div className="stat-card" data-reveal>
              <strong>5+</strong>
              <span>projects shipped</span>
            </div>
            <div
              className="stat-card"
              data-reveal
              style={{ "--reveal-delay": ".06s" }}
            >
              <strong>10</strong>
              <span>certifications</span>
            </div>
            <div
              className="stat-card"
              data-reveal
              style={{ "--reveal-delay": ".12s" }}
            >
              <strong>4</strong>
              <span>focused tracks</span>
            </div>
          </div>
        </div>

        <aside className="profile-panel" aria-label="Profile summary">
          <div className="profile-card">
            <div className="profile-top">
              <div className="profile-photo-wrap">
                <img
                  className="profile-photo"
                  src={PROFILE_IMAGE}
                  alt="Moehammad Alvaro Pirata Prayogo"
                />
                <div className="profile-badge-row" aria-label="Profile roles">
                  <span className="profile-badge">SysAdmin</span>
                  <span className="profile-badge">DevOps</span>
                  <span className="profile-badge">PenTest</span>
                </div>
              </div>
              <div>
                <p className="profile-role">
                  Industrial Electronics Engineering Student
                </p>
                <h2>Alvaro Prayogo</h2>
              </div>
            </div>
            <div className="profile-bottom">
              <div className="focus-item">
                <span>Location</span>
                <strong>Bekasi / Cikarang, ID</strong>
              </div>
              <div className="focus-item">
                <span>Stack</span>
                <strong>Linux, Go, Docker, Nginx</strong>
              </div>
              <div className="focus-item">
                <span>Security</span>
                <strong>Recon, hardening, bug bounty</strong>
              </div>
              <div className="focus-item">
                <span>Status</span>
                <strong>Open to opportunities</strong>
              </div>
              <div className="focus-item">
                <span>Online</span>
                <strong>@parothegreat</strong>
              </div>
            </div>
          </div>

          <div className="profile-socials">
            {Object.entries(SOCIAL_LINKS).map(([label, url]) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="profile-social-link"
              >
                <span>{label}</span>
                <span className="profile-social-arrow">↗</span>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="eyebrow">About</p>
            <h2 className="section-title">
              A portfolio built around operations, electronics, and security.
            </h2>
          </div>
          <p className="section-copy">
            I work across Linux administration, DevOps workflows, industrial
            electronics, and penetration testing because real systems rarely fit
            inside one box: hardware, networks, deployments, and security all
            meet in production.
          </p>
        </div>

        <div className="about-grid">
          <article className="about-card" data-reveal>
            <h3>
              Curiosity turned into labs, hardware projects, and deployed
              systems.
            </h3>
            <p>
              I got into systems by asking how things work at every layer — from
              sensors and RFID hardware to Linux services, network paths, and
              web applications. That habit turned into labs, automation notes,
              Go utilities, and school-deployed applications.
            </p>
            <p>
              Right now I&apos;m studying Industrial Electronics Engineering,
              improving my SysAdmin and DevOps workflow, and practicing
              penetration testing with a focus on useful reports and
              remediation.
            </p>
            <div className="org-highlight">
              <span>Organization orientation</span>
              <strong>
                Saya bagian dari organisasi IT Mitra Industri Vocational High
                School, dengan jobdesc sebagai System Administrator, Network
                Engineer, Backend Developer, Network Security Engineer, dan
                DevOps.
              </strong>
            </div>
          </article>

          <div className="info-grid">
            {[
              [
                "Current focus",
                "Linux hardening, CI/CD basics, electronics labs, Go-based security tooling",
              ],
              [
                "Preferred work",
                "SysAdmin, DevOps Engineer, Junior Penetration Tester, Infrastructure Engineer",
              ],
              [
                "Project style",
                "Practical, documented, measurable, deployable, and intentionally simple",
              ],
              [
                "Community",
                "teamitmivhs · SpacedCode · electronics, infra, and security tooling",
              ],
            ].map(([label, value], index) => (
              <div
                className="info-card"
                data-reveal
                key={label}
                style={{ "--reveal-delay": `${index * 0.05}s` }}
              >
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="eyebrow">Experience</p>
            <h2 className="section-title">
              Operational experience across school IT and manufacturing.
            </h2>
          </div>
          <p className="section-copy">
            This section highlights hands-on IT work: user support, system
            maintenance, internal tools, network troubleshooting, security
            basics, and operational documentation.
          </p>
        </div>

        <div className="experience-grid">
          {EXPERIENCES.map((experience) => (
            <ExperienceCard
              key={experience.organization}
              experience={experience}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ experience }) {
  const accent = ACCENTS[experience.accent] ?? ACCENTS.blue;

  return (
    <article
      className="experience-card"
      data-reveal
      style={{ "--experience-accent": accent }}
    >
      <div className="experience-top">
        <div className="experience-meta">
          <span>{experience.organization}</span>
          <span>{experience.location}</span>
        </div>
        <span className="experience-period">{experience.period}</span>
      </div>

      <h3>{experience.organization}</h3>
      <p className="experience-role">{experience.role}</p>
      <p className="experience-summary">{experience.summary}</p>

      <ul className="experience-list">
        {experience.responsibilities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {experience.achievements?.length ? (
        <div className="achievement-block">
          <h4>Pencapaian & pengalaman</h4>
          <ul className="experience-list">
            {experience.achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="experience-tags">
        {experience.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}

function Work() {
  const featured = PROJECTS.filter((project) => project.featured);
  const regular = PROJECTS.filter((project) => !project.featured);

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="section-title">
              Projects with operational context.
            </h2>
          </div>
          <p className="section-copy">
            A mix of deployed institutional tools, infrastructure utilities, and
            security-focused Go projects — presented as case studies instead of
            random repository cards.
          </p>
        </div>

        <div className="project-grid">
          {[...featured, ...regular].map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const accent = ACCENTS[project.accent] ?? ACCENTS.blue;

  return (
    <article
      className={`project-card ${project.featured ? "featured" : ""}`}
      data-reveal
      style={{ "--card-accent": accent }}
    >
      <div className="project-meta">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>

      <div className="tag-row">
        {project.stack.map((item) => (
          <span className="tag" key={item}>
            {item}
          </span>
        ))}
      </div>

      <ul className="impact-list">
        {project.impact.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <a
        className="project-link"
        href={project.repo}
        target="_blank"
        rel="noreferrer"
      >
        Open repository →
      </a>
    </article>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="eyebrow">Skills</p>
            <h2 className="section-title">
              Tools I use to operate, automate, and test systems.
            </h2>
          </div>
          <p className="section-copy">
            The stack leans practical: Linux operations, deployment automation,
            penetration testing, and electronics fundamentals that help bridge
            physical systems with software.
          </p>
        </div>

        <div className="skills-grid">
          {SKILLS.map((group) => {
            const accent = ACCENTS[group.accent] ?? ACCENTS.blue;
            return (
              <article
                className="skill-card"
                data-reveal
                key={group.category}
                style={{ "--skill-accent": accent }}
              >
                <h3>{group.category}</h3>
                <div className="skill-list">
                  {group.items.map(([name, level]) => (
                    <div key={name}>
                      <div className="skill-head">
                        <span>{name}</span>
                        <span>{level}%</span>
                      </div>
                      <div className="skill-bar">
                        <span style={{ width: `${level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="section" aria-labelledby="certifications-title">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="eyebrow">Certifications</p>
            <h2 id="certifications-title" className="section-title">
              Proof of continuous learning.
            </h2>
          </div>
          <p className="section-copy">
            Certifications from Cisco, NDG, EC-Council, and Google support the
            same direction: network fundamentals, Linux, cybersecurity, and
            cloud basics.
          </p>
        </div>

        <div className="cert-grid">
          {CERTS.map(([name, issuer, accent]) => (
            <article
              className="cert-card"
              data-reveal
              key={`${issuer}-${name}`}
              style={{ "--cert-accent": ACCENTS[accent] }}
            >
              <div>
                <strong>{name}</strong>
                <span>{issuer}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [sending, setSending] = useState(false);

  const updateForm = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "error", message: "Fill the form first, please." });
      return;
    }

    setSending(true);
    setStatus({ type: "idle", message: "" });

    try {
      await emailjs.send(
        "service_vmsghvn",
        "template_hsc6m9u",
        { from_name: form.name, from_email: form.email, message: form.message },
        "sruNPf6oBWFdmDHtA",
      );
      setStatus({
        type: "success",
        message: "Message sent. I will respond within 24 hours.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus({
        type: "error",
        message: "Failed to send. Please email me directly.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="section-title">
              Let&apos;s build something reliable.
            </h2>
          </div>
          <p className="section-copy">
            Open to junior SysAdmin, DevOps, infrastructure, SOC, and
            penetration testing opportunities — remote or hybrid.
          </p>
        </div>

        <div className="contact-grid">
          <aside className="contact-panel" data-reveal>
            <p className="section-copy">
              If you need someone who can learn fast, document clearly, and keep
              systems practical, reach out through email or LinkedIn.
            </p>

            <div className="contact-list">
              <div className="contact-row">
                <span>Email</span>
                <a href="mailto:alvaroprayogo38@gmail.com">
                  alvaroprayogo38@gmail.com
                </a>
              </div>
              <div className="contact-row">
                <span>Location</span>
                <a
                  href="https://maps.google.com/?q=Cikarang%20Selatan%2C%20West%20Java"
                  target="_blank"
                  rel="noreferrer"
                >
                  Cikarang Selatan, West Java
                </a>
              </div>
              <div className="contact-row">
                <span>GitHub</span>
                <a href={SOCIAL_LINKS.GitHub} target="_blank" rel="noreferrer">
                  github.com/parothegreat
                </a>
              </div>
              <div className="contact-row">
                <span>LinkedIn</span>
                <a
                  href={SOCIAL_LINKS.LinkedIn}
                  target="_blank"
                  rel="noreferrer"
                >
                  Moehammad Alvaro Pirata Prayogo
                </a>
              </div>
            </div>
          </aside>

          <form
            className="contact-panel contact-form"
            data-reveal
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                autoComplete="name"
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => updateForm("email", event.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="6"
                value={form.message}
                onChange={(event) => updateForm("message", event.target.value)}
              />
            </div>

            {status.type === "success" ? (
              <div className="success-box">{status.message}</div>
            ) : (
              <div className="form-note">{status.message}</div>
            )}

            <button
              className="btn btn-primary"
              type="submit"
              disabled={sending}
            >
              {sending ? "Sending..." : "Send message →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          © {new Date().getFullYear()} Moehammad Alvaro Pirata Prayogo
        </span>
        <span>
          Built with React + Vite ·{" "}
          <a href={SOCIAL_LINKS.GitHub}>@parothegreat</a>
        </span>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const active = useActiveSection();
  useRevealOnScroll();

  return (
    <div className="portfolio-app">
      <GlobalStyles />
      <OpeningSequence />
      <Navbar active={active} />
      <main>
        <Hero />
        <TerminalBand />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
