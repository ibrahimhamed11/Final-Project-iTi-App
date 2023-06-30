import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Image, Button, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

//screens
import TabBar from './Components/TabBar';
import notf from './Components/NotificationRoutes';

import Splash from './Components/Splash';
import ProductDetails from './screens/productDetails';
import cart from './Components/cart';
import LoginScreen from './screens/LoginScreen';
import StartScreen from './screens/StartScreen';
import RegisterScreen from './screens/RegisterScreen';
import Blogs from './screens/Blogs';
import OnboardingScreen from './screens/OnboardingScreen';
import NotficationsScreen from './screens/NotficationsScreen';
import joinUsScreen from './screens/joinUsScreen'
import SellerProfileScreen from './screens/SellerProfile'
import AllProductsScreen from './screens/AllProductsScreen'
// import Home from './screens/Homescreen'
import ProfileScreen from './screens/ProfileScreen';
import EachProduct from './Components/EachProduct';
import MoreDetails from './Components/MoreDetails';
import ToDo from './Components/ToDo';
import Vaccination from './screens/VaccinationScreen'
import sellerRegister from './screens/sellerRegister';
import motherRegister from './screens/motherRegister'

//redux
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Store } from './Redux/Store';
//font


// Drawer
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';

export default function App() {


  //Font
  const loadFont = async () => {
    await Font.loadAsync({
      'Droid': require('./assets/fonts/Droid.ttf'),
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



  //Drawer and stack Navigator
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  // const  notification  = useSelector(state => state);

  function DrawerNavigator() {
    const nav = useNavigation()
    const NotificationIcon = ({ notification }) => (
      <View style={{ marginRight: 30 }}>
        <TouchableOpacity onPress={() => nav.navigate("الاشعارات")}>
          <FontAwesome name="bell" size={20} color="#f7f6f1f3" />
          {notification > 0 && (
            <View
              style={{
                position: 'absolute', 
                top: -8,
                right: 10,
                backgroundColor: 'red',
                borderRadius: 10,
                width: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 15 }}>{notification}</Text>

            </View>
          )}
        </TouchableOpacity>
      </View>
    );

    const { notification } = useSelector((state) => state.Notify)
    return (


      <Drawer.Navigator
        screenOptions={{
          headerRight: () => <NotificationIcon notification={notification} />,
        }}
      >
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
                <FontAwesome name="" size={20} color="white" style={{ marginRight: '80%' }} />
                <Text style={{ color: 'white', fontSize: 18 }}></Text>
              </View>
            ),
            headerStyle: {
              backgroundColor: '#76005f', 
              height:Dimensions.get('screen').height*0.09 ,
              // elevation:5
               
            },  
            headerTintColor: '#ffffff',
          }}
        />



        <Drawer.Screen
          name="تواصل معنا"
          component={joinUsScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <FontAwesome name="phone" color={color} size={size} style={{ marginRight: 10 }} />
            ),
            headerShown: true,
            headerStyle: {
              backgroundColor: '#76005f',
            },
            headerTintColor: 'white',
          }}
        />



        <Drawer.Screen
          name="الاشعارات"
          component={NotficationsScreen}
          options={({ navigation }) => ({
            drawerIcon: ({ color, size }) => (
              <TouchableOpacity onPress={() => DrawerNavigator.navigate('ResetPasswordScreen')}>
              </TouchableOpacity>
            ),
            headerShown: true,
            headerStyle: {
              backgroundColor: '#76005f',
            },
            headerTintColor: 'white', 
          })} 
        />

 
        <Drawer.Screen 
          name="البائع"
          component={SellerProfileScreen}
          options={({ navigation }) => ({
            drawerIcon: ({ color, size }) => (
              <TouchableOpacity onPress={() => DrawerNavigator.navigate('AllProductsScreen')}>
                <FontAwesome name="sign-out" color={color} size={size} style={{ fontFamily: 'Droid', marginRight: 10 }} />
              </TouchableOpacity>
            ),
            headerShown: true,
            headerStyle: {
              backgroundColor: '#6f2f04',   
            },
            headerTintColor: 'white',
          })}
        />
      </Drawer.Navigator>

    );
  }



  return (
    <Provider store={Store}>


      {/* <SafeAreaView style={[styles.container, { backgroundColor: 'blue' }]}> */}

      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name='Home' component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} options={{ headerShown: false }} />
          <Stack.Screen name='joinus' component={joinUsScreen} options={{ headerShown: false }} />

          <Stack.Screen name='StartScreen' component={StartScreen} options={{ headerShown: false }} />
          <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Blogs' component={Blogs} options={{ headerShown: false }} />
          <Stack.Screen name='Cart' component={cart} options={{ headerShown: false }} />

          <Stack.Screen name='toDO' component={ToDo} options={{ headerShown: false }} />
          <Stack.Screen name='eachproduct' component={EachProduct} options={{ headerShown: false }} />
          <Stack.Screen name='moreDetails' component={MoreDetails} options={{ headerShown: false }} />

          <Stack.Screen name='Vaccinations' component={Vaccination} options={{ headerShown: false }} />
          <Stack.Screen name='SellerProfile' component={SellerProfileScreen} options={{ headerShown: false }} />
          {/* <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} /> */}
          <Stack.Screen name='AllProductsScreen' component={AllProductsScreen} options={{ headerShown: true }} />
          <Stack.Screen name='sellerRegister' component={sellerRegister} options={{ headerShown: false }} />
          <Stack.Screen name='motherRegister' component={motherRegister} options={{ headerShown: false }} />

          <Stack.Screen name='ProductDetails'
            component={ProductDetails}
            options={({ navigation }) => ({
              headerShown: true,
              headerStyle: {
                backgroundColor: '#76005f',
              },
              headerTitle: '',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ marginLeft: 16 }}
                >
                  <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                  }}
                  style={{ marginRight: 16 }}
                >
                  <Ionicons name="heart" size={24} color="red" />
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
        <StatusBar style='auto' />
      </NavigationContainer>
      {/* </SafeAreaView> */}

    </Provider>
  );

  //
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  // Your existing styles 
});
