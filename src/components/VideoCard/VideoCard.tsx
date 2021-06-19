import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonRow,
} from '@ionic/react';
import { Image, Avatar } from 'antd';
import { UserOutlined, ShareAltOutlined } from '@ant-design/icons';

import { Styles } from './VideoCard.styles';
import { thumbnail } from 'assets';

import type { VideoCardType } from './VideoCard.container';

const VideoCard: React.FC<VideoCardType.Props> = ({
  modalOpenState: [isModalOpen, setModalOpen],
  onStartPlaying,
  onCardClick,
  onShare,
  video,
  owner,
}) => {
  return (
    <>
      <IonCard>
        <IonRow>
          <IonCardContent onClick={onCardClick}>
            <Image
              src={video.thumbnail || thumbnail}
              height={200}
              width={340}
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
                  src={owner?.imageUrl}
                />
              </a>
            </IonCol>
            <IonCol size={'9'}>
              <IonCardTitle>{video.title}</IonCardTitle>
              <IonCardSubtitle>{owner?.name}</IonCardSubtitle>
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
