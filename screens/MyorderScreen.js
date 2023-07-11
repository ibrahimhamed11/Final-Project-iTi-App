import React, { useState, useEffect } from 'react';
import { View, FlatList, ScrollView, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { Searchbar, List, IconButton, Title, Divider } from 'react-native-paper';
import { FontAwesome } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/ar'; // Import Arabic locale for moment.js
import ip from '../ipConfig';
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
                // console.log('aaaaaaaaaaaaaaaaaaaaa', userId)
                // Make API request to fetch user orders based on the user ID
                const response = await fetch(`${ip}/orders/user/${userId}`);
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
            const userId = await AsyncStorage.getItem('userId');

            // Make API request to update the product's checkRate field to true

            // Refresh the order list to reflect the updated checkRate value
            const response = await fetch(`${ip}/orders/user/${userId}`);
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

    const renderProductItem = ({ item }) => {
        return (
            <View style={styles.productItemContainer}>
                <Text style={styles.productName}>{`اسم المنتج : ${item.productName}`}</Text>
                <View style={styles.productItem}>
                    {item.checkRate ? (
                        <Text style={styles.productRate}>تم التقييم</Text>
                    ) : (
                        <IconButton
                            icon="star-outline"
                            onPress={() => handleRating(item.productId, item._id)}
                        />
                    )}
                </View>
            </View>
        );
    };

    const renderOrderItem = ({ item }) => {
        const formattedDate = moment(item.date).locale('ar').format('MMMM Do YYYY, h:mm:ss a');
        const totalPrice = item.products.reduce((total, product) => total + product.price, 0);

        return (
            <View style={styles.orderItem}>
                <View style={styles.orderStatusContainer}>
                    <FontAwesome
                        name={item.delStatus === 'delivered' ? 'check-circle' : 'circle-o'}
                        size={24}
                        color={item.delStatus === 'delivered' ? 'green' : 'gray'}
                        style={styles.orderStatusIcon}
                    />
                    <Text style={styles.orderStatusText}>{item.delStatus}</Text>
                </View>

                <View style={styles.orderDetailsContainer}>
                    <Text style={styles.orderIdText}>{`رقم الطلب :  ${item._id}`}</Text>
                    <Text style={styles.orderDateText}>{`${formattedDate}`}</Text>
                </View>

                <FlatList
                    data={item.products}
                    renderItem={renderProductItem}
                    keyExtractor={(product) => product._id}
                    ItemSeparatorComponent={() => <Divider />}
                />

                <View style={styles.totalPriceContainer}>
                    <FontAwesome name="dollar" size={18} color="black" style={styles.priceIcon} />
                    <Text style={styles.totalPriceText}>{`اجمالي السعر :${totalPrice}`}</Text>
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
                ItemSeparatorComponent={() => <Divider />}
            />

            <Modal visible={modalVisible} onRequestClose={closeModal} transparent={true}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={closeModal} style={styles.closeButton} />
                    {selectedProductId && selectedOrderId && (
                        <RateProductScreen
                            productId={selectedProductId}
                            orderId={selectedOrderId}
                            closeModal={closeModal}
                        />
                    )}
                </View>
            </Modal>
        </ScrollView>
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
        fontFamily: 'Droid',
        textAlign: 'right',
    },
    orderItem: {
        marginBottom: 20,
    },
    orderStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    orderStatusIcon: {
        marginRight: 10,
    },
    orderStatusText: {
        fontSize: 16,
        fontFamily: 'Droid',
    },
    orderDetailsContainer: {
        marginBottom: 10,
    },
    orderIdText: {
        fontSize: 16,
        fontFamily: 'Droid',
    },
    orderDateText: {
        fontSize: 16,
        fontFamily: 'Droid',
        alignSelf: 'center'
    },
    productItemContainer: {
        marginBottom: 10,
    },
    productName: {
        marginRight: 10,
        fontSize: 16,
        textAlign: 'right',
        fontFamily: 'Droid',
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    productRate: {
        color: 'gray',
        fontSize: 16,
        textAlign: 'right',
        fontFamily: 'Droid',
    },
    totalPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'center'
    },
    priceIcon: {
        marginRight: 5,
        color: 'green'
    },
    totalPriceText: {
        fontSize: 15,
        fontFamily: 'Droid',
        color: 'green',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 16,
        fontFamily: 'Droid',
    },
});

export default MyOrdersScreen;
