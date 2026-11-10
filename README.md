# DUN'S GARASI 26 & BODYREPAIR — Website Premium Bengkel Motor

Website profesional untuk bengkel spesialis pengecatan body motor, body repair, modifikasi, dan servis berkala di Bekasi.

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express
- **Icons:** Lucide React
- **Fonts:** Space Grotesk, Sora, Inter (Google Fonts)

## Fitur Utama

✨ **Hero Section** dengan video background cinematic
🎨 **About Section** dengan layout editorial asimetris
🛠️ **Services Section** dengan 5 layanan utama
📸 **Gallery Section** dengan lightbox modal & video player
✅ **Why Choose Us** dengan keunggulan kompetitif
📞 **Contact Section** dengan form konsultasi & integrasi WhatsApp
🎭 **Smooth Animations** menggunakan Framer Motion
📱 **Responsive Design** untuk semua ukuran layar
🌙 **Dark Premium Theme** dengan identitas visual otomotif

## Persiapan Awal

### 1. Install Dependencies

```bash
npm install
```

### 2. Struktur Project

```
dun-s-bodyrepaint-main/
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   ├── detail.png
│   │   ├── cat1.jpeg
│   │   ├── modifikasi.png
│   │   ├── service.png
│   │   └── walogo.png
│   └── videos/
│       └── catvideo.mp4
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Button.jsx
│   │   └── SectionHeading.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Gallery.jsx
│   │   ├── WhyChooseUs.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   ├── workshopInfo.js
│   │   ├── services.js
│   │   └── gallery.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   └── server.js
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .env
```

## Menjalankan Project

### Frontend (Vite Dev Server)

```bash
npm run dev
```

Buka browser ke `http://localhost:3000`

### Backend (Express Server)

Di terminal lain:

```bash
npm run server
```

Server akan berjalan di `http://localhost:5001`

### Build untuk Production

```bash
npm run build
```

Output akan disimpan di folder `dist/`

### Preview Production Build

```bash
npm run preview
```

## Konfigurasi

### Workshop Info

Edit `src/data/workshopInfo.js` untuk mengubah:
- Nomor WhatsApp
- Alamat bengkel
- Jam operasional
- Informasi kontak

### Layanan

Edit `src/data/services.js` untuk menambah/mengubah layanan

### Gallery

Edit `src/data/gallery.js` untuk menambah/mengubah galeri

## Asset Management

Semua asset (gambar, video) tersimpan di folder `assets/` dan akan di-copy ke `public/` saat build.

### Referensi Asset:
- `logo.png` — Logo utama bengkel
- `detail.png` — Informasi layanan & identitas
- `cat1.jpeg` — Dokumentasi body repair
- `modifikasi.png` — Proyek modifikasi Honda PCX
- `service.png` — Dokumentasi servis motor
- `catvideo.mp4` — Video proses pengecatan

## Customization

### Warna (Tailwind Colors)

Update `tailwind.config.js`:
- `bg.primary` — Background utama (#101114)
- `bg.secondary` — Background sekunder (#181A1F)
- `accent.green` — Aksen hijau utama (#A5E849)
- `accent.red` — Aksen merah (#E63B36)
- `text.primary` — Teks utama (#F5F5F5)

### Typography

Update `tailwind.config.js` untuk mengubah font:
- Heading: Space Grotesk / Sora
- Body: Inter

### Animasi

Disable animasi untuk aksesibilitas:
- Modifier Tailwind: `motion-reduce:`
- Dihormati di `src/index.css`

## SEO & Metadata

File `index.html` sudah berisi:
- Meta tags SEO
- Open Graph (OG) tags
- Twitter Card tags
- Canonical URL (jika diperlukan)

Edit untuk menyesuaikan metadata project.

## Performance

✅ Lazy loading gambar
✅ Video optimization
✅ Component splitting dengan React
✅ CSS minification (Tailwind)
✅ Asset compression (Vite)

## Browser Support

- Chrome / Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 Dun's Garasi 26 & Bodyrepair. All rights reserved.

---

**Dibuat dengan presisi dan passion.** 🚀
