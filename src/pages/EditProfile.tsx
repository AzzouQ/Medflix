import {
    IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

import EditProfileForm from '../components/EditProfileForm';

const EditProfie: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonGrid>
          <EditProfileForm />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditProfie;
