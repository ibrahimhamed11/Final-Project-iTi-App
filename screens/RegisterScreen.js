import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text as RNText } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../Components/Background'
import Logo from '../Components/Logo'
import Header from '../Components/Header'
import Button from '../Components/Button'
import TextInput from '../Components/TextInput'
import BackButton from '../Components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import * as Font from 'expo-font'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isFontLoaded, setIsFontLoaded] = useState(false)

  // Font
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Droid': require('../assets/fonts/Droid.ttf'),
      });
      setIsFontLoaded(true);
    };

    loadFont();
  }, []);

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    })
  }

  if (!isFontLoaded) {
    // Render a loading screen or placeholder while the font is loading
    return null;
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header style={[styles.arabicText, { fontFamily: 'Droid', fontSize: 20 }]}>
        مرحبا بك مجدداً.
      </Header>
      <TextInput
        label="الاسم"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={
          <Text style={{ fontFamily: 'Droid', color: 'red' }}>{name.error}</Text>
        } secureTextEntry
      />
      <TextInput
        label="البريد الإلكتروني"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={
          <Text style={{ fontFamily: 'Droid', color: 'red' }}>{email.error}</Text>
        } autoCapitalize="none"
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
        } secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        <Text style={[styles.link, { fontFamily: 'Droid', color: 'white' }]}>التسجيل</Text>
      </Button>
      <View style={styles.row}>
        <Text style={[styles.link, { fontFamily: 'Droid', color: 'black', marginRight: 10 }]}>هل لديك حساب</Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={[styles.link, { fontFamily: 'Droid' }]}>تسجيل الدخول</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
