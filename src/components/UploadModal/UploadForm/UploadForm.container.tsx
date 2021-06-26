import React, { useCallback, useState } from 'react';
import { RcFile, UploadChangeParam } from 'antd';

import { translateError, useFirebaseUpload } from 'service/firebase';
import UploadForm from './UploadForm';

import type { FormikType } from 'types';

type OnChange = (info: UploadChangeParam) => void;

export declare namespace UploadType {
  type FormValues = {
    title: string;
    description: string;
  };
  type FormSubmit = FormikType.onSubmit<FormValues>;
  type FormProps = {
    isDisabled: boolean;
    onChange: OnChange;
    onChangeImage: OnChange;
    onRemoveImage: () => void;
    onRemove: () => void;
    uploadFormSubmit: FormSubmit;
  };
}

type Props = {
  setModalOpen: (value: boolean) => void;
};

const UploadFormContainer: React.FC<Props> = ({ setModalOpen }) => {
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [file, setFile] = useState<RcFile | null>(null);
  const [image, setImage] = useState<RcFile | null>(null);

  const { startUpload } = useFirebaseUpload();

  const uploadFormSubmit: UploadType.FormSubmit = async (
    { title, description },
    { setFieldError, setSubmitting }
  ) => {
    try {
      startUpload({
        type: {
          title: title,
          description: description,
        },
        file: file as RcFile,
        image: image as RcFile,
      });
      setModalOpen(false);
    } catch (error) {
      const { field, message } = translateError(error);
      setFieldError(field, message);
    } finally {
      setSubmitting(false);
    }
  };

  const onChange = useCallback<OnChange>(
    (info) => {
      setFile(info.file as RcFile);
      if (image) {
        setDisabled(false);
      }
    },
    [setFile, image]
  );

  const onChangeImage = useCallback<OnChange>(
    (info) => {
      setImage(info.file as RcFile);
      if (file) {
        setDisabled(false);
      }
    },
    [setImage, file]
  );

  const onRemoveImage = useCallback(() => {
    setImage(null);
    setDisabled(true);
  }, []);

  const onRemove = useCallback(() => {
    setFile(null);
    setDisabled(true);
  }, []);

  return (
    <UploadForm
      {...{
        isDisabled,
        onChange,
        onRemove,
        onChangeImage,
        onRemoveImage,
        uploadFormSubmit,
      }}
    />
  );
};

export default UploadFormContainer;
