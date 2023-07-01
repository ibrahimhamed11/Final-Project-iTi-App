import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { Searchbar, List, IconButton, Title } from 'react-native-paper';
import { FontAwesome } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ip from '../ipConfig';
import axios from 'axios';
import RateProductScreen from './AddRateScreen';

const MyOrdersScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([]);
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
    const [selectedProductId, setSelectedProductId] = useState(null); // State to store selected product ID
    const [selectedOrderId, setSelectedOrderId] = useState(null); // State to store selected order ID

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                // Get user ID from AsyncStorage or any other storage mechanism
                const userId = await AsyncStorage.getItem('userId');

                // Make API request to fetch user orders based on the user ID
                const response = await fetch(`${ip}/orders/user/64930dc141ad98cd4739b12c`);
                const data = await response.json();
                console.log(data);

                setOrders(data);
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };

        fetchUserOrders();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        // Perform search logic/filtering here based on your requirements
        // Update the filtered orders list accordingly
    };

    const handleRating = async (productId, orderId) => {
        setSelectedProductId(productId);
        setSelectedOrderId(orderId);
        console.log(productId);
        console.log(orderId);

        try {
            // Make API request to update the product's checkRate field to true
            await axios.patch(`${ip}/orders/${orderId}/checkRate`, { checkRate: true });

            // Refresh the order list to reflect the updated checkRate value
            const response = await fetch(`${ip}/orders/user/64930dc141ad98cd4739b12c`);
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error updating checkRate:', error);
        }

        setModalVisible(true); // Show the modal
    };

    const closeModal = () => {
        setModalVisible(false); // Hide the modal
    };

    const renderOrderItem = ({ item }) => (
        <List.Item
            title={item.productName}
            description={`Status: ${item.delStatus}\nDate: ${item.date}`}
            right={(props) => (
                <>
                    {item.checkRate === false && ( // Show the Add Rate icon if checkRate is false
                        <IconButton
                            icon={({ size, color }) => (
                                <FontAwesome name="star-o" size={size} color={color} />
                            )}
                            onPress={() => handleRating(item.productId, item._id)} // Pass both the product ID and order ID
                        />
                    )}
                    {item.checkRate === true && ( // Show the Rate is Done text if checkRate is true
                        <Text>Rate is Done</Text>
                    )}
                </>
            )}
            left={(props) => (
                <FontAwesome
                    name={item.delStatus === 'delivered' ? 'check-circle' : 'circle-o'}
                    size={24}
                    color={item.delStatus === 'delivered' ? 'green' : 'gray'}
                    style={styles.orderStatusIcon}
                />
            )}
        />
    );

    return (
        <View style={styles.container}>
            <Title style={styles.heading}>طلباتي</Title>

            <Searchbar
                placeholder="ابحث عن الطلبات"
                value={searchQuery}
                onChangeText={handleSearch}
                style={styles.searchBar}
            />

            <FlatList
                data={orders}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContainer}
            />

            <Modal visible={modalVisible} onRequestClose={closeModal} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                        {selectedProductId && selectedOrderId && (
                            <RateProductScreen
                                productId={selectedProductId}
                                orderId={selectedOrderId}
                                closeModal={closeModal}
                            />
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    heading: {
        fontFamily: 'Droid',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
    searchBar: {
        marginVertical: 10,
        fontFamily: 'Droid ',
        textAlign: 'right',
    },
    listContainer: {
        paddingBottom: 20,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        marginHorizontal: 2,
    },
    orderStatusIcon: {
        marginRight: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 16,
    },
});

export default MyOrdersScreen;
