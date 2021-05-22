import { RcFile } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirebaseUpload } from 'service/firebase/upload';
import { uploadSelectors } from 'slices';
import type { UseStateType } from 'types';
import UploadModal from './UploadModal';

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
      setModalOpen(false);
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
