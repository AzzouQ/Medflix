import React from 'react';
import { useSelector } from 'react-redux';
import { auth, database, translateError } from 'service/firebase';
import { uploadSelectors } from 'slices';
import { FormikType } from 'types';

import VideoForm from './VideoForm';

export declare namespace VideoType {
  type FormValues = {
    title: string;
    description: string;
  };
  type FormSubmit = FormikType.onSubmit<FormValues>;
  type FormProps = {
    videoFormSubmit: FormSubmit;
    onReset: () => void;
  };
}

type Props = {
  onReset: () => void;
  onDismiss: () => void;
};

const VideoFormContainer: React.FC<Props> = ({ onReset, onDismiss }) => {
  const onComplete = useSelector(uploadSelectors.getComplete);
  const videoFormSubmit: VideoType.FormSubmit = async (
    { title, description },
    { setFieldError, setSubmitting }
  ) => {
    try {
      const userId = auth.currentUser?.uid;
      const video = await database.ref('video/').push({
        owner: userId,
        title: title,
        description: description,
        url: onComplete?.downloadURL,
        createDate: +new Date(),
      });
      //   database.ref(`user/${userId}/video`).set();
      onReset();
      onDismiss();
    } catch (error) {
      const { field, message } = translateError(error);
      setFieldError(field, message);
    } finally {
      setSubmitting(false);
    }
  };

  return <VideoForm {...{ videoFormSubmit, onReset }} />;
};

export default VideoFormContainer;
