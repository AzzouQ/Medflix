import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Tab3: React.FC = () => {
  const history = useHistory();

  const toAuth = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profil</IonTitle>
          </IonToolbar>
        </IonHeader>
          <Button shape="circle" icon={<UserOutlined />} onClick={toAuth}/>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
