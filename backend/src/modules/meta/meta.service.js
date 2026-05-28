const preferencesMeta = {
  fuelTypes: ['Petrol', 'Diesel', 'EV', 'Hybrid', 'CNG'],

  transmissions: ['Manual', 'Automatic'],

  bodyTypes: ['SUV', 'Sedan', 'Compact SUV', 'Hatchback', 'MPV', 'EV'],

  usageTypes: ['city', 'family', 'highway', 'offroad'],

  priorities: ['safety', 'mileage', 'features'],
};

const getPreferencesMeta = () => {
  return Promise.resolve(preferencesMeta);
};

module.exports = {
  getPreferencesMeta,
};
