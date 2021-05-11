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
import { Avatar, Image, Typography, Menu } from 'antd';
import { Button } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ShareAltOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router';
import { auth } from '../service/firebase';
import React, { useState } from 'react';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Plugins } from '@capacitor/core';

const Profile: React.FC = () => {
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

  const toAuth = () => {
    if (auth.currentUser) history.push('/create');
    else history.push('/signIn');
  };

  const toEditProfile = () => {
    history.push('/editProfile');
  };

  const share = async () => {
    await Share.share({
      title: 'See video',
      text: 'Really awesome video you need to see right now',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  };

  const renderProfileHeader = (): React.ReactElement | null => (
    <IonRow
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
      }}
    >
      <IonCol size="8">
        <IonRow
          style={{
            alignItems: 'center',
          }}
        >
          <IonCol size="auto">
            <Avatar size={80} src={<Image src={avatar} />} />
          </IonCol>
          <IonCol size="auto">
            <Title level={2}>Name</Title>
          </IonCol>
        </IonRow>
      </IonCol>
      <IonCol size="auto">
        <Button
          type="primary"
          shape="round"
          icon={<UploadOutlined />}
          size={'large'}
          onClick={toAuth}
        >
          {`Upload`}
        </Button>
        <Button
          type="primary"
          shape="round"
          icon={<EditOutlined />}
          size={'large'}
          onClick={toEditProfile}
          style={{ marginLeft: 10 }}
        >
          {`Edit`}
        </Button>
      </IonCol>
    </IonRow>
  );

  const renderProfileVideos = (): React.ReactElement | null => (
    <IonList>
      <IonRow style={{ justifyContent: 'center' }}>
        {data.map((item, index) => (
          <IonItem lines="none" key={index}>
            <IonCol size="auto">
              <Image src={item.src} preview={false} />
              <IonRow
                style={{
                  justifyContent: 'space-between',
                }}
              >
                <IonCol size="auto">
                  <IonRow>
                    <IonCol>
                      <Button
                        shape="circle"
                        size="large"
                        icon={
                          <Avatar
                            src={<Image src={avatar} preview={false} />}
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
                      <Menu.Item
                        key="2"
                        onClick={() => {}}
                        icon={<DeleteOutlined />}
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
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          {renderProfileHeader()}
          {renderProfileVideos()}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
