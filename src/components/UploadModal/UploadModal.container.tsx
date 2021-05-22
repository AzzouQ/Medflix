import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RcFile, UploadChangeParam } from 'antd';

import UploadModal from './UploadModal';

import { useFirebaseUpload } from 'service/firebase/upload';
import { uploadSelectors } from 'slices';

import type { UseStateType } from 'types';

type OnChange = (info: UploadChangeParam) => void;
export declare namespace UploadModalType {
  type Props = {
    modalOpenState: [boolean, UseStateType<boolean>];
    isRunning: boolean;
    onChange: OnChange;
  };
}

const UploadModalContainer: React.FC = () => {
  const isRunning = useSelector(uploadSelectors.isRunning);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const { setFile } = useFirebaseUpload();

  const onChange = useCallback<OnChange>(
    (info) => {
      setFile(info.file as RcFile);
    },
    [setFile]
  );

  return (
    <UploadModal
      {...{
        modalOpenState: [isModalOpen, setModalOpen],
        isRunning,
        onChange,
      }}
    />
  );
};

export default UploadModalContainer;
