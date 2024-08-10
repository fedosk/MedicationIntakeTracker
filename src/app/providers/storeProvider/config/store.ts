import { configureStore } from '@reduxjs/toolkit';

import { StateSchema } from './stateSchema';
import { counterReducer } from '../../../../entities/Counter';

export const createReduxStore = (initialState?: StateSchema) => {
  const store = configureStore<StateSchema>({
    reducer: {
      counter: counterReducer,
    },
    devTools: __DEV__,
    preloadedState: initialState,
  });

  return store;
};

// export type RootState = ReturnType<typeof createReduxStore().getState>
