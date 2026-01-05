var gemini = require('../config/gemini');

var GeminiService = {
  respondToUser: function (inputText, context, callback) {
    if (!context) context = {};
    var systemPrompt = context.systemPrompt || 'You are an AI assistant for Emergency-Mobile-Services.';
    var prompt = systemPrompt + '\nUser: ' + inputText;

    gemini.queryGemini(prompt, function (err, response) {
      if (err) return callback(err);
      callback(null, response);
    });
  }
};

module.exports = GeminiService;
