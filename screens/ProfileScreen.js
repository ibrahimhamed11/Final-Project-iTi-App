import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, Modal, StyleSheet, Alert, ScrollView, Dimensions, TouchableOpacity, Button } from 'react-native';
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
  const [image, setImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [babyModal, setBabyModal] = useState(false);
  const [babies, setBabies] = useState([]);
  const [babyName, setBabyName] = useState('');
  const [babyAge, setBabyAge] = useState(0);
  const [motherData, setMotherData] = useState({
    name: '',
    email: '',
    age: 0,
    phone: '',
    image: '',
    profile: { babyInfo: [] }
  });


  // Function to retrieve the ID from AsyncStorage
  const getUserId = async () => {
    try {
      const motherId = await AsyncStorage.getItem('userId');
      return motherId;
    } catch (error) {
      console.log('Error retrieving ID:', error);
      return null;
    }
  };
  // logout
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


  //Back End Connection
  useEffect(() => {
    fetchMotherDetails()
      .then((data) => {
        setMotherData(data);
        console.log(data.profile)
      })
      .catch((error) => {
        console.error('Error fetching seller details:', error);
      });
  }, []);

  // get mother details
  const fetchMotherDetails = async () => {
    try {

      const userId = await getUserId();
      const response = await fetch(`${ip}/user/${userId}`);
      if (response.ok) {

        const data = await response.json();
        console.log(data)

        const motherData = data.data
        console.log(motherData.image);

        return motherData;

      } else {
        throw new Error('Failed to fetch seller details');
      }
    } catch (error) {
      throw new Error('Error fetching seller details: ' + error.message);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // const handleImageUpload = async () => {
  //   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (permissionResult.granted === false) {
  //       alert('Permission to access camera roll is required!');
  //       return;
  //   }

  //   const imageResult = await ImagePicker.launchImageLibraryAsync();
  //   if (!imageResult.canceled) {
  //       setSelectedImage(imageResult.uri);
  //   }
  // };
  const handleCancel = () => {
    setBabyModal(false);
    // Reset form and state
    setBabyName('');
    setBabyAge('');
    // setSelectedImage(null);
  };
  const handleAddBaby = async () => {
    try {
      const updatedData={
        motherData
  
    }
      // formData.append('image', {
      //     uri: selectedImage,
      //     type: 'image/jpeg',
      //     name: 'product.jpg',
      // });
      const userId = await getUserId();
     
      const response = await axios.put(`${ip}/user/${userId}`,{updatedData});
      // Reset form and state

      setBabyAge('');
      setBabyName('');
      // setSelectedImage(null);

      fetchBabies(); // Fetch updated list of products after adding
    } catch (error) {
      console.error('Error adding baby:', error);
    }
  };


  //Get All
  useEffect(() => {
    fetchBabies();
  }, []);

  const fetchBabies = async () => {
    try {
      const userId = await getUserId();

      const response = await axios.get(`${ip}/user/${userId}`);
      setBabies(response.data.data.profile.babyInfo);
      console.log(response.data.data.profile.babyInfo, "dataaaaaaaaaaaaaaaaaaaaaaaaa");
    } catch (error) {
      console.error('Error fetching babies:', error);
    }
  };


  const profilePhoto = require('../assets/homeimages/james-wheeler-RRZM3cwS1DU-unsplash.jpg');

  if (!fontLoaded) {
    return null;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* Start Begain First Section */}
      <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 80 }}>
        <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <View>
            <Image
              source={require('../assets/homeimages/6478906.jpg')}
              style={{ width: Dimensions.get('screen').width, height: 160, position: 'relative', backgroundColor: 'grgreyeen' }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', position: 'absolute', bottom: -50 }}>
            {/* <IconButton icon="logout" onPress={handleLogout} style={{ color: '#7600gf', backgroundColor: 'white' ,visibility:'hidden'}} /> */}


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
              />)}

            <IconButton icon="logout" onPress={handleLogout} style={{ color: '#7600gf', backgroundColor: 'white' }} />
          </View>
        </View>
        <View style={{ position: 'absolute', top: 20, right: 20 }}>

        </View>
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
        <View >
          {/* End Begain First Section */}
          {/* profile card modals */}
          {/* <Modal visible={isModalVisible} onDismiss={toggleModal} contentContainerStyle={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Name: {motherData.name}</Text>
                        <Text style={styles.modalText}>Email: {motherData.email}</Text>
                        <Text style={styles.modalText}>Age: {motherData.age}</Text>
                        <Text style={styles.modalText}>Phone: {motherData.phone}</Text>
                        <Text style={styles.modalText}>Phone: {motherData.profile.babyinfo}</Text>
                    </View>
                </Modal>
          Start Begain Mother's baby Section */}
        </View>
        <View style={{ marginVertical: 0 }}>
          <Text style={{ color: '#76005f', fontSize: 24 }}>أطفالى</Text>
          <View style={{ marginBottom: 25, flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => setBabyModal(true)}>
              <View style={styles.floating_Button}>
                <FontAwesomeIcon name="plus" size={26} color={'#fff'} />
              </View>
            </TouchableOpacity>
            <FlatList

              data={babysData}
              renderItem={({ item }) => <BabyComponent item={item} />}
              pagingEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
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

        {/* <View style={{ marginBottom: 20 }}>
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
        </View> */}
      </View>
      <Modal visible={babyModal} onRequestClose={() => setBabyModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="اسم الطفل"
              value={babyName}
              onChangeText={setBabyName}
              style={styles.input}
            />
            <TextInput
              placeholder="عمر الطفل (بالشهور)"
              value={babyAge}
              onChangeText={setBabyAge}
              keyboardType="numeric"
              style={styles.input}
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
    width: 300,
    height: 100,

  },
  modalContent: {
    backgroundColor: '#ffffff4a',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 300
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
    elevation: 5
  },
});

export default ProfileScreen;







