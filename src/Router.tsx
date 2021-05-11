import React, { useEffect, useState } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
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
import { IonReactRouter } from '@ionic/react-router';

import { home, person, people } from 'ionicons/icons';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Followers from './pages/Followers';
import EditProfile from './pages/EditProfile';
import Create from './pages/Create';
import ProgressBar from './components/ProgressBar';

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
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  const AuthSwitch = () => {
    return (
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route exact path={Links.SignIn}>
              <SignIn />
            </Route>
            <Route exact path={Links.SignUp}>
              <SignUp />
            </Route>
            <Route path={Links.Base}>
              <Redirect to={Links.Profile} />
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
              <Route exact path={Links.Base}>
                <Redirect to={Links.Home} />
              </Route>

              <Route exact path={Links.Home}>
                <Home />
              </Route>

              <Route exact path={Links.Followers}>
                {user ? (
                  <Followers />
                ) : (
                  <Redirect
                    to={{
                      state: { from: Links.Followers },
                      pathname: Links.SignIn,
                    }}
                  />
                )}
              </Route>

              <Route exact path={Links.Profile}>
                {user ? (
                  <Profile />
                ) : (
                  <Redirect
                    to={{
                      state: { from: Links.Profile },
                      pathname: Links.SignIn,
                    }}
                  />
                )}
              </Route>

              <Route exact path={Links.Create}>
                {user ? (
                  <Create />
                ) : (
                  <Redirect
                    to={{
                      state: { from: Links.Create },
                      pathname: Links.SignIn,
                    }}
                  />
                )}
              </Route>

              <Route exact path={Links.SignIn}>
                <SignIn />
              </Route>

              <Route exact path={Links.SignUp}>
                <SignUp />
              </Route>

              <Route exact path={Links.EditProfile}>
                {user ? (
                  <EditProfile />
                ) : (
                  <Redirect
                    to={{
                      state: { from: Links.EditProfile },
                      pathname: Links.SignIn,
                    }}
                  />
                )}
              </Route>
            </Switch>
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

  return <AppSwitch />;
};

export default Router;
