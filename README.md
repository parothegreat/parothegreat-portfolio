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
- ✅ **Fast Performance** - Built with Astro untuk performa optimal

## 📋 Stack Teknologi

- **Framework**: Astro 4.x
- **Styling**: CSS dengan CSS Variables untuk theme switching
- **Responsiveness**: Mobile-first design
- **Performance**: Static site generation

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

# Start development server
npm run dev
```

Development server akan running di `http://localhost:3000`

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
│   │   ├── NavComponent.astro      # Navigation bar dengan dark mode toggle
│   │   └── FooterComponent.astro   # Footer dengan contact links
│   ├── layouts/
│   │   └── Layout.astro            # Main layout wrapper
│   └── pages/
│       └── index.astro             # Main portfolio page
├── astro.config.mjs                # Astro configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Project dependencies
└── README.md                        # This file
```

## 🎨 Customization

### Edit Personal Information

Edit file `src/pages/index.astro` untuk mengubah:
- Nama, bio, dan deskripsi
- Email, LinkedIn, GitHub links
- Skill categories dan items
- Certification details
- Project descriptions

### Ubah Warna Theme

Edit `src/layouts/Layout.astro` CSS variables di bagian `:root`:

```css
:root {
  --color-accent: #00d4ff;        /* Warna highlight utama */
  --color-accent-dark: #0099cc;   /* Warna highlight gelap */
  /* ... variabel lainnya ... */
}
```

### Tambah Section Baru

Copy salah satu section di `src/pages/index.astro` dan modifikasi sesuai kebutuhan.

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
4. Auto-detect Astro settings
5. Deploy!

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

**Port 3000 sudah digunakan:**
```powershell
npm run dev -- --port 3001
```

## 📚 Resources

- [Astro Documentation](https://docs.astro.build)
- [Cisco NetAcad](https://www.netacad.com)
- [MDN Web Docs](https://developer.mozilla.org)

## 🙋 Next Steps

1. **Personalisasi Content**: Update info pribadi, skill, dan project
2. **Add Profile Picture**: Buat folder `public/images` dan tambahkan foto
3. **Custom Domain**: Setup domain di registrar
4. **Add Blog**: (Optional) Tambah blog section dengan Astro collections
5. **SEO Optimization**: Update meta tags sesuai kebutuhan

## 📧 Contact Info

**Full Name**: Moehammad Alvaro Pirata Prayogo  
**Email**: alvaroprayogo38@gmail.com  
**LinkedIn**: https://www.linkedin.com/in/moehammad-alvaro-pirata-prayogo-842a8834a/  
**GitHub**: https://github.com/parothegreat/

---

**Status**: Open to Work 🔓  
**Focus**: Cybersecurity, Network Engineering, System Administration

Built with ❤️ using Astro
