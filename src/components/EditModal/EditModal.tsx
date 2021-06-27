import React from 'react';
import { Button, Input, Typography } from 'antd';

import { Styles } from './EditModal.styles';
import type { EditModalType } from './EditModal.container';
import { EditOutlined } from '@ant-design/icons';

import CloseModalContainer from 'components/CloseModal';

import { IonRow, IonCol } from '@ionic/react';
import { t } from 'i18n';

const EditModal: React.FC<EditModalType.Props> = ({
  titleState: [title, setTitle],
  descriptionState: [description, setDescription],
  setModalOpen,
  onSubmit,
}) => {
  return (
    <IonRow style={Styles.container}>
      <CloseModalContainer {...{ setModalOpen }} />

      <IonRow>
        <IonCol size={'12'}>
          <Typography.Title level={2} style={Styles.title}>
            {t`form.edit.title`}
          </Typography.Title>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size={'12'}>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name={'title'}
            placeholder={'title'}
          />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size={'12'}>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name={'description'}
            placeholder={'description'}
          />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size={'12'}>
          <Button type={'primary'} icon={<EditOutlined />} onClick={onSubmit}>
            {t`header.button.edit`}
          </Button>
        </IonCol>
      </IonRow>
    </IonRow>
  );
};

export default EditModal;
