import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { Plugins } from '@capacitor/core';
import { t } from 'i18n';

import Footer from 'components/Footer';
import AuthModal from 'components/AuthModal';
import SubscribeCard from 'components/SubscribeCard';
import Unauthenticated from 'components/Unauthenticated/Unauthenticated';

import { listUser } from 'service/firebase/users';
import { auth, database } from 'service/firebase';

import { userSelectors, userActions, UserType } from 'slices';

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
    getContacts();
  }, []);

  const getContacts = async (): Promise<void> => {
    const values = await database.ref(`user/`).get();
    const users = values.val();
    try {
      const { granted } = await Contacts.getPermissions();
      if (granted) {
        const { contacts } = await Contacts.getContacts();
        contacts.map((contact: Contact) =>
          users.map((user: UserType) => {
            contact.emails[0] === user.email && console.log('');
            return null; //TODO follower user if not already followed
          })
        );
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
