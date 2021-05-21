import React from 'react';
import { IonFooter } from '@ionic/react';

import ProgressBar from 'components/ProgressBar';

import type { FooterType } from './Footer.container';

const Footer: React.FC<FooterType.Props> = ({ isRunning }) => {
  return (
    <>
      {isRunning && (
        <IonFooter>
          <ProgressBar />
        </IonFooter>
      )}
    </>
  );
};

export default Footer;
