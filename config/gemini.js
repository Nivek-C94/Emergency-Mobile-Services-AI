// Gemini Free Tier API integration (modern ES2022)
import axios from 'axios';

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn('[Gemini] Missing GEMINI_API_KEY in environment.');
}

export async function queryGemini(prompt) {
  try {
    const response = await axios.post(
      `${GEMINI_API_BASE}/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      { contents: [{ role: 'user', parts: [{ text: prompt }] }] },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const candidates = response.data?.candidates || [];
    return candidates[0]?.content?.parts?.[0]?.text || 'No response.';
  } catch (error) {
    console.error('[GeminiService] Error querying Gemini:', error.message);
    throw new Error('Failed to reach Gemini API');
  }
}