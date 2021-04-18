import { IonApp } from '@ionic/react';

import './theme/App.css';

import Router from './Router';

const App: React.FC = () => (
  <IonApp>
    <Router />
  </IonApp>
);

export default App;
