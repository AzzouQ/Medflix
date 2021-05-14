import { IonApp } from '@ionic/react';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import React, { useMemo } from 'react';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { uploadReducer, userReducer } from './redux';
import Router from './Router';
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
