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
import { t } from 'i18n';

import { listUser } from 'service/firebase/users';

import Footer from 'components/Footer';
import AuthModal from 'components/AuthModal';
import SubscribeCard from 'components/SubscribeCard';
import Unauthenticated from 'components/Unauthenticated/Unauthenticated';

import { auth, database } from 'service/firebase';
import { userActions, userSelectors } from 'slices';

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonTitle>{t`header.title.followers`}</IonTitle>
          </IonButtons>
          <IonButtons slot={'end'} style={{ marginRight: 20 }}>
            <AuthModal />
          </IonButtons>
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
