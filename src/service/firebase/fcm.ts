import { Plugins } from '@capacitor/core';
import { FCM } from '@capacitor-community/fcm';
import firebase, { auth, db, messaging } from './index';
import { isPlatform } from '@ionic/react';
import axios from 'axios';

const { PushNotifications } = Plugins;

const SERVER_KEY =
  'AAAA3hOm3_c:APA91bETq9iSsgOUsBzl1EEkCOqeH131hx9zlBCFWlHNXqp8AFPCQZnv0MStMp-oEx321Elv-TLeVMNoASsQT0_C0MHkp-aViir_Bb13zS_LG6HvyBGFEpxKmaIprNO5rsIN4KG11sSd';

const vapidKey =
  'BM0a1iAARbJRo1jVs2Dh7tjrpv8XNnfQGWb528rY5dMLHe0K8IIaeRvsKxdlhsJM4X5IV6NpVXl8VsEpmOFjl0E';

let fcm: FCM;
let _messaging: firebase.messaging.Messaging;

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
  _messaging = messaging;
}

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
    return _messaging
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

export const getFcmFromUid = async (uid: string) => {
  try {
    const keys = await (await db.ref(`/user/${uid}/fcm`).once('value')).val();
    return Object.values(keys);
  } catch (err) {
    throw Error(err);
  }
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
