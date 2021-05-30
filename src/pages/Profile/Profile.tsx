import { UserOutlined } from '@ant-design/icons';
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
import { Avatar } from 'antd';
import EditProfileModal from 'components/EditProfileModal';
import Footer from 'components/Footer';
import Unauthenticated from 'components/Unauthenticated/Unauthenticated';
import UploadModal from 'components/UploadModal';
import VideoCard from 'components/VideoCard';
import { t } from 'i18n';
import React from 'react';
import type { ProfileType } from './Profile.container';
import { Styles } from './Profile.styles';

const Profile: React.FC<ProfileType.Props> = ({ user, videos, userData }) => {
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
            <IonTitle>{userData?.name ?? t`header.title.profile`}</IonTitle>
          </IonButtons>
          {user && userData?.uid === user.uid && (
            <IonButtons slot={'end'}>
              <UploadModal />
              <EditProfileModal />
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        {userData ? (
          <IonGrid>
            <IonList style={Styles.list}>
              <IonRow style={Styles.container}>
                {videos?.map((video, index) => (
                  <IonCol size={'auto'} key={index}>
                    <VideoCard video={video} />
                  </IonCol>
                ))}
              </IonRow>
            </IonList>
          </IonGrid>
        ) : (
          <Unauthenticated /> // TODO 404
        )}
      </IonContent>

      <Footer />
    </IonPage>
  );
};

export default Profile;
