import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Col, Row, Typography } from 'antd';
import React from 'react';
import lottieAnim from '../assets/AuthLottie.json';

type signInParams = {
  to: string | undefined;
};

const SignIn: React.FC = (props: any) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{'Sign In'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Row
          justify={'center'}
          align={'middle'}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ minHeight: '100vh' }}
        >
          <Col lg={6} xl={6}>
            <Player
              autoplay={true}
              loop={true}
              src={lottieAnim}
              speed={0.1}
              style={{ height: '250px', width: '250px' }}
            />
          </Col>
          <Col lg={6} xl={6}>
            <Typography.Title level={2}>{'Bienvenue !'}</Typography.Title>
            {/* <SignInForm  /> */}
          </Col>
        </Row>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
