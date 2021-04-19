import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

const vapidKey =
  'BEn5sZUgguVum0ZMp1NIVFUIzrF56Ri8oVcdMxWnaZcKF_lxDKYUsezgbpUkovJyxCvnZFMk74GI9KL_CoPpRjc';

  const firebaseConfig = {
    apiKey: "AIzaSyAztsCYu4ldxfOZGNY4T3g8bl1QgxxgmWg",
    authDomain: "medflixofficial.firebaseapp.com",
    databaseURL: "https://medflixofficial-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "medflixofficial",
    storageBucket: "medflixofficial.appspot.com",
    messagingSenderId: "953812443127",
    appId: "1:953812443127:web:ba919d28b2cb09f79b18f2"
  };

const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();

const db = app.database();

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     messaging.onMessage((payload) => {
//       resolve(payload);
//     });
//   });

// export const getToken = (setTokenFound: Function) => {
//   return messaging
//     .getToken({ vapidKey: vapidKey })
//     .then(async (currentToken) => {
//       if (currentToken) {
//         console.log('current token for client: ', currentToken);
//         setTokenFound(true);

//         // TODO SEND TO BACK END
//         // await firebase
//         //   .database()
//         //   .ref('/user')
//         //   .child('pushToken')
//         //   .set(currentToken)

//         // Track the token -> client mapping, by sending to backend server
//         // show on the UI that permission is secured
//       } else {
//         console.log(
//           'No registration token available. Request permission to generate one.'
//         );
//         setTokenFound(false);
//         // shows on the UI that permission is required
//       }
//     })
//     .catch((err) => {
//       console.log('An error occurred while retrieving token. ', err);
//       // catch error while creating client token
//     });
// };

export const login = async (email: string, password: string) => {
  const { user } = await auth.signInWithEmailAndPassword(email, password)
  const date = + new Date()
  await db.ref(`/user/${user?.uid}`).update({ lastOnline: date})
}

export const register = async (email: string, password: string, address: string, phone: string, siret: string) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password)
  const date = + new Date()
  await db.ref(`/user/${user?.uid}`).set({ address, phone, siret, creationDate: date, lastOnline: date, followerNb: 0,  followers: [], following: [], followingNb: 0})
}

export const resetPassword = (email: string) => {
  // TODO Handle resetPassword *****
} 