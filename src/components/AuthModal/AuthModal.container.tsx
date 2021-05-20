import React, { useCallback, useEffect, useState } from 'react';
import { UseStateType } from 'types';

// import { signOut } from '../service/firebase/auth';
import { auth } from '../../service/firebase';
import AuthModal from './AuthModal';

type onSignOut = () => Promise<void>;
type formMode = 'signIn' | 'signUp';

export declare namespace AuthModalType {
  type Props = {
    formModeState: [formMode, UseStateType<formMode>];
    isModalOpenState: [boolean, UseStateType<boolean>];
    isLoggedState: [boolean];
    onSignOut: onSignOut;
  };
}

const AuthModalContainer: React.FC = () => {
  const [formMode, setFormMode] = useState<formMode>('signIn');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isLogged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setLogged(!!user));
  }, []);

  const onSignOut: onSignOut = useCallback(async () => {
    await auth.signOut();
  }, []);

  return (
    <AuthModal
      {...{
        formModeState: [formMode, setFormMode],
        isModalOpenState: [isModalOpen, setModalOpen],
        isLoggedState: [isLogged],
        onSignOut,
      }}
    />
  );
};

export default AuthModalContainer;
