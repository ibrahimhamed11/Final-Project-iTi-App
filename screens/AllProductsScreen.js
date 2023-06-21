import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Searchbar, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const api = 'http://192.168.1.9:4000';

const ProductList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [seller, setSeller] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const imageResult = await ImagePicker.launchImageLibraryAsync();
        if (!imageResult.cancelled) {
            setSelectedImage(imageResult.uri);
        }
    };

    const handleAddProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', parseFloat(price));
            formData.append('description', description);
            formData.append('category', category);
            formData.append('stock', parseInt(stock));
            formData.append('image', {
                uri: selectedImage,
                type: 'image/jpeg',
                name: 'product.jpg',
            });

            const response = await axios.post(`${api}/products/add`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log('Product added:', response.data);

            // Reset form and state
            setName('');
            setPrice('');
            setDescription('');
            setCategory('');
            setStock('');
            setSelectedImage(null);

            fetchProducts(); // Fetch updated list of products after adding
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };


    //Get All
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${api}/products/getAll`);
            setProducts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };



    //Search
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (product) => {
        const { _id, name, price, description, category, stock, seller, image } = product;
        setEditingProduct({ _id, name, price, description, category, stock, seller, image });
        setName(name);
        setPrice(price.toString());
        setDescription(description);
        setCategory(category);
        setStock(stock.toString());
        setSeller(seller);
        setSelectedImage(image);
        setModalVisible(true);
    };

    const handleSave = async () => {
        try {
            // Retrieve the existing product's ID
            const productId = editingProduct._id;

            const updatedProduct = {
                name,
                price: parseFloat(price),
                description,
                category,
                stock: parseInt(stock),
                seller,
                image: selectedImage,
            };

            const response = await axios.patch(`${api}/products/${productId}`, updatedProduct);
            console.log('Product updated:', response.data);

            setModalVisible(false);
            setEditingProduct(null);
            fetchProducts(); // Fetch updated list of products after saving
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };


    const handleCancel = () => {
        setModalVisible(false);
        setEditingProduct(null);
        // Reset form and state
        setName('');
        setPrice('');
        setDescription('');
        setCategory('');
        setStock('');
        setSelectedImage(null);
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`${api}/products/${productId}`);
            fetchProducts(); // Fetch updated list of products after deleting
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const renderProducts = () => {
        if (filteredProducts.length === 0) {
            return (
                <View style={styles.noProductsContainer}>
                    <Text>No products found</Text>
                </View>
            );
        }

        return filteredProducts.map((product) => (
            <Card key={product._id} style={styles.card}>
                <Card.Cover source={{ uri: `${api}/${product.image}` }} />
                <Card.Content>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text>Price: {product.price}</Text>
                    <Text>Stock: {product.stock}</Text>
                    <Text>Seller: {product.seller}</Text>
                    <Text>Description: {product.description}</Text>
                    <View style={styles.buttonContainer}>
                        <Button mode="outlined" style={styles.editButton} onPress={() => handleEdit(product)}>
                            Edit
                        </Button>
                        <Button
                            mode="contained"
                            style={styles.deleteButton}
                            onPress={() => handleDelete(product._id)}
                        >
                            Delete
                        </Button>
                    </View>
                </Card.Content>
            </Card>
        ));
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={(query) => setSearchQuery(query)}
                    value={searchQuery}
                    style={styles.searchBar}
                />

                <View style={styles.header}>
                    <Text style={styles.headerText}>Product List</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Icon name="plus-circle" size={30} color="green" />
                    </TouchableOpacity>
                </View>

                {renderProducts()}
            </View>

            <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <ScrollView>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TextInput
                                placeholder="Name"
                                value={name}
                                onChangeText={setName}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Price"
                                value={price}
                                onChangeText={setPrice}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Description"
                                value={description}
                                onChangeText={setDescription}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Category"
                                value={category}
                                onChangeText={setCategory}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Stock"
                                value={stock}
                                onChangeText={setStock}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Seller"
                                value={seller}
                                onChangeText={setSeller}
                                style={styles.input}
                            />
                            <View style={styles.imageContainer}>
                                {selectedImage ? (
                                    <Image source={{ uri: selectedImage }} style={styles.image} />
                                ) : (
                                    <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
                                        <Text style={styles.uploadButtonText}>Upload Image</Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            <View style={styles.modalButtons}>
                                <Button
                                    mode="contained"
                                    style={styles.addButton}
                                    onPress={editingProduct ? handleSave : handleAddProduct}
                                >
                                    {editingProduct ? 'Save Product' : 'Add Product'}
                                </Button>
                                <Button mode="outlined" style={styles.cancelButton} onPress={handleCancel}>
                                    Cancel
                                </Button>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchBar: {
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    card: {
        marginBottom: 20,
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    editButton: {
        flex: 1,
        marginRight: 10,
    },
    deleteButton: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: 'red',
    },
    noProductsContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    input: {
        marginBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    uploadButton: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 10,
    },
    uploadButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    addButton: {
        flex: 1,
        marginRight: 10,
        backgroundColor: 'green',
    },
    cancelButton: {
        flex: 1,
        marginLeft: 10,
    },
});
export default ProductList;
