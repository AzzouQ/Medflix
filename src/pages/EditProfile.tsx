import {
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import EditProfileForm from '../components/EditProfileForm';
import { t } from '../i18n';

const EditProfie: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t`header.title.editProfile`}</IonTitle>
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
