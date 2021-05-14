import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import CreateForm from '../components/CreateForm';
import FilePicker from '../components/FilePicker';
import ThumbnailUpload from '../components/ThumbnailUpload';
import { t } from '../i18n';

const Create: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('CREATE_VIEW_TITLE')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ThumbnailUpload isLoading={false} />
        <FilePicker isLoading={false} />
        <CreateForm />
      </IonContent>
    </IonPage>
  );
};

export default Create;
