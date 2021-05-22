import React, { useCallback, useRef, useState } from 'react';
import { isPlatform } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { useVideoPlayer } from 'react-video-player-hook';

import VideoCard from './VideoCard';

import type { UseStateType } from 'types';
import type { VideoType } from 'service/fakeData';

const { Share, Clipboard } = Plugins;

type Props = {
  video: VideoType;
};

export declare namespace VideoCardType {
  type Props = {
    modalOpenState: [boolean, UseStateType<boolean>];
    onStartPlaying: () => void;
    onShare: () => Promise<void>;
    video: VideoType;
  };
}

type OnLog = (fromPlayerId: string, currentTime: number | undefined) => void;

const VideoCardContainer: React.FC<Props> = ({ video }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const isExited = useRef(false);

  const onCloseModal = async () => {
    await stopAllPlayers();
    setModalOpen(false);
    isExited.current = true;
  };

  const onLog: OnLog = async (
    fromPlayerId: string,
    currentTime: number | undefined
  ) => {
    if (!isExited.current) {
      console.log(`${fromPlayerId} is at ${currentTime}`);
    }
  };

  const { initPlayer, stopAllPlayers } = useVideoPlayer({
    onPause: onLog,
    onPlay: onLog,
    onEnded: onCloseModal,
    onExit: onCloseModal,
  });

  const onStartPlaying = useCallback(async () => {
    await initPlayer('fullscreen', video.url, 'fullscreen-video', 'ion-modal');
  }, [initPlayer, video.url]);

  const onShare = useCallback(async () => {
    if (isPlatform('mobile')) {
      await Share.share({
        title: 'Watch this video !',
        text: 'Really awesome video you need to see right now !',
        url: video.url,
        dialogTitle: 'Share your video',
      });
    } else {
      Clipboard.write({
        string: video.url,
      });
    }
  }, [video.url]);

  return (
    <VideoCard
      {...{
        modalOpenState: [isModalOpen, setModalOpen],
        onShare,
        onStartPlaying,
        video,
      }}
    />
  );
};

export default VideoCardContainer;
