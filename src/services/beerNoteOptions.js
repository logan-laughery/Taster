
const defaultOptions = {
  styles: [{
    text: 'American Wheat Ale',
  }, {
    text: 'India Pale Ale',
  }, {
    text: 'Amber Ale',
  }],
  headDescriptors: [
    'fluffy',
    'lingering',
    'white',
    'tan',
    'dark',
    'thin',
  ],
  clarityDescriptors: [
    'brilliant',
    'bright',
    'hazy',
    'cloudy',
    'turbid',
    'opaque',
    'clear',
    'crystal',
    'dull',
  ],
  colorDescriptors: [
    'gold',
    'red',
    'amber',
    'brown',
    'dark',
    'orange',
    'ruby',
    'copper',
    'pale',
    'straw',
  ],
  aromaDescriptors: [
    'burnt',
    'nutty',
    'citrus',
    'pine',
    'skunk',
    'vanilla',
    'bready',
    'clove',
    'fruity',
    'phenolic',
  ],
  flavorDescriptors: [
    'bready',
    'wheaty',
    'roasty',
    'bitter',
    'light',
    'crisp',
    'dry',
    'lingering',
    'boozey',
    'warming',
  ],
};

function getOptions() {
  const delay = 1000 * 1;

  return new Promise(resolve => setTimeout(() => {
    resolve(defaultOptions);
  }, delay));
}

export default {
  getOptions,
};
