import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { THEME_COLORS } from '../../constants/appConstants';

interface UniversalButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const UniversalButton: React.FC<UniversalButtonProps> = ({
  label,
  onPress,
  style,
  textStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME_COLORS.PRIMARY,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonText: {
    color: THEME_COLORS.WHITE,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonDisabled: {
    backgroundColor: THEME_COLORS.PRIMARY_DISABLED,
  },
});

export default UniversalButton;
