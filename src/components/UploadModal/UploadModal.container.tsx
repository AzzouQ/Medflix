import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { uploadSelectors } from 'slices';
import type { UseStateType } from 'types';
import UploadModal from './UploadModal';

export declare namespace UploadModalType {
  type Props = {
    modalOpenState: [boolean, UseStateType<boolean>];
    isRunning: boolean;
  };
}

const UploadModalContainer: React.FC = () => {
  const isRunning = useSelector(uploadSelectors.isRunning);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <UploadModal
      {...{
        modalOpenState: [isModalOpen, setModalOpen],
        isRunning,
      }}
    />
  );
};

export default UploadModalContainer;
