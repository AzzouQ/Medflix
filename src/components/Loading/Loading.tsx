import React, { useEffect, useRef } from 'react';

import type { LoadingType } from './Loading.container';

import { IonLoading, IonContent } from '@ionic/react';

export const Loading: React.FC<LoadingType.Props> = ({ text }) => {
  const ref = useRef<HTMLIonLoadingElement | undefined>();

  const dismiss = () => {
    if (ref && ref.current) ref.current.dismiss();
  };
  useEffect(() => {
    return () => {
      dismiss();
    };
  }, []);

  return (
    <IonContent>
      <IonLoading
        ref={ref as any}
        isOpen={true}
        message={text ?? 'Please wait...'}
      />
    </IonContent>
  );
};

export default Loading;
