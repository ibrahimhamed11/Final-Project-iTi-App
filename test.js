import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Image, Button, ScrollView } from 'react-native';
import products from './screens/Products';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';

import TabBar from './Components/TabBar';
import Splash from './Components/Splash';
import ProductDetails from './screens/productDetails';
import cart from './Components/cart';
import Home from './screens/Homescreen'
import { Provider } from 'react-redux';
import { Store } from './Redux/Store';
import LoginScreen from './screens/LoginScreen';
import StartScreen from './screens/StartScreen';
import RegisterScreen from './screens/RegisterScreen';
import Blogs from './screens/Blogs';
import OnboardingScreen from './screens/OnboardingScreen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
//Draawer 
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);

  const loadFont = async () => {
    await Font.loadAsync({
      'customFont': require('./assets/fonts/Droid.ttf'),
    });
    setIsFontLoaded(true);
  };

  useEffect(() => {
    loadFont().then(() => setIsFontLoaded(true));
  }, []);

  useEffect(async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else {
      setIsAppFirstLaunched(false);
    }
  }, []);

  const Stack = createNativeStackNavigator();
const Draawer =createDrawerNavigator();

function DrawerNavigator(){
return <Drawer.Navigator>
  <Draawer.Screen name='home' component={Home}/>
</Drawer.Navigator>
}











  return (
    <Provider store={Store}>
      <NavigationContainer>
          <Stack.Navigator >
          <Stack.Screen name="home" component={DrawerNavigator} />

          {/* {isAppFirstLaunched && (<Stack.Screen name="OnboardingScreen" component={OnboardingScreen}/>)} */}
          <Stack.Screen options={{ headerShown: false }} name='splash' component={Splash} />
          <Stack.Screen options={{ headerShown: false }} name='OnboardingScreen' component={OnboardingScreen} />
          <Stack.Screen name="StartScreen" options={{ headerShown: false }} component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} component={RegisterScreen} />
          <Stack.Screen name='Blogs' component={Blogs} />
          <Stack.Screen options={{ headerShown: true }} name='Home' component={TabBar}></Stack.Screen>
          <Stack.Screen name="Products" component={products} />

          <Stack.Screen options={{ headerShown: true }} name="ProductDetails" component={ProductDetails} />
          <Stack.Screen options={{ headerShown: true }} name="cart" component={cart} />
          <Stack.Screen options={{ headerShown: false }} name="login" component={LoginScreen} />
        </Stack.Navigator>
        <StatusBar style='light' />
      </NavigationContainer>
    </Provider>
  );
}












<Drawer.Screen
name="الرئيسية"
component={TabBar}
options={{
  drawerIcon: ({ color, size }) => (
    <FontAwesome name="home" color={color} size={size} style={{ marginRight: 10 }} />
  ),
  headerShown: true,
  headerTitle: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <FontAwesome name="home" size={20} color="white" style={{ marginRight: 10 }} />
      <Text style={{ color: 'white', fontSize: 18 }}>الرئيسية</Text>
    </View>
  ),
  headerStyle: {
    backgroundColor: 'green',
  },
  headerTintColor: 'white',
}}
/>
<Stack.Screen
  name='Home'
  component={DrawerNavigator}
  options={{ headerShown: false }}
/>
<Drawer.Screen
name="تواصل معنا"
component={Contactus}
options={{
  drawerIcon: ({ color, size }) => (
    <FontAwesome name="phone" color={color} size={size} style={{ marginRight: 10 }} />
  ),
  headerShown: true,
  headerStyle: {
    backgroundColor: 'green',
  },
  headerTintColor: 'white',
}}
/>

<Drawer.Screen
name="تسجيل الخروج"
component={Contactus}
options={{
  drawerIcon: ({ color, size }) => (
    <FontAwesome name="sign-out" color={color} size={size} style={{ fontFamily: 'customFont', marginRight: 10 }} />
  ),
  headerShown: true,
  headerStyle: {
    backgroundColor: 'green',
  },
  headerTintColor: 'white',
}}
/>









////////////////////////////////////
<Drawer.Screen
name="الرئيسية"
component={TabBar}
options={{
  drawerIcon: ({ color, size }) => (
    <FontAwesome name="home" color={color} size={size} style={{ marginRight: 10 }} />
  ),
  headerShown: true,
  headerTitle: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <FontAwesome name="home" size={20} color="white" style={{ marginRight: 10 }} />
      <Text style={{ color: 'white', fontSize: 18 }}>الرئيسية</Text>
    </View>
  ),
  headerStyle: {
    backgroundColor: 'green',
  },
  headerTintColor: 'white',
}}
/>

<Drawer.Screen
name="تواصل معنا"
component={Contactus}
options={{
  drawerIcon: ({ color, size }) => (
    <FontAwesome name="phone" color={color} size={size} style={{ marginRight: 10 }} />
  ),
  headerShown: true,
  headerStyle: {
    backgroundColor: 'green',
  },
  headerTintColor: 'white',
}}
/>

<Drawer.Screen
name="تسجيل الخروج"
component={Contactus}
options={{
  drawerIcon: ({ color, size }) => (
    <FontAwesome name="sign-out" color={color} size={size} style={{ fontFamily: 'customFont', marginRight: 10 }} />
  ),
  headerShown: true,
  headerStyle: {
    backgroundColor: 'green',
  },
  headerTintColor: 'white',
}}
/>