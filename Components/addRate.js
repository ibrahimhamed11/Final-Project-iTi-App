import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import axios from 'axios';
import ip from '../ipConfig';

const RateProductModal = ({ productId, visible, closeModal }) => {
    const [rating, setRating] = useState(0);

    const handleRating = async (newRating) => {
        try {
            setRating(newRating);
            const response = await axios.post(`${ip}/ratings`, {
                productId,
                rating: newRating,
            });
            // Handle successful rating post
            console.log('Rating posted:', response.data);
            closeModal(); // Close the modal after successful rating post
        } catch (error) {
            // Handle error
            console.error('Error posting rating:', error);
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const starIcon = i <= rating ? 'star' : 'star-o';
            stars.push(
                <TouchableOpacity
                    key={i}
                    style={styles.starButton}
                    onPress={() => handleRating(i)}
                >
                    <FontAwesome name={starIcon} size={24} color="#EDB016" />
                </TouchableOpacity>
            );
        }
        return stars;
    };

    return (
        <Modal visible={visible} onRequestClose={closeModal} transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Rate Product</Text>
                    <View style={styles.ratingContainer}>{renderStars()}</View>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    starButton: {
        marginHorizontal: 5,
    },
    closeButton: {
        marginTop: 20,
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        fontSize: 16,
        color: 'gray',
    },
});

export default RateProductModal;
