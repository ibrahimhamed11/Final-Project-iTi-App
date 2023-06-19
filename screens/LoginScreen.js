import React, { useState, useEffect } from 'react';
import { Keyboard, TouchableOpacity, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../Components/Background';
import Logo from '../Components/Logo';
import Header from '../Components/Header';
import Button from '../Components/Button';
import TextInput from '../Components/TextInput';
import BackButton from '../Components/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const [loaded] = useFonts({
    Droid: require('../assets/fonts/Droid.ttf'),
  });

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    // Save the password in AsyncStorage
    await AsyncStorage.setItem('password', password.value);

    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  if (!loaded) {
    return null;
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Background>
          <BackButton goBack={navigation.goBack} />
          <Logo />
          <Header style={[styles.arabicText, { fontFamily: 'Droid', fontSize: 20 }]}>
  مرحبا بك مجدداً.
</Header>
          <TextInput
  label="البريد الإلكتروني"
  returnKeyType="next"
  value={email.value}
  onChangeText={(text) => setEmail({ value: text, error: '' })}
  error={!!email.error}
  errorText={
    <Text style={{ fontFamily: 'Droid', color: 'red' }}>{email.error}</Text>
  }
  autoCapitalize="none"
  autoCompleteType="email"
  textContentType="emailAddress"
  keyboardType="email-address"
  style={{ fontFamily: 'Droid' }}
/>

<TextInput
  label="كلمة المرور"
  returnKeyType="done"
  value={password.value}
  onChangeText={(text) => setPassword({ value: text, error: '' })}
  error={!!password.error}
  errorText={
    <Text style={{ fontFamily: 'Droid', color: 'red' }}>{password.error}</Text>
  }
  secureTextEntry
  style={{ fontFamily: 'Droid' }}
/>



          <View style={styles.forgotPassword}>
            <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
              <Text style={[styles.arabicText, { fontFamily: 'Droid' }]}>هل نسيت كلمة المرور؟</Text>
            </TouchableOpacity>
          </View>

          <Button mode="contained" onPress={onLoginPressed}>
            <Text style={[styles.link, { fontFamily: 'Droid', color: 'white' }]}>التسجيل</Text>
          </Button>

          <View style={[styles.row, styles.arabicText]}>
            <Text style={{ fontFamily: 'Droid' }}>ليس لديك حساب؟ </Text>
            <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={[styles.link, { fontFamily: 'Droid' }]}>التسجيل</Text>
            </TouchableOpacity>
          </View>
        </Background>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    fontFamily: 'Droid',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
    fontFamily: 'Droid',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  arabicText: {
    fontFamily: 'Droid',
    textAlign: 'right',
  },
});
