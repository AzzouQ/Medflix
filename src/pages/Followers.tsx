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

const Profile: React.FC = () => {
  const users = [
    {
      name: 'hafid merguez',
      follow: false,
    },
    {
      name: 'jean mouloud',
      follow: true,
    },
    {
      name: 'cycile ducon',
      follow: false,
    },
  ];

  const avatar =
    'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

  const { Title } = Typography;
  const history = useHistory();

  const renderFollowersHeader = (): React.ReactElement => (
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
        </IonRow>
      </IonCol>
    </IonRow>
  );

  const renderFollowers = (): React.ReactElement => (
    <IonList>
      <IonRow style={{ justifyContent: 'center' }}>
        {users.map((item) => (
          <IonItem lines="none">
            <IonCol size="auto">
              <Title level={2}>{item.name}</Title>
              <Button
                type="primary"
                shape="round"
                size={'large'}
                onClick={() => {}}
              >
                {item.follow ? 'Follow' : 'Unfollow'}
              </Button>
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
          <IonTitle>Followers</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Followers</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          {renderFollowersHeader()}
          {renderFollowers()}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
