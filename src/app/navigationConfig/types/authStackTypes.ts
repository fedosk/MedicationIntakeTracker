import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Login: undefined;
  Registration: undefined;
};

export type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Registration'
>;
export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Login'
>;
