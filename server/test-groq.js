import 'dotenv/config';

const apiKey = process.env.GROQ_API_KEY;
const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

async function testGroq() {
  if (!apiKey) {
    console.log('ERROR: GROQ_API_KEY tidak ditemukan.');
    return;
  }

  console.log('=== GROQ API TEST ===');
  console.log('Model:', model);

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'user',
            content: 'Perkenalkan Dun’s Garasi 26 & Bodyrepair dalam satu kalimat bahasa Indonesia.'
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('STATUS: GAGAL');
      console.log('HTTP:', response.status);
      console.log('Pesan:', data.error?.message || 'Unknown error');
      return;
    }

    console.log('STATUS: BERHASIL');
    console.log('Respons:', data.choices?.[0]?.message?.content || 'Respons kosong.');
  } catch (error) {
    console.log('STATUS: ERROR');
    console.log(error.message);
  }
}

testGroq();
