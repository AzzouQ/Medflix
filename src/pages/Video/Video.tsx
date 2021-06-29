import React, { useEffect } from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  FrownOutlined,
  LikeOutlined,
  DislikeOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Button, Typography, Input, Image } from 'antd';

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
  const onPlay = async () => {
    await CapacitorVideoPlayer.initPlayer({
      mode: 'fullscreen',
      url: video?.url,
      playerId: 'fullscreen',
      componentTag: 'div',
    });
    await CapacitorVideoPlayer.play({ playerId: 'fullscreen' });
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
        <IonRow
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <Image
            src={video.thumbnail}
            preview={false}
            height={400}
            width={640}
            onClick={onPlay}
          />
          <div id="fullscreen" />
        </IonRow>
        <IonRow>
          <Typography.Title
            level={1}
            style={{ textAlign: 'center', justifySelf: 'center' }}
          >
            {video.title}
          </Typography.Title>
        </IonRow>
        <IonRow>
          <Typography.Title
            level={4}
            style={{ textAlign: 'center', justifySelf: 'center' }}
          >
            {`${video.view} ` +
              t`watch.view` +
              ` - ${video.view} ` +
              t`watch.like`}
          </Typography.Title>
        </IonRow>

        <IonRow>
          <Typography.Title level={5}>
            {video.description ?? 'Pas de description'}
          </Typography.Title>
        </IonRow>
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
