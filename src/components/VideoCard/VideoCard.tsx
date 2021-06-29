import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonRow,
  IonModal,
} from '@ionic/react';
import { Image, Avatar } from 'antd';
import {
  UserOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import EditModal from 'components/EditModal';
import DeleteModal from 'components/DeleteModal';

import { Styles } from './VideoCard.styles';
import { thumbnail } from 'assets';

import type { VideoCardType } from './VideoCard.container';
import { useSelector } from 'react-redux';
import { userSelectors } from 'slices';

const VideoCard: React.FC<VideoCardType.Props> = ({
  modalOpenState: [isModalOpen, setModalOpen],
  modalEditState: [showModalEdit, setShowModalEdit],
  modalDeleteState: [showModalDelete, setShowModalDelete],
  onCardClick,
  onShare,
  video,
  owner,
}) => {
  const user = useSelector(userSelectors.getUser);

  return (
    <>
      <IonModal
        isOpen={showModalEdit}
        onDidDismiss={() => setShowModalEdit(false)}
      >
        <EditModal {...{ video, setModalOpen: setShowModalEdit }} />
      </IonModal>
      <IonModal
        isOpen={showModalDelete}
        onDidDismiss={() => setShowModalDelete(false)}
      >
        <DeleteModal {...{ video, owner, setModalOpen: setShowModalDelete }} />
      </IonModal>
      <IonCard>
        <IonRow>
          <IonCardContent onClick={onCardClick}>
            <Image
              src={video.thumbnail || thumbnail}
              height={200}
              width={280}
              preview={false}
            />
          </IonCardContent>
        </IonRow>
        <IonCardHeader>
          <IonRow>
            <IonCol size={'2'}>
              <a href={`/profile/${owner?.uid}`}>
                <Avatar
                  size={'large'}
                  icon={<UserOutlined />}
                  src={
                    user?.uid === owner?.uid ? user?.imageUrl : owner?.imageUrl
                  }
                />
              </a>
            </IonCol>
            <IonCol size={user?.uid === owner?.uid ? '7' : '9'}>
              <IonCardTitle>{video.title}</IonCardTitle>
              <IonCardSubtitle>{owner?.name}</IonCardSubtitle>
            </IonCol>
            <IonCol size={user?.uid === owner?.uid ? '3' : '1'}>
              <ShareAltOutlined style={Styles.icon} onClick={onShare} />
              {user?.uid === owner?.uid && (
                <DeleteOutlined
                  style={Styles.icon}
                  onClick={() => setShowModalDelete(true)}
                />
              )}
              {user?.uid === owner?.uid && (
                <EditOutlined
                  style={Styles.icon}
                  onClick={() => setShowModalEdit(true)}
                />
              )}
            </IonCol>
          </IonRow>
        </IonCardHeader>
      </IonCard>
    </>
  );
};

export default VideoCard;
