import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, decrementQuantity, incrementQuantity } from '../Redux/Slices/ProductSlice';
import ip from '../ipConfig'
const Cart = () => {
  const { cart } = useSelector((state) => state.ProductSlice);
  const dispatch = useDispatch();

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

  const handleCompletePayment = () => {
    // Handle complete payment logic
    // For example, navigate to a payment screen or trigger a payment process
    console.log('Complete Payment button pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>عربة التسوق</Text>
      {cart.length === 0 ? (
        <Text>عربة التسوق فارغة.</Text>
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
            <Text style={styles.totalPriceText}>السعر الإجمالي: {calculateTotalPrice()} ر.س</Text>
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
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
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
    backgroundColor: '#e6e6e6',
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
    alignSelf: 'center'


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
  },
  completePaymentButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  completePaymentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Cart;
