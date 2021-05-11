import {
  IonButtons,
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
import { Avatar, Button, Image, Typography } from 'antd';

import AuthModal from '../components/AuthModal';
// import { sendNotif } from '../service/firebase';

const Home: React.FC = () => {
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
                              // sendNotif('B8kEqRO9qlZL0DYcGLjq2h1LL4K3')
                              console.log('')
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
          <IonButtons slot={'start'}>
            <IonTitle>{'Home'}</IonTitle>
          </IonButtons>
          <IonButtons slot={'end'}>
            <AuthModal />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonTitle>{'Latest videos'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonGrid>{renderHomeVideos()}</IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
