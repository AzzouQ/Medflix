import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { isPlatform } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { useVideoPlayer } from 'react-video-player-hook';
import { message } from 'antd';
import { t } from 'i18n';

import { database } from 'service/firebase';
import { userSelectors } from 'slices';

import VideoCard from './VideoCard';

import type { UserType, UseStateType, VideoType } from 'types';
import { useHistory } from 'react-router';

const { Share, Clipboard } = Plugins;

type Props = {
  video: VideoType;
  mode: 'REDIRECT' | 'WATCH';
};

export declare namespace VideoCardType {
  type Props = {
    onCardClick: () => void;
    modalOpenState: [boolean, UseStateType<boolean>];
    modalEditState: [boolean, UseStateType<boolean>];
    modalDeleteState: [boolean, UseStateType<boolean>];
    onStartPlaying: () => void;
    onShare: () => Promise<void>;
    video: VideoType;
    owner: UserType | undefined;
  };
}

type OnLog = (fromPlayerId: string, currentTime: number | undefined) => void;

const VideoCardContainer: React.FC<Props> = ({ video, mode }) => {
  const user = useSelector(userSelectors.getUser);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const isExited = useRef(false);
  const [owner, setOwner] = useState<UserType>();
  const history = useHistory();

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
    database.ref(`/videos/${video.objectID}/view`).transaction((viewCount) => {
      return viewCount + 1;
    });
    await initPlayer(
      'embedded',
      video.url,
      'fullscreen-video',
      'div',
      800,
      400
    );
  }, [initPlayer, video.url, video.objectID]);

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
      message.success(t`message.copy`);
    }
  }, [video]);

  useEffect(() => {
    const getOwner = async () => {
      const ownerSnap = await database.ref(`/users/${video.owner}`).get();
      setOwner({ ...ownerSnap.val(), uid: ownerSnap.key });
    };
    getOwner();
  }, [user?.name, video.owner]);

  const onCardClick = () => {
    if (mode === 'REDIRECT') history.push('/watch/' + video.objectID);
    else if (mode === 'WATCH') onStartPlaying();
  };

  return (
    <>
      <div id={'fullscreen-video'} slot={'fixed'}></div>

      <VideoCard
        {...{
          modalOpenState: [isModalOpen, setModalOpen],
          modalEditState: [showModalEdit, setShowModalEdit],
          modalDeleteState: [showModalDelete, setShowModalDelete],
          onShare,
          onStartPlaying,
          video,
          owner: owner,
          onCardClick,
        }}
      />
    </>
  );
};

export default VideoCardContainer;
