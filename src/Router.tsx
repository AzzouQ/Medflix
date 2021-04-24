import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { home, person, people } from 'ionicons/icons';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Followers from './pages/Followers';

const Router: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  firebase.auth().onAuthStateChanged((_user) => setUser(_user));

  const AuthSwitch = () => {
    return (
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route exact path={'/signIn'}>
              <SignIn />
            </Route>
            <Route exact path={'/signUp'}>
              <SignUp />
            </Route>
            <Route path={'/'}>
              <Redirect to={'/signIn'} />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    );
  };

  const AppSwitch = () => {
    return (
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Switch>
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
            </Switch>
          </IonRouterOutlet>
          <IonTabBar slot={'bottom'}>
            <IonTabButton tab={'Home'} href={'/home'}>
              <IonIcon icon={home} />
              <IonLabel>{'Home'}</IonLabel>
            </IonTabButton>

            <IonTabButton tab={'tab2'} href={'/followers'}>
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

  if (!user) {
    return <AuthSwitch />;
  }

  return <AppSwitch />;
};

export default Router;
