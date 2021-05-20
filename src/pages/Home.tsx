import React from 'react';
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

import AuthModal from 'components/AuthModal';
import VideoCard from 'components/VideoCard';
import Footer from 'components/Footer';

import { videos } from 'service/fakeData';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonTitle>{t`header.title.home`}</IonTitle>
          </IonButtons>
          <IonButtons slot={'end'}>
            <AuthModal />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonGrid>
          <IonList style={{ backgroundColor: 'transparent' }}>
            <IonRow style={{ justifyContent: 'center' }}>
              {videos.map((video, index) => (
                <IonCol size={'auto'} key={index}>
                  <VideoCard video={video} />
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

export default Home;
