import { CloudUploadOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Button, Col, Row, Typography, Upload } from 'antd';
import React from 'react';

type Props = {
  onDismiss: () => void;
};

const UploadModal: React.FC<Props> = ({ onDismiss }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{'Upload a video'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Row
          gutter={[50, 20]}
          align={'middle'}
          justify={'center'}
          style={{ marginTop: 20 }}
        >
          <Col>
            <Upload.Dragger
              accept={'video/*'}
              customRequest={async ({ onSuccess, onError, file }) => {
                try {
                  //
                } catch (error) {
                  console.log(error);
                } finally {
                  //
                }
              }}
            >
              <PlusCircleTwoTone style={{ fontSize: 30 }} />
              <Typography.Title level={5}>
                {'Ajouter une vidéo'}
              </Typography.Title>
              <Typography.Text>
                {'Votre fichier doit être une vidéo'}
              </Typography.Text>
            </Upload.Dragger>
          </Col>
          <Col>
            <Upload.Dragger
              accept={'video/*'}
              customRequest={async ({ onSuccess, onError, file }) => {
                try {
                  //
                } catch (error) {
                  console.log(error);
                } finally {
                  //
                }
              }}
            >
              <PlusCircleTwoTone style={{ fontSize: 30 }} />
              <Typography.Title level={5}>
                {'Ajouter une miniature'}
              </Typography.Title>
              <Typography.Text>
                {'Votre fichier doit être une image'}
              </Typography.Text>
            </Upload.Dragger>
          </Col>
        </Row>
        {/* <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
        </Row> */}
        <Row justify={'center'} align={'bottom'} style={{ marginTop: 20 }}>
          <Button
            type={'primary'}
            shape={'round'}
            icon={<CloudUploadOutlined />}
            onClick={onDismiss}
          >
            {'Upload'}
          </Button>
        </Row>
      </IonContent>
    </IonPage>
  );
};

export default UploadModal;
