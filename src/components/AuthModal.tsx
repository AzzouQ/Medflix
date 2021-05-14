import React, { useState } from 'react';
import { IonModal } from '@ionic/react';
import { Button } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { t } from '../i18n';

import firebase from 'firebase';
import 'firebase/auth';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

import { signOut } from '../service/firebase/auth';

const AuthModal: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'signIn' | 'signUp'>('signIn');

  const [isLogged, setLogged] = useState(false);
  firebase.auth().onAuthStateChanged((user) => setLogged(!!user));

  return (
    <>
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setModalOpen(false)}>
        {formMode === 'signIn' ? (
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
          {t`header.button.signOut`}
        </Button>
      ) : (
        <Button
          type={'primary'}
          style={{ marginRight: 20 }}
          icon={<LoginOutlined />}
          onClick={() => setModalOpen(true)}
        >
          {t`header.button.signIn`}
        </Button>
      )}
    </>
  );
};

export default AuthModal;
