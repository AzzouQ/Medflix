import React, { useState } from 'react';
import EditProfileModal from './EditProfileModal';

import type { UseStateType } from 'types';
export declare namespace EditProfileModalType {
  type Props = {
    modalOpenState: [boolean, UseStateType<boolean>];
  };
}

const EditProfileModalContainer: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <EditProfileModal
      {...{
        modalOpenState: [isModalOpen, setModalOpen],
      }}
    />
  );
};

export default EditProfileModalContainer;
