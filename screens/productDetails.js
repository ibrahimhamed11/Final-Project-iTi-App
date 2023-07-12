import { useState } from 'react';
import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/Slices/ProductSlice';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../Components/Rate';
import { Alert, Modal, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons'
import { Button, SegmentedButtons, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ip from '../ipConfig'


const ProductDetails = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = React.useState('');
  const nav = useNavigation();

  const { product, Rate } = route.params;
  console.log(route.params)
  console.log(product)
  const dispatch = useDispatch();
  const swiperRef = useRef(null);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setModalVisible(true)

  };



  return (
    // start product details
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

      <View style={styles.container}>
        <View style={styles.productsImages}>
          <FontAwesome name="heart-o" size={20} color="white" style={{ marginRight: 10, position: 'absolute', zIndex: 500, right: 10, top: 20 }} />
          {/* <TouchableRipple
          onPress={() => require('../assets/homeimages/baby_clothes.jpg')}
          rippleColor="rgba(0, 0, 0, .32)"
        > */}
          <Image source={{ uri: `${ip}/${product?.image}` }} style={styles.image} />
          {/* </TouchableRipple> */}
        </View>
        <View style={styles.productsDetails}>
          <View style={{ backgroundColor: '#d084d7', width: 60, padding: 8, borderRadius: 20, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginHorizontal: 5, fontSize: 15 }} >{Rate}</Text>
            {/* <StarRating rating={Rate} /> */}
            <Icon name='star' size={14} color={'white'} />
          </View>
          <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, marginHorizontal: 10 }}>
            <Text style={styles.productPrice}> {product?.price} جنيه </Text>
            <Text style={styles.productName}>{product?.name}</Text>
          </View>

          <View style={styles.sizes}>
            {/* <Text style={styles.productSize}>مقاس</Text> */}
            <SafeAreaView style={styles.sizesIcons}>
              <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                  {
                    value: '12',
                    label: '12',
                    checkedColor: 'white',
                  },
                  {
                    value: '13',
                    label: '13',
                    checkedColor: 'white',
                  },
                  {
                    value: '14',
                    label: '14',
                    checkedColor: 'white',
                  },
                  {
                    value: '15',
                    label: '15',
                    checkedColor: 'white',
                  },
                ]}
              />
            </SafeAreaView>
          </View>
          {/* <Divider /> */}
          <View style={styles.productDescription}>
            <Text style={styles.title}>الوصف </Text>
            <View style={styles.description}>
              <Text style={styles.descriptionText}> {product?.description}</Text>
            </View>
            {/* <Text style={styles.descriptionText}>في المخزن:{product?.stock}</Text> */}
            {/* <Text style={styles.descriptionText}>عدد التقييمات:{product?.rate.length}</Text> */}

          </View>
          <View style={styles.addProduct}>

            <Button mode="contained" style={{ backgroundColor: '#76005F' }} onPress={handleAddToCart} >
              <FontAwesome name="shopping-cart" size={20} color="#fbf9fa" style={{ marginRight: 20 }} />
              <Text style={{ fontFamily: 'Droid', color: '#fbf9fa' }}>أضف لعربة التسوق</Text>
            </Button>

          </View>
        </View>
      </View>
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
  title: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Droid',
  },
  price: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Droid'
  },
  rating: {
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    // marginTop: 10,
    textAlign: 'right',
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
    backgroundColor: '#76005F',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // start product code
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    position: 'relative',
    resizeMode: 'contain',
    top: -210
  },
  productsDetails: {
    width: Dimensions.get('screen').width,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  productName: {
    fontSize: 24,
    fontWeight: 600,
    color: '#76005F',
  },
  productPrice: {
    color: '#76005F',
    fontWeight: 500,
    fontSize: 16
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productSize: {
    fontSize: 22,
    fontWeight: 400,
    color: '#76005F',
  },
  sizesIcons: {
    width: '100%',
    // marginVertical: 10,
  },
  addProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: 20,

  },
  title: {
    fontSize: 22,
    fontWeight: 400,
    color: '#76005F',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    borderRadius: 3,
    fontFamily: 'Droid'
  },
  description: {
    marginHorizontal: 10,
    marginVertical: 10
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: 400,
    color: '#320053',
    fontFamily: 'Droid'
    // margin: 5,
  },
  productDescription: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'

  }
});

export default ProductDetails;