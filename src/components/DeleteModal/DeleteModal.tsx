import React from 'react';
import { Button } from 'antd';
import { IonButtons, IonRow, IonTitle } from '@ionic/react';

import type { DeleteModalType } from './DeleteModal.container';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Styles } from 'components/DeleteModal/DeleteModal.styles';
import { t } from 'i18n';

const DeleteModal: React.FC<DeleteModalType.Props> = ({
  onCancel,
  onDelete,
}) => {
  return (
    <IonRow style={Styles.container}>
      <IonButtons>
        <IonTitle>{t`deleteModal.title`}</IonTitle>
        <Button type={'primary'} icon={<CloseOutlined />} onClick={onCancel}>
          {t`deleteModal.no`}
        </Button>
        <Button type={'text'} icon={<DeleteOutlined />} onClick={onDelete}>
          {t`deleteModal.yes`}
        </Button>
      </IonButtons>
    </IonRow>
  );
};

export default DeleteModal;
