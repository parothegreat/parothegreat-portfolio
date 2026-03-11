# Moehammad Alvaro Pirata Prayogo - Portfolio Website

Portfolio profesional untuk menampilkan expertise di bidang Cybersecurity, Networking, dan System Administration.

## 🎯 Fitur

- ✅ **Dark/Light Mode Toggle** - Desain responsif dengan tema gelap dan terang
- ✅ **Hero Section** - Landing page yang menarik dengan CTA
- ✅ **About Section** - Profil lengkap dan fokus keahlian
- ✅ **Skills & Expertise** - Showcase skill di cybersecurity, networking, Linux, dan electronics
- ✅ **Certifications** - Display sertifikasi Cisco NetAcad (Network Defense & Ethical Hacker)
- ✅ **Projects** - Portfolio project dan pengalaman
- ✅ **Contact Section** - Open to Work status dan contact information
- ✅ **Responsive Design** - Mobile-friendly dan profesional
- ✅ **Fast Performance** - Built with React + Vite untuk performa optimal

## 📋 Stack Teknologi

- **Framework**: React 18+ dengan Hooks
- **Build Tool**: Vite (next-generation frontend tooling)
- **Styling**: CSS dengan CSS Variables untuk theme switching
- **Package Manager**: npm
- **Responsiveness**: Mobile-first design
- **Performance**: SPA dengan optimized bundling

## 🚀 Quick Start

### 1. Install Node.js

Sebelum memulai, pastikan Anda sudah install Node.js:
- Download dari https://nodejs.org/ (pilih LTS version)
- Install dengan default settings
- Verifikasi instalasi dengan membuka terminal baru dan run:
  ```powershell
  node --version
  npm --version
  ```

### 2. Setup Proyek

Setelah Node.js terinstall:

```powershell
# Navigate ke folder project
cd c:\Users\paron\parothegreat-portfolio

# Install dependencies
npm install

# Start development server (Vite)
npm run dev
```

Development server akan running di `http://localhost:5173` (atau port yang ditampilkan di terminal)

### 3. Build untuk Production

```powershell
npm run build
npm run preview
```

Output akan berada di folder `dist/`

## 📁 Project Structure

```
parothegreat-portfolio/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx          # Navbar dengan dark mode toggle
│   │   ├── Hero.jsx                # Hero section dengan CTA buttons
│   │   ├── About.jsx               # About & profile section
│   │   ├── Skills.jsx              # Skills showcase
│   │   ├── Certifications.jsx      # Certifications display
│   │   ├── Projects.jsx            # Portfolio projects
│   │   ├── ContactSection.jsx      # Contact form
│   │   └── Footer.jsx              # Footer dengan social links
│   ├── App.jsx                     # Root component dengan dark mode state
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles & CSS variables
├── public/                         # Static assets
│   └── images/                     # Project & profile images
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── package.json                    # Project dependencies
└── README.md                        # This file
```

## 🎨 Customization

### Edit Personal Information

Edit file `src/components/Hero.jsx`, `src/components/About.jsx`, dan `src/components/Projects.jsx` untuk mengubah:
- Nama, bio, dan deskripsi
- Email, LinkedIn, GitHub links
- Skill categories dan items
- Certification details
- Project descriptions

### Ubah Warna Theme

Edit `src/index.css` CSS variables di bagian `:root`:

```css
:root {
  --color-accent: #00d4ff;        /* Warna highlight utama */
  --color-accent-dark: #0099cc;   /* Warna highlight gelap */
  --color-bg-light: #ffffff;      /* Background terang */
  --color-bg-dark: #1a1a1a;       /* Background gelap */
  /* ... variabel lainnya ... */
}
```

### Tambah Component Baru

Buat file baru di `src/components/` dengan nama `NamaComponent.jsx`, lalu import ke `src/App.jsx`:

```jsx
import NamaComponent from './components/NamaComponent'

export default function App() {
  return (
    <div className="app">
      <NamaComponent />
    </div>
  )
}
```

## 📝 Content Sections

### ✅ About
- Menampilkan profile dan background sebagai SMK student
- Fokus pada cybersecurity dan networking
- Expertise highlights

### ✅ Skills
Dibagi 4 kategori:
- 🔒 Cybersecurity (Network Defense, Ethical Hacking, Penetration Testing)
- 🌐 Networking (Network Architecture, Cisco, TCP/IP)
- 🐧 Linux & Systems (Administration, Security, Server Config)
- ⚙️ Technical & Other (Electronics, Robotics, AI/ML, Problem Solving)

### ✅ Certifications
- Cisco Network Defense
- Cisco Ethical Hacker
- SMK Industrial Electronics

### ✅ Projects
- Network Infrastructure Lab
- Linux Server Administration
- Robotics & Electronics Projects
- Continuous Learning

### ✅ Contact
- Email: alvaroprayogo38@gmail.com
- LinkedIn: [Profile Link]
- GitHub: @parothegreat
- Open to Work Badge
- Interest Areas

## 🌐 Deployment

### Deploy ke Netlify (Gratis)

1. Push code ke GitHub
2. Go to https://app.netlify.com
3. Connect GitHub repository
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Deploy!

### Deploy ke Vercel (Gratis)

1. Push code ke GitHub
2. Go to https://vercel.com
3. Import project
4. Auto-detect Vite/React settings
5. Deploy!

### Deploy ke GitHub Pages

```powershell
# Build production version
npm run build

# Deploy dist folder to GitHub Pages
# (Configure your GitHub repository settings untuk enable Pages)
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Troubleshooting

**npm install error:**
- Pastikan Node.js sudah terinstall
- Buka terminal baru setelah install Node.js
- Coba delete `node_modules` dan `package-lock.json`, lalu `npm install` lagi

**Dev server tidak jalan:**
```powershell
# Kill existing process
Get-Process node | Stop-Process -Force

# Coba lagi
npm run dev
```

**Port 5173 sudah digunakan:**
```powershell
npm run dev -- --port 5174
```

**Dark mode tidak menyimpan:**
- Pastikan localStorage tidak disabled di browser
- Check browser console untuk errors
- Pastikan index.html ada di root folder

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)
- [Cisco NetAcad](https://www.netacad.com)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

## 🙋 Next Steps

1. **Install Dependencies**: `npm install`
2. **Start Dev Server**: `npm run dev` 
3. **Personalisasi Content**: Update info pribadi, skill, dan project di components
4. **Add Profile Picture**: Buat folder `public/images` dan tambahkan foto
5. **Custom Domain**: Setup domain di registrar
6. **Build & Deploy**: `npm run build` lalu deploy ke Netlify/Vercel
7. **Test Dark Mode**: Verifikasi dark mode berfungsi dan menyimpan preference

## 💡 Tips

- Gunakan React DevTools extension untuk debugging components
- Check network tab di browser DevTools untuk verify production build berfungsi optimal
- Vite HMR (Hot Module Replacement) akan auto-refresh browser saat edit file
- CSS Variables dapat di-inspect dan di-debug via browser DevTools

## 📧 Contact Info

**Full Name**: Moehammad Alvaro Pirata Prayogo  
**Email**: alvaroprayogo38@gmail.com  
**LinkedIn**: https://www.linkedin.com/in/moehammad-alvaro-pirata-prayogo-842a8834a/  
**GitHub**: https://github.com/parothegreat/

---

**Status**: Open to Work 🔓  
**Focus**: Cybersecurity, Network Engineering, System Administration

Built with ❤️ using Astro
