import React, { useState } from 'react';
import { View, TextInput, Button, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const AddProduct = () => {
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

            const response = await axios.post('http://192.168.1.9:4000/products/add', formData, {
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

        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <ScrollView>
            <View style={{ padding: 20 }}>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    style={{ marginBottom: 10 }}
                />
                <TextInput
                    placeholder="Price"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                    style={{ marginBottom: 10 }}
                />
                <TextInput
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                    style={{ marginBottom: 10 }}
                />
                <TextInput
                    placeholder="Category"
                    value={category}
                    onChangeText={setCategory}
                    style={{ marginBottom: 10 }}
                />
                <TextInput
                    placeholder="Stock"
                    value={stock}
                    onChangeText={setStock}
                    keyboardType="numeric"
                    style={{ marginBottom: 10 }}
                />
                <TextInput
                    placeholder="Seller"
                    value={seller}
                    onChangeText={setSeller}
                    style={{ marginBottom: 10 }}
                />
                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                    {selectedImage ? (
                        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
                    ) : (
                        <Button title="Upload Image" onPress={handleImageUpload} />
                    )}
                </View>

                <Button title="Add Product" onPress={handleAddProduct} />
            </View>
        </ScrollView>
    );
};

export default AddProduct;