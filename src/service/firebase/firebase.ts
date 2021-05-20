import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAztsCYu4ldxfOZGNY4T3g8bl1QgxxgmWg',
  authDomain: 'medflixofficial.firebaseapp.com',
  databaseURL:
    'https://medflixofficial-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'medflixofficial',
  storageBucket: 'medflixofficial.appspot.com',
  messagingSenderId: '953812443127',
  appId: '1:953812443127:web:ba919d28b2cb09f79b18f2',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();
// if (firebase.messaging.isSupported()) {
//   export const messaging = firebase.messaging();
// }

export { auth, database, storage };
export default firebase;
