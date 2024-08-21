/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import RootStack from './src/app/navigationConfig/ui/RootStack';
import { NavigationProvider } from './src/app/providers/navigationProvider/ui/NavigationProvider';
import { StoreProvider } from './src/app/providers/storeProvider';

function App(): React.JSX.Element {
  return (
    <StoreProvider>
      <NavigationProvider>
        <RootStack />
      </NavigationProvider>
    </StoreProvider>
  );
}

export default App;
