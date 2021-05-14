import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonRow,
} from '@ionic/react';
import { Button } from 'antd';

import { t } from '../locales';
import { sendNotif } from '../service/firebase/fcm';

type Props = {
  user: {
    fcm: string;
    name: string;
  };
};

const SubscribeCard: React.FC<Props> = ({ user }) => {
  const follow = t('FOLLOW');
  const unfollow = t('UNFOLLOW');

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
              {user ? follow : unfollow}
            </Button>
          </IonCol>
        </IonRow>
      </IonCardHeader>
    </IonCard>
  );
};

export default SubscribeCard;
