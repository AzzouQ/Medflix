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
import UploadModal from 'components/UploadModal';
import Unauthenticated from 'components/Unauthenticated/Unauthenticated';

import { Styles } from './Profile.styles';

import type { ProfileType } from './Profile.container';

const Profile: React.FC<ProfileType.Props> = ({
  user,
  videos,
  goToEditProfile,
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            {user && (
              <Avatar
                size={'large'}
                icon={<UserOutlined />}
                style={Styles.buttons}
              />
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
                {videos?.map((video, index) => (
                  <IonCol size={'auto'} key={index}>
                    <VideoCard video={video} />
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

export default Profile;
