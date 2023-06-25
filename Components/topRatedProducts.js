import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Text, TouchableOpacity, Button ,Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useEffect, } from 'react';
import { useNavigation } from '@react-navigation/native';
import StarRating from '../Components/Rate';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon

const TopRatedProducts = ({ item }) => {

  useEffect(() => {
    
    console.log(item,"endddddddd");
    console.log(item.category,"category");

  }, []);
    const nav = useNavigation();
    return (
        <Card style={styles.card} onPress={() => navigation.navigate('ProductDetails', { item })}>
        <Card.Cover style={styles.image} source= {item.image} />
        <Card.Content style={styles.content}>
          <View style={styles.bottomContainer}>
            <Text style={styles.title}>{item.nameOfProduct}</Text>
            <View style={styles.ratingContainer}>
              <StarRating rating={item.rate} />
            </View>
          </View>
          <Text style={styles.description}>{item.nameOfProduct}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.price}>{item.nameOfProduct}L.E</Text>
            {/* <TouchableOpacity style={styles.addToCartButton} onPress={console.log('first')}>
              <View style={styles.buttonContent}>
                <FontAwesomeIcon name="shopping-cart" size={16} style={{ marginRight: 5, color: 'white' }} />
                <Text style={[styles.addToCartButtonText, { fontFamily: 'Droid' }]}>اضف الي السله</Text>
              </View>
            </TouchableOpacity> */}
          </View>
        </Card.Content>
      </Card>
    )
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('screen').width * 0.44,
    marginHorizontal: 12,
    marginVertical: 18,
    elevation: 2,
    borderRadius: 10,
  },
  image: {
    height: 190,
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
    marginTop: 10,
    fontWeight: 'bold',
    color: '#76005f',
    height:40,
    textAlign:'center'
  },
  description: {
    fontSize: 14,
    // marginBottom: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems:'center',
    width:'50%',
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
    marginTop: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#76005f',
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
    paddingHorizontal: 8,
    height: 40,
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

})

export default TopRatedProducts