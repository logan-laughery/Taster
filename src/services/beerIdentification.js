

function identifyBeer(dataUrl) {
  if (dataUrl) {
    const delay = 1000 * 4;

    return new Promise(resolve => setTimeout(() => {
      resolve(undefined);
    }, delay));
  }

  return undefined;
}

export default {
  identifyBeer,
};
