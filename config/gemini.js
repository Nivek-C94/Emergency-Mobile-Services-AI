// Gemini API integration with dynamic endpoint detection (AI Studio + Vertex AI compatible)
import axios from "axios";

// Detect correct Gemini API base based on the type of key or model used
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-pro";

// Default to free-tier AI Studio endpoint unless environment forces Vertex AI
let GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1/models";

// If using Vertex AI model naming (1.5-*), upgrade to v1beta endpoint
if (GEMINI_MODEL.includes("1.5")) {
  GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
}

const MODELS = [
  GEMINI_MODEL,
  "gemini-pro",
  "gemini-1.5-flash-latest",
  "gemini-1.5-flash",
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
      } else if (error.response?.status === 403) {
        console.error(
          "[GeminiService] Access denied: likely invalid or restricted key.",
        );
        throw error;
      } else {
        console.error("[GeminiService] API Error:", error.message);
        throw error;
      }
    }
  }
  throw new Error("[GeminiService] All Gemini models failed.");
}
