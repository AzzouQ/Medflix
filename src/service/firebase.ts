import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

import { Plugins } from '@capacitor/core';
import { isPlatform } from '@ionic/react';
import axios from 'axios';
import { FCM } from '@capacitor-community/fcm';
import { UploadRequestOption } from 'rc-upload/es/interface';
import { useDispatch } from 'react-redux';
import { storefront } from 'ionicons/icons';
import { Dispatch } from 'react';
import { uploadActions } from '../redux';
import getBlob from './getBlob';

// import getBlob from './getBlob';

const { PushNotifications } = Plugins;

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

let fcm: FCM;
let messaging: firebase.messaging.Messaging;

const initFcm = () => {
  //
  // Enable the auto initialization of the library
  fcm
    .setAutoInit({ enabled: true })
    .then(() => console.log(`Auto init enabled`));

  //
  // Check the auto initialization status
  fcm.isAutoInitEnabled().then((r) => {
    console.log('Auto init is ' + (r.enabled ? 'enabled' : 'disabled'));
  });
};
//
// with type support
if (isPlatform('mobile')) {
  fcm = new FCM();

  PushNotifications.requestPermission().then(async (result) => {
    if (result.granted) {
      // Register with Apple / Google to receive push via APNS/FCM
      await PushNotifications.register();
      console.log('Register good');
      initFcm();
    } else {
      console.log('Didnt request shit');
      // Show some error
    }
  });
} else {
  messaging = app.messaging();
}

//
// external required step
// register for push
// PushNotifications.register()
//   .then(() => {
//     //
//     // Subscribe to a specific topic
//     // you can use `FCMPlugin` or just `fcm`
//     fcm
//       .subscribeTo({ topic: 'test' })
//       .then((r) => alert(`subscribed to topic`))
//       .catch((err) => console.log(err));
//   })
//   .catch((err) => alert(JSON.stringify(err)));

// //
// // Unsubscribe from a specific topic
// fcm
//   .unsubscribeFrom({ topic: 'test' })
//   .then(() => alert(`unsubscribed from topic`))
//   .catch((err) => console.log(err));

//
// Remove FCM instance
// fcm
//   .deleteInstance()
//   .then(() => alert(`Token deleted`))
//   .catch((err) => console.log(err));

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     messaging.onMessage((payload) => {
//       resolve(payload);
//     });
//   });

export const setFcm = async () => {
  const user = auth.currentUser;

  if (isPlatform('mobile')) {
    return fcm
      .getToken()
      .then((r) => {
        db.ref(`/user/${user?.uid}/fcm`).update({ mobile: r.token });
      })
      .catch((err) => console.log(err));
  } else {
    return messaging
      .getToken({ vapidKey: vapidKey })
      .then((currentToken: string) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          db.ref(`/user/${user?.uid}/fcm`).update({ web: currentToken });
        } else {
          // Show permission request UI
          console.log(
            'No registration token available. Request permission to generate one.'
          );
          // ...
        }
      })
      .catch((err: any) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
  }
};

export const signIn = async (email: string, password: string) => {
  const { user } = await auth.signInWithEmailAndPassword(email, password);
  const date = +new Date();
  await db.ref(`/user/${user?.uid}`).update({ lastOnline: date });
  await setFcm();
};

export const signUp = async (name: string, email: string, password: string) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  const date = +new Date();
  await db.ref(`/user/${user?.uid}`).set({
    name,
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

export const videoUpload = async (
  { filename, file, onSuccess, onError, onProgress }: UploadRequestOption<any>,
  dispatch: Dispatch<any>
) => {
  const { currentUser } = auth;
  const uid = currentUser?.uid;

  const name = filename ?? `${new Date().getTime()}-medflix`;


  
  try {
    const blob: any = await getBlob(file);

    const storageRef = storage.ref(`/video/${uid}/todofixit`);


    const uploadTask = storageRef.put(file as Blob);

    // dispatch
    dispatch(uploadActions.setUpload({ blob: blob, uploadTask }));

    uploadTask.on(
      'state_changed',
      function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress: any =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        if (onProgress)
          // CONNECT ON PROGRESS
          onProgress(progress);

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      function (error) {
        // Handle unsuccessful uploads

        // CONNECT ON ERROR
        if (onError) onError(error);
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(function (downloadURL: any) {
            console.log('File available at', downloadURL);

            // CONNECT ON SUCCESS
            if (onSuccess) onSuccess(downloadURL, blob);
            // Pass any parameter you would like
          });
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export const getFcmFromUid = async (uid: string) => {
  try {
    const keys = await (await db.ref(`/user/${uid}/fcm`).once('value')).val();
    return Object.values(keys);
  } catch (err) {
    throw Error(err);
  }
};

export const listUser = async (): Promise<string[]> => {
  const keys: string[] = [];
  const data = await (await db.ref(`/user/`).once('value')).val();
  Object.keys(data).forEach(function (key) {
    keys.push(key);
  });
  console.log(keys);
  return keys;
};

export const sendNotif = async (uid: string) => {
  try {
    const registrationIds = await getFcmFromUid(uid);

    if (registrationIds.length === 0)
      return console.log("Can't fetch FCM from user");

    const url = 'https://fcm.googleapis.com/fcm/send';
    const payload = {
      registration_ids: registrationIds,
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
  } catch (err) {
    console.log(err);
  }
};

export { auth };
