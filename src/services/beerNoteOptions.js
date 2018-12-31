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
    'persistent','rocky','large','fluffy','dissipating','lingering','white','off white','tan','frothy','delicate',
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
    'honey','caramel','russet red','brown','root beer','amber','chestnut','dark red','apricot','orange','black','burnt auburn','garnet','ruby','copper','deep gold',
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
    'malty','grainy','sweet','corn-like','hay','straw','grahamcracker','biscuity','caramel','toast','roast','coffee','espresso','burnt','alcohol','tobacco','gunpowder','leather','pine','freshcutgrass',
    'raisins','currant','plum','dates','prunes','figs','blackberry','blueberry',
    'banana','pineapple','apricot','pear','apple','nectarine','peach','mango','pricklypear',
    'lemon','lime','orange','tangerine','clementine','grapefruit','lemonzest',
    'phenolic','white pepper','clove','anise','licorice','smoked bacon','fatty','nutty','butterscotch','vanilla','earthy','woody','horsey','fresh bread','saddle','musty','barnyard',
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
    'roasted','bready','bitter','sweet','spicy','fruity','chocolate','caramel','toffee','coffee','malty','tart','subtle','woodsy','earthy','sulfuric',
    'assertive','mild','bold','balanced','robust','intense','metallic','harsh','complex','delicate','refined','hearty',
    'dry','fruity','sweet','alcoholic','warming','bitter','acidic','buttery','wet','quenching','lingering'
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
