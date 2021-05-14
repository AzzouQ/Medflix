import {
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import 'firebase/auth';
import React from 'react';
// import { sendNotif } from '../service/firebase';
import AuthModal from '../components/AuthModal';
import ProgressBar from '../components/ProgressBar';
import VideoCard from '../components/VideoCard';
import { t } from '../locales';
import { videos } from '../service/fakeData';

// import { sendNotif } from '../service/firebase';

const Home: React.FC = () => {
  const hometitle = t('HOME_TITLE');

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
      <IonFooter>
        <IonToolbar>
          <ProgressBar />
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
