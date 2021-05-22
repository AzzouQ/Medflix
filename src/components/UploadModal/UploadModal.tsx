import React from 'react';
import { IonModal } from '@ionic/react';
import { Button } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { t } from 'i18n';

import UploadForm from 'components/UploadForm';
import { Styles } from './UploadModal.styles';

import type { UploadModalType } from './UploadModal.container';

const UploadModal: React.FC<UploadModalType.Props> = ({
  modalOpenState: [isModalOpen, setModalOpen],
  isRunning,
}) => {
  return (
    <>
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setModalOpen(false)}>
        <UploadForm setModalOpen={setModalOpen} />
      </IonModal>
      <Button
        type={'primary'}
        style={Styles.button}
        loading={isRunning}
        icon={<CloudUploadOutlined />}
        onClick={() => setModalOpen(true)}
      >
        {t`header.button.upload`}
      </Button>
    </>
  );
};

export default UploadModal;
