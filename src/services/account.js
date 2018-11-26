import firebase from 'firebase';

const provider = new firebase.auth.GoogleAuthProvider();

function googleAuth() {
  return firebase.auth().signInWithPopup(provider);
}

function logout() {
  return firebase.auth().signOut();
}

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}

function onAuthChange(callback) {
  firebase.auth().onAuthStateChanged(callback);
}

function getLinkedAccounts() {
  const userId = firebase.auth().currentUser.email.replace(/\./g,'%2E');

  return firebase.database().ref(`/users/${userId}/linkedAccounts`)
    .once('value')
    .then((snapshot) => {
      const accounts = [];

      snapshot.forEach((childSnapShot) => {
        accounts.push({
          key: childSnapShot.key,
          email: childSnapShot.val(),
        });
      });

      return accounts;
    });
}

function addLinkedAccount(email) {
  const userId = firebase.auth().currentUser.email.replace(/\./g,'%2E');

  return firebase.database().ref(`/users/${userId}/linkedAccounts/${email.replace(/\./g,'%2E')}`)
    .set(email)
    .then((snapshot) => snapshot);
}

function removeLinkedAccount(key) {
  const userId = firebase.auth().currentUser.email.replace(/\./g,'%2E');

  return firebase.database().ref(`/users/${userId}/linkedAccounts`)
    .child(key)
    .remove()
    .then((snapshot) => snapshot);
}


export default {
  googleAuth,
  getCurrentUser,
  logout,
  onAuthChange,
  getLinkedAccounts,
  addLinkedAccount,
  removeLinkedAccount,
};
