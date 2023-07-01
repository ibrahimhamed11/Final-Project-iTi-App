import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import axios from 'axios';
import ip from '../ipConfig';

const RateProductModal = ({ productId, visible, closeModal }) => {
    const [rating, setRating] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const handleRating = async (newRating) => {
        try {
            setRating(newRating);
            const response = await axios.patch(`${ip}/products/${productId}/addrate`, {
                rate: newRating,
            });
            // Handle successful rating post
            console.log('Rating posted:', response.data.averageRate);
            // closeModal(); // Close the modal after successful rating post
        } catch (error) {
            // Handle error
            console.error('Error posting rating:', error);
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const starIcon = i <= rating ? 'star' : 'star-o';
            const starColor = i <= rating ? '#EDB016' : 'black';
            stars.push(
                <TouchableOpacity
                    key={i}
                    style={styles.starButton}
                    onPress={() => handleRating(i)}
                >
                    <FontAwesome name={starIcon} size={24} color={starColor} />
                    {i === rating && (
                        <FontAwesome
                            name="check"
                            size={16}
                            style={styles.selectedIcon}
                        />
                    )}
                </TouchableOpacity>
            );
        }
        return stars;
    };


    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <>
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <FontAwesome name="check" size={30} style={{ marginRight: 5, color: 'green' }} />
                        <Text style={[styles.modalText, { fontFamily: 'Droid' }]}>rate added</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={toggleModal}
                        >
                            <Text style={[styles.textStyle, { fontFamily: 'Droid' }]}>إغلاق النافذة</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
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

export default RateProductModal;
