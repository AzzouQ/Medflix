import React, { useState } from 'react';
import { UserType, UseStateType, VideoType } from 'types';

import { message } from 'antd';
import { database } from 'service/firebase';

import EditModal from './EditModal';

type Props = {
  setModalOpen: (value: boolean) => void;
  video: VideoType;
  owner: UserType | undefined;
};

export declare namespace EditModalType {
  type Props = {
    setModalOpen: (value: boolean) => void;
    titleState: [string, UseStateType<string>];
    descriptionState: [string, UseStateType<string>];
    onSubmit: () => void;
  };
  type FormValues = {
    title: string | undefined;
    description: string | undefined;
  };
}

const EditModalContainer: React.FC<Props> = ({
  setModalOpen,
  video,
  owner,
}) => {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);

  const onSubmit = () => {
    // TODO Edit Modal
    database
      .ref('videos')
      .child(video.objectID)
      .update({
        title,
        description,
      })
      .then(() => {
        message.success('video updated!');
        message.info('refresh to see new data');
        setModalOpen(false);
      })
      .catch(() => {
        message.error('failed to update video...');
      });
  };

  return (
    <EditModal
      {...{
        setModalOpen,
        onSubmit,
        titleState: [title, setTitle],
        descriptionState: [description, setDescription],
      }}
    />
  );
};

export default EditModalContainer;
