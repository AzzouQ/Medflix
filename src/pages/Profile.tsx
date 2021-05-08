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
import { Avatar, Image, Typography } from 'antd';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { auth } from '../service/firebase';

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

  const toAuth = () => {
    if (auth.currentUser) history.push('/create');
    else history.push('/signIn');
  };

  const renderProfileHeader = (): React.ReactElement => (
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
            <Title level={2}>Channel's Name</Title>
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
          Upload
        </Button>
      </IonCol>
    </IonRow>
  );

  const renderProfileVideos = (): React.ReactElement => (
    <IonList>
      <IonRow style={{ justifyContent: 'center' }}>
        {data.map((item) => (
          <IonItem lines="none">
            <IonCol size="auto">
              <Image src={item.src} preview={false} />
              <IonRow>
                <IonCol size="auto">
                  <Button
                    shape="circle"
                    size="large"
                    icon={
                      <Avatar src={<Image src={avatar} preview={false} />} />
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
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          {renderProfileHeader()}
          {renderProfileVideos()}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
