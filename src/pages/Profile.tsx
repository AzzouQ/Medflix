import React from 'react';
import { useHistory } from 'react-router';
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
import { EditOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { t } from '../i18n';

import Footer from '../components/Footer';
import VideoCard from '../components/VideoCard';

import { user, videos } from '../service/fakeData';

const Profile: React.FC = () => {
  const { push } = useHistory();

  const goToUpload = () => {
    push('/create');
  };

  const goToEditProfile = () => {
    push('/editProfile');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'} style={{ marginLeft: 20 }}>
            <Avatar size={'large'} icon={<UserOutlined />} />
            <IonTitle>{user.name}</IonTitle>
          </IonButtons>
          <IonButtons slot={'end'}>
            <Button
              type={'primary'}
              style={{ marginRight: 20 }}
              icon={<UploadOutlined />}
              onClick={goToUpload}
            >
              {t`header.button.upload`}
            </Button>
            <Button
              type={'primary'}
              style={{ marginRight: 20 }}
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

export default Profile;
