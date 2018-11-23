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

export default {
  googleAuth,
  getCurrentUser,
  logout,
  onAuthChange,
};
