import React, { useState } from 'react';
import {
    Text, View, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Modal,
} from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { useStripe } from '@stripe/stripe-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

// Replace with your Stripe publishable key
const publishableKey = 'YOUR_STRIPE_PUBLISHABLE_KEY';

const CheckoutScreen = () => {
    const { confirmPayment } = useStripe();
    const [cardData, setCardData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handlePayment = async () => {
        try {
            // await confirmPayment({
            //     type: 'Card',
            //     card: {
            //         number: cardData.values.number,
            //         expMonth: cardData.values.expiry.split('/')[0],
            //         expYear: cardData.values.expiry.split('/')[1],
            //         cvc: cardData.values.cvc,
            //         name: cardData.values.name,
            //         addressZip: cardData.values.postalCode, // Postal code
            //     },
            // });

            setModalVisible(true);
        } catch (error) {
            console.log('Error:', error);
        }
    };


    const onChange = (formData) => {
        setCardData(formData);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <CreditCardInput
                    onChange={onChange}
                    allowScroll={false}
                    requiresCVC={true}
                    requiresName={true}
                    requiresPostalCode={true} // Enable postal code field
                    cardScale={0.8}
                    cardFontFamily="FontAwesome5"
                    cardNumberContainerStyle={styles.cardNumberContainer}
                    cardNumberInputStyle={styles.cardNumberInput}
                    cardExpiryContainerStyle={styles.cardExpiryContainer}
                    cardExpiryInputStyle={styles.cardExpiryInput}
                    cardCVCContainerStyle={styles.cardCVCContainer}
                    cardCVCInputStyle={styles.cardCVCInput}
                    cardNameInputStyle={styles.cardNameInput}
                    postalCodeInputStyle={styles.postalCodeInput} // Style for postal code input
                />
                {cardData && (
                    <View>
                        <Text style={styles.cardName}>
                            صاحب البطاقة: {cardData.values.name}
                        </Text>
                        <Text style={styles.postalCode}>
                            الرمز البريدي: {cardData.values.postalCode}
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.completePaymentButton}
                    onPress={handlePayment}
                >
                    <Text style={styles.completePaymentButtonText}>استكمال الدفع</Text>
                </TouchableOpacity>

                {/* Modal */}
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <FontAwesome name="check-circle" style={styles.checkIcon} />
                            <Text style={styles.modalText}>تم الدفع بنجاح </Text>
                            <Button
                                title="اغلاق"
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: '20%',
    },
    cardNumberContainer: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        alignSelf: 'stretch',
    },
    cardNumberInput: {
        fontSize: 16,
        fontFamily: 'FontAwesome5',
    },
    cardExpiryContainer: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        alignSelf: 'stretch',
    },
    cardExpiryInput: {
        fontSize: 16,
        fontFamily: 'FontAwesome5',
    },
    cardCVCContainer: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        alignSelf: 'stretch',
    },
    cardCVCInput: {
        fontSize: 16,
        fontFamily: 'FontAwesome5',
    },
    cardNameInput: {
        fontSize: 16,
        fontFamily: 'FontAwesome5',
    },
    postalCodeInput: {
        fontSize: 16,
        fontFamily: 'FontAwesome5',
    },
    cardName: {
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'FontAwesome5',
    },
    postalCode: {
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'FontAwesome5',
    },
    completePaymentButton: {
        backgroundColor: '#76005f',
        paddingHorizontal: 0,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 60,
        marginHorizontal: 60,
        alignItems: 'center',
        width: 200,
    },
    completePaymentButtonText: {
        color: '#ffffff',
        fontFamily: 'Droid',

        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 0,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 40,
        paddingVertical: 40,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        fontFamily: 'FontAwesome5',
        fontFamily: 'Droid',

    },
    checkIcon: {
        fontSize: 65,
        color: 'green',
        marginBottom: 20,
    },
});

export default CheckoutScreen;
