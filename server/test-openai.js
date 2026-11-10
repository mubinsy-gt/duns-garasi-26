import 'dotenv/config';

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || 'gpt-6-luna';

async function testOpenAI() {
  if (!apiKey) {
    console.log('ERROR: OPENAI_API_KEY tidak ditemukan.');
    return;
  }

  console.log('=== OPENAI API TEST ===');
  console.log('Model:', model);

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        input: 'Perkenalkan Dun’s Garasi 26 & Bodyrepair dalam satu kalimat bahasa Indonesia.',
        max_output_tokens: 150
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('STATUS: GAGAL');
      console.log('HTTP:', response.status);
      console.log('Pesan:', data.error?.message || 'Unknown error');
      return;
    }

    const answer = data.output
      ?.flatMap(item => item.content || [])
      .filter(item => item.type === 'output_text')
      .map(item => item.text)
      .join('\n');

    console.log('STATUS: BERHASIL');
    console.log('Respons:', answer || 'Respons diterima, tetapi teks tidak ditemukan.');
  } catch (error) {
    console.log('STATUS: ERROR');
    console.log(error.message);
  }
}

testOpenAI();
