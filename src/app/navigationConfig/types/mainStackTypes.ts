import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;
  MedicationDetails: { id: string };
};

export type HomeProps = NativeStackScreenProps<MainStackParamList, 'Home'>;
export type MedicationDetailsProps = NativeStackScreenProps<
  MainStackParamList,
  'MedicationDetails'
>;
