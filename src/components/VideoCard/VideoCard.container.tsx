import React, { useCallback, useEffect, useRef, useState } from 'react';
import { isPlatform } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { useVideoPlayer } from 'react-video-player-hook';

import VideoCard from './VideoCard';

import type { UseStateType } from 'types';
import type { VideoType } from 'types/video';
import { database } from 'service/firebase';
import { useSelector } from 'react-redux';
import { userSelectors } from 'slices';

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
    ownerName: string;
  };
}

type OnLog = (fromPlayerId: string, currentTime: number | undefined) => void;

const VideoCardContainer: React.FC<Props> = ({ video }) => {
  const user = useSelector(userSelectors.getUser);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const isExited = useRef(false);
  const [ownerName, setOwnerName] = useState<string>('Unknown');

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
        title: video.title,
        text: video.description,
        url: video.url,
        dialogTitle: 'Share with your friends !',
      });
    } else {
      Clipboard.write({
        string: video.url,
      });
    }
  }, [video]);

  useEffect(() => {
    const getOwnerName = async () => {
      const ownerNameSnap = await database.ref(`/users/${video.owner}`).get();
      const ownerName = ownerNameSnap.val();
      setOwnerName(ownerName ? ownerName.name : user?.name);
    };
    getOwnerName();
  }, [user?.name, video.owner]);

  return (
    <VideoCard
      {...{
        modalOpenState: [isModalOpen, setModalOpen],
        onShare,
        onStartPlaying,
        video,
        ownerName,
      }}
    />
  );
};

export default VideoCardContainer;
