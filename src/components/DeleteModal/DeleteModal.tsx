import React from 'react';
import { Button, Typography, Form } from 'antd';
import { IonCol, IonRow } from '@ionic/react';

import type { DeleteModalType } from './DeleteModal.container';
import { Styles } from 'components/DeleteModal/DeleteModal.styles';
import { t } from 'i18n';

const DeleteModal: React.FC<DeleteModalType.Props> = ({
  onCancel,
  onDelete,
}) => {
  return (
    <IonRow style={Styles.container}>
      <Form size={'middle'} layout={'vertical'}>
        <IonRow>
          <IonCol size={'12'}>
            <Typography.Title level={3} style={Styles.title}>
              {t`deleteModal.title`}
            </Typography.Title>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size={'6'}>
            <Button
              type={'default'}
              onClick={onCancel}
              style={{ width: '100%' }}
            >
              {t`deleteModal.no`}
            </Button>
          </IonCol>
          <IonCol size={'6'}>
            <Button
              type={'default'}
              danger
              onClick={onDelete}
              style={{ width: '100%' }}
            >
              {t`deleteModal.yes`}
            </Button>
          </IonCol>
        </IonRow>
      </Form>
    </IonRow>
  );
};

export default DeleteModal;
