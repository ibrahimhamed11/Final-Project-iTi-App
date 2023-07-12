import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, Modal, StyleSheet, Alert, ScrollView, Dimensions, TouchableOpacity, Button, RefreshControl } from 'react-native';
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
import axios from 'axios';
//ip 
import ip from '../ipConfig';
// date picker
import DatePicker from 'react-native-datepicker';

const ProfileScreen = () => {
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Droid: require('../assets/fonts/Droid.ttf'),
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [babyModal, setBabyModal] = useState(false);
  const [babies, setBabies] = useState([]);
  const [name, setBabyName] = useState('');
  const [birthDate, setBabyAge] = useState(new Date());
  const [motherData, setMotherData] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  let motherId;

  const getUserId = async () => {
    try {
      const motherId = await AsyncStorage.getItem('userId');
      return motherId;
    } catch (error) {
      console.log('Error retrieving ID:', error);
      return null;
    }
  };
  const handleRefresh = () => {
    setRefreshing(true);

    // Perform the refresh action here
    // This could be an API call or any other asynchronous operation

    // After the refresh action is completed, set refreshing to false
    setRefreshing(false);
  };
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
            try {
              await AsyncStorage.clear();
              console.log('localstorage cleared');
            } catch (error) {
              console.log('failed to clear local storage', error);
            }
            navigation.navigate('LoginScreen');
          },
        },
      ],
      {
        style: 'default',
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
      }
    );
  };

  useEffect(() => {
    motherId = getUserId();

    fetchMotherDetails()
      .then((data) => {
        setMotherData(data);
      })
      .catch((error) => {
        console.error('Error fetching mother details:', error);
      });
  }, []);

  const fetchMotherDetails = async () => {
    try {
      const userId = await getUserId();
      const response = await fetch(`${ip}/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const motherData = data.data;
        console.log(motherData.image);
        return motherData;
      } else {
        throw new Error('Failed to fetch mother details');
      }
    } catch (error) {
      throw new Error('Error fetching mother details: ' + error.message);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCancel = () => {
    setBabyModal(false);
    setBabyName('');
    setBabyAge('');
  };

  const handleAddBaby = async () => {
    try {
      const userId = await getUserId();
      const response = await axios.patch(`${ip}/user/${userId}`, { birthDate, name });
      // Reset form and state
      setBabyAge(new Date());
      setBabyName('');
      fetchBabies();
    } catch (error) {
      console.error('Error adding baby:', error);
    }
  };

  useEffect(() => {
    fetchBabies();
  }, []);

  const fetchBabies = async () => {
    try {
      const userId = await getUserId();
      const response = await axios.get(`${ip}/user/${userId}`);
      console.log(response.data.data.profile.babyInfo, "dataaaaaaaaaaaaaaaaaaaaa");
      setBabies(response.data.data.profile.babyInfo);
    } catch (error) {
      console.error('Error fetching babies:', error);
    }
  };

  const profilePhoto = require('../assets/homeimages/james-wheeler-RRZM3cwS1DU-unsplash.jpg');

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 80 }}>
          <View style={{ marginBottom: 20, alignItems: 'center' }}>
            <View>
              <Image
                source={require('../assets/homeimages/6478906.jpg')}
                style={{ width: Dimensions.get('screen').width, height: 160, position: 'relative', backgroundColor: 'grgreyeen' }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', position: 'absolute', bottom: -50 }}>
              {motherData.image ? (
                <Image
                  source={{
                    uri: `${ip}/${motherData.image}`,
                  }}
                  style={{ width: 100, height: 100, borderRadius: 50, marginHorizontal: 20, borderColor: 'white', borderWidth: 4, marginLeft: 70 }}
                />
              ) : (
                <Image
                  source={profilePhoto}
                  style={{ width: 100, height: 100, borderRadius: 50, marginHorizontal: 20, borderColor: 'white', borderWidth: 4, marginLeft: 70 }}
                />
              )}
              <IconButton icon="logout" onPress={handleLogout} style={{ color: '#7600gf', backgroundColor: 'white' }} />
            </View>
          </View>
          <View style={{ position: 'absolute', top: 20, right: 20 }}></View>
          <View style={styles.userInfo}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon name="user" size={14} style={{ marginRight: 5 }} />
              <Text style={styles.userName}>{motherData.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon name="envelope" size={14} style={{ marginRight: 5 }} />
              <Text style={styles.userEmail}>{motherData.email}</Text>
            </View>
            <View style={{ marginTop: 10, alignSelf: 'center' }}>
              <PaperButton
                mode="contained"
                onPress={toggleModal}
                labelStyle={{ fontFamily: 'Droid', fontSize: 12, color: '#76005f', padding: 0, margin: 0 }}
                style={{
                  width: 150,
                  borderRadius: 7,
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: '#76005f',
                }}
                icon={({ color }) => <Icon name="person" size={12} color="#76005f" />}
              >
                معلوماتي
              </PaperButton>
            </View>
          </View>
          <View>
            <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={toggleModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Name: {motherData.name}</Text>
                  <Text style={styles.modalTitle}>Email: {motherData.email}</Text>
                  <Text style={styles.modalTitle}>Phone: {motherData.phone}</Text>
                  {/* Add more profile details here */}
                  <Button title="اغلاق" onPress={toggleModal} />
                </View>
              </View>
            </Modal>
          </View>
          <View style={{ marginVertical: 0 }}>
            <Text style={{ color: '#76005f', fontSize: 24, textAlign: 'right', fontFamily: 'Droid' }}>أطفالى</Text>
            <View style={{ marginBottom: 25, flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setBabyModal(true)}>
                <View style={styles.floating_Button}>
                  <FontAwesomeIcon name="plus" size={26} color={'#fff'} />
                </View>
              </TouchableOpacity>
              <FlatList
                data={babies}
                renderItem={({ item }) => <BabyComponent item={item} />}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          <View style={{ paddingHorizontal: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <TouchableRipple onPress={() => navigation.navigate('toDO')} rippleColor="rgba(0, 0, 0, .32)">
                  <Image source={require('../assets/homeimages/todo.png')} style={{ width: 160, height: 160, borderRadius: 20, position: 'relative', margin: 5 }} />
                </TouchableRipple>
                <Text style={{ position: 'absolute', color: 'white', fontSize: 24, fontFamily: 'Droid' }}> التحذيرات</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableRipple onPress={() => navigation.navigate('toDO')} rippleColor="rgba(0, 0, 0, .32)">
                  <Image source={require('../assets/homeimages/blogs.png')} style={{ width: 160, height: 160, borderRadius: 20, position: 'relative', margin: 5 }} />
                </TouchableRipple>
                <Text style={{ position: 'absolute', color: 'white', fontSize: 24, fontFamily: 'Droid' }}> جدول المهام</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableRipple onPress={() => navigation.navigate('Vaccinations', { motherData })} rippleColor="rgba(0, 0, 0, .32)">
                  <Image source={require('../assets/homeimages/vaccine.png')} style={{ width: 160, height: 160, borderRadius: 20, position: 'relative', margin: 5 }} />
                </TouchableRipple>
                <Text style={{ position: 'absolute', color: 'white', fontSize: 24, fontFamily: 'Droid' }}>التطعيمات</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="rgba(0, 0, 0, .32)">
                  <Image source={require('../assets/homeimages/food.png')} style={{ width: 160, height: 160, borderRadius: 20, position: 'relative', margin: 5 }} />
                </TouchableRipple>
                <Text style={{ position: 'absolute', color: 'white', fontSize: 24, fontFamily: 'Droid' }}> التغذية </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={babyModal} animationType="slide" transparent={true} onRequestClose={() => setBabyModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="اسم الطفل"
                value={name}
                onChangeText={setBabyName}
                style={styles.input}
                placeholderTextColor={'#000000'}
              />
            </View>
            <DatePicker
              style={{ width: 180 }}
              date={birthDate}
              mode='date'
              placeholder="Select date"
              format="YYYY-MM-DD"
              minDate="1900-01-01" // optional
              maxDate="2100-12-31" // optional
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              useNativeDriver={true}

              onDateChange={(date) => setBabyAge(date)}
              customStyles={{
                dateInput: { borderRadius: 10, borderColor: '#76005f', height: 30 },
                dateIcon: { width: 30, height: 30 },
                datePicker: { backgroundColor: '#000000', },
              }}
            />

            {/* <View style={styles.imageContainer}>
                            {selectedImage ? (
                                <Image source={{ uri: selectedImage }} style={styles.image} />
                            ) : (
                                <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
                                    <Text style={styles.uploadButtonText}>رفع صورة</Text>
                                </TouchableOpacity>
                            )}
                        </View> */}

            <View style={styles.modalButtons}>
              <Button
                title='save'
                mode="contained"
                style={styles.addButton}
                onPress={handleAddBaby}
                icon={({ color, size }) => <FontAwesomeIcon name="save" size={size} color={color} />}
              >

              </Button>

              <Button
                title='الغاء'
                // mode="outlined"
                style={styles.deleteButton}
                onPress={handleCancel}
                icon={({ color, size }) => <FontAwesomeIcon name="times" size={size} color={'white'} />}
              >
              </Button>
            </View>
          </View>

        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#76005f',
  },
  userEmail: {
    fontSize: 13,
    color: 'grey',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'left',
  },
  floating_Button: {
    position: 'relative',
    top: 25,
    left: -10,
    borderRadius: 100,
    backgroundColor: '#76005ee5',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#76005f',
    height: 30,
    width: 150,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#000000',
  },
});

export default ProfileScreen;
