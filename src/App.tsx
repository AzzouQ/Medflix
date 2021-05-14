import React, { useMemo } from 'react';
import { IonApp } from '@ionic/react';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import Router from './Router';
import { uploadReducer, userReducer } from './redux';

import './theme';

const App: React.FC = () => {
  const rootStore = useMemo(() => {
    const store = configureStore({
      reducer: {
        user: userReducer,
        upload: uploadReducer,
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
        {/* <Notification /> */}
        <Router />
      </IonApp>
    </Provider>
  );
};

export default App;
