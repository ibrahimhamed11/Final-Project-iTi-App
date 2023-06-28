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
import jwtDecode from 'jwt-decode';
import axios from 'axios';

//ip 
import ip from '../ipConfig';


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

    try {
      const response = await axios.post(`${ip}/user/login`, {
        email: email.value,
        password: password.value,
      });

      const { data, status } = response.data;

      if (status === 200) {
        const { token, user } = data;

        // Save the token and ID in AsyncStorage
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userId', user._id);
        await AsyncStorage.setItem('Role', user.role);


        const storedToken = await AsyncStorage.getItem('token');
        const storedToken2 = await AsyncStorage.getItem('role');

        // Decode the token to retrieve its data
        const decodedToken = jwtDecode(storedToken);

        console.log('Decoded Token:', decodedToken);
        console.log('role ', storedToken2);

        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Login Error', 'An error occurred during login.');
    }
  };

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
            <TouchableOpacity onPress={() => navigation.navigate('joinus')}>
              <Text style={[styles.arabicText, { fontFamily: 'Droid' }]}>هل نسيت كلمة المرور؟</Text>
            </TouchableOpacity>
          </View>

          <Button mode="contained" onPress={onLoginPressed}>
            <Text style={[styles.link, { fontFamily: 'Droid', color: 'white' }]}>التسجيل</Text>
          </Button>

          <View style={[styles.row, styles.arabicText]}>
            <Text style={{ fontFamily: 'Droid' }}>ليس لديك حساب؟ </Text>
            <TouchableOpacity onPress={() => navigation.replace('joinus')}>
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
