import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonRow,
} from '@ionic/react';
import { Button } from 'antd';

import useTranslate from '../local/local';
import { sendNotif } from '../service/firebase';

type Props = {
  user: {
    fcm: string;
    name: string;
  };
};

const SubscribeCard: React.FC<Props> = ({ user }) => {
  const follow = useTranslate('FOLLOW');
  const unfollow = useTranslate('UNFOLLOW');

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
