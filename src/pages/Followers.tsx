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
import useTranslate from '../local/local';

const names = ['Nazim'];

const Followers: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    listUser().then((_users) => {
      setUsers(_users);
    });
  }, []);

  const avatar =
    'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

  const { Title } = Typography;

  const viewTitle = useTranslate("FOLLOWERS_VIEW_TITLE");
  const follow = useTranslate("FOLLOW")
  const unfollow = useTranslate("UNFOLLOW")
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
                {item ? follow : unfollow}
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
          <IonTitle>{viewTitle}</IonTitle>
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

export default Followers;
