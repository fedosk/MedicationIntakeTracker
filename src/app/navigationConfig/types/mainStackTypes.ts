import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;
  MedicationDetails: { id: number };
  EditMedication: { id: number };
};

export type HomeProps = NativeStackScreenProps<MainStackParamList, 'Home'>;
export type MedicationDetailsProps = NativeStackScreenProps<
  MainStackParamList,
  'MedicationDetails'
>;
export type EditMedicationProps = NativeStackScreenProps<
  MainStackParamList,
  'EditMedication'
>;
