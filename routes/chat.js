var express = require('express');
var ChatController = require('../controllers/ChatController');
var router = express.Router();

router.post('/', ChatController.handleMessage);

module.exports = router;