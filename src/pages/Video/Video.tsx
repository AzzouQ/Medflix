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
        <Typography.Title>
          {t`watch.description` + ` ${video.description}`}
        </Typography.Title>
        <div style={{ flexDirection: 'column' }}>
          <Typography.Title level={2}>
            {t`watch.view` + ` ${video.view}`}
          </Typography.Title>
          <Typography.Title level={3}>
            {t`watch.like` + ` ${video.like}`}
          </Typography.Title>
          <Typography.Title level={4}>
            {t`watch.report` + ` ${video.report}`}
          </Typography.Title>
          <Input
            onChange={(e) => setCommentInput(e.target.value)}
            value={commentInput}
          />
          <Button type={'primary'} icon={<SendOutlined />} onClick={onComment}>
            {t`watch.comment`}
          </Button>
          {commentList.map(({ author, body, date }: Comment) => (
            <Typography.Title level={4}>{body}</Typography.Title>
          )).reverse()}
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Video;
