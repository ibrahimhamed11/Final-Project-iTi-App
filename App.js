import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Image, Button, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
//screens
import TabBar from './Components/TabBar';
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
import EachProduct from './Components/EachProduct';
import MoreDetails from './Components/MoreDetails';
import ToDo from './Components/ToDo';
import Vaccination from './screens/VaccinationScreen'
import sellerRegister from './screens/sellerRegister';
import motherRegister from './screens/motherRegister'
import ContactusScreen from './screens/ContactusScreen';
import CheckoutScreen from './screens/checkoutScreen';
import AboutusScreen from './screens/AboutScreen';
import addrate from './screens/AddRateScreen';
import myorders from './screens/MyorderScreen';
//redux
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Store } from './Redux/Store';
// Drawer
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';



export default function App() {
  // get role
  const [role, setRole] = useState(null); // Initialize role with null
  // const [HeaderColor, setHeaderColor] = useState(''); // Initialize role with null
  const getRole = async () => {
    try {
      const storedRole = await AsyncStorage.getItem('role');
      // console.log('The role: ', storedRole);
      // console.log('The role before: ', storedRole);
      setRole(storedRole); // Set the retrieved role  in the state
      // console.log('The role aFRTEE: ', storedRole);
    } catch (error) {
      console.log('Error retrieving role:', error);
    }
  };

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


  // to show on boarding pages
  useEffect(async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else {
      setIsAppFirstLaunched(false);
    }
    getRole()
  }, []);



  //Drawer and stack Navigator
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  // const notification = useSelector(state => state);

  function DrawerNavigator() {
    const nav = useNavigation()

    const NotificationIcon = ({ notification }) => (
      <View style={{ marginRight: 30 }}>
        <TouchableOpacity onPress={() => nav.navigate("الاشعارات")}>
          <FontAwesome name="bell" size={20} color="#58564CF3" />
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
                <FontAwesome name="" size={20} color="#75000ea3" style={{ marginRight: '80%' }} />
                <Text style={{ color: 'white', fontSize: 18 }}></Text>
              </View>
            ),
            headerStyle: {
              backgroundColor: '#ffffff',
              height: Dimensions.get('screen').height * 0.1,
              // elevation:5
            },
            headerTintColor: '#000000',
            drawerLabelStyle: {
              fontFamily: 'Droid',
              fontWeight: 'bold', // Add the fontWeight property for bold style
            },
            drawerActiveBackgroundColor: '#76005e50',
            drawerActiveTintColor: '#ffffff',
          }}
        />

        <Drawer.Screen
          name="تواصل معنا"
          component={CheckoutScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <FontAwesome name="phone" color={color} size={size} style={{ marginRight: 10 }} />
            ),
            drawerLabel: ({ focused }) => (
              <Text style={{ fontFamily: 'Droid', fontWeight: focused ? 'bold' : 'normal' }}>
                تواصل معنا
              </Text>
            ),
            drawerActiveBackgroundColor: '#76005e50',
            drawerActiveTintColor: '#ffffff',
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
          options={{
            drawerIcon: ({ color, size }) => (
              <FontAwesome name="bell" color={color} size={size} style={{ marginRight: 10 }} />
            ),
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#76005f',
            },
            headerTintColor: 'white',
            drawerLabel: ({ focused }) => (
              <Text style={{ fontFamily: 'Droid', fontWeight: focused ? 'bold' : 'normal' }}>
                الاشعارات
              </Text>
            ),
            drawerActiveBackgroundColor: '#76005e50',
            drawerActiveTintColor: '#ffffff',
          }}
        />

        <Drawer.Screen
          name="طلباتي"
          component={myorders}
          options={{
            drawerIcon: ({ color, size }) => (
              <FontAwesome name="shopping-cart" color={color} size={size} style={{ marginRight: 10 }} />
            ),
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#76005f',
            },
            headerTintColor: 'white',
            drawerLabel: ({ focused }) => (
              <Text style={{ fontFamily: 'Droid', fontWeight: focused ? 'bold' : 'normal' }}>
                طلباتي
              </Text>
            ),
            drawerActiveBackgroundColor: '#76005e50',
            drawerActiveTintColor: '#ffffff',
          }}
        />

      </Drawer.Navigator>
    );
  }



  return (
    <Provider store={Store}>
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
          <Stack.Screen name='AllProductsScreen' component={AllProductsScreen} options={{ headerShown: true }} />
          <Stack.Screen name='sellerRegister' component={sellerRegister} options={{ headerShown: false }} />
          <Stack.Screen name='motherRegister' component={motherRegister} options={{ headerShown: false }} />
          <Stack.Screen name='AboutusScreen' component={AboutusScreen} options={{ headerShown: false }} />
          <Stack.Screen name='ContactusScreen' component={ContactusScreen} options={{ headerShown: false }} />
          <Stack.Screen name='CheckoutScreen' component={CheckoutScreen} options={{ headerShown: true, headerTitle: '' }} />
          <Stack.Screen name='addrate' component={addrate} options={{ headerShown: false }} />
          <Stack.Screen name='myorders' component={myorders} options={{ headerShown: false }} />
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
            })}
          />

        </Stack.Navigator>
        <StatusBar style='auto' />
      </NavigationContainer>
    </Provider>
  );

  //
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
