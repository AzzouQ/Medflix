import React, { useEffect, useState } from 'react';
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
import { t } from 'i18n';

import Footer from 'components/Footer';
import AuthModal from 'components/AuthModal';
import SubscribeCard from 'components/SubscribeCard';

import { listUser } from 'service/firebase/users';
import { Plugins } from '@capacitor/core';
import { auth, database } from 'service/firebase';

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

type UserType = {
  name: string;
  createDate: string;
  updateDate: string;
  subscribersCount: number;
  subscriptionsCount: number;
  email: string;
};
const Followers: React.FC = () => {
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
            contact.emails[0] === user.email && console.log("");
            //TODO follower user if not already followed
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
          <IonButtons slot={'end'}>
            <AuthModal />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
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
      </IonContent>

      <Footer />
    </IonPage>
  );
};

export default Followers;
