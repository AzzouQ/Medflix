import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { home, people, person } from 'ionicons/icons';
import { t } from './i18n';

import Home from './pages/Home';
import Followers from './pages/Followers';
import Profile from './pages/Profile';
import Create from './pages/Create';
import EditProfile from './pages/EditProfile';

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

const Router: React.FC = () => {
  return (
    <IonReactRouter>
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
            <IonIcon icon={home} />
            <IonLabel>{t`tab.home`}</IonLabel>
          </IonTabButton>

          <IonTabButton tab={'Followers'} href={Links.Followers}>
            <IonIcon icon={people} />
            <IonLabel>{t('tab.followers')}</IonLabel>
          </IonTabButton>

          <IonTabButton tab={'Profile'} href={Links.Profile}>
            <IonIcon icon={person} />
            <IonLabel>{t`tab.profile`}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Router;
