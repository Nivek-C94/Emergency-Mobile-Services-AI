require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var chatRoutes = require('./routes/chat');
var bookingRoutes = require('./routes/booking');

var app = express();
app.use(bodyParser.json());

app.use('/chat', chatRoutes);
app.use('/bookings', bookingRoutes);

app.get('/', function (req, res) {
  res.send('Emergency-Mobile-Services-AI (ES5 compatible) is running.');
});

var PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
  console.log('🚀 EMS-AI (ES5) running on port ' + PORT);
});