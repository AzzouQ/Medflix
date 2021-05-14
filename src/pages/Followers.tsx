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
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import SubscribeCard from '../components/SubscribeCard';
import { t } from '../i18n';
import { listUser } from '../service/firebase/users';

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

  const viewTitle = t('FOLLOWERS_VIEW_TITLE');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonTitle>{viewTitle}</IonTitle>
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
