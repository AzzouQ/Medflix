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
import { Avatar, Button, Typography } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { t } from 'i18n';

import Footer from 'components/Footer';
import VideoCard from 'components/VideoCard';
import UploadModal from 'components/UploadModal';

import { Styles } from './Profile.styles';

import type { ProfileType } from './Profile.container';
import AuthModal from 'components/AuthModal';
import { auth } from 'service/firebase';

const Profile: React.FC<ProfileType.Props> = ({
  user,
  videos,
  goToEditProfile,
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'} style={Styles.buttons}>
            {auth.currentUser && (
              <Avatar size={'large'} icon={<UserOutlined />} />
            )}
            <IonTitle>{user?.name ?? t`header.title.profile`}</IonTitle>
          </IonButtons>
          {user && (
            <IonButtons slot={'end'}>
              <UploadModal />
              <Button
                type={'primary'}
                style={Styles.button}
                icon={<EditOutlined />}
                onClick={goToEditProfile}
              >
                {t`header.button.edit`}
              </Button>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        {user ? (
          <IonGrid>
            <IonList style={Styles.list}>
              <IonRow style={Styles.container}>
                {videos.map((video, index) => (
                  <IonCol size={'auto'} key={index}>
                    <VideoCard video={video} />
                  </IonCol>
                ))}
              </IonRow>
            </IonList>
          </IonGrid>
        ) : (
          <IonGrid style={Styles.grid}>
            <IonRow style={Styles.gridRow}>
              <IonCol size={'12'}>
                <IonRow style={Styles.unsignedRow}>
                  <Typography.Title>{t`form.signIn.title`}</Typography.Title>
                </IonRow>
                <IonRow style={Styles.unsignedRow}>
                  <AuthModal />
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>

      <Footer />
    </IonPage>
  );
};

export default Profile;
