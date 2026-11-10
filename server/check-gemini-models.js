// server/check-gemini-models.js
// Verify available Gemini models using @google/genai v3.0.0
// Run: node server/check-gemini-models.js

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function listAvailableModels() {
  console.log('=== Gemini Model Verification ===\n');

  // Check API Key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ ERROR: GEMINI_API_KEY not found in .env');
    process.exit(1);
  }
  console.log('✅ API Key loaded (hidden for security)\n');

  try {
    // Import SDK
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });

    console.log('Fetching models from Gemini API...\n');

    // List models using SDK
    const pager = await ai.models.list();

    const geminiFlashModels = [];

    // Iterate through models
    for await (const model of pager) {
      const modelName = model.name || '';
      const displayName = model.displayName || modelName;

      // Check if it's a Gemini Flash model
      if (modelName.toLowerCase().includes('gemini') &&
          modelName.toLowerCase().includes('flash') &&
          !modelName.toLowerCase().includes('tts') &&
          !modelName.toLowerCase().includes('image')) {

        // Check supported actions (per SDK docs, uses 'supportedActions')
        const supportedActions = model.supportedActions || [];
        const supportsGenerateContent = supportedActions.includes('generateContent');

        geminiFlashModels.push({
          name: modelName,
          displayName: displayName,
          supportedActions: supportedActions,
          supportsGenerateContent,
          inputTokenLimit: model.inputTokenLimit || 'N/A',
          outputTokenLimit: model.outputTokenLimit || 'N/A',
        });
      }
    }

    // Sort by name
    geminiFlashModels.sort((a, b) => a.name.localeCompare(b.name));

    console.log('=== Gemini Flash Models (generateContent support) ===\n');

    if (geminiFlashModels.length === 0) {
      console.log('⚠️ No Gemini Flash models found.');
      console.log('This might indicate API access restrictions.\n');
    } else {
      geminiFlashModels.forEach(m => {
        const status = m.supportsGenerateContent ? '✅' : '❌';
        console.log(`${status} ${m.name}`);
        console.log(`   Display: ${m.displayName}`);
        console.log(`   generateContent: ${m.supportsGenerateContent ? 'YES' : 'NO'}`);
        console.log(`   Supported Actions: ${m.supportedActions.length > 0 ? m.supportedActions.join(', ') : 'none'}`);
        console.log(`   Tokens: ${m.inputTokenLimit} in / ${m.outputTokenLimit} out\n`);
      });
    }

    console.log(`Total Gemini Flash models found: ${geminiFlashModels.length}`);
    console.log(`Models with generateContent: ${geminiFlashModels.filter(m => m.supportsGenerateContent).length}\n`);

    // Check current configured model
    const currentModel = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
    const modelFound = geminiFlashModels.find(m =>
      m.name === currentModel ||
      m.name === `models/${currentModel}` ||
      m.name.endsWith(`/${currentModel}`)
    );

    console.log('=== Current Configuration ===');
    console.log(`Configured model: ${currentModel}`);

    if (modelFound) {
      console.log(`Status: ✅ ACCESSIBLE`);
      console.log(`generateContent: ${modelFound.supportsGenerateContent ? 'YES' : 'NO'}`);
    } else {
      console.log(`Status: ⚠️ NOT FOUND in accessible models`);
      console.log(`The model may not be available for your API key or region.`);

      // Recommend alternatives
      const availableModels = geminiFlashModels.filter(m => m.supportsGenerateContent);
      if (availableModels.length > 0) {
        console.log('\nRecommended alternatives:');
        availableModels.slice(0, 3).forEach(m => {
          console.log(`  - ${m.name}`);
        });
      }
    }

    console.log('\n=== Verification Complete ===\n');

  } catch (error) {
    console.error('\n❌ API Error:', error.message);

    if (error.message?.includes('401') || error.message?.includes('API_KEY')) {
      console.error('   Invalid API Key. Please check your GEMINI_API_KEY in .env');
    } else if (error.message?.includes('403')) {
      console.error('   Permission denied. API Key may not have access to this API.');
    } else if (error.message?.includes('429')) {
      console.error('   Rate limited. Please try again later.');
    } else if (error.message?.includes('503')) {
      console.error('   Service unavailable. Gemini API is temporarily overloaded.');
    }

    process.exit(1);
  }
}

listAvailableModels();
