import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  AuthStackParamList,
  LoginScreenProps,
} from '../../../app/navigationConfig/types/authStackTypes';
import UniversalButton from '../../../components/UniversalButton';
import UniversalInput from '../../../components/UniversalInput';
import { THEME_COLORS } from '../../../constants/appConstants';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { loginUser } from '../../../store/user/slice/userSlice';

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleLogin = async () => {
    try {
      dispatch(loginUser({ email, password }));
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error instanceof Error ? error.message : 'An error occurred',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <UniversalButton label={'Login'} onPress={handleLogin} />
      <UniversalButton
        style={styles.signUpButton}
        label={'Registration'}
        onPress={() => navigation.navigate('Registration')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: THEME_COLORS.WHITE,
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
    fontWeight: 'bold',
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
  signUpButton: {
    backgroundColor: THEME_COLORS.SECONDARY3,
  },
});

export default LoginScreen;
