import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { auth } from 'service/firebase';
import { userSelectors, UserState } from 'slices';

import AuthModal from './AuthModal';

import type { UseStateType } from 'types';

export declare namespace AuthModalType {
  type Props = {
    user: UserState;
    formModeState: ['signIn' | 'signUp', UseStateType<'signIn' | 'signUp'>];
    modalOpenState: [boolean, UseStateType<boolean>];
    onSignOut: () => Promise<void>;
  };
}

const AuthModalContainer: React.FC = () => {
  const user = useSelector(userSelectors.getUser);
  const [formMode, setFormMode] = useState<'signIn' | 'signUp'>('signIn');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const onSignOut = useCallback(async () => {
    await auth.signOut();
  }, []);

  return (
    <AuthModal
      {...{
        user,
        formModeState: [formMode, setFormMode],
        modalOpenState: [isModalOpen, setModalOpen],
        onSignOut,
      }}
    />
  );
};

export default AuthModalContainer;
