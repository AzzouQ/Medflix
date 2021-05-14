import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonRow,
} from '@ionic/react';
import { Button } from 'antd';
import { t } from '../i18n';

import { sendNotif } from '../service/firebase/fcm';

type Props = {
  user: {
    fcm: string;
    name: string;
  };
};

const SubscribeCard: React.FC<Props> = ({ user }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonRow style={{ width: '250px' }}>
          <IonCol size={'8'}>
            <IonCardTitle>{user.name}</IonCardTitle>
          </IonCol>
          <IonCol size={'1'}>
            <Button
              type={'primary'}
              onClick={() => {
                sendNotif(user.fcm);
              }}
            >
              {user ? t`subscriptions.subscribe` : t`subscriptions.unsubscribe`}
            </Button>
          </IonCol>
        </IonRow>
      </IonCardHeader>
    </IonCard>
  );
};

export default SubscribeCard;
