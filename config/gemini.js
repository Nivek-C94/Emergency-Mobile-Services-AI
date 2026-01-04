// Gemini Free Tier API integration (safe for v1beta, Jan 2026)
import axios from "axios";

const GEMINI_API_BASE =
  "https://generativelanguage.googleapis.com/v1beta/models";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const MODELS = [
  process.env.GEMINI_MODEL || "gemini-1.5-flash-latest",
  "gemini-1.5-flash",
  "gemini-pro",
];

if (!GEMINI_API_KEY) {
  console.error("[Gemini] Missing GEMINI_API_KEY in environment.");
}

export async function queryGemini(prompt) {
  for (const model of MODELS) {
    const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${GEMINI_API_KEY}`;
    try {
      const response = await axios.post(
        url,
        { contents: [{ role: "user", parts: [{ text: prompt }] }] },
        { headers: { "Content-Type": "application/json" } },
      );

      const candidates = response.data?.candidates || [];
      const text = candidates[0]?.content?.parts?.[0]?.text;
      if (text) return text;

      throw new Error("Empty response");
    } catch (error) {
      if (error.response?.status === 404) {
        console.warn(
          `[GeminiService] Model not found: ${model} (trying next...)`,
        );
        continue;
      } else {
        console.error("[GeminiService] API Error:", error.message);
        throw error;
      }
    }
  }

  throw new Error("[GeminiService] All Gemini models failed.");
}
