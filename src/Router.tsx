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
import { home, person, people } from 'ionicons/icons';

import Home from './pages/Home';
import Followers from './pages/Followers';
import Profile from './pages/Profile';
import Create from './pages/Create';

const Router: React.FC = () => {
  const AppSwitch = () => {
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

  return <AppSwitch />;
};

export default Router;
