import React, { useCallback, useEffect, useState } from 'react';

import { auth } from 'service/firebase';

import AuthModal from './AuthModal';

import type { UseStateType } from 'types';

export declare namespace AuthModalType {
  type Props = {
    formModeState: ['signIn' | 'signUp', UseStateType<'signIn' | 'signUp'>];
    modalOpenState: [boolean, UseStateType<boolean>];
    loggedState: [boolean];
    onSignOut: () => Promise<void>;
  };
}

const AuthModalContainer: React.FC = () => {
  const [formMode, setFormMode] = useState<'signIn' | 'signUp'>('signIn');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isLogged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setLogged(!!user));
  }, []);

  const onSignOut = useCallback(async () => {
    await auth.signOut();
  }, []);

  return (
    <AuthModal
      {...{
        formModeState: [formMode, setFormMode],
        modalOpenState: [isModalOpen, setModalOpen],
        loggedState: [isLogged],
        onSignOut,
      }}
    />
  );
};

export default AuthModalContainer;
