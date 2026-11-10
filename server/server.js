import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAiResponse } from './chatService-gemini.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is loaded whether run from root or server directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Basic in-memory rate limiter for chat endpoint
const chatRateLimit = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30;

function rateLimiter(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const clientData = chatRateLimit.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > clientData.resetTime) {
    clientData.count = 0;
    clientData.resetTime = now + RATE_LIMIT_WINDOW_MS;
  }

  clientData.count += 1;
  chatRateLimit.set(ip, clientData);

  if (clientData.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      message: 'Terlalu banyak permintaan chat. Mohon tunggu sebentar ya Kak.',
    });
  }

  next();
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    workshop: "Dun's Garasi 26 & Bodyrepair",
    aiAssistant: "Dun's Assistant",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    hasAnthropicKey: Boolean(process.env.ANTHROPIC_API_KEY),
    hasOpenaiKey: Boolean(process.env.OPENAI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// AI Customer Service Chatbot Endpoint
app.post('/api/chat', rateLimiter, async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Pesan tidak boleh kosong.',
      });
    }

    if (message.length > 800) {
      return res.status(400).json({
        success: false,
        message: 'Pesan terlalu panjang (maksimal 800 karakter).',
      });
    }

    // Call AI or local conversational knowledge base
    const chatResult = await getAiResponse(message.trim(), Array.isArray(history) ? history : []);

    return res.json({
      success: true,
      reply: chatResult.reply,
      detectedService: chatResult.detectedService || null,
      detectedVehicle: chatResult.detectedVehicle || null,
      suggestAdmin: Boolean(chatResult.suggestAdmin),
      source: chatResult.source || 'knowledge-base',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({
      success: false,
      message: 'Maaf Kak, terjadi kendala saat memproses jawaban. Silakan coba lagi atau langsung hubungi admin WhatsApp kami.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Consultation Booking Endpoint
app.post('/api/consultation', (req, res) => {
  const { name, phone, vehicle, service, message } = req.body;

  if (!name || !phone || !vehicle || !service) {
    return res.status(400).json({
      success: false,
      message: 'Field nama, nomor WhatsApp, jenis kendaraan, dan layanan wajib diisi.',
    });
  }

  res.json({
    success: true,
    message: 'Data konsultasi berhasil diterima. Anda akan diarahkan ke WhatsApp.',
    data: {
      name,
      phone,
      vehicle,
      service,
      message: message || '',
      timestamp: new Date().toISOString(),
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan.',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server.',
  });
});

// Jalankan server hanya ketika file dieksekusi secara langsung
const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === __filename;

if (isDirectRun) {
  app.listen(PORT, () => {
    console.log(`🚀 Dun's Garasi 26 Server running on http://localhost:${PORT}`);
    console.log(`🤖 Dun's Assistant Chat API: http://localhost:${PORT}/api/chat`);
  });
}

// Export aplikasi untuk Vercel
export default app;