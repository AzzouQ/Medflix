import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import {
  IonFooter,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
} from '@ionic/react';
import { home, person, people } from 'ionicons/icons';

import Home from './pages/Home';
import Followers from './pages/Followers';
import Profile from './pages/Profile';
import Create from './pages/Create';
import EditProfile from './pages/EditProfile';
import { Plugins } from '@capacitor/core';
import { useDispatch } from 'react-redux';
import { localActions } from './redux/Local.slice';

const { Device } = Plugins;

const Links = {
  Base: '/',
  SignIn: '/signIn',
  SignUp: '/signUp',
  Profile: '/profile',
  Home: '/home',
  Create: '/create',
  EditProfile: '/editProfile',
  Followers: '/followers',
};

const Router: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    Device.getLanguageCode().then((value) => {
      dispatch(localActions.setLocal({ local: value.value }));
    });
  });

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path={Links.Base}>
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
            <IonLabel>{'Home'}</IonLabel>
          </IonTabButton>

          <IonTabButton tab={'Followers'} href={Links.Followers}>
            <IonIcon icon={people} />
            <IonLabel>{'Followers'}</IonLabel>
          </IonTabButton>

          <IonTabButton tab={'Profile'} href={Links.Profile}>
            <IonIcon icon={person} />
            <IonLabel>{'Profile'}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Router;
