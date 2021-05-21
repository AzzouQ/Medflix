import React from 'react';
import { IonModal } from '@ionic/react';
import { Button } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { t } from 'i18n';

import SignInForm from 'components/SignInForm';
import SignUpForm from 'components/SignUpForm';

import { Styles } from './AuthModal.styles';

import type { AuthModalType } from './AuthModal.container';

const AuthModal: React.FC<AuthModalType.Props> = ({
  formModeState: [formMode, setFormMode],
  modalOpenState: [isModalOpen, setModalOpen],
  loggedState: [isLogged],
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
      {isLogged ? (
        <Button
          type={'primary'}
          style={Styles.button}
          icon={<LogoutOutlined />}
          onClick={onSignOut}
        >
          {t`header.button.signOut`}
        </Button>
      ) : (
        <Button
          type={'primary'}
          style={Styles.button}
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
