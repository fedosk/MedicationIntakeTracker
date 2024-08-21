import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../../../screens/Login';
import { RegistrationScreen } from '../../../screens/Registration';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
