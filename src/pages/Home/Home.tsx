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
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { t } from 'i18n';

import AuthModal from 'components/AuthModal';
import VideoCard from 'components/VideoCard';
import Footer from 'components/Footer';

import { Styles } from './Home.styles';

import type { HomeType } from './Home.container';

const Home: React.FC<HomeType.Props> = ({
  videos,
  searchText,
  setSearchText,
}) => {
  const VideoList = () => {
    return (
      <>
        {videos?.map((video, index) => (
          <IonCol size={'auto'} key={index}>
            <VideoCard video={video} mode="REDIRECT" />
          </IonCol>
        ))}
      </>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonTitle>{t`header.title.home`}</IonTitle>

            <IonSearchbar
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
            />
          </IonButtons>
          <IonButtons slot={'end'} style={Styles.buttons}>
            <AuthModal />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonGrid>
          <IonList style={Styles.list}>
            <IonRow style={Styles.container}>
              <VideoList />
            </IonRow>
          </IonList>
        </IonGrid>
      </IonContent>

      <Footer />
    </IonPage>
  );
};

export default Home;
