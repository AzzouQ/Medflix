import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonRow,
} from '@ionic/react';
import { Button } from 'antd';
import { t } from 'i18n';
import React from 'react';
import { pushMessaging } from 'service/firebase';
import { UserType } from 'types';

type Props = {
  user: UserType;
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
                pushMessaging(user.uid);
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
