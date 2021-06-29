import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  FrownOutlined,
  LikeOutlined,
  DislikeOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Button, Typography, Input } from 'antd';

import Footer from 'components/Footer';

import type { Comment, VideoView } from './Video.container';
import { Styles } from './Video.styles';
import { t } from 'i18n';
import { CapacitorVideoPlayer } from 'capacitor-video-player';

const Video: React.FC<VideoView.Props> = ({
  user,
  video,
  userData,
  onReport,
  onLike,
  likeLoading,
  isLiked,
  reportLoading,
  isReport,
  commentList,
  commentState: [commentInput, setCommentInput],
  onComment,
}) => {
  const onPlay = () => {
    CapacitorVideoPlayer.initPlayer({
      mode: 'fullscreen',
      url: video?.url,
      playerId: 'fullscreen',
      componentTag: 'div',
    });

    CapacitorVideoPlayer.play({ playerId: 'fullscreen' });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonTitle>{t`watch.title`}</IonTitle>
          </IonButtons>

          <IonButtons slot={'end'}>
            <Button
              type={'primary'}
              icon={isLiked ? <DislikeOutlined /> : <LikeOutlined />}
              onClick={onLike}
              loading={likeLoading}
              style={Styles.button}
            >
              {isLiked ? t`watch.unlike` : t`watch.like`}
            </Button>
            <Button
              type={'primary'}
              icon={<FrownOutlined />}
              onClick={onReport}
              loading={reportLoading}
              style={Styles.button}
            >
              {isReport ? t`watch.unreport` : t`watch.report`}
            </Button>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <div style={{ flexDirection: 'row', display: 'flex' }}>
          <div
            id="fullscreen"
            style={{
              display: 'block',
              maxWidth: '60vw',
              maxHeight: '60vh',
              width: 'auto',
              height: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              alt="video"
              style={{
                display: 'block',
                maxWidth: '60vw',
                maxHeight: '60vh',
                width: 'auto',
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={onPlay}
              src={video.thumbnail}
            />
          </div>

          <div
            style={{
              textAlign: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Typography.Title level={2}>
              {t`watch.view` + ` ${video.view}`}
            </Typography.Title>
            <Typography.Title level={3}>
              {t`watch.like` + ` ${video.like}`}
            </Typography.Title>
            <Typography.Title level={4}>
              {t`watch.report` + ` ${video.report}`}
            </Typography.Title>
          </div>
        </div>
        <Typography.Title>
          {t`watch.description` + ` ${video.description}`}
        </Typography.Title>
        <div
          style={{
            flexDirection: 'column',
            display: 'flex',
            flex: 1,
          }}
        >
          <Input
            onChange={(e) => setCommentInput(e.target.value)}
            value={commentInput}
          />
          <Button type={'primary'} icon={<SendOutlined />} onClick={onComment}>
            {t`watch.comment`}
          </Button>
          {commentList
            .map(({ author, body, date }: Comment) => (
              <Typography.Title level={4}>{body}</Typography.Title>
            ))
            .reverse()}
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Video;
