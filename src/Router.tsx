import { HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import {
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { t } from 'i18n';
import Followers from 'pages/Followers';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { userSelectors } from 'slices';

const Router: React.FC = () => {
  const user = useSelector(userSelectors.getUser);

  const Links = {
    Root: '/',
    Profile: '/profile',
    Home: '/home',
    EditProfile: '/editProfile',
    Followers: '/followers',
  };

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path={Links.Root}>
          <Redirect to={Links.Home} />
        </Route>

        <Route exact path={Links.Home}>
          <Home />
        </Route>

        <Route exact path={Links.Followers}>
          <Followers />
        </Route>

        <Route exact path={`${Links.Profile}/:id`}>
          <Profile />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot={'bottom'}>
        <IonTabButton tab={'Home'} href={Links.Home}>
          <HomeOutlined style={{ fontSize: 25 }} />
          <IonLabel>{t`tab.home`}</IonLabel>
        </IonTabButton>

        <IonTabButton tab={'Followers'} href={Links.Followers}>
          <TeamOutlined style={{ fontSize: 25 }} />
          <IonLabel>{t('tab.followers')}</IonLabel>
        </IonTabButton>

        <IonTabButton tab={'Profile'} href={`${Links.Profile}/${user?.uid}`}>
          <UserOutlined style={{ fontSize: 25 }} />
          <IonLabel>{t`tab.profile`}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Router;
