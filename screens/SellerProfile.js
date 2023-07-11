import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { Button, Modal, Text } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { IconButton } from 'react-native-paper';
import ip from '../ipConfig';

const SellerProfileScreen = () => {
    const [orderModalVisible, setOrderModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isOrdersVisible, setOrdersVisible] = useState(false);
    const [sellerData, setSellerDetails] = useState({
        name: '',
        email: '',
        age: 0,
        phone: '',
        image: '',
    });


    //order details
    const handleOrderDetails = (order) => {
        console.log(order)
        setSelectedOrder(order);
        setOrderModalVisible(true);
    };
    const handleCloseModal = () => {
        setSelectedOrder(null);
        setOrderModalVisible(false);
    };

    // Function to render the appropriate icon based on the order status
    const renderOrderStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return 'clock-o';
            case 'delivered':
                return 'check-circle';
            case 'canceled':
                return 'times-circle';
            case 'shipped':
                return 'truck';
            default:
                return 'question-circle';
        }
    };

    // Function to render the order status text in Arabic
    const renderOrderStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'قيد الانتظار';
            case 'delivered':
                return 'تم التوصيل';
            case 'canceled':
                return 'ملغى';
            case 'shipped':
                return 'تم الشحن';
            default:
                return 'غير معروف';
        }
    };
    //-----------------------------------------------------  

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

            const sellerId = await getUserId();
            const response = await axios.get(`${ip}/orders/seller/${sellerId}`).then((res) => {
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
        let detailsbtn;
        let orderNameTextColor;

        //status


        detailsbtn = (
            <>
                <Button
                    icon="check"
                    mode="contained"
                    onPress={() => handleOrderDetails(item)}
                    style={[styles.orderdetailsbutton, { backgroundColor: '#DC1CA5' }]}
                    labelStyle={styles.orderStatus}
                >
                    <Text style={{ fontWeight: 'bold', fontFamily: 'Droid', color: 'white' }}>
                        تفاصيل </Text>
                </Button>

            </>
        );
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


                <View style={styles_order.statusContainer}>
                    <FontAwesome
                        name={renderOrderStatusIcon(item.delStatus)}
                        style={styles_order.icon}
                    />
                    <Text style={styles_order.statusText}>
                        {renderOrderStatusText(item.delStatus)}
                    </Text>
                </View>
                {/* <Text style={styles.orderStatus}>{item.delStatus}</Text> */}


                <View style={styles.orderStatusContainer}>
                    {detailsbtn}

                </View>
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
                            <FontAwesome name="user-circle" size={20} color="#7618006d" style={styles.icon} />
                            <Text style={styles.buttonText}>معلومات حسابك</Text>
                        </TouchableOpacity>
                    </View>
                </View>



                <View style={styles.statsContainer}>
                    <View style={styles.statsItem}>
                        <FontAwesome name="shopping-bag" size={30} color="#7618006d" />
                        <Text style={styles.statsLabel}> طلبات معلقه</Text>
                        <Text style={styles.statsNumber}>
                            {orders.filter((order) => order.delStatus === 'pending').length}
                        </Text>
                    </View>
                    <View style={styles.statsItem}>
                        <FontAwesome name="shopping-cart" size={30} color="#7618006d" />
                        <Text style={styles.statsLabel}>اجمالي الطلبات</Text>
                        <Text style={styles.statsNumber}>{orders.length}</Text>
                    </View>
                    <View style={styles.statsItem}>
                        <FontAwesome name="check-circle" size={30} color="#7618006d" />
                        <Text style={styles.statsLabel}> طلبات مكتمله</Text>
                        <Text style={styles.statsNumber}>
                            {orders.filter((order) => order.delStatus === 'delivered').length}
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
                        <View style={styles.orderItem}>
                            <Text style={styles.orderHeader}>حالة الطلب</Text>
                            <Text style={styles.orderHeader}>تفاصيل</Text>
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

                {/* order */}

                <Modal visible={orderModalVisible} animationType="slide" transparent>
                    <View style={styles.modalContainer}>
                        <Text style={styles_order.modalTitle}>تفاصيل الطلب</Text>
                        {selectedOrder && (
                            <View>
                                <Text style={styles_order.text}>المنتج: {selectedOrder.productName}</Text>
                                <Text style={styles_order.text}>اسم العميل: {selectedOrder.user.name}</Text>
                                <Text style={styles_order.text}>بريد العميل: {selectedOrder.user.email}</Text>
                                <Text style={styles_order.text}>رقم موبايل العميل: {selectedOrder.phoneNumber}</Text>
                                {selectedOrder.shippingAddress && (
                                    <View>
                                        <Text style={styles_order.text}>عنوان التوصيل:</Text>
                                        <Text style={styles_order.text}>
                                            الشارع: {selectedOrder.shippingAddress.street}
                                        </Text>
                                        <Text style={styles_order.text}>
                                            المدينة: {selectedOrder.shippingAddress.city}
                                        </Text>
                                        <Text style={styles_order.text}>
                                            الرمز البريدي: {selectedOrder.shippingAddress.zipCode}
                                        </Text>
                                        <Text style={styles_order.text}>
                                            البلد: {selectedOrder.shippingAddress.country}
                                        </Text>
                                    </View>
                                )}
                                <View style={styles_order.statusContainer}>
                                    <FontAwesome
                                        name={renderOrderStatusIcon(selectedOrder.delStatus)}
                                        style={styles_order.icon}
                                    />
                                    <Text style={styles_order.statusText}>
                                        حالة الطلب: {renderOrderStatusText(selectedOrder.delStatus)}
                                    </Text>
                                </View>
                            </View>
                        )}
                        <Button
                            onPress={handleCloseModal}
                            style={[styles_order.button, { backgroundColor: 'red', width: 100 }]}
                        >
                            <Text style={{ color: 'white', fontFamily: 'Droid' }}>اغلاق</Text>
                        </Button>
                    </View>
                </Modal>


            </ScrollView>
        </View >
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
        color: '#761700',
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
        flexGrow: 1,
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
        color: '#761700',
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
        backgroundColor: '#761700',
    },
    productsButton: {
        backgroundColor: '#76180084',
    },
    orderList: {
        // flex: 1,
        width: '90%',
        justifyContent: 'center',
        // alignItems:'flex-end'
        alignSelf: 'center',
        marginBottom: 50
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        alignItems: 'flex-end',
        // justifyContent:'flex-start',
        width: '100%',
        alignSelf: 'center',
        fontFamily: 'Droid',


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

    orderdetailsbutton: {
        width: 100,
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
    orderdetails: {
        fontSize: 10,
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
const styles_order = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
        fontFamily: 'Droid',
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
        fontFamily: 'Droid',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    icon: {
        fontSize: 16,
        marginRight: 5,
        color: 'black',
    },
    statusText: {
        fontSize: 13,
        color: 'black',
        fontFamily: 'Droid',
    },
    button: {
        alignSelf: 'center'

    },
});
export default SellerProfileScreen;
