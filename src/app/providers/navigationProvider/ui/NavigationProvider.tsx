import React from 'react';
import { ReactNode } from 'react';

import { NavigationContainer } from '@react-navigation/native';

interface NavigationProviderProps {
  children?: ReactNode;
}

export const NavigationProvider = (props: NavigationProviderProps) => {
  const { children } = props;

  return <NavigationContainer>{children}</NavigationContainer>;
};
