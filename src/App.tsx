import React, { useMemo } from 'react';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { IonApp } from '@ionic/react';

import { userReducer } from './redux/User.slice';

import './theme';

import Router from './Router';

const App: React.FC = () => {
  const rootStore = useMemo(() => {
    const store = configureStore({
      reducer: {
        user: userReducer,
      },
      middleware: [
        logger,
        ...getDefaultMiddleware({ serializableCheck: false }),
      ] as const,
    });
    return { store };
  }, []);

  return (
    <Provider store={rootStore.store}>
      <IonApp>
        <Router />
      </IonApp>
    </Provider>
  );
};

export default App;
