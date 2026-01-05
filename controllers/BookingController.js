var EMSService = require('../services/EMSService');

var BookingController = {
  create: function (req, res) {
    var bookingData = req.body || {};
    if (!bookingData.name || !bookingData.phone || !bookingData.device || !bookingData.issue) {
      return res.status(400).json({ error: 'Missing required booking fields (name, phone, device, issue)' });
    }

    var service = new EMSService(req.headers.authorization && req.headers.authorization.replace('Bearer ', ''));
    service.createBooking(bookingData, function (err, result) {
      if (err) {
        console.error('[BookingController] create', err.message || err);
        var status = err.response && err.response.status ? err.response.status : 500;
        var message = err.response && err.response.data && err.response.data.error ? err.response.data.error : 'Failed to create booking';
        return res.status(status).json({ error: message });
      }
      res.status(201).json(result);
    });
  },

  getNearby: function (req, res) {
    var date = req.query.date;
    var service = new EMSService();
    service.getNearbySlots(date, function (err, slots) {
      if (err) {
        console.error('[BookingController] nearby', err.message || err);
        var status = err.response && err.response.status ? err.response.status : 500;
        var message = err.response && err.response.data && err.response.data.error ? err.response.data.error : 'Failed to load nearby slots';
        return res.status(status).json({ error: message });
      }
      res.status(200).json(slots);
    });
  }
};

module.exports = BookingController;
