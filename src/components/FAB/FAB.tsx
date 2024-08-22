import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { THEME_COLORS } from '../../constants/appConstants';

interface FABProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const FAB: React.FC<FABProps> = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    position: 'absolute',
    bottom: 30,
    left: 110,
    backgroundColor: THEME_COLORS.SUCCESS,
    height: 60,
    width: 60,
    shadowColor: THEME_COLORS.DARK,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    color: THEME_COLORS.WHITE,
    fontWeight: '700',
    textAlign: 'center',
  },
});
