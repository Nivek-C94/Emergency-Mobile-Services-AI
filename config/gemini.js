const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-pro';

let GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
if (process.env.GOOGLE_PROJECT_ID) {
  GEMINI_API_BASE = `https://us-central1-aiplatform.googleapis.com/v1/projects/${process.env.GOOGLE_PROJECT_ID}/locations/us-central1/publishers/google/models`;
}

const MODELS = [
  GEMINI_MODEL,
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'gemini-1.0-pro',
];

function queryGemini(prompt, callback) {
  if (!GEMINI_API_KEY) {
    return callback(new Error('Missing GEMINI_API_KEY in environment.'));
  }

  (async function run() {
    let lastError = new Error('Gemini query failed');

    for (const model of MODELS) {
      const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${GEMINI_API_KEY}`;
      try {
        const response = await axios.post(
          url,
          { contents: [{ role: 'user', parts: [{ text: prompt }] }] },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const candidates = response.data && response.data.candidates ? response.data.candidates : [];
        const text = candidates[0] && candidates[0].content && candidates[0].content.parts ? candidates[0].content.parts[0].text : null;
        if (text) return callback(null, text);

        lastError = new Error('Empty response from Gemini');
      } catch (error) {
        lastError = error;
        if (error.response && error.response.status === 404) {
          console.warn(`[GeminiService] Model not found: ${model} (trying next...)`);
          continue;
        }
        if (error.response && error.response.status === 403) {
          console.error('[GeminiService] Access denied: invalid or restricted key.');
          break;
        }
        console.error('[GeminiService] API Error:', error.message || error);
      }
    }

    callback(lastError);
  })();
}

module.exports = {
  queryGemini,
  GEMINI_API_BASE,
  GEMINI_MODEL,
};
