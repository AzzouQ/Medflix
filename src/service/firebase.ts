import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

import { UploadRequestOption } from 'rc-upload/es/interface';

// import getBlob from './getBlob';

const vapidKey =
  'BEn5sZUgguVum0ZMp1NIVFUIzrF56Ri8oVcdMxWnaZcKF_lxDKYUsezgbpUkovJyxCvnZFMk74GI9KL_CoPpRjc';

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
  const fcmToken = await messaging.getToken({ vapidKey: vapidKey });
  return db.ref(`/user/${user?.uid}`).update({ fcm: fcmToken });
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

export const initMessaging = () => {
  return new Promise<void>((resolve, reject) => {
    navigator.serviceWorker.ready.then(
      (registration) => {
        // Don't crash an error if messaging not supported
        if (!firebase.messaging.isSupported()) {
          resolve();
          return;
        }

        const messaging = firebase.messaging();

        // Register the Service Worker
        messaging.useServiceWorker(registration);

        // Initialize your VAPI key
        messaging.usePublicVapidKey(vapidKey);

        // Optional and not covered in the article
        // Listen to messages when your app is in the foreground
        messaging.onMessage((payload) => {
          console.log(payload);
        });
        // Optional and not covered in the article
        // Handle token refresh
        messaging.onTokenRefresh(() => {
          messaging
            .getToken({vapidKey: vapidKey, serviceWorkerRegistration: ''})
            .then((refreshedToken: string) => {
              console.log(refreshedToken);
            })
            .catch((err) => {
              console.error(err);
            });
        });

        resolve();
      },
      (err) => {
        reject(err);
      }
    );
  });
};
