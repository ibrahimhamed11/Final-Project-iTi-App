import { useState } from 'react';

import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/Slices/ProductSlice';
import { Rating } from 'react-native-ratings';
import Swiper from 'react-native-swiper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../Components/Rate';
import { Alert, Modal, Pressable } from 'react-native';

const ProductDetails = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { product } = route.params;
  const dispatch = useDispatch();
  const swiperRef = useRef(null);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setModalVisible(true)

  };

  const handleBuyNow = () => {
  };

  const handleImagePress = (index) => {
    swiperRef.current.scrollTo(index, true);
  };

  return (


    //modal----------------------------------------------------------------------------------------------------------
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>


          <View style={styles.modalView}>
            <FontAwesomeIcon name="check" size={30} style={{ marginRight: 5, color: 'green' }} />

            <Text style={[styles.modalText, { fontFamily: 'Droid' }]}>تمت الاضافة الى السلة</Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={[styles.textStyle, { fontFamily: 'Droid' }]}>إغلاق النافذة</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* modal---------------------------------------------------------------------------------------------------------- */}

      <ScrollView contentContainerStyle={styles.container}>
        <Swiper
          ref={swiperRef}
          style={styles.slider}
          showsButtons={true}
          autoplay={true}
          autoplayTimeout={5}
        >
          {product.images.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={styles.slide}
              onPress={() => handleImagePress(index)}
            >
              <Image style={styles.image} source={{ uri: image }} />
            </TouchableOpacity>
          ))}
        </Swiper>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price}</Text>


        <StarRating rating={product.rating} />

        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <FontAwesomeIcon icon={faCartPlus} style={styles.addToCartButtonIcon} />
          <Text style={[styles.addToCartButtonText, { fontFamily: 'Droid' }]}>إضافة إلى السلة</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={[styles.buyNowButtonText, { fontFamily: 'Droid' }]}>شراء الآن</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  rating: {
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButtonIcon: {
    color: 'white',
    marginRight: 5,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buyNowButton: {
    backgroundColor: '#ff9800',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
  buyNowButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },


  //modal 
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalIcon: {
    marginBottom: 20,
    color: 'green',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 10,
  },
  buttonClose: {
    backgroundColor: 'blue',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },


});

export default ProductDetails;
