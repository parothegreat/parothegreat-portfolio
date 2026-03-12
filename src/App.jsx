import { useState, useEffect, useRef } from "react";

// ── Brand Tokens ──────────────────────────────────────────────
const C = {
  bgBase:    "#0A000F",
  bgCard:    "#131619",
  bgCard2:   "#1A1E22",
  border:    "#252A2F",
  textPri:   "#F0F4F8",
  textSec:   "#8A95A0",
  textMuted: "#5E6873",
  mint500:   "#00E5A0",
  mint400:   "#33EBB3",
  mint600:   "#00C488",
  lime:      "#C8F135",
  coral:     "#FF6B6B",
  amber:     "#FFB830",
  violet:    "#A788FA",
  blue:      "#00A3FF",
};

const PROJECTS = [
  {
    id: "01", title: "SentinelNet",
    category: "Network Security & Monitoring",
    desc: "Enterprise-grade IDS/IPS deployment across 3 data centers. Reduced threat detection time from 4h to 8min using Suricata rules + custom SIEM correlation logic.",
    tags: ["Suricata", "Splunk", "pfSense"], year: "2024", accent: C.coral,
  },
  {
    id: "02", title: "VaultOps",
    category: "Infrastructure Hardening",
    desc: "Zero-trust architecture rollout for 200-node corporate network. Implemented microsegmentation, PAM, and automated compliance scanning aligned to CIS Benchmarks.",
    tags: ["HashiCorp Vault", "Ansible", "CIS"], year: "2024", accent: C.mint500,
  },
  {
    id: "03", title: "PhantomNet Lab",
    category: "Penetration Testing",
    desc: "Full red team engagement simulating APT lateral movement. Identified 14 critical CVEs across Windows AD environment. Delivered remediation roadmap adopted by client.",
    tags: ["Metasploit", "BloodHound", "Cobalt Strike"], year: "2023", accent: C.violet,
  },
  {
    id: "04", title: "CoreFabric",
    category: "Network Engineering",
    desc: "Designed and deployed BGP/OSPF multi-site WAN for ISP with 40Gbps backbone. Automated provisioning via Netmiko/NAPALM, cutting config time by 70%.",
    tags: ["Cisco IOS-XE", "BGP", "NAPALM"], year: "2023", accent: C.blue,
  },
];

const SKILLS = [
  {
    category: "Network Eng.",
    items: ["Cisco / Juniper", "BGP / OSPF / EIGRP", "VLAN & VxLAN", "SD-WAN", "Wireshark"],
    accent: C.blue,
  },
  {
    category: "Cybersecurity",
    items: ["Penetration Testing", "SIEM / SOC", "Threat Hunting", "CVE Analysis", "Zero Trust"],
    accent: C.coral,
  },
  {
    category: "Sysadmin",
    items: ["Linux (RHEL/Debian)", "Windows Server", "Active Directory", "Ansible", "Bash / Python"],
    accent: C.mint500,
  },
  {
    category: "Cloud & Infra",
    items: ["AWS / Azure", "Terraform", "Docker / K8s", "Proxmox", "Zabbix / Nagios"],
    accent: C.violet,
  },
];

const SOCIAL_LINKS = {
  "GitHub":   "https://github.com/parothegreat/",
  "LinkedIn": "https://www.linkedin.com/in/moehammad-alvaro-pirata-prayogo-842a8834a/",
};

const CERTS = [
  {
    name: "Network Defense",
    full: "Cisco NetAcad — Network Defense",
    issuer: "Cisco Networking Academy",
    color: C.blue,
    url: "https://www.credly.com/badges/26767ad4-478f-47d2-bd76-c30903affef0/linked_in_profile",
  },
  {
    name: "Ethical Hacker",
    full: "Cisco NetAcad — Ethical Hacker",
    issuer: "Cisco Networking Academy",
    color: C.coral,
    url: "https://www.credly.com/badges/27912f5c-4b4f-4190-9684-9a3822bb6723/linked_in_profile",
  },
];

// ── Global Styles ─────────────────────────────────────────────
function GlobalStyles() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=JetBrains+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: ${C.bgBase}; color: ${C.textPri}; font-family: 'DM Sans', sans-serif; }
      ::selection { background: ${C.mint500}22; color: ${C.mint400}; }
      input, textarea { font-family: 'DM Sans', sans-serif; }
      input::placeholder, textarea::placeholder { color: ${C.textMuted}; }
      button { cursor: pointer; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
      @keyframes pulse-dot {
        0%,100% { opacity:1; box-shadow: 0 0 0 0 ${C.mint500}55; }
        50%      { opacity:.6; box-shadow: 0 0 0 6px ${C.mint500}00; }
      }
      @keyframes blink {
        0%,100% { opacity: 1; }
        50%      { opacity: 0; }
      }
      @keyframes scanline {
        0%   { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
      }

      .mono { font-family: 'JetBrains Mono', monospace; }

      .nav-link {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.72rem; font-weight: 400;
        letter-spacing: 0.06em; text-transform: uppercase;
        color: ${C.textMuted}; background: none; border: none;
        transition: color 0.25s; padding: 0;
      }
      .nav-link:hover { color: ${C.textPri}; }
      .nav-link.active { color: ${C.mint400}; }

      .project-row {
        display: grid;
        grid-template-columns: 52px 1fr 1fr auto;
        gap: 2rem; align-items: start;
        padding: 2.25rem 1.5rem;
        border-top: 1px solid ${C.border};
        transition: background 0.3s, border-radius 0.3s;
      }
      .project-row:last-child { border-bottom: 1px solid ${C.border}; }
      .project-row:hover { background: ${C.bgCard}; border-radius: 6px; }

      .skill-item {
        font-size: 0.82rem; font-weight: 300; color: ${C.textSec};
        padding: 0.6rem 0; border-bottom: 1px solid ${C.border};
        transition: color 0.2s, padding-left 0.2s;
        font-family: 'JetBrains Mono', monospace;
      }
      .skill-item:hover { color: ${C.textPri}; padding-left: 0.4rem; }

      .btn-primary {
        display: inline-flex; align-items: center; gap: 0.5rem;
        padding: 0.8rem 1.8rem;
        background: ${C.mint500}; color: ${C.bgBase};
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem; font-weight: 500;
        letter-spacing: 0.06em; text-transform: uppercase;
        border: none; border-radius: 4px;
        transition: all 0.25s ease;
      }
      .btn-primary:hover {
        background: ${C.mint400};
        transform: translateY(-2px);
        box-shadow: 0 8px 32px ${C.mint500}40;
      }

      .btn-ghost {
        display: inline-flex; align-items: center; gap: 0.5rem;
        padding: 0.8rem 1.8rem;
        background: transparent; color: ${C.textSec};
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem; font-weight: 400;
        letter-spacing: 0.06em; text-transform: uppercase;
        border: 1px solid ${C.border}; border-radius: 4px;
        transition: all 0.25s ease;
      }
      .btn-ghost:hover { border-color: ${C.mint500}66; color: ${C.mint400}; }

      .form-input {
        width: 100%; padding: 0.85rem 1rem;
        background: ${C.bgCard2}; border: 1px solid ${C.border};
        border-radius: 4px; color: ${C.textPri};
        font-size: 0.88rem; font-weight: 300; font-family: 'DM Sans', sans-serif;
        outline: none; transition: border-color 0.3s, box-shadow 0.3s;
      }
      .form-input:focus {
        border-color: ${C.mint500}88;
        box-shadow: 0 0 0 3px ${C.mint500}18;
      }

      .cert-card {
        padding: 1rem 1.25rem;
        background: ${C.bgCard}; border: 1px solid ${C.border};
        border-radius: 6px; transition: all 0.25s;
        cursor: default;
      }
      .cert-card:hover {
        border-color: var(--cert-color);
        box-shadow: 0 0 20px color-mix(in srgb, var(--cert-color) 15%, transparent);
        transform: translateY(-2px);
      }

      .tag-pill {
        display: inline-block; padding: 0.2rem 0.6rem;
        background: ${C.bgCard2}; border: 1px solid ${C.border};
        border-radius: 3px; font-size: 0.65rem; color: ${C.textMuted};
        font-family: 'JetBrains Mono', monospace; letter-spacing: 0.02em;
      }

      @media (max-width: 900px) {
        .project-row { grid-template-columns: 44px 1fr; }
        .proj-desc, .proj-meta { display: none; }
        .desktop-nav { display: none !important; }
        .mobile-toggle { display: flex !important; }
        .hero-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 2.5rem !important; }
        .hero-grid-main { grid-template-columns: 1fr !important; }
        .skills-inner { flex-direction: column !important; gap: 3rem !important; }
        .skills-grid { grid-template-columns: 1fr 1fr !important; }
        .contact-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
        .certs-grid { grid-template-columns: 1fr 1fr !important; }
        .stat-row { gap: 1.5rem !important; }
      }
      @media (max-width: 560px) {
        .skills-grid { grid-template-columns: 1fr !important; }
        .certs-grid { grid-template-columns: 1fr !important; }
        .section-pad { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
}

// ── Subtle scanline overlay ───────────────────────────────────
function Overlays() {
  return (
    <>
      {/* noise */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.022,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
      {/* subtle grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.025,
        backgroundImage: `linear-gradient(${C.mint500} 1px, transparent 1px), linear-gradient(90deg, ${C.mint500} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
    </>
  );
}

// ── Terminal-style typewriter ─────────────────────────────────
function TerminalLine({ text, delay = 0, color }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, 28);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);

  return (
    <div className="mono" style={{ fontSize: "0.78rem", color: color || C.textMuted, lineHeight: 2 }}>
      <span style={{ color: C.mint500, marginRight: "0.5rem" }}>$</span>
      {displayed}
      {!done && (
        <span style={{ animation: "blink 0.7s step-end infinite", color: C.mint400 }}>▌</span>
      )}
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = ["Home", "Work", "Skills", "Contact"];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (l) => {
    setMobileOpen(false);
    document.getElementById(l === "Work" ? "work" : l.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 3rem", height: "66px",
        background: scrolled ? `${C.bgBase}e0` : `rgba(10,0,15,0.35)`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? `1px solid ${C.border}` : `1px solid ${C.mint500}18`,
        transition: "all 0.4s ease",
      }}>
        {/* Logo */}
        <div className="mono" style={{ fontSize: "0.9rem", color: C.textPri, display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ color: C.mint500 }}>[</span>
          Alvaro Prayogo
          <span style={{ color: C.coral }}>~</span>
          <span style={{ color: C.mint500 }}>]</span>
          <span style={{ color: C.textMuted, fontSize: "0.7rem" }}>#</span>
        </div>

        <div className="desktop-nav" style={{ display: "flex", gap: "2.5rem" }}>
          {links.map(l => (
            <button key={l} className={`nav-link ${active === l ? "active" : ""}`} onClick={() => go(l)}>
              {active === l ? `> ${l}` : l}
            </button>
          ))}
        </div>

        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: C.mint500, display: "inline-block",
            animation: "pulse-dot 2.5s ease-in-out infinite",
          }} />
          <span className="mono" style={{ fontSize: "0.68rem", color: C.textMuted }}>
            available_for_hire
          </span>
        </div>

        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: "none", background: "none", border: "none", flexDirection: "column", gap: "6px" }}>
          {[0, 1].map(i => (
            <div key={i} style={{
              width: "22px", height: "1.5px", background: C.mint400, borderRadius: "2px",
              transition: "transform 0.3s",
              transform: mobileOpen
                ? i === 0 ? "rotate(45deg) translate(5px,5px)" : "rotate(-45deg) translate(5px,-5px)"
                : "none",
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 999, background: C.bgBase,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2.5rem",
        opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? "all" : "none",
        transition: "opacity 0.3s ease",
      }}>
        {links.map(l => (
          <button key={l} onClick={() => go(l)} style={{
            background: "none", border: "none",
            fontFamily: "'DM Serif Display', serif",
            fontSize: "2.8rem", color: C.textPri, fontWeight: 400,
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = C.mint400}
            onMouseLeave={e => e.target.style.color = C.textPri}
          >{l}</button>
        ))}
      </div>
    </>
  );
}

// ── Uptime Counter ────────────────────────────────────────────
const START_DATE = new Date("2024-09-16T00:00:00");

function getUptime() {
  const now = new Date();
  const diff = now - START_DATE;

  const totalSeconds = Math.floor(diff / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);
  const days = totalDays % 30;
  const totalMonths = Math.floor(totalDays / 30);
  const months = totalMonths % 12;
  const years = Math.floor(totalMonths / 12);

  return { years, months, days, hours, minutes, seconds, totalDays };
}

function UptimeCounter() {
  const [uptime, setUptime] = useState(getUptime());

  useEffect(() => {
    const iv = setInterval(() => setUptime(getUptime()), 1000);
    return () => clearInterval(iv);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  // Primary display: biggest unit that's non-zero
  const primaryValue = uptime.years > 0
    ? `${uptime.years}y ${uptime.months}m`
    : uptime.months > 0
    ? `${uptime.months}m ${uptime.days}d`
    : `${uptime.days}d`;

  return (
    <div style={{ textAlign: "right" }}>
      {/* Primary: years/months */}
      <div style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: "2rem", color: C.mint500, lineHeight: 1,
      }}>
        {primaryValue}
      </div>
      <div className="mono" style={{
        fontSize: "0.58rem", letterSpacing: "0.1em",
        textTransform: "uppercase", color: C.textMuted, marginTop: "0.25rem",
      }}>
        Uptime
      </div>
      {/* Live ticker: HH:MM:SS */}
      <div className="mono" style={{
        fontSize: "0.6rem", color: C.mint500, opacity: 0.5,
        marginTop: "0.3rem", letterSpacing: "0.05em",
      }}>
        {pad(uptime.hours)}:{pad(uptime.minutes)}:{pad(uptime.seconds)}
      </div>
    </div>
  );
}

// ── Dither WebGL Background ───────────────────────────────────
// Self-contained WebGL dither wave — matches react-bits Dither props API
// waveColor mapped to brand palette: mint500 tones on dark bgBase
function Dither({
  waveColor       = [0.0, 0.898, 0.627],   // mint500 #00E5A0 → [0,0.898,0.627]
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius     = 0.3,
  colorNum        = 4,
  pixelSize       = 2,
  waveAmplitude   = 0.3,
  waveFrequency   = 3,
  waveSpeed       = 0.05,
}) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ mouse: [0.5, 0.5], time: 0, raf: null, gl: null, prog: null, locs: {} });

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: true });
    if (!gl) return;
    const s = stateRef.current;
    s.gl = gl;

    const vert = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;
    const frag = `
      precision mediump float;
      uniform vec2  u_res;
      uniform float u_time;
      uniform vec2  u_mouse;
      uniform float u_mouseR;
      uniform vec3  u_waveColor;
      uniform float u_colorNum;
      uniform float u_pixelSize;
      uniform float u_amplitude;
      uniform float u_frequency;

      // 4x4 Bayer ordered dither matrix
      float bayer(vec2 p) {
        int x = int(mod(p.x, 4.0));
        int y = int(mod(p.y, 4.0));
        float mat[16];
        mat[0]=0.0;  mat[1]=8.0;  mat[2]=2.0;  mat[3]=10.0;
        mat[4]=12.0; mat[5]=4.0;  mat[6]=14.0; mat[7]=6.0;
        mat[8]=3.0;  mat[9]=11.0; mat[10]=1.0; mat[11]=9.0;
        mat[12]=15.0;mat[13]=7.0; mat[14]=13.0;mat[15]=5.0;
        int idx = y * 4 + x;
        float v = 0.0;
        if(idx==0)  v=mat[0];  else if(idx==1)  v=mat[1];
        else if(idx==2)  v=mat[2];  else if(idx==3)  v=mat[3];
        else if(idx==4)  v=mat[4];  else if(idx==5)  v=mat[5];
        else if(idx==6)  v=mat[6];  else if(idx==7)  v=mat[7];
        else if(idx==8)  v=mat[8];  else if(idx==9)  v=mat[9];
        else if(idx==10) v=mat[10]; else if(idx==11) v=mat[11];
        else if(idx==12) v=mat[12]; else if(idx==13) v=mat[13];
        else if(idx==14) v=mat[14]; else v=mat[15];
        return v / 16.0;
      }

      void main() {
        // Pixelate UV
        vec2 pxUV = floor(gl_FragCoord.xy / u_pixelSize) * u_pixelSize;
        vec2 uv   = pxUV / u_res;

        // Wave field: layered sin waves
        float wave = 0.0;
        wave += sin(uv.x * u_frequency * 6.2831 + u_time) * u_amplitude;
        wave += sin(uv.y * u_frequency * 4.7124 + u_time * 0.7) * u_amplitude * 0.6;
        wave += sin((uv.x + uv.y) * u_frequency * 3.1415 + u_time * 1.3) * u_amplitude * 0.4;
        float brightness = 0.5 + wave * 0.5;

        // Mouse ripple influence
        float dist = length(uv - u_mouse);
        float ripple = smoothstep(u_mouseR, 0.0, dist);
        brightness = mix(brightness, 1.0, ripple * 0.35);

        // Ordered dither quantization
        float threshold = bayer(gl_FragCoord.xy / u_pixelSize);
        float steps = u_colorNum - 1.0;
        float quantized = floor(brightness * steps + threshold) / steps;
        quantized = clamp(quantized, 0.0, 1.0);

        // Map to color: bgBase → waveColor
        vec3 dark  = vec3(0.039, 0.0, 0.059);   // #0A000F
        vec3 color = mix(dark, u_waveColor, quantized);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src); gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    s.prog = prog;

    // Fullscreen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    s.locs = {
      res:      gl.getUniformLocation(prog, "u_res"),
      time:     gl.getUniformLocation(prog, "u_time"),
      mouse:    gl.getUniformLocation(prog, "u_mouse"),
      mouseR:   gl.getUniformLocation(prog, "u_mouseR"),
      waveColor:gl.getUniformLocation(prog, "u_waveColor"),
      colorNum: gl.getUniformLocation(prog, "u_colorNum"),
      pixelSize:gl.getUniformLocation(prog, "u_pixelSize"),
      amplitude:gl.getUniformLocation(prog, "u_amplitude"),
      frequency:gl.getUniformLocation(prog, "u_frequency"),
    };

    // Resize handler
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse handler
    const onMouse = (e) => {
      const r = canvas.getBoundingClientRect();
      s.mouse = [
        (e.clientX - r.left) / r.width,
        1.0 - (e.clientY - r.top)  / r.height,
      ];
    };
    if (enableMouseInteraction) canvas.addEventListener("mousemove", onMouse);

    // Render loop
    const render = () => {
      if (!disableAnimation) s.time += waveSpeed;
      const { locs } = s;
      gl.uniform2f(locs.res,       canvas.width, canvas.height);
      gl.uniform1f(locs.time,      s.time);
      gl.uniform2f(locs.mouse,     s.mouse[0], s.mouse[1]);
      gl.uniform1f(locs.mouseR,    mouseRadius);
      gl.uniform3f(locs.waveColor, waveColor[0], waveColor[1], waveColor[2]);
      gl.uniform1f(locs.colorNum,  colorNum);
      gl.uniform1f(locs.pixelSize, pixelSize);
      gl.uniform1f(locs.amplitude, waveAmplitude);
      gl.uniform1f(locs.frequency, waveFrequency);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      s.raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(s.raf);
      ro.disconnect();
      if (enableMouseInteraction) canvas.removeEventListener("mousemove", onMouse);
      gl.deleteProgram(prog);
    };
  }, [waveColor, disableAnimation, enableMouseInteraction, mouseRadius, colorNum, pixelSize, waveAmplitude, waveFrequency, waveSpeed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        display: "block", zIndex: 0,
      }}
    />
  );
}

// ── Hero ──────────────────────────────────────────────────────
function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 120); }, []);

  return (
    <section id="home" className="section-pad" style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
      padding: "0 3rem 5rem", position: "relative", overflow: "hidden",
    }}>
      {/* Dither WebGL background — brand palette mint500 on bgBase */}
      <Dither
        waveColor={[0.0, 0.898, 0.627]}
        disableAnimation={false}
        enableMouseInteraction={true}
        mouseRadius={0.3}
        colorNum={4}
        pixelSize={2}
        waveAmplitude={0.3}
        waveFrequency={3}
        waveSpeed={0.05}
      />
      {/* Dark overlay so text stays readable */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: `linear-gradient(to top, ${C.bgBase}f5 0%, ${C.bgBase}99 40%, ${C.bgBase}55 70%, transparent 100%)`,
        pointerEvents: "none",
      }} />

      {/* Top rule */}
      <div style={{ position: "absolute", top: "66px", left: "3rem", right: "3rem", height: "1px", background: C.border, zIndex: 2 }} />

      {/* Location + role tag */}
      <div style={{
        position: "absolute", top: "calc(66px + 2.5rem)", left: "3rem",
        animation: ready ? "fadeIn 1s ease 0.4s both" : "none", opacity: 0,
        zIndex: 2,
        display: "inline-block",
        padding: "0.35rem 0.9rem",
        background: "rgba(10,0,15,0.5)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${C.mint500}25`,
        borderRadius: "4px",
      }}>
        <span className="mono" style={{ fontSize: "0.68rem", color: C.textMuted, letterSpacing: "0.04em" }}>
          <span style={{ color: C.coral }}># </span>
          Sysadmin · Network Engineer · Security Analyst — Jakarta, ID
        </span>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "2.5rem", right: "3rem",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
        animation: ready ? "fadeIn 1s ease 1.5s both" : "none", opacity: 0,
        zIndex: 2,
      }}>
        <div style={{ width: "1px", height: "44px", background: `linear-gradient(to bottom, transparent, ${C.mint500}55)` }} />
        <span className="mono" style={{ fontSize: "0.58rem", color: C.textMuted, writingMode: "vertical-rl", letterSpacing: "0.15em" }}>SCROLL</span>
      </div>

      {/* Main content */}
      <div style={{
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.9s ease 0.2s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
        position: "relative", zIndex: 2,
      }}>
        {/* Terminal lines — glassmorphism blur box */}
        <div style={{
          marginBottom: "2.5rem",
          display: "inline-block",
          padding: "1rem 1.5rem",
          background: `rgba(10, 0, 15, 0.55)`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${C.mint500}30`,
          borderRadius: "6px",
          boxShadow: `0 0 24px ${C.mint500}10`,
        }}>
          <TerminalLine text="whoami" delay={600} />
          <TerminalLine text="parothegreat -- securing networks, hardening systems, hunting threats" delay={1100} color={C.textSec} />
          <TerminalLine text="uptime --since 2024-09-16" delay={2200} />
          <TerminalLine text="online since Sep 16 2024  |  load avg: high  |  status: operational" delay={2700} color={C.mint400} />
        </div>

        {/* 2-column layout: left = text, right = Lanyard */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: "2rem",
          alignItems: "flex-end",
        }}
          className="hero-grid-main">

          {/* ── Left: text content ── */}
          <div>
            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(3.8rem, 9.5vw, 8.5rem)",
              lineHeight: 0.88, fontWeight: 400,
              color: C.textPri, letterSpacing: "-0.02em",
              marginBottom: "4rem",
            }}>
              Alvaro<br />
              <span style={{ fontStyle: "italic", color: C.mint500 }}>Prayogo</span>
            </h1>

            <div className="hero-bottom" style={{
              display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              borderTop: `1px solid ${C.border}`, paddingTop: "2.5rem", gap: "3rem",
            }}>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button className="btn-primary"
                  onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
                  View Work ↓
                </button>
                <button className="btn-ghost"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                  Get in Touch
                </button>
              </div>

              <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-end" }}>
                <p style={{
                  fontSize: "0.85rem", lineHeight: 1.85, fontWeight: 300, color: C.textSec,
                  maxWidth: "270px", borderLeft: `1px solid ${C.border}`, paddingLeft: "1.5rem",
                }}>
                  Defending infrastructure, engineering resilient networks, and breaking things before the bad actors do.
                </p>
                <div className="stat-row" style={{ display: "flex", gap: "2.5rem" }}>
                  <UptimeCounter />
                  {[["30+", "Networks"], ["2", "Certs"]].map(([n, l]) => (
                    <div key={l} style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2rem", color: C.mint500, lineHeight: 1 }}>{n}</div>
                      <div className="mono" style={{ fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.textMuted, marginTop: "0.25rem" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Profile photo ── */}
          <div style={{
            height: "520px",
            position: "relative",
            zIndex: 3,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}>
            {/* Glow behind photo */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at center 60%, ${C.mint500}18 0%, transparent 70%)`,
              filter: "blur(30px)",
              zIndex: 0,
            }} />

            {/* Corner accents */}
            {[
              { top: 0, left: 0, borderTop: `1px solid ${C.mint500}`, borderLeft: `1px solid ${C.mint500}` },
              { top: 0, right: 0, borderTop: `1px solid ${C.coral}`, borderRight: `1px solid ${C.coral}` },
              { bottom: 0, left: 0, borderBottom: `1px solid ${C.coral}`, borderLeft: `1px solid ${C.coral}` },
              { bottom: 0, right: 0, borderBottom: `1px solid ${C.mint500}`, borderRight: `1px solid ${C.mint500}` },
            ].map((s, i) => (
              <div key={i} style={{
                position: "absolute", width: "24px", height: "24px",
                zIndex: 2, ...s,
              }} />
            ))}

            {/* Photo */}
            <img
              src="/images/profile/pfp.jpeg"
              alt="Alvaro Prayogo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                position: "relative",
                zIndex: 1,
                filter: "grayscale(15%) contrast(1.05)",
                maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
              }}
            />

            {/* Scan line overlay on photo */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 2,
              background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
              pointerEvents: "none",
            }} />

            {/* Bottom label */}
            <div style={{
              position: "absolute", bottom: "1rem", left: "1rem",
              zIndex: 3,
              padding: "0.3rem 0.7rem",
              background: "rgba(10,0,15,0.7)",
              backdropFilter: "blur(8px)",
              border: `1px solid ${C.mint500}30`,
            }}>
              <span className="mono" style={{ fontSize: "0.6rem", color: C.mint500, letterSpacing: "0.12em" }}>
                paro@thegreat
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Work ──────────────────────────────────────────────────────
function Work() {
  return (
    <section id="work" className="section-pad" style={{ padding: "8rem 3rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p className="mono" style={{ fontSize: "0.68rem", color: C.mint500, marginBottom: "0.6rem" }}>
            // selected_engagements
          </p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: C.textPri, fontWeight: 400 }}>
            Ops that <em>matter</em>
          </h2>
        </div>
        <span className="mono" style={{ fontSize: "0.72rem", color: C.textMuted }}>2023 — 2024</span>
      </div>

      <div>
        {PROJECTS.map((p) => (
          <div key={p.id} className="project-row">
            <div className="mono" style={{ fontStyle: "normal", fontSize: "0.8rem", color: p.accent, paddingTop: "0.25rem" }}>
              {p.id}
            </div>
            <div>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                fontWeight: 400, color: C.textPri, marginBottom: "0.3rem",
              }}>
                {p.title}
              </h3>
              <p className="mono" style={{ fontSize: "0.68rem", color: p.accent, opacity: 0.8 }}>{p.category}</p>
            </div>
            <p className="proj-desc" style={{ fontSize: "0.84rem", lineHeight: 1.8, fontWeight: 300, color: C.textSec, maxWidth: "360px" }}>
              {p.desc}
            </p>
            <div className="proj-meta" style={{ textAlign: "right" }}>
              <div className="mono" style={{ fontSize: "0.68rem", color: C.textMuted, marginBottom: "0.75rem" }}>{p.year}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", alignItems: "flex-end" }}>
                {p.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="section-pad" style={{
      padding: "8rem 3rem", borderTop: `1px solid ${C.border}`,
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="skills-inner" style={{ display: "flex", gap: "6rem", alignItems: "flex-start" }}>
          {/* Left */}
          <div style={{ flex: "0 0 260px" }}>
            <p className="mono" style={{ fontSize: "0.68rem", color: C.mint500, marginBottom: "0.6rem" }}>
              // capabilities
            </p>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: C.textPri, fontWeight: 400, lineHeight: 1.15, marginBottom: "2rem",
            }}>
              Tools &<br /><em>Expertise</em>
            </h2>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.85, fontWeight: 300, color: C.textSec }}>
              From configuring Cisco ASA to running Metasploit modules — I operate across the full security and networking stack.
            </p>

            {/* Legend */}
            <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {SKILLS.map(s => (
                <div key={s.category} style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: s.accent, flexShrink: 0 }} />
                  <span className="mono" style={{ fontSize: "0.7rem", color: C.textMuted }}>{s.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills grid */}
          <div className="skills-grid" style={{
            flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2.5rem",
          }}>
            {SKILLS.map(group => (
              <div key={group.category}>
                <p className="mono" style={{
                  fontSize: "0.63rem", textTransform: "uppercase", letterSpacing: "0.1em",
                  color: group.accent, marginBottom: "1.25rem", opacity: 0.9,
                }}>
                  {group.category}
                </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {group.items.map(item => (
                    <span key={item} className="skill-item">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div style={{ marginTop: "6rem" }}>
          <p className="mono" style={{ fontSize: "0.68rem", color: C.mint500, marginBottom: "0.6rem" }}>
            // certifications
          </p>
          <h3 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: C.textPri, fontWeight: 400, marginBottom: "2rem",
          }}>
            Credentials & <em>Certs</em>
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
            {CERTS.map(cert => (
              <a
                key={cert.name}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-card"
                style={{
                  "--cert-color": cert.color,
                  textDecoration: "none",
                  display: "block",
                }}
              >
                {/* Cisco NetAcad badge label */}
                <div className="mono" style={{ fontSize: "0.6rem", color: cert.color, opacity: 0.7, marginBottom: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  {cert.issuer}
                </div>
                <div className="mono" style={{ fontSize: "1.1rem", fontWeight: 500, color: cert.color, marginBottom: "0.35rem" }}>
                  {cert.name}
                </div>
                <div style={{ fontSize: "0.78rem", color: C.textMuted, fontWeight: 300, marginBottom: "1rem" }}>{cert.full}</div>
                <div className="mono" style={{ fontSize: "0.62rem", color: cert.color, opacity: 0.6, letterSpacing: "0.08em" }}>
                  View on Credly →
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="section-pad" style={{
      padding: "8rem 3rem", borderTop: `1px solid ${C.border}`,
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8rem" }}>
          {/* Left */}
          <div>
            <p className="mono" style={{ fontSize: "0.68rem", color: C.mint500, marginBottom: "0.6rem" }}>
              // initiate_contact
            </p>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)", color: C.textPri, fontWeight: 400, lineHeight: 1.1, marginBottom: "2rem",
            }}>
              Let's secure<br /><em>something</em>
            </h2>
            <p style={{ fontSize: "0.87rem", lineHeight: 1.85, fontWeight: 300, color: C.textSec, maxWidth: "320px", marginBottom: "3rem" }}>
              Open to infrastructure projects, security audits, network design engagements, or long-term ops roles.
            </p>

            {[
              ["Email",       "alvaroprayogo38@gmail.com",          C.mint500],
              ["Signal",      "@alvaroprayogo",            null],
              ["Based in",    "Jakarta, Indonesia",        null],
              ["PGP Key",     "0xDEAD·BEEF·C0FF·EE42",    C.textMuted],
              ["Response",    "Within 24h",                null],
            ].map(([label, value, accent]) => (
              <div key={label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "0.9rem 0", borderBottom: `1px solid ${C.border}`,
              }}>
                <span className="mono" style={{ fontSize: "0.68rem", color: C.textMuted }}>{label}</span>
                <span className="mono" style={{ fontSize: "0.78rem", color: accent || C.textSec, fontWeight: 400 }}>{value}</span>
              </div>
            ))}

            {/* Social / platform links */}
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
              {Object.entries(SOCIAL_LINKS).map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem", color: C.textMuted,
                  textDecoration: "none", transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color = C.mint400}
                  onMouseLeave={e => e.target.style.color = C.textMuted}
                >{label}</a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            {sent ? (
              <div style={{
                height: "100%", display: "flex", flexDirection: "column",
                justifyContent: "center", alignItems: "center", textAlign: "center", gap: "1.5rem",
              }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%",
                  background: `${C.mint500}18`, border: `1px solid ${C.mint500}55`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.3rem", color: C.mint500,
                }}>✓</div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.6rem", color: C.textPri }}>
                  Transmission received
                </h3>
                <p className="mono" style={{ fontSize: "0.75rem", color: C.textSec }}>
                  I'll respond within 24 hours.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { key: "name",    label: "full_name",        type: "text" },
                  { key: "email",   label: "email_address",    type: "email" },
                ].map(f => (
                  <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label className="mono" style={{ fontSize: "0.65rem", color: C.textMuted, letterSpacing: "0.06em" }}>
                      {f.label}
                    </label>
                    <input className="form-input" type={f.type}
                      value={form[f.key]}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                  </div>
                ))}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label className="mono" style={{ fontSize: "0.65rem", color: C.textMuted, letterSpacing: "0.06em" }}>
                    message
                  </label>
                  <textarea className="form-input" rows={5} style={{ resize: "none" }}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button className="btn-primary" onClick={() => setSent(true)} style={{ alignSelf: "flex-start" }}>
                  ./send_message.sh →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="section-pad" style={{
      padding: "2rem 3rem", borderTop: `1px solid ${C.border}`,
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem",
    }}>
      <span className="mono" style={{ fontSize: "0.78rem", color: C.textMuted }}>
        <span style={{ color: C.mint500 }}>[</span>
        paro@thegreat
        <span style={{ color: C.coral }}>:~</span>
        <span style={{ color: C.mint500 }}>]</span>
        <span style={{ color: C.textMuted }}>$</span>
      </span>
      <div style={{ display: "flex", gap: "2rem" }}>
        {Object.entries(SOCIAL_LINKS).map(([label, url]) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem", color: C.textMuted,
            textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = C.mint400}
            onMouseLeave={e => e.target.style.color = C.textMuted}
          >{label}</a>
        ))}
      </div>
      <span className="mono" style={{ fontSize: "0.68rem", color: C.textMuted }}>© {new Date().getFullYear()}</span>
    </footer>
  );
}

// ── Scroll Spy ────────────────────────────────────────────────
function useScrollSpy() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const sections = [
      { id: "home", label: "Home" }, { id: "work", label: "Work" },
      { id: "skills", label: "Skills" }, { id: "contact", label: "Contact" },
    ];
    const fn = () => {
      const y = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= y) { setActive(sections[i].label); break; }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return active;
}

// ── App ───────────────────────────────────────────────────────
export default function Portfolio() {
  const active = useScrollSpy();
  return (
    <>
      <GlobalStyles />
      <Overlays />
      <Navbar active={active} />
      <Hero />
      <Work />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
