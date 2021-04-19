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
import { Avatar, Button, Image, Typography } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

const Home: React.FC = () => {
  var loggedIn = true;
  const avatar =
    'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
  const data = [
    {
      title: 'Video name 1',
      src: 'https://picsum.photos/400/200',
    },
    {
      title: 'Video name 2',
      src: 'https://picsum.photos/400/200',
    },
    {
      title: 'Video name 3',
      src: 'https://picsum.photos/400/200',
    },
    {
      title: 'Video name 4',
      src: 'https://picsum.photos/400/200',
    },
    {
      title: 'Video name 5',
      src: 'https://picsum.photos/400/200',
    },
    {
      title: 'Video name 6',
      src: 'https://picsum.photos/400/200',
    },
    {
      title: 'Video name 7',
      src: 'https://picsum.photos/400/200',
    },
    {
      title: 'Video name 8',
      src: 'https://picsum.photos/400/200',
    },
  ];

  const { Title } = Typography;
  const history = useHistory();

  const toAuth = () => {
    history.push('/login');
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
          icon={loggedIn ? <LogoutOutlined /> : <LoginOutlined />}
          size={'large'}
            onClick={toAuth}
        >
          {loggedIn ? 'Disconnect' : 'Connect'}
        </Button>
      </IonCol>
    </IonRow>
  );

  const renderHomeVideos = (): React.ReactElement => (
    <IonList>
      <IonRow style={{ justifyContent: 'center' }}>
        {data.map((item) => (
          <IonItem lines="none">
            <IonCol size="auto">
              <Image
                src={item.src}
                preview={false}
                //   onClick={}
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
                            // onClick={}
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
