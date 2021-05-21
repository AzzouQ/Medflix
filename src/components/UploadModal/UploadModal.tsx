import React from 'react';
import { IonModal, IonRow } from '@ionic/react';
import { Button, Typography, Upload } from 'antd';
import { CloudUploadOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import { t } from 'i18n';

import { Styles } from './UploadModal.styles';

import type { UploadModalType } from './UploadModal.container';

const UploadModal: React.FC<UploadModalType.Props> = ({
  modalOpenState: [isModalOpen, setModalOpen],
  isRunning,
  onStartUpload,
}) => {
  return (
    <>
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setModalOpen(false)}>
        <IonRow style={Styles.container}>
          <Upload.Dragger
            accept={'video/*'}
            customRequest={onStartUpload}
            multiple={false}
            style={Styles.dragger}
          >
            <PlusCircleTwoTone style={Styles.icon} />
            <Typography.Title level={5}>{'Ajouter une vidéo'}</Typography.Title>
            <Typography.Text>
              {'Votre fichier doit être une vidéo'}
            </Typography.Text>
          </Upload.Dragger>
        </IonRow>
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
