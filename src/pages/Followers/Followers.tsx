import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
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

import { database } from 'service/firebase';
import { userSelectors } from 'slices';

import AuthModal from 'components/AuthModal';
import Footer from 'components/Footer';
import Unauthenticated from 'components/Unauthenticated';
import VideoCard from 'components/VideoCard';

import type { VideoType } from 'types';
import { Styles } from './Followers.styles';

const Followers: React.FC = () => {
  const user = useSelector(userSelectors.getUser);
  const { pathname } = useLocation();
  const isFocus = pathname === '/followers';
  const [videos, setVideos] = useState<VideoType[]>();

  useEffect(() => {
    const getVideos = async () => {
      const videosIDsSnap = await database
        .ref(`/users/${user?.uid}/subscriptions`)
        .get();
      if (videosIDsSnap.val()) {
        const videosIDs: string[] = Object.values(videosIDsSnap.val());
        const videosSnap = await database.ref(`/videos`).get();
        const videos: { [key: string]: VideoType } = videosSnap.val();
        const myVideos = videosIDs.map((id) => {
          return videos[id as string];
        });
        setVideos(myVideos);
      } else {
        setVideos([]);
      }
    };
    if (isFocus) {
      getVideos();
    }
  }, [user, isFocus]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonTitle>{t`header.title.followers`}</IonTitle>
          </IonButtons>

          {user && (
            <IonButtons slot={'end'} style={Styles.buttons}>
              <AuthModal />
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {user ? (
          <IonGrid>
            <IonList style={{ backgroundColor: 'transparent' }}>
              <IonRow style={{ justifyContent: 'center' }}>
                {videos?.map((video, index) => (
                  <IonCol size={'auto'} key={index}>
                    <VideoCard video={video} mode="WATCH" />
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
