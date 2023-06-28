import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileScreen from '../screens/ProfileScreen';
import Blogs from '../screens/Blogs';
import Products from '../screens/Products';
import Cart from '../Components/cart';
import Home from '../screens/Homescreen';
import * as Font from 'expo-font';
import MotherProfile from '../screens/ProfileScreen'
import Sellerprofile from '../screens/SellerProfile'
import AsyncStorage from '@react-native-async-storage/async-storage';


const TabBar = () => {
  const data = useSelector((state) => state.ProductSlice);
  const Tab = createBottomTabNavigator();
  const theme = useTheme();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [role, setRole] = useState(null); // Initialize role with null

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Droid: require('../assets/fonts/Droid.ttf'),
      });
      setFontLoaded(true);
    };
    loadFonts();

    

    getRole();
    // getRole()
  }, []);

  const styles = StyleSheet.create({
    customText: {
      fontFamily: 'Droid',
    },
  });

  // const [role, setRole] = useState('');

  // const getRole = async () => {
  //   try {
  //     const role = await AsyncStorage.getItem('role');
  //     setRole(role)
  //     console.log('The ROLEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE ', role)
  //   } catch (error) {
  //     console.log('Error retrieving role:', error);
  //     return null;
  //   }
  // };
const getRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('role');
        console.log('The role: ', storedRole);
        setRole(storedRole); // Set the retrieved role in the state
      } catch (error) {
        console.log('Error retrieving role:', error);
      }
    };

  if (!fontLoaded) {
    return null; // Render null or a loading indicator while the font is loading
  }

  return (
    <Tab.Navigator

      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;

          if (route.name === 'الرئيسيه') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'المدونات') {
            iconName = focused ? 'newspaper-o' : 'newspaper-o';
          } else if (route.name === 'المتجر') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          } else if (route.name === 'السله') {
            iconName = focused ? 'shopping-basket' : 'shopping-basket';
          } else if (route.name === 'الملف الشخصي') {
            iconName = focused ? 'user' : 'user';
          }

          return <Icon name={iconName} color={color} size={size * 0.8} style={styles.customText} />;
        },
        tabBarActiveTintColor: '#76005ee5',
        tabBarInactiveTintColor: '#76005e59',
        tabBarStyle: {
          borderTopWidth: 1,
          height: 60,
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          borderRadius: 25,
          paddingBottom: 5,
          shadowColor: '#0b0323',
          shadowOffset: {
            width: 10,
            height: 10
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
        tabBarLabelStyle: [styles.customText, { fontSize: 11 }],
        tabBarIconStyle: {
          marginTop: 5, // Adjust the margin as per your preference
        },
        tabBarActiveBackgroundColor: {}
      })}
      tabBarOptions={{

      }}
    >
      <Tab.Screen name='الرئيسيه' component={Home} options={{ headerShown: false }} />
      <Tab.Screen name='المدونات' component={Blogs} options={{ headerShown: false }} />
      <Tab.Screen
        name='الملف الشخصي'
        component={role === 'mother' ? ProfileScreen : Sellerprofile}
        options={{ headerShown: false }}
      />
      <Tab.Screen name='المتجر' component={Products} options={{ headerShown: false }} />
      <Tab.Screen name='السله' component={Cart} options={{ tabBarBadge: data.cart.length > 0 ? data.cart.length : null, headerShown: false }} />
    </Tab.Navigator>
  );
};

export default TabBar;
