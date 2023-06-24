import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, Modal, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import { DataTable, Button as PaperButton } from 'react-native-paper';
import * as Font from 'expo-font';
import { IconButton, Card, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import TabBar from '../Components/TabBar';
import babysData from '../babysData';
import BabyComponent from '../Components/BabyComponent';


//ip 
import ip from '../ipConfig';

const ProfileScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [name, setName] = useState('Test Name');
  const [email, setEmail] = useState('mail@gmail.com');
  const [phone, setPhone] = useState('01212117200');

  const [vaccinations, setVaccinations] = useState([
    { id: '1', name: 'لقاح 1', date: '2023-06-15', address: 'شارع 123' },
    { id: '2', name: 'لقاح 2', date: '2023-06-20', address: 'شارع 456' },
  ]);

  const [showVaccinations, setShowVaccinations] = useState(false);
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد أنك ترغب في تسجيل الخروج؟',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'تسجيل الخروج',
          onPress: async () => {
            // Clear local storage
            try {
              await AsyncStorage.clear();
              console.log('localstorage cleard');
            } catch (error) {
              console.log('failed to clear local strorage', error);
            }
            // Redirect to the login screen
            navigation.navigate('LoginScreen'); // Replace 'Login' with the actual name of your login screen route
          },
        },
      ],
      {
        // Styling the alert
        style: 'default', // 'default', 'secureText', or 'loginAndPassword'
        titleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'right',
        },
        messageStyle: {
          fontSize: 16,
          textAlign: 'right',
        },
        cancelButtonStyle: {
          backgroundColor: 'red',
        },
        cancelTextStyle: {
          color: 'white',
        },
        destructiveButtonStyle: {
          backgroundColor: 'red',
        },
        destructiveTextStyle: {
          color: 'white',
        },
        // Additional options...
      }
    );
  };

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Droid: require('../assets/fonts/Droid.ttf'),
      });
      setFontLoaded(true);
    };


    loadFont();
  }, []);

  const updateProfile = () => {
    // Code to update profile data
  };


  const profilePhoto = require('../assets/homeimages/james-wheeler-RRZM3cwS1DU-unsplash.jpg');

  if (!fontLoaded) {
    return null;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* Start Begain First Section */}
      <View style={{ flex: 1, padding: 20 }}>
        <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <View>
            <Image
              source={require('../assets/homeimages/6478906.jpg')}
              style={{ width: Dimensions.get('screen').width, height: 160, position: 'relative', backgroundColor: 'grgreyeen' }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', position: 'absolute', bottom: -50 }}>
            <IconButton icon="logout" onPress={handleLogout} style={{ color: '#7600gf', backgroundColor: 'white' }} />
            <Image
              source={profilePhoto}
              style={{ width: 100, height: 100, borderRadius: 50, marginHorizontal: 20, borderColor: 'white', borderWidth: 4 }}
            />
            <IconButton icon="logout" onPress={handleLogout} style={{ color: '#7600gf', backgroundColor: 'white' }} />
          </View>
        </View>
        <View style={{ position: 'absolute', top: 20, right: 20 }}>

        </View>
        <View style={styles.userInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon name="user" size={14} style={{ marginRight: 5 }} />
            <Text style={styles.userName}>Sara Mohamed Ali</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon name="envelope" size={14} style={{ marginRight: 5 }} />
            <Text style={styles.userEmail}>Sara300@gmail.com</Text>
          </View>
          <View style={{ marginTop: 10, alignSelf: 'center' }}>
            <PaperButton
              mode="contained"
              onPress={() => handelupdateProfile()}
              labelStyle={{ fontFamily: 'Droid', fontSize: 12, color: '#76005f', padding: 0, margin: 0 }}
              style={{
                width: 100,
                borderRadius: 7,
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '#76005f',
              }}
              icon={({ color }) => <Icon name="settings" size={12} color="#76005f" />}
            >
              تعديل
            </PaperButton>
          </View>
        </View>
        <View >
          {/* End Begain First Section */}

          {/* Start Begain Mother's baby Section */}
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ color: '#76005f', fontSize: 24 }}>أطفالى</Text>
          <FlatList
            data={babysData}
            renderItem={({ item }) => <BabyComponent item={item} />}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* End Begain Mother's baby Section */}

        {/* Start Begain Babies's Sections */}
        <View style={{ paddingHorizontal: 5 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
              <TouchableRipple
                onPress={() => navigation.navigate('toDO')}
                rippleColor="rgba(0, 0, 0, .32)"
              >
                <Image source={require('../assets/homeimages/todo.png')}
                  style={{ width: 160, height: 160, borderRadius: 20, position: 'relative', margin: 5 }} />
              </TouchableRipple>
              <Text style={{ position: 'absolute', color: 'white', fontSize: 24 }}> التحذيرات</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableRipple
                onPress={() => navigation.navigate('toDO')}
                rippleColor="rgba(0, 0, 0, .32)"
              >
                <Image source={require('../assets/homeimages/blogs.png')}
                  style={{ width: 160, height: 160, borderRadius: 20, position: 'relative', margin: 5 }} />
              </TouchableRipple>
              <Text style={{ position: 'absolute', color: 'white', fontSize: 24 }}> جدول المهام</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableRipple
                onPress={() => navigation.navigate('Vaccinations')}
                rippleColor="rgba(0, 0, 0, .32)"
              >
                <Image source={require('../assets/homeimages/vaccine.png')}
                  style={{ width: 160, height: 160, borderRadius: 20, position: 'relative', margin: 5 }} />
              </TouchableRipple>
              <Text style={{ position: 'absolute', color: 'white', fontSize: 24 }}>التطعيمات</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableRipple
                onPress={() => console.log('Pressed')}

                rippleColor="rgba(0, 0, 0, .32)"
              >
                <Image source={require('../assets/homeimages/food.png')}
                  style={{ width: 160, height: 160, borderRadius: 20, position: 'relative', margin: 5 }} />
              </TouchableRipple>
              <Text style={{ position: 'absolute', color: 'white', fontSize: 24 }}> التغذية </Text>
            </View>
          </View>
        </View>
        {/* End Begain Babies's Sections */}

        <View style={{ marginBottom: 20 }}>
          <PaperButton
            mode="contained"
            onPress={() => setShowVaccinations(!showVaccinations)}
            labelStyle={{ fontFamily: 'Droid' }}
            style={{ marginTop: 5, alignSelf: 'center', width: 150, borderRadius: 7, }}
          >
            {showVaccinations ? 'إخفاء التطعيمات' : 'عرض التطعيمات'}
          </PaperButton>
          {showVaccinations && (
            <DataTable style={{ backgroundColor: '#F5F5F5' }}>
              <DataTable.Header>
                <DataTable.Title style={{ textAlign: 'right', fontFamily: 'Droid', color: 'black' }}>
                  الاسم
                </DataTable.Title>
                <DataTable.Title style={{ textAlign: 'right', fontFamily: 'Droid', color: 'black' }}>
                  التاريخ
                </DataTable.Title>
                <DataTable.Title style={{ textAlign: 'right', fontFamily: 'Droid', color: 'black' }}>
                  العنوان
                </DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell style={{ textAlign: 'right', fontFamily: 'Droid', color: 'black' }}>
                  لقاح 1
                </DataTable.Cell>
                <DataTable.Cell style={{ textAlign: 'right', fontFamily: 'Droid', color: 'black' }}>
                  2023-06-15
                </DataTable.Cell>
                <DataTable.Cell style={{ textAlign: 'right', fontFamily: 'Droid', color: 'black' }}>
                  شارع 123
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={{ textAlign: 'right', fontFamily: 'Droid', color: 'black' }}>
                  لقاح 2
                </DataTable.Cell>
                <DataTable.Cell style={{ textAlign: 'right', fontFamily: 'Droid', color: 'black' }}>
                  2023-06-20
                </DataTable.Cell>
                <DataTable.Cell style={{ textAlign: 'right', fontFamily: 'Droid', color: 'black' }}>
                  شارع 456
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>

          )}
        </View>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  statusText: {
    borderRadius: 5,
    padding: 5,
    textAlign: 'center',
    fontFamily: 'Droid',
    fontWeight: 'bold',
  },
  completedStatus: {
    backgroundColor: 'green',
    color: 'white',
  },
  pendingStatus: {
    backgroundColor: 'orange',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 300
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'right',
    fontFamily: 'Droid',
    alignItems: 'center',

  },
  button: {
    width: 90,
    fontSize: 10,
    marginVertical: 5,
    alignSelf: 'center',
    borderRadius: 7,
  },

  // the changes
  userInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  userName: {
    fontSize: 18,
    fontWeight: 600,
    color: '#76005f',
  },
  userEmail: {
    fontSize: 13,
    color: "grey",
  },
  type: {
    fontWeight: 600,
    color: '#ca9ccd'
  }
});

export default ProfileScreen;







