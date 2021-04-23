import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonModal,
} from '@ionic/react';
import { Button } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

import Upload from './Upload';

const Tab1: React.FC = () => {
  const onDismiss = () => {
    dismiss();
  };

  const [present, dismiss] = useIonModal(Upload, {
    onDismiss,
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Button
          type={'primary'}
          shape={'round'}
          icon={<CloudUploadOutlined />}
          onClick={() => present()}
        >
          {'Upload'}
        </Button>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
