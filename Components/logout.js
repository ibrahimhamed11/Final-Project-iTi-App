import React from 'react';
import { Alert, AsyncStorage } from 'react-native';

const LogoutComponent = ({ navigation }) => {
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
              console.log('localstorage cleared');
            } catch (error) {
              console.log('failed to clear local storage', error);
            }

            // Redirect to the login screen
            navigation.navigate('LoginScreen'); // Replace 'LoginScreen' with the actual name of your login screen route
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

  return (
    <FontAwesomeIcon
      name="sign-out-alt"
      size={size}
      color="pink"
      onPress={handleLogout}
    />
  );
};

