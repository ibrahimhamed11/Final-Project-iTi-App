import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, I18nManager } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

// Replace with your Stripe publishable key
const publishableKey = 'YOUR_STRIPE_PUBLISHABLE_KEY';

const CheckoutScreen = () => {
    const { confirmPayment } = useStripe();
    const [cardData, setCardData] = useState(null);

    const handlePayment = async () => {
        try {
            I18nManager.forceRTL(false);

            const { error } = await confirmPayment({
                type: 'Card',
                card: {
                    number: cardData.values.number,
                    expMonth: cardData.values.expiry.split('/')[0],
                    expYear: cardData.values.expiry.split('/')[1],
                    cvc: cardData.values.cvc,
                },
            });

            if (error) {
                console.log('Payment Error:', error);
            } else {
                console.log('Payment Success!');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const onChange = (formData) => {
        setCardData(formData);
    };

    return (
        <StripeProvider publishableKey={publishableKey}>
            <View style={styles.container}>
                <Text style={styles.heading}>Checkout</Text>
                <CreditCardInput
                    onChange={onChange}
                    allowScroll={true}
                    requiresCVC={true}
                    cardScale={0.8}
                    cardFontFamily="Droid"
                    cardNumberContainerStyle={styles.cardNumberContainer}
                    cardNumberInputStyle={styles.cardNumberInput}
                    cardExpiryContainerStyle={styles.cardExpiryContainer}
                    cardExpiryInputStyle={styles.cardExpiryInput}
                    cardCVCContainerStyle={styles.cardCVCContainer}
                    cardCVCInputStyle={styles.cardCVCInput}
                />
                <Button title="Make Payment" onPress={handlePayment} />
            </View>
        </StripeProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        flexDirection: 'column',
        writingDirection: 'rtl', // Make content Arabic
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'right', // Align text to the right for Arabic
    },
    cardNumberContainer: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        alignSelf: 'stretch',
    },
    cardNumberInput: {
        fontSize: 16,
        fontFamily: 'Droid',
        textAlign: 'right', // Align text to the right for Arabic
    },
    cardExpiryContainer: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        alignSelf: 'stretch',
    },
    cardExpiryInput: {
        fontSize: 16,
        fontFamily: 'Droid',
        textAlign: 'right', // Align text to the right for Arabic
    },
    cardCVCContainer: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        alignSelf: 'stretch',
    },
    cardCVCInput: {
        fontSize: 16,
        fontFamily: 'Droid',
        textAlign: 'right', // Align text to the right for Arabic
    },
});

export default CheckoutScreen;
