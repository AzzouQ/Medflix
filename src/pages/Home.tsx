import React from 'react';
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
import { Avatar, Button, Image, Menu, Typography } from 'antd';

import AuthModal from '../components/AuthModal';
import { ShareAltOutlined } from '@ant-design/icons';

import SubMenu from 'antd/lib/menu/SubMenu';
import { Plugins } from '@capacitor/core';

// import { sendNotif } from '../service/firebase';

const Home: React.FC = () => {
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
  const { Share } = Plugins;

  const share = async () => {
    await Share.share({
      title: 'See video',
      text: 'Really awesome video you need to see right now',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  };

  // const viewTitle = useTranslate('HOME_VIEW_TITLE')
  // const hometitle = useTranslate('HOME_TITLE');
  // const connect = useTranslate('CONNECT');
  // const disconnect = useTranslate('DISCONNECT');

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
