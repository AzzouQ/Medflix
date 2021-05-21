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
import { Avatar, Button } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { t } from 'i18n';

import Footer from 'components/Footer';
import VideoCard from 'components/VideoCard';

import { Styles } from './Profile.styles';

import type { ProfileType } from './Profile.container';
import UploadModal from 'components/UploadModal';

const Profile: React.FC<ProfileType.Props> = ({
  user,
  videos,
  goToUpload,
  goToEditProfile,
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'} style={Styles.button}>
            <Avatar size={'large'} icon={<UserOutlined />} />
            <IonTitle>{user.name}</IonTitle>
          </IonButtons>
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
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
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
      </IonContent>

      <Footer />
    </IonPage>
  );
};

export default Profile;
