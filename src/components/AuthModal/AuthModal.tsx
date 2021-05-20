import React from 'react';
import { IonModal } from '@ionic/react';
import { Button } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { t } from '../../i18n';

import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';

import type { AuthModalType } from './AuthModal.container';

import { Styles } from './AuthModal.styles';

const AuthModal: React.FC<AuthModalType.Props> = ({
  formModeState: [formMode, setFormMode],
  isModalOpenState: [isModalOpen, setModalOpen],
  isLoggedState: [isLogged],
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
