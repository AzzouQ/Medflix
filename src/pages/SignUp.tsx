import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Typography, Row, Col } from 'antd';
import { Player } from '@lottiefiles/react-lottie-player';

import SignUpForm from '../components/SignUpForm';

import lottieAnim from '../assets/AuthLottie.json';

const SignUp: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{'Sign Up'}</IonTitle>
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
            <Typography.Title level={2}>
              {'Créer votre compte'}
            </Typography.Title>
            <SignUpForm />
          </Col>
        </Row>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
