import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-pro";

// Detect if it's a Vertex or AI Studio key
let GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
if (process.env.GOOGLE_PROJECT_ID) {
  GEMINI_API_BASE = `https://us-central1-aiplatform.googleapis.com/v1/projects/${process.env.GOOGLE_PROJECT_ID}/locations/us-central1/publishers/google/models`;
}

const MODELS = [
  GEMINI_MODEL,
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-1.0-pro",
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
          "[GeminiService] Access denied: invalid or restricted key.",
        );
        throw error;
      } else {
        console.error("[GeminiService] API Error:", error.message);
        throw error;
      }
    }
  }

  console.warn(
    "[GeminiService] All Gemini models failed. Falling back to mock mode.",
  );
  return {
    text: "⚠️ Gemini service unavailable. Please check your API key or endpoint.",
  };
}
