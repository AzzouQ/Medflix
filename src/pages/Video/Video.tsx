import { UserOutlined } from '@ant-design/icons';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Avatar } from 'antd';
import EditProfileModal from 'components/EditProfileModal';
import Footer from 'components/Footer';
import UploadModal from 'components/UploadModal';
import VideoCard from 'components/VideoCard';
import { t } from 'i18n';
import React from 'react';
import type { VideoView } from './Video.container';
import { Styles } from './Video.styles';

const Video: React.FC<VideoView.Props> = ({ user, video, userData }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            {userData && (
              <Avatar
                size={'large'}
                icon={<UserOutlined />}
                style={Styles.buttons}
              />
            )}
            <IonTitle>{video.title ?? t`header.title.profile`}</IonTitle>
          </IonButtons>
          {user && (
            <IonButtons slot={'end'}>
              <UploadModal />
              <EditProfileModal />
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <VideoCard video={video} mode="WATCH" />
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Video;
