import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { Card, Title, Button, Modal, Text } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Button as PaperButton } from 'react-native-paper';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { IconButton } from 'react-native-paper';


//ip 
import ip from '../ipConfig';


const SellerProfileScreen = () => {
    const [image, setImage] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isOrdersVisible, setOrdersVisible] = useState(false);
    const [sellerData, setSellerDetails] = useState({
        name: '',
        email: '',
        age: 0,
        phone: '',
        image: '',
    });

    // Function to retrieve the ID from AsyncStorage
    const getUserId = async () => {
        try {
            const sellerId = await AsyncStorage.getItem('userId');
            return sellerId;
        } catch (error) {
            console.log('Error retrieving ID:', error);
            return null;
        }
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

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleOrders = () => {
        setOrdersVisible(!isOrdersVisible);
    };

    // Orders
    const [orders, setOrders] = useState([]);
    useEffect(() => {


        fetchOrders();
    }, []);



    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`${ip}/orders/${orderId}`, { delStatus: newStatus });
            fetchOrders();
        } catch (error) {
            console.log('Error updating status:', error);
        }
    };


    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${ip}/orders/getAll`).then((res) => {
                console.log("orderrrrrr", res.data.data)
                setOrders(res.data.data)
                // printUserId();
            });
            // setOrders(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };


    //navigate
    const navigation = useNavigation();

    //Back End Connection
    useEffect(() => {
        fetchSellerDetails()
            .then((data) => {
                setSellerDetails(data);
            })
            .catch((error) => {
                console.error('Error fetching seller details:', error);
            });
    }, []);

    const fetchSellerDetails = async () => {
        try {

            const sellerId = await getUserId();
            const response = await fetch(`${ip}/user/${sellerId}`);
            if (response.ok) {

                const data = await response.json();
                console.log(data)

                const sellerData = data.data
                console.log(sellerData.image);

                return sellerData;

            } else {
                throw new Error('Failed to fetch seller details');
            }
        } catch (error) {
            throw new Error('Error fetching seller details: ' + error.message);
        }
    };
    const renderOrderItem = ({ item }) => {
        let statusButtons;
        let orderNameTextColor;

        if (item.delStatus === 'pending') {
            statusButtons = (
                <>
                    <Button
                        icon="check"
                        mode="contained"
                        onPress={() => handleStatusChange(item._id, 'delivered')}
                        style={[styles.orderStatusButton, { backgroundColor: '#4caf50' }]}
                        labelStyle={styles.orderStatus}
                    >
                        <Text style={{ fontWeight: 'bold', fontFamily: 'Droid', color: 'white' }}>تم </Text>
                    </Button>
                    <Button
                        icon="close"
                        mode="contained"
                        onPress={() => handleStatusChange(item._id, 'canceled')}
                        style={[styles.orderStatusButton, { backgroundColor: 'red' }]}
                        labelStyle={styles.orderStatus}
                    >
                        <Text style={{ fontWeight: 'bold', fontFamily: 'Droid', color: 'white' }}>ملغي</Text>
                    </Button>
                </>
            );
            orderNameTextColor = '#FFA305';
        } else if (item.delStatus === 'canceled') {
            statusButtons = (
                <>
                    <Button
                        icon="clock-outline"
                        mode="contained"
                        onPress={() => handleStatusChange(item._id, 'pending')}
                        style={[styles.orderStatusButton, { backgroundColor: '#FFA305' }]}
                        labelStyle={styles.orderStatus}
                    >
                        <Text style={{ fontWeight: 'bold', fontFamily: 'Droid', color: 'white' }}>معلق</Text>
                    </Button>
                    <Button
                        icon="check"
                        mode="contained"
                        onPress={() => handleStatusChange(item._id, 'delivered')}
                        style={[styles.orderStatusButton, { backgroundColor: '#4caf50' }]}
                        labelStyle={styles.orderStatus}
                    >
                        <Text style={{ fontWeight: 'bold', fontFamily: 'Droid', color: 'white' }}>تم</Text>
                    </Button>
                </>
            );
            orderNameTextColor = 'red';
        } else if (item.delStatus === 'delivered') {
            statusButtons = (
                <>
                    <Button
                        icon="close"
                        mode="contained"
                        onPress={() => handleStatusChange(item._id, 'canceled')}
                        style={[styles.orderStatusButton, { backgroundColor: 'red' }]}
                        labelStyle={styles.orderStatus}
                    >
                        <Text style={{ fontWeight: 'bold', fontFamily: 'Droid', color: 'white' }}>ملغي</Text>
                    </Button>
                    <Button
                        icon="clock-outline"
                        mode="contained"
                        onPress={() => handleStatusChange(item._id, 'pending')}
                        style={[styles.orderStatusButton, { backgroundColor: '#FFA305' }]}
                        labelStyle={styles.orderStatus}
                    >
                        <Text style={{ fontWeight: 'bold', fontFamily: 'Droid', color: 'white' }}>معق</Text>
                    </Button>
                </>
            );
            orderNameTextColor = '#4caf50';
        }
        return (
            <View style={styles.orderItem}>
                <Text style={[styles.orderProduct, { color: orderNameTextColor }]}>
                    {item.shippingAddress ? `${item.shippingAddress.street}, ${item.shippingAddress.city}, ${item.shippingAddress.zipCode}, ${item.shippingAddress.country}` : ''}
                </Text>
                <Text style={styles.orderQuantity}>{item.qty}</Text>
                <Text style={styles.orderQuantity}>{item.delStatus}</Text>
                <View style={styles.orderStatusContainer}>
                    {statusButtons}
                </View>
            </View>
        );
    };
    const profilePhoto = require('../assets/homeimages/james-wheeler-RRZM3cwS1DU-unsplash.jpg');

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={{ marginBottom: 20, alignItems: 'center' }}>
                    <View>
                        <Image
                            source={require('../assets/images/babies.jpg')}
                            style={{ width: Dimensions.get('screen').width, height: 160, position: 'relative', backgroundColor: 'grgreyeen' }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', position: 'absolute', bottom: -50 }}>
                        {/* <IconButton icon="logout" onPress={handleLogout} style={{ color: '#7600gf', backgroundColor: 'white' ,visibility:'hidden'}} /> */}


                        {sellerData.image ? (
                            <Image
                                source={{
                                    uri: `${ip}/${sellerData.image}`,
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
                        <Text style={styles.userName}>{sellerData.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesomeIcon name="envelope" size={14} style={{ marginRight: 5 }} />
                        <Text style={styles.userEmail}>{sellerData.email}</Text>
                    </View>
                    <View style={{ marginTop: 10, alignSelf: 'center' }}>
                        <TouchableOpacity onPress={toggleModal} style={styles.profileDetailsButton}>
                            <FontAwesome name="user-circle" size={20} color="#643f17" style={styles.icon} />
                            <Text style={styles.buttonText}>معلومات حسابك</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.statsContainer}>
                    <View style={styles.statsItem}>
                        <FontAwesome name="shopping-bag" size={30} color="#cc8e489f" />
                        <Text style={styles.statsLabel}>اجمالي منتجاتك</Text>
                        <Text style={styles.statsNumber}>{10}</Text>
                    </View>
                    <View style={styles.statsItem}>
                        <FontAwesome name="shopping-cart" size={30} color="#cc8e489f" />
                        <Text style={styles.statsLabel}>اجمالي الطلبات</Text>
                        <Text style={styles.statsNumber}>{orders.length}</Text>
                    </View>
                    <View style={styles.statsItem}>
                        <FontAwesome name="check-circle" size={30} color="#cc8e489f" />
                        <Text style={styles.statsLabel}> طلبات مكتمله</Text>
                        <Text style={styles.statsNumber}>
                            {orders.filter((order) => order.status === 'done').length}
                        </Text>
                    </View>
                </View>

                <View style={styles.buttonsContainer}>
                    <Button
                        mode="contained"
                        onPress={toggleOrders}
                        style={[styles.button, styles.ordersButton]}
                        icon={({ color, size }) => (
                            <FontAwesome name="check-circle" size={size} color={color} />
                        )}
                    >
                        <Text style={styles.orderbuttonText}>
                            {isOrdersVisible ? 'اخفاء الطلبات' : 'اظهار الطلبات'}
                        </Text>
                    </Button>

                    {/* all products  */}
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate('AllProductsScreen')}
                        style={[styles.button, styles.productsButton]}
                        icon={({ color, size }) => (
                            <FontAwesome name="shopping-basket" size={size} color={color} />
                        )}
                    >
                        <Text style={{ fontFamily: 'Droid', color: 'white' }}>
                            تفاصيل منتجاتك
                        </Text>
                    </Button>

                </View>
                {isOrdersVisible && (
                    <View style={styles.orderList}>
                        <View >
                            <Text style={styles.sectionTitle}>الطلبات</Text>
                        </View>
                        <View style={styles.orderItem}>
                            <Text style={styles.orderHeader}>عنوان التوصيل</Text>
                            <Text style={styles.orderHeader}>الكمية</Text>
                            <Text style={styles.orderHeader}>حالة التوصيل</Text>
                            <Text style={styles.orderHeader}>إجراءات</Text>
                        </View>
                        {orders.map((item) => renderOrderItem({ item }))}
                    </View>



                )}


                {/* profile card modals */}
                <Modal visible={isModalVisible} onDismiss={toggleModal} contentContainerStyle={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Name: {sellerData.name}</Text>
                        <Text style={styles.modalText}>Email: {sellerData.email}</Text>
                        <Text style={styles.modalText}>Age: {sellerData.age}</Text>
                        <Text style={styles.modalText}>Phone: {sellerData.phone}</Text>
                    </View>
                </Modal>
            </ScrollView>
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
        fontWeight: 600,
        color: '#522e059f',
    },
    userEmail: {
        fontSize: 13,
        color: "grey",
    },
    container: {
        flex: 1,
        // padding: 20,
        width: '100%'
    },
    scrollContent: {
        flexGrow: 1, // Allow content to grow vertically
        width: '100%',
        // height: '100%',
        marginBottom: 100
    },

    imageContainer: {
        // height: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,

    },
    card: {
        width: '90%',
        marginBottom: 20,
        alignSelf: 'center',
        fontFamily: 'Droid',

    },
    sellerName: {
        fontSize: 20,
    },
    sellerEmail: {
        marginTop: 5,
    },
    cardActions: {
        justifyContent: 'flex-end',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        marginTop: 40,
        marginHorizontal: 10
    },
    statsItem: {
        alignItems: 'center',
        fontFamily: 'Droid',


    },
    statsLabel: {
        marginTop: 5,
        fontSize: 14,
        color: '#513905',
        fontFamily: 'Droid',

    },
    statsNumber: {
        fontWeight: 'bold',
        // fontFamily: 'Droid',
        color: '#513905',


    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        width: 150,
        marginTop: 10,
    },
    ordersButton: {
        backgroundColor: '#cc8e48b8',
    },
    productsButton: {
        backgroundColor: '#6f2f04ab',
    },
    orderList: {
        // flex: 1,
        width: '100%',
        // justifyContent:'flex-start',
        // alignItems:'flex-end'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        alignItems: 'flex-end',
        // justifyContent:'flex-start',
        width: '100%'

    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
    },
    orderProduct: {
        flex: 2,
    },
    orderQuantity: {
        flex: 1,
    },
    orderStatusContainer: {
        // flex: 1,
        alignItems: 'flex-end',
    },
    orderStatusButton: {
        width: 80,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        height: 40,
        marginBottom: 5
    },
    orderStatus: {
        fontSize: 11,
    },
    productsContainer: {
        // flex: 1,
        width: '100%',
    },
    searchInput: {
        marginBottom: 10,
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
    },
    productImageContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#999999',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontWeight: 'bold',
    },
    productPrice: {
        marginTop: 5,
    },
    productButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignSelf: 'center'
    },
    modalContent: {
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        marginBottom: 10,
        width: '100%',
    },
    addButton: {
        width: '100%',
        marginTop: 20,
    },
    profileDetailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4f2f0af4',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
        margin: 10,
    },
    icon: {
        marginRight: 5,
    },
    buttonText: {
        fontFamily: 'Droid',
        fontSize: 12,
        color: '#000000',
        fontFamily: 'Droid'
    },
    orderbuttonText: {
        fontFamily: 'Droid',
        fontSize: 12,
        color: '#FFFFFF',
        fontFamily: 'Droid'
    },
    orderHeader: {

        fontFamily: 'Droid'

    }
});

export default SellerProfileScreen;
