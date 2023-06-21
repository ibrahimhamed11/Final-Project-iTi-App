import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, } from 'react-native';
import { Card, Title, Button, Modal, Text, TextInput } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

const SellerProfileScreen = () => {
    const [image, setImage] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [sellerDetails, setSellerDetails] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 30,
        phone: '123-456-7890',
    });
    const [isOrdersVisible, setOrdersVisible] = useState(false);
    const [isProductsVisible, setProductsVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    const [isAddProductModalVisible, setAddProductModalVisible] = useState(false);

    const toggleAddProductModal = () => {
        setAddProductModalVisible(!isAddProductModalVisible);
    };
    const AddProductModal = ({ isVisible, onClose }) => {
        const [productName, setProductName] = useState('');
        const [productDescription, setProductDescription] = useState('');
        const [productPrice, setProductPrice] = useState('');
        const [productCategory, setProductCategory] = useState('');
        const [productStockNumber, setProductStockNumber] = useState('');

        const handleAddProduct = () => {
            // Logic to add the product
            // You can access the product details from the state variables here
            // and perform any necessary actions, such as making an API request to add the product
            // After adding the product, you can close the modal using the onClose function
            onClose();
        };

        return (
            <Modal visible={isVisible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add Product</Text>
                    <TextInput
                        label="Product Name"
                        value={productName}
                        onChangeText={setProductName}
                        style={styles.input}
                    />
                    <TextInput
                        label="Description"
                        value={productDescription}
                        onChangeText={setProductDescription}
                        style={styles.input}
                        multiline
                        numberOfLines={3}
                    />
                    <TextInput
                        label="Price"
                        value={productPrice}
                        onChangeText={setProductPrice}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <TextInput
                        label="Category"
                        value={productCategory}
                        onChangeText={setProductCategory}
                        style={styles.input}
                    />
                    <TextInput
                        label="Stock Number"
                        value={productStockNumber}
                        onChangeText={setProductStockNumber}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <Button mode="contained" onPress={handleAddProduct} style={styles.addButton}>
                        Add Product
                    </Button>
                </View>
            </Modal>
        );
    };

    const [products, setProducts] = useState([
        { id: '1', name: 'Product 1', price: 10, image: null },
        { id: '2', name: 'Product 2', price: 20, image: null },
        { id: '3', name: 'Product 3', price: 30, image: null },
    ]);
    const [orders, setOrders] = useState([
        { id: '1', product: 'Product 1', quantity: 2, status: 'pending' },
        { id: '2', product: 'Product 2', quantity: 1, status: 'done' },
        { id: '3', product: 'Product 3', quantity: 3, status: 'pending' },
    ]);

    const handleChooseImage = async () => {
        // Code to choose image from gallery
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleOrders = () => {
        setOrdersVisible(!isOrdersVisible);
    };

    const toggleProducts = () => {
        setProductsVisible(!isProductsVisible);
    };

    const handleSearch = (text) => {
        setSearchText(text);
    };

    const handleStatusChange = (orderId, newStatus) => {
        const updatedOrders = orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
    };




    const renderProductItem = ({ item }) => (
        <View style={styles.productItem}>
            <View style={styles.productImageContainer}>
                {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                ) : (
                    <FontAwesome name="image" size={20} color="#999999" />
                )}
            </View>
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>Price: ${item.price}</Text>
                <View style={styles.productButtons}>
                    <TouchableOpacity onPress={() => handleDeleteProduct(item.id)}>
                        <FontAwesome name="trash" size={20} color="#999999" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleModifyProduct(item.id)}>
                        <FontAwesome name="pencil" size={20} color="#999999" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderOrderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <Text style={styles.orderProduct}>{item.product}</Text>
            <Text style={styles.orderQuantity}>{item.quantity}</Text>
            <View style={styles.orderStatusContainer}>
                <Button
                    icon={item.status === 'pending' ? 'clock-outline' : 'check'}
                    mode="contained"
                    onPress={() =>
                        handleStatusChange(item.id, item.status === 'pending' ? 'done' : 'pending')
                    }
                    style={[
                        styles.orderStatusButton,
                        { backgroundColor: item.status === 'pending' ? '#f44336' : '#4caf50' },
                    ]}
                    labelStyle={styles.orderStatus}
                >
                    {item.status === 'pending' ? 'Pending' : 'Done'}
                </Button>
            </View>
        </View>
    );

    return (

        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.imageContainer}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                    ) : (
                        <FontAwesome
                            name="user-circle"
                            size={100}
                            color="#999999"
                            onPress={handleChooseImage}
                        />
                    )}
                </View>
                <Card style={styles.card}>
                    <Card.Content>
                        <Title style={styles.sellerName}>{sellerDetails.name}</Title>
                        <Text style={styles.sellerEmail}>{sellerDetails.email}</Text>
                    </Card.Content>
                    <Card.Actions style={styles.cardActions}>
                        <Button onPress={toggleModal}>Profile Details</Button>
                    </Card.Actions>
                </Card>
                <View style={styles.statsContainer}>
                    <View style={styles.statsItem}>
                        <FontAwesome name="shopping-bag" size={30} color="#999999" />
                        <Text style={styles.statsLabel}>Total Products</Text>
                        <Text style={styles.statsNumber}>{products.length}</Text>
                    </View>
                    <View style={styles.statsItem}>
                        <FontAwesome name="shopping-cart" size={30} color="#999999" />
                        <Text style={styles.statsLabel}>Total Orders</Text>
                        <Text style={styles.statsNumber}>{orders.length}</Text>
                    </View>
                    <View style={styles.statsItem}>
                        <FontAwesome name="check-circle" size={30} color="#999999" />
                        <Text style={styles.statsLabel}>Orders Done</Text>
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
                        {isOrdersVisible ? 'Hide Orders' : 'Show Orders'}
                    </Button>
                    <Button
                        mode="contained"
                        onPress={toggleProducts}
                        style={[styles.button, styles.productsButton]}
                        icon={({ color, size }) => (
                            <FontAwesome name="shopping-basket" size={size} color={color} />
                        )}
                    >
                        {isProductsVisible ? 'Hide Products' : 'Show Products'}
                    </Button>

                    <Button
                        mode="contained"
                        onPress={toggleAddProductModal}
                        style={[styles.button, styles.addProductButton]}
                        icon={({ color, size }) => (
                            <FontAwesome name="plus" size={size} color={color} />
                        )}
                    >
                        Add Product
                    </Button>
                    <AddProductModal
                        isVisible={isAddProductModalVisible}
                        onClose={toggleAddProductModal}
                    />



                </View>
                {isOrdersVisible && (
                    <View style={styles.orderList}>
                        <Text style={styles.sectionTitle}>Orders</Text>
                        <FlatList
                            data={orders}
                            keyExtractor={(item) => item.id}
                            renderItem={renderOrderItem}
                        />
                    </View>
                )}
                {isProductsVisible && (
                    <View style={styles.productsContainer}>
                        <TextInput
                            label="Search Products"
                            value={searchText}
                            onChangeText={handleSearch}
                            style={styles.searchInput}
                        />
                        <FlatList
                            data={products}
                            keyExtractor={(item) => item.id}
                            renderItem={renderProductItem}
                        />
                    </View>
                )}
                <Modal visible={isModalVisible} onDismiss={toggleModal} contentContainerStyle={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Name: {sellerDetails.name}</Text>
                        <Text style={styles.modalText}>Email: {sellerDetails.email}</Text>
                        <Text style={styles.modalText}>Age: {sellerDetails.age}</Text>
                        <Text style={styles.modalText}>Phone: {sellerDetails.phone}</Text>
                    </View>
                </Modal>

            </ScrollView>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    scrollContent: {
        flexGrow: 1, // Allow content to grow vertically
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
        alignSelf: 'center'
    },
    sellerName: {
        fontSize: 20,
    },
    sellerEmail: {
        marginTop: 5,
    },
    cardActions: {
        // justifyContent: 'flex-end',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statsItem: {
        alignItems: 'center',
    },
    statsLabel: {
        marginTop: 5,
        fontSize: 12,
        color: '#999999',
    },
    statsNumber: {
        fontWeight: 'bold',
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
        backgroundColor: '#2196f3',
    },
    productsButton: {
        backgroundColor: '#4caf50',
    },
    orderList: {
        // flex: 1,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
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
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        height: 40
    },
    orderStatus: {
        fontSize: 12,
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
});

export default SellerProfileScreen;
