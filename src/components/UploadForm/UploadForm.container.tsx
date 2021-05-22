import { RcFile } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import React, { useCallback, useState } from 'react';
import { translateError, useFirebaseUpload } from 'service/firebase';
import type { FormikType } from 'types';
import UploadForm from './UploadForm';

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
      setDisabled(false);
    },
    [setFile]
  );

  const onRemove = useCallback(() => {
    setFile(null);
    setDisabled(true);
    console.log('WESHEU');
  }, []);

  return (
    <UploadForm {...{ isDisabled, onChange, onRemove, uploadFormSubmit }} />
  );
};

export default UploadFormContainer;
