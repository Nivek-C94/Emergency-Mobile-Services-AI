var express = require('express');
var BookingController = require('../controllers/BookingController');
var router = express.Router();

router.post('/', BookingController.create);
router.get('/nearby', BookingController.getNearby);

module.exports = router;