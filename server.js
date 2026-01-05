require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var chatRoutes = require('./routes/chat');
var bookingRoutes = require('./routes/booking');
var gemini = require('./config/gemini');

var app = express();
app.use(bodyParser.json());

app.get('/health', function (req, res) {
  res.status(200).json({ status: 'ok' });
});

app.get('/test-gemini', function (req, res) {
  gemini.queryGemini('Hello Gemini, system test.', function (err, response) {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    res.status(200).json({
      status: 'ok',
      message: 'Gemini connection verified.',
      reply: response,
    });
  });
});

app.use('/chat', chatRoutes);
app.use('/bookings', bookingRoutes);

app.get('/', function (req, res) {
  res.send('Emergency-Mobile-Services-AI (ES5 compatible) is running.');
});

var PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
  console.log('🚀 EMS-AI (ES5) running on port ' + PORT);
});
