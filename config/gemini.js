// Gemini Free Tier API integration (ES5 compatible)
var axios = require('axios');

var GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
var GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
var GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn('[Gemini] Missing GEMINI_API_KEY in environment.');
}

function queryGemini(prompt, callback) {
  var url = GEMINI_API_BASE + '/' + GEMINI_MODEL + ':generateContent?key=' + GEMINI_API_KEY;
  var data = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };

  axios.post(url, data, { headers: { 'Content-Type': 'application/json' } })
    .then(function(response) {
      var candidates = (response.data && response.data.candidates) || [];
      var text = candidates.length && candidates[0].content && candidates[0].content.parts[0].text || 'No response.';
      callback(null, text);
    })
    .catch(function(error) {
      console.error('[GeminiService] Error querying Gemini:', error.message);
      callback(error);
    });
}

module.exports = { queryGemini: queryGemini };