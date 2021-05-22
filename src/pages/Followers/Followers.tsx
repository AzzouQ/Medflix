import { Plugins } from '@capacitor/core';
import {
  IonButton,
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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, database } from 'service/firebase';
import { listUser } from 'service/firebase/users';
import { userActions, userSelectors } from 'slices';
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
  const dispatch = useDispatch();
  const currentUser = auth.currentUser;
  const user = useSelector(userSelectors.getUser);
  const [users, setUsers] = useState<string[]>([]);

  const names = [
    'Nazim',
    'Bastien',
    'Jean-Louis',
    'Paul',
    'Robert',
    'Dr.Raoult',
    'Bertrand',
    'Thomas',
    'Abdelkrim',
  ];

  useEffect(() => {
    async function getUser() {
      const user = await database.ref(`/user/${currentUser?.uid}`).get();
      dispatch(userActions.setUser({ user: user.val() }));
    }
    getUser();
  }, [dispatch, currentUser]);

  useEffect(() => {
    async function fetchUsers() {
      const _users = await listUser();
      setUsers(_users);
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentUser) getContacts();
  });

  const addAFollow = (newFollow: string) => {
    const me = currentUser?.uid;
    if (!me) return;
    database.ref(`/user/`).transaction((snapshot) => {
      if (snapshot) {
        if (!snapshot[newFollow].subscribers)
          snapshot[newFollow].subscribers = [];
        if (snapshot[newFollow].subscribers.includes(me)) {
          return snapshot;
        } else {
          snapshot[newFollow].subscribers = new Set([
            ...snapshot[newFollow].subscribers,
            me,
          ]);
          snapshot[me].subscriptions = new Set([
            ...snapshot[me].subscriptions,
            newFollow,
          ]);
          snapshot[me].subscriptionsCount++;
          snapshot[newFollow].subscribersCount++;
        }
      }
      return snapshot;
    });
  };

  const addToSubscriptions = async (newFollow: string[]) => {
    newFollow.forEach((user) => {
      addAFollow(user);
    });
  };

  const getContacts = async (): Promise<void> => {
    const values = await database.ref(`user/`).get();
    const users = values.val();
    const newFollow: string[] = [];

    try {
      const { granted } = await Contacts.getPermissions();
      console.log('grandted?');
      if (granted) {
        console.log('yes?');
        const { contacts } = await Contacts.getContacts();

        console.log('contactssssss');
        console.log(contacts);
        contacts.forEach((contact: Contact) => {
          for (const key in users) {
            if (Object.prototype.hasOwnProperty.call(users, key)) {
              const element = users[key];
              console.log('contact', contact);
              console.log('element', element.email);
              if (contact.emails[0].address === element.email)
                newFollow.push(key);
            }
          }
        });
        addToSubscriptions(newFollow);
      } else {
        console.log('no?');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <IonButton onClick={getContacts} title="getContact" />

            <IonList style={{ backgroundColor: 'transparent' }}>
              <IonRow style={{ justifyContent: 'center' }}>
                {users.map((fcm, index) => (
                  <IonCol size={'auto'} key={index}>
                    <SubscribeCard user={{ fcm, name: names[index] }} />
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
