// server/chatService-gemini.js
// Dun's Assistant - Enhanced AI Customer Service Engine with Gemini API

const SYSTEM_PROMPT = `Kamu adalah "Dun's Assistant", Customer Service Virtual resmi dari "Dun's Garasi 26 & Bodyrepair", bengkel motor spesialis di Bekasi.

IDENTITAS & KARAKTER:
- Nama: Dun's Assistant.
- Karakter: Ramah, sopan, antusias, profesional, natural dalam bahasa Indonesia (tidak kaku seperti robot, gunakan sapaan ramah seperti "Kak").
- Gaya bicara: Ringkas, informatif, dan membantu (1-3 paragraf pendek, mudah dibaca di smartphone).

KNOWLEDGE BASE RESMI (HANYA GUNAKAN DATA INI):
- Nama Bisnis: Dun's Garasi 26 & Bodyrepair
- Alamat: Kp. Paburan RT 001/003, Kel. Cimuning, Kec. Mustika Jaya, Kota Bekasi, Jawa Barat
- WhatsApp Admin: 0895383125741 (format internasional: +62895383125741)
- Link WhatsApp Official: https://wa.me/qr/4MYHW5TLM6LWP1
- Jam Operasional:
  * Senin – Sabtu: 09.00 – 21.00 WIB
  * Minggu: By Appointment / Konfirmasi terlebih dahulu

5 LAYANAN UTAMA BENGKEL (HANYA 5 INI, JANGAN SEBUTKAN LAYANAN LAIN):
1. Body Repair: Perbaikan bagian body motor yang mengalami kerusakan, penyok, retak, atau cacat fisik agar kembali terlihat lebih baik.
2. Cat Motor: Layanan pengecatan ulang motor untuk memberikan tampilan yang lebih segar, bersih, dan menarik.
3. Modifikasi & Bore Up: Layanan modifikasi motor dan bore up sesuai kebutuhan pelanggan.
4. Ganti Oli: Penggantian oli untuk membantu menjaga performa dan kondisi mesin motor.
5. Servis Berkala: Perawatan rutin motor untuk membantu menjaga performa dan memastikan kondisi kendaraan tetap terawat.

ATURAN KETAT (STRICT SAFETY & QUALITY RULES):
1. DILARANG MENGARANG HARGA / BIAYA. Jika ditanya harga, jelaskan dengan sopan bahwa estimasi biaya tergantung jenis motor, kondisi kerusakan bodi, pilihan warna/bahan cat, atau kebutuhan part. Tawarkan untuk langsung konsultasi ke WhatsApp Admin agar dihitung akurat.
2. DILARANG MENGARANG ALAMAT, NOMOR TELEPON, ATAU JAM OPERASIONAL selain yang tertera di atas.
3. DILARANG MENJANJIKAN WAKTU PENGERJAAN PASTI. Waktu pengerjaan bergantung pada antrean dan kondisi motor di bengkel.
4. Tanyakan jenis motor pelanggan jika belum disebutkan (contoh: PCX, NMAX, Vespa, Mio, Beat, dll) agar rekomendasi lebih tepat.
5. Jika pelanggan butuh booking antrean atau detail lanjutan, arahkan untuk klik tombol "Hubungi Admin" atau via WhatsApp.

CONVERSATION CONTEXT HANDLING (PENTING!):
A. SAPAAN MURNI (Halo, Hai, Pagi, Siang, dll tanpa pertanyaan):
   Balas dengan ucapan selamat datang ramah sesuai waktu, perkenalkan diri, tawarkan bantuan.
   Jangan langsung sebutkan daftar layanan.

B. PERTANYAAN LAYANAN:
   Jelaskan layanan yang ditanyakan spesifik. Jangan mengulang daftar seluruh 5 layanan.

C. INFORMASI KENDARAAN:
   Tanggapi antusias, tanyakan kebutuhan pengerjaan. Jangan perlu ulang daftar layanan lengkap.

D. PERTANYAAN HARGA:
   Jangan mengarang. Jelaskan estimasi perlu dikonfirmasi admin berdasarkan kondisi fisik.

E. TERIMA KASIH:
   Balas "Sama-sama Kak! 😊 Senang bisa membantu."

F. PESAN TIDAK JELAS:
   Tanyakan ulang ramah tanpa mengulang daftar layanan lengkap.

LARANGAN KETAT:
- Jangan selalu mulai dengan "Terima kasih infonya Kak" (hanya untuk info spesifik)
- Jangan ulang daftar 5 layanan di setiap balasan
- Jangan ulang salam pembuka berulang
- Gunakan emoji max 1-2 per pesan
- Max 3 paragraf pendek`;

// Intelligent Rule-Based Engine (Fallback when API key is not yet set or during network outage)
export function generateLocalReply(userMessage, history = []) {
  const text = (userMessage || '').toLowerCase().trim();

  // Helper detect vehicle
  let detectedVehicle = null;
  const vehicles = ['pcx', 'nmax', 'vespa', 'mio', 'beat', 'vario', 'aerox', 'scoopy', 'adv', 'klx', 'crf', 'vixion', 'cb150', 'cbr', 'ninja', 'r15', 'rx king', 'rx-king', 'jupiter', 'satria'];
  for (const v of vehicles) {
    if (text.includes(v)) {
      detectedVehicle = v.toUpperCase();
      break;
    }
  }

  // Helper detect service
  let detectedService = null;
  if (text.includes('body repair') || text.includes('retak') || text.includes('pecah') || text.includes('penyok') || text.includes('las plastik') || text.includes('dempul') || text.includes('dudukan patah') || text.includes('baret')) {
    detectedService = 'Body Repair';
  } else if (text.includes('cat') || text.includes('repaint') || text.includes('warna') || text.includes('bunglon') || text.includes('candy') || text.includes('velg') || text.includes('polos')) {
    detectedService = 'Cat Motor';
  } else if (text.includes('bore up') || text.includes('modifikasi') || text.includes('modik') || text.includes('modif') || text.includes('noken') || text.includes('porting') || text.includes('upgrade mesin')) {
    detectedService = 'Modifikasi & Bore Up';
  } else if (text.includes('oli') || text.includes('ganti oli') || text.includes('pelumas')) {
    detectedService = 'Ganti Oli';
  } else if (text.includes('servis') || text.includes('service') || text.includes('tune up') || text.includes('cvt') || text.includes('perawatan')) {
    detectedService = 'Servis Berkala';
  }

  // Check if this is pure greeting (short message with no service/vehicle/question)
  const isGreeting = text.length < 25 && (
    text === 'halo' || text === 'hai' || text === 'hi' ||
    text === 'pagi' || text === 'selamat pagi' || text === 'pagi kak' ||
    text === 'siang' || text === 'selamat siang' || text === 'siang kak' ||
    text === 'sore' || text === 'selamat sore' || text === 'sore kak' ||
    text === 'malam' || text === 'selamat malam' || text === 'malam kak' ||
    text === 'permisi' || text === 'assalamualaikum' || text === 'assalamu alaikum' ||
    text.startsWith('halo') || text.startsWith('hai') || text.startsWith('hi ')
  ) && !detectedService && !detectedVehicle && !text.includes('?');

  // 0. Pure Greeting Response (Matches exact requested copy)
  if (isGreeting) {
    const timeNow = new Date();
    const hour = timeNow.getHours();
    let greeting = 'Halo';
    if (hour >= 5 && hour < 11) greeting = 'Selamat pagi';
    else if (hour >= 11 && hour < 15) greeting = 'Selamat siang';
    else if (hour >= 15 && hour < 18) greeting = 'Selamat sore';
    else if (hour >= 18 || hour < 5) greeting = 'Selamat malam';

    return {
      reply: `${greeting} Kak! 👋\n\nTerima kasih telah menghubungi **Dun's Garasi 26 & Bodyrepair**.\n\nSaya **Dun's Assistant**, siap membantu Kakak mendapatkan informasi seputar layanan bengkel kami.\n\nAda yang bisa kami bantu hari ini? 😊`,
      detectedService: null,
      detectedVehicle: null,
      suggestAdmin: false,
      isGreeting: true,
    };
  }

  // 1. Thank You Response
  if (text.includes('terima kasih') || text.includes('terimakasih') || text === 'makasih' || text === 'thanks' || text === 'thank you') {
    return {
      reply: `Sama-sama Kak! 😊\n\nSenang bisa membantu. Jika ada pertanyaan lagi seputar motor atau layanan bengkel kami, jangan ragu untuk chat lagi ya!`,
      detectedService: null,
      detectedVehicle: null,
      suggestAdmin: false,
    };
  }

  // 2. Asking about Price / Cost
  if (text.includes('harga') || text.includes('biaya') || text.includes('berapa') || text.includes('ongkos') || text.includes('tarif') || text.includes('pricelist')) {
    return {
      reply: `Halo Kak! Untuk estimasi biaya ${detectedService ? `layanan *${detectedService}*` : 'pengerjaan'}, biayanya disesuaikan dengan kondisi motor, tingkat kerusakan, serta pilihan bahan/warna cat yang diinginkan agar hasilnya maksimal. \n\nBoleh tahu jenis motor Kakak apa? Kakak juga bisa langsung klik tombol **Hubungi Admin** via WhatsApp untuk kirim foto kondisi motor dan dapat estimasi rinciannya ya! 😊`,
      detectedService,
      detectedVehicle,
      suggestAdmin: true,
    };
  }

  // 2. Asking about Location / Address
  if (text.includes('alamat') || text.includes('lokasi') || text.includes('dimana') || text.includes('bengkelnya dimana') || text.includes('daerah')) {
    return {
      reply: `Bengkel **Dun's Garasi 26 & Bodyrepair** berlokasi di:\n\n📍 **Kp. Paburan RT 001/003, Kel. Cimuning, Kec. Mustika Jaya, Kota Bekasi**.\n\nKakak bisa cek langsung petunjuk arah Google Maps di bagian bawah website ini atau hubungi WhatsApp kami jika butuh share location ya!`,
      detectedService,
      detectedVehicle,
      suggestAdmin: false,
    };
  }

  // 3. Asking about Hours
  if (text.includes('jam buka') || text.includes('jam operasional') || text.includes('buka jam') || text.includes('hari apa') || text.includes('tutup jam') || text.includes('jadwal')) {
    return {
      reply: `Berikut jadwal operasional bengkel kami ya Kak:\n\n⏱️ **Senin – Sabtu:** 09.00 – 21.00 WIB\n📅 **Minggu:** By Appointment / Konfirmasi terlebih dahulu\n\nAda rencana mau mampir atau bawa motor hari apa Kak?`,
      detectedService,
      detectedVehicle,
      suggestAdmin: false,
    };
  }

  // 4. Specific Service: Body Repair
  if (detectedService === 'Body Repair') {
    return {
      reply: `Untuk **Body Repair** di Dun's Garasi 26, kami menangani perbaikan bodi motor yang pecah, retak, penyok, hingga dudukan baut yang patah agar kembali rapi dan kokoh. Kami mengutamakan teknik las plastik dan perataan presisi.\n\nBoleh diceritakan bagian bodi mana yang rusak dan jenis motor apa yang Kakak miliki?`,
      detectedService,
      detectedVehicle,
      suggestAdmin: true,
    };
  }

  // 5. Specific Service: Cat Motor
  if (detectedService === 'Cat Motor') {
    return {
      reply: `Layanan **Cat Motor** kami siap memberikan tampilan baru yang segar, bersih, dan memikat! Kami melayani full body repaint, cat velg, maupun peremajaan komponen dengan cat PU berkualitas dan clear coat glossy wet look.\n\nKakak ada konsep warna tertentu (misal: solid, metallic, candy tone, bunglon) dan untuk motor jenis apa nih?`,
      detectedService,
      detectedVehicle,
      suggestAdmin: true,
    };
  }

  // 6. Specific Service: Modifikasi & Bore Up
  if (detectedService === 'Modifikasi & Bore Up') {
    return {
      reply: `Di Dun's Garasi 26, kami melayani **Modifikasi & Bore Up** sesuai kebutuhan pelanggan — baik untuk konsep tampilan harian/touring yang ganteng maupun peningkatan performa mesin yang aman dan terukur.\n\nKira-kira konsep apa yang ingin Kakak wujudkan untuk motor kesayangannya?`,
      detectedService,
      detectedVehicle,
      suggestAdmin: true,
    };
  }

  // 7. Specific Service: Ganti Oli
  if (detectedService === 'Ganti Oli') {
    return {
      reply: `Layanan **Ganti Oli** kami siap membantu menjaga performa dan keawetan mesin motor Kakak agar tarikan tetap halus dan mesin tidak cepat panas.\n\nKakak mau ganti oli mesin rutin atau sekalian cek transmisi/gardan? Boleh sebutkan jenis motornya ya Kak!`,
      detectedService,
      detectedVehicle,
      suggestAdmin: false,
    };
  }

  // 8. Specific Service: Servis Berkala
  if (detectedService === 'Servis Berkala') {
    return {
      reply: `Untuk **Servis Berkala**, kami menyediakan perawatan rutin komprehensif mulai dari pembersihan sistem bahan bakar, servis CVT/rantai, pengecekan pengereman, hingga kelistrikan agar motor selalu aman dan nyaman dipakai harian.\n\nMotornya jenis apa Kak, dan kapan terakhir kali diservis berkala?`,
      detectedService,
      detectedVehicle,
      suggestAdmin: false,
    };
  }

  // 9. Contact / WhatsApp Request
  if (text.includes('admin') || text.includes('whatsapp') || text.includes('wa') || text.includes('kontak') || text.includes('hubungi') || text.includes('nomor')) {
    return {
      reply: `Kakak bisa langsung terhubung dengan Admin Dun's Garasi 26 via WhatsApp di nomor **0895383125741** atau cukup klik tombol hijau **Hubungi Admin** di bawah ya! Admin siap membantu konsultasi langsung. 😊`,
      detectedService,
      detectedVehicle,
      suggestAdmin: true,
    };
  }

  // 10. User mentioned vehicle only (without service question)
  if (detectedVehicle && !detectedService) {
    return {
      reply: `Mantap, motor **${detectedVehicle}** Kakak! 👍\n\nUntuk ${detectedVehicle}, kami bisa bantu Body Repair, Cat Motor, Modifikasi & Bore Up, Ganti Oli, atau Servis Berkala.\n\nBagian mana yang ingin dikerjakan atau ada masalah apa yang perlu diperbaiki Kak?`,
      detectedService: null,
      detectedVehicle,
      suggestAdmin: false,
    };
  }

  // 11. General service inquiry (asking about "layanan" or "menu")
  if (text.includes('layanan') || text.includes('menu') || text.includes('apa aja') || text.includes('apa saja')) {
    return {
      reply: `Dun's Garasi 26 & Bodyrepair melayani 5 layanan utama:\n\n1. 🛠️ **Body Repair** — Perbaikan bodi pecah, retak, penyok\n2. 🎨 **Cat Motor** — Pengecatan ulang motor\n3. 🔥 **Modifikasi & Bore Up** — Modif sesuai kebutuhan\n4. 💧 **Ganti Oli** — Penggantian oli mesin\n5. ⚙️ **Servis Berkala** — Perawatan rutin motor\n\nAda yang ingin Kakak konsultasikan untuk motor kesayangannya?`,
      detectedService: null,
      detectedVehicle,
      suggestAdmin: false,
    };
  }

  // 12. Default friendly guidance (unclear message)
  return {
    reply: `Boleh Kakak ceritakan lebih detail kebutuhan atau kondisi motornya?\n\nKami siap bantu **Body Repair, Cat Motor, Modifikasi & Bore Up, Ganti Oli, dan Servis Berkala**.\n\nAtau kalau mau langsung konsultasi dengan Admin via WhatsApp, silakan klik tombol **Hubungi Admin** ya Kak! 😊`,
    detectedService: null,
    detectedVehicle: null,
    suggestAdmin: true,
  };
}

// Function to call Groq API (PRIMARY AI)
async function callGroqAPI(userMessage, conversationHistory = []) {
  const groqKey = process.env.GROQ_API_KEY;

  if (!groqKey) {
    console.warn('⚠️ GROQ_API_KEY tidak ditemukan.');
    return null;
  }

  const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .slice(-8)
        .map(m => ({
          role: m.role,
          content: String(m.content || ''),
        })),
      { role: 'user', content: userMessage },
    ];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    let res;

    try {
      res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 500,
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    const data = await res.json();

    if (!res.ok) {
      console.error(
        `❌ Groq API gagal (${res.status}):`,
        data.error?.message || 'Unknown error'
      );
      return null;
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply || !reply.trim()) {
      console.warn('⚠️ Groq menghasilkan respons kosong.');
      return null;
    }

    console.log(`✅ Groq berhasil menggunakan model: ${model}`);

    return {
      reply: reply.trim(),
      source: 'groq',
      model,
      suggestAdmin: /admin|whatsapp|hubungi/i.test(reply),
    };

  } catch (error) {
    console.warn('⚠️ Groq API gagal:', error.message);
    return null;
  }
}

// Helper: Check if error is retryable (temporary server issues)

function getGeminiErrorStatus(error) {
  const status = Number(
    error?.status ||
    error?.statusCode ||
    error?.code
  );

  if (Number.isFinite(status) && status >= 100 && status <= 599) {
    return status;
  }

  const message = error?.message || String(error);
  const match = message.match(/\b(400|401|403|404|429|500|502|503|504)\b/);

  return match ? Number(match[1]) : null;
}


// Helper: Delay for exponential backoff
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function to get AI response
// Priority: Groq → Gemini → Claude → Local Knowledge Base

export async function getAiResponse(userMessage, conversationHistory = []) {

  // 1. Greeting engine
  const localPrecheck = generateLocalReply(
    userMessage,
    conversationHistory
  );

  if (
    localPrecheck &&
    (
      localPrecheck.isGreeting ||
      (
        !localPrecheck.suggestAdmin &&
        localPrecheck.reply.includes(
          'Terima kasih telah menghubungi'
        )
      )
    )
  ) {
    return {
      ...localPrecheck,
      source: 'greeting-engine',
    };
  }

  // 2. Groq sebagai AI utama
  console.log('🚀 Menggunakan Groq sebagai AI utama...');

  const groqResult = await callGroqAPI(
    userMessage,
    conversationHistory
  );

  if (groqResult) {
    return groqResult;
  }

  console.warn('⚠️ Groq gagal. Beralih ke Gemini...');

  // 3. Gemini sebagai AI cadangan
  if (process.env.GEMINI_API_KEY) {
    try {
      const geminiResult = await callGeminiAPI(
        userMessage,
        conversationHistory
      );

      if (geminiResult) {
        console.log('✅ Menggunakan Gemini sebagai cadangan.');
        return geminiResult;
      }
    } catch (error) {
      console.warn('⚠️ Gemini fallback gagal:', error.message);
    }
  }

  // 4. Claude sebagai AI cadangan berikutnya
  const claudeResult = await callClaudeAPI(
    userMessage,
    conversationHistory
  );

  if (claudeResult) {
    return claudeResult;
  }

  // 5. Knowledge Base lokal
  console.warn('⚠️ Semua AI gagal. Menggunakan Knowledge Base lokal.');

  const localResult = generateLocalReply(
    userMessage,
    conversationHistory
  );

  return {
    ...localResult,
    source: 'knowledge-base',
  };
}

// Function to call Gemini AI API with @google/genai v3.0.0 + Retry Mechanism

async function callGeminiAPI(userMessage, conversationHistory = []) {
  const MODELS = [
    process.env.GEMINI_MODEL || 'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.6-flash',
  ].filter((model, index, array) => array.indexOf(model) === index);

  const MAX_RETRIES_PER_MODEL = 2;
  const RETRY_DELAY = 1000;

  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const historyContext = conversationHistory
    .slice(-6)
    .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
    .join('\n');

  const fullPrompt = `${SYSTEM_PROMPT}

Conversation History:
${historyContext}

User: ${userMessage}

Assistant:`;

  let lastError;

  for (const model of MODELS) {
    console.log(`🤖 Mencoba Gemini model: ${model}`);

    for (let attempt = 1; attempt <= MAX_RETRIES_PER_MODEL; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: [
            {
              role: 'user',
              parts: [{ text: fullPrompt }],
            },
          ],
          config: {
            temperature: 0.7,
            maxOutputTokens: 500,
            topP: 0.8,
            topK: 40,
          },
        });

        const reply = response.text;

        if (!reply || !reply.trim()) {
          throw new Error('Gemini menghasilkan respons kosong');
        }

        console.log(`✅ Gemini berhasil menggunakan model: ${model}`);

        return {
          reply,
          source: 'gemini',
          model,
          suggestAdmin:
            /admin|whatsapp|hubungi/i.test(reply),
        };

      } catch (error) {
        lastError = error;

        const status = getGeminiErrorStatus(error);

        console.warn(
          `⚠️ Model ${model} gagal (percobaan ${attempt}/${MAX_RETRIES_PER_MODEL}). Status: ${status || 'UNKNOWN'}`
        );

        // API Key atau izin akses bermasalah.
        // Tidak perlu mencoba model lain dengan kredensial yang sama.
        if (status === 401 || status === 403) {
          console.error('❌ API Key atau izin Gemini bermasalah.');
          throw error;
        }

        // Rate limit: tidak mengulang model yang sama.
        // Langsung mencoba model alternatif.
        if (status === 429) {
          console.warn(`⚠️ Rate limit pada ${model}, mencoba model alternatif.`);
          break;
        }

        // Model tidak ditemukan atau tidak tersedia.
        if (status === 404) {
          console.warn(`⚠️ Model ${model} tidak tersedia, beralih ke model berikutnya.`);
          break;
        }

        // Gangguan sementara: retry satu kali.
        if ([500, 502, 503, 504].includes(status) || status === null) {
          if (attempt < MAX_RETRIES_PER_MODEL) {
            const delay = RETRY_DELAY * Math.pow(2, attempt - 1);

            console.log(`   🔄 Retry dalam ${delay}ms...`);
            await sleep(delay);
          } else {
            console.warn(`❌ Retry habis untuk ${model}.`);
          }

          continue;
        }

        // Error lain: jangan melakukan retry tanpa alasan.
        console.error(`❌ Error Gemini tidak dapat diulang: ${error.message}`);
        break;
      }
    }

    console.log(`➡️ Beralih dari ${model} ke model berikutnya.`);
  }

  console.error('❌ Semua model Gemini gagal.');

  throw lastError || new Error('Semua model Gemini tidak tersedia.');
}


// Function to call Anthropic Claude API (fallback)
async function callClaudeAPI(userMessage, conversationHistory = []) {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) return null;

  try {
    const messages = conversationHistory
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .slice(-8)
      .map(m => ({ role: m.role, content: m.content }));

    messages.push({ role: 'user', content: userMessage });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 450,
        system: SYSTEM_PROMPT,
        messages,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const reply = data.content?.[0]?.text;
      if (reply) {
        return {
          reply,
          source: 'anthropic',
          suggestAdmin: reply.toLowerCase().includes('admin') || reply.toLowerCase().includes('whatsapp'),
        };
      }
    }
  } catch (err) {
    console.warn('Anthropic API fallback:', err.message);
  }
  return null;
}

// Function to call OpenAI API (fallback)
async function callOpenAIAPI(userMessage, conversationHistory = []) {
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) return null;

  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.filter(m => m.role === 'user' || m.role === 'assistant').slice(-8),
      { role: 'user', content: userMessage },
    ];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 450,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) {
        return {
          reply,
          source: 'openai',
          suggestAdmin: reply.toLowerCase().includes('admin') || reply.toLowerCase().includes('whatsapp'),
        };
      }
    }
  } catch (err) {
    console.warn('OpenAI API fallback:', err.message);
  }
  return null;
}

