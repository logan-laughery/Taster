import axios from 'axios';

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
  const delay = 0;

  return new Promise(resolve => setTimeout(() => {
    resolve(defaultOptions);
  }, delay));
}

function queryBreweries(search) {
  const url = `https://us-central1-taster-216901.cloudfunctions.net/breweries?query=${encodeURIComponent(search)}&hitsPerPage=3&clickAnalytics=true&analytics=true&page=0`;
  return axios.get(url)
    .then((response) => {
      return response.data.hits.map(hit => hit.brewery_name);
    })
    .catch((error) => {
      console.log(error);
    });
}

function queryBeers(search) {
  const url = `https://us-central1-taster-216901.cloudfunctions.net/beers?query=${encodeURIComponent(search)}`;
  return axios.get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export default {
  getOptions,
  queryBreweries,
  queryBeers,
};
