import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../../../screens/Home';
import { MedicationDetails } from '../../../screens/MedicationDetails';
import { MainStackParamList } from '../types/MainStackTypes';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MedicationDetails" component={MedicationDetails} />
    </Stack.Navigator>
  );
};

export default MainStack;
