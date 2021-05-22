import React from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { Typography } from 'antd';
import { t } from 'i18n';

import AuthModal from 'components/AuthModal';

import { Styles } from './Unauthenticated.styles';

import type { UnauthenticatedType } from './Unauthenticated.container';

const Unauthenticated: React.FC<UnauthenticatedType.Props> = () => {
  return (
    <IonGrid style={Styles.grid}>
      <IonRow style={Styles.gridRow}>
        <IonCol size={'12'}>
          <IonRow style={Styles.unsignedRow}>
            <Typography.Title>{t`form.signIn.title`}</Typography.Title>
          </IonRow>
          <IonRow style={Styles.unsignedRow}>
            <AuthModal />
          </IonRow>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Unauthenticated;
