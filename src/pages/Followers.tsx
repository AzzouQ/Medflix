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
import { listUser, sendNotif } from '../service/firebase';
import { useEffect, useState } from 'react';

const names = ['Nazim'];

const Followers: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const _users = await listUser()
      setUsers(_users);
    }

    fetchUsers()

  }, []);

  const avatar =
    'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

  const { Title } = Typography;

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
        {users.map((item, idx) => (
          <IonItem lines="none" key={idx}>
            <IonCol size="auto">
              <Title level={2}>{item}</Title>
              <Button
                type="primary"
                shape="round"
                size={'large'}
                onClick={() => {
                  sendNotif(item);
                }}
              >
                {item ? 'Follow' : 'Unfollow'}
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

        <IonGrid>
          {renderFollowersHeader()}
          {renderFollowers()}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Followers;
