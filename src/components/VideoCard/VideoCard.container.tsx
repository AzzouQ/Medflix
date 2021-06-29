import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isPlatform } from '@ionic/react';
import { Share } from '@capacitor/share';
import { Clipboard } from '@capacitor/clipboard';
import { message } from 'antd';
import { t } from 'i18n';

import { database } from 'service/firebase';
import { userSelectors } from 'slices';

import VideoCard from './VideoCard';

import type { UserType, UseStateType, VideoType } from 'types';
import { useHistory } from 'react-router';

type Props = {
  video: VideoType;
};

export declare namespace VideoCardType {
  type Props = {
    onCardClick: () => void;
    modalOpenState: [boolean, UseStateType<boolean>];
    modalEditState: [boolean, UseStateType<boolean>];
    modalDeleteState: [boolean, UseStateType<boolean>];
    onShare: () => Promise<void>;
    video: VideoType;
    owner: UserType | undefined;
  };
}

const VideoCardContainer: React.FC<Props> = ({ video }) => {
  const user = useSelector(userSelectors.getUser);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const [owner, setOwner] = useState<UserType>();
  const history = useHistory();

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
    history.push('/watch/' + video.objectID);
  };

  return (
    <>
      <div id={'fullscreen-video'} slot={'fixed'}></div>

      <VideoCard
        {...{
          onShare,
          modalOpenState: [isModalOpen, setModalOpen],
          modalEditState: [showModalEdit, setShowModalEdit],
          modalDeleteState: [showModalDelete, setShowModalDelete],
          video,
          owner: owner,
          onCardClick,
        }}
      />
    </>
  );
};

export default VideoCardContainer;
