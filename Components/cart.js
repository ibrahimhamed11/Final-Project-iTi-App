import React, { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Modal,
  TextInput,
  Keyboard,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
} from '../Redux/Slices/ProductSlice';
import ip from '../ipConfig';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const Cart = () => {

  const { cart } = useSelector((state) => state.ProductSlice);
  const dispatch = useDispatch();

  const [userId, setUserId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [orderData, setOrderData] = useState({
    userId: '',
    phoneNumber: '',
    shippingAddress: {
      street: '',
      city: '',
      zipCode: '',
      country: '',
    },
    delStatus: 'pending',
    date: new Date().toISOString(),
    checkRate: false,
    products: [],
  });
  const navigation = useNavigation();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleDecrementQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const handleIncrementQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const renderCartItem = ({ item }) => (
    <View key={item._id} style={styles.cartItem}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: `${ip}/${item?.image}` }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price} ر.س</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleDecrementQuantity(item)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleIncrementQuantity(item)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveFromCart(item)}
        >
          <Text style={styles.removeButtonText}>إزالة</Text>
        </TouchableOpacity>
      </View>
    </View>
  );





  useEffect(() => {
    // Fetch user ID from AsyncStorage
    AsyncStorage.getItem('userId')
      .then((value) => {
        if (value) {
          setUserId(value);
        }
      })
      .catch((error) => console.error('Error retrieving user ID:', error));
  }, []);

  const handleCompletePayment = () => {
    setModalVisible(true);
  };

  const handleConfirmOrder = () => {
    // Update order data with user ID and product details
    const updatedOrderData = {
      ...orderData,
      userId: userId,
      products: cart.map((item) => ({
        productId: item._id,
        qty: item.quantity,

      })),
    };
    console.log(updatedOrderData)
    // Send order data to the backend API
    axios
      .post(`${ip}/orders/addOrder`, updatedOrderData)
      .then((response) => {
        console.log('Order created:', response.data);
        setModalVisible(false);
        navigation.navigate('CheckoutScreen');

        // Perform any additional actions, such as showing a success message or navigating to a different screen
      })
      .catch((error) => {
        console.error('Error creating order:', error);
        // Handle error case
      });
  };

  return (
    <View style={styles.container}>


      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, { fontFamily: 'Droid' }]}>ادخل تفاصيل الشحن</Text>

            <Text style={styles.modalText}>رقم الهاتف:</Text>
            <TextInput
              style={styles.modalInput}
              // placeholder="رقم الهاتف"
              value={orderData.phoneNumber}
              onChangeText={(text) =>
                setOrderData({ ...orderData, phoneNumber: text })
              }
            />

            <Text style={styles.modalText}>الشارع:</Text>
            <TextInput
              style={styles.modalInput}
              // placeholder="الشارع"
              value={orderData.shippingAddress.street}
              onChangeText={(text) =>
                setOrderData({
                  ...orderData,
                  shippingAddress: { ...orderData.shippingAddress, street: text },
                })
              }
            />

            <Text style={styles.modalText}>المدينة:</Text>
            <TextInput
              style={styles.modalInput}
              // placeholder="المدينة"
              value={orderData.shippingAddress.city}
              onChangeText={(text) =>
                setOrderData({
                  ...orderData,
                  shippingAddress: { ...orderData.shippingAddress, city: text },
                })
              }
            />

            <Text style={styles.modalText}>الرمز البريدي:</Text>
            <TextInput
              style={styles.modalInput}
              // placeholder="الرمز البريدي"
              value={orderData.shippingAddress.zipCode}
              onChangeText={(text) =>
                setOrderData({
                  ...orderData,
                  shippingAddress: { ...orderData.shippingAddress, zipCode: text },
                })
              }
            />

            <Text style={styles.modalText}>البلد:</Text>
            <TextInput
              style={styles.modalInput}
              // placeholder="البلد"
              value={orderData.shippingAddress.country}
              onChangeText={(text) =>
                setOrderData({
                  ...orderData,
                  shippingAddress: { ...orderData.shippingAddress, country: text },
                })
              }
            />

            <TouchableOpacity style={styles.modalButton} onPress={handleConfirmOrder}>
              {/* <FontAwesome name="check" style={styles.buttonIcon} /> */}
              <Text style={[styles.modalButtonText, { fontFamily: 'Droid' }]}>تم</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              {/* <FontAwesome name="times" style={styles.buttonIcon} /> */}
              <Text style={[styles.closeButtonText, { fontFamily: 'Droid' }]}>اغلاق</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      {cart.length === 0 ? (
        <>
          <Text style={styles.title}>أضيفي منتجات للسلة</Text>
          <Image
            source={require('../assets/images/add_Cart.png')}
            style={{
              width: Dimensions.get('window').width * 1.2,
              height: Dimensions.get('window').height * 0.85,
            }}
          />
        </>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={styles.cartList}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>
              السعر الإجمالي: {calculateTotalPrice()} ر.س
            </Text>
          </View>
          <TouchableOpacity
            style={styles.completePaymentButton}
            onPress={handleCompletePayment}
          >
            <Text style={styles.completePaymentButtonText}>استكمال الدفع</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: '#ffffff',
  },
  title: {
    position: 'absolute',
    fontFamily: 'Droid',
    top: 20,
    right: 20,
    zIndex: 999,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
    color: '#540343',
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 20,
    width: 100,
    height: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  totalPriceContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Droid'
  },
  completePaymentButton: {
    backgroundColor: '#76005f',
    paddingHorizontal: 0,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 60,
    marginHorizontal: 60,
    alignItems: 'center',
    width: 200,
  },
  completePaymentButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Droid',
    fontSize: 16,
    paddingHorizontal: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#76005f',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },


  modalText: {

    fontWeight: 'bold',

    fontFamily: 'Droid'
  }
});


export default Cart;
