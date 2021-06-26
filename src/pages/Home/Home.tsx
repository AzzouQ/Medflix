import React from 'react';
import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  isPlatform,
} from '@ionic/react';
import { Button } from 'antd';
import { t } from 'i18n';

import AuthModal from 'components/AuthModal';
import VideoCard from 'components/VideoCard';
import Footer from 'components/Footer';

import { Styles } from './Home.styles';

import type { HomeType } from './Home.container';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';

const Home: React.FC<HomeType.Props> = ({
  videos,
  searchText,
  setSearchText,
  mobileSearchState: [isMobileSearch, setMobileSearch],
  modalOpenState: [isModalOpen, setModalOpen],
}) => {
  const VideoList = () => {
    return (
      <>
        {videos?.map((video, index) => (
          <IonCol size={'auto'} key={index}>
            <VideoCard video={video} mode="REDIRECT" />
          </IonCol>
        ))}
      </>
    );
  };

  const SearchBar = () => {
    return isPlatform('mobile') ? (
      <Button
        type={'primary'}
        size={'middle'}
        shape={'circle'}
        icon={<SearchOutlined />}
        onClick={() => setMobileSearch(true)}
        style={Styles.buttonSpace}
      />
    ) : (
      <IonSearchbar
        value={searchText}
        onIonChange={(e) => setSearchText(e.detail.value!)}
      />
    );
  };

  const SearchMobileHeader = () => {
    return (
      <div style={Styles.row}>
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
        />
        <Button
          type={'primary'}
          icon={<CloseOutlined />}
          onClick={() => setMobileSearch(false)}
        />
      </div>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {isMobileSearch ? (
            <SearchMobileHeader />
          ) : (
            <>
              <IonButtons slot={'start'}>
                <IonTitle>{t`header.title.home`}</IonTitle>
              </IonButtons>
              <SearchBar />
              <IonButtons slot={'end'} style={Styles.buttons}>
                <AuthModal />
              </IonButtons>
            </>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonGrid>
          <IonList style={Styles.list}>
            <IonRow style={Styles.container}>
              <VideoList />
            </IonRow>
          </IonList>
        </IonGrid>
      </IonContent>

      <Footer />
    </IonPage>
  );
};

export default Home;
