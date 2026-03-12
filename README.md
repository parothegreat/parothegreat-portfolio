# Moehammad Alvaro Pirata Prayogo — Portfolio

Portfolio profesional untuk menampilkan expertise di bidang Cybersecurity, Networking, dan System Administration.

**Live identity**: `paro@thegreat` | Jakarta, ID

---

## 🎯 Sections

| Section | Description |
|---------|-------------|
| **Hero** | Terminal typewriter intro + CTA |
| **Work** | Selected engagements (SentinelNet, VaultOps, PhantomNet Lab, CoreFabric) |
| **Skills** | Network Eng · Cybersecurity · Sysadmin · Cloud & Infra |
| **Certifications** | OSCP, CCNP, CEH, RHCE, Security+, AWS SAA |
| **Contact** | Email, Signal, PGP Key, social links |

---

## 📋 Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Inline CSS-in-JS dengan Brand Token system (`const C = { ... }`)
- **Fonts**: DM Serif Display · DM Sans · JetBrains Mono (Google Fonts)
- **Single file**: Semua komponen dalam `src/App.jsx`

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development server (http://localhost:5173)
npm run dev

# Production build
npm run build
npm run preview
```

---

## 🎨 Brand Tokens

Semua warna dikontrol lewat objek `C` di bagian atas `App.jsx`:

```js
const C = {
  bgBase:    "#0A000F",   // Background utama
  bgCard:    "#131619",   // Card / hover state
  bgCard2:   "#1A1E22",   // Input fields
  border:    "#252A2F",   // Semua garis
  textPri:   "#F0F4F8",   // Heading & teks utama
  textSec:   "#8A95A0",   // Body text
  textMuted: "#5E6873",   // Label, tag, metadata
  mint500:   "#00E5A0",   // Aksen utama (CTA, active nav, glow)
  mint400:   "#33EBB3",   // Hover mint
  lime:      "#C8F135",   // Aksen AWS / infra
  coral:     "#FF6B6B",   // Aksen security / danger
  amber:     "#FFB830",   // Aksen RHCE
  violet:    "#A788FA",   // Aksen pentest / violet
  blue:      "#00A3FF",   // Aksen networking
};
```

Untuk mengubah warna, cukup edit nilai hex di objek ini — semua komponen akan ikut berubah.

---

## 📁 File Structure (Single-File Architecture)

```
src/
├── App.jsx          ← Semua komponen: GlobalStyles, Overlays,
│                      TerminalLine, Navbar, Hero, Work,
│                      Skills, Contact, Footer, useScrollSpy
├── main.jsx         ← React entry point
└── index.css        ← Global base styles (Tailwind + custom)
```

---

## ✏️ Cara Kustomisasi

### Ganti data project
Edit array `PROJECTS` di bagian atas `App.jsx`:
```js
const PROJECTS = [
  {
    id: "01",
    title: "Nama Project",
    category: "Kategori",
    desc: "Deskripsi singkat...",
    tags: ["Tool1", "Tool2", "Tool3"],
    year: "2024",
    accent: C.coral,   // pilih warna dari brand token
  },
  // ...
];
```

### Ganti skills
Edit array `SKILLS`:
```js
const SKILLS = [
  {
    category: "Network Eng.",
    items: ["Cisco / Juniper", "BGP / OSPF", ...],
    accent: C.blue,
  },
  // ...
];
```

### Ganti sertifikasi
Edit array `CERTS`:
```js
const CERTS = [
  { name: "OSCP", full: "Offensive Security Certified Professional", color: C.coral },
  // ...
];
```

### Ganti info kontak
Cari di fungsi `Contact()`, edit array contact info:
```js
["Email",    "alvaroprayogo38@gmail.com", C.mint500],
["Signal",   "@alvaroprayogo",            null],
["Based in", "Jakarta, Indonesia",        null],
```

### Ganti terminal typewriter text
Cari di fungsi `Hero()`, edit `TerminalLine` props:
```jsx
<TerminalLine text="whoami" delay={600} />
<TerminalLine text="parothegreat -- securing networks, hardening systems, hunting threats" delay={1100} color={C.textSec} />
```

---

## 👤 Personal Info

| Field | Value |
|-------|-------|
| **Full Name** | Moehammad Alvaro Pirata Prayogo |
| **Alias** | `paro@thegreat` |
| **Email** | alvaroprayogo38@gmail.com |
| **Signal** | @alvaroprayogo |
| **GitHub** | https://github.com/parothegreat/ |
| **LinkedIn** | https://www.linkedin.com/in/moehammad-alvaro-pirata-prayogo-842a8834a/ |
| **HackTheBox** | parothegreat |
| **TryHackMe** | parothegreat |
| **Based in** | Jakarta, Indonesia |
| **Status** | 🟢 Available for hire |

---

## 🏅 Certifications (in portfolio)

| Cert | Full Name | Color Accent |
|------|-----------|-------------|
| OSCP | Offensive Security Certified Professional | Coral |
| CCNP | Cisco Certified Network Professional | Blue |
| CEH | Certified Ethical Hacker | Violet |
| RHCE | Red Hat Certified Engineer | Amber |
| CompTIA Security+ | CompTIA Security+ | Mint |
| AWS SAA | AWS Solutions Architect Associate | Lime |

---

## 🌐 Deployment

### Vercel (recommended)
```bash
npm run build
# Push ke GitHub → import di vercel.com → auto-deploy
```

### Netlify
```bash
npm run build
# Upload folder dist/ atau connect GitHub repo
```

### GitHub Pages
```bash
npm run build
# Deploy isi folder dist/ ke branch gh-pages
```

---

## 🔧 Troubleshooting

```bash
# Error npm install
rm -rf node_modules package-lock.json
npm install

# Port sudah dipakai
npm run dev -- --port 5174

# Reset & clean build
rm -rf dist
npm run build
```

---

**Focus**: Cybersecurity · Network Engineering · System Administration  
**Status**: Open to Work 🔓  
Built with React + Vite
