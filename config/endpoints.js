// Auto-generated EMS API endpoint map (ES5 compatible)
module.exports = {
  baseURL: process.env.EMS_BASE_URL || 'https://emergency-mobile-services.example.com',
  assistant: {
    conversations: '/assistant/conversations',
    messages: function (id) { return '/assistant/conversations/' + id + '/messages'; },
    context: function (id) { return '/assistant/context/' + id; },
    settings: '/assistant/settings',
    bookings: {
      timeframes: '/assistant/bookings/timeframes',
      nearby: '/assistant/bookings/nearby',
      create: '/assistant/bookings',
    },
    pricing: {
      brands: '/assistant/pricing/brands',
      models: '/assistant/pricing/models',
      versions: '/assistant/pricing/versions',
      options: '/assistant/pricing/options',
      device: '/assistant/pricing/device',
      search: '/assistant/pricing/search',
      repairabilityDevices: '/assistant/pricing/repairability/devices',
      repairabilityDevice: function (id) { return '/assistant/pricing/repairability/devices/' + id; },
    },
  },
  travel: {
    fee: '/travel/fee',
    suggestions: '/travel/suggestions',
  },
  pricing: {
    brands: '/api/pricing/brands',
    models: '/api/pricing/models',
    versions: '/api/pricing/versions',
    options: '/api/pricing/options',
    device: '/api/pricing/device',
    search: '/api/pricing/search',
    repairabilityDevices: '/api/pricing/repairability/devices',
    repairabilityDevice: function (id) { return '/api/pricing/repairability/devices/' + id; },
  },
};