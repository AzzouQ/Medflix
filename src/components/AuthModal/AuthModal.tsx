import React from 'react';
import { IonModal } from '@ionic/react';
import { Button } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { t } from 'i18n';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

import type { AuthModalType } from './AuthModal.container';

const AuthModal: React.FC<AuthModalType.Props> = ({
  user,
  formModeState: [formMode, setFormMode],
  modalOpenState: [isModalOpen, setModalOpen],
  onSignOut,
}) => {
  return (
    <>
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setModalOpen(false)}>
        {formMode === 'signIn' ? (
          <SignInForm setModalOpen={setModalOpen} setFormMode={setFormMode} />
        ) : (
          <SignUpForm setModalOpen={setModalOpen} setFormMode={setFormMode} />
        )}
      </IonModal>
      {user ? (
        <Button type={'primary'} icon={<LogoutOutlined />} onClick={onSignOut}>
          {t`header.button.signOut`}
        </Button>
      ) : (
        <Button
          type={'primary'}
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
