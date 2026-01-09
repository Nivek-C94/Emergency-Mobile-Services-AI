var GeminiService = require('../services/GeminiService');

var ChatController = {
  handleMessage: function (req, res) {
    var message = req.body && req.body.message;
    if (!message) return res.status(400).json({ error: 'Missing message' });

    GeminiService.respondToUser(message, {}, function (err, reply) {
      if (err) {
        console.error('[ChatController]', err.message || err);
        return res.status(500).json({ error: 'Failed to process message' });
      }
      res.status(200).json({ reply: reply });
    });
  }
};

module.exports = ChatController;
