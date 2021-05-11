import React, { useCallback, useState } from 'react';
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
import { Plugins } from '@capacitor/core';
import { useVideoPlayer } from 'react-video-player-hook';
import { Row, Button, Image, Avatar } from 'antd';
import { UserOutlined, MoreOutlined } from '@ant-design/icons';

const { Share } = Plugins;

type Props = {
  video: {
    title: string;
    preview: string;
    url: string;
  };
};

const VideoCard: React.FC<Props> = ({ video }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const onEnded = () => {
    setModalOpen(false);
  };

  const onExit = () => {
    setModalOpen(false);
  };

  const onPause = async (
    fromPlayerId: string,
    currentTime: number | undefined
  ) => {
    console.log(
      'in OnPause playerId ' + fromPlayerId + ' currentTime ' + currentTime
    );
  };

  const { initPlayer } = useVideoPlayer({
    onPause,
    onEnded,
    onExit,
  });

  const startPlaying = useCallback(async () => {
    await initPlayer('fullscreen', video.url, 'fullscreen-video', 'ion-modal');
  }, [initPlayer, video.url]);

  const onPlayVideo = useCallback(() => {
    startPlaying();
  }, [startPlaying]);

  const onShare = useCallback(async () => {
    await Share.share({
      title: 'See video',
      text: 'Really awesome video you need to see right now',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }, []);

  return (
    <>
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setModalOpen(false)}>
        <Row justify={'center'} align={'middle'} style={{ height: '100%' }}>
          <Button
            type={'primary'}
            style={{ marginRight: 20 }}
            onClick={onPlayVideo}
          >
            {'Play'}
          </Button>

          <div id={'fullscreen-video'} slot={'fixed'}></div>
        </Row>
      </IonModal>
      <IonCard>
        <IonRow>
          <IonCardContent onClick={() => setModalOpen(true)}>
            <Image
              src={video.preview}
              height={200}
              width={400}
              preview={false}
            />
          </IonCardContent>
        </IonRow>
        <IonCardHeader>
          <IonRow>
            <IonCol size={'2'}>
              <Avatar size={'large'} icon={<UserOutlined />} />
            </IonCol>
            <IonCol size={'9'}>
              <IonCardTitle>{video.title}</IonCardTitle>
              <IonCardSubtitle>{'Author'}</IonCardSubtitle>
            </IonCol>
            <IonCol size={'1'}>
              <MoreOutlined style={{ fontSize: 30 }} onClick={onShare} />
            </IonCol>
          </IonRow>
        </IonCardHeader>
      </IonCard>
    </>
  );
};

export default VideoCard;
