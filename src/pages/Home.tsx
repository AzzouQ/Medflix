import React, { useEffect, useState } from 'react';
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
import firebase from 'firebase/app';
import 'firebase/auth';
import { Avatar, Button, Image, Menu, Typography, notification } from 'antd';
import {
  LoginOutlined,
  LogoutOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Plugins } from '@capacitor/core';
import ProgressBar from '../components/ProgressBar';
import { useHistory } from 'react-router';
// import { sendNotif } from '../service/firebase';

import AuthModal from '../components/AuthModal';
import VideoCard from '../components/VideoCard';

import { videos } from '../service/fakeData';

import useTranslate from '../local/local';


// import { sendNotif } from '../service/firebase';

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
      <IonFooter>
        <IonToolbar>
          <ProgressBar />
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
