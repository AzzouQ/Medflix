import { isPlatform } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { FCM as CapacitorMessaging } from '@capacitor-community/fcm';
import axios from 'axios';

import firebase, { database } from './firebase';

import { notification } from 'service/fakeData';

const { PushNotifications } = Plugins;

const SERVER_KEY =
  'AAAA3hOm3_c:APA91bETq9iSsgOUsBzl1EEkCOqeH131hx9zlBCFWlHNXqp8AFPCQZnv0MStMp-oEx321Elv-TLeVMNoASsQT0_C0MHkp-aViir_Bb13zS_LG6HvyBGFEpxKmaIprNO5rsIN4KG11sSd';

const vapidKey =
  'BM0a1iAARbJRo1jVs2Dh7tjrpv8XNnfQGWb528rY5dMLHe0K8IIaeRvsKxdlhsJM4X5IV6NpVXl8VsEpmOFjl0E';

type initializeMessagingProps = (user: firebase.User) => Promise<void>;

export const initializeMessaging: initializeMessagingProps = async (user) => {
  if (isPlatform('ios')) {
    console.log(`Couldn't initialize Cloud Messaging for iOS: unsupported`);
  } else if (isPlatform('android')) {
    try {
      const capacitorMessaging = new CapacitorMessaging();
      const premission = await PushNotifications.requestPermission();
      if (premission.granted) {
        await PushNotifications.register();
        await capacitorMessaging.setAutoInit({ enabled: true });
        const { token } = await capacitorMessaging.getToken();
        await database
          .ref(`/user/${user.uid}/cloudMessagingToken`)
          .update({ mobile: token });
      }
    } catch ({ message }) {
      console.log(
        `Couldn't initialize Cloud Messaging for Android: ${message}`
      );
    }
  } else if (firebase.messaging.isSupported()) {
    try {
      console.log('Trying to get Token.');
      const token = await firebase.messaging().getToken({ vapidKey: vapidKey });
      console.log('Got token, trying to write it to database.');
      await database
        .ref(`/user/${user.uid}/cloudMessagingToken`)
        .update({ web: token });
    } catch ({ message }) {
      console.log(`Couldn't initialize Cloud Messaging for Web: ${message}`);
    }
  }
};

export const sendNotif = async (uid: string) => {
  try {
    const tokens = await database.ref(`/user/${uid}/cloudMessagingToken`).get();
    const payload = {
      registration_ids: Object.values(tokens.val()),
      collapse_key: 'type_a',
      notification: notification.notification,
      data: notification.data,
    };
    axios.post('https://fcm.googleapis.com/fcm/send', payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${SERVER_KEY}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
