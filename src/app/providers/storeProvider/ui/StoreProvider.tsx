import React, { ReactNode } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor, RootState } from '../../../../store';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: RootState;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
