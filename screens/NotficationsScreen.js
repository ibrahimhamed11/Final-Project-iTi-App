import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Provider as PaperProvider, Card, Title, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import io from 'socket.io-client';
import moment from 'moment';
import 'moment/locale/ar';
import * as Font from 'expo-font';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, reset } from '../Redux/Slices/Notify';


import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';



// Socket.IO server URL
const API_URL = 'http://10.171.240.100:4000';
const NodeUrl = 'http://10.171.240.100:4000/notification/getAll'




// Function to load custom fonts
const loadFonts = async () => {
  await Font.loadAsync({
    'Droid': require('../assets/fonts/Droid.ttf'),
  });
};





const Notification = ({ message, createdAt, deletionTime, onDelete }) => {


  //Push Notfications In Header 
  useEffect(() => {
    // Request permissions
    const registerForPushNotificationsAsync = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        // Handle permission denied
      }
    };

    // Configure notification handling
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,

      }),
    });

    // Listen for incoming notifications
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      // Handle received notification
      console.log(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      // Handle user interaction with the notification
      console.log(response);
    });

    registerForPushNotificationsAsync();

    return () => {
      // Clean up listeners
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  //----------------------------------------------------------------------------------------------------------------------------





  // Format the dates
  const formattedCreatedAt = moment(createdAt).format('HH:mm - D MMMM YYYY');
  const formattedDeletionTime = moment(deletionTime).format('HH:mm - D MMMM YYYY');

  return (
    <Card style={styles.notificationContainer}>
      <View style={styles.iconContainer}>
        <Icon name="bell" size={35} color="#333" />
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Icon name="trash" size={20} color="#fff" />
      </TouchableOpacity>
      <Card.Content>
        <View style={styles.textContainer}>
          <Title style={styles.notificationText}>{message}</Title>
          <Text style={styles.notificationDate}>تم الانشاء في: {formattedCreatedAt}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const Notfications = () => {

  //redux
  const dispatch = useDispatch();
  const { notification } = useSelector(state => state.Notify);


  const [notifications, setNotifications] = useState([]);
  const [vaccinationData, setVaccinationData] = useState([]);
  const [showVaccinationData, setShowVaccinationData] = useState(false); // State to track whether vaccination data should be displayed
  const [loading, setLoading] = useState(true); // Loading state for vaccination data

  useEffect(() => {
    const socket = io(API_URL);
    console.log(notification)
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('newNotification', (notification) => {
      console.log('New notification received:', notification);

      // Check if the notification is from the backend
      if (notification.source === 'backend') {

        //add in redux
        dispatch(increment());


        Notifications.scheduleNotificationAsync({
          content: {
            title: 'test notfication',
            body: notification.message,
          },
          trigger: null, // Send immediately
        });


        setNotifications((prevNotifications) => [notification, ...prevNotifications]);

        // Remove the notification after the specified deletion time
        const deletionTime = notification.deletionTime;
        console.log(deletionTime);
        setTimeout(() => {
          setNotifications((prevNotifications) =>
            prevNotifications.filter((item) => item._id !== notification._id)
          );
          dispatch(decrement());
        }, deletionTime);
      }
    });

    return () => {

      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    //fetch notfication table data from node 
    const fetchVaccinationData = async () => {
      try {
        const response = await axios.get(NodeUrl);
        setVaccinationData(response.data);
        setLoading(false); // Data fetched successfully, set loading to false
      } catch (error) {
        console.error('Error fetching vaccination data:', error);
        setLoading(false); // Error occurred, set loading to false
      }
    };

    fetchVaccinationData();
  }, []);



  //Notfications Operations 
  const clearAllNotifications = () => {
    setNotifications([]);
    dispatch(reset());
  };

  const deleteNotification = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((item) => item._id !== notificationId)
    );

    dispatch(decrement());

  };




  const toggleVaccinationData = () => {
    setShowVaccinationData((prevState) => !prevState); // Toggle the state
  };

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.header}></Text>
        <ScrollView style={styles.notificationContainer}>
          {notifications.map((item) => (
            <Notification
              key={item._id}
              message={item.message}
              createdAt={item.createdAt}
              deletionTime={item.deletionTime}
              onDelete={() => deleteNotification(item._id)}
            />
          ))}
        </ScrollView>
        {notifications.length > 0 && (
          <TouchableOpacity onPress={clearAllNotifications} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={toggleVaccinationData} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>
            {showVaccinationData ? 'اخفاء كل الاشعارات' : 'اظهار كل الاشعارات'}
          </Text>
        </TouchableOpacity>
        {showVaccinationData && (
          <ScrollView style={styles.vaccinationContainer}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              vaccinationData.map((item) => (
                <View key={item.id} style={styles.vaccinationItem}>
                  <Text style={styles.vaccinationText}>{item.name}</Text>
                  <Text style={styles.vaccinationText}>Date: {item.date}</Text>
                  <Text style={styles.vaccinationText}>{item.message}</Text>
                </View>
              ))
            )}
          </ScrollView>
        )}

      </View>
    </PaperProvider>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F160D9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Droid', // Apply the custom font
  },
  notificationContainer: {
    marginTop: 10,
  },
  notificationItem: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    fontFamily: 'Droid', // Apply the custom font
  },
  notificationDate: {
    fontSize: 13,
    color: '#333',
    textAlign: 'left',
    marginTop: 5,
    fontFamily: 'Droid', // Apply the custom font
  },
  clearButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    marginLeft: 10, // Add a margin on the right side
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
    alignSelf: 'flex-end',
  },
  toggleButton: {
    marginTop: 10,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    fontFamily: 'Droid', // Apply the custom font
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Droid', // Apply the custom font
  },
  vaccinationContainer: {
    marginTop: 50,
  },
  vaccinationItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  vaccinationText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    fontFamily: 'Droid', // Apply the custom font
  },

});

export default Notfications;
