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

import AuthModal from '../components/AuthModal';
import VideoCard from '../components/VideoCard';

import { videos } from '../service/fakeData';

import useTranslate from '../local/local';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const hometitle = useTranslate('HOME_TITLE');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonTitle>{hometitle}</IonTitle>
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
