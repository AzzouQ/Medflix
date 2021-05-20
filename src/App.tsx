import React, { useMemo } from 'react';
import { Provider } from 'react-redux';
import { IonApp } from '@ionic/react';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import Router from 'Router';
import { uploadReducer, userReducer } from 'slices';

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
        <Router />
      </IonApp>
    </Provider>
  );
};

export default App;
