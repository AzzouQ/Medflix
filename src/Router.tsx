import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  SmileTwoTone,
  HomeTwoTone,
  PlayCircleTwoTone,
  IdcardTwoTone,
} from '@ant-design/icons';
import { ellipse, square, triangle } from 'ionicons/icons';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Tab2 from './pages/Tab2';
import Login from './pages/Login';
import Register from './pages/Register';

const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/Home">
            <Home />
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
          <IonTabButton tab="Home" href="/Home">
            <IonIcon icon={ellipse} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={square} />
            <IonLabel>Tab 2</IonLabel>
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
