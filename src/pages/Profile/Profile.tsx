import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { isPlatform } from '@ionic/core';
import { Avatar, RcFile, Upload, UploadChangeParam } from 'antd';
import { t } from 'i18n';

import { database, storage } from 'service/firebase';

import EditProfileModal from 'components/EditProfileModal';
import Footer from 'components/Footer';
import Unauthenticated from 'components/Unauthenticated/Unauthenticated';
import UploadModal from 'components/UploadModal';
import VideoCard from 'components/VideoCard';
import SubscribeCard from 'components/SubscribeCard';
import Loading from 'components/Loading/Loading';

import { Styles } from './Profile.styles';
import type { ProfileType } from './Profile.container';
import { userActions } from 'slices';

const Profile: React.FC<ProfileType.Props> = ({ user, videos, userData }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);

  const onChange = async (info: UploadChangeParam) => {
    info.fileList = [];
    setLoading(true);
    try {
      const uploadTask = await storage
        .ref(`/profilePic/${user!.uid}/${info.file.uid}`)
        .put(info.file as RcFile);
      const downloadURL = await uploadTask.ref.getDownloadURL();
      dispatch(
        userActions.initUser({ user: { ...user, imageUrl: downloadURL } })
      );
      await database
        .ref(`/users/${user!.uid}`)
        .update({ imageUrl: downloadURL });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            {userData && (
              <>
                {isLoading && <Loading text={t`Loading...`} />}
                {userData.uid === user?.uid ? (
                  <Upload
                    accept={'image/*'}
                    beforeUpload={() => false}
                    itemRender={() => <></>}
                    maxCount={1}
                    onChange={onChange}
                  >
                    <Avatar
                      src={user?.imageUrl}
                      size={isPlatform('mobile') ? 'small' : 'large'}
                      icon={<UserOutlined />}
                      style={Styles.buttons}
                    />
                  </Upload>
                ) : (
                  <Avatar
                    src={userData.imageUrl}
                    size={isPlatform('mobile') ? 'small' : 'large'}
                    icon={<UserOutlined />}
                    style={Styles.buttons}
                  />
                )}
              </>
            )}
            <IonTitle>{userData?.name ?? t`header.title.profile`}</IonTitle>
          </IonButtons>
          <IonButtons slot={'end'}>
            {user && userData && userData?.uid === user.uid ? (
              <>
                <UploadModal />
                <EditProfileModal />
              </>
            ) : userData ? (
              <SubscribeCard {...{ userData }} />
            ) : (
              <></>
            )}
          </IonButtons>
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
