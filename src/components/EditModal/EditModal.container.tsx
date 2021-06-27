import React from 'react';
import { message } from 'antd';
import { t } from 'i18n';

import { database, translateError } from 'service/firebase';

import EditModal from './EditModal';
import type { FormikType, VideoType } from 'types';

type Props = {
  setModalOpen: (value: boolean) => void;
  video: VideoType;
};

export declare namespace EditModalType {
  type FormSubmit = FormikType.onSubmit<FormValues>;
  type FormValues = {
    title: string | undefined;
    description: string | undefined;
  };
  type Props = {
    setModalOpen: (value: boolean) => void;
    video: VideoType,
    formikSubmit: FormSubmit;
  };
}

const EditModalContainer: React.FC<Props> = ({
  setModalOpen,
  video,
}) => {
  const formikSubmit: EditModalType.FormSubmit = async (
    { title, description },
    { setFieldError, setSubmitting }
  ) => {
    try {
      await database.ref('videos').child(video.objectID).update({
        title,
        description,
      });
      message.success(t`editModal.success`);
      message.info(t`editModal.info`);
      setModalOpen(false);
    } catch (error) {
      const { field, message } = translateError(error);
      setFieldError(field, message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <EditModal
      {...{
        setModalOpen,
        formikSubmit,
        video,
      }}
    />
  );
};

export default EditModalContainer;
