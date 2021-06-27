import React from 'react';
import { UserType, VideoType } from 'types';

import { message } from 'antd';
import { database } from 'service/firebase';

import DeleteModal from './DeleteModal';

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
    // TODO DELETE VIDEO
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
        message.success('video removed!');
        message.info('refresh to update data');
        setModalOpen(false);
      })
      .catch(() => {
        message.error('failed to remove video...');
      });
    setModalOpen(false);
  };

  const onCancel = () => {
    setModalOpen(false);
  };

  return <DeleteModal {...{ onDelete, onCancel }} />;
};

export default DeleteModalContainer;
