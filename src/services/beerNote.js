const testData = {
  id: 1,
  step: 'intro',
  beerName: 'Test Stout',
  brewery: 'All Knowing Fools Brewery',
  style: 'American Stout',
  ibu: '76',
  alc: '7.8',
  rating: '2',
  head: ['fluffy', 'thick', 'dark', 'creamy'],
  color: ['opaque', 'black'],
  clarity: ['opaque', 'cloudy'],
  aroma: ['roasty', 'coffee', 'toffee', 'chocolate'],
  flavor: ['thick', 'full', 'lingering', 'mint', 'heat'],
  characteristics: [
    { key: 'LINGER', value: 4 },
    { key: 'BODY', value: 5 },
    { key: 'DRY', value: 1 },
    { key: 'BITTER', value: 3 },
    { key: 'SOUR', value: 1 },
    { key: 'MALTY', value: 2 },
    { key: 'FLORAL', value: 1 },
    { key: 'HOPPY', value: 1 },
    { key: 'CITRUS', value: 1 },
  ],
};

const defaultBeerNote = {
  id: 1,
  step: 'intro',
  head: [],
  color: [],
  clarity: [],
  aroma: [],
  flavor: [],
  characteristics: [
    { key: 'LINGER', value: 1 },
    { key: 'BODY', value: 1 },
    { key: 'DRY', value: 1 },
    { key: 'BITTER', value: 1 },
    { key: 'SOUR', value: 1 },
    { key: 'MALTY', value: 1 },
    { key: 'FLORAL', value: 1 },
    { key: 'HOPPY', value: 1 },
    { key: 'CITRUS', value: 1 },
  ],
};

function getBeerNote(id) {
  if (!id) {
    const delay = 1000 * 4;

    return new Promise(resolve => setTimeout(() => {
      resolve(defaultBeerNote);
    }, delay));
  }

  return testData;
}

export default {
  getBeerNote,
};
