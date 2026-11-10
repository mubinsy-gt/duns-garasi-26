// server/test-gemini-generation.js
// Test Gemini API generation using @google/genai v3.0.0
// Run: node server/test-gemini-generation.js

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function testGeminiGeneration() {
  console.log('=== Gemini Generation Test ===\n');

  // Check API Key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ ERROR: GEMINI_API_KEY not found in .env');
    process.exit(1);
  }
  console.log('✅ API Key loaded (hidden for security)\n');

  // Get model name, default to gemini-3.8-flash
  const modelName = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
  console.log(`Using model: ${modelName}\n`);

  // Test prompt in Indonesian
  const testPrompt = 'Jawab dalam bahasa Indonesia: Sebutkan tiga layanan bengkel body repair.';

  try {
    // Initialize SDK
    const ai = new GoogleGenAI({ apiKey });

    console.log('Sending test prompt...\n');

    // Generate content using official v3 SDK format
    const result = await ai.models.generateContent({
      model: modelName,
      contents: testPrompt
    });

    // Extract text from response
    const responseText = result.text || 'No text in response';

    console.log('=== Response ===\n');
    console.log('Status: ✅ SUCCESS');
    console.log(`Model: ${modelName}`);
    console.log(`\nPrompt: ${testPrompt}`);
    console.log(`\nResponse: ${responseText}\n`);

  } catch (error) {
    console.error('\n=== Error ===\n');

    const errorMessage = error.message || 'Unknown error';

    // Handle specific error codes
    if (error.message?.includes('503') || errorMessage.includes('503')) {
      console.error('❌ Status: FAILED (503 Service Unavailable)');
      console.error('   The Gemini API is temporarily unavailable.');
      console.error('   Please try again later.\n');
    } else if (error.message?.includes('429') || errorMessage.includes('429')) {
      console.error('❌ Status: FAILED (429 Rate Limited)');
      console.error('   You have exceeded the rate limit.');
      console.error('   Please try again later.\n');
    } else if (error.message?.includes('404') || errorMessage.includes('404')) {
      console.error('❌ Status: FAILED (404 Not Found)');
      console.error('   The model may not exist or is not available.');
      console.error(`   Current model: ${modelName}\n`);
    } else if (error.message?.includes('401') || errorMessage.includes('401') || error.message?.includes('API_KEY') || errorMessage.includes('API_KEY')) {
      console.error('❌ Status: FAILED (401 Unauthorized)');
      console.error('   Invalid API Key. Please check your GEMINI_API_KEY in .env\n');
    } else if (error.message?.includes('403') || errorMessage.includes('403')) {
      console.error('❌ Status: FAILED (403 Forbidden)');
      console.error('   Permission denied. API Key may not have access to this API.\n');
    } else {
      console.error(`❌ Status: FAILED`);
      console.error(`   Error: ${errorMessage}\n`);
    }

    console.error('Error details:', error);
    process.exit(1);
  }
}

testGeminiGeneration();
