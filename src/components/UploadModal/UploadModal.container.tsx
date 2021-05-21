import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RcCustomRequestOptions, RcFile } from 'antd';

import { useFirebaseUpload } from 'service/firebase';

import UploadModal from './UploadModal';

import type { UseStateType } from 'types';
import { uploadSelectors } from 'slices';

export declare namespace UploadModalType {
  type OnStartUpload = (options: RcCustomRequestOptions) => Promise<void>;
  type Props = {
    modalOpenState: [boolean, UseStateType<boolean>];
    isRunning: boolean;
    onStartUpload: OnStartUpload;
  };
}

const UploadModalContainer: React.FC = () => {
  const isRunning = useSelector(uploadSelectors.isRunning);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const { setFile } = useFirebaseUpload();

  const onStartUpload: UploadModalType.OnStartUpload = useCallback(
    async ({ file }: RcCustomRequestOptions) => {
      setFile(file as RcFile);
      setModalOpen(false);
    },
    [setFile]
  );

  return (
    <UploadModal
      {...{
        modalOpenState: [isModalOpen, setModalOpen],
        isRunning,
        onStartUpload,
      }}
    />
  );
};

export default UploadModalContainer;
