import {
  FrownOutlined,
  LikeOutlined,
  DislikeOutlined,
} from '@ant-design/icons';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Button, Typography } from 'antd';
import Footer from 'components/Footer';
// import VideoCard from 'components/VideoCard';
import React from 'react';
import type { VideoView } from './Video.container';
import { Styles } from './Video.styles';

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
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonTitle>{'-Watch'}</IonTitle>
          </IonButtons>

          <IonButtons slot={'end'}>
            <Button
              type={'primary'}
              icon={isLiked ? <DislikeOutlined /> : <LikeOutlined />}
              onClick={onLike}
              loading={likeLoading}
              style={Styles.button}
            >
              {isLiked ? '-Unlike' : '-Like'}
            </Button>
            <Button
              type={'primary'}
              icon={<FrownOutlined />}
              onClick={onReport}
              loading={reportLoading}
              style={Styles.button}
            >
              {isReport ? '-Unreport' : '-Report'}
            </Button>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        {/* <VideoCard video={video} mode="WATCH" /> */}

        <Typography.Title>{`-Description ${video.description}`}</Typography.Title>
        <div style={{ flexDirection: 'column' }}>
          <Typography.Title level={2}>{`-View ${video.view}`}</Typography.Title>
          <Typography.Title level={3}>{`-Like ${video.like}`}</Typography.Title>
          <Typography.Title
            level={4}
          >{`-Report ${video.report}`}</Typography.Title>
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Video;
