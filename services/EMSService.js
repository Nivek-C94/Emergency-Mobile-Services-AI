var axios = require('axios');
var endpoints = require('../config/endpoints');

function EMSService(token) {
  this.client = axios.create({
    baseURL: endpoints.baseURL,
    headers: token ? { Authorization: 'Bearer ' + token } : {},
  });
}

EMSService.prototype.getPricing = function (deviceQuery, callback) {
  this.client.get(endpoints.pricing.device, { params: deviceQuery })
    .then(function (res) { callback(null, res.data); })
    .catch(function (err) { callback(err); });
};

EMSService.prototype.createBooking = function (data, callback) {
  this.client.post(endpoints.assistant.bookings.create, data)
    .then(function (res) { callback(null, res.data); })
    .catch(function (err) { callback(err); });
};

EMSService.prototype.getNearbySlots = function (date, callback) {
  this.client.get(endpoints.assistant.bookings.nearby, { params: { date: date } })
    .then(function (res) { callback(null, res.data); })
    .catch(function (err) { callback(err); });
};

EMSService.prototype.getRepairability = function (id, callback) {
  this.client.get(endpoints.pricing.repairabilityDevice(id))
    .then(function (res) { callback(null, res.data); })
    .catch(function (err) { callback(err); });
};

module.exports = EMSService;