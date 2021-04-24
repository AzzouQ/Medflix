import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';
import axios from 'axios';

import { UploadRequestOption } from 'rc-upload/es/interface';
import userEvent from '@testing-library/user-event';

// import getBlob from './getBlob';

const SERVER_KEY =
  'AAAA3hOm3_c:APA91bETq9iSsgOUsBzl1EEkCOqeH131hx9zlBCFWlHNXqp8AFPCQZnv0MStMp-oEx321Elv-TLeVMNoASsQT0_C0MHkp-aViir_Bb13zS_LG6HvyBGFEpxKmaIprNO5rsIN4KG11sSd';

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

const auth = app.auth();

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

export const signIn = async (email: string, password: string) => {
  const { user } = await auth.signInWithEmailAndPassword(email, password);
  const date = +new Date();
  await db.ref(`/user/${user?.uid}`).update({ lastOnline: date });
  await setFcm();
};

export const signUp = async (
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

export const getFcmFromUid = async (uid: string) => {
  const fcm = await (await db.ref(`/user/${uid}/fcm`).once('value')).val();
  console.log(fcm);
  return fcm;
};

export const listUser = async (): Promise<string[]> => {
  const keys: string[] = [];
  const data = await (await db.ref(`/user/`).once('value')).val()
  Object.keys(data).forEach(function(key) {

    keys.push(key);
  
  });
  console.log(keys)
  return keys;
};

export const sendNotif = async (uid: string) => {
  const fcm = await getFcmFromUid(uid);
  const url = 'https://fcm.googleapis.com/fcm/send';
  const payload = {
    to: fcm,
    collapse_key: 'type_a',
    notification: {
      body: 'Allez vite le follow back',
      title: 'Vous avez un nouvel abonné',
    },
    data: {
      body: 'Allez vite le follow back',
      title: 'Vous avez un nouvel abonné',
      key_1: 'Value for key_1',
      key_2: 'Value for key_2',
    },
  };
  axios.post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `key=${SERVER_KEY}`,
    },
  });
};
