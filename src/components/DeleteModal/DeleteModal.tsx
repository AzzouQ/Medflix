import React from 'react';
import { Button } from 'antd';
import { IonButtons, IonRow, IonTitle } from '@ionic/react';

import type { DeleteModalType } from './DeleteModal.container';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Styles } from 'components/DeleteModal/DeleteModal.styles';

const DeleteModal: React.FC<DeleteModalType.Props> = ({
  onCancel,
  onDelete,
}) => {
  return (
    <IonRow style={Styles.container}>
      <IonButtons>
        <IonTitle>{'-do you really want to delete this video'}</IonTitle>
        <Button type={'primary'} icon={<CloseOutlined />} onClick={onCancel}>
          {'-No'}
        </Button>
        <Button type={'text'} icon={<DeleteOutlined />} onClick={onDelete}>
          {'Yes'}
        </Button>
      </IonButtons>
    </IonRow>
  );
};

export default DeleteModal;
