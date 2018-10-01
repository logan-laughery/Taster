
const defaultBeerNote = {
  id: 1,
  step: 'intro',
};

function getBeerNote(id) {
  if (!id) {
    const delay = 1000 * 4;

    return new Promise(resolve => setTimeout(() => {
      resolve(defaultBeerNote);
    }, delay));
  }

  return undefined;
}

export default {
  getBeerNote,
};
