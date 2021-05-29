import React from 'react';
import { IonModal } from '@ionic/react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { t } from 'i18n';

import EditProfileForm from 'components/EditProfileForm';
import { Styles } from './EditProfileModal.styles';

import type { EditProfileModalType } from './EditProfileModal.container';

const EditProfileModal: React.FC<EditProfileModalType.Props> = ({
  modalOpenState: [isModalOpen, setModalOpen],
}) => {
  return (
    <>
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setModalOpen(false)}>
        <EditProfileForm setModalOpen={setModalOpen} />
      </IonModal>
      <Button
        type={'primary'}
        style={Styles.button}
        icon={<EditOutlined />}
        onClick={() => setModalOpen(true)}
      >
        {t`header.button.edit`}
      </Button>
    </>
  );
};

export default EditProfileModal;
