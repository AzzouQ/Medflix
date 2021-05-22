import { CloudUploadOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import { IonModal, IonRow } from '@ionic/react';
import { Button, Typography, Upload } from 'antd';
import { t } from 'i18n';
import React from 'react';
import type { UploadModalType } from './UploadModal.container';
import { Styles } from './UploadModal.styles';

const UploadModal: React.FC<UploadModalType.Props> = ({
  modalOpenState: [isModalOpen, setModalOpen],
  isRunning,
  onChange,
}) => {
  return (
    <>
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setModalOpen(false)}>
        <IonRow style={Styles.container}>
          <Upload.Dragger
            accept={'video/*'}
            onChange={onChange}
            beforeUpload={() => false}
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
