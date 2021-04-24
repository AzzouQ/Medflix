import { useHistory } from 'react-router';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Avatar, Button, Image, Typography } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

import { useState } from 'react';
import { sendNotif } from '../service/firebase';

const Home: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  firebase.auth().onAuthStateChanged((_user) => setUser(_user));

  const avatar =
    'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
  const data = [
    {
      title: 'Ted video 1',
      src:
        'https://pi.tedcdn.com/r/pl.tedcdn.com/social/ted-logo.png?bust=amove',
    },
    {
      title: 'Ted video 2',
      src:
        'https://pi.tedcdn.com/r/pl.tedcdn.com/social/ted-logo.png?bust=amove',
    },
    {
      title: 'Ted video 3',
      src:
        'https://pi.tedcdn.com/r/pl.tedcdn.com/social/ted-logo.png?bust=amove',
    },
    {
      title: 'Ted video 4',
      src:
        'https://pi.tedcdn.com/r/pl.tedcdn.com/social/ted-logo.png?bust=amove',
    },
  ];

  const { Title } = Typography;
  const history = useHistory();

  const toAuth = async () => {
    if (user) {
      await firebase.auth().signOut();
    } else history.push('/signIn');
  };

  const renderHomeHeader = (): React.ReactElement => (
    <IonRow
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
      }}
    >
      <IonCol size="8">
        <Title level={2}>Latest videos</Title>
      </IonCol>
      <IonCol size="auto">
        <Button
          type="primary"
          shape="round"
          icon={user ? <LogoutOutlined /> : <LoginOutlined />}
          size={'large'}
          onClick={toAuth}
        >
          {user ? 'Disconnect' : 'Connect'}
        </Button>
      </IonCol>
    </IonRow>
  );

  const renderHomeVideos = (): React.ReactElement => (
    <IonList>
      <IonRow style={{ justifyContent: 'center' }}>
        {data.map((item) => (
          <IonItem lines="none" key={item.title}>
            <IonCol size="auto">
              <Image
                src={item.src}
                height={200}
                width={400}
                preview={false}
                onClick={() =>
                  window.open('https://mityurl.com/y/TEDT/r-5-25', '_system')
                }
              />
              <IonRow>
                <IonCol size="auto">
                  <Button
                    shape="circle"
                    size="large"
                    icon={
                      <Avatar
                        src={
                          <Image
                            src={avatar}
                            preview={false}
                            onClick={() =>
                              sendNotif('B8kEqRO9qlZL0DYcGLjq2h1LL4K3')
                            }
                          />
                        }
                      />
                    }
                  />
                </IonCol>
                <IonCol size="auto">
                  <Title level={4}>{item.title}</Title>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonItem>
        ))}
      </IonRow>
    </IonList>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          {renderHomeHeader()}
          {renderHomeVideos()}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
