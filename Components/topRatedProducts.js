import { Image, View, StyleSheet, TouchableOpacity, Dimensions, Alert, Modal, Pressable } from 'react-native';
import { Text, Card } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/Slices/ProductSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon
import ip from '../ipConfig'

const TopRatedProducts = ({ product }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [Rate, setRate] = useState(0);
  const [topProducts, setTopProducts] = useState([]);

  const handleAddToCart = () => {

    dispatch(addToCart(product));
    setModalVisible(true)

  };
  useEffect(() => {
    axios.get(`${ip}/products/${product._id}/getrate`) // get product rate
    .then((response) => {
      console.log(response.data)
      setRate(response.data.averageRate); // Update the response handling
      // const topProducts = product.filter((product) => {
      //   if (product.rating >=4 && product.rating <=5){
      //       return true;
      // }})
      // // setTopProducts(topProducts)
    })
    .catch((error) => {
      console.error(error);
    });
    console.log(product, "endddddddd");

  }, []);
  const navigation = useNavigation();


  if (Rate<=4){
    return ""
  }
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

      <Card style={styles.card} onPress={() => navigation.navigate('ProductDetails', { product,Rate })}>
        <Card.Cover style={styles.image} source={{ uri: `${ip}/${product?.image}` }} />
        <Card.Content style={styles.content}>
          <View style={styles.bottomContainer}>
            <Text style={styles.title}>{product?.name}</Text>
            <View style={{ backgroundColor: '#eed1f0', width: 60, padding: 5, borderRadius: 20, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginHorizontal:5, fontSize: 15 }} >{Rate}</Text>
            <Icon name='star' size={14} color={'white'} />
          </View>
          </View>
          <Text style={styles.price}>{product?.price}L.E</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <View style={styles.buttonContent}>
                <FontAwesomeIcon name="shopping-cart" size={16} style={{ marginRight: 5, color: 'white' }} />
                <Text style={[styles.addToCartButtonText, { fontFamily: 'Droid' }]}>اضف الي السله</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('screen').width * 0.5,
    marginHorizontal: 20,
    marginVertical: 18,
    elevation: 2,
    borderRadius: 10,
  },
  image: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain'
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 10,
  },
  title: {
    width: '50%',
    fontSize: 18,
    // marginTop: 10,
    fontWeight: 'bold',
    color: '#76005f',
    height: 30,
    textAlign: 'center'
  },
  description: {
    fontSize: 14,
    // marginBottom: 10,
  },
  bottomContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  ratingIcon: {
    color: 'gold',
  },
  rating: {
    fontSize: 14,
    color: '#888',
    backgroundColor: 'red'
  },
  cartIcon: {
    color: 'yellow',
  },
  searchIcon: {
    color: 'green',
  },
  price: {
width:'100%',
textAlign:'right',
paddingRight:5,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#23091e',
  },
  addToCartButton: {
    backgroundColor: '#76005f',
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    direction: 'rtl',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    height: 30,
  },
  addToCartButtonText: {
    marginLeft: 8,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#888',
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    // paddingVertical: 5,
  },
  selectedCategoryButton: {
    backgroundColor: 'green',
  },
  categoryButtonText: {
    color: 'white',
  },
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
  chips: {
    marginHorizontal: 3,
    backgroundColor: '#f8e7f4',
    flexDirection: 'column'
  }, centeredView: {
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
  chips: {
    marginHorizontal: 3,
    backgroundColor: '#f8e7f4',
    flexDirection: 'column'
  },

})

export default TopRatedProducts