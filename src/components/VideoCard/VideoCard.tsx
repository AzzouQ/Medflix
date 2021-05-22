import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonModal,
  IonRow,
} from '@ionic/react';
import { Button, Image, Avatar } from 'antd';
import { UserOutlined, ShareAltOutlined } from '@ant-design/icons';

import { Styles } from './VideoCard.styles';
import { thumbnail } from 'assets';

import type { VideoCardType } from './VideoCard.container';

const VideoCard: React.FC<VideoCardType.Props> = ({
  modalOpenState: [isModalOpen, setModalOpen],
  onStartPlaying,
  onShare,
  video,
  ownerName,
}) => {
  return (
    <>
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setModalOpen(false)}>
        <IonRow style={Styles.container}>
          <Button type={'primary'} onClick={onStartPlaying}>
            {'Play'}
          </Button>
        </IonRow>
        <div id={'fullscreen-video'} slot={'fixed'}></div>
      </IonModal>
      <IonCard>
        <IonRow>
          <IonCardContent onClick={() => setModalOpen(true)}>
            <Image src={thumbnail} height={200} width={340} preview={false} />
          </IonCardContent>
        </IonRow>
        <IonCardHeader>
          <IonRow>
            <IonCol size={'2'}>
              <Avatar size={'large'} icon={<UserOutlined />} />
            </IonCol>
            <IonCol size={'9'}>
              <IonCardTitle>{video.title}</IonCardTitle>
              <IonCardSubtitle>{ownerName}</IonCardSubtitle>
            </IonCol>
            <IonCol size={'1'}>
              <ShareAltOutlined style={Styles.icon} onClick={onShare} />
            </IonCol>
          </IonRow>
        </IonCardHeader>
      </IonCard>
    </>
  );
};

export default VideoCard;
