import React from 'react';
import { UserType, VideoType } from 'types';

import { message } from 'antd';
import { database } from 'service/firebase';

import DeleteModal from './DeleteModal';
import { t } from 'i18n';

type Props = {
  setModalOpen: (value: boolean) => void;
  owner: UserType | undefined;
  video: VideoType;
};

export declare namespace DeleteModalType {
  type Props = {
    onCancel: () => void;
    onDelete: () => void;
  };
}

const DeleteModalContainer: React.FC<Props> = ({
  setModalOpen,
  owner,
  video,
}) => {
  const onDelete = () => {
    database
      .ref()
      .transaction((post) => {
        if (post) {
          const videos = post.users[owner?.uid!].videos.filter(
            (videoUid: string) => videoUid !== video.objectID
          );
          post.users[owner?.uid!].videos = videos;

          post.videos[video.objectID] = null;
        }
        return post;
      })
      .then(() => {
        message.success(t`deleteModal.success`);
        message.info(t`deleteModal.info`);
        setModalOpen(false);
      })
      .catch(() => {
        message.error(t`deleteModal.error`);
      });
  };

  const onCancel = () => {
    setModalOpen(false);
  };

  return <DeleteModal {...{ onDelete, onCancel }} />;
};

export default DeleteModalContainer;
