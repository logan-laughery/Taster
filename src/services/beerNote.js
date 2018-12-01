import firebase from 'firebase';
import shortid from 'shortid';
import accountService from './account';

const defaultBeerNote = {
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
  const userId = accountService.getCurrentUserId();

  if (!id) {
    const newNote = Object.assign({}, defaultBeerNote, {
      id: shortid.generate(),
      uid: userId,
    });

    return newNote;
  }

  return firebase.database().ref(`/beerNotes/${id}`)
    .once('value')
    .then(snapshot => Object.assign({}, defaultBeerNote, snapshot.val()));
}

function saveBeerNote(beerNote) {
  return firebase.database().ref(`/beerNotes/${beerNote.id}`)
    .set(beerNote)
    .then(() => beerNote);

  // https://stackoverflow.com/questions/29306489/how-to-share-data-between-users-in-firebase
}

function getCurrentUserBeerNotes() {
  const userId = accountService.getCurrentUserId();

  return firebase.database().ref('beerNotes')
    .orderByChild('uid')
    .equalTo(userId)
    .once('value')
    .then((snapshot) => {
      const devices = [];

      snapshot.forEach((childSnapShot) => {
        devices.push({
          ...childSnapShot.val(),
        });
      });

      return devices;
    });
}

function getLinkedNote(user) {
  return firebase.database().ref('/beerNotes')
    .orderByChild('uid')
    .equalTo(user)
    .once('value')
    .then((snapshot) => {
      const notes = [];

      snapshot.forEach((childSnapShot) => {
        notes.push({
          ...childSnapShot.val(),
        });
      });

      return notes;
    })
    .catch(() => []);
}

async function getLinkedNotes(linkedAccounts) {
  const results = await Promise.all(linkedAccounts.map(acc => getLinkedNote(acc.key)));
  const flattenedResults = results.reduce(
    (arr, cur) => arr.concat(cur),
    [],
  );

  return flattenedResults;
}

async function getBeerNotes() {
  const linkedAccounts = await accountService.getLinkedAccounts();
  const linkedBeerNotes = await getLinkedNotes(linkedAccounts);
  const currentUsersNotes = await getCurrentUserBeerNotes();

  return [...currentUsersNotes, ...linkedBeerNotes];
}

export default {
  getBeerNote,
  saveBeerNote,
  getBeerNotes,
};
