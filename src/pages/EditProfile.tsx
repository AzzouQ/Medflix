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
import useTranslate from '../local/local';

const EditProfie: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{useTranslate("EDIT_PROFILE_VIEW_TITLE")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Edit Profile</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <EditProfileForm />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditProfie;
