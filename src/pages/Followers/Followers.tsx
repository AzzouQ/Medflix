import { Plugins } from '@capacitor/core';
import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import AuthModal from 'components/AuthModal';
import Footer from 'components/Footer';
import SubscribeCard from 'components/SubscribeCard';
import Unauthenticated from 'components/Unauthenticated/Unauthenticated';
import { t } from 'i18n';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { database } from 'service/firebase';
import { listFollowers } from 'service/firebase/users';
import { userSelectors } from 'slices';
import { UserType } from 'types';
import { Styles } from './Followers.styles';

const { Contacts } = Plugins;

export interface EmailAddress {
  label?: string;
  address?: string;
}
type Contact = {
  contactId: string;
  displayName?: string;
  emails: EmailAddress[];
  photoThumbnail?: string;
  organizationName?: string;
  organizationRole?: string;
  birthday?: string;
};

const Followers: React.FC = () => {
  const user = useSelector(userSelectors.getUser);
  const [users, setUsers] = useState<UserType[]>([]);
  const { pathname } = useLocation();
  const isFocus = pathname === '/followers';

  useEffect(() => {
    async function fetchUsers() {
      const _users = await listFollowers(user?.uid);
      if (_users.length > 0) setUsers(_users);
    }

    if (isFocus) {
      fetchUsers();
    }
  }, [user, isFocus]);

  const isFollow = async (followToCheck: string) => {
    const me = user?.uid;
    return new Promise(async (resolve, reject) => {
      if (!me) {
        throw new Error('User disconnect');
      }

      try {
         const subscriptions = await database.ref(`/users/${me}/subscriptions`).once('value')
         if (subscriptions.val() && subscriptions.val().includes(followToCheck)) {
            resolve(true)
         } else {
          reject(false)
         }
      } catch (err) {
        reject(false)
      }
    });
  };

  const removeFollow = useCallback(
    (followToRemove: string) => {
      const me = user?.uid;

      if (!me) {
        throw new Error('User disconnect');
      }
      return database.ref(`/users/`).transaction((snapshot) => {
        if (snapshot) {
          const subscribers = snapshot[followToRemove].subscribers.filter(
            (sub: string) => sub !== me
          );
          snapshot[followToRemove].subscribers = subscribers;

          const subscriptions = snapshot[me].subscriptions.filter(
            (sub: string) => sub !== followToRemove
          );
          snapshot[me].subscriptions = subscriptions;

          snapshot[me].subscriptionsCount =
            snapshot[me]?.subscriptions?.length || 0;
          snapshot[followToRemove].subscribersCount =
            snapshot[followToRemove]?.subscribers?.length || 0;
        }
        return snapshot;
      });
    },
    [user]
  );

  const addAFollow = useCallback(
    (newFollow: string) => {
      const me = user?.uid;

      if (!me) {
        throw new Error('User disconnect');
      }
      return database.ref(`/users/`).transaction((snapshot) => {
        if (snapshot) {
          if (!snapshot[newFollow].subscribers)
            snapshot[newFollow].subscribers = [me];
          else
            snapshot[newFollow].subscribers = new Set([
              ...snapshot[newFollow].subscribers,
              me,
            ]);
          if (!snapshot[me].subscriptions)
            snapshot[me].subscriptions = [newFollow];
          else
            snapshot[me].subscriptions = new Set([
              ...snapshot[me].subscriptions,
              newFollow,
            ]);
          snapshot[me].subscriptionsCount =
            snapshot[me]?.subscriptions?.length || 0;
          snapshot[newFollow].subscribersCount =
            snapshot[newFollow]?.subscribers?.length || 0;
        }
        return snapshot;
      });
    },
    [user]
  );

  const getContacts = useCallback(async (): Promise<void> => {
    const values = await database.ref(`/users/`).once('value');
    const users = values.val();
    const newFollow: string[] = [];
    try {
      const { granted } = await Contacts.getPermissions();
      if (granted) {
        const { contacts } = await Contacts.getContacts();
        contacts.forEach((contact: Contact) => {
          for (const key in users) {
            if (Object.prototype.hasOwnProperty.call(users, key)) {
              const element = users[key];
              if (!contact.emails[0].address || !element.email) continue;
              if (
                contact.emails[0].address.toLowerCase() ===
                element.email.toLowerCase()
              )
                newFollow.push(key);
            }
          }
        });
        newFollow.forEach(async (user) => {
          await addAFollow(user);
        });
      } else {
        // TODO Ask user to turn on contact
      }
    } catch (error) {
      console.log(error);
    }
  }, [addAFollow]);

  useEffect(() => {
    if (user && isFocus) getContacts();
  }, [user, isFocus, getContacts]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonTitle>{t`header.title.followers`}</IonTitle>
          </IonButtons>
          {user && (
            <IonButtons slot={'end'} style={Styles.buttons}>
              <AuthModal />
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {user ? (
          <IonGrid>
            <IonList style={{ backgroundColor: 'transparent' }}>
              <IonRow style={{ justifyContent: 'center' }}>
                {users.map((user, index) => (
                  <IonCol size={'auto'} key={index}>
                    <SubscribeCard {...{ user }} />
                  </IonCol>
                ))}
              </IonRow>
            </IonList>
          </IonGrid>
        ) : (
          <Unauthenticated />
        )}
      </IonContent>

      <Footer />
    </IonPage>
  );
};

export default Followers;
