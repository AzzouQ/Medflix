import { isPlatform } from '@ionic/core';
import React from 'react';

import CloseModal from './CloseModal';

type Props = {
  setModalOpen: (value: boolean) => void;
};

export declare namespace CloseModalType {
  type Props = {
    onCloseModal: () => void;
  };
}

const CloseModalContainer: React.FC<Props> = ({ setModalOpen }) => {
  const onCloseModal = () => {
    setModalOpen(false);
  };
  if (isPlatform('mobile')) return <CloseModal {...{ onCloseModal }} />;
  else return null;
};

export default CloseModalContainer;
