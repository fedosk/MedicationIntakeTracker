import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  AuthStackParamList,
  RegisterScreenProps,
} from '../../../app/navigationConfig/types/authStackTypes';
import UniversalButton from '../../../components/UniversalButton';
import UniversalInput from '../../../components/UniversalInput';
import { THEME_COLORS } from '../../../constants/appConstants';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { registerUser } from '../../../store/user/slice/userSlice';

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    try {
      dispatch(registerUser({ email, password }));
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        error instanceof Error ? error.message : 'An error occurred',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <UniversalInput
        label={'Email'}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCorrect={false}
      />
      <UniversalInput
        label={'Password'}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCorrect={false}
      />
      <UniversalInput
        label={'Confirm password'}
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCorrect={false}
      />
      <UniversalButton label={'Register'} onPress={handleRegister} />
      <UniversalButton
        style={styles.backButton}
        label={'Back to Login'}
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.WHITE,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
    fontWeight: '700',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: THEME_COLORS.DARK30,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    color: THEME_COLORS.DARK,
  },
  button: {
    backgroundColor: THEME_COLORS.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonText: {
    color: THEME_COLORS.WHITE,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: THEME_COLORS.SECONDARY3,
  },
});

export default RegisterScreen;
