// Auto-generated EMS API endpoint schema for Gemini orchestration
// This file maps all available endpoints from the Emergency-Mobile-Services backend.

export const availableEndpoints = {
  booking: {
    base: '/book',
    timeframes: '/timeframes',
    serviceByDate: '/get_service_byDate',
    unavailableDates: '/unavailableDates',
    brands: '/getBrands',
    modelsByBrand: '/getModelsByBrand',
    versions: '/getVersions',
    varietiesAndColors: '/getVarietiesAndColors',
    colors: '/getColors',
    device: '/getDevice',
    searchDevices: '/searchDevices',
    states: '/getAllStates',
    cities: '/getAllCities',
    zipCodes: '/getZipCodes',
    checkRadius: '/checkRadisuOfService'
  },

  pricing: {
    brands: '/api/pricing/brands',
    models: '/api/pricing/models',
    versions: '/api/pricing/versions',
    options: '/api/pricing/options',
    device: '/api/pricing/device',
    search: '/api/pricing/search',
    repairabilityDevices: '/api/pricing/repairability/devices',
    repairabilityDevice: '/api/pricing/repairability/devices/:deviceId'
  },

  assistant: {
    conversations: '/assistant/conversations',
    messages: '/assistant/conversations/:conversationId/messages',
    context: '/assistant/context/:conversationId',
    settings: '/assistant/settings',
    updateSettings: '/assistant/settings',
    bookings: {
      timeframes: '/assistant/bookings/timeframes',
      nearby: '/assistant/bookings/nearby',
      create: '/assistant/bookings'
    },
    pricing: {
      brands: '/assistant/pricing/brands',
      models: '/assistant/pricing/models',
      versions: '/assistant/pricing/versions',
      options: '/assistant/pricing/options',
      device: '/assistant/pricing/device',
      search: '/assistant/pricing/search',
      repairabilityDevices: '/assistant/pricing/repairability/devices',
      repairabilityDevice: '/assistant/pricing/repairability/devices/:deviceId'
    }
  },

  travel: {
    fee: '/travel/fee',
    suggestions: '/travel/suggestions'
  },

  auth: {
    login: '/login',
    register: '/register'
  },

  ai: {
    chat: '/chat',
    proxy: '/ai'
  }
};

export default availableEndpoints;