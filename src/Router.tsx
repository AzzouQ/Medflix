import React, { useEffect } from 'react';
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
          <Route exact path={'/'}>
            <Redirect to={'/home'} />
          </Route>

          <Route exact path={'/home'}>
            <Home />
          </Route>

          <Route exact path={'/followers'}>
            <Followers />
          </Route>

          <Route exact path={'/profile'}>
            <Profile />
          </Route>

          <Route exact path={'/create'}>
            <Create />
          </Route>

          <Route exact path={'/editProfile'}>
            <EditProfile />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot={'bottom'}>
          <IonTabButton tab={'Home'} href={'/home'}>
            <IonIcon icon={home} />
            <IonLabel>{'Home'}</IonLabel>
          </IonTabButton>

          <IonTabButton tab={'Followers'} href={'/followers'}>
            <IonIcon icon={people} />
            <IonLabel>{'Followers'}</IonLabel>
          </IonTabButton>

          <IonTabButton tab={'Profile'} href={'/profile'}>
            <IonIcon icon={person} />
            <IonLabel>{'Profile'}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Router;
