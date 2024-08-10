import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type AuthStackParamList = {
  Auth: undefined;
};

export const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export type Props = NativeStackScreenProps<AuthStackParamList, 'Auth'>;
