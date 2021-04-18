import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/react';
import { Avatar, Image } from 'antd';
import { Button, Row, Col, List } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Tab1: React.FC = () => {
  const data = [
    {
      title: 'Video name 1',
      src: 'https://picsum.photos/400/300',
    },
    {
      title: 'Video name 2',
      src: 'https://picsum.photos/400/300',
    },
    {
      title: 'Video name 3',
      src: 'https://picsum.photos/400/300',
    },
    {
      title: 'Video name 4',
      src: 'https://picsum.photos/400/300',
    },
    {
      title: 'Video name 5',
      src: 'https://picsum.photos/400/300',
    },
  ];

  const renderProfileHeader = (): React.ReactElement => (
    <IonRow
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <IonCol size="4" offset={'4'}>
        <Avatar
          size={80}
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />
        <IonText style={{ fontSize: 24 }}>Channel's Name</IonText>
      </IonCol>
      <IonCol size="4">
        <Button
          type="primary"
          shape="round"
          icon={<UploadOutlined />}
          size={'large'}
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
          <IonItem>
            <IonCol size="auto">
              <Image src={item.src} />
              <IonRow>
                <Avatar src={item.src} />
                {item.title}
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

export default Tab1;
