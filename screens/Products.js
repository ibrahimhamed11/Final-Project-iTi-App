import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, ScrollView } from 'react-native';
import { Card, IconButton, Searchbar, Chip } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/Slices/ProductSlice';
import { Alert, Modal, Pressable } from 'react-native';
import StarRating from '../Components/Rate';
import ip from '../ipConfig'



const ProductCard = ({ product }) => {
  const [Rate, setRate] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  

    useEffect(() => {
      axios.get(`${ip}/products/${product._id}/getrate`) // get product rate
      .then((response) => {
        console.log(response.data)
        setRate(response.data.averageRate); // Update the response handling

      })
      .catch((error) => {
        console.error(error);
      });
        // calculateAverageRate()
  
    }, []);
  const handleAddToCart = () => {

    dispatch(addToCart(product));
    setModalVisible(true)

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
        {/* <Image source={{uri:'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'}} style={{width:60, height:60, borderRadius:20,}}/> */}
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




<TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product,Rate })}>
      <Card style={styles.card} >
        <Card.Cover style={styles.image} source={{ uri: `${ip}/${product?.image}` }} />
        <Card.Content style={styles.content}>
          <View style={styles.bottomContainer}>
            <View style={styles.ratingContainer}>
              <StarRating rating={Rate} />
            </View>
            <Text style={styles.title}>{product?.name}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.price}>{product?.price}L.E</Text>
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <View style={styles.buttonContent}>
                <FontAwesomeIcon name="shopping-cart" size={16} style={{ marginRight: 5, color: 'white' }} />
                <Text style={[styles.addToCartButtonText, { fontFamily: 'Droid' }]}>اضف الي السله</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
      </TouchableOpacity>
    </>
  );
};



const CardScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

 
  useEffect(() => {
    axios
      .get(`${ip}/products/getAll`) // Update the API endpoint
      .then((response) => {
        console.log(response.data)
        setProducts(response.data); // Update the response handling
 
      })
      .catch((error) => {
        console.error(error);
      });
      // calculateAverageRate()

  }, []);




  // console.log("iti", products)
  const handleSearch = (query) => {
    setSearchQuery(query);

    // Perform search logic here
    const filteredProducts = products.filter((product) => {
      const productName = product.name && product.name.toLowerCase();
      const productDescription = product.description && product.description.toLowerCase();
      const searchQueryLower = query.toLowerCase();

      return (
        productName && productName.includes(searchQueryLower) ||
        productDescription && productDescription.includes(searchQueryLower)
      );
    });

    setFilteredProducts(filteredProducts);
    setSelectedCategory(''); // Clear selected category when performing a search
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);

    const filteredProducts = products.filter((product) => {
      const productCategory = product.category && product.category.toLowerCase();
      const selectedCategoryLower = category.toLowerCase();

      return productCategory && productCategory.includes(selectedCategoryLower);
    });

    setFilteredProducts(filteredProducts);
    setSearchQuery(''); // Clear search query when selecting a category
  };

  const renderCard = ({ item }) => {
    // console.log(item)
    return <ProductCard product={item} />
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 5 }}>
        <Image
          source={require('../assets/images/nav.jpg')}
          style={styles.mainImage} />
        <View style={{ position: 'absolute', top: 0, right: 0, paddingTop: 20, paddingRight: 10 ,alignItems:'flex-end'}}>
          <Text style={{ fontSize: 24, fontWeight: 600, color: '#f8e7f4' }}>
            اهلا بكم فى متجرنا للتسوق
          </Text>
          {/* <Text style={{ fontSize: 18, fontWeight: 600, color: '#e0e0e0', marginVertical: 10 }}>
            سارة محمد احمد
          </Text> */}
          <Searchbar
            placeholder="ابحث عن المنتج"
            onChangeText={handleSearch}
            value={searchQuery}
            style={{ backgroundColor: '#f8e7f4', marginVertical: 15, width: Dimensions.get('screen').width * 0.88, height:50 }}
          />
        </View>
        <View style={{ marginTop: 10, justifyContent: 'center' }} >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <Chip style={styles.chips} selectedColor='grey' textStyle={{ fontSize: 18, padding: 1, color: '#76005f' }} onPress={() => handleCategoryFilter('all')}>all</Chip>
            <Chip style={styles.chips} textStyle={{ fontSize: 14, padding: 1, color: '#76005f' }} onPress={() => handleCategoryFilter('clothes')}>clothes</Chip>
            <Chip style={styles.chips} textStyle={{ fontSize: 14, padding: 1, color: '#76005f' }} onPress={() => handleCategoryFilter('shoes')}>shoes</Chip>
            <Chip style={styles.chips} textStyle={{ fontSize: 14, padding: 1, color: '#76005f' }} onPress={() => handleCategoryFilter('food')}>food</Chip>
            <Chip style={styles.chips} textStyle={{ fontSize: 14, padding: 1, color: '#76005f' }} onPress={() => handleCategoryFilter('babycare')}>babycare</Chip>
          </ScrollView>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* <FlatList
          contentContainerStyle={styles.scrollViewContainer}
          data={products}
          renderItem={renderCard}
          keyExtractor={(item, index) => index}
          numColumns={2}
        />
         */}

        <FlatList
          contentContainerStyle={styles.scrollViewContainer}
          data={filteredProducts.length > 0 ? filteredProducts : products}
          renderItem={renderCard}
          keyExtractor={(item) => item._id.toString()}
        />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom:40
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 5,
  },
  searchBar: {
    width: Dimensions.get('screen').width - 16,
    marginBottom: 10,
  },
  card: {
    width: Dimensions.get('screen').width * 0.9,
    height: 250,
    marginHorizontal: 10,
    marginVertical: 20,
    elevation: 2,
    borderRadius: 10,
  },
  image: {
    position:'absolute',
    top:0,
    right:0,
    width:'100%',
    height: 250,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // resizeMode: 'cover'
  },
  content: {
    position:'absolute',
    top:140,
    right:0,
    width:'100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 10,
    backgroundColor:'#f4eeee7c',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
  },
  title: {
    width: '60%',
    fontSize: 18,
    // marginTop: 10,
    fontWeight: 'bold',
    color: '#76005f',
    paddingVertical: 10,
    textAlign: 'right'
  },
 
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ratingContainer: {
    flexDirection: 'row',
    textAlign: 'right',
    width: '40%',
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
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#888',
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectedCategoryButton: {
    backgroundColor: 'green',
  },
  categoryButtonText: {
    color: 'white',
  },
  //
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
    backgroundColor: '#76005f',
    marginTop:10
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
  // nav style
  mainImage: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.23,
    position: 'relative',
    borderBottomLeftRadius: 90,
    paddingBottom: 10,
  }
});

export default CardScreen;