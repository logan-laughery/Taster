import firebase from 'firebase';
import accountService from './account';

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
  const userId = firebase.auth().currentUser.email.replace(/\./g,'%2E');

  if (!id) {
    const userRef = firebase.database().ref(`/users/${userId}`);

    return userRef.once('value').then((snapshot) => {
      const user = snapshot.val();

      if (!user || !user.beerNotes) {
        defaultBeerNote.id = 0;
      } else {
        const [last] = Object.keys(user.beerNotes).slice(-1);
        const nextId = Number.parseInt(last, 10) + 1;

        defaultBeerNote.id = nextId;
      }

      return defaultBeerNote;
    });
  }

  return firebase.database().ref(`/users/${userId}/beerNotes/${id}`)
    .once('value')
    .then(snapshot => Object.assign({}, defaultBeerNote, snapshot.val()));
}

function saveBeerNote(beerNote) {
  const userId = firebase.auth().currentUser.email.replace(/\./g,'%2E');

  return firebase.database().ref(`/users/${userId}/beerNotes/${beerNote.id}`)
    .set(beerNote)
    .then(() => beerNote);

  // https://stackoverflow.com/questions/29306489/how-to-share-data-between-users-in-firebase
}

function getCurrentUserBeerNotes() {
  const userId = firebase.auth().currentUser.email.replace(/\./g,'%2E');

  return firebase.database().ref(`/users/${userId}/beerNotes`)
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
  return firebase.database().ref(`/users/${user}/beerNotes`)
    .once('value')
    .then((snapshot) => {
      const notes = [];

      snapshot.forEach((childSnapShot) => {
        notes.push({
          ...childSnapShot.val(),
        });
      });

      return notes;
    });
}

async function tryToGetLinkedNotes(linkedAccounts) {
  try {
    const results = await Promise.all(linkedAccounts.map((acc) => getLinkedNote(acc.key)));

    return results[0] || [];
  } catch(e) {
    return [];
  }
}

async function getBeerNotes() {
  const linkedAccounts = await accountService.getLinkedAccounts();
  const linkedBeerNotes = await tryToGetLinkedNotes(linkedAccounts);

  const currentUsersNotes = await getCurrentUserBeerNotes();

  return [...currentUsersNotes, ...linkedBeerNotes];
};

export default {
  getBeerNote,
  saveBeerNote,
  getBeerNotes,
};
