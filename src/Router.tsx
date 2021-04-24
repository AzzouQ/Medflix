import React from 'react';
import { Route } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Tab2 from './pages/Tab2';
import Login from './pages/Login';
import Register from './pages/Register';
import Followers from './pages/Followers';

const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>

          <Route exact path="/Followers">
            <Followers />
          </Route>

          <Route exact path="/tab2">
            <Tab2 />
          </Route>

          <Route exact path="/Profile">
            <Profile />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Home" href="/home">
            <IonIcon icon={ellipse} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="tab2" href="/Followers">
            <IonIcon icon={square} />
            <IonLabel>Followers</IonLabel>
          </IonTabButton>

          <IonTabButton tab="Profile" href="/Profile">
            <IonIcon icon={triangle} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Router;
