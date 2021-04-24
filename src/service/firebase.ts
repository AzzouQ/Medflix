import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

import { UploadRequestOption } from 'rc-upload/es/interface';

// import getBlob from './getBlob';

const vapidKey =
  'BM0a1iAARbJRo1jVs2Dh7tjrpv8XNnfQGWb528rY5dMLHe0K8IIaeRvsKxdlhsJM4X5IV6NpVXl8VsEpmOFjl0E';

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

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

const db = app.database();

const storage = app.storage();

const messaging = app.messaging();

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

export const setFcm = async () => {
  const user = auth.currentUser;
  messaging
    .getToken({ vapidKey: vapidKey })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        db.ref(`/user/${user?.uid}`).update({ fcm: currentToken });
      } else {
        // Show permission request UI
        console.log(
          'No registration token available. Request permission to generate one.'
        );
        // ...
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
};

export const login = async (email: string, password: string) => {
  const { user } = await auth.signInWithEmailAndPassword(email, password);
  const date = +new Date();
  await db.ref(`/user/${user?.uid}`).update({ lastOnline: date });
  await setFcm();
};

export const register = async (
  email: string,
  password: string,
  address: string,
  phone: string,
  siret: string
) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  const date = +new Date();
  await db.ref(`/user/${user?.uid}`).set({
    address,
    phone,
    siret,
    creationDate: date,
    lastOnline: date,
    followerNb: 0,
    followers: [],
    following: [],
    followingNb: 0,
  });
  await setFcm();
};

export const resetPassword = (email: string) => {
  // TODO Handle resetPassword *****
};

export const videoUpload = async ({
  filename,
  file,
  onSuccess,
}: UploadRequestOption<any>) => {
  const { currentUser } = auth;
  const uid = currentUser?.uid;

  const name = filename ?? `${new Date().getTime()}-easyCloud`;

  const storageRef = storage.ref(`/video/${uid}/${name}`);

  try {
    const uploadTask = await storageRef.put(file as Blob);
  } catch (e) {
    console.log(e);
  }
};
