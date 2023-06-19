import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import io from 'socket.io-client';

const API_URL = 'http://10.171.240.54:4000'; // Change to your Socket.IO server URL

const Notification = ({ message, createdAt }) => {
    return (
        <Card style={styles.notificationContainer}>
            <Card.Content>
                <Title style={styles.notificationText}>{message}</Title>
                <Text style={styles.notificationText}>Created At: {createdAt}</Text>
            </Card.Content>
        </Card>
    );
};

const Contactus = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = io(API_URL);

        socket.on('connect', () => {
            console.log('Socket connected');
        });

        socket.on('newNotification', (notification) => {
            console.log('New notification received:', notification);

            // Check if the notification is from the backend
            if (notification.source === 'backend') {
                setNotifications((prevNotifications) => [notification, ...prevNotifications]);

                // Remove the notification after the specified deletion time
                const currentTime = new Date().getTime();
                const deletionTime = notification.deletionTime;
                const deletionDelay = deletionTime - currentTime;

                setTimeout(() => {
                    setNotifications((prevNotifications) => prevNotifications.filter((item) => item._id !== notification._id));
                }, deletionDelay);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.header}>Notifications</Text>
                <View style={styles.notificationList}>
                    {notifications.map((item) => (
                        <Notification
                            key={item._id}
                            message={item.message}
                            createdAt={item.createdAt}
                        />
                    ))}
                </View>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    notificationList: {
        marginTop: 10,
    },
    notificationContainer: {
        marginBottom: 10,
    },
    notificationText: {
        fontSize: 16,
        color: '#333',
    },
});

export default Contactus;
