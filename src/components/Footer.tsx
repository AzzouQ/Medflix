import React from 'react';
import { IonFooter } from '@ionic/react';

import ProgressBar from './ProgressBar';
import { useSelector } from 'react-redux';
import { uploadSelectors } from '../slices';

const Footer: React.FC = () => {
  const isUploading = useSelector(uploadSelectors.isUploading);

  return (
    <>
      {isUploading && (
        <IonFooter>
          <ProgressBar />
        </IonFooter>
      )}
    </>
  );
};

export default Footer;
