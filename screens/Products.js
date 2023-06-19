import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import { Card, IconButton, Searchbar } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/Slices/ProductSlice';
import { Rating } from 'react-native-ratings';
import { Alert, Modal, Pressable } from 'react-native';
import StarRating from '../Components/Rate';

const ProductCard = ({ product }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
      <Card style={styles.card} onPress={() => navigation.navigate('ProductDetails', { product })}>
        <Card.Cover style={styles.image} source={{ uri: product.images[0] }} />
        <Card.Content style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <View>
            <Text style={styles.price}> {product.price}</Text>
          </View>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.bottomContainer}>
            <View style={styles.ratingContainer}>




              <StarRating rating={product.rating} />

              {/* <FontAwesomeIcon name="star" size={30} style={{ marginRight: 5, color:'#EDB016' }} /> */}
              {/* <Text style={styles.rating}>{product.rating}</Text> */}
            </View>
          </View>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <View style={styles.buttonContent}>
              <FontAwesomeIcon name="shopping-cart" size={30} style={{ marginRight: 5, color: 'white' }} />
              <Text style={[styles.addToCartButtonText, { fontFamily: 'Droid' }]}>اضف الي السله</Text>
            </View>
          </TouchableOpacity>
        </Card.Content>
      </Card>
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Products',
      headerRight: () => (
        <IconButton
          icon="account"
          color="white"
          size={24}
          onPress={() => navigation.navigate('Profile')}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products')
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  const renderCard = ({ item }) => <ProductCard product={item} />;

  return (
    <View style={styles.container}>
      <Searchbar
        style={[styles.searchBar, { fontFamily: 'Droid' }]}
        placeholder="ابحث عن المنتج"
        value={searchQuery}
        onChangeText={handleSearch}
        iconColor={styles.searchIcon.color}
      />

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === 'all' && styles.selectedCategoryButton]}
          onPress={() => handleCategoryFilter('all')}
        >
          <Text style={styles.categoryButtonText}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === 'laptops' && styles.selectedCategoryButton]}
          onPress={() => handleCategoryFilter('laptops')}
        >
          <Text style={styles.categoryButtonText}>laptops</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === 'smartphones' && styles.selectedCategoryButton]}
          onPress={() => handleCategoryFilter('smartphones')}
        >
          <Text style={styles.categoryButtonText}>smartphones</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === 'fragrances' && styles.selectedCategoryButton]}
          onPress={() => handleCategoryFilter('fragrances')}
        >
          <Text style={styles.categoryButtonText}>fragrances</Text>
        </TouchableOpacity>

        {/* Add more category buttons as needed */}
      </View>

      <FlatList
        contentContainerStyle={styles.scrollViewContainer}
        data={filteredProducts.length > 0 ? filteredProducts : products}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  searchBar: {
    width: Dimensions.get('screen').width - 16,
    marginBottom: 10,
  },
  card: {
    width: Dimensions.get('screen').width / 2.3,
    marginBottom: 20,
    elevation: 2,
    borderRadius: 10,
    marginHorizontal: 8,
    height: 420,
  },
  image: {
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    height: 30,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    height: 60,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    color: 'gold',
  },
  rating: {
    fontSize: 18,
    color: '#888',
    marginLeft: 20,
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
    height: 30,
    fontWeight: 'bold',
    fontSize: 25,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'green',
  },
  addToCartButton: {
    backgroundColor: 'green',
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
    height: 40,
  },
  addToCartButtonText: {
    marginLeft: 8,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
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
    backgroundColor: 'blue',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CardScreen;
