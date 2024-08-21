import React from 'react';
import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface GestureHandlerProviderProps {
  children?: ReactNode;
}

export const GestureHandlerProvider = (props: GestureHandlerProviderProps) => {
  const { children } = props;

  return (
    <GestureHandlerRootView style={styles.container}>
      {children}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
