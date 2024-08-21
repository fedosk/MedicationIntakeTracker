import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface RootStackParamList {
  Home: undefined;
  Details: { itemId: number; otherParam?: string };
  [route: string]: object | undefined;
}

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

export type {
  RootStackParamList,
  HomeScreenNavigationProp,
  DetailsScreenNavigationProp,
};
