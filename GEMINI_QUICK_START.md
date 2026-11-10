# 🚀 QUICK START - GEMINI API INTEGRATION

## ✅ COMPLETED CHANGES

### Files Modified:
1. **`server/chatService-gemini.js`** (NEW) — Gemini API integration with fallbacks
2. **`package.json`** — Added `@google/generative-ai` dependency
3. **`.env`** — Added `GEMINI_API_KEY` field
4. **`server/server.js`** — Updated import to use new chatService-gemini.js

---

## 📦 INSTALLATION (Run in Terminal)

```bash
# Navigate to project
cd "C:\BINTANG\CODING RANDOM BINTANG\dun-s-bodyrepaint-main"

# Install Gemini SDK + all dependencies
npm install
```

---

## 🔑 GET GEMINI API KEY (5 Minutes)

1. Open: https://aistudio.google.com/app/apikey
2. Login with Google account
3. Click "Create API Key"
4. Copy the key
5. Paste into `.env`:
   ```env
   GEMINI_API_KEY=your_key_here
   ```

---

## ▶️ RUN THE PROJECT

### Terminal 1 — Backend (Port 5001)
```bash
npm run server
```
Check: `http://localhost:5001/api/health`

### Terminal 2 — Frontend (Port 5173)
```bash
npm run dev
```

---

## ✅ VERIFY IT WORKS

### Test 1: Greeting
Type: `Halo`
✅ Should get time-aware greeting instantly

### Test 2: Price Query (CRITICAL)
Type: `Berapa harga cat motor?`
✅ Should NOT show any price number
✅ Should suggest WhatsApp admin only

### Test 3: Unknown Service
Type: `Apakah melayani servis AC mobil?`
✅ Should NOT invent new services
✅ Should only mention 5 existing services

### Test 4: Admin Contact
Type: `Saya mau bicara admin`
✅ WhatsApp button should appear
✅ URL: https://wa.me/qr/4MYHW5TLM6LWP1

---

## 🎯 KEY FEATURES IMPLEMENTED

✅ **Gemini 2.5 Flash as Primary AI** (Fast, Smart Responses)
✅ **3-Level Fallback System** (Claude → OpenAI → Local Engine)
✅ **Instant Greeting Detection** (No API call for simple greetings)
✅ **Conversation History** (Last 6-8 messages for context)
✅ **Rate Limiting** (30 req/min per IP — prevents spam)
✅ **Strict Safety Rules** (No fake prices, hours, or services)
✅ **WhatsApp Integration** (Admin contact redirects to official URL)
✅ **Works Offline** (Local engine works without API keys)

---

## 🔧 TROUBLESHOOTING

### Issue: "Module not found: @google/generative-ai"
**Fix:** Run `npm install` again

### Issue: "GEMINI_API_KEY is empty"
**Fix:** 
1. Get key from https://aistudio.google.com/app/apikey
2. Add to `.env` file
3. Restart server

### Issue: Chatbot replies are slow
**Cause:** Gemini API may have latency
**Fix:** System auto-fallsback to Claude/OpenAI/Local in 12 seconds

### Issue: WhatsApp button not clickable
**Check:** Browser console (F12) for errors
**Verify:** Link in `src/data/workshopInfo.js` is correct

---

## 📊 RESPONSE SOURCE TRACKING

Open DevTools → Network → click on chat API call → Response shows `source`:
- `"gemini"` = Using Gemini 2.5 Flash API ✅
- `"greeting-engine"` = Instant greeting (no API)
- `"anthropic"` = Claude fallback (if Gemini fails)
- `"openai"` = OpenAI fallback (if Claude fails)
- `"knowledge-base"` = Local fallback (all APIs error)

---

## 📝 NEXT STEPS

1. ✅ Install dependencies: `npm install`
2. ✅ Get Gemini API key: https://aistudio.google.com/app/apikey
3. ✅ Add key to `.env`: `GEMINI_API_KEY=...`
4. ✅ Run backend: `npm run server`
5. ✅ Run frontend: `npm run dev`
6. ✅ Test all 8 scenarios from GEMINI_SETUP.md
7. ✅ Verify WhatsApp button works

---

**Ready? Start typing in the chatbot! 🤖**
