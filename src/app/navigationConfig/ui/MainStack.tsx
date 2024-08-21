import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EditMedication } from '../../../screens/EditMedication';
import { Home } from '../../../screens/Home';
import { MedicationDetails } from '../../../screens/MedicationDetails';
import { MainStackParamList } from '../types/MainStackTypes';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MedicationDetails" component={MedicationDetails} />
      <Stack.Screen name="EditMedication" component={EditMedication} />
    </Stack.Navigator>
  );
};

export default MainStack;
