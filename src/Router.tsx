import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { t } from 'i18n';

import Home from 'pages/Home';
import Followers from 'pages/Followers/Followers';
import Profile from 'pages/Profile';
import Create from 'pages/Create';
import EditProfile from 'pages/EditProfile';

const Router: React.FC = () => {
  const Links = {
    Root: '/',
    SignIn: '/signIn',
    SignUp: '/signUp',
    Profile: '/profile',
    Home: '/home',
    Create: '/create',
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

        <Route exact path={Links.Profile}>
          <Profile />
        </Route>

        <Route exact path={Links.Create}>
          <Create />
        </Route>

        <Route exact path={Links.EditProfile}>
          <EditProfile />
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

        <IonTabButton tab={'Profile'} href={Links.Profile}>
          <UserOutlined style={{ fontSize: 25 }} />
          <IonLabel>{t`tab.profile`}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Router;
