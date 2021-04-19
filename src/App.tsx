import { IonApp } from '@ionic/react';

import './theme';

import Router from './Router';

const App: React.FC = () => (
  <IonApp>
    <Router />
  </IonApp>
);

export default App;
