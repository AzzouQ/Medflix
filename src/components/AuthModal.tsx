import React, { useState } from 'react';
import { IonModal } from '@ionic/react';
import { Button } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

import { signOut } from '../service/firebase';

import firebase from 'firebase/app';
import 'firebase/auth';
import useTranslate from '../local/local';

const AuthModal: React.FC = () => {
  const connect = useTranslate('CONNECT');
  const disconnect = useTranslate('DISCONNECT');
  const [isModalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'signIn' | 'signUp'>('signIn');

  const [isLogged, setLogged] = useState(false);
  firebase.auth().onAuthStateChanged((user) => setLogged(!!user));

  return (
    <>
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setModalOpen(false)}>
        {formMode === connect ? (
          <SignInForm setModalOpen={setModalOpen} setFormMode={setFormMode} />
        ) : (
          <SignUpForm setModalOpen={setModalOpen} setFormMode={setFormMode} />
        )}
      </IonModal>
      {isLogged ? (
        <Button
          type={'primary'}
          style={{ marginRight: 20 }}
          icon={<LogoutOutlined />}
          onClick={() => signOut()}
        >
          {disconnect}
        </Button>
      ) : (
        <>
          <Button
            type={'primary'}
            style={{ marginRight: 20 }}
            icon={<LoginOutlined />}
            onClick={() => setModalOpen(true)}
          >
            {'Sign In'}
          </Button>
        </>
      )}
    </>
  );
};

export default AuthModal;
