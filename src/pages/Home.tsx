import { useHistory } from 'react-router';
import {
  IonCol,
  IonContent,
  IonFooter,
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
import { Avatar, Button, Image, Menu, Typography, notification } from 'antd';
import {
  LoginOutlined,
  LogoutOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

import React, { useEffect, useState } from 'react';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Plugins } from '@capacitor/core';
import ProgressBar from '../components/ProgressBar';
// import { sendNotif } from '../service/firebase';

const Home: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });

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
  ];

  const { Title } = Typography;
  const history = useHistory();
  const { Share } = Plugins;

  const toAuth = async () => {
    if (user) {
      await firebase.auth().signOut();
      notification.success({ message: `See you later!` });
    } else history.push('/signIn');
  };

  const share = async () => {
    await Share.share({
      title: 'See video',
      text: 'Really awesome video you need to see right now',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
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
              <IonRow
                style={{
                  justifyContent: 'space-between',
                }}
              >
                <IonCol size="auto">
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
                <IonCol size="auto">
                  <Menu
                    mode="inline"
                    selectable={false}
                    style={{
                      width: 80,
                      backgroundColor: 'white',
                      color: 'white',
                    }}
                  >
                    <SubMenu key="sub1" title="">
                      <Menu.Item
                        key="1"
                        icon={<ShareAltOutlined />}
                        onClick={share}
                      />
                    </SubMenu>
                  </Menu>
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
        <IonGrid>
          {renderHomeHeader()}
          {renderHomeVideos()}
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <ProgressBar />
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
