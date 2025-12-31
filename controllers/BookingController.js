var EMSService = require('../services/EMSService');

var BookingController = {
  create: function (req, res) {
    var bookingData = req.body;
    var service = new EMSService();
    service.createBooking(bookingData, function (err, result) {
      if (err) {
        console.error('[BookingController] create', err);
        return res.status(500).json({ error: 'Failed to create booking' });
      }
      res.status(201).json(result);
    });
  },

  getNearby: function (req, res) {
    var date = req.query.date;
    var service = new EMSService();
    service.getNearbySlots(date, function (err, slots) {
      if (err) {
        console.error('[BookingController] nearby', err);
        return res.status(500).json({ error: 'Failed to load nearby slots' });
      }
      res.status(200).json(slots);
    });
  }
};

module.exports = BookingController;