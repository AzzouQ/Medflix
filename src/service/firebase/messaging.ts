import { isPlatform } from '@ionic/react';
import { FCM } from '@capacitor-community/fcm';
import { PushNotifications } from '@capacitor/push-notifications';
import axios from 'axios';

import firebase, { database } from './firebase';

const SERVER_KEY =
  'AAAA3hOm3_c:APA91bETq9iSsgOUsBzl1EEkCOqeH131hx9zlBCFWlHNXqp8AFPCQZnv0MStMp-oEx321Elv-TLeVMNoASsQT0_C0MHkp-aViir_Bb13zS_LG6HvyBGFEpxKmaIprNO5rsIN4KG11sSd';

const vapidKey =
  'BM0a1iAARbJRo1jVs2Dh7tjrpv8XNnfQGWb528rY5dMLHe0K8IIaeRvsKxdlhsJM4X5IV6NpVXl8VsEpmOFjl0E';

type initializeMessagingProps = (user: firebase.User) => Promise<void>;
type pushMessagingProps = (uid: string) => Promise<void>;

export const initializeMessaging: initializeMessagingProps = async (user) => {
  if (isPlatform('ios')) {
    console.log(`Couldn't initialize Cloud Messaging for iOS: unsupported`);
  } else if (isPlatform('mobile')) {
    try {
      const premission = await PushNotifications.requestPermissions();
      if (premission.receive === 'granted') {
        await PushNotifications.register();
        await FCM.setAutoInit({ enabled: true });
        const { token } = await FCM.getToken();
        await database
          .ref(`/users/${user.uid}/messaging`)
          .update({ mobile: token });
      } else {
        console.log("User didn't grant notification permission");
      }
    } catch ({ message }) {
      console.log(
        `Couldn't initialize Cloud Messaging for Android: ${message}`
      );
    }
  } else if (firebase.messaging.isSupported()) {
    try {
      const token = await firebase.messaging().getToken({ vapidKey: vapidKey });
      await database.ref(`/users/${user.uid}/messaging`).update({ web: token });
    } catch ({ message }) {
      console.log(`Couldn't initialize Cloud Messaging for Web: ${message}`);
    }
  }
};

export const pushMessaging: pushMessagingProps = async (uid) => {
  try {
    const tokens = await database.ref(`/users/${uid}/messaging`).get();

    const payload = {
      registration_ids: Object.values(tokens.val()),
      collapse_key: 'type_a',
      notification: {
        title: 'Medflix',
        body: 'Vous avez une nouvelle notification',
        icon: 'https://i.imgur.com/Wu5KM77.png',
      },
    };
    await axios.post('https://fcm.googleapis.com/fcm/send', payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${SERVER_KEY}`,
      },
    });
  } catch ({ message }) {
    console.log(`Couldn't initialize Cloud Messaging for Web: ${message}`);
  }
};
