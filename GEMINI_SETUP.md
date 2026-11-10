# 🤖 GEMINI API INTEGRATION - DUN'S ASSISTANT

## ✅ UPGRADE SELESAI

Chatbot **Dun's Assistant** kini menggunakan **Google Gemini API** sebagai otak AI sungguhan.

---

## 🔑 CARA MENDAPATKAN GEMINI API KEY

### 1. Buka Google AI Studio
Kunjungi: **https://aistudio.google.com/app/apikey**

### 2. Login dengan Akun Google
Gunakan akun Google pribadi atau bisnis Anda.

### 3. Buat API Key Baru
- Klik tombol **"Create API Key"**
- Pilih project Google Cloud atau buat baru
- Copy API Key yang dihasilkan

### 4. Simpan API Key
⚠️ **PENTING:** API Key adalah rahasia! Jangan bagikan ke orang lain atau upload ke GitHub.

---

## ⚙️ CARA INSTALASI & SETUP

### 1. Install Dependencies
```bash
npm install
```

### 2. Konfigurasi API Key
Buka file `.env` di root folder project, lalu tambahkan Gemini API Key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**Contoh:**
```env
GEMINI_API_KEY=AIzaSyBx1234567890abcdefghijklmnopqrst
```

### 3. Jalankan Backend Server
```bash
npm run server
```

Server akan berjalan di: `http://localhost:5001`

### 4. Jalankan Frontend (Terminal Baru)
```bash
npm run dev
```

Website akan berjalan di: `http://localhost:5173`

---

## 🧪 CARA TESTING CHATBOT

### Test Scenario 1: Greeting (Sapaan Murni)
**Input:**
```
Halo
```

**Expected Output:**
```
Selamat [pagi/siang/sore/malam] Kak! 👋

Terima kasih telah menghubungi Dun's Garasi 26 & Bodyrepair.

Saya Dun's Assistant, siap membantu Kakak mendapatkan informasi seputar layanan bengkel kami.

Ada yang bisa kami bantu hari ini? 😊
```

---

### Test Scenario 2: Greeting Waktu Spesifik
**Input:**
```
Pagi
```

**Expected Output:**
Sama seperti Scenario 1, dengan greeting disesuaikan waktu.

---

### Test Scenario 3: Tanya Layanan
**Input:**
```
Apa saja layanan bengkel?
```

**Expected Output:**
Daftar 5 layanan utama (Body Repair, Cat Motor, Modifikasi & Bore Up, Ganti Oli, Servis Berkala).

---

### Test Scenario 4: Konsultasi Cat Motor + Kendaraan
**Input:**
```
Saya mau cat motor Vario 160
```

**Expected Output:**
- AI merespons tentang layanan Cat Motor
- Menanyakan konsep warna yang diinginkan
- Menawarkan konsultasi lebih lanjut

---

### Test Scenario 5: ❌ Pertanyaan Harga (CRITICAL TEST)
**Input:**
```
Berapa harga cat motor?
```

**Expected Output:**
- ❌ **TIDAK BOLEH** ada angka harga sama sekali
- ✅ Jelaskan biaya tergantung kondisi motor, warna, bahan cat
- ✅ Muncul tombol **"Hubungi Admin"** (WhatsApp button)
- ✅ Arahkan ke WhatsApp untuk estimasi akurat

---

### Test Scenario 6: Pertanyaan Harga Body Repair
**Input:**
```
Berapa harga body repair?
```

**Expected Output:**
Sama seperti Scenario 5 — **TIDAK BOLEH** ada nominal harga, hanya arahkan ke WhatsApp admin.

---

### Test Scenario 7: ❌ Layanan Tidak Ada (CRITICAL TEST)
**Input:**
```
Apakah melayani servis AC mobil?
```

**Expected Output:**
- ❌ **TIDAK BOLEH** mengatakan "Ya, kami melayani"
- ✅ Jelaskan bengkel fokus pada motor, hanya 5 layanan yang tersedia
- ✅ Tidak mengarang layanan baru

---

### Test Scenario 8: Hubungi Admin
**Input:**
```
Saya mau bicara dengan admin
```

**Expected Output:**
- Nomor WhatsApp admin: **0895383125741**
- Muncul tombol **"Hubungi Admin"** (clickable)
- Link WhatsApp official: `https://wa.me/qr/4MYHW5TLM6LWP1`

---

## 🛡️ SAFETY RULES (WAJIB DIPENUHI)

### 1. ❌ DILARANG MENGARANG HARGA
Chatbot **TIDAK BOLEH** menyebutkan nominal harga dalam bentuk apapun:
- ❌ "Harga cat motor sekitar Rp 500.000"
- ❌ "Biaya body repair mulai dari Rp 200.000"
- ❌ "Estimasi harga sekitar Rp 300.000 - Rp 1.000.000"

✅ **Yang Benar:**
- "Biaya disesuaikan dengan kondisi motor dan pilihan bahan/warna cat"
- "Kakak bisa klik tombol Hubungi Admin untuk estimasi akurat"

---

### 2. ❌ DILARANG MENGARANG LAYANAN
Hanya **5 layanan** yang boleh disebutkan:
1. Body Repair
2. Cat Motor
3. Modifikasi & Bore Up
4. Ganti Oli
5. Servis Berkala

Jika ditanya layanan lain (servis AC mobil, cuci motor, dll), chatbot harus menjelaskan fokus bengkel pada 5 layanan tersebut.

---

### 3. ❌ DILARANG MENGARANG DATA KONTAK
Data resmi yang boleh disebutkan:
- WhatsApp: **0895383125741**
- Link Official: **https://wa.me/qr/4MYHW5TLM6LWP1**
- Alamat: **Kp. Pabuaran RT 001/003, Kel. Cimuning, Kec. Mustika Jaya, Kota Bekasi**
- Jam Operasional: **Senin-Sabtu 09.00-21.00 WIB, Minggu By Appointment**

---

### 4. ✅ GREETING DETECTION HARUS AKURAT
Sapaan murni seperti "Halo", "Hai", "Pagi", "Siang" tanpa pertanyaan harus langsung dijawab dengan greeting response, **TIDAK BOLEH** langsung list daftar layanan.

---

## 🔄 FALLBACK SYSTEM (AI ENGINE PRIORITY)

Sistem chatbot memiliki 4 layer fallback:

### 1. Greeting Engine (Instant Response)
Pure greeting seperti "Halo", "Pagi" diproses langsung tanpa hit API.

### 2. Google Gemini API (Primary AI)
Jika `GEMINI_API_KEY` tersedia, Gemini 2.5 Flash digunakan sebagai otak AI utama (model: `gemini-2.5-flash`).

### 3. Anthropic Claude API (Fallback 1)
Jika Gemini error/tidak tersedia, sistem fallback ke Claude.

### 4. OpenAI GPT API (Fallback 2)
Jika Claude juga tidak tersedia, sistem fallback ke OpenAI.

### 5. Local Knowledge Base (Final Fallback)
Jika semua API tidak tersedia/error, sistem gunakan rule-based engine lokal berkualitas tinggi.

---

## 📊 MONITORING & DEBUGGING

### Check API Status
Buka browser, akses:
```
http://localhost:5001/api/health
```

Response akan menunjukkan API mana yang aktif:
```json
{
  "status": "ok",
  "workshop": "Dun's Garasi 26 & Bodyrepair",
  "aiAssistant": "Dun's Assistant",
  "hasGeminiKey": true,
  "hasAnthropicKey": false,
  "hasOpenaiKey": false,
  "timestamp": "2024-11-08T15:44:22.491Z"
}
```

### Check Chat Response Source
Setiap response chatbot menyertakan field `source`:
- `"greeting-engine"` = Greeting detection instant
- `"gemini"` = Response dari Gemini API
- `"anthropic"` = Response dari Claude API
- `"openai"` = Response dari OpenAI API
- `"knowledge-base"` = Response dari local engine

---

## 💡 TIPS OPTIMASI

### 1. Rate Limiting
Backend sudah dilengkapi rate limiter: **30 request per menit per IP**.
Ini mencegah spam dan abuse pada API.

### 2. Conversation History
Chatbot menyimpan 6-8 pesan terakhir untuk konteks percakapan yang lebih baik.
History tersimpan di `sessionStorage` browser (hilang saat tab ditutup).

### 3. Security
- ✅ API Key disimpan di backend `.env` (AMAN)
- ❌ Frontend React **TIDAK PERNAH** akses API Key
- ✅ Semua AI request melalui backend proxy

---

## 🚀 DEPLOYMENT NOTES

Saat deploy ke production (Vercel, Netlify, dll):

1. **Set Environment Variables** di dashboard hosting:
   ```
   GEMINI_API_KEY=your_key_here
   NODE_ENV=production
   ```

2. **Update VITE_API_URL** sesuai URL backend production.

3. **Pastikan CORS** di `server.js` allow origin production domain.

---

## 📞 SUPPORT

Jika ada masalah atau pertanyaan:
- **Developer:** Hubungi tim development Dun's Garasi 26
- **API Issues:** Check console browser (F12) dan server logs

---

**🎉 Chatbot Dun's Assistant dengan Gemini API siap digunakan!**
