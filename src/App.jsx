import { useState, useEffect, useRef, createContext, useContext } from "react";
import Lanyard from './Lanyard';

// ── Theme Context ──────────────────────────────────────────────
const ThemeCtx = createContext({ isDark: true, toggle: () => {} });
const useTheme = () => useContext(ThemeCtx);

// ── Brand Tokens ───────────────────────────────────────────────
const ACCENT = {
  mint500: "#00E5A0", mint400: "#33EBB3", mint600: "#00C488",
  lime: "#C8F135", coral: "#FF6B6B", amber: "#FFB830", violet: "#A788FA", blue: "#00A3FF",
};
function makeTokens(isDark) {
  return isDark ? {
    bgBase: "#0A000F", bgCard: "#131619", bgCard2: "#1A1E22", border: "#252A2F",
    textPri: "#F0F4F8", textSec: "#8A95A0", textMuted: "#5E6873",
    navBg: "rgba(10,0,15,0.35)", navBgScr: "#0A000Fe0",
    overlayBg: "rgba(10,0,15,0.55)",
    heroOverlay: "linear-gradient(to top,#0A000Ff5 0%,#0A000F99 40%,#0A000F55 70%,transparent 100%)",
    mobileMenuBg: "#0A000F",
    ...ACCENT,
  } : {
    bgBase: "#F2F4F8", bgCard: "#FFFFFF", bgCard2: "#E8ECF2", border: "#D0D7E3",
    textPri: "#111827", textSec: "#4B5563", textMuted: "#9CA3AF",
    navBg: "rgba(242,244,248,0.75)", navBgScr: "#F2F4F8ee",
    overlayBg: "rgba(242,244,248,0.70)",
    heroOverlay: "linear-gradient(to top,#F2F4F8f8 0%,#F2F4F8cc 40%,#F2F4F866 70%,transparent 100%)",
    mobileMenuBg: "#F2F4F8",
    ...ACCENT,
  };
}

const PROJECTS = [
  { id:"01", title:"SentinelNet",   category:"Network Security & Monitoring", desc:"Enterprise-grade IDS/IPS deployment across 3 data centers. Reduced threat detection time from 4h to 8min using Suricata rules + custom SIEM correlation logic.",            tags:["Suricata","Splunk","pfSense"],            year:"2024", accent: ACCENT.coral },
  { id:"02", title:"VaultOps",      category:"Infrastructure Hardening",       desc:"Zero-trust architecture rollout for 200-node corporate network. Implemented microsegmentation, PAM, and automated compliance scanning aligned to CIS Benchmarks.",           tags:["HashiCorp Vault","Ansible","CIS"],        year:"2024", accent: ACCENT.mint500 },
  { id:"03", title:"PhantomNet Lab",category:"Penetration Testing",            desc:"Full red team engagement simulating APT lateral movement. Identified 14 critical CVEs across Windows AD environment. Delivered remediation roadmap adopted by client.",       tags:["Metasploit","BloodHound","Cobalt Strike"], year:"2023", accent: ACCENT.violet },
  { id:"04", title:"CoreFabric",    category:"Network Engineering",            desc:"Designed and deployed BGP/OSPF multi-site WAN for ISP with 40Gbps backbone. Automated provisioning via Netmiko/NAPALM, cutting config time by 70%.",                        tags:["Cisco IOS-XE","BGP","NAPALM"],            year:"2023", accent: ACCENT.blue },
];

const SKILLS = [
  { category:"Network Eng.",  items:["Cisco","BGP / OSPF / EIGRP","VLAN & VxLAN","SD-WAN","Wireshark"],               accent: ACCENT.blue },
  { category:"Cybersecurity", items:["Penetration Testing","SIEM / SOC","Threat Hunting","CVE Analysis","Zero Trust"], accent: ACCENT.coral },
  { category:"Sysadmin",      items:["Linux (RHEL/Debian)","Ubuntu Server","Active Directory","Ansible","Bash / Python"], accent: ACCENT.mint500 },
  { category:"Cloud & Infra", items:["AWS / Azure","Terraform","Docker / K8s","Proxmox","Zabbix / Nagios"],            accent: ACCENT.violet },
];

const SOCIAL_LINKS = {
  "GitHub":   "https://github.com/parothegreat/ ",
  "LinkedIn": "https://www.linkedin.com/in/moehammad-alvaro-pirata-prayogo-842a8834a/ ",
};

const CERTS = [
  { name:"Network Defense", full:"Cisco NetAcad — Network Defense", issuer:"Cisco Networking Academy", color: ACCENT.blue,
    url:"https://www.credly.com/badges/26767ad4-478f-47d2-bd76-c30903affef0/linked_in_profile " },
  { name:"Ethical Hacker",  full:"Cisco NetAcad — Ethical Hacker",  issuer:"Cisco Networking Academy", color: ACCENT.coral,
    url:"https://www.credly.com/badges/27912f5c-4b4f-4190-9684-9a3822bb6723/linked_in_profile " },
];

// ── Global Styles ──────────────────────────────────────────────
function GlobalStyles({ C }) {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=JetBrains+Mono:wght@400;500&display=swap";
    if (!document.querySelector(`link[href="${link.href}"]`)) document.head.appendChild(link);
  }, []);

  useEffect(() => {
    let el = document.getElementById("__portfolio-styles");
    if (!el) { el = document.createElement("style"); el.id = "__portfolio-styles"; document.head.appendChild(el); }
    el.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        background: ${C.bgBase}; color: ${C.textPri};
        font-family: 'DM Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
        -webkit-tap-highlight-color: transparent;
        overflow-x: hidden;
      }
      ::selection { background: ${C.mint500}22; color: ${C.mint400}; }
      input, textarea { font-family: 'DM Sans', sans-serif; }
      input::placeholder, textarea::placeholder { color: ${C.textMuted}; }
      button { cursor: pointer; }

      @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      @keyframes pulse-dot {
        0%,100%{opacity:1;box-shadow:0 0 0 0 ${C.mint500}55}
        50%{opacity:.6;box-shadow:0 0 0 6px ${C.mint500}00}
      }
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

      .reveal       {opacity:0;transform:translateY(36px);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1)}
      .reveal-left  {opacity:0;transform:translateX(-28px);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1)}
      .reveal-right {opacity:0;transform:translateX(28px);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1)}
      .reveal-scale {opacity:0;transform:scale(.93);transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1)}
      .reveal.vis,.reveal-left.vis,.reveal-right.vis{opacity:1;transform:translate(0,0)}
      .reveal-scale.vis{opacity:1;transform:scale(1)}
      .d1{transition-delay:.08s}.d2{transition-delay:.16s}.d3{transition-delay:.24s}.d4{transition-delay:.32s}.d5{transition-delay:.40s}

      .mono { font-family: 'JetBrains Mono', monospace; }

      .nav-link {
        font-family:'JetBrains Mono',monospace; font-size:0.72rem; font-weight:400;
        letter-spacing:0.06em; text-transform:uppercase;
        color:${C.textMuted}; background:none; border:none;
        transition:color 0.25s; padding:0; -webkit-tap-highlight-color:transparent;
      }
      .nav-link:hover { color: ${C.textPri}; }
      .nav-link.active { color: ${C.mint400}; }

      .project-row {
        display:grid; grid-template-columns:52px 1fr 1fr auto;
        gap:2rem; align-items:start;
        padding:2.25rem 1.5rem; border-top:1px solid ${C.border};
        transition:background 0.3s,border-radius 0.3s;
      }
      .project-row:last-child { border-bottom:1px solid ${C.border}; }
      .project-row:hover { background:${C.bgCard}; border-radius:6px; }

      .skill-item {
        font-size:0.82rem; font-weight:300; color:${C.textSec};
        padding:0.6rem 0; border-bottom:1px solid ${C.border};
        transition:color 0.2s,padding-left 0.2s;
        font-family:'JetBrains Mono',monospace;
      }
      .skill-item:hover { color:${C.textPri}; padding-left:0.4rem; }

      .btn-primary {
        display:inline-flex; align-items:center; gap:0.5rem;
        padding:0.75rem 1.5rem;
        background:${C.mint500}; color:${C.bgBase};
        font-family:'JetBrains Mono',monospace;
        font-size:0.75rem; font-weight:500;
        letter-spacing:0.06em; text-transform:uppercase;
        border:none; border-radius:4px; transition:all 0.25s ease; white-space:nowrap;
      }
      .btn-primary:hover { background:${C.mint400}; transform:translateY(-2px); box-shadow:0 8px 32px ${C.mint500}40; }

      .btn-ghost {
        display:inline-flex; align-items:center; gap:0.5rem;
        padding:0.75rem 1.5rem;
        background:transparent; color:${C.textSec};
        font-family:'JetBrains Mono',monospace;
        font-size:0.75rem; font-weight:400;
        letter-spacing:0.06em; text-transform:uppercase;
        border:1px solid ${C.border}; border-radius:4px; transition:all 0.25s ease; white-space:nowrap;
      }
      .btn-ghost:hover { border-color:${C.mint500}66; color:${C.mint400}; }

      .form-input {
        width:100%; padding:0.85rem 1rem;
        background:${C.bgCard2}; border:1px solid ${C.border};
        border-radius:4px; color:${C.textPri};
        font-size:0.88rem; font-weight:300; font-family:'DM Sans',sans-serif;
        outline:none; transition:border-color 0.3s,box-shadow 0.3s;
      }
      .form-input:focus { border-color:${C.mint500}88; box-shadow:0 0 0 3px ${C.mint500}18; }

      .cert-card {
        padding:1rem 1.25rem;
        background:${C.bgCard}; border:1px solid ${C.border};
        border-radius:6px; transition:all 0.25s; cursor:default;
      }
      .cert-card:hover {
        border-color:var(--cert-color);
        box-shadow:0 0 20px color-mix(in srgb,var(--cert-color) 15%,transparent);
        transform:translateY(-2px);
      }

      .tag-pill {
        display:inline-block; padding:0.2rem 0.6rem;
        background:${C.bgCard2}; border:1px solid ${C.border};
        border-radius:3px; font-size:0.65rem; color:${C.textMuted};
        font-family:'JetBrains Mono',monospace; letter-spacing:0.02em;
      }

      /* ── Mobile-first breakpoints ───── */
      @media (max-width: 900px) {
        .project-row { grid-template-columns:44px 1fr; gap:1rem; padding:1.5rem 1rem; }
        .proj-desc,.proj-meta { display:none; }
        .desktop-nav { display:none !important; }
        .mobile-toggle { display:flex !important; }
        .lanyard-wrap { display:none !important; }
        .hero-bottom { flex-direction:column !important; align-items:flex-start !important; gap:2rem !important; }
        .hero-bottom-right { border-left:none !important; padding-left:0 !important; flex-direction:column !important; align-items:flex-start !important; gap:1.5rem !important; }
        .skills-inner { flex-direction:column !important; gap:2.5rem !important; }
        .skills-left { flex:none !important; width:100% !important; }
        .skills-grid { grid-template-columns:1fr 1fr !important; }
        .contact-grid { grid-template-columns:1fr !important; gap:3rem !important; }
        .certs-grid { grid-template-columns:1fr 1fr !important; }
        .stat-row { gap:1.5rem !important; flex-wrap:wrap !important; }
        .hero-section { padding:0 1.5rem 4rem !important; }
        .work-section { padding:5rem 1.5rem !important; max-width:100% !important; }
        .skills-section { padding:5rem 1.5rem !important; }
        .contact-section { padding:5rem 1.5rem !important; }
        .footer-inner { padding:1.5rem !important; flex-direction:column !important; align-items:flex-start !important; gap:1rem !important; }
        .hero-top-tag { left:1.5rem !important; right:1.5rem !important; }
        .hero-top-rule { left:1.5rem !important; right:1.5rem !important; }
        nav { grid-template-columns: 1fr auto !important; }
      }
      @media (max-width: 560px) {
        .skills-grid { grid-template-columns:1fr !important; }
        .certs-grid { grid-template-columns:1fr !important; }
        .hero-terminal { padding:0.75rem 1rem !important; }
        .hero-terminal .mono { font-size:0.65rem !important; }
        .btn-row { flex-wrap:wrap !important; }
        .hero-h1 { font-size:clamp(2.8rem,14vw,8.5rem) !important; }
        .hero-section { padding:0 1.25rem 3rem !important; }
      }
    `;
  }, [C]);

  return null;
}

// ── Overlays ───────────────────────────────────────────────────
function Overlays({ C }) {
  return (
    <>
      <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:9999,opacity:0.022,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0,opacity:0.025,
        backgroundImage:`linear-gradient(${C.mint500} 1px,transparent 1px),linear-gradient(90deg,${C.mint500} 1px,transparent 1px)`,
        backgroundSize:"60px 60px" }} />
    </>
  );
}

// ── Terminal typewriter ────────────────────────────────────────
function TerminalLine({ text, delay = 0, color, C }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++; setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, 28);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);
  return (
    <div className="mono" style={{ fontSize:"0.78rem",color:color||C.textMuted,lineHeight:2 }}>
      <span style={{ color:C.mint500,marginRight:"0.5rem" }}>$</span>
      {displayed}
      {!done && <span style={{ animation:"blink 0.7s step-end infinite",color:C.mint400 }}>|</span>}
    </div>
  );
}

// ── Theme Toggle Button ────────────────────────────────────────
function ThemeToggle({ C }) {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        background: "none", border: `1px solid ${C.border}`,
        borderRadius: "6px", padding: "0.3rem 0.55rem",
        color: C.textMuted, fontSize: "1rem", lineHeight: 1,
        transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = C.mint500; e.currentTarget.style.color = C.mint400; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; }}
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}

// ── Navbar ─────────────────────────────────────────────────────
function Navbar({ active, C }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = ["Home","Work","Skills","Contact"];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (l) => {
    setMobileOpen(false);
    document.getElementById(l === "Work" ? "work" : l.toLowerCase())?.scrollIntoView({ behavior:"smooth" });
  };

  return (
    <>
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:1000,
        display:"grid",gridTemplateColumns:"1fr auto 1fr",alignItems:"center",
        padding:"0 2rem",height:"66px",
        background: scrolled ? C.navBgScr : C.navBg,
        backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
        borderBottom: scrolled ? `1px solid ${C.border}` : `1px solid ${C.mint500}18`,
        transition:"all 0.4s ease",
      }}>
        {/* Logo - Left */}
        <div className="mono" style={{ fontSize:"0.9rem",color:C.textPri,display:"flex",alignItems:"center",gap:"0.4rem",justifySelf:"start" }}>
          <span style={{ color:C.mint500 }}>[</span>parothegreat<span style={{ color:C.coral }}>~</span><span style={{ color:C.mint500 }}>]</span>
          <span style={{ color:C.textMuted,fontSize:"0.7rem" }}>#</span>
        </div>

        {/* Desktop nav - Center */}
        <div className="desktop-nav" style={{ display:"flex",gap:"2.5rem",justifySelf:"center" }}>
          {links.map(l => (
            <button key={l} className={`nav-link ${active===l?"active":""}`} onClick={() => go(l)}>
              {active===l ? `> ${l}` : l}
            </button>
          ))}
        </div>

        {/* Desktop right - Right */}
        <div className="desktop-nav" style={{ display:"flex",alignItems:"center",gap:"1rem",justifySelf:"end" }}>
          <div style={{ display:"flex",alignItems:"center",gap:"0.6rem" }}>
            <span style={{ width:"7px",height:"7px",borderRadius:"50%",background:C.mint500,display:"inline-block",animation:"pulse-dot 2.5s ease-in-out infinite" }} />
            <span className="mono" style={{ fontSize:"0.68rem",color:C.textMuted }}>available_for_hire</span>
          </div>
          <ThemeToggle C={C} />
        </div>

        {/* Mobile toggle - Right (hidden on desktop) */}
        <div className="mobile-toggle" style={{ display:"none",justifySelf:"end" }}>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background:"none",border:"none",flexDirection:"column",gap:"6px",padding:"4px",display:"flex" }}>
            {[0,1].map(i => (
              <div key={i} style={{
                width:"22px",height:"1.5px",background:C.mint400,borderRadius:"2px",transition:"transform 0.3s",
                transform: mobileOpen ? (i===0?"rotate(45deg) translate(5px,5px)":"rotate(-45deg) translate(5px,-5px)") : "none",
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div style={{
        position:"fixed",inset:0,zIndex:999,background:C.mobileMenuBg,
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"2.5rem",
        opacity:mobileOpen?1:0,pointerEvents:mobileOpen?"all":"none",transition:"opacity 0.3s ease",
      }}>
        {links.map(l => (
          <button key={l} onClick={() => go(l)} style={{
            background:"none",border:"none",fontFamily:"'DM Serif Display',serif",
            fontSize:"2.8rem",color:C.textPri,fontWeight:400,transition:"color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = C.mint400}
            onMouseLeave={e => e.target.style.color = C.textPri}
          >{l}</button>
        ))}
        <ThemeToggle C={C} />
      </div>
    </>
  );
}

// ── Uptime Counter ─────────────────────────────────────────────
const START_DATE = new Date("2024-09-16T00:00:00");
function getUptime() {
  const diff = new Date() - START_DATE;
  const ts = Math.floor(diff/1000), tm = Math.floor(ts/60), th = Math.floor(tm/60), td = Math.floor(th/24);
  return { years:Math.floor(td/365), months:Math.floor((td%365)/30), days:td%30, hours:th%24, minutes:tm%60, seconds:ts%60 };
}
function UptimeCounter({ C }) {
  const [uptime, setUptime] = useState(getUptime());
  useEffect(() => { const iv = setInterval(() => setUptime(getUptime()), 1000); return () => clearInterval(iv); }, []);
  const pad = n => String(n).padStart(2,"0");
  const pv = uptime.years > 0 ? `${uptime.years}y ${uptime.months}m` : uptime.months > 0 ? `${uptime.months}m ${uptime.days}d` : `${uptime.days}d`;
  return (
    <div style={{ textAlign:"right" }}>
      <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:"2rem",color:C.mint500,lineHeight:1 }}>{pv}</div>
      <div className="mono" style={{ fontSize:"0.58rem",letterSpacing:"0.1em",textTransform:"uppercase",color:C.textMuted,marginTop:"0.25rem" }}>Uptime</div>
      <div className="mono" style={{ fontSize:"0.6rem",color:C.mint500,opacity:0.5,marginTop:"0.3rem",letterSpacing:"0.05em" }}>{pad(uptime.hours)}:{pad(uptime.minutes)}:{pad(uptime.seconds)}</div>
    </div>
  );
}

// ── Dither WebGL Background ────────────────────────────────────
function Dither({ waveColor=[0.0,0.898,0.627],disableAnimation=false,enableMouseInteraction=true,mouseRadius=0.3,colorNum=4,pixelSize=2,waveAmplitude=3,waveFrequency=10,waveSpeed=0.9 }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ mouse:[0.5,0.5],time:0,raf:null,gl:null,prog:null,locs:{} });

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl",{antialias:false,alpha:true});
    if (!gl) return;
    const s = stateRef.current; s.gl = gl;
    const vert = `attribute vec2 a_pos; void main(){gl_Position=vec4(a_pos,0.0,1.0);}`;
    const frag = `
      precision mediump float;
      uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse; uniform float u_mouseR;
      uniform vec3 u_waveColor; uniform float u_colorNum; uniform float u_pixelSize;
      uniform float u_amplitude; uniform float u_frequency;
      float bayer(vec2 p){
        int x=int(mod(p.x,4.0)),y=int(mod(p.y,4.0)); float mat[16];
        mat[0]=0.0;mat[1]=8.0;mat[2]=2.0;mat[3]=10.0; mat[4]=12.0;mat[5]=4.0;mat[6]=14.0;mat[7]=6.0;
        mat[8]=3.0;mat[9]=11.0;mat[10]=1.0;mat[11]=9.0; mat[12]=15.0;mat[13]=7.0;mat[14]=13.0;mat[15]=5.0;
        int idx=y*4+x; float v=0.0;
        if(idx==0)v=mat[0];else if(idx==1)v=mat[1];else if(idx==2)v=mat[2];else if(idx==3)v=mat[3];
        else if(idx==4)v=mat[4];else if(idx==5)v=mat[5];else if(idx==6)v=mat[6];else if(idx==7)v=mat[7];
        else if(idx==8)v=mat[8];else if(idx==9)v=mat[9];else if(idx==10)v=mat[10];else if(idx==11)v=mat[11];
        else if(idx==12)v=mat[12];else if(idx==13)v=mat[13];else if(idx==14)v=mat[14];else v=mat[15];
        return v/16.0;
      }
      void main(){
        vec2 pxUV=floor(gl_FragCoord.xy/u_pixelSize)*u_pixelSize; vec2 uv=pxUV/u_res;
        float wave=0.0;
        wave+=sin(uv.x*u_frequency*6.2831+u_time)*u_amplitude;
        wave+=sin(uv.y*u_frequency*4.7124+u_time*0.7)*u_amplitude*0.6;
        wave+=sin((uv.x+uv.y)*u_frequency*3.1415+u_time*1.3)*u_amplitude*0.4;
        float brightness=0.5+wave*0.5;
        float dist=length(uv-u_mouse); float ripple=smoothstep(u_mouseR,0.0,dist);
        brightness=mix(brightness,1.0,ripple*0.35);
        float threshold=bayer(gl_FragCoord.xy/u_pixelSize);
        float steps=u_colorNum-1.0;
        float quantized=clamp(floor(brightness*steps+threshold)/steps,0.0,1.0);
        vec3 dark=vec3(0.039,0.0,0.059);
        vec3 color=mix(dark,u_waveColor,quantized);
        gl_FragColor=vec4(color,1.0);
      }
    `;
    const compile=(type,src)=>{const sh=gl.createShader(type);gl.shaderSource(sh,src);gl.compileShader(sh);return sh;};
    const prog=gl.createProgram();
    gl.attachShader(prog,compile(gl.VERTEX_SHADER,vert));
    gl.attachShader(prog,compile(gl.FRAGMENT_SHADER,frag));
    gl.linkProgram(prog); gl.useProgram(prog); s.prog=prog;
    const buf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buf);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    const loc=gl.getAttribLocation(prog,"a_pos"); gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    s.locs={res:gl.getUniformLocation(prog,"u_res"),time:gl.getUniformLocation(prog,"u_time"),mouse:gl.getUniformLocation(prog,"u_mouse"),mouseR:gl.getUniformLocation(prog,"u_mouseR"),waveColor:gl.getUniformLocation(prog,"u_waveColor"),colorNum:gl.getUniformLocation(prog,"u_colorNum"),pixelSize:gl.getUniformLocation(prog,"u_pixelSize"),amplitude:gl.getUniformLocation(prog,"u_amplitude"),frequency:gl.getUniformLocation(prog,"u_frequency")};
    const resize=()=>{canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight;gl.viewport(0,0,canvas.width,canvas.height);};
    resize(); const ro=new ResizeObserver(resize); ro.observe(canvas);
    const onMouse=e=>{const r=canvas.getBoundingClientRect();s.mouse=[(e.clientX-r.left)/r.width,1.0-(e.clientY-r.top)/r.height];};
    if(enableMouseInteraction) canvas.addEventListener("mousemove",onMouse);
    const render=()=>{
      if(!disableAnimation)s.time+=waveSpeed; const{locs}=s;
      gl.uniform2f(locs.res,canvas.width,canvas.height); gl.uniform1f(locs.time,s.time);
      gl.uniform2f(locs.mouse,s.mouse[0],s.mouse[1]); gl.uniform1f(locs.mouseR,mouseRadius);
      gl.uniform3f(locs.waveColor,waveColor[0],waveColor[1],waveColor[2]); gl.uniform1f(locs.colorNum,colorNum);
      gl.uniform1f(locs.pixelSize,pixelSize); gl.uniform1f(locs.amplitude,waveAmplitude); gl.uniform1f(locs.frequency,waveFrequency);
      gl.drawArrays(gl.TRIANGLE_STRIP,0,4); s.raf=requestAnimationFrame(render);
    };
    render();
    return ()=>{cancelAnimationFrame(s.raf);ro.disconnect();if(enableMouseInteraction)canvas.removeEventListener("mousemove",onMouse);gl.deleteProgram(prog);};
  }, [waveColor,disableAnimation,enableMouseInteraction,mouseRadius,colorNum,pixelSize,waveAmplitude,waveFrequency,waveSpeed]);

  return <canvas ref={canvasRef} style={{ position:"absolute",inset:0,width:"100%",height:"100%",display:"block",zIndex:0 }} />;
}

// ── Hero ───────────────────────────────────────────────────────
function Hero({ C }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 120); }, []);

  return (
    <section id="home" className="hero-section" style={{
      minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"flex-end",
      padding:"0 3rem 5rem", position:"relative", overflow:"hidden",
    }}>
      {/* Dither BG */}
      <Dither waveColor={[0.0,0.898,0.627]} disableAnimation={false} enableMouseInteraction={true} mouseRadius={0.3} colorNum={4} pixelSize={2} waveAmplitude={0.3} waveFrequency={3} waveSpeed={0.05} />
      {/* Overlay */}
      <div style={{ position:"absolute",inset:0,zIndex:1,background:C.heroOverlay,pointerEvents:"none",transition:"background 0.4s ease" }} />

      {/* Top rule */}
      <div className="hero-top-rule" style={{ position:"absolute",top:"66px",left:"3rem",right:"3rem",height:"1px",background:C.border,zIndex:2 }} />

      {/* Role tag */}
      <div className="hero-top-tag" style={{
        position:"absolute",top:"calc(90px + 5rem)",left:"3rem",
        animation: ready ? "fadeIn 1s ease 0.4s both" : "none",opacity:0,zIndex:2,
        display:"inline-block",padding:"0.35rem 0.9rem",
        background:C.overlayBg,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",
        border:`1px solid ${C.mint500}25`,borderRadius:"4px",
        transition:"background 0.4s ease",
      }}>
        <span className="Jetbrains mono" style={{ fontSize:"0.9rem",color:C.textMuted,letterSpacing:"0.04em" }}>
          <span style={{ color:C.coral }}>
          <TerminalLine text= "Sysadmin · Network Engineer · Security Analyst — Bekasi, ID" delay = {1170} color={C.coral} C={C}/>
        </span>
        </span>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position:"absolute",bottom:"2.5rem",right:"3rem",
        display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem",
        animation: ready ? "fadeIn 1s ease 1.5s both" : "none",opacity:0,zIndex:2,
      }}>
        <div style={{ width:"1px",height:"44px",background:`linear-gradient(to bottom,transparent,${C.mint500}55)` }} />
      </div>

      {/* Lanyard */}
      <div className="lanyard-wrap" style={{
        position:"absolute",top:"35%",right:"12rem",transform:"translateY(-50%)",
        width:"400px",height:"600px",zIndex:3,pointerEvents:"all",
      }}>
        <Lanyard position={[0,0,20]} gravity={[0,-40,0]} />
      </div>

      {/* Main content */}
      <div style={{
        opacity: ready?1:0, transform: ready?"translateY(0)":"translateY(28px)",
        transition:"opacity 0.9s ease 0.2s,transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
        position:"relative",zIndex:2,
      }}>
        {/* Terminal box */}
        <div className="hero-terminal" style={{
          marginBottom:"2.5rem",display:"inline-block",padding:"1rem 1.5rem",
          background:C.overlayBg,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",
          border:`1px solid ${C.mint500}30`,borderRadius:"6px",boxShadow:`0 0 24px ${C.mint500}10`,
          transition:"background 0.4s ease",maxWidth:"100%",
        }}>
          <TerminalLine text="whoami" delay={600} C={C} />
          <TerminalLine text="parothegreat -- securing networks, hardening systems, hunting threats" delay={1100} color={C.mint600} C={C} />
          <TerminalLine text="uptime --since 2024-09-16" delay={2200} C={C} />
          <TerminalLine text="online since Sep 16 2024  |  load avg: high  |  status: operational-student" delay={2700} color={C.mint400} C={C} />
        </div>

        {/* Name */}
        <div>
          <h1 className="hero-h1" style={{
            fontFamily:"'DM Serif Display',serif",
            fontSize:"clamp(3.8rem,9.5vw,8.5rem)",
            lineHeight:0.88,fontWeight:400,color:C.textPri,
            letterSpacing:"-0.02em",marginBottom:"4rem",
          }}>
            Hi, I'm<br />
            <span style={{ fontStyle:"italic",color:C.mint500 }}>Alvaro Prayogo</span>
          </h1>

          <div className="hero-bottom" style={{
            display:"flex",alignItems:"flex-end",justifyContent:"space-between",
            borderTop:`1px solid ${C.border}`,paddingTop:"2.5rem",gap:"3rem",
          }}>
            <div className="btn-row" style={{ display:"flex",gap:"0.75rem",flexWrap:"wrap" }}>
              <button className="btn-primary" onClick={() => document.getElementById("work")?.scrollIntoView({behavior:"smooth"})}>
                View Work ↓
              </button>
              <button className="btn-ghost" onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}>
                Get in Touch
              </button>
            </div>

            <div className="hero-bottom-right" style={{
              display:"flex",gap:"1.5rem",alignItems:"flex-end",
            }}>
              <p style={{
                fontSize:"0.85rem",lineHeight:1.85,fontWeight:300,color:C.textSec,
                maxWidth:"270px",borderLeft:`1px solid ${C.border}`,paddingLeft:"1.5rem",
              }}>
                "Defending infrastructure, engineering resilient networks, and breaking things before the bad actors do."
              </p>
              <div className="stat-row" style={{ display:"flex",gap:"2.5rem" }}>
                <UptimeCounter C={C} />
                {[["30+","Networks"],["2","Certs"]].map(([n,l]) => (
                  <div key={l} style={{ textAlign:"right" }}>
                    <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:"2rem",color:C.mint500,lineHeight:1 }}>{n}</div>
                    <div className="mono" style={{ fontSize:"0.58rem",letterSpacing:"0.1em",textTransform:"uppercase",color:C.textMuted,marginTop:"0.25rem" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Work ───────────────────────────────────────────────────────
function Work({ C }) {
  return (
    <section id="work" className="work-section" style={{ padding:"8rem 3rem",maxWidth:"1200px",margin:"0 auto" }}>
      <div className="reveal" style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"4rem",flexWrap:"wrap",gap:"1rem" }}>
        <div>
          <p className="mono" style={{ fontSize:"0.68rem",color:C.mint500,marginBottom:"0.6rem" }}>// selected_engagements</p>
          <h2 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",color:C.textPri,fontWeight:400 }}>
            Ops that <em>matter</em>
          </h2>
        </div>
        <span className="mono" style={{ fontSize:"0.72rem",color:C.textMuted }}>2024 — 2026</span>
      </div>
      <div>
        {PROJECTS.map((p,i) => (
          <div key={p.id} className={`project-row reveal d${Math.min(i+1,5)}`}>
            <div className="mono" style={{ fontStyle:"normal",fontSize:"0.8rem",color:p.accent,paddingTop:"0.25rem" }}>{p.id}</div>
            <div>
              <h3 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:400,color:C.textPri,marginBottom:"0.3rem" }}>{p.title}</h3>
              <p className="mono" style={{ fontSize:"0.68rem",color:p.accent,opacity:0.8 }}>{p.category}</p>
            </div>
            <p className="proj-desc" style={{ fontSize:"0.84rem",lineHeight:1.8,fontWeight:300,color:C.textSec,maxWidth:"360px" }}>{p.desc}</p>
            <div className="proj-meta" style={{ textAlign:"right" }}>
              <div className="mono" style={{ fontSize:"0.68rem",color:C.textMuted,marginBottom:"0.75rem" }}>{p.year}</div>
              <div style={{ display:"flex",flexDirection:"column",gap:"0.35rem",alignItems:"flex-end" }}>
                {p.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Skills ─────────────────────────────────────────────────────
function Skills({ C }) {
  return (
    <section id="skills" className="skills-section" style={{ padding:"8rem 3rem",borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:"1200px",margin:"0 auto" }}>
        <div className="skills-inner" style={{ display:"flex",gap:"6rem",alignItems:"flex-start" }}>
          <div className="reveal-left skills-left" style={{ flex:"0 0 260px" }}>
            <p className="mono" style={{ fontSize:"0.68rem",color:C.mint500,marginBottom:"0.6rem" }}>// capabilities</p>
            <h2 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"clamp(1.8rem,3vw,2.6rem)",color:C.textPri,fontWeight:400,lineHeight:1.15,marginBottom:"2rem" }}>
              Tools &<br /><em>Expertise</em>
            </h2>
            <p style={{ fontSize:"0.85rem",lineHeight:1.85,fontWeight:300,color:C.textSec }}>
              From configuring Cisco ASA to running Metasploit modules — I operate across the full security and networking stack.
            </p>
            <div style={{ marginTop:"2.5rem",display:"flex",flexDirection:"column",gap:"0.65rem" }}>
              {SKILLS.map(s => (
                <div key={s.category} style={{ display:"flex",alignItems:"center",gap:"0.65rem" }}>
                  <div style={{ width:"8px",height:"8px",borderRadius:"2px",background:s.accent,flexShrink:0 }} />
                  <span className="mono" style={{ fontSize:"0.7rem",color:C.textMuted }}>{s.category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="skills-grid" style={{ flex:1,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"2.5rem" }}>
            {SKILLS.map((group,i) => (
              <div key={group.category} className={`reveal d${i+1}`}>
                <p className="mono" style={{ fontSize:"0.63rem",textTransform:"uppercase",letterSpacing:"0.1em",color:group.accent,marginBottom:"1.25rem",opacity:0.9 }}>
                  {group.category}
                </p>
                <div style={{ display:"flex",flexDirection:"column" }}>
                  {group.items.map(item => <span key={item} className="skill-item">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="reveal" style={{ marginTop:"6rem" }}>
          <p className="mono" style={{ fontSize:"0.68rem",color:C.mint500,marginBottom:"0.6rem" }}>// certifications</p>
          <h3 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"clamp(1.4rem,2.5vw,2rem)",color:C.textPri,fontWeight:400,marginBottom:"2rem" }}>
            Credentials & <em>Certs</em>
          </h3>
          <div className="certs-grid" style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"1rem" }}>
            {CERTS.map((cert,i) => (
              <a key={cert.name} href={cert.url} target="_blank" rel="noopener noreferrer"
                className={`cert-card reveal-scale d${i+1}`}
                style={{ "--cert-color":cert.color,textDecoration:"none",display:"block" }}>
                <div className="mono" style={{ fontSize:"0.6rem",color:cert.color,opacity:0.7,marginBottom:"0.5rem",letterSpacing:"0.12em",textTransform:"uppercase" }}>{cert.issuer}</div>
                <div className="mono" style={{ fontSize:"1.1rem",fontWeight:500,color:cert.color,marginBottom:"0.35rem" }}>{cert.name}</div>
                <div style={{ fontSize:"0.78rem",color:C.textMuted,fontWeight:300,marginBottom:"1rem" }}>{cert.full}</div>
                <div className="mono" style={{ fontSize:"0.62rem",color:cert.color,opacity:0.6,letterSpacing:"0.08em" }}>View on Credly →</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────
function Contact({ C }) {
  const [form, setForm] = useState({ name:"",email:"",message:"" });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="contact-section" style={{ padding:"8rem 3rem",borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:"1200px",margin:"0 auto" }}>
        <div className="contact-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8rem" }}>
          {/* Left */}
          <div className="reveal-left">
            <p className="mono" style={{ fontSize:"0.68rem",color:C.mint500,marginBottom:"0.6rem" }}>// initiate_contact</p>
            <h2 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"clamp(2rem,4vw,3.2rem)",color:C.textPri,fontWeight:400,lineHeight:1.1,marginBottom:"2rem" }}>
              Let's secure<br /><em>something</em>
            </h2>
            <p style={{ fontSize:"0.87rem",lineHeight:1.85,fontWeight:300,color:C.textSec,maxWidth:"320px",marginBottom:"3rem" }}>
              Open to infrastructure projects, security audits, network design engagements, or long-term ops roles.
            </p>
            {[
              ["Email","alvaroprayogo38@gmail.com",C.mint500],
              ["Based in","Bekasi, Indonesia",null],
              ["PGP Key","0xDEAD·BEEF·C0FF·EE42",C.textMuted],
              ["Response","Within 24h",null],
            ].map(([label,value,accent]) => (
              <div key={label} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.9rem 0",borderBottom:`1px solid ${C.border}` }}>
                <span className="mono" style={{ fontSize:"0.68rem",color:C.textMuted }}>{label}</span>
                <span className="mono" style={{ fontSize:"0.78rem",color:accent||C.textSec,fontWeight:400 }}>{value}</span>
              </div>
            ))}
            <div style={{ display:"flex",gap:"1.5rem",marginTop:"2.5rem",flexWrap:"wrap" }}>
              {Object.entries(SOCIAL_LINKS).map(([label,url]) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily:"'JetBrains Mono',monospace",fontSize:"0.65rem",color:C.textMuted,textDecoration:"none",transition:"color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color = C.mint400}
                  onMouseLeave={e => e.target.style.color = C.textMuted}
                >{label}</a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal-right">
            {sent ? (
              <div style={{ height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",gap:"1.5rem" }}>
                <div style={{ width:"56px",height:"56px",borderRadius:"50%",background:`${C.mint500}18`,border:`1px solid ${C.mint500}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",color:C.mint500 }}>✓</div>
                <h3 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1.6rem",color:C.textPri }}>Transmission received</h3>
                <p className="mono" style={{ fontSize:"0.75rem",color:C.textSec }}>I'll respond within 24 hours.</p>
              </div>
            ) : (
              <div style={{ display:"flex",flexDirection:"column",gap:"1.5rem" }}>
                {[{key:"name",label:"full_name",type:"text"},{key:"email",label:"email_address",type:"email"}].map(f => (
                  <div key={f.key} style={{ display:"flex",flexDirection:"column",gap:"0.5rem" }}>
                    <label className="mono" style={{ fontSize:"0.65rem",color:C.textMuted,letterSpacing:"0.06em" }}>{f.label}</label>
                    <input className="form-input" type={f.type} value={form[f.key]} onChange={e => setForm({...form,[f.key]:e.target.value})} />
                  </div>
                ))}
                <div style={{ display:"flex",flexDirection:"column",gap:"0.5rem" }}>
                  <label className="mono" style={{ fontSize:"0.65rem",color:C.textMuted,letterSpacing:"0.06em" }}>message</label>
                  <textarea className="form-input" rows={5} style={{ resize:"none" }} value={form.message} onChange={e => setForm({...form,message:e.target.value})} />
                </div>
                <button className="btn-primary" onClick={() => setSent(true)} style={{ alignSelf:"flex-start" }}>./send_message.sh →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────
function Footer({ C }) {
  return (
    <footer className="footer-inner" style={{
      padding:"2rem 3rem",borderTop:`1px solid ${C.border}`,
      display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem",
    }}>
      <span className="mono" style={{ fontSize:"0.78rem",color:C.textMuted }}>
        <span style={{ color:C.mint500 }}>[</span>paro@thegreat<span style={{ color:C.coral }}>:~</span><span style={{ color:C.mint500 }}>]</span><span style={{ color:C.textMuted }}>$</span>
      </span>
      <div style={{ display:"flex",gap:"2rem" }}>
        {Object.entries(SOCIAL_LINKS).map(([label,url]) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{
            fontFamily:"'JetBrains Mono',monospace",fontSize:"0.65rem",color:C.textMuted,textDecoration:"none",transition:"color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = C.mint400}
            onMouseLeave={e => e.target.style.color = C.textMuted}
          >{label}</a>
        ))}
      </div>
      <span className="mono" style={{ fontSize:"0.68rem",color:C.textMuted }}>© {new Date().getFullYear()}</span>
    </footer>
  );
}

// ── Scroll Reveal ──────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("vis");
        else e.target.classList.remove("vis");
      });
    }, { threshold:0.1, rootMargin:"0px 0px -40px 0px" });
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── Scroll Spy ─────────────────────────────────────────────────
function useScrollSpy() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const sections = [{id:"home",label:"Home"},{id:"work",label:"Work"},{id:"skills",label:"Skills"},{id:"contact",label:"Contact"}];
    const fn = () => {
      const y = window.scrollY + 120;
      for (let i = sections.length-1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= y) { setActive(sections[i].label); break; }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return active;
}

// ── App ────────────────────────────────────────────────────────
export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const C = makeTokens(isDark);
  const toggle = () => setIsDark(d => !d);
  const active = useScrollSpy();
  useScrollReveal();

  return (
    <ThemeCtx.Provider value={{ isDark, toggle }}>
      <GlobalStyles C={C} />
      <Overlays C={C} />
      <Navbar active={active} C={C} />
      <Hero C={C} />
      <Work C={C} />
      <Skills C={C} />
      <Contact C={C} />
      <Footer C={C} />
    </ThemeCtx.Provider>
  );
}